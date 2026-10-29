# Authorization — Automation Coverage and Test Execution

## 1. Overview

This document defines the automation coverage plan and records actual test execution results for the Authorization functional area of Relay.

The Automation Coverage Matrix identifies the test cases selected for automation, their implementation order, proposed automation layers, automation decisions, and current execution status.

Execution Records document the results of test cases that have actually been executed. Test selection, implementation, and execution are distinct activities. A selected or implemented test must not be reported as executed without an actual test run and supporting evidence.

**Source documents**

- [Authorization Test Cases](../test-design/test-cases/authorization.md)
- [Authorization Scenarios](../test-design/scenarios/authorization.md)
- [Authorization Requirements](../docs/requirements/authorization.md)
- [Risk Assessment](../docs/risk-assessment.md)

---

## 2. Authorization Coverage Matrix

### 2.1 Matrix Purpose

This matrix defines the Authorization automation scope and implementation order.

Automation Order establishes the intended implementation sequence. It is separate from Source Priority and does not represent the chronological order of actual test execution.

Test Case IDs, titles, Risk Levels, and Source Priorities follow the current Authorization test-case source. Automation layers and decisions identify the intended automation approach for each case.

### 2.2 Automation Coverage

| Automation Order | Test Case ID    | Test Case Title                                                                                   | Risk Level | Source Priority | Automation Layer | Automation Decision                               | Execution Status |
| ---------------: | --------------- | ------------------------------------------------------------------------------------------------- | ---------- | --------------- | ---------------- | ------------------------------------------------- | ---------------- |
|                1 | TC-AUTHZ-001-01 | Authorized user accesses an existing conversation                                                 | High       | High            | UI               | Include                                           | Not Executed Yet |
|                2 | TC-AUTHZ-002-01 | Non-participant cannot access another user's conversation through direct navigation               | High       | High            | UI               | Include                                           | Not Executed Yet |
|                3 | TC-AUTHZ-002-02 | API request cannot retrieve conversation data for a non-participant                               | High       | High            | API              | Include — API contract required                   | Not Executed Yet |
|                4 | TC-AUTHZ-005-01 | Server-side authorization prevents unauthorized access when client-side restrictions are bypassed | High       | High            | API              | Include — API contract required                   | Not Executed Yet |
|                5 | TC-AUTHZ-003-01 | Client-provided user identity does not override the authenticated user's identity                 | High       | High            | API              | Include — operation and request contract required | Not Executed Yet |
|                6 | TC-AUTHZ-004-01 | Message is attributed to the authenticated user                                                   | High       | High            | UI + API         | Include                                           | Not Executed Yet |
|                7 | TC-AUTHZ-004-02 | Client-provided sender identity cannot override the authenticated sender                          | High       | High            | API              | Include — operation and request contract required | Not Executed Yet |

### 2.3 Matrix Notes

- The matrix contains all 7 Authorization test cases defined in the current test-case source.
- Test Case IDs, titles, Risk Levels, and Source Priorities retain their source values.
- All 7 test cases have High Risk Level and High Source Priority.
- Automation Order represents implementation order, not source priority or a record of actual execution order.
- `Include` indicates that a test case belongs to the automation scope. Additional setup or assertion requirements do not remove a case from scope.
- UI tests verify observable user-interface behavior. API tests verify authorization enforcement through the HTTP interface.
- Where both UI and API layers are listed, the assertions must verify the applicable contracts at each layer.
- Authorization must be enforced on the server for protected operations. A UI-only result does not independently prove server-side authorization.
- The exact HTTP status code must not be invented as an acceptance criterion when it is not specified by the authorization requirements.
- `Not Executed Yet` means no automated execution result has been recorded for that test case.
- A test case must not be marked as passed, failed, or blocked without an actual execution attempt and a corresponding record.

### 2.4 Implementation Dependencies

#### Conversation and Participant Data

`TC-AUTHZ-001-01`, `TC-AUTHZ-002-01`, `TC-AUTHZ-002-02`, and `TC-AUTHZ-005-01` require an existing conversation with known participants and an authenticated user whose authorization to access that conversation is defined.

The test setup must distinguish between an authorized participant and a non-participant. Test data must be prepared so that the same target conversation can be used to verify both authorized access and unauthorized access without relying on another test having executed first.

#### API Operation and Request Contract

`TC-AUTHZ-002-02` and `TC-AUTHZ-005-01` require identification of the relevant protected conversation-retrieval operation and its request contract.

`TC-AUTHZ-003-01` and `TC-AUTHZ-004-02` require identification of a documented protected operation and its request contract that supports evaluation of client-provided identity manipulation.

The implementation must use the actual API operations and request fields supported by Relay. It must not invent endpoint names, request fields, or acceptance criteria. If the documented operation does not accept a client-controlled identity field, the test must use an appropriate documented mechanism to evaluate the requirement.

#### Message Sender Identity

`TC-AUTHZ-004-01` verifies that a message is attributed to the authenticated user who sends it. The test must establish an authorized conversation and verify that the resulting message is associated with the authenticated sender.

The UI assertion verifies the sender identity visible to the user. The API-level assertion verifies the relevant response or persisted result where supported by the documented contract.

`TC-AUTHZ-004-02` verifies that a client-provided sender identity cannot override the authenticated user's identity. The test must use the actual message-creation API contract and must not assume that unsupported request fields are accepted by Relay.

---

## 3. Execution Summary

### 3.1 Current Execution Status

| Metric                             | Count |
| ---------------------------------- | ----: |
| Test Cases in Coverage Matrix      |     7 |
| Test Cases Selected for Automation |     7 |
| Test Cases Implemented             |     0 |
| Test Cases Executed                |     0 |
| Passed                             |     0 |
| Failed                             |     0 |
| Blocked                            |     0 |
| Not Executed                       |     7 |

### 3.2 Summary Notes

- The Authorization automation scope contains 7 selected test cases.
- No Authorization automated test has been executed.
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
- Test data setup must be repeatable and must not depend on another test having executed first.
- Authorization tests must distinguish authentication from authorization. An authenticated user is not necessarily authorized to access every conversation.
- API-level authorization assertions must evaluate whether protected data or access is granted, rather than assuming a particular HTTP status code where the requirement does not specify one.
- Client-provided identity tests must use supported request contracts and must not rely on invented request fields.
- Message sender identity must be evaluated against the authenticated user, not merely against values submitted by the client.
- Any change to application code, schema, or database state for test setup requires explicit approval.
- Test execution outcomes must be supported by actual results and evidence.
- A failed assertion or unexpected observation is not automatically a confirmed defect. Defect classification must be supported by the applicable requirement or contract and the collected evidence.
- The automation scope is limited to the documented Authorization test cases. It does not imply exhaustive security testing or verification of behavior outside the defined requirements.

---

## 6. Execution Records

### 6.1 Execution Record Template

Use the following template to record each automated test execution. Replace the example identifiers and fields with verified information for the actual test run.

#### TC-AUTHZ-XXX-XX — [Test Case Title]

**Test Case Reference:** [Authorization Test Cases](../test-design/test-cases/authorization.md)

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
