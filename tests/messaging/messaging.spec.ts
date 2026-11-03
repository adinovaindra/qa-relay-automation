import { test, expect } from "@playwright/test";
import { deleteTestConversationBetweenUsers, deleteTestUserByEmail, disconnectCleanupDatabase } from "../support/database-cleanup";
import { createTestConversationBetweenUsers, createTestMessageInConversation, disconnectSetupDatabase, upsertRegisteredUser } from "../support/database-setup";

const alice = {
  name: "Alice",
  email: "alice@example.com",
  password: "password123",
};

const bob = {
  name: "Bob",
  email: "bob@example.com",
  password: "password123",
};

const protectedMessage1 = "Hi Bob!";
const protectedMessage2 = "How are you?";
const protectedMessage3 = "I hope you are good!";

test("TC-MSG-006-01 - Sent messages remain available and correctly ordered after page refresh", async ({ page }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);

    const conversationId = await createTestConversationBetweenUsers(alice.email, bob.email);

    await createTestMessageInConversation(conversationId, alice.email, protectedMessage1);
    await createTestMessageInConversation(conversationId, alice.email, protectedMessage2);

    await page.goto("/");

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/chat/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();

    await page.getByRole("button").getByText(bob.name, { exact: true }).click();

    const messages = page.locator("p.whitespace-pre-wrap");

    await expect(messages).toHaveText([protectedMessage1, protectedMessage2]);

    await page.getByRole("textbox", { name: "Message" }).fill(protectedMessage3);
    await page.getByRole("button", { name: "Send" }).click();

    const expectedMessages = [protectedMessage1, protectedMessage2, protectedMessage3];

    await expect(messages).toHaveText(expectedMessages);

    await page.reload();

    await expect(messages).toHaveText(expectedMessages);
  } catch (error) {
    primaryError = error;
  } finally {
    let conversationCleanupSucceeded = false;

    try {
      await deleteTestConversationBetweenUsers(alice.email, bob.email);
      conversationCleanupSucceeded = true;
    } catch (error) {
      cleanupErrors.push(error);
    }

    if (conversationCleanupSucceeded) {
      const userCleanupResults = await Promise.allSettled([deleteTestUserByEmail(alice.email), deleteTestUserByEmail(bob.email)]);

      for (const result of userCleanupResults) {
        if (result.status === "rejected") {
          cleanupErrors.push(result.reason);
        }
      }
    }

    const disconnectResults = await Promise.allSettled([disconnectCleanupDatabase(), disconnectSetupDatabase()]);

    for (const result of disconnectResults) {
      if (result.status === "rejected") {
        cleanupErrors.push(result.reason);
      }
    }
  }

  if (primaryError && cleanupErrors.length > 0) {
    throw new AggregateError([primaryError, ...cleanupErrors], "Test execution and cleanup both encountered errors.");
  }

  if (primaryError) {
    throw primaryError;
  }

  if (cleanupErrors.length > 0) {
    throw new AggregateError(cleanupErrors, "Test cleanup encountered errors.");
  }
});
