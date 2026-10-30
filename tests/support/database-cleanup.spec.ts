import { test, expect } from "@playwright/test";
import { randomUUID } from "node:crypto";
import {
  deleteTestUserByEmail,
  disconnectCleanupDatabase,
} from "./database-cleanup";

test("Cleanup role can delete a user created through registration", async ({
  request,
}) => {
  const testData = {
    name: "Disposable QA User",
    email: `dino.cleanup.${randomUUID()}@wakwaw.com`,
    password: "TestPassword123!",
  };

  let testFailure: unknown;
  const cleanupErrors: unknown[] = [];

  try {
    const response = await request.post("/api/auth/register", {
      data: testData,
    });

    expect(response.status()).toBe(201);
    expect(await response.json()).toEqual({ success: true });
  } catch (error) {
    testFailure = error;
  }

  try {
    const deletedCount = await deleteTestUserByEmail(testData.email);

    if (!testFailure) {
      expect(deletedCount).toBe(1);
    }
  } catch (error) {
    cleanupErrors.push(error);
  }

  try {
    await disconnectCleanupDatabase();
  } catch (error) {
    cleanupErrors.push(error);
  }

  if (testFailure && cleanupErrors.length > 0) {
    const cleanupMessages = cleanupErrors
      .map((error) => (error instanceof Error ? error.message : String(error)))
      .join("; ");

    throw new Error(
      `Registration test failed: ${
        testFailure instanceof Error ? testFailure.message : String(testFailure)
      }. Cleanup also failed: ${cleanupMessages}`,
    );
  }

  if (testFailure) {
    throw testFailure;
  }

  if (cleanupErrors.length > 0) {
    throw cleanupErrors[0];
  }
});
