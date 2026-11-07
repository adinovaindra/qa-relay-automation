import { test, expect } from "@playwright/test";
import { deleteTestConversationBetweenUsers, deleteTestUserByEmail, disconnectCleanupDatabase } from "../support/database-cleanup";
import { upsertRegisteredUser, disconnectSetupDatabase } from "../support/database-setup";

const alice = {
  name: "Alice",
  email: "alice@example.com",
  password: "password123",
  confirmPassword: "password123",
};

const bob = {
  name: "Bob",
  email: "bob@example.com",
  password: "password123",
};

const testMessage = "Hello Bob. How are you?";

test("TC-E2E-001-01 - Complete User Registration, Messaging, and Logout Workflow", async ({ page }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);
    await deleteTestUserByEmail(alice.email);
    await deleteTestUserByEmail(bob.email);

    await upsertRegisteredUser(bob);
    await page.goto("/");
    await page.getByRole("button", { name: "Create one" }).click();

    await expect(page).toHaveURL(/\/register\/?$/);

    await page.getByLabel("Name").fill(alice.name);
    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password", { exact: true }).fill(alice.password);
    await page.getByLabel("Confirm password").fill(alice.confirmPassword);
    await page.getByRole("button", { name: "Create account" }).click();

    await expect(page).toHaveURL(/\/login\/?$/);
    await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/chat\/?$/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();

    await page.getByRole("combobox").selectOption({ label: `${bob.name} (${bob.email})` });
    await page.getByRole("button", { name: "Start Chat" }).click();

    await expect(page).toHaveURL(/\/chat\?conversationId=.+$/);
    await expect(page.getByRole("heading", { name: bob.name })).toBeVisible();

    await page.getByRole("textbox", { name: "Message" }).fill(testMessage);
    await page.getByRole("button", { name: "Send" }).click();

    const messages = page.locator("p.whitespace-pre-wrap");

    await expect(messages).toHaveText([testMessage]);

    await page.getByRole("button", { name: "Logout" }).click();

    await expect(page).toHaveURL(/\/login\/?$/);
    await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();

    await page.goto("/chat");

    await expect(page).toHaveURL(/\/login\/?$/);
    await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Conversations" })).toHaveCount(0);
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
