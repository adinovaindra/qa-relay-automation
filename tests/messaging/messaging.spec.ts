import { test, expect } from "@playwright/test";
import { deleteTestConversationBetweenUsers, deleteTestUserByEmail, disconnectCleanupDatabase } from "../support/database-cleanup";
import { verifyMessagesHaveEqualTimestamps, createTestConversationBetweenUsers, createTestMessageInConversation, disconnectSetupDatabase, upsertRegisteredUser } from "../support/database-setup";

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

const invalidInputs = [
  { variation: "Empty string", value: "" },
  { variation: "Spaces only", value: "   " },
  { variation: "Tabs and line breaks only", value: "\t\n" },
];

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

test("TC-MSG-006-02 - Sent messages remain available and correctly ordered after logout and re-login", async ({ page }) => {
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

    const initialMessages = [protectedMessage1, protectedMessage2];

    await expect(messages).toHaveText(initialMessages);

    await page.getByRole("textbox", { name: "Message" }).fill(protectedMessage3);
    await page.getByRole("button", { name: "Send" }).click();

    const expectedMessages = [protectedMessage1, protectedMessage2, protectedMessage3];

    await expect(messages).toHaveText(expectedMessages);

    await page.getByRole("button", { name: "Logout" }).click();

    await expect(page).toHaveURL(/\/login\/?$/);
    await expect(page.getByLabel("Email")).toBeVisible();

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/chat/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();

    await page.getByRole("button").getByText(bob.name, { exact: true }).click();

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

test("TC-MSG-009-01 - A message sent by one participant becomes available to the recipient after refresh", async ({ browser }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  let senderContext: Awaited<ReturnType<typeof browser.newContext>> | undefined;
  let recipientContext: Awaited<ReturnType<typeof browser.newContext>> | undefined;

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);

    const conversationId = await createTestConversationBetweenUsers(alice.email, bob.email);

    await createTestMessageInConversation(conversationId, alice.email, protectedMessage1);
    await createTestMessageInConversation(conversationId, alice.email, protectedMessage2);

    senderContext = await browser.newContext();
    recipientContext = await browser.newContext();

    const senderPage = await senderContext.newPage();
    const recipientPage = await recipientContext.newPage();

    const initialMessages = [protectedMessage1, protectedMessage2];

    const expectedMessages = [protectedMessage1, protectedMessage2, protectedMessage3];

    // Login as Bob in the first independent browser context.
    await recipientPage.goto("/");

    await recipientPage.getByLabel("Email").fill(bob.email);
    await recipientPage.getByLabel("Password").fill(bob.password);
    await recipientPage.getByRole("button", { name: "Sign in" }).click();

    await expect(recipientPage).toHaveURL(/chat/);
    await expect(recipientPage.getByRole("heading", { name: "Conversations" })).toBeVisible();

    await recipientPage.getByRole("button").getByText(alice.name, { exact: true }).click();

    const recipientMessages = recipientPage.locator("p.whitespace-pre-wrap");

    await expect(recipientMessages).toHaveText(initialMessages);

    // Login as Alice in the second independent browser context.
    await senderPage.goto("/");

    await senderPage.getByLabel("Email").fill(alice.email);
    await senderPage.getByLabel("Password").fill(alice.password);
    await senderPage.getByRole("button", { name: "Sign in" }).click();

    await expect(senderPage).toHaveURL(/chat/);
    await expect(senderPage.getByRole("heading", { name: "Conversations" })).toBeVisible();

    await senderPage.getByRole("button").getByText(bob.name, { exact: true }).click();

    const senderMessages = senderPage.locator("p.whitespace-pre-wrap");

    await expect(senderMessages).toHaveText(initialMessages);

    // Alice sends a new message.
    await senderPage.getByRole("textbox", { name: "Message" }).fill(protectedMessage3);
    await senderPage.getByRole("button", { name: "Send" }).click();

    // Verify that the message is immediately available to Alice.
    await expect(senderMessages).toHaveText(expectedMessages);

    // Verify that Bob's already-open conversation has not updated automatically.
    await expect(recipientMessages).toHaveText(initialMessages);

    // Bob refreshes the conversation.
    await recipientPage.reload();

    // Verify that the new message is now available to Bob in chronological order.
    await expect(recipientMessages).toHaveText(expectedMessages);
  } catch (error) {
    primaryError = error;
  } finally {
    const contextCleanupResults = await Promise.allSettled([senderContext?.close(), recipientContext?.close()]);

    for (const result of contextCleanupResults) {
      if (result.status === "rejected") {
        cleanupErrors.push(result.reason);
      }
    }

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

test("TC-MSG-001-01 - Send a valid text message within an authorized conversation", async ({ page }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);

    await createTestConversationBetweenUsers(alice.email, bob.email);

    await page.goto("/");

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/chat/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();

    await page.getByRole("button").getByText(bob.name, { exact: true }).click();

    const messageInput = page.getByRole("textbox", { name: "Message" });
    await messageInput.fill(protectedMessage1);

    await page.getByRole("button", { name: "Send" }).click();

    const messages = page.locator("p.whitespace-pre-wrap");

    await expect(messages).toHaveText([protectedMessage1]);
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

test("TC-MSG-002-01 - Empty and whitespace-only message input disables the Send button", async ({ page }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);

    await createTestConversationBetweenUsers(alice.email, bob.email);

    await page.goto("/");

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/chat/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();

    await page.getByRole("button").getByText(bob.name, { exact: true }).click();

    const messageInput = page.getByRole("textbox", { name: "Message" });
    const sendButton = page.getByRole("button", { name: "Send" });
    const messages = page.locator("p.whitespace-pre-wrap");

    for (const input of invalidInputs) {
      await test.step(`Verify ${input.variation} input cannot be submitted`, async () => {
        await messageInput.fill(input.value);
        await expect(sendButton).toBeDisabled();
        await messageInput.press("Enter");
        await expect(messages).toHaveCount(0);
      });
    }
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

test("TC-MSG-002-02 - API rejects empty and whitespace-only message content", async ({ request }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);

    const conversationId = await createTestConversationBetweenUsers(alice.email, bob.email);

    const loginResponse = await request.post("/api/auth/login", {
      data: {
        email: alice.email,
        password: alice.password,
      },
    });

    expect(loginResponse.ok()).toBe(true);

    const loginBody = await loginResponse.json();

    expect(loginBody.success).toBe(true);

    for (const input of invalidInputs) {
      await test.step(`Verify API rejects ${input.variation} content`, async () => {
        const messageResponse = await request.post(`/api/conversations/${conversationId}/messages`, {
          data: {
            content: input.value,
          },
        });

        expect(messageResponse.ok()).toBe(false);

        // Verify that no invalid message was persisted
        const historyResponse = await request.get(`/api/conversations/${conversationId}/messages`);

        expect(historyResponse.ok()).toBe(true);

        const historyBody = await historyResponse.json();

        expect(historyBody.success).toBe(true);
        expect(historyBody.data).toHaveLength(0);
      });
    }
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

test("TC-MSG-003-01 — Submitted message content trims outer whitespace while preserving internal whitespace and line breaks", async ({ page }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);

    await createTestConversationBetweenUsers(alice.email, bob.email);

    await page.goto("/");

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/chat/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();

    await page.getByRole("button").getByText(bob.name, { exact: true }).click();

    const messageInput = page.getByRole("textbox", { name: "Message" });
    const sendButton = page.getByRole("button", { name: "Send" });
    const messages = page.locator("p.whitespace-pre-wrap");

    const messageVariations = [
      {
        variation: "Leading whitespace",
        content: "  Hello",
        expected: "Hello",
      },
      {
        variation: "Trailing whitespace",
        content: "Hello  ",
        expected: "Hello",
      },
      {
        variation: "Repeated internal whitespace",
        content: "Hello   world",
        expected: "Hello   world",
      },
      {
        variation: "Line break",
        content: "Hello\nworld",
        expected: "Hello\nworld",
      },
      {
        variation: "Mixed content",
        content: "  Hello   world\n  Again  ",
        expected: "Hello   world\n  Again",
      },
    ];

    // Verify whitespace normalization and preservation for each variation
    for (const [index, input] of messageVariations.entries()) {
      await test.step(`Verify ${input.variation} matches expected normalized content`, async () => {
        await messageInput.fill(input.content);

        await expect(messageInput).toHaveValue(input.content);

        await expect(sendButton).toBeEnabled();
        await sendButton.click();

        // Wait for the submitted message to appear
        await expect(messages).toHaveCount(index + 1);

        // Compare exact text content without whitespace normalization
        const actualContent = await messages.nth(index).textContent();

        expect.soft(actualContent).toBe(input.expected);
      });
    }
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

test("TC-MSG-004-01 - Messages are displayed in chronological order", async ({ page }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);

    const conversationId = await createTestConversationBetweenUsers(alice.email, bob.email);

    const chronologicalMessages = [protectedMessage1, protectedMessage2, protectedMessage3];

    // Create messages in a known chronological sequence.
    for (const [index, message] of chronologicalMessages.entries()) {
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      await createTestMessageInConversation(conversationId, alice.email, message);
    }

    await page.goto("/");

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/chat/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();

    await page.getByRole("button").getByText(bob.name, { exact: true }).click();

    const messages = page.locator("p.whitespace-pre-wrap");

    await expect(messages).toHaveText(chronologicalMessages);
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

test("TC-MSG-005-01 - Messages with equal timestamps maintain consistent relative ordering across users, refreshes, and re-logins", async ({ page, browser }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];
  let bobContext: Awaited<ReturnType<typeof browser.newContext>> | undefined;

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);

    const conversationId = await createTestConversationBetweenUsers(alice.email, bob.email);

    const messageContents = [protectedMessage1, protectedMessage2, protectedMessage3];

    const sharedTimestamp = new Date();
    const messageIds: string[] = [];

    // Create distinguishable messages with exactly equal timestamps.
    for (const [index, message] of messageContents.entries()) {
      const messageId = await createTestMessageInConversation(conversationId, alice.email, message, sharedTimestamp);

      messageIds.push(messageId);
    }

    // Verify the timestamp equality precondition before evaluating message ordering.
    await verifyMessagesHaveEqualTimestamps(messageIds);

    // Login as Alice.
    await page.goto("/");

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/chat/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();

    await page.getByRole("button").getByText(bob.name, { exact: true }).click();

    const aliceMessages = page.locator("p.whitespace-pre-wrap");

    // Capture the initial relative order displayed to Alice.
    await expect(aliceMessages).toHaveCount(messageContents.length);

    const initialOrder = await aliceMessages.allTextContents();

    // Confirm that all seeded messages are displayed.
    expect([...initialOrder].sort()).toEqual([...messageContents].sort());

    // Refresh Alice's conversation and compare its relative order.
    await page.reload();

    await expect(aliceMessages).toHaveText(initialOrder);

    // Logout and re-login as Alice.
    await page.getByRole("button", { name: "Logout" }).click();

    await expect(page).toHaveURL(/\/login\/?$/);
    await expect(page.getByLabel("Email")).toBeVisible();

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/chat/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();

    await page.getByRole("button").getByText(bob.name, { exact: true }).click();

    // Verify that Alice sees the same relative order after re-login.
    await expect(aliceMessages).toHaveText(initialOrder);

    // Create an independent browser context for Bob.
    bobContext = await browser.newContext();

    const bobPage = await bobContext.newPage();

    await bobPage.goto("/");

    await bobPage.getByLabel("Email").fill(bob.email);
    await bobPage.getByLabel("Password").fill(bob.password);
    await bobPage.getByRole("button", { name: "Sign in" }).click();

    await expect(bobPage).toHaveURL(/chat/);
    await expect(bobPage.getByRole("heading", { name: "Conversations" })).toBeVisible();

    await bobPage.getByRole("button").getByText(alice.name, { exact: true }).click();

    const bobMessages = bobPage.locator("p.whitespace-pre-wrap");

    // Verify that Bob sees the same relative order in an independent context.
    await expect(bobMessages).toHaveText(initialOrder);
  } catch (error) {
    primaryError = error;
  } finally {
    if (bobContext) {
      try {
        await bobContext.close();
      } catch (error) {
        cleanupErrors.push(error);
      }
    }

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

test("TC-MSG-007-01 - Opening a conversation scrolls to the latest message", async ({ page }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);

    const conversationId = await createTestConversationBetweenUsers(alice.email, bob.email);

    const messageCount = 30;

    const seededMessages = Array.from({ length: messageCount }, (_, index) => `Scroll test message ${String(index + 1).padStart(2, "0")}`);

    const firstMessageTimestamp = Date.now() - (messageCount - 1) * 60_000;

    for (const [index, message] of seededMessages.entries()) {
      const createdAt = new Date(firstMessageTimestamp + index * 60_000);

      await createTestMessageInConversation(conversationId, alice.email, message, createdAt);
    }

    await page.goto("/");

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/chat/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();

    await page.getByRole("button").getByText(bob.name, { exact: true }).click();

    const messageContainer = page.locator("div.overflow-y-auto").filter({
      has: page.locator("p.whitespace-pre-wrap"),
    });

    await expect(messageContainer).toHaveCount(1);

    const messages = messageContainer.locator("p.whitespace-pre-wrap");

    await expect(messages).toHaveText(seededMessages);

    const initialMetrics = await messageContainer.evaluate((element) => ({
      clientHeight: element.clientHeight,
      scrollHeight: element.scrollHeight,
    }));

    expect(initialMetrics.scrollHeight).toBeGreaterThan(initialMetrics.clientHeight);

    // Verify that the latest message is fully visible within the message container.
    await expect
      .poll(async () => {
        return messageContainer.evaluate(
          (container, latestMessage) => {
            const containerRect = container.getBoundingClientRect();
            const messageRect = latestMessage.getBoundingClientRect();

            return messageRect.top >= containerRect.top && messageRect.bottom <= containerRect.bottom;
          },
          await messages.last().elementHandle(),
        );
      })
      .toBe(true);

    // Verify that the latest message is visible without manual scrolling.
    await expect(messages.last()).toBeInViewport();
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

test("TC-MSG-007-02 - Sending a message scrolls the conversation to the latest message", async ({ page }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);

    const conversationId = await createTestConversationBetweenUsers(alice.email, bob.email);

    const messageCount = 30;

    const seededMessages = Array.from({ length: messageCount }, (_, index) => `Scroll test message ${String(index + 1).padStart(2, "0")}`);

    const baseTimestamp = Date.now() - (messageCount - 1) * 60_000;

    for (const [index, message] of seededMessages.entries()) {
      await createTestMessageInConversation(conversationId, alice.email, message, new Date(baseTimestamp + index * 60_000));
    }

    await page.goto("/");

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/chat/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();

    await page.getByRole("button").getByText(bob.name, { exact: true }).click();

    const messageContainer = page.locator("div.overflow-y-auto").filter({
      has: page.locator("p.whitespace-pre-wrap"),
    });

    await expect(messageContainer).toHaveCount(1);

    const messages = messageContainer.locator("p.whitespace-pre-wrap");

    await expect(messages).toHaveText(seededMessages);

    const initialMetrics = await messageContainer.evaluate((element) => ({
      clientHeight: element.clientHeight,
      scrollHeight: element.scrollHeight,
    }));

    expect(initialMetrics.scrollHeight).toBeGreaterThan(initialMetrics.clientHeight);

    await messageContainer.evaluate((element) => {
      element.scrollTop = 0;
    });

    await expect.poll(() => messageContainer.evaluate((element) => element.scrollTop)).toBe(0);

    const latestExistingMessageVisible = await messageContainer.evaluate(
      (container, latestMessage) => {
        const containerRect = container.getBoundingClientRect();
        const messageRect = latestMessage.getBoundingClientRect();

        return messageRect.top >= containerRect.top && messageRect.bottom <= containerRect.bottom;
      },
      await messages.last().elementHandle(),
    );

    expect(latestExistingMessageVisible).toBe(false);

    const newMessage = `Scroll test message ${String(messageCount + 1).padStart(2, "0")}`;

    await page.getByRole("textbox", { name: "Message" }).fill(newMessage);
    await page.getByRole("button", { name: "Send" }).click();

    await expect(messages).toHaveCount(messageCount + 1);
    await expect(messages.last()).toHaveText(newMessage);

    await expect
      .poll(async () => {
        const latestMessageHandle = await messages.last().elementHandle();

        if (!latestMessageHandle) {
          return false;
        }

        return messageContainer.evaluate((container, latestMessage) => {
          const containerRect = container.getBoundingClientRect();
          const messageRect = latestMessage.getBoundingClientRect();

          return messageRect.top >= containerRect.top && messageRect.bottom <= containerRect.bottom;
        }, latestMessageHandle);
      })
      .toBe(true);
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

test("TC-MSG-008-01 - Message timestamps are displayed according to the user's locale and time zone", async ({ browser }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  let browserContext: Awaited<ReturnType<typeof browser.newContext>> | undefined;

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);

    const conversationId = await createTestConversationBetweenUsers(alice.email, bob.email);

    const locale = "en-US";
    const timeZone = "America/Los_Angeles";

    const testMessages = [
      {
        content: "Timestamp test message 01",
        createdAt: new Date("2026-01-15T12:34:00.000Z"),
      },
      {
        content: "Timestamp test message 02",
        createdAt: new Date("2026-01-15T13:47:00.000Z"),
      },
    ];

    for (const message of testMessages) {
      await createTestMessageInConversation(conversationId, alice.email, message.content, message.createdAt);
    }

    const expectedTimestamps = testMessages.map((message) =>
      new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
      }).format(message.createdAt),
    );

    browserContext = await browser.newContext({
      baseURL: "http://localhost:3000",
      locale,
      timezoneId: timeZone,
    });

    const page = await browserContext.newPage();

    await page.goto("/");

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/chat/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();

    await page.getByRole("button").getByText(bob.name, { exact: true }).click();

    const messageContainer = page.locator("div.overflow-y-auto").filter({
      has: page.locator("p.whitespace-pre-wrap"),
    });

    await expect(messageContainer).toHaveCount(1);

    const messages = messageContainer.locator("p.whitespace-pre-wrap");
    const timestamps = messageContainer.locator("time");

    await expect(messages).toHaveText(testMessages.map((message) => message.content));

    await expect(timestamps).toHaveCount(testMessages.length);

    await expect(timestamps).toHaveText(expectedTimestamps);
  } catch (error) {
    primaryError = error;
  } finally {
    if (browserContext) {
      try {
        await browserContext.close();
      } catch (error) {
        cleanupErrors.push(error);
      }
    }

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

test("TC-MSG-008-02 - Message date separators follow the user's local calendar date", async ({ browser }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  let browserContext: Awaited<ReturnType<typeof browser.newContext>> | undefined;

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);

    const conversationId = await createTestConversationBetweenUsers(alice.email, bob.email);

    const locale = "en-GB";

    const today = new Date();

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const testMessages = [
      {
        content: "Date separator test message 01",
        createdAt: twoDaysAgo,
      },
      {
        content: "Date separator test message 02",
        createdAt: yesterday,
      },
      {
        content: "Date separator test message 03",
        createdAt: today,
      },
    ];

    for (const message of testMessages) {
      await createTestMessageInConversation(conversationId, alice.email, message.content, message.createdAt);
    }

    const expectedOlderDate = new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "short",
    }).format(twoDaysAgo);

    browserContext = await browser.newContext({
      baseURL: "http://localhost:3000",
      locale,
    });

    const page = await browserContext.newPage();

    await page.goto("/");

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/chat/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();

    await page
      .getByRole("button")
      .getByText(bob.name, {
        exact: true,
      })
      .click();

    const messageContainer = page.locator("div.overflow-y-auto").filter({
      has: page.locator("p.whitespace-pre-wrap"),
    });

    await expect(messageContainer).toHaveCount(1);

    const messages = messageContainer.locator("p.whitespace-pre-wrap");

    await expect(messages).toHaveText(testMessages.map((message) => message.content));

    const dateSeparators = messageContainer.locator("span.rounded-full");

    await expect(dateSeparators).toHaveCount(3);

    await expect(dateSeparators).toHaveText([expectedOlderDate, "Yesterday", "Today"]);
  } catch (error) {
    primaryError = error;
  } finally {
    if (browserContext) {
      try {
        await browserContext.close();
      } catch (error) {
        cleanupErrors.push(error);
      }
    }

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
