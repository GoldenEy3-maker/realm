import { Test, TestingModule } from "@nestjs/testing";
import { RedisService } from "./redis.service";
import { ConfigModule } from "@nestjs/config";

describe("RedisService", () => {
  let service: RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [RedisService],
      exports: [RedisService],
    }).compile();

    service = module.get<RedisService>(RedisService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
