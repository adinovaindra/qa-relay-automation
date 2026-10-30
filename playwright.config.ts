import { existsSync } from "node:fs";
import path from "node:path";
import { defineConfig, devices } from "@playwright/test";

const testEnvPath = path.resolve(__dirname, ".env.test");

if (!existsSync(testEnvPath)) {
  throw new Error("Missing .env.test. Copy .env.test.example and configure the local test environment.");
}

Reflect.deleteProperty(process.env, "QA_AUTOMATION_ENABLED");
Reflect.deleteProperty(process.env, "RELAY_APP_DIR");
Reflect.deleteProperty(process.env, "DATABASE_URL");
Reflect.deleteProperty(process.env, "DATABASE_CLEANUP_URL");
Reflect.deleteProperty(process.env, "JWT_SECRET");

process.loadEnvFile(testEnvPath);

function assertSafeTestEnvironment(): {
  rawDatabaseUrl: string;
  jwtSecret: string;
} {
  if (process.env.QA_AUTOMATION_ENABLED !== "1") {
    throw new Error("QA_AUTOMATION_ENABLED must be set to 1.");
  }

  const rawDatabaseUrl = process.env.DATABASE_URL;

  if (!rawDatabaseUrl) {
    throw new Error("DATABASE_URL is missing.");
  }

  const rawCleanupDatabaseUrl = process.env.DATABASE_CLEANUP_URL;

  if (!rawCleanupDatabaseUrl) {
    throw new Error("DATABASE_CLEANUP_URL is missing.");
  }

  let cleanupDatabaseUrl: URL;

  try {
    cleanupDatabaseUrl = new URL(rawCleanupDatabaseUrl);
  } catch {
    throw new Error("DATABASE_CLEANUP_URL is not a valid URL.");
  }

  const cleanupDatabaseName = decodeURIComponent(cleanupDatabaseUrl.pathname.replace(/^\/+/, ""));

  if (
    !["postgres:", "postgresql:"].includes(cleanupDatabaseUrl.protocol) ||
    !["localhost", "127.0.0.1"].includes(cleanupDatabaseUrl.hostname) ||
    cleanupDatabaseUrl.port !== "5432" ||
    cleanupDatabaseName !== "relay_qa_automation" ||
    decodeURIComponent(cleanupDatabaseUrl.username) !== "relay_qa_cleanup" ||
    !cleanupDatabaseUrl.password ||
    /replace_with|change_me|your_password/i.test(cleanupDatabaseUrl.password)
  ) {
    throw new Error("Unsafe cleanup configuration. Expected local PostgreSQL database relay_qa_automation using relay_qa_cleanup.");
  }

  let databaseUrl: URL;

  try {
    databaseUrl = new URL(rawDatabaseUrl);
  } catch {
    throw new Error("DATABASE_URL is not a valid URL.");
  }

  const databaseName = decodeURIComponent(databaseUrl.pathname.replace(/^\/+/, ""));

  if (!["postgres:", "postgresql:"].includes(databaseUrl.protocol) || !["localhost", "127.0.0.1"].includes(databaseUrl.hostname) || databaseUrl.port !== "5432" || databaseName !== "relay_qa_automation" || decodeURIComponent(databaseUrl.username) !== "relay_test_user") {
    throw new Error("Unsafe test configuration. Expected local PostgreSQL database relay_qa_automation using relay_test_user.");
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret || jwtSecret.length < 32 || /replace_with|change_me/i.test(jwtSecret)) {
    throw new Error("JWT_SECRET must be a test-only secret of at least 32 characters.");
  }

  return {
    rawDatabaseUrl,
    jwtSecret,
  };
}

const { rawDatabaseUrl, jwtSecret } = assertSafeTestEnvironment();

const relayAppDir = process.env.RELAY_APP_DIR?.trim();

if (!relayAppDir) {
  throw new Error("RELAY_APP_DIR is missing. Set it to the absolute path of the Relay application repository in .env.test.");
}

if (!path.isAbsolute(relayAppDir)) {
  throw new Error("RELAY_APP_DIR must be an absolute path.");
}

if (!existsSync(path.join(relayAppDir, "package.json"))) {
  throw new Error("RELAY_APP_DIR does not contain package.json. Check the Relay application path.");
}

const relayWebServerEnv = { ...process.env };
delete relayWebServerEnv.DATABASE_CLEANUP_URL;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  ...(process.env.CI ? { workers: 1 } : undefined),
  reporter: "html",

  use: {
    baseURL: "http://localhost:3000",
    trace: "on",
    screenshot: "on",
    video: "on",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  webServer: {
    command: "npm run dev",
    cwd: relayAppDir,
    url: "http://localhost:3000",
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      ...relayWebServerEnv,
      NODE_ENV: "development",
      DATABASE_URL: rawDatabaseUrl,
      JWT_SECRET: jwtSecret,
    },
  },
});
