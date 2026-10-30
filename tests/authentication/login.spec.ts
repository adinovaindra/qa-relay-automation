import { test, expect } from "@playwright/test";
import { upsertRegisteredUser, disconnectSetupDatabase } from "../support/database-setup";
import { deleteTestUserByEmail, disconnectCleanupDatabase } from "../support/database-cleanup";

const testData = {
  name: "Registered User",
  email: "registered.user@example.com",
  password: "password123",
};

test("TC-AUTH-006-01 — Registered user logs in successfully", async ({ page }) => {
  let setupCompleted = false;
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  try {
    await upsertRegisteredUser(testData);
    setupCompleted = true;

    await page.goto("/login");

    await page.getByLabel("Email").fill(testData.email);
    await page.getByLabel("Password").fill(testData.password);

    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/chat\/?$/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();
  } catch (error) {
    primaryError = error;
  } finally {
    if (setupCompleted) {
      try {
        await deleteTestUserByEmail(testData.email);
      } catch (error) {
        cleanupErrors.push(error);
      }
    }

    try {
      await disconnectCleanupDatabase();
    } catch (error) {
      cleanupErrors.push(error);
    }

    try {
      await disconnectSetupDatabase();
    } catch (error) {
      cleanupErrors.push(error);
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
