import { chromium, test, expect, type Locator } from "@playwright/test";
import { deleteTestConversationBetweenUsers, deleteTestUserByEmail, disconnectCleanupDatabase } from "../support/database-cleanup";
import { createTestConversationBetweenUsers, createTestMessageInConversation, upsertRegisteredUser, disconnectSetupDatabase } from "../support/database-setup";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

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

const bobMessage = "Hi Bob. How are you?";
const charlieMessage = "Hi Charlie. How are you?";

async function expectWithinBounds(element: Locator, container: Locator): Promise<void> {
  const elementBox = await element.boundingBox();
  const containerBox = await container.boundingBox();

  expect(elementBox, "Element should have a measurable bounding box").not.toBeNull();
  expect(containerBox, "Container should have a measurable bounding box").not.toBeNull();

  if (!elementBox || !containerBox) {
    throw new Error("Unable to measure element or container bounds.");
  }

  expect.soft(elementBox.x).toBeGreaterThanOrEqual(containerBox.x);
  expect.soft(elementBox.y).toBeGreaterThanOrEqual(containerBox.y);

  expect.soft(elementBox.x + elementBox.width).toBeLessThanOrEqual(containerBox.x + containerBox.width);
  expect.soft(elementBox.y + elementBox.height).toBeLessThanOrEqual(containerBox.y + containerBox.height);
}

test("TC-UX-004-01 - Verify Desktop Layout with Conversations Available and None Selected", async ({ page }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);
    await deleteTestConversationBetweenUsers(alice.email, charlie.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);
    await upsertRegisteredUser(charlie);

    const aliceBobConversationId = await createTestConversationBetweenUsers(alice.email, bob.email);
    const aliceCharlieConversationId = await createTestConversationBetweenUsers(alice.email, charlie.email);

    await createTestMessageInConversation(aliceBobConversationId, alice.email, bobMessage);
    await createTestMessageInConversation(aliceCharlieConversationId, alice.email, charlieMessage);

    await page.setViewportSize({
      width: 1366,
      height: 768,
    });

    await page.goto("/");

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);

    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/chat\/?$/);

    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();

    const currentUrl = new URL(page.url());

    expect(currentUrl.pathname).toBe("/chat");
    expect(currentUrl.searchParams.has("conversationId")).toBe(false);

    const appHeader = page.locator("main > header");

    const chatLayout = page.locator("main > div > section");
    const conversationListPanel = chatLayout.locator(":scope > aside");
    const mainChatArea = chatLayout.locator(":scope > section");

    await expect(conversationListPanel).toBeVisible();
    await expect(mainChatArea).toBeVisible();

    const listBox = await conversationListPanel.boundingBox();
    const chatBox = await mainChatArea.boundingBox();
    const layoutBox = await chatLayout.boundingBox();
    const headerBox = await appHeader.boundingBox();

    expect(listBox).not.toBeNull();
    expect(chatBox).not.toBeNull();
    expect(layoutBox).not.toBeNull();
    expect(headerBox).not.toBeNull();

    if (!listBox || !chatBox || !layoutBox || !headerBox) {
      throw new Error("Unable to measure the desktop layout.");
    }

    expect.soft(listBox.x + listBox.width).toBeLessThanOrEqual(chatBox.x);

    expect.soft(Math.abs(listBox.y - chatBox.y)).toBeLessThanOrEqual(1);
    expect.soft(Math.abs(listBox.height - chatBox.height)).toBeLessThanOrEqual(1);

    await expectWithinBounds(conversationListPanel, chatLayout);
    await expectWithinBounds(mainChatArea, chatLayout);

    expect.soft(headerBox.y + headerBox.height).toBeLessThanOrEqual(layoutBox.y);

    const bobConversation = conversationListPanel.getByRole("button").filter({ hasText: bob.name });

    const charlieConversation = conversationListPanel.getByRole("button").filter({ hasText: charlie.name });

    await expect.soft(bobConversation).toBeVisible();
    await expect.soft(charlieConversation).toBeVisible();

    await expect.soft(bobConversation).toContainText(bobMessage);
    await expect.soft(charlieConversation).toContainText(charlieMessage);

    await expect(bobConversation).toBeEnabled();
    await expect(charlieConversation).toBeEnabled();

    const emptyStateHeading = mainChatArea.getByRole("heading", {
      level: 2,
    });

    await expect.soft(emptyStateHeading).toHaveText("Select a conversation.");

    await expect.soft(mainChatArea.getByText("Choose a conversation from the list or start a new chat to begin messaging.", { exact: true })).toBeVisible();

    await expect.soft(mainChatArea.getByText(bobMessage, { exact: true })).toHaveCount(0);
    await expect.soft(mainChatArea.getByText(charlieMessage, { exact: true })).toHaveCount(0);

    await expect.soft(mainChatArea.getByLabel("Message")).toHaveCount(0);

    const emptyStateDescription = mainChatArea.getByText("Choose a conversation from the list or start a new chat to begin messaging.", { exact: true });

    for (const element of [emptyStateHeading, emptyStateDescription]) {
      const textFits = await element.evaluate((node) => {
        return node.scrollWidth <= node.clientWidth && node.scrollHeight <= node.clientHeight;
      });

      expect.soft(textFits).toBe(true);
    }

    const newChatHeading = conversationListPanel.getByRole("heading", {
      name: "New Chat",
    });

    const userSelect = conversationListPanel.getByRole("combobox");
    const startChatButton = conversationListPanel.getByRole("button", {
      name: "Start Chat",
    });

    await expect(newChatHeading).toBeVisible();
    await expect(userSelect).toBeVisible();
    await expect(startChatButton).toBeVisible();

    await expect(userSelect).toBeEnabled();
    await expect(startChatButton).toBeDisabled();

    await expectWithinBounds(bobConversation, conversationListPanel);
    await expectWithinBounds(charlieConversation, conversationListPanel);
    await expectWithinBounds(userSelect, conversationListPanel);
    await expectWithinBounds(startChatButton, conversationListPanel);

    await userSelect.selectOption({
      label: `${bob.name} (${bob.email})`,
    });

    await expect.soft(startChatButton).toBeEnabled();

    await userSelect.selectOption("");

    await expect.soft(startChatButton).toBeDisabled();

    const themeToggle = page.getByRole("button", {
      name: "Toggle theme",
    });

    const initialTheme = await page.locator("html").evaluate((element) => {
      return element.dataset.theme === "dark" ? "dark" : "light";
    });

    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toBeEnabled();

    await themeToggle.click();

    const changedTheme = await page.locator("html").evaluate((element) => {
      return element.dataset.theme === "dark" ? "dark" : "light";
    });

    expect.soft(changedTheme).not.toBe(initialTheme);

    await themeToggle.click();

    const restoredTheme = await page.locator("html").evaluate((element) => {
      return element.dataset.theme === "dark" ? "dark" : "light";
    });

    expect.soft(restoredTheme).toBe(initialTheme);

    const logoutButton = page.getByRole("button", {
      name: "Logout",
      exact: true,
    });

    await expect.soft(logoutButton).toBeVisible();
    await expect.soft(logoutButton).toBeEnabled();

    const viewport = {
      width: 1366,
      height: 768,
    };

    const importantElements = [themeToggle, logoutButton, userSelect, startChatButton, bobConversation, charlieConversation];

    for (const element of importantElements) {
      const box = await element.boundingBox();

      expect(box, "Important UI element should be measurable").not.toBeNull();

      if (!box) {
        throw new Error("Unable to measure an important UI element.");
      }

      expect.soft(box.x).toBeGreaterThanOrEqual(0);
      expect.soft(box.y).toBeGreaterThanOrEqual(0);
      expect.soft(box.x + box.width).toBeLessThanOrEqual(viewport.width);
      expect.soft(box.y + box.height).toBeLessThanOrEqual(viewport.height);
    }

    const horizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth || document.body.scrollWidth > window.innerWidth;
    });

    expect.soft(horizontalOverflow).toBe(false);
  } catch (error) {
    primaryError = error;
  } finally {
    let conversationCleanupSucceeded = false;

    try {
      await deleteTestConversationBetweenUsers(alice.email, bob.email);
      await deleteTestConversationBetweenUsers(alice.email, charlie.email);

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

test("TC-UX-004-02 - Verify Mobile Layout with Conversations Available and None Selected", async ({ page }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);
    await deleteTestConversationBetweenUsers(alice.email, charlie.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);
    await upsertRegisteredUser(charlie);

    const aliceBobConversationId = await createTestConversationBetweenUsers(alice.email, bob.email);
    const aliceCharlieConversationId = await createTestConversationBetweenUsers(alice.email, charlie.email);

    await createTestMessageInConversation(aliceBobConversationId, alice.email, bobMessage);
    await createTestMessageInConversation(aliceCharlieConversationId, alice.email, charlieMessage);

    await page.setViewportSize({
      width: 390,
      height: 844,
    });

    await page.goto("/");

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);

    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/chat\/?$/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();

    const currentUrl = new URL(page.url());

    expect(currentUrl.pathname).toBe("/chat");
    expect(currentUrl.searchParams.has("conversationId")).toBe(false);

    const chatLayout = page.locator("main > div > section");
    const conversationListPanel = chatLayout.locator(":scope > aside");
    const mainChatArea = chatLayout.locator(":scope > section");

    await expect(conversationListPanel).toBeVisible();
    await expect(mainChatArea).toBeHidden();

    const bobConversation = conversationListPanel.getByRole("button").filter({ hasText: bob.name });
    const charlieConversation = conversationListPanel.getByRole("button").filter({ hasText: charlie.name });

    await expect.soft(bobConversation).toBeVisible();
    await expect.soft(charlieConversation).toBeVisible();

    await expect.soft(bobConversation).toContainText(bobMessage);
    await expect.soft(charlieConversation).toContainText(charlieMessage);

    await expect(bobConversation).toBeEnabled();
    await expect(charlieConversation).toBeEnabled();

    const initialListBox = await conversationListPanel.boundingBox();
    expect(initialListBox).not.toBeNull();

    if (!initialListBox) {
      throw new Error("Unable to measure the initial conversation list.");
    }

    expect.soft(initialListBox.x).toBeGreaterThanOrEqual(0);
    expect.soft(initialListBox.y).toBeGreaterThanOrEqual(0);
    expect.soft(initialListBox.x + initialListBox.width).toBeLessThanOrEqual(390);

    await expectWithinBounds(bobConversation, conversationListPanel);
    await expectWithinBounds(charlieConversation, conversationListPanel);

    const initialHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth || document.body.scrollWidth > window.innerWidth;
    });

    expect.soft(initialHorizontalOverflow).toBe(false);

    await bobConversation.click();

    await expect(page).toHaveURL(new RegExp(`/chat\\?conversationId=${aliceBobConversationId}$`));

    await expect(mainChatArea).toBeVisible();
    await expect(conversationListPanel).toBeHidden();

    await expect(
      mainChatArea.getByRole("heading", {
        name: bob.name,
        exact: true,
      }),
    ).toBeVisible();

    await expect(mainChatArea.getByText(bobMessage, { exact: true })).toBeVisible();

    const messageInput = mainChatArea.getByLabel("Message");

    const sendButton = mainChatArea.getByRole("button", {
      name: "Send",
      exact: true,
    });

    await expect(messageInput).toBeVisible();
    await expect(messageInput).toBeEnabled();

    await expect(sendButton).toBeVisible();
    await expect(sendButton).toBeDisabled();

    const backButton = mainChatArea.getByRole("link", {
      name: "Back to conversations",
    });

    await expect(backButton).toBeVisible();
    await expect(backButton).toBeEnabled();

    const selectedLayoutBox = await mainChatArea.boundingBox();

    expect(selectedLayoutBox).not.toBeNull();

    if (!selectedLayoutBox) {
      throw new Error("Unable to measure the selected conversation area.");
    }

    expect.soft(selectedLayoutBox.x).toBeGreaterThanOrEqual(0);
    expect.soft(selectedLayoutBox.y).toBeGreaterThanOrEqual(0);
    expect.soft(selectedLayoutBox.x + selectedLayoutBox.width).toBeLessThanOrEqual(390);

    await expectWithinBounds(backButton, mainChatArea);
    await expectWithinBounds(messageInput, mainChatArea);
    await expectWithinBounds(sendButton, mainChatArea);

    const selectedHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth || document.body.scrollWidth > window.innerWidth;
    });

    expect.soft(selectedHorizontalOverflow).toBe(false);

    await backButton.click();

    await expect(page).toHaveURL(/\/chat\/?$/);
    await expect(conversationListPanel).toBeVisible();
    await expect(mainChatArea).toBeHidden();
    await expect(bobConversation).toBeVisible();
    await expect(charlieConversation).toBeVisible();

    const returnedUrl = new URL(page.url());

    expect(returnedUrl.pathname).toBe("/chat");
    expect(returnedUrl.searchParams.has("conversationId")).toBe(false);

    const returnedHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth || document.body.scrollWidth > window.innerWidth;
    });

    expect.soft(returnedHorizontalOverflow).toBe(false);
  } catch (error) {
    primaryError = error;
  } finally {
    let conversationCleanupSucceeded = false;

    try {
      await deleteTestConversationBetweenUsers(alice.email, bob.email);
      await deleteTestConversationBetweenUsers(alice.email, charlie.email);

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

test("TC-UX-008-01 - Verify Mobile Empty State Without Conversations and After Starting a New Chat", async ({ page }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);

    await page.setViewportSize({
      width: 390,
      height: 844,
    });

    await page.goto("/");

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);

    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/chat\/?$/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();

    const currentUrl = new URL(page.url());

    expect(currentUrl.pathname).toBe("/chat");
    expect(currentUrl.searchParams.has("conversationId")).toBe(false);

    const chatLayout = page.locator("main > div > section");
    const conversationListPanel = chatLayout.locator(":scope > aside");
    const mainChatArea = chatLayout.locator(":scope > section");

    await expect(conversationListPanel).toBeVisible();
    await expect(mainChatArea).toBeHidden();

    const emptyConversationHeading = conversationListPanel.getByText("No conversations yet", { exact: true });

    const emptyConversationDescription = conversationListPanel.getByText("Start a new chat below.", { exact: true });

    await expect.soft(emptyConversationHeading).toHaveText("No conversations yet.");
    await expect.soft(emptyConversationDescription).toBeVisible();

    const newChatHeading = conversationListPanel.getByRole("heading", {
      name: "New Chat",
    });

    const userSelect = conversationListPanel.getByRole("combobox");

    const startChatButton = conversationListPanel.getByRole("button", {
      name: "Start Chat",
      exact: true,
    });

    await expect(newChatHeading).toBeVisible();
    await expect(userSelect).toBeVisible();
    await expect(userSelect).toBeEnabled();

    await expect(startChatButton).toBeVisible();
    await expect(startChatButton).toBeDisabled();

    await userSelect.selectOption({
      label: `${bob.name} (${bob.email})`,
    });

    await expect(startChatButton).toBeEnabled();

    await expectWithinBounds(userSelect, conversationListPanel);
    await expectWithinBounds(startChatButton, conversationListPanel);

    const initialHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth || document.body.scrollWidth > window.innerWidth;
    });

    expect.soft(initialHorizontalOverflow).toBe(false);

    await startChatButton.click();

    await expect(page).toHaveURL(/\/chat\?conversationId=.+$/);

    await expect(mainChatArea).toBeVisible();
    await expect(conversationListPanel).toBeHidden();

    await expect(
      mainChatArea.getByRole("heading", {
        name: bob.name,
        exact: true,
      }),
    ).toBeVisible();

    const selectedUrl = new URL(page.url());

    expect(selectedUrl.pathname).toBe("/chat");
    expect(selectedUrl.searchParams.has("conversationId")).toBe(true);

    const emptyMessageHeading = mainChatArea.getByText("No messages yet", { exact: true });

    const emptyMessageDescription = mainChatArea.getByText("Send a message to start the conversation.", { exact: true });

    await expect.soft(emptyMessageHeading).toHaveText("No messages yet.");
    await expect.soft(emptyMessageDescription).toBeVisible();

    const backButton = mainChatArea.getByRole("link", {
      name: "Back to conversations",
    });

    await expect(backButton).toBeVisible();
    await expect(backButton).toBeEnabled();

    const messageInput = mainChatArea.getByLabel("Message");

    const sendButton = mainChatArea.getByRole("button", {
      name: "Send",
      exact: true,
    });

    await expect(messageInput).toBeVisible();
    await expect(messageInput).toBeEnabled();

    await expect(sendButton).toBeVisible();
    await expect(sendButton).toBeDisabled();

    await expectWithinBounds(backButton, mainChatArea);
    await expectWithinBounds(messageInput, mainChatArea);
    await expectWithinBounds(sendButton, mainChatArea);

    const selectedHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth || document.body.scrollWidth > window.innerWidth;
    });

    expect.soft(selectedHorizontalOverflow).toBe(false);

    await backButton.click();

    await expect(page).toHaveURL(/\/chat\/?$/);

    await expect(conversationListPanel).toBeVisible();
    await expect(mainChatArea).toBeHidden();
    await expect(
      conversationListPanel.getByRole("button").filter({
        hasText: bob.name,
      }),
    ).toBeVisible();

    const returnedUrl = new URL(page.url());

    expect(returnedUrl.pathname).toBe("/chat");
    expect(returnedUrl.searchParams.has("conversationId")).toBe(false);

    const returnedHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth || document.body.scrollWidth > window.innerWidth;
    });

    expect.soft(returnedHorizontalOverflow).toBe(false);
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

test("TC-UX-001-01 - Verify Light Mode Across Register, Login, and Chat Pages", async ({ page }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  try {
    await upsertRegisteredUser(alice);

    await page.goto("/register");

    await expect(page).toHaveURL(/\/register\/?$/);

    const registerHeading = page.getByRole("heading", {
      name: "Create your account",
    });

    const themeToggle = page.getByRole("button", {
      name: "Toggle theme",
    });

    const registerSubmitButton = page.getByRole("button", {
      name: "Create account",
      exact: true,
    });

    await expect(registerHeading).toBeVisible();
    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toBeEnabled();

    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.getByLabel("Confirm password")).toBeVisible();

    await expect(registerSubmitButton).toBeVisible();
    await expect(registerSubmitButton).toBeEnabled();

    const html = page.locator("html");

    const initialTheme = await html.getAttribute("data-theme");

    if (initialTheme !== "dark") {
      await themeToggle.click();
      await expect(html).toHaveAttribute("data-theme", "dark");
    }

    await themeToggle.click();

    await expect(html).toHaveAttribute("data-theme", "light");

    await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("light");

    await page
      .getByRole("button", {
        name: "Sign in",
        exact: true,
      })
      .click();

    await expect(page).toHaveURL(/\/login\/?$/);

    const loginHeading = page.getByRole("heading", {
      name: "Welcome back",
    });

    const loginSubmitButton = page.getByRole("button", {
      name: "Sign in",
      exact: true,
    });

    await expect(loginHeading).toBeVisible();
    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toBeEnabled();

    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();

    await expect(loginSubmitButton).toBeVisible();
    await expect(loginSubmitButton).toBeEnabled();

    await expect(html).toHaveAttribute("data-theme", "light");
    await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("light");

    await page.reload();

    await expect(page).toHaveURL(/\/login\/?$/);
    await expect(loginHeading).toBeVisible();
    await expect(themeToggle).toBeVisible();

    await expect(html).toHaveAttribute("data-theme", "light");
    await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("light");

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);

    await loginSubmitButton.click();

    await expect(page).toHaveURL(/\/chat\/?$/);

    const conversationsHeading = page.getByRole("heading", {
      name: "Conversations",
    });

    const logoutButton = page.getByRole("button", {
      name: "Logout",
      exact: true,
    });

    await expect(conversationsHeading).toBeVisible();

    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toBeEnabled();

    await expect(logoutButton).toBeVisible();
    await expect(logoutButton).toBeEnabled();

    await expect(html).toHaveAttribute("data-theme", "light");
    await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("light");

    await page.reload();

    await expect(page).toHaveURL(/\/chat\/?$/);
    await expect(conversationsHeading).toBeVisible();

    await expect(themeToggle).toBeVisible();
    await expect(logoutButton).toBeVisible();

    await expect(html).toHaveAttribute("data-theme", "light");
    await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("light");
  } catch (error) {
    primaryError = error;
  } finally {
    const cleanupResults = await Promise.allSettled([deleteTestUserByEmail(alice.email), disconnectCleanupDatabase(), disconnectSetupDatabase()]);

    for (const result of cleanupResults) {
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

test("TC-UX-002-01 - Verify Dark Mode Across Register, Login, and Chat Pages", async ({ page }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  try {
    await upsertRegisteredUser(alice);

    await page.goto("/register");

    await expect(page).toHaveURL(/\/register\/?$/);

    const registerHeading = page.getByRole("heading", {
      name: "Create your account",
    });

    const themeToggle = page.getByRole("button", {
      name: "Toggle theme",
    });

    const registerSubmitButton = page.getByRole("button", {
      name: "Create account",
      exact: true,
    });

    await expect(registerHeading).toBeVisible();
    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toBeEnabled();

    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.getByLabel("Confirm password")).toBeVisible();

    await expect(registerSubmitButton).toBeVisible();
    await expect(registerSubmitButton).toBeEnabled();

    const html = page.locator("html");

    const initialTheme = await html.getAttribute("data-theme");

    if (initialTheme !== "dark") {
      await themeToggle.click();
    }

    await expect(html).toHaveAttribute("data-theme", "dark");

    await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");

    await page
      .getByRole("button", {
        name: "Sign in",
        exact: true,
      })
      .click();

    await expect(page).toHaveURL(/\/login\/?$/);

    const loginHeading = page.getByRole("heading", {
      name: "Welcome back",
    });

    const loginSubmitButton = page.getByRole("button", {
      name: "Sign in",
      exact: true,
    });

    await expect(loginHeading).toBeVisible();
    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toBeEnabled();

    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();

    await expect(loginSubmitButton).toBeVisible();
    await expect(loginSubmitButton).toBeEnabled();

    await expect(html).toHaveAttribute("data-theme", "dark");
    await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");

    await page.reload();

    await expect(page).toHaveURL(/\/login\/?$/);
    await expect(loginHeading).toBeVisible();
    await expect(themeToggle).toBeVisible();

    await expect(html).toHaveAttribute("data-theme", "dark");
    await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);

    await loginSubmitButton.click();

    await expect(page).toHaveURL(/\/chat\/?$/);

    const conversationsHeading = page.getByRole("heading", {
      name: "Conversations",
    });

    const logoutButton = page.getByRole("button", {
      name: "Logout",
      exact: true,
    });

    await expect(conversationsHeading).toBeVisible();

    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toBeEnabled();

    await expect(logoutButton).toBeVisible();
    await expect(logoutButton).toBeEnabled();

    await expect(html).toHaveAttribute("data-theme", "dark");
    await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");

    await page.reload();

    await expect(page).toHaveURL(/\/chat\/?$/);
    await expect(conversationsHeading).toBeVisible();

    await expect(themeToggle).toBeVisible();
    await expect(logoutButton).toBeVisible();

    await expect(html).toHaveAttribute("data-theme", "dark");
    await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");
  } catch (error) {
    primaryError = error;
  } finally {
    const cleanupResults = await Promise.allSettled([deleteTestUserByEmail(alice.email), disconnectCleanupDatabase(), disconnectSetupDatabase()]);

    for (const result of cleanupResults) {
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

test("TC-UX-005-01 - Verify Desktop Empty State Without Conversations and After Starting a New Chat", async ({ page }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  try {
    await deleteTestConversationBetweenUsers(alice.email, bob.email);

    await upsertRegisteredUser(alice);
    await upsertRegisteredUser(bob);

    await page.setViewportSize({
      width: 1366,
      height: 768,
    });

    await page.goto("/");

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);

    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/chat\/?$/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();

    const currentUrl = new URL(page.url());

    expect(currentUrl.pathname).toBe("/chat");
    expect(currentUrl.searchParams.has("conversationId")).toBe(false);

    const chatLayout = page.locator("main > div > section");
    const conversationListPanel = chatLayout.locator(":scope > aside");
    const mainChatArea = chatLayout.locator(":scope > section");

    await expect(conversationListPanel).toBeVisible();
    await expect(mainChatArea).toBeVisible();

    const emptyConversationHeading = conversationListPanel.getByText("No conversations yet", { exact: true });

    const emptyConversationDescription = conversationListPanel.getByText("Start a new chat below.", { exact: true });

    await expect.soft(emptyConversationHeading).toHaveText("No conversations yet.");
    await expect.soft(emptyConversationDescription).toBeVisible();

    const unselectedChatHeading = mainChatArea.getByText("Select a conversation", { exact: true });

    const unselectedChatDescription = mainChatArea.getByText("Choose a conversation from the list or start a new chat to begin messaging.", { exact: true });

    await expect.soft(unselectedChatHeading).toHaveText("Select a conversation.");
    await expect.soft(unselectedChatDescription).toBeVisible();

    const newChatHeading = conversationListPanel.getByRole("heading", {
      name: "New Chat",
    });

    const userSelect = conversationListPanel.getByRole("combobox");

    const startChatButton = conversationListPanel.getByRole("button", {
      name: "Start Chat",
      exact: true,
    });

    await expect(newChatHeading).toBeVisible();

    await expect(userSelect).toBeVisible();
    await expect(userSelect).toBeEnabled();

    await expect(startChatButton).toBeVisible();
    await expect(startChatButton).toBeDisabled();

    await userSelect.selectOption({
      label: `${bob.name} (${bob.email})`,
    });

    await expect(startChatButton).toBeEnabled();

    await startChatButton.click();

    await expect(page).toHaveURL(/\/chat\?conversationId=.+$/);

    await expect(conversationListPanel).toBeVisible();
    await expect(mainChatArea).toBeVisible();

    await expect(
      mainChatArea.getByRole("heading", {
        name: bob.name,
        exact: true,
      }),
    ).toBeVisible();

    const selectedUrl = new URL(page.url());

    expect(selectedUrl.pathname).toBe("/chat");
    expect(selectedUrl.searchParams.has("conversationId")).toBe(true);

    await expect(
      conversationListPanel.getByRole("button").filter({
        hasText: bob.name,
      }),
    ).toBeVisible();

    const emptyMessageHeading = mainChatArea.getByText("No messages yet", { exact: true });

    const emptyMessageDescription = mainChatArea.getByText("Send a message to start the conversation.", { exact: true });

    await expect.soft(emptyMessageHeading).toHaveText("No messages yet.");
    await expect.soft(emptyMessageDescription).toBeVisible();

    const messageInput = mainChatArea.getByLabel("Message");

    const sendButton = mainChatArea.getByRole("button", {
      name: "Send",
      exact: true,
    });

    await expect(messageInput).toBeVisible();
    await expect(messageInput).toBeEnabled();

    await expect(sendButton).toBeVisible();
    await expect(sendButton).toBeDisabled();
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

test("TC-UX-003-01 - Verify Theme Persistence After Browser Restart", async () => {
  test.setTimeout(90_000);

  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  let userDataDir: string | undefined;
  let context: Awaited<ReturnType<typeof chromium.launchPersistentContext>> | undefined;

  try {
    await upsertRegisteredUser(alice);

    userDataDir = await mkdtemp(path.join(tmpdir(), "relay-tc-ux-003-01-"));

    context = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      viewport: {
        width: 1366,
        height: 768,
      },
    });

    let page = await context.newPage();

    await page.goto("http://localhost:3000/register");

    await expect(page).toHaveURL(/\/register\/?$/);
    await expect(page.getByRole("heading", { name: "Create your account" })).toBeVisible();

    const themeToggle = page.getByRole("button", {
      name: "Toggle theme",
    });

    const html = page.locator("html");

    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toBeEnabled();

    const initialTheme = await html.getAttribute("data-theme");

    if (initialTheme !== "dark") {
      await themeToggle.click();
    }

    await expect(html).toHaveAttribute("data-theme", "dark");
    await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");

    await context.close();
    context = undefined;

    context = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      viewport: {
        width: 1366,
        height: 768,
      },
    });

    page = await context.newPage();

    await page.goto("http://localhost:3000/register");

    await expect(page).toHaveURL(/\/register\/?$/);
    await expect(page.getByRole("heading", { name: "Create your account" })).toBeVisible();

    const restartedHtml = page.locator("html");

    const restartedThemeToggle = page.getByRole("button", {
      name: "Toggle theme",
    });

    await expect(restartedThemeToggle).toBeVisible();
    await expect(restartedThemeToggle).toBeEnabled();
    await expect(restartedHtml).toHaveAttribute("data-theme", "dark");
    await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");

    await page
      .getByRole("button", {
        name: "Sign in",
        exact: true,
      })
      .click();

    await expect(page).toHaveURL(/\/login\/?$/);
    await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();

    const loginSubmitButton = page.getByRole("button", {
      name: "Sign in",
      exact: true,
    });

    await expect(loginSubmitButton).toBeVisible();
    await expect(loginSubmitButton).toBeEnabled();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);

    await loginSubmitButton.click();

    await expect(page).toHaveURL(/\/chat\/?$/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Logout", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Toggle theme" })).toBeVisible();
    await expect(restartedHtml).toHaveAttribute("data-theme", "dark");
    await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");
  } catch (error) {
    primaryError = error;
  } finally {
    if (context) {
      try {
        await context.close();
      } catch (error) {
        cleanupErrors.push(error);
      }
    }

    if (userDataDir) {
      try {
        await rm(userDataDir, {
          recursive: true,
          force: true,
        });
      } catch (error) {
        cleanupErrors.push(error);
      }
    }

    const cleanupResults = await Promise.allSettled([deleteTestUserByEmail(alice.email), disconnectCleanupDatabase(), disconnectSetupDatabase()]);

    for (const result of cleanupResults) {
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

test("TC-UX-003-02 - Verify Theme Persistence After Logout and Re-Login", async ({ page }) => {
  let primaryError: unknown;
  const cleanupErrors: unknown[] = [];

  try {
    await upsertRegisteredUser(alice);

    await page.goto("/login");

    await expect(page).toHaveURL(/\/login\/?$/);
    await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);

    await page
      .getByRole("button", {
        name: "Sign in",
        exact: true,
      })
      .click();

    await expect(page).toHaveURL(/\/chat\/?$/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();

    const html = page.locator("html");

    const themeToggle = page.getByRole("button", {
      name: "Toggle theme",
    });

    const logoutButton = page.getByRole("button", {
      name: "Logout",
      exact: true,
    });

    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toBeEnabled();
    await expect(logoutButton).toBeVisible();
    await expect(logoutButton).toBeEnabled();

    const initialTheme = await html.getAttribute("data-theme");

    if (initialTheme !== "dark") {
      await themeToggle.click();
    }

    await expect(html).toHaveAttribute("data-theme", "dark");
    await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");

    await logoutButton.click();

    await expect(page).toHaveURL(/\/login\/?$/);
    await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Toggle theme" })).toBeVisible();
    await expect(html).toHaveAttribute("data-theme", "dark");
    await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");

    await page.getByLabel("Email").fill(alice.email);
    await page.getByLabel("Password").fill(alice.password);

    await page
      .getByRole("button", {
        name: "Sign in",
        exact: true,
      })
      .click();

    await expect(page).toHaveURL(/\/chat\/?$/);
    await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Logout", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Toggle theme" })).toBeVisible();
    await expect(html).toHaveAttribute("data-theme", "dark");
    await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");
  } catch (error) {
    primaryError = error;
  } finally {
    const cleanupResults = await Promise.allSettled([deleteTestUserByEmail(alice.email), disconnectCleanupDatabase(), disconnectSetupDatabase()]);

    for (const result of cleanupResults) {
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
