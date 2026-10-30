import { createRequire } from "node:module";
import path from "node:path";

const cleanupDatabaseUrl = process.env.DATABASE_CLEANUP_URL;
const relayAppDir = process.env.RELAY_APP_DIR;

if (!cleanupDatabaseUrl) {
  throw new Error("DATABASE_CLEANUP_URL is missing.");
}

if (!relayAppDir) {
  throw new Error("RELAY_APP_DIR is missing.");
}

const relayRequire = createRequire(path.join(relayAppDir, "package.json"));

const { PrismaClient } = relayRequire("@prisma/client");

const cleanupPrisma = new PrismaClient({
  datasources: {
    db: {
      url: cleanupDatabaseUrl,
    },
  },
});

export async function deleteTestUserByEmail(email: string): Promise<number> {
  if (!email.trim()) {
    throw new Error("Cleanup email cannot be empty.");
  }

  const result = await cleanupPrisma.user.deleteMany({
    where: { email },
  });

  return result.count;
}

export async function disconnectCleanupDatabase(): Promise<void> {
  await cleanupPrisma.$disconnect();
}

export async function verifyCleanupDatabaseConnection(): Promise<void> {
  await cleanupPrisma.$connect();
  await cleanupPrisma.$queryRaw`SELECT 1`;
}