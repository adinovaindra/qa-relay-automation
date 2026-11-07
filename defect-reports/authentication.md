# Authentication Defect Reports

This document contains defect reports identified within the Authentication functional area of the Relay messaging application.

---

# BUG-001 — Generic Login Error Message Missing Trailing Period

## 1. Defect Identification

| Field           | Value                                                        |
| --------------- | ------------------------------------------------------------ |
| Defect ID       | BUG-001                                                      |
| Jira Issue      | [QRA-1](https://adinovapramono69.atlassian.net/browse/QRA-1) |
| Title           | Generic Login Error Message Missing Trailing Period          |
| Functional Area | Authentication / Login                                       |
| Severity        | Low                                                          |
| Priority        | Low                                                          |
| Status          | Open                                                         |
| Date Identified | 2026-10-31                                                   |

## 2. Traceability

| Reference         | ID / Link                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requirement       | [REQ-AUTH-007](../docs/requirements/authentication.md#req-auth-007--invalid-login-credentials)                                                                                                                                                                                                                                                                                                                                                                       |
| Test Scenarios    | [SCN-AUTH-007](../test-design/scenarios/authentication.md#scn-auth-007--invalid-user-login), [SCN-AUTH-008](../test-design/scenarios/authentication.md#scn-auth-008--consistent-login-error-feedback)                                                                                                                                                                                                                                                                |
| Test Cases        | [TC-AUTH-007-01](../test-design/test-cases/authentication.md#tc-auth-007-01--login-rejects-an-unregistered-email-with-the-generic-authentication-error), [TC-AUTH-007-02](../test-design/test-cases/authentication.md#tc-auth-007-02--login-rejects-an-incorrect-password-with-the-generic-authentication-error), [TC-AUTH-008-01](../test-design/test-cases/authentication.md#tc-auth-008-01--invalid-credential-conditions-produce-identical-login-error-feedback) |
| Related Risks     | RSK-003, RSK-009 [Risk Register List](../docs/risk-assessment.md#3-risk-register)                                                                                                                                                                                                                                                                                                                                                                                    |
| Execution Records | [TC-AUTH-007-01](../test-execution/authentication.md#tc-auth-007-01--login-rejects-an-unregistered-email-with-the-generic-authentication-error), [TC-AUTH-007-02](../test-execution/authentication.md#tc-auth-007-02--login-rejects-an-incorrect-password-with-the-generic-authentication-error), [TC-AUTH-008-01](../test-execution/authentication.md#tc-auth-008-01--invalid-credential-conditions-produce-identical-login-error-feedback)                         |

## 3. Environment

- Application URL: http://localhost:3000
- Application Version / Commit: Not recorded
- Browser: Chromium
- Browser Version: 156.0.8078.4 (Official Build) (64-bit)
- Operating System: Windows 11 Pro 25H2
- Test Framework: Playwright
- Framework Version: 1.64.1
- Execution Mode: Headed
- Execution Environment: Local QA automation environment using the `relay_qa_automation` database.

## 4. Description

When a user attempts to log in with invalid credentials, the application displays the generic authentication error message without a trailing period.

The issue is observed under two conditions:

1. The submitted email address is not registered.
2. The submitted email address is registered, but the submitted password is incorrect.

In both conditions, the displayed message is:

`Invalid email or password`

However, REQ-AUTH-007 explicitly requires the exact message:

`Invalid email or password.`

The missing trailing period causes the actual error message to differ from the documented requirement in both invalid-credential conditions.

## 5. Preconditions

- The Relay application is accessible.
- The Login page is accessible.
- The QA database is available.
- The email address used for the unregistered-email condition has been verified as unregistered before test execution.
- A registered test account exists with known valid credentials for the incorrect-password condition.
- The incorrect password used for testing does not match the registered account's valid password.

## 6. Test Data

| Condition          | Data               | Value                           |
| ------------------ | ------------------ | ------------------------------- |
| Unregistered Email | Email              | `unregistered.user@example.com` |
| Unregistered Email | Password           | `password123`                   |
| Incorrect Password | Registered Email   | `registered.user@example.com`   |
| Incorrect Password | Valid Password     | `password123`                   |
| Incorrect Password | Submitted Password | `password124`                   |

## 7. Steps to Reproduce

### Condition A — Unregistered Email

1. Verify that `unregistered.user@example.com` is not registered in the QA database.
2. Open the Relay application.
3. Navigate to the Login page.
4. Enter `unregistered.user@example.com` in the Email field.
5. Enter `password123` in the Password field.
6. Click the **Sign in** button.
7. Observe the authentication error message displayed on the Login page.

### Condition B — Incorrect Password

1. Prepare a registered test account with the email `registered.user@example.com` and valid password `password123`.
2. Open the Relay application.
3. Navigate to the Login page.
4. Enter `registered.user@example.com` in the Email field.
5. Enter the incorrect password `password124` in the Password field.
6. Click the **Sign in** button.
7. Observe the authentication error message displayed on the Login page.

## 8. Expected Result

According to REQ-AUTH-007:

- Both invalid-credential conditions display exactly `Invalid email or password.`
- The user remains on the Login page.
- No authenticated access is granted.
- The error message does not reveal whether the email address is registered.
- Both conditions provide identical generic authentication error feedback.

## 9. Actual Result

### Condition A — Unregistered Email

- The application displays `Invalid email or password` without a trailing period.
- The application remains on the Login page (`/login`).
- The URL assertion for `/login` passed during automated execution.
- The exact error-message assertion failed because the actual message did not match the expected message.

### Condition B — Incorrect Password

- The registered test account was successfully prepared using Prisma upsert with the predefined valid credentials.
- The application displays `Invalid email or password` without a trailing period.
- The application remains on the Login page (`/login`).
- The URL assertion for `/login` passed during automated execution.
- The exact error-message assertion failed because the actual message did not match the expected message.
- Cleanup completed without reporting an error.

### Cross-Condition Verification

- TC-AUTH-008-01 compared the error messages produced by both invalid-credential conditions.
- The comparison assertion confirmed that both messages were identical.
- Both messages were missing the required trailing period.
- The exact expected-message assertion failed.

The observed discrepancy is limited to the missing trailing period. The recorded tests did not independently verify access to protected functionality.

## 10. Impact Assessment

**Confirmed Impact:**

- The displayed authentication error message does not conform to the exact-message requirement defined in REQ-AUTH-007.
- Both unregistered-email and incorrect-password conditions produce an error message that differs from the documented expected message.
- The automated exact-message assertions fail.
- The cross-condition comparison confirms that both conditions produce identical feedback, but that feedback does not satisfy the requirement.

**Potential Impact:**

- Inconsistent error-message formatting may affect interface consistency and strict requirement compliance.

No authentication bypass, unauthorized access, or exposure of account registration information was established by these tests.

**Severity:** Low

**Priority:** Low

## 11. Evidence

**TC-AUTH-007-01 — Unregistered Email**

- Screenshot: [TC-AUTH-007-01](../evidence/BUG-001/TC-AUTH-007-01/screenshot.png)
- Trace: [TC-AUTH-007-01](../evidence/BUG-001/TC-AUTH-007-01/trace.zip)
- Video: [TC-AUTH-007-01](../evidence/BUG-001/TC-AUTH-007-01/video.webm)
- Error Context: [TC-AUTH-007-01](../evidence/BUG-001/TC-AUTH-007-01/error-context.md)

**TC-AUTH-007-02 — Incorrect Password**

- Screenshot: [TC-AUTH-007-02](../evidence/BUG-001/TC-AUTH-007-02/screenshot.png)
- Trace: [TC-AUTH-007-02](../evidence/BUG-001/TC-AUTH-007-02/trace.zip)
- Video: [TC-AUTH-007-02](../evidence/BUG-001/TC-AUTH-007-02/video.webm)
- Error Context: [TC-AUTH-007-02](../evidence/BUG-001/TC-AUTH-007-02/error-context.md)

**TC-AUTH-008-01 — Cross-Condition Error Feedback Comparison**

- Screenshot: [TC-AUTH-008-01](../evidence/BUG-001/TC-AUTH-008-01/screenshot.png)
- Trace: [TC-AUTH-008-01](../evidence/BUG-001/TC-AUTH-008-01/trace.zip)
- Video: [TC-AUTH-008-01](../evidence/BUG-001/TC-AUTH-008-01/video.webm)
- Error Context: [TC-AUTH-008-01](../evidence/BUG-001/TC-AUTH-008-01/error-context.md)

**Observed Assertion Output:**

```text
Expected: "Invalid email or password."
Received: "Invalid email or password"
```

The cross-condition comparison and its execution outcome are documented in the TC-AUTH-008-01 execution record.

## 12. Automation Execution Details

| Test Case ID   | Spec File                            | Test Command                                                                                                                 | Execution Result                                                                |
| -------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| TC-AUTH-007-01 | `tests/authentication/login.spec.ts` | `npm run test:headed -- authentication/login.spec.ts --project=chromium --workers=1 --grep "TC-AUTH-007-01" --repeat-each=2` | FAIL — both repetitions failed at the exact-message assertion.                  |
| TC-AUTH-007-02 | `tests/authentication/login.spec.ts` | `npm run test:headed -- authentication/login.spec.ts --project=chromium --workers=1 --grep "TC-AUTH-007-02" --repeat-each=2` | FAIL — both repetitions failed at the exact-message assertion.                  |
| TC-AUTH-008-01 | `tests/authentication/login.spec.ts` | `npm run test:headed -- authentication/login.spec.ts --project=chromium --workers=1 --grep "TC-AUTH-008-01" --repeat-each=2` | FAIL — the comparison assertion passed, but the exact-message assertion failed. |

**Execution Notes:**

- All three test cases were executed in the local headed Chromium environment.
- The QA Safety Guard passed before execution.
- TC-AUTH-007-01 verified the unregistered-email condition.
- TC-AUTH-007-02 verified the incorrect-password condition.
- TC-AUTH-008-01 compared the error messages produced by both conditions.
- The same missing-period discrepancy was observed in the recorded repeated executions.
- The URL assertion for `/login` passed in the two individual invalid-credential test cases.
- Cleanup for the incorrect-password test completed without reporting an error.

## 13. Reproducibility

| Test Case ID   | Condition / Purpose                       | Reproduction Attempts | Successful Reproductions | Failed Reproductions | Observed Outcome                                                                                     |
| -------------- | ----------------------------------------- | --------------------: | -----------------------: | -------------------: | ---------------------------------------------------------------------------------------------------- |
| TC-AUTH-007-01 | Unregistered email                        |                     2 |                        2 |                    0 | The error message consistently appeared without the required trailing period.                        |
| TC-AUTH-007-02 | Incorrect password                        |                     2 |                        2 |                    0 | The error message consistently appeared without the required trailing period.                        |
| TC-AUTH-008-01 | Cross-condition error-message consistency |                     2 |                        2 |                    0 | Both conditions produced identical messages, but the messages did not match the required exact text. |
