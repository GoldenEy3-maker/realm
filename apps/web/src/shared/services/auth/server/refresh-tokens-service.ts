import { Logger } from "@/shared/lib/logger";
import type { Timeout } from "@/shared/types/timeout";

import type { AuthApi } from "../api/auth-api";
import type { AuthResponseDTO } from "../model/auth-response-dto";

export interface StorageEntry {
  promise: Promise<AuthResponseDTO | null>;
  timeoutId?: Timeout;
  refCount: number;
}

export class RefreshTokensService {
  constructor(
    private readonly storage: Map<string, StorageEntry>,
    private readonly authApi: AuthApi,
  ) {}

  async refreshTokens(refreshToken: string): Promise<AuthResponseDTO | null> {
    const entry = this.getOrCreateEntry(refreshToken);
    entry.refCount++;

    let response: AuthResponseDTO | null = null;

    try {
      response = await entry.promise;
    } catch (error) {
      Logger.error(error);
    } finally {
      this.scheduleCleanup(refreshToken);
    }

    return response;
  }

  private getOrCreateEntry(refreshToken: string): StorageEntry {
    const existingEntry = this.storage.get(refreshToken);

    if (existingEntry) {
      if (existingEntry.timeoutId) {
        clearTimeout(existingEntry.timeoutId);
        existingEntry.timeoutId = undefined;
      }

      return existingEntry;
    }

    const promise = this.authApi.refreshTokens({ body: { refreshToken } });
    const entry: StorageEntry = { promise, refCount: 0 };

    this.storage.set(refreshToken, entry);

    return entry;
  }

  private scheduleCleanup(refreshToken: string): void {
    const entry = this.storage.get(refreshToken);
    if (!entry) return;

    entry.refCount--;

    if (entry.refCount <= 0) {
      entry.timeoutId = setTimeout(() => {
        this.storage.delete(refreshToken);
      }, 1000);
    }
  }
}
