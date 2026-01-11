import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
  getSchemaPath,
} from "@nestjs/swagger";
import { SendVerificationCodeDto } from "./dto/send-verification-code.dto";
import { VerifyCodeDto } from "./dto/verify-code.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";
import type { AuthenticatedRequest } from "./types/authenticated-request.type";
import { SessionResponseDto } from "./dto/session-response.dto";
import { RefreshTokensDto } from "./dto/refresh-tokens.dto";
import { Throttle } from "@nestjs/throttler";
import { Auth } from "./auth.decorator";
import { OpenApi } from "../openapi/openapi.decorator";

@Controller({ path: "auth", version: "1" })
@ApiExtraModels(AuthResponseDto, SessionResponseDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("send-verification-code")
  @Throttle({ default: { limit: 1 } })
  @OpenApi({
    summary: "Send verification code",
    success: {
      data: { type: "boolean", example: true },
      message: "Email verification code sent successfully",
    },
    exeptions: [ApiTooManyRequestsResponse],
  })
  sendVerificationCode(@Body() sendVerificationCodeDto: SendVerificationCodeDto): Promise<boolean> {
    return this.authService.generateAndSendVerificationCode(sendVerificationCodeDto.email);
  }

  @Post("verify-code")
  @OpenApi({
    summary: "Verify code and get tokens",
    success: {
      data: { $ref: getSchemaPath(AuthResponseDto) },
      message: "Code verified successfully",
    },
    exeptions: [ApiUnprocessableEntityResponse, ApiUnauthorizedResponse],
  })
  verifyCode(@Body() verifyCodeDto: VerifyCodeDto): Promise<AuthResponseDto> {
    return this.authService.verifyCodeAndGenerateTokens(verifyCodeDto.email, verifyCodeDto.code);
  }

  @Post("refresh-tokens")
  @Throttle({ default: { limit: 10 } })
  @OpenApi({
    summary: "Refresh tokens",
    success: {
      data: { $ref: getSchemaPath(AuthResponseDto) },
      message: "Tokens refreshed successfully",
    },
    exeptions: [
      ApiTooManyRequestsResponse,
      ApiUnauthorizedResponse,
      ApiUnprocessableEntityResponse,
    ],
  })
  refreshTokens(@Body() refreshTokensDto: RefreshTokensDto): Promise<AuthResponseDto> {
    return this.authService.refreshTokens(refreshTokensDto.refreshToken);
  }

  @Get("session")
  @Auth()
  @OpenApi({
    summary: "Get current user session",
    success: {
      data: { $ref: getSchemaPath(SessionResponseDto) },
      message: "Session fetched successfully",
    },
    exeptions: [ApiNotFoundResponse],
  })
  getSession(@Req() req: AuthenticatedRequest): Promise<SessionResponseDto> {
    return this.authService.getSession(req.user.sub);
  }
}
