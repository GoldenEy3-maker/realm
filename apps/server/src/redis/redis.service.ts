import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as Redis from "ioredis";

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly configService: ConfigService) {}

  private client: Redis.Redis;

  onModuleInit() {
    this.client = new Redis.Redis({
      host: this.configService.get<string>("REDIS_HOST", "localhost"),
      port: this.configService.get<number>("REDIS_PORT", 6379),
      password: this.configService.get<string>("REDIS_PASSWORD", ""),
    });
  }

  onModuleDestroy() {
    void this.client.quit();
  }

  set(key: string, otp: string, ttlInSeconds: number) {
    return this.client.set(key, otp, "EX", ttlInSeconds);
  }

  get(key: string) {
    return this.client.get(key);
  }

  delete(key: string) {
    return this.client.del(key);
  }

  hset(key: string, fields: Record<string, string>) {
    return this.client.hset(key, fields);
  }

  async hsetex(key: string, fields: Record<string, string>, ttlInSeconds: number) {
    const result = await this.client.hset(key, fields);
    await this.client.hexpire(
      key,
      ttlInSeconds,
      "FIELDS",
      Object.keys(fields).length,
      ...Object.keys(fields),
    );
    return result;
  }

  hincrby(key: string, field: string, increment: number) {
    return this.client.hincrby(key, field, increment);
  }

  hget(key: string, field: string) {
    return this.client.hget(key, field);
  }

  hdel(key: string, ...fields: string[]) {
    return this.client.hdel(key, ...fields);
  }
}
