import { Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { RedisService } from "../redis/redis.service";
import { UsersService } from "../users/users.service";
import { generateVerificationCode } from "./utils/generate-code.util";
import { JwtConfig, VerificationCodeConfig } from "./config/auth.config";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { User } from "../users/entities/user.entity";
import { MailerService } from "../mailer/mailer.service";
import { ProfileService } from "../profile/profile.service";
import { generateUniqueUsername } from "./utils/generate-unique-username.util";
import { SessionResponseDto } from "./dto/session-response.dto";
import { I18nService } from "nestjs-i18n";

export interface AccessTokenPayload {
  sub: number;
}

export interface RefreshTokenPayload {
  sub: number;
  version: number;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService,
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
    private readonly profileService: ProfileService,
  ) {}

  async generateAndSendVerificationCode(email: string): Promise<boolean> {
    let user = await this.usersService.findOneByEmail(email);

    if (!user) {
      user = await this.registerUser(email);
    }

    const verificationCodeConfig =
      this.configService.getOrThrow<VerificationCodeConfig>("auth.verificationCode");

    const code = generateVerificationCode(verificationCodeConfig.codeLength);

    await this.redisService.hsetex(
      `${verificationCodeConfig.redisStorageKey}:${email}`,
      {
        code,
        attempts: "0",
      },
      verificationCodeConfig.expirationTime,
    );

    await this.mailerService.sendVerificationCode(email, code);

    return true;
  }

  async verifyCodeAndGenerateTokens(email: string, code: string): Promise<AuthResponseDto> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException(this.i18n.t("common.userNotFound"));
    }

    const verificationCodeConfig =
      this.configService.getOrThrow<VerificationCodeConfig>("auth.verificationCode");

    const storedCode = await this.redisService.hget(
      `${verificationCodeConfig.redisStorageKey}:${email}`,
      "code",
    );

    const attempts = await this.redisService.hget(
      `${verificationCodeConfig.redisStorageKey}:${email}`,
      "attempts",
    );

    if (attempts && parseInt(attempts) >= verificationCodeConfig.maxAttempts) {
      throw new UnauthorizedException(this.i18n.t("auth.maxAttemptsReached"));
    }

    if (!storedCode || storedCode !== code) {
      await this.redisService.hincrby(
        `${verificationCodeConfig.redisStorageKey}:${email}`,
        "attempts",
        1,
      );

      throw new UnauthorizedException(this.i18n.t("auth.invalidOrExpiredVerificationCode"));
    }

    await this.redisService.hdel(
      `${verificationCodeConfig.redisStorageKey}:${email}`,
      "code",
      "attempts",
    );

    return this.generateTokens(user.id, user.tokenVersion);
  }

  async getSession(userId: number): Promise<SessionResponseDto> {
    const user = await this.usersService.findOneById(userId);

    if (!user) {
      throw new NotFoundException(this.i18n.t("common.userNotFound"));
    }

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      status: user.status,
    };
  }

  async refreshTokens(refreshToken: string): Promise<AuthResponseDto> {
    const jwtConfig = this.configService.getOrThrow<JwtConfig>("auth.jwt");

    let payload: RefreshTokenPayload | null = null;

    try {
      payload = await this.jwtService.verifyAsync<RefreshTokenPayload>(refreshToken, {
        secret: jwtConfig.secret,
      });

      const user = await this.usersService.findOneById(payload.sub);

      if (!user) {
        throw new UnauthorizedException(this.i18n.t("auth.invalidOrExpiredRefreshToken"));
      }

      if (payload.version !== user.tokenVersion) {
        throw new UnauthorizedException(this.i18n.t("auth.invalidOrExpiredRefreshToken"));
      }

      return this.generateTokens(user.id, user.tokenVersion);
    } catch {
      throw new UnauthorizedException(this.i18n.t("auth.invalidOrExpiredRefreshToken"));
    }
  }

  private async generateTokens(userId: number, tokenVersion: number): Promise<AuthResponseDto> {
    const jwtConfig = this.configService.getOrThrow<JwtConfig>("auth.jwt");

    const accessToken = await this.jwtService.signAsync<AccessTokenPayload>(
      { sub: userId },
      {
        expiresIn: jwtConfig.accessTokenExpiresIn,
      },
    );

    const refreshToken = await this.jwtService.signAsync<RefreshTokenPayload>(
      { sub: userId, version: tokenVersion },
      {
        expiresIn: jwtConfig.refreshTokenExpiresIn,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  private async registerUser(email: string): Promise<User> {
    const user = await this.usersService.create({ email, username: generateUniqueUsername() });
    await this.profileService.create(user.id, { firstName: "Неизвестный" });
    return user;
  }
}
