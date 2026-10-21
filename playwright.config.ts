import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, devices } from "@playwright/test";

const envFile = resolve(process.cwd(), ".env.test");
const guardFile = resolve(process.cwd(), "scripts/guard-test-database.mjs");

if (!existsSync(envFile)) {
  throw new Error(
    "Test environment file .env.test is missing. Refusing to start Playwright.",
  );
}

if (!existsSync(guardFile)) {
  throw new Error(
    "Database safety guard is missing. Refusing to start Playwright.",
  );
}

process.loadEnvFile(envFile);

const guard = spawnSync(process.execPath, [guardFile], {
  env: process.env,
  stdio: "inherit",
});

if (guard.error) {
  throw guard.error;
}

if (guard.status !== 0) {
  throw new Error(
    "Database safety guard rejected the configuration. Playwright will not start.",
  );
}

const databaseUrl = process.env.DATABASE_URL!;
const qaFlag = process.env.RELAY_QA_AUTOMATION!;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: "list",

  use: {
    baseURL: process.env.BASE_URL ?? "http://127.0.0.1:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  webServer: {
    command: "npm run dev",
    cwd: "F:/backend-journey/relay-messaging-team",
    url: process.env.BASE_URL ?? "http://127.0.0.1:3000",
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      DATABASE_URL: databaseUrl,
      RELAY_QA_AUTOMATION: qaFlag,
    },
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
