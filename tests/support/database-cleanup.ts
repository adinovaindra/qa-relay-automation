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
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    throw new Error("Cleanup email cannot be empty.");
  }

  const result = await cleanupPrisma.user.deleteMany({
    where: { email: normalizedEmail },
  });

  return result.count;
}

type ConversationWithParticipants = {
  id: string;
  participants: {
    userId: string;
  }[];
};

export async function deleteTestConversationBetweenUsers(firstUserEmail: string, secondUserEmail: string): Promise<number> {
  const normalizedFirstEmail = firstUserEmail.trim().toLowerCase();
  const normalizedSecondEmail = secondUserEmail.trim().toLowerCase();

  if (!normalizedFirstEmail || !normalizedSecondEmail) {
    throw new Error("Both user emails are required for conversation cleanup.");
  }

  if (normalizedFirstEmail === normalizedSecondEmail) {
    throw new Error("Conversation cleanup requires two different users.");
  }

  const firstUser = await cleanupPrisma.user.findUnique({
    where: { email: normalizedFirstEmail },
    select: { id: true },
  });

  const secondUser = await cleanupPrisma.user.findUnique({
    where: { email: normalizedSecondEmail },
    select: { id: true },
  });

  if (!firstUser || !secondUser) {
    return 0;
  }

  const conversations: ConversationWithParticipants[] = await cleanupPrisma.conversation.findMany({
    where: {
      participants: {
        some: { userId: firstUser.id },
        every: {
          userId: {
            in: [firstUser.id, secondUser.id],
          },
        },
      },
    },
    select: {
      id: true,
      participants: {
        select: { userId: true },
      },
    },
  });

  const matchingConversationIds = conversations
    .filter((conversation) => conversation.participants.length === 2 && conversation.participants.some((participant) => participant.userId === firstUser.id) && conversation.participants.some((participant) => participant.userId === secondUser.id))
    .map((conversation) => conversation.id);

  if (matchingConversationIds.length === 0) {
    return 0;
  }

  const result = await cleanupPrisma.conversation.deleteMany({
    where: {
      id: {
        in: matchingConversationIds,
      },
    },
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

export async function deleteTestConversationById(conversationId: string): Promise<number> {
  if (!conversationId.trim()) {
    throw new Error("Conversation ID cannot be empty.");
  }

  const result = await cleanupPrisma.conversation.deleteMany({
    where: {
      id: conversationId,
    },
  });

  return result.count;
}
