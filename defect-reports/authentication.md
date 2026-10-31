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

| Reference        | ID / Link                                                                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requirement      | [REQ-AUTH-007](../docs/requirements/authentication.md#req-auth-007--invalid-login-credentials)                                                          |
| Test Scenario    | [SCN-AUTH-007](../test-design/scenarios/authentication.md#scn-auth-007--invalid-user-login)                                                             |
| Test Case        | [TC-AUTH-007-01](../test-design/test-cases/authentication.md#tc-auth-007-01--login-rejects-an-unregistered-email-with-the-generic-authentication-error) |
| Related Risks    | RSK-003, RSK-009                                                                                                                                        |
| Execution Record | [Authentication Execution Record](../test-execution/authentication.md#tc-auth-007-01)                                                                   |

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

When a user attempts to log in with an unregistered email address, the application displays the generic authentication error message without a trailing period.

The displayed message is:

`Invalid email or password`

However, REQ-AUTH-007 explicitly requires the exact message:

`Invalid email or password.`

The missing trailing period causes the actual error message to differ from the documented requirement.

## 5. Preconditions

- The Relay application is accessible.
- The Login page is accessible.
- The QA database is available.
- The email address used for testing has been verified as unregistered before test execution.

## 6. Test Data

| Data     | Value                           |
| -------- | ------------------------------- |
| Email    | `unregistered.user@example.com` |
| Password | `password123`                   |

## 7. Steps to Reproduce

1. Open the Relay application.
2. Navigate to the Login page.
3. Enter `unregistered.user@example.com` in the Email field.
4. Enter `password123` in the Password field.
5. Click the **Sign in** button.
6. Observe the authentication error message displayed on the Login page.

## 8. Expected Result

According to REQ-AUTH-007:

- The application displays exactly `Invalid email or password.`
- The user remains on the Login page.
- No authenticated access is granted.
- The error message does not reveal whether the email address is registered.

## 9. Actual Result

- The application displays `Invalid email or password` without a trailing period.
- The application remains on the Login page.
- The URL assertion for `/login` passed during automated execution.
- The exact error-message assertion failed because the actual message did not match the expected message.

The observed discrepancy is limited to the missing trailing period. The test did not independently verify access to protected functionality.

## 10. Impact Assessment

**Confirmed Impact:**

- The displayed authentication error message does not conform to the exact-message requirement defined in REQ-AUTH-007.
- The automated assertion for the expected error message fails.

**Potential Impact:**

- Inconsistent error-message formatting may affect interface consistency and strict requirement compliance.

No authentication bypass, unauthorized access, or exposure of account registration information was established by this test.

**Severity:** Low

**Priority:** Low

## 11. Evidence

- Screenshot: [BUG-001](../evidence/BUG-001/screenshot.png)
- Trace: [BUG-001](../evidence/BUG-001/trace.zip)
- Video: [BUG-001](../evidence/BUG-001/video.webm)
- Error Context: [BUG-001](../evidence/BUG-001/error-context.md)

**Observed Assertion Output:**

```text
Expected: "Invalid email or password."
Received: "Invalid email or password"
```

## 12. Automation Execution Details

| Field              | Value                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------ |
| Spec File          | `tests/authentication/login.spec.ts`                                                                         |
| Test Case ID       | TC-AUTH-007-01                                                                                               |
| Test Command       | `npm run test:headed -- authentication/login.spec.ts --project=chromium --workers=1 --grep "TC-AUTH-007-01"` |
| Execution Result   | FAIL                                                                                                         |
| Test Run Reference | Local execution                                                                                              |

**Execution Notes:**

- The QA Safety Guard passed before test execution.
- The precondition verification confirmed that the test email address was not registered.
- The URL assertion for `/login` passed.
- The error-message assertion failed due to the missing trailing period.
- The same message discrepancy was observed in two test executions.

## 13. Reproducibility

| Field                           | Value                                                                                                                |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Reproducibility Status          | Reproducible                                                                                                         |
| Number of Reproduction Attempts | 2                                                                                                                    |
| Successful Reproductions        | 2                                                                                                                    |
| Failed Reproductions            | 0                                                                                                                    |
| Notes                           | Both executions produced the same error message without the required trailing period under the same test conditions. |

# BUG-002 — Generic Login Error Message Missing Trailing Period for Incorrect Password

## 1. Defect Identification

| Field           | Value                                                                      |
| --------------- | -------------------------------------------------------------------------- |
| Defect ID       | BUG-002                                                                    |
| Jira Issue      | [QRA-2](https://adinovapramono69.atlassian.net/browse/QRA-2)               |
| Title           | Generic Login Error Message Missing Trailing Period for Incorrect Password |
| Functional Area | Authentication / Login                                                     |
| Severity        | Low                                                                        |
| Priority        | Low                                                                        |
| Status          | Open                                                                       |
| Date Identified | 2026-10-31                                                                 |

## 2. Traceability

| Reference        | ID / Link                                                                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requirement      | [REQ-AUTH-007](../docs/requirements/authentication.md#req-auth-007--invalid-login-credentials)                                                          |
| Test Scenario    | [SCN-AUTH-007](../test-design/scenarios/authentication.md#scn-auth-007--invalid-user-login)                                                             |
| Test Case        | [TC-AUTH-007-02](../test-design/test-cases/authentication.md#tc-auth-007-02--login-rejects-an-incorrect-password-with-the-generic-authentication-error) |
| Related Risks    | RSK-003, RSK-009                                                                                                                                        |
| Execution Record | [Authentication Execution Record](../test-execution/authentication.md#tc-auth-007-02)                                                                   |

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

When a registered user attempts to log in with an incorrect password, the application displays the generic authentication error message without a trailing period.

The displayed message is:

`Invalid email or password`

However, REQ-AUTH-007 explicitly requires the exact message:

`Invalid email or password.`

The missing trailing period causes the actual error message to differ from the documented requirement.

## 5. Preconditions

- The Relay application is accessible.
- The Login page is accessible.
- The QA database is available.
- A registered test account exists with known valid credentials.
- The incorrect password used for testing does not match the registered account's valid password.

## 6. Test Data

| Data               | Value                         |
| ------------------ | ----------------------------- |
| Registered Email   | `registered.user@example.com` |
| Valid Password     | `password123`                 |
| Incorrect Password | `password124`                 |

## 7. Steps to Reproduce

1. Prepare a registered test account with the email `registered.user@example.com` and valid password `password123`.
2. Open the Relay application.
3. Navigate to the Login page.
4. Enter `registered.user@example.com` in the Email field.
5. Enter the incorrect password `password124` in the Password field.
6. Click the **Sign in** button.
7. Observe the authentication error message displayed on the Login page.

## 8. Expected Result

According to REQ-AUTH-007:

- The application displays exactly `Invalid email or password.`
- The user remains on the Login page.
- No authenticated access is granted.
- The error message does not reveal whether the email address is registered.

## 9. Actual Result

- The application displays `Invalid email or password` without a trailing period.
- The application remains on the Login page.
- The URL assertion for `/login` passed during automated execution.
- The exact error-message assertion failed because the actual message did not match the expected message.

The observed discrepancy is limited to the missing trailing period. The test did not independently verify access to protected functionality.

## 10. Impact Assessment

**Confirmed Impact:**

- The displayed authentication error message does not conform to the exact-message requirement defined in REQ-AUTH-007.
- The automated assertion for the expected error message fails.

**Potential Impact:**

- Inconsistent error-message formatting may affect interface consistency and strict requirement compliance.

No authentication bypass, unauthorized access, or exposure of account registration information was established by this test.

**Severity:** Low

**Priority:** Low

## 11. Evidence

- Screenshot: [BUG-002](../evidence/BUG-002/screenshot.png)
- Trace: [BUG-002](../evidence/BUG-002/trace.zip)
- Video: [BUG-002](../evidence/BUG-002/video.webm)
- Error Context: [BUG-002](../evidence/BUG-002/error-context.md)

**Observed Assertion Output:**

```text
Expected: "Invalid email or password."
Received: "Invalid email or password"
```

## 12. Automation Execution Details

| Field              | Value                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------ |
| Spec File          | `tests/authentication/login.spec.ts`                                                                         |
| Test Case ID       | TC-AUTH-007-02                                                                                               |
| Test Command       | `npm run test:headed -- authentication/login.spec.ts --project=chromium --workers=1 --grep "TC-AUTH-007-02"` |
| Execution Result   | FAIL                                                                                                         |
| Test Run Reference | Local execution                                                                                              |

**Execution Notes:**

- The QA Safety Guard passed before test execution.
- The registered test account was prepared before UI execution.
- The Login page was accessible.
- The URL assertion for `/login` passed.
- The error-message assertion failed due to the missing trailing period.
- The same message discrepancy was observed in two test executions.
- Cleanup completed without reporting an error.

## 13. Reproducibility

| Field                           | Value                                                                                                                |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Reproducibility Status          | Reproducible                                                                                                         |
| Number of Reproduction Attempts | 2                                                                                                                    |
| Successful Reproductions        | 2                                                                                                                    |
| Failed Reproductions            | 0                                                                                                                    |
| Notes                           | Both executions produced the same error message without the required trailing period under the same test conditions. |
