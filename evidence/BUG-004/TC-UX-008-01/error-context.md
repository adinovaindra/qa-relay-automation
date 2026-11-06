# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user-experience\user-experience.spec.ts >> TC-UX-008-01 - Verify Mobile Empty State Without Conversations and After Starting a New Chat
- Location: tests\user-experience\user-experience.spec.ts:490:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('main > div > section').locator(':scope > aside').getByText('No conversations yet', { exact: true })
Expected: "No conversations yet."
Received: "No conversations yet"
Timeout:  5000ms

Call log:
  - Expect "soft toHaveText" locator('main > div > section').locator(':scope > aside').getByText('No conversations yet', { exact: true }) with timeout 5000ms
  - waiting for locator('main > div > section').locator(':scope > aside').getByText('No conversations yet', { exact: true })
    14 × locator resolved to <p class="text-sm font-bold text-foreground">No conversations yet</p>
       - unexpected value "No conversations yet"

```

```yaml
- paragraph: No conversations yet
```

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('main > div > section').locator(':scope > section').getByText('No messages yet', { exact: true })
Expected: "No messages yet."
Received: "No messages yet"
Timeout:  5000ms

Call log:
  - Expect "soft toHaveText" locator('main > div > section').locator(':scope > section').getByText('No messages yet', { exact: true }) with timeout 5000ms
  - waiting for locator('main > div > section').locator(':scope > section').getByText('No messages yet', { exact: true })
    14 × locator resolved to <p class="text-sm font-bold text-foreground">No messages yet</p>
       - unexpected value "No messages yet"

```

```yaml
- paragraph: No messages yet
```

# Test source

```ts
  490 | test("TC-UX-008-01 - Verify Mobile Empty State Without Conversations and After Starting a New Chat", async ({ page }) => {
  491 |   let primaryError: unknown;
  492 |   const cleanupErrors: unknown[] = [];
  493 | 
  494 |   try {
  495 |     await deleteTestConversationBetweenUsers(alice.email, bob.email);
  496 | 
  497 |     await upsertRegisteredUser(alice);
  498 |     await upsertRegisteredUser(bob);
  499 | 
  500 |     await page.setViewportSize({
  501 |       width: 390,
  502 |       height: 844,
  503 |     });
  504 | 
  505 |     await page.goto("/");
  506 | 
  507 |     await page.getByLabel("Email").fill(alice.email);
  508 |     await page.getByLabel("Password").fill(alice.password);
  509 | 
  510 |     await page.getByRole("button", { name: "Sign in" }).click();
  511 | 
  512 |     await expect(page).toHaveURL(/\/chat\/?$/);
  513 |     await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();
  514 | 
  515 |     const currentUrl = new URL(page.url());
  516 | 
  517 |     expect(currentUrl.pathname).toBe("/chat");
  518 |     expect(currentUrl.searchParams.has("conversationId")).toBe(false);
  519 | 
  520 |     const chatLayout = page.locator("main > div > section");
  521 |     const conversationListPanel = chatLayout.locator(":scope > aside");
  522 |     const mainChatArea = chatLayout.locator(":scope > section");
  523 | 
  524 |     await expect(conversationListPanel).toBeVisible();
  525 |     await expect(mainChatArea).toBeHidden();
  526 | 
  527 |     const emptyConversationHeading = conversationListPanel.getByText("No conversations yet", { exact: true });
  528 | 
  529 |     const emptyConversationDescription = conversationListPanel.getByText("Start a new chat below.", { exact: true });
  530 | 
  531 |     await expect.soft(emptyConversationHeading).toHaveText("No conversations yet.");
  532 |     await expect.soft(emptyConversationDescription).toBeVisible();
  533 | 
  534 |     const newChatHeading = conversationListPanel.getByRole("heading", {
  535 |       name: "New Chat",
  536 |     });
  537 | 
  538 |     const userSelect = conversationListPanel.getByRole("combobox");
  539 | 
  540 |     const startChatButton = conversationListPanel.getByRole("button", {
  541 |       name: "Start Chat",
  542 |       exact: true,
  543 |     });
  544 | 
  545 |     await expect(newChatHeading).toBeVisible();
  546 |     await expect(userSelect).toBeVisible();
  547 |     await expect(userSelect).toBeEnabled();
  548 | 
  549 |     await expect(startChatButton).toBeVisible();
  550 |     await expect(startChatButton).toBeDisabled();
  551 | 
  552 |     await userSelect.selectOption({
  553 |       label: `${bob.name} (${bob.email})`,
  554 |     });
  555 | 
  556 |     await expect(startChatButton).toBeEnabled();
  557 | 
  558 |     await expectWithinBounds(userSelect, conversationListPanel);
  559 |     await expectWithinBounds(startChatButton, conversationListPanel);
  560 | 
  561 |     const initialHorizontalOverflow = await page.evaluate(() => {
  562 |       return document.documentElement.scrollWidth > window.innerWidth || document.body.scrollWidth > window.innerWidth;
  563 |     });
  564 | 
  565 |     expect.soft(initialHorizontalOverflow).toBe(false);
  566 | 
  567 |     await startChatButton.click();
  568 | 
  569 |     await expect(page).toHaveURL(/\/chat\?conversationId=.+$/);
  570 | 
  571 |     await expect(mainChatArea).toBeVisible();
  572 |     await expect(conversationListPanel).toBeHidden();
  573 | 
  574 |     await expect(
  575 |       mainChatArea.getByRole("heading", {
  576 |         name: bob.name,
  577 |         exact: true,
  578 |       }),
  579 |     ).toBeVisible();
  580 | 
  581 |     const selectedUrl = new URL(page.url());
  582 | 
  583 |     expect(selectedUrl.pathname).toBe("/chat");
  584 |     expect(selectedUrl.searchParams.has("conversationId")).toBe(true);
  585 | 
  586 |     const emptyMessageHeading = mainChatArea.getByText("No messages yet", { exact: true });
  587 | 
  588 |     const emptyMessageDescription = mainChatArea.getByText("Send a message to start the conversation.", { exact: true });
  589 | 
> 590 |     await expect.soft(emptyMessageHeading).toHaveText("No messages yet.");
      |                                            ^ Error: expect(locator).toHaveText(expected) failed
  591 |     await expect.soft(emptyMessageDescription).toBeVisible();
  592 | 
  593 |     const backButton = mainChatArea.getByRole("link", {
  594 |       name: "Back to conversations",
  595 |     });
  596 | 
  597 |     await expect(backButton).toBeVisible();
  598 |     await expect(backButton).toBeEnabled();
  599 | 
  600 |     const messageInput = mainChatArea.getByLabel("Message");
  601 | 
  602 |     const sendButton = mainChatArea.getByRole("button", {
  603 |       name: "Send",
  604 |       exact: true,
  605 |     });
  606 | 
  607 |     await expect(messageInput).toBeVisible();
  608 |     await expect(messageInput).toBeEnabled();
  609 | 
  610 |     await expect(sendButton).toBeVisible();
  611 |     await expect(sendButton).toBeDisabled();
  612 | 
  613 |     await expectWithinBounds(backButton, mainChatArea);
  614 |     await expectWithinBounds(messageInput, mainChatArea);
  615 |     await expectWithinBounds(sendButton, mainChatArea);
  616 | 
  617 |     const selectedHorizontalOverflow = await page.evaluate(() => {
  618 |       return document.documentElement.scrollWidth > window.innerWidth || document.body.scrollWidth > window.innerWidth;
  619 |     });
  620 | 
  621 |     expect.soft(selectedHorizontalOverflow).toBe(false);
  622 | 
  623 |     await backButton.click();
  624 | 
  625 |     await expect(page).toHaveURL(/\/chat\/?$/);
  626 | 
  627 |     await expect(conversationListPanel).toBeVisible();
  628 |     await expect(mainChatArea).toBeHidden();
  629 |     await expect(
  630 |       conversationListPanel.getByRole("button").filter({
  631 |         hasText: bob.name,
  632 |       }),
  633 |     ).toBeVisible();
  634 | 
  635 |     const returnedUrl = new URL(page.url());
  636 | 
  637 |     expect(returnedUrl.pathname).toBe("/chat");
  638 |     expect(returnedUrl.searchParams.has("conversationId")).toBe(false);
  639 | 
  640 |     const returnedHorizontalOverflow = await page.evaluate(() => {
  641 |       return document.documentElement.scrollWidth > window.innerWidth || document.body.scrollWidth > window.innerWidth;
  642 |     });
  643 | 
  644 |     expect.soft(returnedHorizontalOverflow).toBe(false);
  645 |   } catch (error) {
  646 |     primaryError = error;
  647 |   } finally {
  648 |     let conversationCleanupSucceeded = false;
  649 | 
  650 |     try {
  651 |       await deleteTestConversationBetweenUsers(alice.email, bob.email);
  652 | 
  653 |       conversationCleanupSucceeded = true;
  654 |     } catch (error) {
  655 |       cleanupErrors.push(error);
  656 |     }
  657 | 
  658 |     if (conversationCleanupSucceeded) {
  659 |       const userCleanupResults = await Promise.allSettled([deleteTestUserByEmail(alice.email), deleteTestUserByEmail(bob.email)]);
  660 | 
  661 |       for (const result of userCleanupResults) {
  662 |         if (result.status === "rejected") {
  663 |           cleanupErrors.push(result.reason);
  664 |         }
  665 |       }
  666 |     }
  667 | 
  668 |     const disconnectResults = await Promise.allSettled([disconnectCleanupDatabase(), disconnectSetupDatabase()]);
  669 | 
  670 |     for (const result of disconnectResults) {
  671 |       if (result.status === "rejected") {
  672 |         cleanupErrors.push(result.reason);
  673 |       }
  674 |     }
  675 |   }
  676 | 
  677 |   if (primaryError && cleanupErrors.length > 0) {
  678 |     throw new AggregateError([primaryError, ...cleanupErrors], "Test execution and cleanup both encountered errors.");
  679 |   }
  680 | 
  681 |   if (primaryError) {
  682 |     throw primaryError;
  683 |   }
  684 | 
  685 |   if (cleanupErrors.length > 0) {
  686 |     throw new AggregateError(cleanupErrors, "Test cleanup encountered errors.");
  687 |   }
  688 | });
  689 | 
```