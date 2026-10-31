# Authentication — Automation Coverage and Test Execution

## 1. Overview

This document defines the automation coverage plan and records actual test execution results for the Authentication functional area of Relay.

The Automation Coverage Matrix identifies the test cases selected for automation, their implementation order, proposed automation layers, automation decisions, and current execution status.

Execution Records document the results of test cases that have actually been executed. Test selection, implementation, and execution are distinct activities. A selected or implemented test must not be reported as executed without an actual test run and supporting evidence.

**Source documents**

- [Authentication Test Cases](../test-design/test-cases/authentication.md)
- [Authentication Scenarios](../test-design/scenarios/authentication.md)
- [Authentication Requirements](../docs/requirements/authentication.md)
- [Risk Assessment](../docs/risk-assessment.md)

---

## 2. Authentication Coverage Matrix

### 2.1 Matrix Purpose

This matrix defines the Authentication automation scope and implementation order.

Automation Order establishes the intended implementation sequence. It is separate from Source Priority and does not represent the chronological order of actual test execution.

Test Case IDs, titles, Risk Levels, and Source Priorities follow the current Authentication test-case source. Automation layers and decisions identify the intended automation approach for each case.

### 2.2 Automation Coverage

| Automation Order | Test Case ID   | Test Case Title                                                                       | Risk Level | Source Priority | Automation Layer | Automation Decision                                     | Execution Status |
| ---------------: | -------------- | ------------------------------------------------------------------------------------- | ---------- | --------------- | ---------------- | ------------------------------------------------------- | ---------------- |
|                1 | TC-AUTH-001-01 | Register a new account with valid required information                                | High       | High            | UI               | Include                                                 | Passed           |
|                2 | TC-AUTH-006-01 | Registered user logs in successfully                                                  | High       | High            | UI               | Include                                                 | Passed           |
|                3 | TC-AUTH-007-01 | Login rejects an unregistered email with the generic authentication error             | High       | High            | UI               | Include                                                 | Failed           |
|                4 | TC-AUTH-007-02 | Login rejects an incorrect password with the generic authentication error             | High       | High            | UI               | Include                                                 | Failed           |
|                5 | TC-AUTH-008-01 | Invalid credential conditions produce identical login error feedback                  | High       | High            | UI               | Include                                                 | Failed           |
|                6 | TC-AUTH-008-02 | Successful login clears a previous authentication error                               | High       | High            | UI               | Include                                                 | Not Executed Yet |
|                7 | TC-AUTH-005-01 | Registration displays the password mismatch error                                     | High       | High            | UI               | Include                                                 | Not Executed Yet |
|                8 | TC-AUTH-005-03 | Registration rejects an already registered email address                              | High       | High            | UI               | Include                                                 | Not Executed Yet |
|                9 | TC-AUTH-005-02 | Registration rejects a whitespace-only Name                                           | High       | High            | UI               | Include                                                 | Not Executed Yet |
|               10 | TC-AUTH-005-04 | Password mismatch takes priority over other registration validation errors            | High       | High            | UI               | Include                                                 | Not Executed Yet |
|               11 | TC-AUTH-005-05 | Whitespace-only Name takes priority over duplicate-email error when passwords match   | High       | High            | UI               | Include                                                 | Not Executed Yet |
|               12 | TC-AUTH-004-01 | Registration rejects a password shorter than eight characters                         | High       | High            | UI               | Include                                                 | Not Executed Yet |
|               13 | TC-AUTH-004-02 | Registration accepts a password at the eight-character minimum                        | High       | High            | UI               | Include                                                 | Not Executed Yet |
|               14 | TC-AUTH-004-04 | Registration does not require password character-class complexity                     | High       | High            | UI               | Include                                                 | Not Executed Yet |
|               15 | TC-AUTH-004-03 | Whitespace characters count toward the registration password minimum length           | High       | High            | UI               | Include                                                 | Not Executed Yet |
|               16 | TC-AUTH-011-01 | Unauthenticated user is redirected from a protected page to Login                     | High       | High            | UI               | Include                                                 | Not Executed Yet |
|               17 | TC-AUTH-011-02 | Protected API rejects a request without an authentication token                       | High       | High            | API              | Include                                                 | Not Executed Yet |
|               18 | TC-AUTH-011-03 | Protected access rejects an invalid authentication token                              | High       | High            | API              | Include                                                 | Not Executed Yet |
|               19 | TC-AUTH-009-01 | Logout invalidates the current authenticated session                                  | High       | High            | UI + API         | Include                                                 | Not Executed Yet |
|               20 | TC-AUTH-011-04 | Invalidated authentication token does not restore access after logout                 | High       | High            | API              | Include                                                 | Not Executed Yet |
|               21 | TC-AUTH-010-02 | Protected page remains inaccessible after logout                                      | High       | High            | UI               | Include                                                 | Not Executed Yet |
|               22 | TC-AUTH-010-01 | Browser Back does not restore authenticated access after logout                       | High       | High            | UI               | Include                                                 | Not Executed Yet |
|               23 | TC-AUTH-009-02 | Logout in one tab invalidates authenticated operations in another tab                 | High       | High            | UI + API         | Include                                                 | Not Executed Yet |
|               24 | TC-AUTH-012-01 | Authenticated state persists after page refresh while the session is valid            | High       | High            | UI               | Include                                                 | Not Executed Yet |
|               25 | TC-AUTH-012-02 | Existing and newly opened tabs recognize a valid session in the same browser profile  | High       | High            | UI               | Include                                                 | Not Executed Yet |
|               26 | TC-AUTH-013-01 | Authentication token remains valid before the 24-hour expiration point                | High       | High            | API              | Include                                                 | Not Executed Yet |
|               27 | TC-AUTH-013-02 | Expired token is rejected at the 24-hour expiration point                             | High       | High            | API              | Include — expiration setup required                     | Not Executed Yet |
|               28 | TC-AUTH-013-03 | Active session expiration redirects the user to Login and blocks protected operations | High       | High            | UI + API         | Include — expiration setup required                     | Not Executed Yet |
|               29 | TC-AUTH-013-04 | Session expiration applies across tabs and requires login again                       | High       | High            | UI + API         | Include — expiration setup required                     | Not Executed Yet |
|               30 | TC-AUTH-002-01 | Registration validates an empty Name field first                                      | High       | High            | UI               | Include                                                 | Not Executed Yet |
|               31 | TC-AUTH-002-02 | Registration validates an empty Email field after Name is provided                    | High       | High            | UI               | Include                                                 | Not Executed Yet |
|               32 | TC-AUTH-002-03 | Registration validates an empty Password field after Name and Email are provided      | High       | High            | UI               | Include                                                 | Not Executed Yet |
|               33 | TC-AUTH-002-04 | Registration validates an empty Confirm Password field last                           | High       | High            | UI               | Include                                                 | Not Executed Yet |
|               34 | TC-AUTH-003-01 | Login blocks submission when Email is empty                                           | Medium     | Medium          | UI               | Include                                                 | Not Executed Yet |
|               35 | TC-AUTH-003-02 | Login blocks submission when Password is empty                                        | Medium     | Medium          | UI               | Include                                                 | Not Executed Yet |
|               36 | TC-AUTH-003-03 | Login blocks submission when Email has an invalid format                              | Medium     | Medium          | UI               | Include                                                 | Not Executed Yet |
|               37 | TC-AUTH-004-05 | Login does not apply the registration minimum password-length rule                    | Medium     | Medium          | UI               | Include — assertion scope defined before implementation | Not Executed Yet |

### 2.3 Matrix Notes

- The matrix contains all 37 Authentication test cases defined in the current test-case source.
- Test Case IDs, titles, Risk Levels, and Source Priorities retain their source values.
- Automation Order represents implementation order, not source priority or a record of actual execution order.
- `Include` indicates that a test case belongs to the automation scope. Additional setup or assertion requirements do not remove a case from scope.
- UI tests verify observable user-interface behavior. API tests verify behavior at the HTTP interface. Where both layers are listed, their assertions must verify the applicable contracts at each layer.
- API-level authentication enforcement must be verified directly at the API layer where required. A UI-only result does not independently prove server-side enforcement.
- `Not Executed Yet` means no automated execution result has been recorded for that test case.
- A test case must not be marked as passed, failed, or blocked without an actual execution attempt and a corresponding record.

### 2.4 Implementation Dependencies

#### Session Expiration

`TC-AUTH-013-02`, `TC-AUTH-013-03`, and `TC-AUTH-013-04` require a repeatable strategy for creating or obtaining an expired authentication session.

The implementation must verify the documented expiration behavior without requiring an actual 24-hour wait for every test run, where a supported controlled setup can provide equivalent conditions. The chosen strategy must preserve the application requirements and must not depend on unapproved application-code or database changes.

#### Native Browser Validation

`TC-AUTH-002-01` through `TC-AUTH-002-04` and `TC-AUTH-003-01` through `TC-AUTH-003-03` cover browser-native validation.

Assertions should verify the documented invalid field, validation state, and prevention of form submission. Browser-native tooltip wording may vary by browser and locale; exact tooltip text should only be asserted where the source requirement and supported execution environment justify it.

#### Login Password Length

`TC-AUTH-004-05` verifies that the registration minimum-length restriction does not block login submission. The assertion must verify that the login form accepts the input for submission without requiring authentication to succeed with invalid credentials.

#### Logout and Token Invalidation

`TC-AUTH-011-04` verifies behavior involving a token retained independently of the browser's current authentication cookie. Removing a cookie during logout does not, by itself, establish that a copied token has been invalidated server-side.

The test must verify the documented expected behavior using an actual request with the retained token. Any mismatch must be recorded from observed execution evidence and assessed against the requirement.

---

## 3. Execution Summary

### 3.1 Current Execution Status

| Metric                             | Count |
| ---------------------------------- | ----: |
| Test Cases in Coverage Matrix      |    37 |
| Test Cases Selected for Automation |    37 |
| Test Cases Implemented             |     5 |
| Test Cases Executed                |     5 |
| Passed                             |     2 |
| Failed                             |     3 |
| Blocked                            |     0 |
| Not Executed                       |    32 |

### 3.2 Summary Notes

- The Authentication automation scope contains 37 selected test cases.
- Selection and implementation do not constitute execution evidence.
- A failed assertion is recorded as a failed execution only after the test has actually run.
- A test that cannot run because of environment or setup problems must be recorded using the applicable blocked or infrastructure-failure classification rather than being reported as passed.
- Execution metrics must reflect actual test runs and their corresponding records.

---

## 4. Execution Result Definitions

| Status       | Definition                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| PASS         | The test was executed, and the observed result satisfied the documented expected result.                                 |
| FAIL         | The test was executed, and the observed result did not satisfy the documented expected result.                           |
| BLOCKED      | The test could not complete because a required dependency, environment condition, or setup prerequisite was unavailable. |
| NOT EXECUTED | No execution attempt has been completed and recorded.                                                                    |

A status must reflect the actual execution outcome. Implementation status, expected behavior, and assumptions must not be used as substitutes for execution evidence.

---

## 5. Coverage Notes and Limitations

- The matrix defines intended automation coverage; it does not demonstrate that automated coverage has been achieved.
- Source Risk Levels and Priorities are retained as documented. They are distinct from Automation Order.
- Multi-tab tests require an explicit strategy for browser contexts, shared session state, and independent test execution.
- Test data setup and cleanup must be repeatable and must not depend on another test having executed first.
- Long-duration expiration behavior requires a supported, repeatable setup strategy before implementation.
- Any change to application code, schema, or database state for test setup requires explicit approval.
- Test execution outcomes must be supported by actual results and evidence.
- A failed assertion or unexpected observation is not automatically a confirmed defect. Defect classification must be supported by the applicable requirement or contract and the collected evidence.
- The automation scope is limited to the documented Authentication test cases. It does not imply exhaustive security testing or verification of behavior outside the defined requirements.

---

## 6. Execution Records

### TC-AUTH-001-01 — Register a new account with valid required information

- **Test Case Reference:** [TC-AUTH-001-01](../test-design/test-cases/authentication.md#tc-auth-001-01--register-a-new-account-with-valid-required-information)
- **Scenario Reference:** SCN-AUTH-001 [SCN-AUTH-001](../test-design/scenarios/authentication.md#scn-auth-001--user-registration)
- **Requirement Reference:** REQ-AUTH-001 [REQ-AUTH-001](../docs/requirements/authentication.md#req-auth-001--successful-registration)
- **Risk Reference:** RSK-007 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
- **Execution Date:** 2026-10-30

**Environment**

- Application URL: http://localhost:3000
- Browser / Project: Chromium
- Browser Version: 156.0.8078.4 (Official Build) (64-bit)
- Operating System: Windows 11 Pro 25H2
- Execution Mode: Headed
- Test Run / Commit Reference: Local execution

**Preconditions**

- Relay application is accessible.
- The email address `test.user@example.com` is not registered.
- The local QA automation database is available.
- The QA application and cleanup database roles are configured.

**Expected Result**

- The account is registered successfully.
- The application redirects to `/login`.
- No success message or confirmation notification is displayed.

**Actual Result**

- Relay homepage opened successfully.
- Clicking `Create one` navigated to the Register page.
- All registration fields accepted the provided test data.
- Registration completed successfully.
- The application redirected to `/login`.
- The `Welcome back` heading was visible.
- No success message or confirmation notification was observed during headed execution.
- The same static email address was successfully reused across five consecutive successful re-runs.

**Execution Result:** PASS

**Evidence**

- Playwright terminal output: `1 passed (21.5s)` for the reported successful run.
- Playwright HTML report generated locally.
- Headed browser execution used for visual observation.

**Defect Reference:** None identified.

### TC-AUTH-006-01 — Registered user logs in successfully

- **Test Case Reference:** [TC-AUTH-006-01](../test-design/test-cases/authentication.md#tc-auth-006-01--registered-user-logs-in-successfully)
- **Scenario Reference:** SCN-AUTH-006 [SCN-AUTH-006](../test-design/scenarios/authentication.md#scn-auth-006--valid-user-login)
- **Requirement Reference:** REQ-AUTH-002 [REQ-AUTH-002](../docs/requirements/authentication.md#req-auth-002--successful-login)
- **Risk Reference:** RSK-003 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
- **Execution Date:** 2026-10-30

**Environment**

- Application URL: http://localhost:3000
- Browser / Project: Chromium
- Browser Version: 156.0.8078.4 (Official Build) (64-bit)
- Operating System: Windows 11 Pro 25H2
- Execution Mode: Headed
- Test Run / Commit Reference: Local execution

**Preconditions**

- Relay application is accessible.
- The QA database is available.
- The QA application and cleanup database roles are configured.
- The registered test account is prepared using Prisma upsert before UI execution.

**Expected Result**

- Authentication succeeds.
- The application redirects to `/chat`.
- No success message is displayed and no additional redirect occurs after reaching `/chat`.

**Actual Result**

- The test account was successfully prepared using Prisma upsert with the predefined test credentials.
- The Login page was opened successfully.
- The registered user credentials were submitted through the UI.
- Authentication completed successfully.
- The application redirected to `/chat`.
- The `/chat` page was displayed successfully during headed browser execution.
- The `Conversations` heading was visible, satisfying the corresponding Playwright assertion.
- The cleanup operation completed without reporting an error.

**Execution Result:** PASS

**Evidence**

- Playwright terminal output: `1 passed (9.3s)`.
- QA Safety Guard passed before test execution.
- Playwright HTML report generated locally.
- Headed browser execution confirmed that the `/chat` page was displayed successfully.

**Defect Reference:** None identified.

### TC-AUTH-007-01 — Login rejects an unregistered email with the generic authentication error

- **Test Case Reference:** [TC-AUTH-007-01](../test-design/test-cases/authentication.md#tc-auth-007-01--login-rejects-an-unregistered-email-with-the-generic-authentication-error)
- **Scenario Reference:** SCN-AUTH-007 [SCN-AUTH-007](../test-design/scenarios/authentication.md#scn-auth-007--invalid-user-login)
- **Requirement Reference:** REQ-AUTH-007 [REQ-AUTH-007](../docs/requirements/authentication.md#req-auth-007--invalid-login-credentials)
- **Risk Reference:** RSK-003, RSK-009 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
- **Execution Date:** 2026-10-31

**Environment**

- Application URL: http://localhost:3000
- Browser / Project: Chromium
- Browser Version: 156.0.8078.4 (Official Build) (64-bit)
- Operating System: Windows 11 Pro 25H2
- Execution Mode: Headed
- Test Run / Commit Reference: Local execution

**Preconditions**

- Relay Login page is accessible.
- The email address `unregistered.user@example.com` is not registered.
- The QA database is available.
- The precondition was verified using Prisma before UI execution.

**Expected Result**

- The application displays exactly `Invalid email or password.`
- The user remains on the Login page.
- No authenticated access is granted.
- The message does not reveal whether the email address is registered.

**Actual Result**

- The precondition verification completed successfully.
- The Login page was opened successfully.
- The unregistered email and password were submitted through the UI.
- The application displayed `Invalid email or password` without a trailing period.
- The application remained on the Login page (`/login`), satisfying the corresponding URL assertion.
- The actual error message did not exactly match the documented expected message.
- The test execution failed at the error-message assertion.

**Execution Result:** FAIL

**Evidence**

- Playwright terminal output: `1 failed`.
- Assertion comparison:
  - Expected: `Invalid email or password.`
  - Received: `Invalid email or password`
- Playwright screenshot, video, error context, and trace generated locally.
- QA Safety Guard passed before execution.

**Defect Reference:** [BUG-001](../defect-reports/authentication.md#bug-001--generic-login-error-message-missing-trailing-period)

### TC-AUTH-007-02 — Login rejects an incorrect password with the generic authentication error

- **Test Case Reference:** [TC-AUTH-007-02](../test-design/test-cases/authentication.md#tc-auth-007-02--login-rejects-an-incorrect-password-with-the-generic-authentication-error)
- **Scenario Reference:** SCN-AUTH-007 [SCN-AUTH-007](../test-design/scenarios/authentication.md#scn-auth-007--invalid-user-login)
- **Requirement Reference:** REQ-AUTH-007 [REQ-AUTH-007](../docs/requirements/authentication.md#req-auth-007--invalid-login-credentials)
- **Risk Reference:** RSK-003, RSK-009 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
- **Execution Date:** 2026-10-31

**Environment**

- Application URL: http://localhost:3000
- Browser / Project: Chromium
- Browser Version: 156.0.8078.4 (Official Build) (64-bit)
- Operating System: Windows 11 Pro 25H2
- Execution Mode: Headed
- Test Run / Commit Reference: Local execution

**Preconditions**

- Relay Login page is accessible.
- The registered test account `registered.user@example.com` exists.
- The valid password for the registered account is known.
- The QA database is available.
- The QA application and cleanup database roles are configured.
- The registered test account is prepared using Prisma upsert before UI execution.

**Expected Result**

- The application displays exactly `Invalid email or password.`
- The user remains on the Login page.
- No authenticated access is granted.
- The message does not reveal whether the email address is registered.

**Actual Result**

- The registered test account was successfully prepared using Prisma upsert with the predefined valid credentials.
- The Login page was opened successfully.
- The registered email address and incorrect password were submitted through the UI.
- The application displayed `Invalid email or password` without a trailing period.
- The application remained on the Login page (`/login`), satisfying the corresponding URL assertion.
- The actual error message did not exactly match the documented expected message.
- The test execution failed at the error-message assertion.
- The same message discrepancy was observed in two test executions.
- Cleanup completed without reporting an error.

**Execution Result:** FAIL

**Evidence**

- Playwright terminal output: `1 failed` for each reported execution.
- Assertion comparison:
  - Expected: `Invalid email or password.`
  - Received: `Invalid email or password`
- Playwright screenshot, video, error context, and trace generated locally for the failed execution.
- QA Safety Guard passed before test execution.

**Defect Reference:** [BUG-002](../defect-reports/authentication.md#bug-002--generic-login-error-message-missing-trailing-period-for-incorrect-password)

### TC-AUTH-008-01 — Invalid credential conditions produce identical login error feedback

- **Test Case Reference:** [TC-AUTH-008-01](../test-design/test-cases/authentication.md#tc-auth-008-01--invalid-credential-conditions-produce-identical-login-error-feedback)
- **Scenario Reference:** SCN-AUTH-008 [SCN-AUTH-008](../test-design/scenarios/authentication.md#scn-auth-008--consistent-login-error-feedback)
- **Requirement Reference:** REQ-AUTH-007 [REQ-AUTH-007](../docs/requirements/authentication.md#req-auth-007--invalid-login-credentials)
- **Risk Reference:** RSK-003, RSK-009 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
- **Execution Date:** 2026-10-31

**Environment**

- Application URL: http://localhost:3000
- Browser / Project: Chromium
- Browser Version: 156.0.8078.4 (Official Build) (64-bit)
- Operating System: Windows 11 Pro 25H2
- Execution Mode: Headed
- Test Run / Commit Reference: Local execution

**Preconditions**

- Relay Login page is accessible.
- The email address `unregistered.user@example.com` is not registered.
- A registered account `registered.user@example.com` is available with known valid credentials.
- The QA database is available.
- The QA application and cleanup database roles are configured.

**Test Data**

| Attempt | Email                           | Password      |
| ------- | ------------------------------- | ------------- |
| A       | `unregistered.user@example.com` | `password123` |
| B       | `registered.user@example.com`   | `password124` |

**Expected Result**

- Both attempts display exactly `Invalid email or password.`
- Neither message reveals whether the email address is registered.
- Both attempts remain on the Login page.

**Actual Result**

- Attempt A using an unregistered email displayed `Invalid email or password` without a trailing period.
- The application remained on the Login page (`/login`).
- Attempt B using a registered email and incorrect password displayed the same message: `Invalid email or password`.
- The application remained on the Login page (`/login`).
- The comparison assertion confirmed that both error messages were identical.
- The exact error-message assertion failed because the messages did not match the documented expected result.
- The same outcome was observed in two test executions.

**Execution Result:** FAIL

**Evidence**

- Playwright terminal output: Two executions reported the same failure.
- Error-message comparison:
  - Attempt A: `Invalid email or password`
  - Attempt B: `Invalid email or password`
- Exact expected message: `Invalid email or password.`
- QA Safety Guard passed before test execution.

**Defect Reference:**

- [BUG-001 — Unregistered Email](../defect-reports/authentication.md#bug-001)
- [BUG-002 — Incorrect Password](../defect-reports/authentication.md#bug-002)
