# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user-experience\user-experience.spec.ts >> TC-UX-004-01 - Verify Desktop Layout with Conversations Available and None Selected
- Location: tests\user-experience\user-experience.spec.ts:44:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('main > div > section').locator(':scope > section').getByRole('heading', { level: 2 })
Expected: "Select a conversation."
Received: "Select a conversation"
Timeout:  5000ms

Call log:
  - Expect "soft toHaveText" locator('main > div > section').locator(':scope > section').getByRole('heading', { level: 2 }) with timeout 5000ms
  - waiting for locator('main > div > section').locator(':scope > section').getByRole('heading', { level: 2 })
    14 × locator resolved to <h2 class="text-lg font-extrabold tracking-tight text-foreground">Select a conversation</h2>
       - unexpected value "Select a conversation"

```

```yaml
- heading "Select a conversation" [level=2]
```

# Test source

```ts
  38  |   expect.soft(elementBox.y).toBeGreaterThanOrEqual(containerBox.y);
  39  | 
  40  |   expect.soft(elementBox.x + elementBox.width).toBeLessThanOrEqual(containerBox.x + containerBox.width);
  41  |   expect.soft(elementBox.y + elementBox.height).toBeLessThanOrEqual(containerBox.y + containerBox.height);
  42  | }
  43  | 
  44  | test("TC-UX-004-01 - Verify Desktop Layout with Conversations Available and None Selected", async ({ page }) => {
  45  |   let primaryError: unknown;
  46  |   const cleanupErrors: unknown[] = [];
  47  |   //   const bobToAliceMessage = "Hi Alice. I'm good. How about you?";
  48  |   //   const charlieToAliceMessage = "Hi Alice. I'm good. How about you?";
  49  | 
  50  |   try {
  51  |     await deleteTestConversationBetweenUsers(alice.email, bob.email);
  52  |     await deleteTestConversationBetweenUsers(alice.email, charlie.email);
  53  | 
  54  |     await upsertRegisteredUser(alice);
  55  |     await upsertRegisteredUser(bob);
  56  |     await upsertRegisteredUser(charlie);
  57  | 
  58  |     const aliceBobConversationId = await createTestConversationBetweenUsers(alice.email, bob.email);
  59  |     const aliceCharlieConversationId = await createTestConversationBetweenUsers(alice.email, charlie.email);
  60  | 
  61  |     await createTestMessageInConversation(aliceBobConversationId, alice.email, bobMessage);
  62  |     // await createTestMessageInConversation(aliceBobConversationId, bob.email, bobToAliceMessage);
  63  | 
  64  |     await createTestMessageInConversation(aliceCharlieConversationId, alice.email, charlieMessage);
  65  |     // await createTestMessageInConversation(aliceCharlieConversationId, charlie.email, charlieToAliceMessage);
  66  | 
  67  |     await page.setViewportSize({
  68  |       width: 1366,
  69  |       height: 768,
  70  |     });
  71  | 
  72  |     await page.goto("/");
  73  | 
  74  |     await page.getByLabel("Email").fill(alice.email);
  75  |     await page.getByLabel("Password").fill(alice.password);
  76  | 
  77  |     await page.getByRole("button", { name: "Sign in" }).click();
  78  | 
  79  |     await expect(page).toHaveURL(/\/chat\/?$/);
  80  | 
  81  |     await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();
  82  | 
  83  |     const currentUrl = new URL(page.url());
  84  | 
  85  |     expect(currentUrl.pathname).toBe("/chat");
  86  |     expect(currentUrl.searchParams.has("conversationId")).toBe(false);
  87  | 
  88  |     const appHeader = page.locator("main > header");
  89  | 
  90  |     const chatLayout = page.locator("main > div > section");
  91  |     const conversationListPanel = chatLayout.locator(":scope > aside");
  92  |     const mainChatArea = chatLayout.locator(":scope > section");
  93  | 
  94  |     await expect(conversationListPanel).toBeVisible();
  95  |     await expect(mainChatArea).toBeVisible();
  96  | 
  97  |     const listBox = await conversationListPanel.boundingBox();
  98  |     const chatBox = await mainChatArea.boundingBox();
  99  |     const layoutBox = await chatLayout.boundingBox();
  100 |     const headerBox = await appHeader.boundingBox();
  101 | 
  102 |     expect(listBox).not.toBeNull();
  103 |     expect(chatBox).not.toBeNull();
  104 |     expect(layoutBox).not.toBeNull();
  105 |     expect(headerBox).not.toBeNull();
  106 | 
  107 |     if (!listBox || !chatBox || !layoutBox || !headerBox) {
  108 |       throw new Error("Unable to measure the desktop layout.");
  109 |     }
  110 | 
  111 |     expect.soft(listBox.x + listBox.width).toBeLessThanOrEqual(chatBox.x);
  112 | 
  113 |     expect.soft(Math.abs(listBox.y - chatBox.y)).toBeLessThanOrEqual(1);
  114 |     expect.soft(Math.abs(listBox.height - chatBox.height)).toBeLessThanOrEqual(1);
  115 | 
  116 |     await expectWithinBounds(conversationListPanel, chatLayout);
  117 |     await expectWithinBounds(mainChatArea, chatLayout);
  118 | 
  119 |     expect.soft(headerBox.y + headerBox.height).toBeLessThanOrEqual(layoutBox.y);
  120 | 
  121 |     const bobConversation = conversationListPanel.getByRole("button").filter({ hasText: bob.name });
  122 | 
  123 |     const charlieConversation = conversationListPanel.getByRole("button").filter({ hasText: charlie.name });
  124 | 
  125 |     await expect.soft(bobConversation).toBeVisible();
  126 |     await expect.soft(charlieConversation).toBeVisible();
  127 | 
  128 |     await expect.soft(bobConversation).toContainText(bobMessage);
  129 |     await expect.soft(charlieConversation).toContainText(charlieMessage);
  130 | 
  131 |     await expect(bobConversation).toBeEnabled();
  132 |     await expect(charlieConversation).toBeEnabled();
  133 | 
  134 |     const emptyStateHeading = mainChatArea.getByRole("heading", {
  135 |       level: 2,
  136 |     });
  137 | 
> 138 |     await expect.soft(emptyStateHeading).toHaveText("Select a conversation.");
      |                                          ^ Error: expect(locator).toHaveText(expected) failed
  139 | 
  140 |     await expect.soft(mainChatArea.getByText("Choose a conversation from the list or start a new chat to begin messaging.", { exact: true })).toBeVisible();
  141 | 
  142 |     await expect.soft(mainChatArea.getByText(bobMessage, { exact: true })).toHaveCount(0);
  143 |     await expect.soft(mainChatArea.getByText(charlieMessage, { exact: true })).toHaveCount(0);
  144 | 
  145 |     await expect.soft(mainChatArea.getByLabel("Message")).toHaveCount(0);
  146 | 
  147 |     const emptyStateDescription = mainChatArea.getByText("Choose a conversation from the list or start a new chat to begin messaging.", { exact: true });
  148 | 
  149 |     for (const element of [emptyStateHeading, emptyStateDescription]) {
  150 |       const textFits = await element.evaluate((node) => {
  151 |         return node.scrollWidth <= node.clientWidth && node.scrollHeight <= node.clientHeight;
  152 |       });
  153 | 
  154 |       expect.soft(textFits).toBe(true);
  155 |     }
  156 | 
  157 |     const newChatHeading = conversationListPanel.getByRole("heading", {
  158 |       name: "New Chat",
  159 |     });
  160 | 
  161 |     const userSelect = conversationListPanel.getByRole("combobox");
  162 |     const startChatButton = conversationListPanel.getByRole("button", {
  163 |       name: "Start Chat",
  164 |     });
  165 | 
  166 |     await expect(newChatHeading).toBeVisible();
  167 |     await expect(userSelect).toBeVisible();
  168 |     await expect(startChatButton).toBeVisible();
  169 | 
  170 |     await expect(userSelect).toBeEnabled();
  171 |     await expect(startChatButton).toBeDisabled();
  172 | 
  173 |     await expectWithinBounds(bobConversation, conversationListPanel);
  174 |     await expectWithinBounds(charlieConversation, conversationListPanel);
  175 |     await expectWithinBounds(userSelect, conversationListPanel);
  176 |     await expectWithinBounds(startChatButton, conversationListPanel);
  177 | 
  178 |     await userSelect.selectOption({
  179 |       label: `${bob.name} (${bob.email})`,
  180 |     });
  181 | 
  182 |     await expect.soft(startChatButton).toBeEnabled();
  183 | 
  184 |     await userSelect.selectOption("");
  185 | 
  186 |     await expect.soft(startChatButton).toBeDisabled();
  187 | 
  188 |     const themeToggle = page.getByRole("button", {
  189 |       name: "Toggle theme",
  190 |     });
  191 | 
  192 |     const initialTheme = await page.locator("html").evaluate((element) => {
  193 |       return element.dataset.theme === "dark" ? "dark" : "light";
  194 |     });
  195 | 
  196 |     await expect(themeToggle).toBeVisible();
  197 |     await expect(themeToggle).toBeEnabled();
  198 | 
  199 |     await themeToggle.click();
  200 | 
  201 |     const changedTheme = await page.locator("html").evaluate((element) => {
  202 |       return element.dataset.theme === "dark" ? "dark" : "light";
  203 |     });
  204 | 
  205 |     expect.soft(changedTheme).not.toBe(initialTheme);
  206 | 
  207 |     await themeToggle.click();
  208 | 
  209 |     const restoredTheme = await page.locator("html").evaluate((element) => {
  210 |       return element.dataset.theme === "dark" ? "dark" : "light";
  211 |     });
  212 | 
  213 |     expect.soft(restoredTheme).toBe(initialTheme);
  214 | 
  215 |     const logoutButton = page.getByRole("button", {
  216 |       name: "Logout",
  217 |       exact: true,
  218 |     });
  219 | 
  220 |     await expect.soft(logoutButton).toBeVisible();
  221 |     await expect.soft(logoutButton).toBeEnabled();
  222 | 
  223 |     const viewport = {
  224 |       width: 1366,
  225 |       height: 768,
  226 |     };
  227 | 
  228 |     const importantElements = [themeToggle, logoutButton, userSelect, startChatButton, bobConversation, charlieConversation];
  229 | 
  230 |     for (const element of importantElements) {
  231 |       const box = await element.boundingBox();
  232 | 
  233 |       expect(box, "Important UI element should be measurable").not.toBeNull();
  234 | 
  235 |       if (!box) {
  236 |         throw new Error("Unable to measure an important UI element.");
  237 |       }
  238 | 
```