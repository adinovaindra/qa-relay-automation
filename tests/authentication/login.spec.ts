import { test, expect } from "@playwright/test";
import { upsertRegisteredUser, verifyUserDoesNotExist, disconnectSetupDatabase } from "../support/database-setup";
import { deleteTestUserByEmail, disconnectCleanupDatabase } from "../support/database-cleanup";

const testData = {
  name: "Registered User",
  email: "registered.user@example.com",
  password: "password123",
};

const invalidLoginTestData = {
  email: "unregistered.user@example.com",
  password: "password123",
};

test("TC-AUTH-006-01 — Registered user logs in successfully", async ({ page }) => {
  let setupCompleted = false;
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  try {
    await upsertRegisteredUser(testData);
    setupCompleted = true;

    await page.goto("/");

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

test("TC-AUTH-007-01 — Login rejects an unregistered email with the generic authentication error", async ({ page }) => {
  let primaryError: unknown;
  let cleanupError: unknown;

  try {
    await verifyUserDoesNotExist(invalidLoginTestData.email);

    await page.goto("/");

    await page.getByLabel("Email").fill(invalidLoginTestData.email);
    await page.getByLabel("Password").fill(invalidLoginTestData.password);

    await page.getByRole("button", { name: "Sign in" }).click();

    const expectedErrorMessage = "Invalid email or password.";
    const actualErrorMessage = await page.locator("//div[@role='alert']").textContent();

    await expect(page).toHaveURL(/\/login\/?$/);
    expect(actualErrorMessage).toBe(expectedErrorMessage);
  } catch (error) {
    primaryError = error;
  } finally {
    try {
      await disconnectSetupDatabase();
    } catch (error) {
      cleanupError = error;
    }
  }

  if (primaryError && cleanupError) {
    throw new AggregateError([primaryError, cleanupError], "Test execution and cleanup both encountered errors.");
  }

  if (primaryError) {
    throw primaryError;
  }

  if (cleanupError) {
    throw cleanupError;
  }
});

test("TC-AUTH-007-02 — Login rejects an incorrect password with the generic authentication error", async ({ page }) => {
  let setupCompleted = false;
  let primaryError: unknown;
  const wrongPassword = "password124";
  const cleanupErrors: unknown[] = [];

  try {
    await upsertRegisteredUser(testData);
    setupCompleted = true;

    await page.goto("/");
    await page.getByLabel("Email").fill(testData.email);
    await page.getByLabel("Password").fill(wrongPassword);
    await page.getByRole("button", { name: "Sign in" }).click();

    const expectedErrorMessage = "Invalid email or password.";
    const errorMesage = page.locator("//div[@role='alert']");

    await expect(page).toHaveURL(/\/login\/?$/);
    await expect(errorMesage).toHaveText(expectedErrorMessage);
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

test("TC-AUTH-008-01 — Invalid credential conditions produce identical login error feedback", async ({ page }) => {
  let setupCompleted = false;
  let primaryError: unknown;
  const wrongPassword = "password124";
  const cleanupErrors: unknown[] = [];

  try {
    const expectedErrorMessage = "Invalid email or password.";
    await upsertRegisteredUser(testData);
    setupCompleted = true;

    await page.goto("/");
    await page.getByLabel("Email").fill(invalidLoginTestData.email);
    await page.getByLabel("Password").fill(invalidLoginTestData.password);
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/login\/?$/);
    const errorMesageFirstAttempt = await page.locator("//div[@role='alert']").textContent();

    await page.getByLabel("Email").fill(testData.email);
    await page.getByLabel("Password").fill(wrongPassword);
    await page.getByRole("button", { name: "Sign in" }).click();

    const errorMessageSecondAttempt = await page.locator("//div[@role='alert']").textContent();

    await expect(page).toHaveURL(/\/login\/?$/);
    expect(errorMessageSecondAttempt).toBe(errorMesageFirstAttempt);
    expect(errorMesageFirstAttempt).toEqual(expectedErrorMessage);
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
