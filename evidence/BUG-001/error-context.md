# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: authentication\login.spec.ts >> TC-AUTH-007-01 — Login rejects an unregistered email with the generic authentication error
- Location: tests\authentication\login.spec.ts:71:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Invalid email or password."
Received: "Invalid email or password"
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - img "Relay Messaging Team" [ref=e6]
        - button "Toggle theme" [ref=e8] [cursor=pointer]:
          - generic [ref=e9]: ☾ Dark
      - generic [ref=e11]:
        - generic [ref=e12]:
          - generic [ref=e13]:
            - heading "Welcome back" [level=1] [ref=e14]
            - paragraph [ref=e15]: Sign in to continue to Relay.
          - generic [ref=e16]:
            - generic [ref=e17]:
              - generic [ref=e18]: Email
              - textbox "Email" [ref=e19]:
                - /placeholder: you@example.com
                - text: unregistered.user@example.com
            - generic [ref=e20]:
              - generic [ref=e21]: Password
              - textbox "Password" [ref=e22]:
                - /placeholder: Enter your password
                - text: password123
            - alert [ref=e23]: Invalid email or password
            - button "Sign in" [ref=e24] [cursor=pointer]
        - paragraph [ref=e25]:
          - text: Don't have an account?
          - button "Create one" [ref=e26] [cursor=pointer]
  - button "Open Next.js Dev Tools" [ref=e32] [cursor=pointer]
  - alert [ref=e36]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | import { upsertRegisteredUser, verifyUserDoesNotExist, disconnectSetupDatabase } from "../support/database-setup";
  3   | import { deleteTestUserByEmail, disconnectCleanupDatabase } from "../support/database-cleanup";
  4   | 
  5   | const testData = {
  6   |   name: "Registered User",
  7   |   email: "registered.user@example.com",
  8   |   password: "password123",
  9   | };
  10  | 
  11  | const invalidLoginTestData = {
  12  |   email: "unregistered.user@example.com",
  13  |   password: "password123",
  14  | };
  15  | 
  16  | test("TC-AUTH-006-01 — Registered user logs in successfully", async ({ page }) => {
  17  |   let setupCompleted = false;
  18  |   let primaryError: unknown;
  19  |   const cleanupErrors: unknown[] = [];
  20  | 
  21  |   try {
  22  |     await upsertRegisteredUser(testData);
  23  |     setupCompleted = true;
  24  | 
  25  |     await page.goto("/login");
  26  | 
  27  |     await page.getByLabel("Email").fill(testData.email);
  28  |     await page.getByLabel("Password").fill(testData.password);
  29  | 
  30  |     await page.getByRole("button", { name: "Sign in" }).click();
  31  | 
  32  |     await expect(page).toHaveURL(/\/chat\/?$/);
  33  |     await expect(page.getByRole("heading", { name: "Conversations" })).toBeVisible();
  34  |   } catch (error) {
  35  |     primaryError = error;
  36  |   } finally {
  37  |     if (setupCompleted) {
  38  |       try {
  39  |         await deleteTestUserByEmail(testData.email);
  40  |       } catch (error) {
  41  |         cleanupErrors.push(error);
  42  |       }
  43  |     }
  44  | 
  45  |     try {
  46  |       await disconnectCleanupDatabase();
  47  |     } catch (error) {
  48  |       cleanupErrors.push(error);
  49  |     }
  50  | 
  51  |     try {
  52  |       await disconnectSetupDatabase();
  53  |     } catch (error) {
  54  |       cleanupErrors.push(error);
  55  |     }
  56  |   }
  57  | 
  58  |   if (primaryError && cleanupErrors.length > 0) {
  59  |     throw new AggregateError([primaryError, ...cleanupErrors], "Test execution and cleanup both encountered errors.");
  60  |   }
  61  | 
  62  |   if (primaryError) {
  63  |     throw primaryError;
  64  |   }
  65  | 
  66  |   if (cleanupErrors.length > 0) {
  67  |     throw new AggregateError(cleanupErrors, "Test cleanup encountered errors.");
  68  |   }
  69  | });
  70  | 
  71  | test("TC-AUTH-007-01 — Login rejects an unregistered email with the generic authentication error", async ({ page }) => {
  72  |   let primaryError: unknown;
  73  |   let cleanupError: unknown;
  74  | 
  75  |   try {
  76  |     // Precondition verification
  77  |     await verifyUserDoesNotExist(invalidLoginTestData.email);
  78  | 
  79  |     // Test execution
  80  |     await page.goto("/login");
  81  | 
  82  |     await page.getByLabel("Email").fill(invalidLoginTestData.email);
  83  |     await page.getByLabel("Password").fill(invalidLoginTestData.password);
  84  | 
  85  |     await page.getByRole("button", { name: "Sign in" }).click();
  86  | 
  87  |     const expectedErrorMessage = "Invalid email or password.";
  88  |     const actualErrorMessage = await page.locator("//div[@role='alert']").textContent();
  89  | 
  90  |     await expect(page).toHaveURL(/\/login\/?$/);
> 91  |     expect(actualErrorMessage).toBe(expectedErrorMessage);
      |                                ^ Error: expect(received).toBe(expected) // Object.is equality
  92  |   } catch (error) {
  93  |     primaryError = error;
  94  |   } finally {
  95  |     try {
  96  |       await disconnectSetupDatabase();
  97  |     } catch (error) {
  98  |       cleanupError = error;
  99  |     }
  100 |   }
  101 | 
  102 |   if (primaryError && cleanupError) {
  103 |     throw new AggregateError([primaryError, cleanupError], "Test execution and cleanup both encountered errors.");
  104 |   }
  105 | 
  106 |   if (primaryError) {
  107 |     throw primaryError;
  108 |   }
  109 | 
  110 |   if (cleanupError) {
  111 |     throw cleanupError;
  112 |   }
  113 | });
  114 | 
```