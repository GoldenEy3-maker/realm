import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { I18nService } from "nestjs-i18n";

import { RedisService } from "@/infrastructure/redis/redis.service";
import { ProfileService } from "@/profile/profile.service";
import { UsersService } from "@/users/users.service";

import { AuthService } from "./auth.service";
import { VerificationCodeMailer } from "./mail/verification-code.mailer";

describe("AuthService", () => {
  let service: AuthService;

  const mockConfigService = {
    get: jest.fn(),
  };

  const mockRedisService = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  const mockUsersService = {
    findOneById: jest.fn(),
    findOneByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockVerificationCodeMailer = {
    send: jest.fn(),
  };

  const mockProfileService = {
    getOneByUserId: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: RedisService,
          useValue: mockRedisService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: VerificationCodeMailer,
          useValue: mockVerificationCodeMailer,
        },
        {
          provide: ProfileService,
          useValue: mockProfileService,
        },
        {
          provide: I18nService,
          useValue: {
            t: jest.fn((key: string) => key),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
