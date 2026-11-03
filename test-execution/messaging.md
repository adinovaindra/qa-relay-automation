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

| Automation Order | Test Case ID  | Test Case Title                                                                                             | Risk Level | Source Priority | Automation Layer | Automation Decision | Execution Status |
| ---------------: | ------------- | ----------------------------------------------------------------------------------------------------------- | ---------- | --------------- | ---------------- | ------------------- | ---------------- |
|                1 | TC-MSG-006-01 | Sent messages remain available and correctly ordered after page refresh                                     | High       | High            | UI               | Include             | Passed           |
|                2 | TC-MSG-006-02 | Sent messages remain available and correctly ordered after logout and re-login                              | High       | High            | UI               | Include             | Not Executed Yet |
|                3 | TC-MSG-009-01 | A message sent by one participant becomes available to the recipient after refresh                          | High       | High            | UI               | Include             | Not Executed Yet |
|                4 | TC-MSG-001-01 | Send a valid text message within an authorized conversation                                                 | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|                5 | TC-MSG-002-01 | Empty and whitespace-only message input disables the Send button                                            | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|                6 | TC-MSG-002-02 | API rejects empty and whitespace-only message content                                                       | Medium     | Medium          | API              | Include             | Not Executed Yet |
|                7 | TC-MSG-003-01 | Submitted message content preserves whitespace and line breaks                                              | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|                8 | TC-MSG-004-01 | Messages are displayed in chronological order                                                               | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|                9 | TC-MSG-005-01 | Messages with equal timestamps maintain consistent relative ordering across users, refreshes, and re-logins | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|               10 | TC-MSG-007-01 | Opening a conversation scrolls to the latest message                                                        | Low        | Low             | UI               | Include             | Not Executed Yet |
|               11 | TC-MSG-007-02 | Sending a message scrolls the conversation to the latest message                                            | Low        | Low             | UI               | Include             | Not Executed Yet |
|               12 | TC-MSG-008-01 | Message timestamps are displayed according to the user's locale and time zone                               | Low        | Low             | UI               | Include             | Not Executed Yet |
|               13 | TC-MSG-008-02 | Message date separators follow the user's local calendar date                                               | Low        | Low             | UI               | Include             | Not Executed Yet |

### 2.3 Matrix Notes

- Test Case IDs, titles, Risk Levels, and Source Priorities retain their values from the current Messaging test-case source.
- Automation Order represents the intended implementation sequence, not source priority or the chronological order of actual test execution.
- `Include` identifies test cases in the initial automation scope. `Defer` postpones implementation beyond the initial sequence; deferred cases remain valid test cases for subsequent coverage.
- UI tests verify observable user-interface behavior. API tests verify behavior at the HTTP interface. The automation layer must match the behavior and contract being verified.
- `TC-MSG-006-01`, `TC-MSG-006-02`, and `TC-MSG-009-01` are prioritized because they verify message persistence and recipient availability, which are associated with the High-risk message-persistence area.
- `TC-MSG-002-01` verifies UI restrictions for empty and whitespace-only input. `TC-MSG-002-02` verifies API rejection for the same categories of invalid content. UI behavior alone does not establish that the API independently enforces message validation.
- `TC-MSG-005-01` is deferred because equal-timestamp ordering requires a repeatable way to establish messages with identical timestamps. The requirement does not specify the setup mechanism.
- `TC-MSG-007-01`, `TC-MSG-007-02`, `TC-MSG-008-01`, and `TC-MSG-008-02` are deferred from the initial sequence. They remain valid test cases for subsequent scrolling and timestamp/date-separator coverage.
- `Not Executed Yet` means no automated execution result has been recorded for that test case.
- A test case must not be marked as passed, failed, or blocked without an actual execution attempt and a corresponding record.

### 2.4 Implementation Dependencies

#### Message Persistence and Availability

`TC-MSG-006-01`, `TC-MSG-006-02`, and `TC-MSG-009-01` require repeatable message data and access to the relevant conversation.

The implementation must verify that previously sent messages remain available and correctly ordered after page refresh and logout/re-login. For recipient availability, the test must use two authorized participants and verify that a message sent by one participant becomes available to the recipient after the recipient refreshes the conversation.

The implementation must not assume that messages synchronize automatically across already-open conversation views. `REQ-MSG-007` requires the recipient to refresh the conversation to access newly sent messages.

#### Message Sending and Input Validation

`TC-MSG-001-01`, `TC-MSG-002-01`, and `TC-MSG-002-02` verify valid message submission and rejection of empty or whitespace-only content.

`TC-MSG-002-01` verifies the Send button state and observable UI submission behavior for the specified empty and whitespace-only input variations. `TC-MSG-002-02` verifies rejection at the API layer using the documented message operation and request contract.

The requirements do not prescribe an exact HTTP status code or error response structure for invalid message content. The implementation must not invent either assertion or unsupported request fields.

#### Message Content Preservation

`TC-MSG-003-01` verifies that the application preserves the exact message content entered by the user, including leading whitespace, trailing whitespace, repeated whitespace, and line breaks.

The implementation must use input containing the relevant whitespace conditions and compare the displayed message content with the submitted content. The assertion must verify the documented preservation requirement rather than normalizing the input before comparison.

#### Chronological Ordering and Ordering Consistency

`TC-MSG-004-01`, `TC-MSG-005-01`, `TC-MSG-006-01`, and `TC-MSG-006-02` cover chronological ordering under different conditions.

`TC-MSG-004-01` verifies the normal oldest-to-newest display order. `TC-MSG-006-01` and `TC-MSG-006-02` verify that message availability and ordering remain correct after refresh and logout/re-login, respectively. These cases must establish a conversation history with a known message order before comparing the displayed sequence.

`TC-MSG-005-01` separately verifies stable relative ordering when messages have identical timestamps across users, refreshes, and re-logins. It remains deferred until a repeatable way to establish identical message timestamps is available.

#### Message Scrolling

`TC-MSG-007-01` and `TC-MSG-007-02` verify automatic scrolling when a conversation is opened and when a user sends a message.

These cases are deferred from the initial implementation sequence. When implemented, assertions must verify the documented scrolling behavior for the latest message. The tests must not extend coverage to automatic scrolling caused by incoming messages, because realtime delivery and live synchronization are outside the current product scope.

#### Message Timestamps and Date Separators

`TC-MSG-008-01` verifies that each message timestamp accurately represents the message creation time and is displayed according to the locale and time zone settings applicable to the user's browser or operating system. The requirement does not prescribe a specific time separator or a 12-hour versus 24-hour clock format.

`TC-MSG-008-02` verifies that date separators use `Today`, `Yesterday`, or `DD Mmm` according to the user's local calendar date, rather than elapsed time alone.

Both cases are deferred from the initial implementation sequence. Their implementation requires reliable message timestamps and assertions that account for the applicable local time zone and calendar date.

---

## 3. Execution Summary

### 3.1 Current Execution Status

| Metric                             | Count |
| ---------------------------------- | ----: |
| Test Cases in Coverage Matrix      |    13 |
| Test Cases Selected for Automation |    13 |
| Test Cases Implemented             |     1 |
| Test Cases Executed                |     1 |
| Passed                             |     1 |
| Failed                             |     0 |
| Blocked                            |     0 |
| Not Executed                       |    12 |

### 3.2 Summary Notes

- The Messaging automation coverage matrix contains 13 test cases. Eight are marked `Include` in the initial automation scope, and five are marked `Defer` for subsequent implementation.
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
- 13 test cases are included in the initial automation scope.
- Test data setup and cleanup must be repeatable and must not depend on another test having executed first.
- Message persistence and recipient availability require reliable identification of the messages and conversations used during each execution.
- API-level message validation must be verified directly at the API layer. A UI-only result does not independently prove server-side enforcement.
- The API contract must be identified before implementing API assertions. Exact HTTP status codes, error response structures, and unsupported request details must not be invented.
- Message content preservation must be verified against the exact submitted content, including whitespace and line breaks.
- Normal chronological ordering and equal-timestamp ordering are separate coverage concerns. Equal-timestamp coverage remains deferred until a repeatable setup strategy is identified.
- Message scrolling and timestamp/date-separator behavior remain deferred from the initial automation sequence. Their selection status does not imply that these behaviors have been verified.
- Message timestamps must be assessed against the user's applicable browser/operating-system locale and time zone. The requirement does not prescribe a specific time separator or 12-hour/24-hour format.
- Date separators must be assessed against the user's local calendar date, using the documented `Today`, `Yesterday`, or `DD Mmm` labels as applicable.
- The current product scope excludes realtime message delivery and live synchronization across already-open conversation views. Tests must not assert that newly sent messages appear automatically in another participant's open conversation.
- Test execution outcomes must be supported by actual results and evidence.
- A failed assertion or unexpected observation is not automatically a confirmed defect. Defect classification must be supported by the applicable requirement or contract and the collected evidence.
- The automation scope is limited to the selected Messaging test cases. It does not imply exhaustive coverage of every behavior in the functional area.

---

## 6. Execution Records

### 6.2 TC-MSG-006-01 — Sent messages remain available and correctly ordered after page refresh

**Test Case Reference:** [TC-MSG-006-01](../test-design/test-cases/messaging.md#tc-msg-006-01--sent-messages-remain-available-and-correctly-ordered-after-page-refresh)
**Scenario Reference:** SCN-MSG-005 [SCN-MSG-005](../test-design/scenarios/messaging.md#scn-msg-005--message-ordering-consistency-across-refresh-and-re-login), SCN-MSG-006 [SCN-MSG-006](../test-design/scenarios/messaging.md#scn-msg-006--message-persistence)
**Requirement Reference:** REQ-MSG-002 [REQ-MSG-002](../docs/requirements/messaging.md#req-msg-002--message-ordering), REQ-MSG-003 [REQ-MSG-003](../docs/requirements/messaging.md#req-msg-003--message-persistence)
**Risk Reference:** RSK-004 [Risk Register List](../docs/risk-assessment.md#3-risk-register), RSK-008 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
**Execution Date:** 2026-11-04

**Environment**

- Application URL: http://localhost:3000
- Browser / Project: Chromium
- Browser Version: 156.0.8078.4 (Official Build) (64-bit)
- Operating System: Windows 11 Pro 25H2
- Execution Mode: Headed
- Workers: 1
- Test Run / Commit Reference: Local execution; two consecutive executions using `--repeat-each=2`.

**Preconditions**

- Relay application is accessible.
- The QA database is available.
- Alice (`alice@example.com`) and Bob (`bob@example.com`) are prepared as registered test users through the database setup helper.
- Any existing conversation between Alice and Bob is removed before setup through `deleteTestConversationBetweenUsers()`.
- A conversation between Alice and Bob is created through the database setup helper.
- Two messages are inserted into the conversation through the database setup helper in a known order before UI execution.
- Alice's valid credentials are available.

**Expected Result**

- All previously recorded messages and the newly sent message remain available after refresh.
- Message content remains unchanged.
- Messages remain associated with the correct conversation.
- Chronological relative ordering remains consistent after refresh, with older messages above newer messages.

**Actual Result**

- The test prepared Alice and Bob as registered test users and created a conversation between them.
- Two messages were inserted into the conversation through the database setup helper in a known order.
- Alice successfully signed in through the UI and opened the conversation with Bob.
- Alice sent a third message through the message input.
- The three messages were displayed in the expected chronological order before page refresh.
- After `page.reload()`, all three messages remained available and were displayed in the same expected order.
- All Playwright assertions passed in both repeated headed Chromium executions.
- The test's final cleanup completed; no cleanup error was reported.

**Execution Result:** PASS

**Evidence**

- Playwright terminal result: `2 passed (25.6s)` using `--repeat-each=2`.
- Playwright HTML report generated locally for the execution.

**Defect Reference:** None confirmed.

**Execution Notes**

- A browser-console hydration error was observed during both repeated executions. The server-rendered conversation timestamp (`23.53`) differed from the client-rendered timestamp (`11:53 PM`), and the hydration error stack referenced `ConversationList` in `src/app/chat/page.tsx:53`. This observation did not cause any assertion in this test to fail and is recorded separately from the test result.
- A React warning about encountering a script tag while rendering a component was also observed. Its cause and impact were not established during this execution; it is retained as a technical observation, not a confirmed defect.
- These observations do not change the PASS result for the acceptance criteria exercised by this test. Timestamp/locale behavior remains within the separately deferred `TC-MSG-008-01` scope and has not been formally executed by this record.
