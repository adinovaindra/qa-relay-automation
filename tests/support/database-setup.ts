import { createRequire } from "node:module";
import path from "node:path";

const databaseUrl = process.env.DATABASE_URL;
const relayAppDir = process.env.RELAY_APP_DIR;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing.");
}

if (!relayAppDir) {
  throw new Error("RELAY_APP_DIR is missing.");
}

const relayRequire = createRequire(path.join(relayAppDir, "package.json"));

const { PrismaClient } = relayRequire("@prisma/client");
const bcrypt = relayRequire("bcryptjs");

const setupPrisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

type RegisteredUserSetup = {
  name: string;
  email: string;
  password: string;
};

export async function upsertRegisteredUser(user: RegisteredUserSetup): Promise<void> {
  const name = user.name.trim();
  const email = user.email.trim().toLowerCase();

  if (!name) {
    throw new Error("Test user name cannot be empty.");
  }

  if (!email) {
    throw new Error("Test user email cannot be empty.");
  }

  if (!user.password) {
    throw new Error("Test user password cannot be empty.");
  }

  const passwordHash = await bcrypt.hash(user.password, 10);

  await setupPrisma.user.upsert({
    where: {
      email,
    },
    update: {
      name,
      passwordHash,
    },
    create: {
      name,
      email,
      passwordHash,
    },
  });
}

export async function createTestConversationBetweenUsers(firstUserEmail: string, secondUserEmail: string): Promise<string> {
  const normalizedFirstEmail = firstUserEmail.trim().toLowerCase();
  const normalizedSecondEmail = secondUserEmail.trim().toLowerCase();

  if (!normalizedFirstEmail || !normalizedSecondEmail) {
    throw new Error("Both user emails are required to create a test conversation.");
  }

  if (normalizedFirstEmail === normalizedSecondEmail) {
    throw new Error("A test conversation requires two different users.");
  }

  const firstUser = await setupPrisma.user.findUnique({
    where: {
      email: normalizedFirstEmail,
    },
    select: {
      id: true,
    },
  });

  const secondUser = await setupPrisma.user.findUnique({
    where: {
      email: normalizedSecondEmail,
    },
    select: {
      id: true,
    },
  });

  if (!firstUser || !secondUser) {
    throw new Error("Precondition failed: both users must be registered before creating a test conversation.");
  }

  const conversation = await setupPrisma.conversation.create({
    data: {
      participants: {
        create: [
          {
            user: {
              connect: {
                id: firstUser.id,
              },
            },
          },
          {
            user: {
              connect: {
                id: secondUser.id,
              },
            },
          },
        ],
      },
    },
    select: {
      id: true,
    },
  });

  return conversation.id;
}

export async function disconnectSetupDatabase(): Promise<void> {
  await setupPrisma.$disconnect();
}

export async function verifyUserDoesNotExist(email: string): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    throw new Error("Test user email cannot be empty.");
  }

  const existingUser = await setupPrisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
    select: {
      email: true,
    },
  });

  if (existingUser) {
    throw new Error(`Precondition failed: ${normalizedEmail} is already registered.`);
  }
}

export async function getUserIdByEmail(email: string): Promise<string> {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await setupPrisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    throw new Error(`User not found: ${normalizedEmail}`);
  }

  return user.id;
}

export async function createTestMessageInConversation(conversationId: string, senderEmail: string, content: string, createdAt?: Date): Promise<string> {
  const normalizedConversationId = conversationId.trim();
  const normalizedSenderEmail = senderEmail.trim().toLowerCase();
  const normalizedContent = content.trim();

  if (!normalizedConversationId) {
    throw new Error("Conversation ID is required to create a test message.");
  }

  if (!normalizedSenderEmail) {
    throw new Error("Sender email is required to create a test message.");
  }

  if (!normalizedContent) {
    throw new Error("Test message content cannot be empty.");
  }

  const sender = await setupPrisma.user.findUnique({
    where: {
      email: normalizedSenderEmail,
    },
    select: {
      id: true,
    },
  });

  if (!sender) {
    throw new Error(`Test message sender not found: ${normalizedSenderEmail}`);
  }

  const participant = await setupPrisma.conversationParticipant.findUnique({
    where: {
      conversationId_userId: {
        conversationId: normalizedConversationId,
        userId: sender.id,
      },
    },
    select: {
      userId: true,
    },
  });

  if (!participant) {
    throw new Error("Precondition failed: message sender is not a participant in the target conversation.");
  }

  const message = await setupPrisma.message.create({
    data: {
      conversationId: normalizedConversationId,
      senderId: sender.id,
      content: normalizedContent,
      ...(createdAt ? { createdAt } : {}),
    },
    select: {
      id: true,
    },
  });

  return message.id;
}

export async function verifyMessageDoesNotExist(conversationId: string, content: string): Promise<void> {
  if (!conversationId.trim()) {
    throw new Error("Conversation ID cannot be empty.");
  }

  if (!content.trim()) {
    throw new Error("Message content cannot be empty.");
  }

  const existingMessage = await setupPrisma.message.findFirst({
    where: {
      conversationId,
      content,
    },
    select: {
      id: true,
    },
  });

  if (existingMessage) {
    throw new Error("Verification failed: the unauthorized message was persisted in the database.");
  }
}

export async function getConversationParticipantIds(conversationId: string): Promise<string[]> {
  if (!conversationId.trim()) {
    throw new Error("Conversation ID cannot be empty.");
  }

  const conversation = await setupPrisma.conversation.findUnique({
    where: {
      id: conversationId,
    },
    select: {
      participants: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!conversation) {
    throw new Error(`Conversation not found: ${conversationId}`);
  }

  return conversation.participants.map((participant: { userId: string }) => participant.userId);
}

export async function getMessageSenderIdByContent(conversationId: string, content: string): Promise<string> {
  if (!conversationId.trim()) {
    throw new Error("Conversation ID cannot be empty.");
  }

  if (!content.trim()) {
    throw new Error("Message content cannot be empty.");
  }

  const message = await setupPrisma.message.findFirst({
    where: {
      conversationId,
      content,
    },
    select: {
      senderId: true,
    },
  });

  if (!message) {
    throw new Error("Message not found in the database.");
  }

  return message.senderId;
}

export async function verifyMessagesHaveEqualTimestamps(messageIds: string[]): Promise<void> {
  if (messageIds.length < 2) {
    throw new Error("At least two message IDs are required.");
  }

  const messages = await setupPrisma.message.findMany({
    where: {
      id: {
        in: messageIds,
      },
    },
    select: {
      id: true,
      createdAt: true,
    },
  });

  if (messages.length !== messageIds.length) {
    throw new Error("Not all seeded messages were found.");
  }

  const firstTimestamp = messages[0].createdAt.getTime();

  const allTimestampsEqual = messages.every((message: { id: string; createdAt: Date }) => message.createdAt.getTime() === firstTimestamp);

  if (!allTimestampsEqual) {
    throw new Error("Precondition failed: seeded messages do not have equal timestamps.");
  }
}
