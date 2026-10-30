import { test, expect, type Response } from "@playwright/test";
import { deleteTestUserByEmail, disconnectCleanupDatabase } from "../support/database-cleanup";

test("TC-AUTH-001-01 - Register a new account with valid required information", async ({ page }) => {
  const testData = {
    name: "Test User",
    email: "test.user@example.com",
    password: "testuser123",
    confirmPassword: "testuser123",
  };

  let registrationCreated = false;
  let primaryError: unknown;
  let cleanupError: unknown;

  const registrationResponseHandler = (response: Response) => {
    const responseUrl = new URL(response.url());

    if (responseUrl.pathname === "/api/auth/register" && response.request().method() === "POST") {
      registrationCreated = response.status() === 201;
    }
  };

  page.on("response", registrationResponseHandler);

  try {
    await page.goto("/");
    await page.getByRole("button", { name: "Create one" }).click();

    await expect(page).toHaveURL(/\/register\/?$/);

    await page.getByLabel("Name").pressSequentially(testData.name, { delay: 100 });
    await page.getByLabel("Email").pressSequentially(testData.email, { delay: 100 });
    await page.getByLabel("Password", { exact: true }).pressSequentially(testData.password, { delay: 100 });
    await page.getByLabel("Confirm password").pressSequentially(testData.confirmPassword, { delay: 100 });

    await page.getByRole("button", { name: "Create account" }).click();

    await expect(page).toHaveURL(/\/login\/?$/);
    await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();
  } catch (error) {
    primaryError = error;
  } finally {
    page.off("response", registrationResponseHandler);

    if (registrationCreated) {
      try {
        await deleteTestUserByEmail(testData.email);
      } catch (error) {
        cleanupError = error;
      }
    }

    try {
      await disconnectCleanupDatabase();
    } catch (error) {
      cleanupError = cleanupError ? new AggregateError([cleanupError, error], "Multiple cleanup operations failed.") : error;
    }
  }

  if (primaryError && cleanupError) {
    throw new AggregateError([primaryError, cleanupError], "Registration test and cleanup both failed.");
  }

  if (primaryError) {
    throw primaryError;
  }

  if (cleanupError) {
    throw cleanupError;
  }
});


