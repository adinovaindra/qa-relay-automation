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
|                2 | TC-MSG-006-02 | Sent messages remain available and correctly ordered after logout and re-login                              | High       | High            | UI               | Include             | Passed           |
|                3 | TC-MSG-009-01 | A message sent by one participant becomes available to the recipient after refresh                          | High       | High            | UI               | Include             | Passed           |
|                4 | TC-MSG-001-01 | Send a valid text message within an authorized conversation                                                 | Medium     | Medium          | UI               | Include             | Passed           |
|                5 | TC-MSG-002-01 | Empty and whitespace-only message input disables the Send button                                            | Medium     | Medium          | UI               | Include             | Passed           |
|                6 | TC-MSG-002-02 | API rejects empty and whitespace-only message content                                                       | Medium     | Medium          | API              | Include             | Passed           |
|                7 | TC-MSG-003-01 | Submitted message content trims outer whitespace while preserving internal whitespace and line breaks       | Medium     | Medium          | UI               | Include             | Passed           |
|                8 | TC-MSG-004-01 | Messages are displayed in chronological order                                                               | Medium     | Medium          | UI               | Include             | Passed           |
|                9 | TC-MSG-005-01 | Messages with equal timestamps maintain consistent relative ordering across users, refreshes, and re-logins | Medium     | Medium          | UI               | Include             | Passed           |
|               10 | TC-MSG-007-01 | Opening a conversation scrolls to the latest message                                                        | Low        | Low             | UI               | Include             | Passed           |
|               11 | TC-MSG-007-02 | Sending a message scrolls the conversation to the latest message                                            | Low        | Low             | UI               | Include             | Passed           |
|               12 | TC-MSG-008-01 | Message timestamps are displayed according to the user's locale and time zone                               | Low        | Low             | UI               | Include             | Passed           |
|               13 | TC-MSG-008-02 | Message date separators follow the user's local calendar date                                               | Low        | Low             | UI               | Include             | Passed           |

### 2.3 Matrix Notes

- Test Case IDs, titles, Risk Levels, and Source Priorities retain their values from the current Messaging test-case source.
- Automation Order represents the intended implementation sequence, not source priority or the chronological order of actual test execution.
- UI tests verify observable user-interface behavior. API tests verify behavior at the HTTP interface. The automation layer must match the behavior and contract being verified.
- `TC-MSG-006-01`, `TC-MSG-006-02`, and `TC-MSG-009-01` are prioritized because they verify message persistence and recipient availability, which are associated with the High-risk message-persistence area.
- `TC-MSG-002-01` verifies UI restrictions for empty and whitespace-only input. `TC-MSG-002-02` verifies API rejection for the same categories of invalid content. UI behavior alone does not establish that the API independently enforces message validation.
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

#### Message Content Normalization and Preservation

`TC-MSG-003-01` verifies that the application trims leading and trailing whitespace from submitted message content while preserving internal whitespace, repeated spaces, and line breaks.

The implementation must compare the message content displayed in the UI against the expected normalized content for each test-data variation. Verification of persisted message content is outside the scope of this test case.

#### Chronological Ordering and Ordering Consistency

`TC-MSG-004-01`, `TC-MSG-005-01`, `TC-MSG-006-01`, and `TC-MSG-006-02` cover chronological ordering under different conditions.

`TC-MSG-004-01` verifies the normal oldest-to-newest display order. `TC-MSG-006-01` and `TC-MSG-006-02` verify that message availability and ordering remain correct after refresh and logout/re-login, respectively. These cases must establish a conversation history with a known message order before comparing the displayed sequence.

`TC-MSG-005-01` separately verifies stable relative ordering when messages have identical timestamps across users, refreshes, and re-logins. It has not yet been implemented because a repeatable way to establish identical message timestamps is still required.

#### Message Scrolling

`TC-MSG-007-01` and `TC-MSG-007-02` verify automatic scrolling when a conversation is opened and when a user sends a message. When implemented, assertions must verify the documented scrolling behavior for the latest message. The tests must not extend coverage to automatic scrolling caused by incoming messages, because realtime delivery and live synchronization are outside the current product scope.

#### Message Timestamps and Date Separators

`TC-MSG-008-01` verifies that each message timestamp accurately represents the message creation time and is displayed according to the locale and time zone settings applicable to the user's browser or operating system. The requirement does not prescribe a specific time separator or a 12-hour versus 24-hour clock format.

`TC-MSG-008-02` verifies that date separators use `Today`, `Yesterday`, or `DD Mmm` according to the user's local calendar date, rather than elapsed time alone.

Their implementation requires reliable message timestamps and assertions that account for the applicable local time zone and calendar date.

---

## 3. Execution Summary

### 3.1 Current Execution Status

| Metric                             | Count |
| ---------------------------------- | ----: |
| Test Cases in Coverage Matrix      |    13 |
| Test Cases Selected for Automation |    13 |
| Test Cases Implemented             |    13 |
| Test Cases Executed                |    13 |
| Passed                             |    13 |
| Failed                             |     0 |
| Blocked                            |     0 |
| Not Executed                       |     0 |

### 3.2 Summary Notes

- The Messaging automation coverage matrix contains 13 test cases.
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
- Message content normalization must be verified by checking that leading and trailing whitespace are trimmed while internal whitespace and line breaks are preserved. `TC-MSG-003-01` verifies the displayed content through the UI; persistence verification is covered separately.
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

#### TC-MSG-006-01 — Sent messages remain available and correctly ordered after page refresh

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

#### TC-MSG-006-02 — Sent messages remain available and correctly ordered after logout and re-login

**Test Case Reference:** [TC-MSG-006-02](../test-design/test-cases/messaging.md#tc-msg-006-02--sent-messages-remain-available-and-correctly-ordered-after-logout-and-re-login)
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

- All previously recorded messages and the newly sent message remain available after re-login.
- Message content remains unchanged.
- Messages remain associated with the correct conversation.
- Chronological relative ordering remains consistent after re-login, with older messages above newer messages.

**Actual Result**

- The test prepared Alice and Bob as registered test users and created a conversation between them.
- Two messages were inserted into the conversation through the database setup helper in a known order.
- Alice successfully signed in through the UI and opened the conversation with Bob.
- The two initial messages were displayed in the expected chronological order.
- Alice sent a third message through the message input.
- All three messages were displayed in the expected chronological order before logout.
- Alice successfully logged out and was redirected to the login page.
- Alice successfully signed in again using the same credentials.
- After reopening the conversation with Bob, all three messages remained available and were displayed in the same expected order.
- All Playwright assertions passed in both repeated headed Chromium executions.
- The test's final cleanup completed; no cleanup error was reported.

**Execution Result:** PASS

**Evidence**

- Playwright terminal result: `2 passed (1.6m)` using `--repeat-each=2`.
- Playwright HTML report generated locally for the execution.

**Defect Reference:** None confirmed.

#### TC-MSG-009-01 — A message sent by one participant becomes available to the recipient after refresh

**Test Case Reference:** [TC-MSG-009-01](../test-design/test-cases/messaging.md#tc-msg-009-01--a-message-sent-by-one-participant-becomes-available-to-the-recipient-after-refresh)
**Scenario Reference:** SCN-MSG-009 [SCN-MSG-009](../test-design/scenarios/messaging.md#scn-msg-009--message-availability-across-authenticated-sessions)
**Requirement Reference:** REQ-MSG-007 [REQ-MSG-007](../docs/requirements/messaging.md#req-msg-007--message-availability-across-participants)
**Risk Reference:** RSK-004 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
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
- Alice's and Bob's valid credentials are available.

**Expected Result**

- Both participants can access the same conversation through independent authenticated browser contexts.
- A message sent by Alice becomes available in Alice's conversation.
- The newly sent message is not automatically displayed in Bob's already-open conversation before refresh.
- After Bob refreshes the conversation, the newly sent message becomes available.
- The message content remains unchanged and appears in the correct chronological order relative to previously recorded messages.

**Actual Result**

- The test prepared Alice and Bob as registered test users and created a shared conversation.
- Two initial messages were inserted into the conversation through the database setup helper in a known order.
- Bob successfully signed in through an independent browser context and opened the conversation with Alice.
- Bob's conversation initially displayed the two expected messages in chronological order.
- Alice successfully signed in through a separate independent browser context and opened the same conversation with Bob.
- Alice sent a new message through the message input.
- The newly sent message became available in Alice's conversation.
- Bob's already-open conversation continued to display only the two initial messages before refresh.
- After Bob refreshed the conversation, all three messages became available and were displayed in the expected chronological order.
- All Playwright assertions passed in both repeated headed Chromium executions.
- The test's final cleanup completed; no cleanup error was reported.

**Execution Result:** PASS

**Evidence**

- QA Safety Guard output: `Passed: local PostgreSQL, database relay_qa_automation, role relay_test_user.`
- Playwright terminal result: `2 passed (26.5s)` using `--repeat-each=2`.
- Playwright HTML report generated locally for the execution.

**Defect Reference:** None confirmed.

**Execution Notes**

- A browser-console hydration error was observed during both repeated executions.
- The server-rendered conversation timestamp (`11.02`) differed from the client-rendered timestamp (`11:02 AM`).
- The hydration error stack referenced `ConversationList` in `src/app/chat/page.tsx:53`.
- A React warning about encountering a script tag while rendering a component was also observed.
- The cause and impact of the script tag warning were not established during this execution.
- These technical observations did not cause any assertion in this test to fail and do not change its PASS result.
- The hydration mismatch is recorded as a recurring technical observation, separate from the functional acceptance criteria exercised by this test.

#### TC-MSG-001-01 — Send a valid text message within an authorized conversation

**Test Case Reference:** [TC-MSG-001-01](../test-design/test-cases/messaging.md#tc-msg-001-01--send-a-valid-text-message-within-an-authorized-conversation)
**Scenario Reference:** SCN-MSG-001 [SCN-MSG-001](../test-design/scenarios/messaging.md#scn-msg-001--send-text-message)
**Requirement Reference:** REQ-MSG-001 [REQ-MSG-001](../docs/requirements/messaging.md#req-msg-001--message-sending-and-validation)
**Risk Reference:** RSK-020 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
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
- Alice's valid credentials are available.

**Expected Result**

- The message is submitted successfully.
- The message appears in the conversation after sending.
- The displayed message content matches the submitted content.
- The message appears in the conversation in which it was sent.

**Actual Result**

- The test prepared Alice and Bob as registered test users and created a conversation between them.
- Alice successfully signed in through the UI and opened the conversation with Bob.
- Alice entered and submitted the valid text message: `Hello Bob!`
- The submitted message appeared in the conversation.
- The displayed message content matched the submitted content exactly.
- All Playwright assertions passed in both repeated headed Chromium executions.
- The test's final cleanup completed; no cleanup error was reported.

**Execution Result:** PASS

**Evidence**

- QA Safety Guard result: Passed for local PostgreSQL, database `relay_qa_automation`, and role `relay_test_user`.
- Playwright terminal result: `2 passed (19.1s)` using `--repeat-each=2`.
- Playwright HTML report generated locally for the execution.

**Defect Reference:** None confirmed.

#### TC-MSG-002-01 — Empty and whitespace-only message input disables the Send button

**Test Case Reference:** [TC-MSG-002-01](../test-design/test-cases/messaging.md#tc-msg-002-01--empty-and-whitespace-only-message-input-disables-the-send-button)
**Scenario Reference:** SCN-MSG-002 [SCN-MSG-002](../test-design/scenarios/messaging.md#scn-msg-002--empty-and-whitespace-only-message-validation)
**Requirement Reference:** REQ-MSG-001 [REQ-MSG-001](../docs/requirements/messaging.md#req-msg-001--message-sending-and-validation), REQ-MSG-006 [REQ-MSG-006](../docs/requirements/messaging.md#req-msg-006--empty-message-input-handling)
**Risk Reference:** RSK-012 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
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
- Alice's valid credentials are available.

**Expected Result**

- The Send button is disabled when the input is empty or contains only whitespace.
- The UI prevents submission of empty and whitespace-only content through the tested keyboard interaction.
- No message is added to the conversation for any invalid input variation.

**Actual Result**

- The test prepared Alice and Bob as registered test users and created a conversation between them.
- Alice successfully signed in through the UI and opened the conversation with Bob.
- Three invalid input variations were tested:
  - Empty string (`""`).
  - Spaces only (`"   "`).
  - Tabs and line breaks only (`"\t\n"`).
- The Send button remained disabled for all three input variations.
- Pressing Enter did not submit any invalid message.
- The conversation remained empty throughout all three variations.
- All Playwright assertions passed in both repeated headed Chromium executions.
- The test's final cleanup completed; no cleanup error was reported.

**Execution Result:** PASS

**Evidence**

- QA Safety Guard result: Passed for local PostgreSQL, database `relay_qa_automation`, and role `relay_test_user`.
- Playwright terminal result: `2 passed (18.3s)` using `--repeat-each=2`.
- Playwright HTML report generated locally for the execution.

**Defect Reference:** None confirmed.

#### TC-MSG-002-02 — API rejects empty and whitespace-only message content

**Test Case Reference:** [TC-MSG-002-02](../test-design/test-cases/messaging.md#tc-msg-002-02--api-rejects-empty-and-whitespace-only-message-content)
**Scenario Reference:** SCN-MSG-002 [SCN-MSG-002](../test-design/scenarios/messaging.md#scn-msg-002--empty-and-whitespace-only-message-validation)
**Requirement Reference:** REQ-MSG-001 [Messaging Requirements](../docs/requirements/messaging.md#req-msg-001--message-sending-and-validation)
**Risk Reference:** RSK-020 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
**Execution Date:** 2026-11-04

**Environment**

- Application URL: http://localhost:3000
- Test Runner: Playwright
- Test Type: API / Negative
- API Request Fixture: `request`
- Project: Chromium
- Workers: 1
- Test Run / Commit Reference: Local execution; two consecutive executions using `--repeat-each=2`.

**Preconditions**

- Relay application is accessible.
- The QA database is available.
- Alice (`alice@example.com`) and Bob (`bob@example.com`) are prepared as registered test users through the database setup helper.
- Any existing conversation between Alice and Bob is removed before setup through `deleteTestConversationBetweenUsers()`.
- A conversation between Alice and Bob is created through the database setup helper.
- Alice's valid credentials are available for API authentication.

**Expected Result**

- The API rejects empty and whitespace-only message content for all tested variations.
- No empty or whitespace-only message is created or added to the conversation.
- The test does not assume a specific HTTP status code or error response structure beyond the documented API contract.

**Actual Result**

- The test prepared Alice and Bob as registered test users and created a conversation between them.
- Alice successfully authenticated through the API login endpoint.
- Three invalid message-content variations were submitted to the message-creation endpoint:
  - Empty string (`""`).
  - Spaces only (`"   "`).
  - Tabs and line breaks only (`"\t\n"`).
- The API returned a non-successful HTTP response for all three invalid requests.
- After each request, the conversation history endpoint returned a successful response.
- The conversation history contained zero messages after each invalid submission attempt.
- All Playwright assertions passed in both repeated executions.
- No cleanup error was reported.

**Execution Result:** PASS

**Evidence**

- QA Safety Guard result: Passed for local PostgreSQL, database `relay_qa_automation`, and role `relay_test_user`.
- Playwright terminal result: `2 passed (11.5s)` using `--repeat-each=2`.
- Playwright HTML report generated locally for the execution.

**Defect Reference:** None confirmed.

#### TC-MSG-003-01 — Submitted message content trims outer whitespace while preserving internal whitespace and line breaks

**Test Case Reference:** [TC-MSG-003-01](../test-design/test-cases/messaging.md#tc-msg-003-01--submitted-message-content-trims-outer-whitespace-while-preserving-internal-whitespace-and-line-breaks)
**Scenario Reference:** SCN-MSG-003 [SCN-MSG-003](../test-design/scenarios/messaging.md#scn-msg-003--message-whitespace-handling)
**Requirement Reference:** REQ-MSG-001 [REQ-MSG-001](../docs/requirements/messaging.md#req-msg-001--message-sending-and-validation)
**Risk Reference:** RSK-020 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
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
- Alice's valid credentials are available.

**Expected Result**

- Leading whitespace is trimmed from submitted message content.
- Trailing whitespace is trimmed from submitted message content.
- Repeated internal whitespace is preserved.
- Line breaks within submitted message content are preserved.
- Whitespace within the message that is not at the beginning or end of the overall content is preserved.
- Content containing both non-whitespace and whitespace characters is accepted.
- Content containing non-whitespace characters is not treated as whitespace-only.
- The displayed message content matches the expected normalized content for every tested variation.

**Actual Result**

- The test prepared Alice and Bob as registered test users and created a conversation between them.
- Alice successfully signed in through the UI and opened the conversation with Bob.
- Five message-content variations were submitted separately through the message input:
  - Leading whitespace: `  Hello` was displayed as `Hello`.
  - Trailing whitespace: `Hello  ` was displayed as `Hello`.
  - Repeated internal whitespace: `Hello   world` was displayed as `Hello   world`.
  - Line break: `Hello\nworld` was displayed with the line break preserved.
  - Mixed content: `  Hello   world\n  Again  ` was displayed as `Hello   world\n  Again`.
- The displayed content matched the expected normalized content for all five variations.
- All Playwright assertions passed in both repeated headed Chromium executions.
- The test's final cleanup completed without a reported cleanup error.

**Execution Result:** PASS

**Evidence**

- Playwright terminal result: `2 passed (30.3s)` using `--repeat-each=2`.
- Playwright HTML report generated locally for the execution.

**Defect Reference:** None confirmed.

#### TC-MSG-004-01 — Messages are displayed in chronological order

**Test Case Reference:** [TC-MSG-004-01](../test-design/test-cases/messaging.md#tc-msg-004-01--messages-are-displayed-in-chronological-order)
**Scenario Reference:** SCN-MSG-004 [SCN-MSG-004](../test-design/scenarios/messaging.md#scn-msg-004--chronological-message-ordering)
**Requirement Reference:** REQ-MSG-002 [REQ-MSG-002](../docs/requirements/messaging.md#req-msg-002--message-ordering)
**Risk Reference:** RSK-008 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
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
- A new conversation between Alice and Bob is created through the database setup helper.
- Three distinguishable messages are inserted into the conversation through the database setup helper in a known chronological sequence.
- Alice's valid credentials are available.

**Expected Result**

- The oldest selected message appears above the newer selected messages.
- The newest selected message appears below the older selected messages.
- Messages are displayed in chronological order.
- Displayed timestamp text does not determine message ordering.

**Actual Result**

- The test prepared Alice and Bob as registered test users and created a new conversation between them.
- Three messages were inserted into the conversation in a known chronological sequence:
  - First message: `Hi Bob!`
  - Second message: `How are you?`
  - Third message: `I hope you are doing well.`
- A short delay was introduced between message creation to establish distinct creation times.
- Alice successfully signed in through the UI and opened the conversation with Bob.
- The three messages appeared in the conversation in the expected chronological order.
- The displayed message sequence matched the known creation sequence.
- All Playwright assertions passed in both repeated headed Chromium executions.
- The test's final cleanup completed without a reported cleanup error.

**Execution Result:** PASS

**Evidence**

- QA Safety Guard: Passed for local PostgreSQL, database `relay_qa_automation`, role `relay_test_user`.
- Playwright terminal result: `2 passed (19.5s)` using `--repeat-each=2`.
- Playwright HTML report generated locally for the execution.

**Defect Reference:** None confirmed.

#### TC-MSG-005-01 — Messages with equal timestamps maintain consistent relative ordering across users, refreshes, and re-logins

**Test Case Reference:** [TC-MSG-005-01](../test-design/test-cases/messaging.md#tc-msg-005-01--messages-with-equal-timestamps-maintain-consistent-relative-ordering-across-users-refreshes-and-re-logins)
**Scenario Reference:** SCN-MSG-005 [SCN-MSG-005](../test-design/scenarios/messaging.md#scn-msg-005--equal-timestamp-message-ordering)
**Requirement Reference:** REQ-MSG-002 [REQ-MSG-002](../docs/requirements/messaging.md#req-msg-002--message-ordering)
**Risk Reference:** RSK-009 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
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
- A new conversation between Alice and Bob is created through the database setup helper.
- Three distinguishable messages are inserted into the conversation by Alice using the same timestamp.
- The timestamp equality precondition is verified through `verifyMessagesHaveEqualTimestamps()`.
- Alice's and Bob's valid credentials are available.

**Expected Result**

- Messages with identical timestamps are displayed in a consistent relative order.
- The relative order remains consistent after application refresh.
- The relative order remains consistent after Alice logs out and logs in again.
- Bob sees the same relative message order when accessing the conversation through an independent browser context.

**Actual Result**

- The test prepared Alice and Bob as registered test users and created a new conversation between them.
- Three distinguishable messages were inserted into the conversation by Alice using an identical timestamp.
- The timestamp equality precondition was successfully verified before evaluating message ordering.
- Alice successfully signed in and opened the conversation with Bob.
- The initial relative message order displayed in Alice's UI was captured as the baseline.
- All three expected messages were displayed.
- The displayed relative order remained consistent after Alice refreshed the conversation.
- The displayed relative order remained consistent after Alice logged out and signed in again.
- Bob successfully signed in through an independent browser context and opened the same conversation.
- Bob's UI displayed the same relative message order as the initial baseline.
- All Playwright assertions passed in both repeated headed Chromium executions.
- The test's final cleanup completed without a reported cleanup error.

**Execution Result:** PASS

**Evidence**

- QA Safety Guard: Passed for local PostgreSQL, database `relay_qa_automation`, role `relay_test_user`.
- Playwright terminal result: `2 passed (32.8s)` using `--repeat-each=2`.
- Playwright HTML report generated locally for the execution.

**Defect Reference:** None confirmed.

#### TC-MSG-007-01 — Opening a conversation scrolls to the latest message

**Test Case Reference:** [TC-MSG-007-01](../test-design/test-cases/messaging.md#tc-msg-007-01--opening-a-conversation-scrolls-to-the-latest-message)
**Scenario Reference:** SCN-MSG-007 [SCN-MSG-007](../test-design/scenarios/messaging.md#scn-msg-007--automatic-message-scrolling)
**Requirement Reference:** REQ-MSG-004 [REQ-MSG-004](../docs/requirements/messaging.md#req-msg-004--message-history-scrolling-behavior)
**Risk Reference:** RSK-017 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
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
- The conversation is populated with 30 messages to ensure that the message container is scrollable.
- Alice's valid credentials are available.

**Expected Result**

- The conversation automatically scrolls to the latest message when opened.
- The message container is positioned at the bottom of the conversation history.
- The latest message is visible without requiring the user to scroll manually to the bottom.

**Actual Result**

- The test prepared Alice and Bob as registered test users and created a conversation between them.
- The conversation was populated with 30 messages in chronological order.
- Alice successfully signed in through the UI and opened the conversation with Bob.
- The message container was confirmed to be scrollable.
- All 30 seeded messages were displayed in the expected order.
- The latest message was fully visible within the message container after the conversation was opened.
- All Playwright assertions passed in both repeated headed Chromium executions.
- The test's final cleanup completed without a reported cleanup error.

**Execution Result:** PASS

**Evidence**

- QA Safety Guard result: Passed for local PostgreSQL, database `relay_qa_automation`, and role `relay_test_user`.
- Playwright terminal result: `2 passed (19.7s)` using `--repeat-each=2`.
- Playwright HTML report generated locally for the execution.

**Defect Reference:** None confirmed.

#### TC-MSG-007-02 — Sending a message scrolls the conversation to the latest message

**Test Case Reference:** [TC-MSG-007-02](../test-design/test-cases/messaging.md#tc-msg-007-02)
**Scenario Reference:** SCN-MSG-007 [SCN-MSG-007](../test-design/scenarios/messaging.md#scn-msg-007--automatic-message-scrolling)
**Requirement Reference:** REQ-MSG-004 [REQ-MSG-004](../docs/requirements/messaging.md#req-msg-004--message-history-scrolling-behavior)
**Risk Reference:** RSK-017 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
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
- Any existing conversation between Alice and Bob is removed before setup.
- A conversation between Alice and Bob is created through the database setup helper.
- The conversation is populated with 30 messages in chronological order.
- Alice's valid credentials are available.

**Expected Result**

- The conversation automatically scrolls to the latest message when a new message is sent.
- The newly sent message is displayed as the latest message.
- The latest message is fully visible without requiring the user to scroll manually.

**Actual Result**

- Alice successfully signed in and opened the conversation with Bob.
- The message container was confirmed to be scrollable.
- All 30 seeded messages were displayed in the expected order.
- The message container was moved to the top before sending a new message.
- Alice successfully sent `Scroll test message 31` through the UI.
- The newly sent message appeared as the latest message.
- The latest message was fully visible within the message container.
- All Playwright assertions passed in both repeated headed Chromium executions.

**Execution Result:** PASS

**Evidence**

- QA Safety Guard result: Passed for local PostgreSQL, database `relay_qa_automation`, and role `relay_test_user`.
- Playwright terminal result: `2 passed (24.8s)` using `--repeat-each=2`.
- Playwright HTML report generated locally for the execution.

**Defect Reference:** None confirmed.

#### TC-MSG-008-01 — Message timestamps are displayed according to the user's locale and time zone

**Test Case Reference:** [TC-MSG-008-01](../test-design/test-cases/messaging.md#tc-msg-008-01--message-timestamps-are-displayed-according-to-the-users-locale-and-time-zone)
**Scenario Reference:** SCN-MSG-008 [SCN-MSG-008](../test-design/scenarios/messaging.md#scn-msg-008--message-timestamps-and-date-separators)
**Requirement Reference:** REQ-MSG-005 [REQ-MSG-005](../docs/requirements/messaging.md#req-msg-005--message-timestamps-and-date-separators)
**Risk Reference:** RSK-018 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
**Execution Date:** 2026-11-04

**Environment**

- Application URL: http://localhost:3000
- Browser / Project: Chromium
- Browser Version: 156.0.8078.4 (Official Build) (64-bit)
- Operating System: Windows 11 Pro 25H2
- Browser Locale: `en-US`
- Browser Time Zone: `America/Los_Angeles`
- Execution Mode: Headed
- Workers: 1
- Test Run / Commit Reference: Local execution; two consecutive executions using `--repeat-each=2`.

**Preconditions**

- Relay application is accessible.
- The QA database is available.
- Alice (`alice@example.com`) and Bob (`bob@example.com`) are prepared as registered test users through the database setup helper.
- Any existing conversation between Alice and Bob is removed before setup through `deleteTestConversationBetweenUsers()`.
- A conversation between Alice and Bob is created through the database setup helper.
- Two messages with known creation timestamps are inserted into the conversation through the database setup helper.
- Alice's valid credentials are available.
- The browser locale and time zone are explicitly configured as `en-US` and `America/Los_Angeles`, respectively.

**Expected Result**

- Each message bubble displays a timestamp.
- Each displayed timestamp accurately represents the message creation time in the configured local time zone.
- Timestamp presentation follows the configured browser locale conventions.
- The requirement does not prescribe a specific separator or a 12-hour versus 24-hour clock format.

**Actual Result**

- The test prepared Alice and Bob as registered test users and created a conversation between them.
- Two messages with known creation timestamps were inserted into the conversation:
  - `Timestamp test message 01` — `2026-01-15T12:34:00.000Z`.
  - `Timestamp test message 02` — `2026-01-15T13:47:00.000Z`.
- The browser context was configured with locale `en-US` and time zone `America/Los_Angeles`.
- Alice successfully signed in through the UI and opened the conversation with Bob.
- Both messages were displayed in the expected order, and each message bubble displayed a timestamp.
- The displayed timestamps matched the expected local time conversions:
  - `Timestamp test message 01` — `04:34 AM`.
  - `Timestamp test message 02` — `05:47 AM`.
- All Playwright assertions passed in both repeated headed Chromium executions.
- The test's final cleanup completed without a reported cleanup error.

**Execution Result:** PASS

**Evidence**

- QA Safety Guard result: Passed for local PostgreSQL, database `relay_qa_automation`, and role `relay_test_user`.
- Playwright terminal result: `2 passed (20.0s)` using `--repeat-each=2`.
- Playwright HTML report generated locally for the execution.

**Defect Reference:** None confirmed.

#### TC-MSG-008-02 — Message date separators follow the user's local calendar date

**Test Case Reference:** [TC-MSG-008-02](../test-design/test-cases/messaging.md#tc-msg-008-02)
**Scenario Reference:** SCN-MSG-008 [SCN-MSG-008](../test-design/scenarios/messaging.md#scn-msg-008--message-timestamps-and-date-separators)
**Requirement Reference:** REQ-MSG-005 [REQ-MSG-005](../docs/requirements/messaging.md#req-msg-005--message-timestamps-and-date-separators)
**Risk Reference:** RSK-018 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
**Execution Date:** 2026-11-04

**Environment**

- Application URL: http://localhost:3000
- Browser / Project: Chromium
- Browser Version: 156.0.8078.4 (Official Build) (64-bit)
- Operating System: Windows 11 Pro 25H2
- Browser Locale: `en-GB`
- Browser Time Zone: Default browser time zone
- Execution Mode: Headed
- Workers: 1
- Test Run / Commit Reference: Local execution; two consecutive executions using `--repeat-each=2`.

**Preconditions**

- Relay application is accessible.
- The QA database is available.
- Alice (`alice@example.com`) and Bob (`bob@example.com`) are prepared as registered test users through the database setup helper.
- Any existing conversation between Alice and Bob is removed before setup through `deleteTestConversationBetweenUsers()`.
- A conversation between Alice and Bob is created through the database setup helper.
- Three messages are inserted into the conversation through the database setup helper, with creation timestamps dynamically calculated relative to the current date:
  - Two calendar days ago.
  - Yesterday.
  - Today.
- The browser context is configured with locale `en-GB`.
- Alice's valid credentials are available.

**Expected Result**

- Messages belonging to the current local calendar date are grouped under the `Today` separator.
- Messages belonging to the previous local calendar date are grouped under the `Yesterday` separator.
- Messages belonging to an earlier calendar date are grouped under a date separator formatted according to the configured locale using `DD Mmm`.
- Date separators accurately reflect the local calendar dates of the messages.

**Actual Result**

- Alice and Bob were successfully prepared as registered test users.
- A conversation between Alice and Bob was created and populated with three messages.
- Message creation timestamps were dynamically calculated relative to the current date using JavaScript `Date` calendar operations.
- Alice successfully signed in through the UI and opened the conversation with Bob.
- All three messages were displayed in the expected chronological order.
- The date separators were displayed as expected:
  - The message from two calendar days ago displayed its corresponding `DD Mmm` date.
  - The message from yesterday displayed `Yesterday`.
  - The message from today displayed `Today`.
- All Playwright assertions passed in both repeated headed Chromium executions.
- The test's final cleanup completed without a reported cleanup error.

**Execution Result:** PASS

**Evidence**

- QA Safety Guard result: Passed for local PostgreSQL, database `relay_qa_automation`, and role `relay_test_user`.
- Playwright terminal result: `2 passed (22.4s)` using `--repeat-each=2`.
- Playwright HTML report generated locally for the execution.

**Defect Reference:** None confirmed.
