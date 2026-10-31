# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: authentication\login.spec.ts >> TC-AUTH-007-02 — Login rejects an incorrect password with the generic authentication error
- Location: tests\authentication\login.spec.ts:113:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('//div[@role=\'alert\']')
Expected: "Invalid email or password."
Received: "Invalid email or password"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" locator('//div[@role=\'alert\']') with timeout 5000ms
  - waiting for locator('//div[@role=\'alert\']')
    8 × locator resolved to <div role="alert" class="rounded-lg border border-border bg-surface-muted px-3 py-2.5 text-sm font-bold text-foreground">Invalid email or password</div>
      - unexpected value "Invalid email or password"

```

```yaml
- alert: Invalid email or password
```

# Test source

```ts
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
  76  |     await verifyUserDoesNotExist(invalidLoginTestData.email);
  77  | 
  78  |     await page.goto("/login");
  79  | 
  80  |     await page.getByLabel("Email").fill(invalidLoginTestData.email);
  81  |     await page.getByLabel("Password").fill(invalidLoginTestData.password);
  82  | 
  83  |     await page.getByRole("button", { name: "Sign in" }).click();
  84  | 
  85  |     const expectedErrorMessage = "Invalid email or password.";
  86  |     const actualErrorMessage = await page.locator("//div[@role='alert']").textContent();
  87  | 
  88  |     await expect(page).toHaveURL(/\/login\/?$/);
  89  |     expect(actualErrorMessage).toBe(expectedErrorMessage);
  90  |   } catch (error) {
  91  |     primaryError = error;
  92  |   } finally {
  93  |     try {
  94  |       await disconnectSetupDatabase();
  95  |     } catch (error) {
  96  |       cleanupError = error;
  97  |     }
  98  |   }
  99  | 
  100 |   if (primaryError && cleanupError) {
  101 |     throw new AggregateError([primaryError, cleanupError], "Test execution and cleanup both encountered errors.");
  102 |   }
  103 | 
  104 |   if (primaryError) {
  105 |     throw primaryError;
  106 |   }
  107 | 
  108 |   if (cleanupError) {
  109 |     throw cleanupError;
  110 |   }
  111 | });
  112 | 
  113 | test("TC-AUTH-007-02 — Login rejects an incorrect password with the generic authentication error", async ({ page }) => {
  114 |   let setupCompleted = false;
  115 |   let primaryError: unknown;
  116 |   const wrongPassword = "password124";
  117 |   const cleanupErrors: unknown[] = [];
  118 | 
  119 |   try {
  120 |     await upsertRegisteredUser(testData);
  121 |     setupCompleted = true;
  122 | 
  123 |     await page.goto("/login");
  124 |     await page.getByLabel("Email").fill(testData.email);
  125 |     await page.getByLabel("Password").fill(wrongPassword);
  126 |     await page.getByRole("button", { name: "Sign in" }).click();
  127 | 
  128 |     const expectedErrorMessage = "Invalid email or password.";
  129 |     const errorMesage = page.locator("//div[@role='alert']");
  130 | 
  131 |     await expect(page).toHaveURL(/\/login\/?$/);
> 132 |     await expect(errorMesage).toHaveText(expectedErrorMessage);
      |                               ^ Error: expect(locator).toHaveText(expected) failed
  133 |   } catch (error) {
  134 |     primaryError = error;
  135 |   } finally {
  136 |     if (setupCompleted) {
  137 |       try {
  138 |         await deleteTestUserByEmail(testData.email);
  139 |       } catch (error) {
  140 |         cleanupErrors.push(error);
  141 |       }
  142 |     }
  143 | 
  144 |     try {
  145 |       await disconnectCleanupDatabase();
  146 |     } catch (error) {
  147 |       cleanupErrors.push(error);
  148 |     }
  149 | 
  150 |     try {
  151 |       await disconnectSetupDatabase();
  152 |     } catch (error) {
  153 |       cleanupErrors.push(error);
  154 |     }
  155 |   }
  156 | 
  157 |   if (primaryError && cleanupErrors.length > 0) {
  158 |     throw new AggregateError([primaryError, ...cleanupErrors], "Test execution and cleanup both encountered errors.");
  159 |   }
  160 | 
  161 |   if (primaryError) {
  162 |     throw primaryError;
  163 |   }
  164 | 
  165 |   if (cleanupErrors.length > 0) {
  166 |     throw new AggregateError(cleanupErrors, "Test cleanup encountered errors.");
  167 |   }
  168 | });
  169 | 
```