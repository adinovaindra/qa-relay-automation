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
