# Messaging — Automation Coverage and Test Execution

## 1. Overview

This document defines the automation coverage plan and records actual test execution results for the Messaging functional area of Relay.

The Automation Coverage Matrix identifies the test cases selected for automation, their implementation order, proposed automation layers, automation decisions, and current execution status.

Execution Records document the results of test cases that have actually been executed. Test selection, implementation, and execution are distinct activities. A selected or implemented test must not be reported as executed without an actual test run and supporting evidence.

**Source documents**

- [Messaging Test Cases](../test-design/test-cases/messaging.md)
- [Messaging Scenarios](../test-design/scenarios/messaging.md)
- [Messaging Requirements](../docs/requirements/messaging.md)
- [Risk Assessment](../docs/risk-assessment.md)

---

## 2. Messaging Coverage Matrix

### 2.1 Matrix Purpose

This matrix defines the Messaging automation scope and implementation order.

Automation Order establishes the intended implementation sequence. It is separate from Source Priority and does not represent the chronological order of actual test execution.

Test Case IDs, titles, Risk Levels, and Source Priorities follow the current Messaging test-case source. Automation layers and decisions identify the intended automation approach for each case.

### 2.2 Automation Coverage

| Automation Order | Test Case ID  | Test Case Title                                                      | Risk Level | Source Priority | Automation Layer | Automation Decision | Execution Status |
| ---------------: | ------------- | -------------------------------------------------------------------- | ---------- | --------------- | ---------------- | ------------------- | ---------------- |
|                1 | TC-MSG-006-01 | Sent messages remain available after page refresh                    | High       | High            | UI               | Include             | Not Executed Yet |
|                2 | TC-MSG-006-02 | Sent messages remain available after logout and re-login             | High       | High            | UI               | Include             | Not Executed Yet |
|                3 | TC-MSG-009-01 | Message becomes available to the recipient after refresh             | High       | High            | UI               | Include             | Not Executed Yet |
|                4 | TC-MSG-001-01 | Send a valid text message within an authorized conversation          | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|                5 | TC-MSG-002-01 | Empty message input disables the Send button                         | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|                6 | TC-MSG-002-02 | Whitespace-only message input disables the Send button               | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|                7 | TC-MSG-002-03 | API rejects empty message content                                    | Medium     | Medium          | API              | Include             | Not Executed Yet |
|                8 | TC-MSG-002-04 | API rejects whitespace-only message content                          | Medium     | Medium          | API              | Include             | Not Executed Yet |
|                9 | TC-MSG-003-01 | Submitted message content preserves whitespace and line breaks       | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|               10 | TC-MSG-004-01 | Messages are displayed in chronological order                        | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|               11 | TC-MSG-005-01 | Message ordering remains consistent after page refresh               | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|               12 | TC-MSG-005-02 | Message ordering remains consistent after logout and re-login        | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|               13 | TC-MSG-005-03 | Messages with equal timestamps maintain consistent relative ordering | Medium     | Medium          | UI               | Defer               | Not Executed Yet |
|               14 | TC-MSG-007-01 | Opening a conversation scrolls to the latest message                 | Low        | Low             | UI               | Defer               | Not Executed Yet |
|               15 | TC-MSG-007-02 | Sending a message scrolls the conversation to the latest message     | Low        | Low             | UI               | Defer               | Not Executed Yet |
|               16 | TC-MSG-008-01 | Message timestamps use the documented format                         | Low        | Low             | UI               | Defer               | Not Executed Yet |
|               17 | TC-MSG-008-02 | Message date separators follow the user's local calendar date        | Low        | Low             | UI               | Defer               | Not Executed Yet |

### 2.3 Matrix Notes

- Test Case IDs, titles, Risk Levels, and Source Priorities retain their source values.
- Automation Order represents implementation order, not source priority or a record of actual execution order.
- `Include` indicates that a test case belongs to the automation scope. Additional setup or assertion requirements do not remove a case from scope.
- UI tests verify observable user-interface behavior. API tests verify behavior at the HTTP interface. Where both layers are listed, their assertions must verify the applicable contracts at each layer.
- `TC-MSG-006-01`, `TC-MSG-006-02`, and `TC-MSG-009-01` are prioritized because they verify message persistence and availability, which are associated with the High-risk message-persistence area.
- `TC-MSG-002-01` and `TC-MSG-002-02` verify UI input restrictions, while `TC-MSG-002-03` and `TC-MSG-002-04` verify API-level rejection. UI behavior alone does not establish that the API independently enforces message validation.
- `TC-MSG-005-03` is deferred because equal-timestamp ordering requires a repeatable way to establish messages with identical timestamps. The requirements do not specify the setup mechanism.
- `TC-MSG-007-01`, `TC-MSG-007-02`, `TC-MSG-008-01`, and `TC-MSG-008-02` are deferred from the initial sequence. They remain valid test cases for subsequent scrolling and timestamp coverage.
- `Not Executed Yet` means no automated execution result has been recorded for that test case.
- A test case must not be marked as passed, failed, or blocked without an actual execution attempt and a corresponding record.

### 2.4 Implementation Dependencies

#### Message Persistence and Availability

`TC-MSG-006-01`, `TC-MSG-006-02`, and `TC-MSG-009-01` require repeatable message data and access to the relevant conversation.

The implementation must verify that previously sent messages remain available after page refresh and logout/re-login. For recipient availability, the test must use two authorized participants and verify that a message sent by one participant becomes available to the recipient after the recipient refreshes the conversation.

The implementation must not assume that messages synchronize automatically across already-open conversation views. `REQ-MSG-007` explicitly requires the recipient to refresh the conversation to access newly sent messages.

#### Message Sending and Input Validation

`TC-MSG-001-01`, `TC-MSG-002-01`, `TC-MSG-002-02`, `TC-MSG-002-03`, and `TC-MSG-002-04` verify valid message submission and rejection of empty or whitespace-only content.

The UI tests must verify the documented Send button state and observable submission behavior. The API tests must verify rejection at the API layer using the supported message operation and request contract.

The requirements do not prescribe an exact HTTP status code for invalid message content. The implementation must not invent a status-code assertion or unsupported request field.

#### Message Content Preservation

`TC-MSG-003-01` verifies that the application preserves the exact message content entered by the user, including leading whitespace, trailing whitespace, repeated whitespace, and line breaks.

The implementation must use input containing the relevant whitespace conditions and compare the displayed message content with the submitted content. The assertion must verify the documented preservation requirement rather than normalizing the input before comparison.

#### Chronological Ordering and Ordering Consistency

`TC-MSG-004-01`, `TC-MSG-005-01`, and `TC-MSG-005-02` verify chronological message ordering and its consistency after refresh and logout/re-login.

The implementation must establish a conversation history with a known message order before verifying the displayed sequence. The test must compare the order of messages against the documented oldest-to-newest requirement and verify that the order remains consistent after the applicable session action.

`TC-MSG-005-03` remains deferred until a repeatable way to establish identical message timestamps is available. The requirement states that messages with identical timestamps must maintain consistent relative order, but does not specify the mechanism for producing that condition.

#### Message Scrolling

`TC-MSG-007-01` and `TC-MSG-007-02` verify automatic scrolling when a conversation is opened and when a user sends a message.

These cases are deferred from the initial implementation sequence. When implemented, assertions must verify the documented scrolling behavior for the latest message. The tests must not extend coverage to automatic scrolling caused by incoming messages, because realtime delivery and live synchronization are outside the current product scope.

#### Message Timestamps and Date Separators

`TC-MSG-008-01` and `TC-MSG-008-02` verify the documented timestamp format and date separator behavior.

These cases are deferred from the initial implementation sequence. Their implementation requires reliable message timestamps and assertions that account for the user's local calendar date. The requirements specify `HH.mm` for message timestamps and `Today`, `Yesterday`, or `DD Mmm` for date separators, as applicable.

---

## 3. Execution Summary

### 3.1 Current Execution Status

| Metric                             | Count |
| ---------------------------------- | ----: |
| Test Cases in Coverage Matrix      |    17 |
| Test Cases Selected for Automation |    17 |
| Test Cases Implemented             |     0 |
| Test Cases Executed                |     0 |
| Passed                             |     0 |
| Failed                             |     0 |
| Blocked                            |     0 |
| Not Executed                       |    17 |

### 3.2 Summary Notes

- The Messaging automation scope contains 17 selected test cases.
- No Messaging automated test has been executed.
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
- Test data setup and cleanup must be repeatable and must not depend on another test having executed first.
- Message persistence and recipient availability require reliable identification of the messages and conversations used during each execution.
- API-level message validation must be verified directly at the API layer. A UI-only result does not independently prove server-side enforcement.
- The API contract must be identified before implementing API assertions. Exact HTTP status codes and unsupported request details must not be invented.
- Message content preservation must be verified against the exact submitted content, including whitespace and line breaks.
- Message ordering must be assessed against the documented chronological-order requirement. Equal-timestamp coverage remains deferred until a repeatable setup strategy is identified.
- Message scrolling and timestamp/date-separator behavior remain deferred from the initial automation scope. Their selection status does not imply that these behaviors have been verified.
- The current product scope excludes realtime message delivery and live synchronization across already-open conversation views. Tests must not assert that newly sent messages appear automatically in another participant's open conversation.
- Test execution outcomes must be supported by actual results and evidence.
- A failed assertion or unexpected observation is not automatically a confirmed defect. Defect classification must be supported by the applicable requirement or contract and the collected evidence.
- The automation scope is limited to the selected Messaging test cases. It does not imply exhaustive coverage of every behavior in the functional area.

---

## 6. Execution Records

### 6.1 Execution Record Template

Use the following template to record each automated test execution. Replace the example identifiers and fields with verified information for the actual test run.

#### TC-MSG-XXX-XX — [Test Case Title]

**Test Case Reference:** [Messaging Test Cases](../test-design/test-cases/messaging.md)

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
