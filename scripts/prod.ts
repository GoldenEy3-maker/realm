import {
  spawn,
  type ChildProcess,
  type SpawnOptions,
} from "node:child_process";

const SERVER_PACKAGE = "@realm/server";
const WEB_PACKAGE = "@realm/web";

class ProdRunner {
  private readonly children: ChildProcess[] = [];

  async run() {
    this.installSignalHandlers();

    try {
      await this.runWorkspace(SERVER_PACKAGE, "build");

      this.spawnWorkspace(SERVER_PACKAGE, "prod");

      await this.runWorkspace(WEB_PACKAGE, "build");
      this.spawnWorkspace(WEB_PACKAGE, "start");

      const exitCode = await this.waitForAnyChild();
      this.shutdown();
      process.exit(exitCode);
    } catch (error) {
      this.shutdown();
      throw error;
    }
  }

  private runWorkspace(packageName: string, script: string) {
    return new Promise<void>((resolve, reject) => {
      const child = this.spawnBun(["run", "--filter", packageName, script], {
        stdio: "inherit",
      });

      child.once("error", reject);
      child.once("exit", (code, signal) => {
        this.removeChild(child);

        if (code === 0) {
          resolve();
          return;
        }

        reject(
          new Error(
            `${packageName} ${script} failed (${signal ?? `exit ${code ?? "unknown"}`})`,
          ),
        );
      });
    });
  }

  private spawnWorkspace(packageName: string, script: string) {
    return this.spawnBun(["run", "--filter", packageName, script], {
      stdio: "inherit",
    });
  }

  private spawnBun(args: string[], options: SpawnOptions) {
    const child = spawn("bun", args, {
      ...options,
      env: process.env,
    });

    this.children.push(child);
    return child;
  }

  private waitForAnyChild() {
    return new Promise<number>((resolve) => {
      for (const child of this.children) {
        child.once("exit", (code, signal) => {
          resolve(code ?? (signal ? 1 : 0));
        });
      }
    });
  }

  private installSignalHandlers() {
    const onSignal = (signal: NodeJS.Signals) => {
      this.shutdown(signal);
      process.exit(1);
    };

    process.once("SIGINT", onSignal);
    process.once("SIGTERM", onSignal);
  }

  private shutdown(signal: NodeJS.Signals = "SIGTERM") {
    for (const child of [...this.children]) {
      if (child.exitCode !== null || child.signalCode) {
        continue;
      }

      child.kill(signal);
    }
  }

  private removeChild(child: ChildProcess) {
    const index = this.children.indexOf(child);

    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }
}

async function bootstrap() {
  try {
    await new ProdRunner().run();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`❌ ${message}`);
    process.exit(1);
  }
}

void bootstrap();
