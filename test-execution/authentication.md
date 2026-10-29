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
|                1 | TC-AUTH-001-01 | Register a new account with valid required information                                | High       | High            | UI               | Include                                                 | Not Executed Yet |
|                2 | TC-AUTH-006-01 | Registered user logs in successfully                                                  | High       | High            | UI               | Include                                                 | Not Executed Yet |
|                3 | TC-AUTH-007-01 | Login rejects an unregistered email with the generic authentication error             | High       | High            | UI               | Include                                                 | Not Executed Yet |
|                4 | TC-AUTH-007-02 | Login rejects an incorrect password with the generic authentication error             | High       | High            | UI               | Include                                                 | Not Executed Yet |
|                5 | TC-AUTH-008-01 | Invalid credential conditions produce identical login error feedback                  | High       | High            | UI               | Include                                                 | Not Executed Yet |
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
| Test Cases Implemented             |     0 |
| Test Cases Executed                |     0 |
| Passed                             |     0 |
| Failed                             |     0 |
| Blocked                            |     0 |
| Not Executed                       |    37 |

### 3.2 Summary Notes

- The Authentication automation scope contains 37 selected test cases.
- No Authentication automated test has been executed.
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

### 6.1 Execution Record Template

Use the following template to record each automated test execution. Replace the example identifiers and fields with verified information for the actual test run.

#### TC-AUTH-XXX-XX — [Test Case Title]

**Test Case Reference:** [Authentication Test Cases](../test-design/test-cases/authentication.md)

**Scenario Reference:** [Scenario ID]

**Requirement Reference:** [Requirement ID]

**Risk Reference:** [Risk ID]

**Execution Date:** YYYY-MM-DD

**Environment**

- Application URL: [URL]
- Browser / Project: [Browser and Playwright project]
- Browser Version: [Version]
- Operating System: [Operating system]
- Execution Mode: Headed / Headless
- Test Run / Commit Reference: [Run identifier or commit]

**Preconditions**

- [Record the verified preconditions used for this execution.]

**Expected Result**

- [Copy or summarize the expected result from the source test case without changing its acceptance criteria.]

**Actual Result**

- [Record only behavior observed during the actual execution.]

**Execution Result:** NOT EXECUTED

**Evidence**

- Test report: [Reference]
- Screenshot / Trace / Video: [Reference, where applicable]

**Defect Reference:** None identified / [Defect reference]

**Execution Notes**

- [Record relevant observations, limitations, or investigation notes.]

---
