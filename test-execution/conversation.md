# Conversation — Automation Coverage and Test Execution

## 1. Overview

This document defines the automation coverage plan and records actual test execution results for the Conversation functional area of Relay.

The Automation Coverage Matrix identifies the test cases selected for automation, their implementation order, proposed automation layers, automation decisions, and current execution status.

Execution Records document the results of test cases that have actually been executed. Test selection, implementation, and execution are distinct activities. A selected or implemented test must not be reported as executed without an actual test run and supporting evidence.

**Source documents**

- [Conversation Test Cases](../test-design/test-cases/conversation.md)
- [Conversation Scenarios](../test-design/scenarios/conversation.md)
- [Conversation Requirements](../docs/requirements/conversation.md)
- [Risk Assessment](../docs/risk-assessment.md)

---

## 2. Conversation Coverage Matrix

### 2.1 Matrix Purpose

This matrix defines the Conversation automation scope and implementation order.

Automation Order establishes the intended implementation sequence. It is separate from Source Priority and does not represent the chronological order of actual test execution.

Test Case IDs, titles, Risk Levels, and Source Priorities follow the current Conversation test-case source. Automation layers and decisions identify the intended automation approach for each case.

### 2.2 Automation Coverage

| Automation Order | Test Case ID   | Test Case Title                                                                                  | Risk Level | Source Priority | Automation Layer | Automation Decision | Execution Status |
| ---------------: | -------------- | ------------------------------------------------------------------------------------------------ | ---------- | --------------- | ---------------- | ------------------- | ---------------- |
|                1 | TC-CONV-002-01 | User can create a conversation with another user when no conversation exists                     | High       | High            | UI               | Include             | Not Executed Yet |
|                2 | TC-CONV-002-02 | Existing conversation is retrieved instead of creating a duplicate                               | High       | High            | UI               | Include             | Not Executed Yet |
|                3 | TC-CONV-003-01 | User cannot create a conversation with themselves through the UI                                 | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|                4 | TC-CONV-004-01 | Conversation list displays the correct counterpart name                                          | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|                5 | TC-CONV-005-01 | Conversation list displays the latest message preview                                            | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|                6 | TC-CONV-005-02 | Empty conversation displays the documented empty preview                                         | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|                7 | TC-CONV-006-01 | Conversation activity timestamp uses the documented format for today, yesterday, and older dates | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|                8 | TC-CONV-007-01 | Sending a message updates conversation ordering by latest activity                               | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|                9 | TC-CONV-007-02 | Newly created empty conversation can appear at the top of the conversation list                  | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|               10 | TC-CONV-008-01 | Accessing a nonexistent conversation displays the documented error state                         | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|               11 | TC-CONV-001-01 | Authorized participants can access their one-to-one conversation                                 | High       | High            | UI               | Defer               | Not Executed Yet |
|               12 | TC-CONV-003-02 | API request cannot create a conversation with the same user as both participants                 | Medium     | Medium          | API              | Defer               | Not Executed Yet |
|               13 | TC-CONV-005-03 | Long latest-message preview is displayed on one line and truncated with an ellipsis              | Medium     | Medium          | UI               | Defer               | Not Executed Yet |

### 2.3 Matrix Notes

- The matrix contains 10 selected test cases from the 13 test cases defined in the current Conversation test-case source.
- Test Case IDs, titles, Risk Levels, and Source Priorities retain their source values.
- Automation Order represents implementation order, not source priority or a record of actual execution order.
- `Include` indicates that a test case belongs to the initial automation scope. Additional setup or assertion requirements do not remove a case from scope.
- UI tests verify observable user-interface behavior. API tests verify behavior at the HTTP interface. Where both layers are listed, their assertions must verify the applicable contracts at each layer.
- `TC-CONV-001-01` is deferred from this feature's initial implementation sequence because authorized conversation access is also covered by the dedicated Authorization functional area.
- `TC-CONV-003-02` is deferred until the supported API operation and request contract are identified.
- `TC-CONV-005-03` is deferred from the initial implementation sequence. It remains a candidate for subsequent UI boundary coverage.
- `Not Executed Yet` means no automated execution result has been recorded for that test case.
- A test case must not be marked as passed, failed, or blocked without an actual execution attempt and a corresponding record.

### 2.4 Implementation Dependencies

#### Conversation Creation and Retrieval

`TC-CONV-002-01` and `TC-CONV-002-02` require a supported workflow for initiating a conversation with another user.

The implementation must establish whether a conversation between the selected users already exists. For the new-conversation case, the test must begin without an existing conversation between that pair. For the retrieval case, an existing conversation must be available before the workflow is initiated.

Assertions must distinguish retrieval of the existing conversation from creation of a duplicate. A successful UI interaction alone does not prove that duplicate conversation data was not created.

#### Self-Conversation Prevention

`TC-CONV-003-01` verifies that a user cannot create a conversation with themselves through the UI.

The implementation must use a supported UI workflow to attempt the operation and verify the documented restriction. `TC-CONV-003-02` covers the corresponding API-level behavior but remains deferred until the supported API operation and request contract are identified. Do not invent endpoint paths, request fields, or HTTP status codes.

#### Conversation List Information

`TC-CONV-004-01`, `TC-CONV-005-01`, and `TC-CONV-005-02` verify the counterpart name, latest-message preview, and empty-conversation preview.

The implementation must establish the relevant conversation state and expected displayed information before making assertions. Test data setup and cleanup must be repeatable and must not depend on another test having executed first.

#### Conversation Activity Timestamp

`TC-CONV-006-01` covers the documented timestamp formats for activity occurring today, yesterday, and on older dates.

The implementation requires a repeatable way to establish activity dates for the required conditions. Assertions must account for the application's documented behavior and the user's local calendar date. The test must not rely solely on uncontrolled wall-clock timing.

#### Conversation Ordering

`TC-CONV-007-01` and `TC-CONV-007-02` verify conversation ordering based on latest activity.

The implementation must establish the initial conversation-list order before sending a message or creating an empty conversation. Assertions must verify the resulting order against the documented latest-activity requirement.

#### Nonexistent Conversation Error State

`TC-CONV-008-01` requires a target conversation reference that is confirmed not to correspond to an existing conversation.

The implementation must verify the documented error heading, message, and Reload button. It must not assert unspecified implementation details or invent an API contract.

#### Long Message Preview

`TC-CONV-005-03` is deferred from the initial implementation sequence.

When implemented, the test must verify the documented one-line display and ellipsis behavior for a long latest-message preview. Its assertions must be based on the source test case and supported UI behavior.

---

## 3. Execution Summary

### 3.1 Current Execution Status

| Metric                             | Count |
| ---------------------------------- | ----: |
| Test Cases in Coverage Matrix      |    13 |
| Test Cases Selected for Automation |    13 |
| Test Cases Implemented             |     0 |
| Test Cases Executed                |     0 |
| Passed                             |     0 |
| Failed                             |     0 |
| Blocked                            |     0 |
| Not Executed                       |    13 |

### 3.2 Summary Notes

- The initial Conversation automation scope contains 13 selected test cases.
- No Conversation automated test has been executed.
- Selection and implementation do not constitute execution evidence.
- A failed assertion is recorded as a failed execution only after the test has actually run.
- A test that cannot run because of environment or setup problems must be recorded using the applicable blocked classification rather than being reported as passed.
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
- Authorized access to one-to-one conversations is deferred from this matrix because it overlaps with the dedicated Authorization area. The test case remains part of the overall test design.
- API-level self-conversation prevention is deferred until the supported API operation and request contract are identified. The requirement remains applicable.
- Long-message preview truncation is deferred from the initial automation sequence. Its behavior has not been verified by the selected test cases.
- Test data setup and cleanup must be repeatable and must not depend on another test having executed first.
- Timestamp assertions must follow the documented format and account for the user's local calendar date.
- Conversation ordering must be evaluated against the documented latest-activity requirement. Unspecified tie-breaking behavior must not be treated as an acceptance criterion.
- The nonexistent-conversation test verifies the documented error heading, message, and Reload button. It must not assert unspecified implementation details.
- Test execution outcomes must be supported by actual results and evidence.
- A failed assertion or unexpected observation is not automatically a confirmed defect. Defect classification must be supported by the applicable requirement or contract and the collected evidence.
- The automation scope is limited to the selected Conversation test cases. It does not imply exhaustive coverage of every behavior in the functional area.

---

## 6. Execution Records

### 6.1 Execution Record Template

Use the following template to record each automated test execution. Replace the example identifiers and fields with verified information for the actual test run.

#### TC-CONV-XXX-XX — [Test Case Title]

**Test Case Reference:** [Conversation Test Cases](../test-design/test-cases/conversation.md)

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
