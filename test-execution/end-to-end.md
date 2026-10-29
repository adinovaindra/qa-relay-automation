# End-to-End — Automation Coverage and Test Execution

## 1. Overview

This document defines the automation coverage plan and records actual test execution results for the End-to-End functional area of Relay.

The Automation Coverage Matrix identifies the test cases selected for automation, their implementation order, proposed automation layers, automation decisions, and current execution status.

Execution Records document the results of test cases that have actually been executed. Test selection, implementation, and execution are distinct activities. A selected or implemented test must not be reported as executed without an actual test run and supporting evidence.

**Source documents**

- [End-to-End Test Cases](../test-design/test-cases/end-to-end.md)
- [End-to-End Scenarios](../test-design/scenarios/end-to-end.md)
- [Authentication Requirements](../docs/requirements/authentication.md)
- [Conversation Requirements](../docs/requirements/conversation.md)
- [Messaging Requirements](../docs/requirements/messaging.md)
- [Risk Assessment](../docs/risk-assessment.md)

---

## 2. End-to-End Coverage Matrix

### 2.1 Matrix Purpose

This matrix defines the End-to-End automation scope and implementation order.

Automation Order establishes the intended implementation sequence. It is separate from Source Priority and does not represent the chronological order of actual test execution.

Test Case IDs, titles, Risk Levels, and Source Priorities follow the current End-to-End test-case source. Automation layers and decisions identify the intended automation approach for each case.

### 2.2 Automation Coverage

| Automation Order | Test Case ID  | Test Case Title                                            | Risk Level | Source Priority | Automation Layer | Automation Decision | Execution Status |
| ---------------: | ------------- | ---------------------------------------------------------- | ---------- | --------------- | ---------------- | ------------------- | ---------------- |
|                1 | TC-E2E-001-01 | Complete User Registration, Messaging, and Logout Workflow | High       | High            | UI               | Include             | Not Executed Yet |

### 2.3 Matrix Notes

- The matrix contains the single End-to-End test case defined in the current test-case source.
- The Test Case ID, title, Risk Level, and Source Priority retain their source values.
- Automation Order represents implementation order, not source priority or a record of actual execution order.
- `Include` indicates that the test case belongs to the automation scope. It does not indicate that the test has been implemented or executed.
- The selected test verifies the documented cross-feature workflow from registration through authentication, conversation creation, message submission, logout, and protected-page access after logout.
- The test uses the UI automation layer to verify the complete user journey and its observable outcomes. It does not replace the feature-level tests responsible for detailed verification of individual behaviors.
- `Not Executed Yet` means no automated execution result has been recorded for this test case.
- A test case must not be marked as passed, failed, or blocked without an actual execution attempt and a corresponding record.

### 2.4 Implementation Dependencies

#### Unique Registration Test Data

`TC-E2E-001-01` requires a test email address that has not already been registered. Reusing an address from a previous successful run may prevent the registration step from reaching its expected outcome.

The implementation must use a repeatable strategy for providing a unique, unused email address. Test data setup and cleanup must not depend on another test having executed first.

#### Existing Conversation Counterpart

`TC-E2E-001-01` requires an existing registered user account to act as the conversation counterpart. The counterpart's identifying information must be available to the test before the conversation-creation step begins.

The implementation must establish this precondition reliably. If the required account is unavailable or its identifying information cannot be verified, the test must not be reported as passed.

#### Cross-Feature Workflow and Navigation

`TC-E2E-001-01` depends on the documented sequence of registration, login, conversation creation, message submission, and logout. Each step must reach its expected state before the workflow continues to the next step.

The implementation should use observable UI behavior to verify the relevant transitions and avoid relying solely on fixed delays. A failure at an earlier step must be recorded accurately rather than allowing later assertions to obscure the original failure.

#### Message Submission and Verification

`TC-E2E-001-01` requires the newly registered user to create a conversation with the existing counterpart and submit a non-empty text message.

The implementation must verify that the submitted message appears in the selected conversation with the entered content. This assertion concerns the documented message-submission workflow; it must not be expanded into an assumption that live message delivery or synchronization across already-open views is required.

#### Logout and Protected-Page Access

`TC-E2E-001-01` requires successful logout followed by an attempt to access `/chat` directly. The expected behavior is that the unauthenticated user is redirected to `/login` and authenticated access is not restored.

The implementation must verify the resulting page and authentication state after logout. A redirect immediately after clicking Logout alone is not sufficient evidence that the subsequent protected-page access check has passed.

---

## 3. Execution Summary

### 3.1 Current Execution Status

| Metric                             | Count |
| ---------------------------------- | ----: |
| Test Cases in Coverage Matrix      |     1 |
| Test Cases Selected for Automation |     1 |
| Test Cases Implemented             |     0 |
| Test Cases Executed                |     0 |
| Passed                             |     0 |
| Failed                             |     0 |
| Blocked                            |     0 |
| Not Executed                       |     1 |

### 3.2 Summary Notes

- The End-to-End automation scope contains one selected test case.
- No End-to-End automated test has been executed.
- Selection and implementation do not constitute execution evidence.
- The test case covers a cross-feature user journey and complements the individual feature-level test cases.
- A failed assertion is recorded as a failed execution only after the test has actually run.
- A test that cannot run because of an unavailable environment condition, dependency, or setup prerequisite must be recorded as blocked when the execution record supports that classification.
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
- The source Risk Level and Priority are retained as documented. They are distinct from Automation Order.
- The selected End-to-End test verifies the documented cross-feature workflow. It does not establish exhaustive coverage of every requirement or feature.
- Feature-level test cases remain responsible for detailed verification of registration validation, authentication errors, authorization enforcement, conversation behavior, message validation, and other individual behaviors.
- Test data setup and cleanup must be repeatable and must not depend on another test having executed first.
- Any change to application code, schema, or database state for test setup requires explicit approval.
- Execution outcomes must be supported by actual results and evidence.
- A failed assertion or unexpected observation is not automatically a confirmed defect. Defect classification must be supported by the applicable requirement and collected evidence.
- The automation scope is limited to the documented End-to-End test case. It does not imply exhaustive security testing or verification of behavior outside the defined requirements.
- The documented workflow does not establish a requirement for live message delivery or synchronization across already-open conversation views.

---

## 6. Execution Records

### 6.1 Execution Record Template

Use the following template to record the automated test execution. Replace the example identifiers and fields with verified information for the actual test run.

#### TC-E2E-XXX-XX — [Test Case Title]

**Test Case Reference:** [End-to-End Test Cases](../test-design/test-cases/end-to-end.md)

**Scenario Reference:** [SCN-E2E-001](../test-design/scenarios/end-to-end.md#scn-e2e-001--user-registration-messaging-and-logout-workflow)

**Requirement Reference:** REQ-AUTH-001, REQ-AUTH-002, REQ-AUTH-003, REQ-AUTH-004, REQ-CONV-002, REQ-MSG-001

**Risk Reference:** RSK-003, RSK-005, RSK-006, RSK-007, RSK-020

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
