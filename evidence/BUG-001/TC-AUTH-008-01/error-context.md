# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: authentication\login.spec.ts >> TC-AUTH-008-01 — Invalid credential conditions produce identical login error feedback
- Location: tests\authentication\login.spec.ts:170:5

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

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
                - text: registered.user@example.com
            - generic [ref=e20]:
              - generic [ref=e21]: Password
              - textbox "Password" [ref=e22]:
                - /placeholder: Enter your password
                - text: password124
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
  123 |     await page.goto("/");
  124 |     await page.getByLabel("Email").fill(testData.email);
  125 |     await page.getByLabel("Password").fill(wrongPassword);
  126 |     await page.getByRole("button", { name: "Sign in" }).click();
  127 | 
  128 |     const expectedErrorMessage = "Invalid email or password.";
  129 |     const errorMesage = page.locator("//div[@role='alert']");
  130 | 
  131 |     await expect(page).toHaveURL(/\/login\/?$/);
  132 |     await expect(errorMesage).toHaveText(expectedErrorMessage);
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
  170 | test("TC-AUTH-008-01 — Invalid credential conditions produce identical login error feedback", async ({ page }) => {
  171 |   let setupCompleted = false;
  172 |   let primaryError: unknown;
  173 |   const wrongPassword = "password124";
  174 |   const cleanupErrors: unknown[] = [];
  175 | 
  176 |   try {
  177 |     const expectedErrorMessage = "Invalid email or password.";
  178 |     await upsertRegisteredUser(testData);
  179 |     setupCompleted = true;
  180 | 
  181 |     await page.goto("/");
  182 |     await page.getByLabel("Email").fill(invalidLoginTestData.email);
  183 |     await page.getByLabel("Password").fill(invalidLoginTestData.password);
  184 |     await page.getByRole("button", { name: "Sign in" }).click();
  185 | 
  186 |     await expect(page).toHaveURL(/\/login\/?$/);
  187 |     const errorMesageFirstAttempt = await page.locator("//div[@role='alert']").textContent();
  188 | 
  189 |     await page.getByLabel("Email").fill(testData.email);
  190 |     await page.getByLabel("Password").fill(wrongPassword);
  191 |     await page.getByRole("button", { name: "Sign in" }).click();
  192 | 
  193 |     const errorMessageSecondAttempt = await page.locator("//div[@role='alert']").textContent();
  194 | 
  195 |     await expect(page).toHaveURL(/\/login\/?$/);
  196 |     expect(errorMessageSecondAttempt).toBe(errorMesageFirstAttempt);
> 197 |     expect(errorMesageFirstAttempt).toEqual(expectedErrorMessage);
      |                                     ^ Error: expect(received).toEqual(expected) // deep equality
  198 |   } catch (error) {
  199 |     primaryError = error;
  200 |   } finally {
  201 |     if (setupCompleted) {
  202 |       try {
  203 |         await deleteTestUserByEmail(testData.email);
  204 |       } catch (error) {
  205 |         cleanupErrors.push(error);
  206 |       }
  207 |     }
  208 | 
  209 |     try {
  210 |       await disconnectCleanupDatabase();
  211 |     } catch (error) {
  212 |       cleanupErrors.push(error);
  213 |     }
  214 | 
  215 |     try {
  216 |       await disconnectSetupDatabase();
  217 |     } catch (error) {
  218 |       cleanupErrors.push(error);
  219 |     }
  220 |   }
  221 | 
  222 |   if (primaryError && cleanupErrors.length > 0) {
  223 |     throw new AggregateError([primaryError, ...cleanupErrors], "Test execution and cleanup both encountered errors.");
  224 |   }
  225 | 
  226 |   if (primaryError) {
  227 |     throw primaryError;
  228 |   }
  229 | 
  230 |   if (cleanupErrors.length > 0) {
  231 |     throw new AggregateError(cleanupErrors, "Test cleanup encountered errors.");
  232 |   }
  233 | });
  234 | 
```