import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const envFile = path.join(rootDir, ".env.test");

function fail(message) {
  console.error(`\n[QA SAFETY GUARD] ${message}`);
  process.exit(1);
}

if (!existsSync(envFile)) {
  fail("Missing .env.test. Configure the test environment first.");
}

try {
  delete process.env.QA_AUTOMATION_ENABLED;
  delete process.env.RELAY_APP_DIR;
  delete process.env.DATABASE_URL;
  delete process.env.DATABASE_CLEANUP_URL;
  delete process.env.JWT_SECRET;

  process.loadEnvFile(envFile);
} catch {
  fail("Could not load .env.test. Check its syntax.");
}

if (process.env.QA_AUTOMATION_ENABLED !== "1") {
  fail("QA_AUTOMATION_ENABLED must be set to 1.");
}

const rawDatabaseUrl = process.env.DATABASE_URL;

if (!rawDatabaseUrl) {
  fail("DATABASE_URL is missing.");
}

let databaseUrl;

try {
  databaseUrl = new URL(rawDatabaseUrl);
} catch {
  fail("DATABASE_URL is not a valid URL.");
}

if (!["postgres:", "postgresql:"].includes(databaseUrl.protocol)) {
  fail("Only PostgreSQL database URLs are allowed.");
}

if (!["localhost", "127.0.0.1"].includes(databaseUrl.hostname)) {
  fail("Database host must be localhost or 127.0.0.1.");
}

if (databaseUrl.port !== "5432") {
  fail("Database port must be 5432.");
}

const databaseName = decodeURIComponent(
  databaseUrl.pathname.replace(/^\/+/, ""),
);

if (databaseName !== "relay_qa_automation") {
  fail("Refusing to run: database must be relay_qa_automation.");
}

if (decodeURIComponent(databaseUrl.username) !== "relay_test_user") {
  fail("Database role must be relay_test_user.");
}

if (
  !databaseUrl.password ||
  /(replace_with|change_me|your_password)/i.test(databaseUrl.password)
) {
  fail("Replace the password placeholder with the test role password.");
}

const rawCleanupDatabaseUrl = process.env.DATABASE_CLEANUP_URL;

if (!rawCleanupDatabaseUrl) {
  fail("DATABASE_CLEANUP_URL is missing.");
}

let cleanupDatabaseUrl;

try {
  cleanupDatabaseUrl = new URL(rawCleanupDatabaseUrl);
} catch {
  fail("DATABASE_CLEANUP_URL is not a valid URL.");
}

if (!["postgres:", "postgresql:"].includes(cleanupDatabaseUrl.protocol)) {
  fail("Cleanup database must use PostgreSQL.");
}

if (!["localhost", "127.0.0.1"].includes(cleanupDatabaseUrl.hostname)) {
  fail("Cleanup database host must be localhost or 127.0.0.1.");
}

if (cleanupDatabaseUrl.port !== "5432") {
  fail("Cleanup database port must be 5432.");
}

const cleanupDatabaseName = decodeURIComponent(
  cleanupDatabaseUrl.pathname.replace(/^\/+/, ""),
);

if (cleanupDatabaseName !== "relay_qa_automation") {
  fail("Refusing to run: cleanup database must be relay_qa_automation.");
}

if (decodeURIComponent(cleanupDatabaseUrl.username) !== "relay_qa_cleanup") {
  fail("Cleanup database role must be relay_qa_cleanup.");
}

if (
  !cleanupDatabaseUrl.password ||
  /(replace_with|change_me|your_password)/i.test(cleanupDatabaseUrl.password)
) {
  fail("Replace the password placeholder with the cleanup role password.");
}

const jwtSecret = process.env.JWT_SECRET;

if (
  !jwtSecret ||
  jwtSecret.length < 32 ||
  /replace_with|change_me/i.test(jwtSecret)
) {
  fail("JWT_SECRET must be a test-only secret of at least 32 characters.");
}

const relayAppDir = process.env.RELAY_APP_DIR?.trim();

if (!relayAppDir) {
  fail("RELAY_APP_DIR is missing.");
}

if (!path.isAbsolute(relayAppDir)) {
  fail("RELAY_APP_DIR must be an absolute path.");
}

if (
  !existsSync(path.join(relayAppDir, "package.json")) ||
  !existsSync(path.join(relayAppDir, "prisma", "schema.prisma"))
) {
  fail("RELAY_APP_DIR must point to the Relay application repository.");
}

console.log(
  "[QA SAFETY GUARD] Passed: local PostgreSQL, database relay_qa_automation, role relay_test_user.",
);
