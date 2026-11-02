import { test, expect } from "@playwright/test";

import { deleteTestConversationById, deleteTestConversationBetweenUsers, deleteTestUserByEmail, disconnectCleanupDatabase } from "../support/database-cleanup";

import { getMessageSenderIdByContent, getUserIdByEmail, getConversationParticipantIds, verifyMessageDoesNotExist, createTestConversationBetweenUsers, createTestMessageInConversation, upsertRegisteredUser, disconnectSetupDatabase } from "../support/database-setup";

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

const charlie = {
  name: "Charlie",
  email: "charlie@example.com",
  password: "password123",
};

const protectedMessage = "Hi Bob. How are you?";
const unauthorizedMessage = "Unauthorized message attempt";

test("TC-AUTHZ-001-01 - Authorized user accesses an existing conversation", async ({ page }) => {
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

    await page.getByRole("button").getByText(bob.name, { exact: true }).click();

    await expect(page).toHaveURL(`/chat?conversationId=${existingConversationId}`);

    await expect(page.getByRole("heading", { name: bob.name })).toBeVisible();

    await expect(page.getByText("No messages yet.", { exact: true })).toBeVisible();

    await expect(
      page.getByText("Send a message to start the conversation.", {
        exact: true,
      }),
    ).toBeVisible();
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

test("TC-AUTHZ-002-01 - Non-participant cannot access another user's conversation through direct navigation", async ({ page }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  let existingConversationId: string | undefined;

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);
    await deleteTestUserByEmail(charlie.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);
    await upsertRegisteredUser(charlie);

    existingConversationId = await createTestConversationBetweenUsers(alice.email, bob.email);

    await createTestMessageInConversation(existingConversationId, alice.email, protectedMessage);

    await page.goto("/");

    await page.getByLabel("Email").fill(charlie.email);
    await page.getByLabel("Password").fill(charlie.password);

    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/chat\/?$/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();

    await page.goto(`/chat?conversationId=${existingConversationId}`);

    await expect(page.getByText(protectedMessage, { exact: true })).not.toBeVisible();
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
      const userCleanupResults = await Promise.allSettled([deleteTestUserByEmail(alice.email), deleteTestUserByEmail(bob.email), deleteTestUserByEmail(charlie.email)]);

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

test("TC-AUTHZ-002-02 - API request cannot retrieve conversation data for a non-participant", async ({ request }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);
    await upsertRegisteredUser(charlie);

    const conversationId = await createTestConversationBetweenUsers(alice.email, bob.email);

    await createTestMessageInConversation(conversationId, alice.email, protectedMessage);

    const loginResponse = await request.post("/api/auth/login", {
      data: {
        email: charlie.email,
        password: charlie.password,
      },
    });

    expect(loginResponse.ok()).toBe(true);

    const loginBody = await loginResponse.json();

    expect(loginBody.success).toBe(true);

    const retrievalResponse = await request.get(`/api/conversations/${conversationId}/messages`);

    const retrievalBody = await retrievalResponse.json();

    expect(retrievalBody.success).toBe(false);
    expect(retrievalBody.error.code).toBe("FORBIDDEN");

    expect(JSON.stringify(retrievalBody)).not.toContain(protectedMessage);
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
      const userCleanupResults = await Promise.allSettled([deleteTestUserByEmail(alice.email), deleteTestUserByEmail(bob.email), deleteTestUserByEmail(charlie.email)]);

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

test("TC-AUTHZ-005-01 - Server-side authorization prevents unauthorized message creation when client-side restrictions are bypassed", async ({ request }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  let conversationId: string | undefined;

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);
    await upsertRegisteredUser(charlie);

    conversationId = await createTestConversationBetweenUsers(alice.email, bob.email);

    const loginResponse = await request.post("/api/auth/login", {
      data: {
        email: charlie.email,
        password: charlie.password,
      },
    });

    expect(loginResponse.ok()).toBeTruthy();

    const loginBody = await loginResponse.json();

    expect(loginBody.success).toBe(true);

    const messageResponse = await request.post(`/api/conversations/${conversationId}/messages`, {
      data: {
        content: unauthorizedMessage,
      },
    });

    expect(messageResponse.status()).toBe(403);

    const messageBody = await messageResponse.json();

    expect(messageBody.success).toBe(false);
    expect(messageBody.error.code).toBe("FORBIDDEN");

    await verifyMessageDoesNotExist(conversationId, unauthorizedMessage);
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
      const userCleanupResults = await Promise.allSettled([deleteTestUserByEmail(alice.email), deleteTestUserByEmail(bob.email), deleteTestUserByEmail(charlie.email)]);

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

test("TC-AUTHZ-003-01 - Client-provided user identity does not override the authenticated user's identity", async ({ request }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  let conversationId: string | undefined;

  try {
    // Arrange: prepare the three registered users.
    await deleteTestConversationBetweenUsers(alice.email, charlie.email);
    await deleteTestConversationBetweenUsers(bob.email, charlie.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);
    await upsertRegisteredUser(charlie);

    const aliceUserId = await getUserIdByEmail(alice.email);
    const bobUserId = await getUserIdByEmail(bob.email);
    const charlieUserId = await getUserIdByEmail(charlie.email);

    // Act: authenticate as Alice.
    const loginResponse = await request.post("/api/auth/login", {
      data: {
        email: alice.email,
        password: alice.password,
      },
    });

    expect(loginResponse.ok()).toBeTruthy();

    const loginBody = await loginResponse.json();

    expect(loginBody.success).toBe(true);

    // Act: inject Bob's identity into the request body.
    const conversationResponse = await request.post("/api/conversations", {
      data: {
        targetUserId: charlieUserId,
        userId: bobUserId,
      },
    });

    const conversationBody = await conversationResponse.json();

    conversationId = conversationBody.data?.conversationId;

    expect(conversationResponse.status()).toBe(201);
    expect(conversationBody.success).toBe(true);
    expect(conversationId).toBeTruthy();

    const participantIds = await getConversationParticipantIds(conversationId!);

    expect(participantIds).toHaveLength(2);
    expect(participantIds).toContain(aliceUserId);
    expect(participantIds).toContain(charlieUserId);
    expect(participantIds).not.toContain(bobUserId);
  } catch (error) {
    primaryError = error;
  } finally {
    let conversationCleanupSucceeded = false;

    try {
      if (conversationId) {
        await deleteTestConversationById(conversationId);
      }

      await deleteTestConversationBetweenUsers(alice.email, charlie.email);
      await deleteTestConversationBetweenUsers(bob.email, charlie.email);

      conversationCleanupSucceeded = true;
    } catch (error) {
      cleanupErrors.push(error);
    }

    if (conversationCleanupSucceeded) {
      const userCleanupResults = await Promise.allSettled([deleteTestUserByEmail(alice.email), deleteTestUserByEmail(bob.email), deleteTestUserByEmail(charlie.email)]);

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

test("TC-AUTHZ-004-01 - Message is attributed to the authenticated user", async ({ page }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  let conversationId: string | undefined;

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);

    conversationId = await createTestConversationBetweenUsers(alice.email, bob.email);

    const aliceUserId = await getUserIdByEmail(alice.email);

    await page.goto("/");

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);

    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/chat\/?$/);

    await page.getByRole("button").getByText(bob.name, { exact: true }).click();

    await expect(page).toHaveURL(`/chat?conversationId=${conversationId}`);

    await expect(page.getByRole("heading", { name: bob.name })).toBeVisible();

    const messageResponsePromise = page.waitForResponse((response) => response.url().includes(`/api/conversations/${conversationId}/messages`) && response.request().method() === "POST");

    await page.getByLabel("Message").fill(protectedMessage);

    await page.getByRole("button", { name: "Send" }).click();

    const messageResponse = await messageResponsePromise;

    expect(messageResponse.status()).toBe(201);

    const messageBody = await messageResponse.json();

    expect(messageBody.success).toBe(true);
    expect(messageBody.data.content).toBe(protectedMessage);
    expect(messageBody.data.senderId).toBe(aliceUserId);

    const displayedMessage = page
      .getByText(protectedMessage, {
        exact: true,
      })
      .last();

    await expect(displayedMessage).toBeVisible();

    const messageContainer = displayedMessage.locator("xpath=../../..");

    await expect(messageContainer).toHaveClass(/justify-end/);

    const persistedSenderId = await getMessageSenderIdByContent(conversationId, protectedMessage);

    expect(persistedSenderId).toBe(aliceUserId);
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

test("TC-AUTHZ-004-02 - Client-provided sender identity cannot override the authenticated sender", async ({ request }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  let conversationId: string | undefined;

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);
    await upsertRegisteredUser(charlie);

    conversationId = await createTestConversationBetweenUsers(alice.email, bob.email);

    const aliceUserId = await getUserIdByEmail(alice.email);
    const charlieUserId = await getUserIdByEmail(charlie.email);

    const loginResponse = await request.post("/api/auth/login", {
      data: {
        email: alice.email,
        password: alice.password,
      },
    });

    expect(loginResponse.ok()).toBeTruthy();

    const loginBody = await loginResponse.json();

    expect(loginBody.success).toBe(true);

    const messageResponse = await request.post(`/api/conversations/${conversationId}/messages`, {
      data: {
        content: protectedMessage,
        senderId: charlieUserId,
      },
    });

    expect(messageResponse.status()).toBe(201);

    const messageBody = await messageResponse.json();

    expect(messageBody.success).toBe(true);
    expect(messageBody.data.conversationId).toBe(conversationId);
    expect(messageBody.data.content).toBe(protectedMessage);

    expect(messageBody.data.senderId).toBe(aliceUserId);
    expect(messageBody.data.senderId).not.toBe(charlieUserId);

    const persistedSenderId = await getMessageSenderIdByContent(conversationId, protectedMessage);

    expect(persistedSenderId).toBe(aliceUserId);
    expect(persistedSenderId).not.toBe(charlieUserId);
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
      const userCleanupResults = await Promise.allSettled([deleteTestUserByEmail(alice.email), deleteTestUserByEmail(bob.email), deleteTestUserByEmail(charlie.email)]);

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
