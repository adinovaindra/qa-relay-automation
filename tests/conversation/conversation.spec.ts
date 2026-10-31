import { test, expect } from "@playwright/test";

import { deleteTestConversationBetweenUsers, deleteTestUserByEmail, disconnectCleanupDatabase } from "../support/database-cleanup";

import { createTestConversationBetweenUsers, upsertRegisteredUser, disconnectSetupDatabase } from "../support/database-setup";

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

test("TC-CONV-002-01 - User can create a conversation with another user when no conversation exists", async ({ page }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);

    await page.goto("/");

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);

    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/chat\/?$/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();

    await page.getByRole("combobox").selectOption({ label: `${bob.name} (${bob.email})` });
    await page.getByRole("button", { name: "Start Chat" }).click();

    await expect(page.getByRole("heading", { name: bob.name })).toBeVisible();
    await expect(page).toHaveURL(/\/chat\?conversationId=.+$/);
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

test("TC-CONV-002-02 - Existing conversation is retrieved instead of creating a duplicate", async ({ page }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  let existingConversationId: string | undefined;

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);

    existingConversationId = await createTestConversationBetweenUsers(alice.email, bob.email);

    await page.goto("/");
    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/chat\/?$/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();

    await page.getByRole("combobox").selectOption({ label: `${bob.name} (${bob.email})` });
    await page.getByRole("button", { name: "Start Chat" }).click();

    await expect(page.getByRole("heading", { name: bob.name })).toBeVisible();

    const resultingConversationId = new URL(page.url()).searchParams.get("conversationId");

    expect(resultingConversationId).toBe(existingConversationId);
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

test("TC-CONV-003-01 - User cannot create a conversation with themselves through the UI", async ({ page }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  try {
    await upsertRegisteredUser(alice);

    await page.goto("/");
    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/chat\/?$/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();

    await expect(
      page.getByRole("option", {
        name: `${alice.name} (${alice.email})`,
      }),
    ).toHaveCount(0);
  } catch (error) {
    primaryError = error;
  } finally {
    try {
      await deleteTestUserByEmail(alice.email);
    } catch (error) {
      cleanupErrors.push(error);
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
