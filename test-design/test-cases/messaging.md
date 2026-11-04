# Relay — Messaging Test Cases

## 1. Purpose

This document defines the detailed messaging test cases derived from Relay's approved messaging scenarios, documented messaging requirements, product scope, and risk assessment.

The test cases translate the approved scenarios into repeatable verification steps with explicit preconditions, test data, expected results, and traceability. They describe test design only; execution outcomes and evidence are recorded separately.

---

## 2. Test Case Design Approach

Messaging test cases are derived from the following sources:

- Product scope
- Messaging requirements
- Risk assessment
- Approved messaging scenarios

The design considers positive and negative testing, boundary and edge conditions, message content validation, chronological ordering, persistence, automatic scrolling, multi-user message availability, and timestamp and date-separator behavior.

Test cases inherit their scope from the approved scenarios but map only to the requirements and risks directly relevant to the behavior being verified. Risk level informs execution priority; it does not determine the number of test cases required.

Expected results are based on the documented requirements and the decisions recorded during test-case review. Where a requirement does not specify a detail, such as an exact API status code or the setup needed to produce equal-timestamp messages, this document does not invent an acceptance criterion.

Browser, browser version, operating system, execution mode, actual result, status, evidence, and defect references belong in separate execution records rather than being repeated in each test case.

---

## 3. Test Case Structure

Each test case uses the following structure:

| Field               | Description                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | Unique identifier linked to the parent scenario.                                                               |
| Title               | Concise description of the behavior being verified.                                                            |
| Related Scenario    | Approved parent scenario.                                                                                      |
| Related Requirement | Requirement or requirements directly verified by the test case.                                                |
| Related Risk        | Risk or risks directly relevant to the behavior verified.                                                      |
| Risk Level          | Risk level associated with the behavior, based on the risk assessment.                                         |
| Test Design Method  | Method used to derive the test case.                                                                           |
| Test Type           | Classification of the test, such as functional, validation, API, security, boundary, or session-state testing. |
| Priority            | Recommended execution priority, informed by risk and coverage needs.                                           |
| Preconditions       | Conditions that must be true before the steps begin.                                                           |
| Test Data           | Values or data conditions needed to execute the test.                                                          |
| Steps               | Ordered actions performed by the tester or implemented by an automated test.                                   |
| Expected Result     | Observable result required by the documented requirement.                                                      |

### Test Case ID Convention

Test case IDs follow the conceptual format:

`TC-{FEATURE}-{SCENARIO NUMBER}-{CASE SEQUENCE}`

- `TC` identifies the artifact as a test case.
- `{FEATURE}` identifies the functional area, such as AUTH, AUTHZ, CONV, MSG, or UX.
- `{SCENARIO NUMBER}` identifies the parent scenario number to which the test case belongs.
- `{CASE SEQUENCE}` distinguishes individual test cases derived from the same scenario, using a sequential number starting from `01`.

For example, `TC-MSG-001-01` identifies the first test case derived from `SCN-MSG-001`. An additional test case derived from the same scenario would use `TC-MSG-001-02`.

The test case ID must remain unique within the test case repository and maintain a clear reference to its parent scenario.

Execution-specific information such as browser environment, browser version, operating system, execution mode, actual result, status, evidence, and defect ID is recorded separately during test execution.

---

## 4. Messaging Test Cases

### TC-MSG-001-01 — Send a valid text message within an authorized conversation

| Field               | Value                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-MSG-001-01                                                                                               |
| Title               | Send a valid text message within an authorized conversation                                                 |
| Related Scenario    | SCN-MSG-001 [SCN-MSG-001](../scenarios/messaging.md#scn-msg-001--send-text-message)                         |
| Related Requirement | REQ-MSG-001 [REQ-MSG-001](../../docs/requirements/messaging.md#req-msg-001--message-sending-and-validation) |
| Related Risk        | RSK-020 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                 |
| Risk Level          | Medium                                                                                                      |
| Test Design Method  | Requirement-Based                                                                                           |
| Test Type           | Functional / Positive                                                                                       |
| Priority            | Medium                                                                                                      |

#### Preconditions

- Relay application is accessible.
- The QA database is available.
- Alice (`alice@example.com`) and Bob (`bob@example.com`) are prepared as registered test users through the database setup helper.
- Any existing conversation between Alice and Bob is removed before setup through `deleteTestConversationBetweenUsers()`.
- A conversation between Alice and Bob is created through the database setup helper.
- Alice's valid credentials are available.

#### Test Data

| Data         | Value                                           |
| ------------ | ----------------------------------------------- |
| Sender       | User A - Alice (`alice@example.com`)            |
| Recipient    | User B - Bob (`bob@example.com`)                |
| Message      | `Hello Bob, this is a test message.`            |
| Conversation | An existing authorized conversation with User B |

#### Steps

1. Open the Relay application webpage.
2. Sign in as User Alice.
3. Open the conversation with User Bob.
4. Enter the test message into the message input.
5. Submit the message using the Send control.
6. Observe the resulting conversation history.

#### Expected Result

- The message is submitted successfully.
- The message appears in the conversation after sending.
- The displayed message content matches the submitted content.
- The message appears in the conversation in which it was sent.

---

### TC-MSG-002-01 — Empty and whitespace-only message input disables the Send button

| Field               | Value                                                                                                                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-MSG-002-01                                                                                                                                                                                                          |
| Title               | Empty and whitespace-only message input disables the Send button                                                                                                                                                       |
| Related Scenario    | SCN-MSG-002 [SCN-MSG-002](../scenarios/messaging.md#scn-msg-002--empty-and-whitespace-only-message-validation)                                                                                                         |
| Related Requirement | REQ-MSG-001 [REQ-MSG-001](../../docs/requirements/messaging.md#req-msg-001--message-sending-and-validation), REQ-MSG-006 [REQ-MSG-006](../../docs/requirements/messaging.md#req-msg-006--empty-message-input-handling) |
| Related Risk        | RSK-012 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                                                                                                            |
| Risk Level          | Medium                                                                                                                                                                                                                 |
| Test Design Method  | Requirement-Based / Boundary and Edge Conditions                                                                                                                                                                       |
| Test Type           | Functional / Validation / Negative                                                                                                                                                                                     |
| Priority            | Medium                                                                                                                                                                                                                 |

#### Preconditions

- Relay application is accessible.
- The QA database is available.
- Alice (`alice@example.com`) and Bob (`bob@example.com`) are prepared as registered test users through the database setup helper.
- Any existing conversation between Alice and Bob is removed before setup through `deleteTestConversationBetweenUsers()`.
- A conversation between Alice and Bob is created through the database setup helper.
- Alice's valid credentials are available.

#### Test Data

| Variation | Message input                                                              |
| --------- | -------------------------------------------------------------------------- |
| A         | Empty string (`""`)                                                        |
| B         | Spaces only (`"   "`)                                                      |
| C         | Tabs and line breaks only (`"\t\n"`), where supported by the input control |

#### Steps

1. Open the Relay application webpage.
2. Sign in as User Alice.
3. Open the conversation with User Bob.
4. For each test-data variation, set the message input to the specified value.
5. Verify the Send button's disabled state.
6. For each variation, attempt submission using the Enter key where applicable.
7. Check the conversation history for an unintended new message.

#### Expected Result

- The Send button is disabled when the input is empty or contains only whitespace.
- The UI prevents submission of empty and whitespace-only content through the tested keyboard interaction.
- No message is added to the conversation for any invalid input variation.

---

### TC-MSG-002-02 — API rejects empty and whitespace-only message content

| Field               | Value                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-MSG-002-02                                                                                                          |
| Title               | API rejects empty and whitespace-only message content                                                                  |
| Related Scenario    | SCN-MSG-002 [SCN-MSG-002](../scenarios/messaging.md#scn-msg-002--empty-and-whitespace-only-message-validation)         |
| Related Requirement | REQ-MSG-001 [Messaging Requirements](../../docs/requirements/messaging.md#req-msg-001--message-sending-and-validation) |
| Related Risk        | RSK-020 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                            |
| Risk Level          | Medium                                                                                                                 |
| Test Design Method  | Requirement-Based / Boundary and Edge Conditions                                                                       |
| Test Type           | API / Negative                                                                                                         |
| Priority            | Medium                                                                                                                 |

#### Preconditions

- Relay application is accessible.
- The QA database is available.
- Alice (`alice@example.com`) and Bob (`bob@example.com`) are prepared as registered test users through the database setup helper.
- Any existing conversation between Alice and Bob is removed before setup through `deleteTestConversationBetweenUsers()`.
- A conversation between Alice and Bob is created through the database setup helper.
- Alice's valid credentials are available for API authentication.

#### Test Data

| Variation | Message content                      |
| --------- | ------------------------------------ |
| A         | Empty string (`""`)                  |
| B         | Spaces only (`"   "`)                |
| C         | Tabs and line breaks only (`"\t\n"`) |

#### Steps

1. For each test-data variation, submit a message-creation request containing the specified content using the documented API contract.
2. Inspect the API response for each request.
3. Verify whether a message was created for each variation.
4. Inspect the conversation history or persisted test data, as appropriate, to verify that no invalid message was added.

#### Expected Result

- The API rejects empty and whitespace-only message content for all tested variations.
- No empty or whitespace-only message is created or added to the conversation.
- The test does not assume a specific HTTP status code or error response structure beyond the documented API contract.

---

### TC-MSG-003-01 — Submitted message content trims outer whitespace while preserving internal whitespace and line breaks

| Field               | Value                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-MSG-003-01                                                                                               |
| Title               | Submitted message content trims outer whitespace while preserving internal whitespace and line breaks       |
| Related Scenario    | SCN-MSG-003 [SCN-MSG-003](../scenarios/messaging.md#scn-msg-003--message-whitespace-handling)               |
| Related Requirement | REQ-MSG-001 [REQ-MSG-001](../../docs/requirements/messaging.md#req-msg-001--message-sending-and-validation) |
| Related Risk        | RSK-020 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                 |
| Risk Level          | Medium                                                                                                      |
| Test Design Method  | Requirement-Based / Boundary and Edge Conditions                                                            |
| Test Type           | Functional / Data Integrity                                                                                 |
| Priority            | Medium                                                                                                      |

#### Preconditions

- Relay application is accessible.
- The QA database is available.
- Alice (`alice@example.com`) and Bob (`bob@example.com`) are prepared as registered test users through the database setup helper.
- Any existing conversation between Alice and Bob is removed before setup through `deleteTestConversationBetweenUsers()`.
- A conversation between Alice and Bob is created through the database setup helper.
- Alice's valid credentials are available.

#### Test Data

| Data Variation               | Submitted Content            | Expected Displayed Content |
| ---------------------------- | ---------------------------- | -------------------------- |
| Leading whitespace           | `  Hello`                    | `Hello`                    |
| Trailing whitespace          | `Hello  `                    | `Hello`                    |
| Repeated internal whitespace | `Hello   world`              | `Hello   world`            |
| Line break                   | `Hello\nworld`               | `Hello\nworld`             |
| Mixed content                | `  Hello   world\n  Again  ` | `Hello   world\n  Again`   |

#### Steps

1. Open the Relay application webpage.
2. Sign in as User Alice.
3. Open the conversation with User Bob.
4. Submit each test-data variation as a separate message.
5. Wait for each submitted message to appear in the conversation history.
6. Compare the displayed message content with its corresponding expected displayed content.
7. Verify that leading and trailing whitespace are trimmed while internal whitespace and line breaks are preserved.
8. Verify the exact content programmatically rather than relying on visual inspection alone.

#### Expected Result

- Leading whitespace is trimmed from submitted message content.
- Trailing whitespace is trimmed from submitted message content.
- Repeated internal whitespace is preserved.
- Line breaks within submitted message content are preserved.
- Whitespace within the message that is not at the beginning or end of the overall content is preserved.
- Content containing both non-whitespace and whitespace characters is accepted.
- Content containing non-whitespace characters is not treated as whitespace-only.
- The displayed message content matches the expected normalized content for every tested variation.

---

### TC-MSG-004-01 — Messages are displayed in chronological order

| Field               | Value                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-MSG-004-01                                                                                            |
| Title               | Messages are displayed in chronological order                                                            |
| Related Scenario    | SCN-MSG-004 [SCN-MSG-004](../scenarios/messaging.md#scn-msg-004--chronological-message-ordering)         |
| Related Requirement | REQ-MSG-002 [Messaging Requirements](../../docs/requirements/messaging.md#req-msg-002--message-ordering) |
| Related Risk        | RSK-008 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                              |
| Risk Level          | Medium                                                                                                   |
| Test Design Method  | Requirement-Based                                                                                        |
| Test Type           | Functional                                                                                               |
| Priority            | Medium                                                                                                   |

#### Preconditions

- Relay application is accessible.
- The QA database is available.
- Alice (`alice@example.com`) and Bob (`bob@example.com`) are prepared as registered test users through the database setup helper.
- Any existing conversation between Alice and Bob is removed before setup through `deleteTestConversationBetweenUsers()`.
- A new conversation between Alice and Bob is created through the database setup helper.
- Three distinguishable messages are inserted into the conversation through the database setup helper in a known chronological sequence.
- Alice's valid credentials are available.

#### Test Data

| Data           | Value                                |
| -------------- | ------------------------------------ |
| User A         | User A - Alice (`alice@example.com`) |
| User B         | User B - Bob (`bob@example.com`)     |
| First Message  | `Hi Bob!`                            |
| Second Message | `How are you?`                       |
| Third Message  | `I hope you are doing well.`         |

#### Steps

1. Open the Relay application webpage.
2. Sign in as User Alice.
3. Open the conversation with User Bob.
4. Identify the selected messages in the conversation history.
5. Compare their displayed positions with the known chronological sequence.
6. Verify that displayed timestamp text is not used as the sole basis for determining message order.

#### Expected Result

- The oldest selected message appears above the newer selected messages.
- The newest selected message appears below the older selected messages.
- Messages are displayed in chronological order.
- Displayed timestamp text does not determine message ordering.

---

### TC-MSG-005-01 — Messages with equal timestamps maintain consistent relative ordering across users, refreshes, and re-logins

| Field               | Value                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-MSG-005-01                                                                                                              |
| Title               | Messages with equal timestamps maintain consistent relative ordering across users, refreshes, and re-logins                |
| Related Scenario    | SCN-MSG-005 [SCN-MSG-005](../scenarios/messaging.md#scn-msg-005--message-ordering-consistency-across-refresh-and-re-login) |
| Related Requirement | REQ-MSG-002 [Messaging Requirements](../../docs/requirements/messaging.md#req-msg-002--message-ordering)                   |
| Related Risk        | RSK-008 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                |
| Risk Level          | Medium                                                                                                                     |
| Test Design Method  | Requirement-Based / Boundary and Edge Conditions                                                                           |
| Test Type           | Functional / Consistency / Multi-User                                                                                      |
| Priority            | Medium                                                                                                                     |

#### Preconditions

- Relay application is accessible.
- The QA database is available.
- Alice (`alice@example.com`) and Bob (`bob@example.com`) are prepared as registered test users through the database setup helper.
- Any existing conversation between Alice and Bob is removed before setup through `deleteTestConversationBetweenUsers()`.
- A new conversation between Alice and Bob is created through the database setup helper.
- Three distinguishable messages are inserted into the conversation by Alice using the same timestamp.
- The timestamp equality precondition is verified through `verifyMessagesHaveEqualTimestamps()`.
- Alice's and Bob's valid credentials are available.

#### Test Data

| Data             | Value                                                               |
| ---------------- | ------------------------------------------------------------------- |
| Participants     | User A and User B                                                   |
| Messages         | At least two distinguishable messages with exactly equal timestamps |
| Timestamp        | One controlled timestamp value shared by the selected messages      |
| Initial ordering | Known relative order of the selected messages                       |

#### Steps

1. Prepare the selected messages in the shared conversation with exactly equal `createdAt` timestamps.
2. Verify that the selected messages have equal timestamps and record their initial relative order.
3. Open the conversation as User A and compare the displayed relative order with the recorded order.
4. Refresh the page as User A and compare the relative order again.
5. Log out as User A, sign in again, reopen the same conversation, and compare the relative order again.
6. Open the same conversation as User B in an independent authenticated browser context and compare the relative order.

#### Expected Result

- Messages with identical timestamps are displayed in a consistent relative order.
- The relative order remains consistent after application refresh.
- The relative order remains consistent after Alice logs out and logs in again.
- Bob sees the same relative message order when accessing the conversation through an independent browser context.

---

### TC-MSG-006-01 — Sent messages remain available and correctly ordered after page refresh

| Field               | Value                                                                                                                                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-MSG-006-01                                                                                                                                                                                                     |
| Title               | Sent messages remain available and correctly ordered after page refresh                                                                                                                                           |
| Related Scenario    | SCN-MSG-005 [SCN-MSG-005](../scenarios/messaging.md#scn-msg-005--message-ordering-consistency-across-refresh-and-re-login), SCN-MSG-006 [SCN-MSG-006](../scenarios/messaging.md#scn-msg-006--message-persistence) |
| Related Requirement | REQ-MSG-002 [REQ-MSG-002](../../docs/requirements/messaging.md#req-msg-002--message-ordering), REQ-MSG-003 [REQ-MSG-003](../../docs/requirements/messaging.md#req-msg-003--message-persistence)                   |
| Related Risk        | RSK-004 [Risk Register List](../../docs/risk-assessment.md#3-risk-register), RSK-008 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                          |
| Risk Level          | High                                                                                                                                                                                                              |
| Test Design Method  | Requirement-Based / Risk-Based                                                                                                                                                                                    |
| Test Type           | Functional / Persistence / Consistency                                                                                                                                                                            |
| Priority            | High                                                                                                                                                                                                              |

#### Preconditions

- Relay application is accessible.
- The QA database is available.
- Alice (`alice@example.com`) and Bob (`bob@example.com`) are prepared as registered test users through the database setup helper.
- Any existing conversation between Alice and Bob is removed before setup through `deleteTestConversationBetweenUsers()`.
- A conversation between Alice and Bob is created through the database setup helper.
- Two messages are inserted into the conversation through the database setup helper in a known order before UI execution.
- Alice's valid credentials are available.

#### Test Data

| Data         | Value                                          |
| ------------ | ---------------------------------------------- |
| User A       | User A - Alice (`alice@example.com`)           |
| User B       | User B - Bob (`bob@example.com`)               |
| Message      | Unique message content for this test execution |
| Conversation | An existing authorized conversation            |

#### Steps

1. Open the Relay application webpage and sign in as User Alice.
2. Open the conversation with User Bob.
3. Record the existing messages, their exact content, and their chronological relative order.
4. Send the unique test message and verify that it appears in the conversation.
5. Record the resulting message content and chronological order, including the newly sent message.
6. Refresh the page and reopen the same conversation if necessary.
7. Verify that all recorded messages, including the test message, are still available.
8. Compare the content and chronological relative order with the records made before refreshing.

#### Expected Result

- All previously recorded messages and the newly sent message remain available after refresh.
- Message content remains unchanged.
- Messages remain associated with the correct conversation.
- Chronological relative ordering remains consistent after refresh, with older messages above newer messages.

---

### TC-MSG-006-02 — Sent messages remain available and correctly ordered after logout and re-login

| Field               | Value                                                                                                                                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-MSG-006-02                                                                                                                                                                                                     |
| Title               | Sent messages remain available and correctly ordered after logout and re-login                                                                                                                                    |
| Related Scenario    | SCN-MSG-005 [SCN-MSG-005](../scenarios/messaging.md#scn-msg-005--message-ordering-consistency-across-refresh-and-re-login), SCN-MSG-006 [SCN-MSG-006](../scenarios/messaging.md#scn-msg-006--message-persistence) |
| Related Requirement | REQ-MSG-002 [REQ-MSG-002](../../docs/requirements/messaging.md#req-msg-002--message-ordering), REQ-MSG-003 [REQ-MSG-003](../../docs/requirements/messaging.md#req-msg-003--message-persistence)                   |
| Related Risk        | RSK-004 [Risk Register List](../../docs/risk-assessment.md#3-risk-register), RSK-008 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                          |
| Risk Level          | High                                                                                                                                                                                                              |
| Test Design Method  | Requirement-Based / Risk-Based                                                                                                                                                                                    |
| Test Type           | Functional / Persistence / Consistency                                                                                                                                                                            |
| Priority            | High                                                                                                                                                                                                              |

#### Preconditions

- Relay application is accessible.
- The QA database is available.
- Alice (`alice@example.com`) and Bob (`bob@example.com`) are prepared as registered test users through the database setup helper.
- Any existing conversation between Alice and Bob is removed before setup through `deleteTestConversationBetweenUsers()`.
- A conversation between Alice and Bob is created through the database setup helper.
- Two messages are inserted into the conversation through the database setup helper in a known order before UI execution.
- Alice's valid credentials are available.

#### Test Data

| Data         | Value                                          |
| ------------ | ---------------------------------------------- |
| User A       | User A - Alice (`alice@example.com`)           |
| User B       | User B - Bob (`bob@example.com`)               |
| Message      | Unique message content for this test execution |
| Conversation | An existing authorized conversation            |

#### Steps

1. Open the Relay application webpage and sign in as User Alice.
2. Open the conversation with User Bob.
3. Record the existing messages, their exact content, and their chronological relative order.
4. Send the unique test message and verify that it appears in the conversation.
5. Record the resulting message content and chronological order, including the newly sent message.
6. Log out as User Alice.
7. Sign in again as User Alice and reopen the same conversation.
8. Verify that all recorded messages, including the test message, are still available.
9. Compare the content and chronological relative order with the records made before logout.

#### Expected Result

- All previously recorded messages and the newly sent message remain available after re-login.
- Message content remains unchanged.
- Messages remain associated with the correct conversation.
- Chronological relative ordering remains consistent after re-login, with older messages above newer messages.

---

### TC-MSG-007-01 — Opening a conversation scrolls to the latest message

| Field               | Value                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-MSG-007-01                                                                                                              |
| Title               | Opening a conversation scrolls to the latest message                                                                       |
| Related Scenario    | SCN-MSG-007 [SCN-MSG-007](../scenarios/messaging.md#scn-msg-007--automatic-message-scrolling)                              |
| Related Requirement | REQ-MSG-004 [Messaging Requirements](../../docs/requirements/messaging.md#req-msg-004--message-history-scrolling-behavior) |
| Related Risk        | RSK-017 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                |
| Risk Level          | Low                                                                                                                        |
| Test Design Method  | Requirement-Based                                                                                                          |
| Test Type           | Functional / Usability                                                                                                     |
| Priority            | Low                                                                                                                        |

#### Preconditions

- Relay application is accessible.
- The QA database is available.
- Alice (`alice@example.com`) and Bob (`bob@example.com`) are prepared as registered test users through the database setup helper.
- Any existing conversation between Alice and Bob is removed before setup through `deleteTestConversationBetweenUsers()`.
- A conversation between Alice and Bob is created through the database setup helper.
- The conversation is populated with 30 messages to ensure that the message container is scrollable.
- Alice's valid credentials are available.

#### Test Data

| Data         | Value                                                             |
| ------------ | ----------------------------------------------------------------- |
| User A       | User A - Alice (`alice@example.com`)                              |
| User B       | User B - Bob (`bob@example.com`)                                  |
| Conversation | A prepared conversation with enough messages to require scrolling |

#### Steps

1. Open the Relay application webpage.
2. Sign in as User Alice.
3. Open the conversation with User Bob.
4. Wait until the conversation history has finished loading.
5. Observe the message container's initial scroll position and the visibility of the latest message.

#### Expected Result

- The conversation automatically scrolls to the latest message when opened.
- The message container is positioned at the bottom of the conversation history.
- The latest message is visible without requiring the user to scroll manually to the bottom.

---

### TC-MSG-007-02 — Sending a message scrolls the conversation to the latest message

| Field               | Value                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-MSG-007-02                                                                                                              |
| Title               | Sending a message scrolls the conversation to the latest message                                                           |
| Related Scenario    | SCN-MSG-007 [SCN-MSG-007](../scenarios/messaging.md#scn-msg-007--automatic-message-scrolling)                              |
| Related Requirement | REQ-MSG-004 [Messaging Requirements](../../docs/requirements/messaging.md#req-msg-004--message-history-scrolling-behavior) |
| Related Risk        | RSK-017 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                |
| Risk Level          | Low                                                                                                                        |
| Test Design Method  | Requirement-Based                                                                                                          |
| Test Type           | Functional / Usability                                                                                                     |
| Priority            | Low                                                                                                                        |

#### Preconditions

- Relay application is accessible.
- The QA database is available.
- Alice (`alice@example.com`) and Bob (`bob@example.com`) are prepared as registered test users through the database setup helper.
- Any existing conversation between Alice and Bob is removed before setup.
- A conversation between Alice and Bob is created through the database setup helper.
- The conversation is populated with 30 messages in chronological order.
- Alice's valid credentials are available.

#### Test Data

| Data    | Value                                          |
| ------- | ---------------------------------------------- |
| User A  | User A - Alice (`alice@example.com`)           |
| User B  | User B - Bob (`bob@example.com`)               |
| Message | Unique message content for this test execution |

#### Steps

1. Open the Relay application webpage and sign in as User Alice.
2. Open the conversation with User Bob.
3. Wait until the conversation history has finished loading.
4. Scroll the message container to the top or a position sufficiently far from the bottom.
5. Enter and submit the unique test message.
6. Wait until the newly sent message appears in the conversation history.
7. Observe the message container's scroll position and the visibility of the new message.

#### Expected Result

- The conversation automatically scrolls to the latest message when a new message is sent.
- The newly sent message is displayed as the latest message.
- The latest message is fully visible without requiring the user to scroll manually.

---

### TC-MSG-008-01 — Message timestamps are displayed according to the user's locale and time zone

| Field               | Value                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Test Case ID        | TC-MSG-008-01                                                                                                                  |
| Title               | Message timestamps are displayed according to the user's locale and time zone                                                  |
| Related Scenario    | SCN-MSG-008 [SCN-MSG-008](../scenarios/messaging.md#scn-msg-008--message-timestamps-and-date-separators)                       |
| Related Requirement | REQ-MSG-005 [Messaging Requirements](../../docs/requirements/messaging.md#req-msg-005--message-timestamps-and-date-separators) |
| Related Risk        | RSK-018 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                    |
| Risk Level          | Low                                                                                                                            |
| Test Design Method  | Requirement-Based                                                                                                              |
| Test Type           | Functional / UI / Date and Time                                                                                                |
| Priority            | Low                                                                                                                            |

#### Preconditions

- Relay application is accessible.
- The QA database is available.
- Alice (`alice@example.com`) and Bob (`bob@example.com`) are prepared as registered test users through the database setup helper.
- Any existing conversation between Alice and Bob is removed before setup through `deleteTestConversationBetweenUsers()`.
- A conversation between Alice and Bob is created through the database setup helper.
- Two messages with known creation timestamps are inserted into the conversation through the database setup helper.
- Alice's valid credentials are available.
- The browser locale and time zone are explicitly configured as `en-US` and `America/Los_Angeles`, respectively.

#### Test Data

| Data                  | Value                                                           |
| --------------------- | --------------------------------------------------------------- |
| User A                | User A - Alice (`alice@example.com`)                            |
| User B                | User B - Bob (`bob@example.com`)                                |
| Message creation time | A known timestamp that can be compared with the displayed value |
| Browser locale        | The locale configured for the test                              |
| Browser time zone     | The time zone configured for the test                           |

#### Steps

1. Configure or identify the browser locale and time zone for the test execution.
2. Open the Relay application webpage and sign in as User Alice.
3. Open the conversation with User Bob.
4. Inspect the timestamp displayed below each selected message bubble.
5. Compare each displayed timestamp with the message's known creation time converted to the configured local time zone and rendered according to the configured locale.

#### Expected Result

- Each message bubble displays a timestamp.
- Each displayed timestamp accurately represents the message creation time in the configured local time zone.
- Timestamp presentation follows the configured browser locale conventions.
- The requirement does not prescribe a specific separator or a 12-hour versus 24-hour clock format.

---

### TC-MSG-008-02 — Message date separators follow the user's local calendar date

| Field               | Value                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Test Case ID        | TC-MSG-008-02                                                                                                                  |
| Title               | Message date separators follow the user's local calendar date                                                                  |
| Related Scenario    | SCN-MSG-008 [SCN-MSG-008](../scenarios/messaging.md#scn-msg-008--message-timestamps-and-date-separators)                       |
| Related Requirement | REQ-MSG-005 [Messaging Requirements](../../docs/requirements/messaging.md#req-msg-005--message-timestamps-and-date-separators) |
| Related Risk        | RSK-018 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                    |
| Risk Level          | Low                                                                                                                            |
| Test Design Method  | Requirement-Based / Boundary and Edge Conditions                                                                               |
| Test Type           | Functional / Date and Time                                                                                                     |
| Priority            | Low                                                                                                                            |

#### Preconditions

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

#### Test Data

| Data Variation               | Value                                                          |
| ---------------------------- | -------------------------------------------------------------- |
| Current local calendar date  | A message whose timestamp falls on the current local date      |
| Previous local calendar date | A message whose timestamp falls on the previous local date     |
| Older local calendar date    | A message whose timestamp falls before the previous local date |
| Browser time zone            | A known, controlled time zone                                  |

#### Steps

1. Configure the browser time zone for the test execution.
2. Prepare or identify messages whose timestamps fall on the current local date, previous local date, and an earlier local date in that time zone.
3. Open the Relay application webpage and sign in as User Alice.
4. Open the conversation with User Bob.
5. Identify the date separator associated with each selected message.
6. Compare each displayed separator with the corresponding message date using the configured local calendar date.

#### Expected Result

- Messages belonging to the current local calendar date are grouped under the `Today` separator.
- Messages belonging to the previous local calendar date are grouped under the `Yesterday` separator.
- Messages belonging to an earlier calendar date are grouped under a date separator formatted according to the configured locale using `DD Mmm`.
- Date separators accurately reflect the local calendar dates of the messages.

---

### TC-MSG-009-01 — A message sent by one participant becomes available to the recipient after refresh

| Field               | Value                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-MSG-009-01                                                                                                   |
| Title               | A message sent by one participant becomes available to the recipient after refresh                              |
| Related Scenario    | SCN-MSG-009 [SCN-MSG-009](../scenarios/messaging.md#scn-msg-009--message-availability-after-recipient-refresh)  |
| Related Requirement | REQ-MSG-007 [REQ-MSG-007](../../docs/requirements/messaging.md#req-msg-007--message-availability-after-refresh) |
| Related Risk        | RSK-004 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                     |
| Risk Level          | High                                                                                                            |
| Test Design Method  | Requirement-Based / Risk-Based                                                                                  |
| Test Type           | Functional / Multi-User / Persistence                                                                           |
| Priority            | High                                                                                                            |

#### Preconditions

- Relay application is accessible.
- The QA database is available.
- Alice (`alice@example.com`) and Bob (`bob@example.com`) are prepared as registered test users through the database setup helper.
- Any existing conversation between Alice and Bob is removed before setup through `deleteTestConversationBetweenUsers()`.
- A conversation between Alice and Bob is created through the database setup helper.
- Two messages are inserted into the conversation through the database setup helper in a known order before UI execution.
- Alice's and Bob's valid credentials are available.

#### Test Data

| Data         | Value                                          |
| ------------ | ---------------------------------------------- |
| Sender       | User A                                         |
| Recipient    | User B                                         |
| Conversation | An existing conversation shared by both users  |
| Message      | Unique message content for this test execution |

#### Steps

1. Open the shared conversation as User B in the first browser context and leave it open.
2. Open the same conversation as User A in a second, independent browser context.
3. Send the unique test message as User A.
4. Verify that the message appears in User A's conversation.
5. Inspect User B's already-open conversation without refreshing it.
6. Refresh the conversation as User B.
7. Inspect the conversation history and verify the new message's content, conversation, and position.

#### Expected Result

- Both participants can access the same conversation through independent authenticated browser contexts.
- A message sent by Alice becomes available in Alice's conversation.
- The newly sent message is not automatically displayed in Bob's already-open conversation before refresh.
- After Bob refreshes the conversation, the newly sent message becomes available.
- The message content remains unchanged and appears in the correct chronological order relative to previously recorded messages.

---

## 5. Scenario-to-Test Case Traceability

This table maps each approved messaging scenario to the test cases designed to verify it. Requirement and risk IDs are included to make the coverage relationship reviewable without creating a separate risk-to-test-case traceability section.

| Scenario ID | Related Requirement ID(s) | Related Risk ID(s) | Test Case ID(s)                             |
| ----------- | ------------------------- | ------------------ | ------------------------------------------- |
| SCN-MSG-001 | REQ-MSG-001               | RSK-020            | TC-MSG-001-01                               |
| SCN-MSG-002 | REQ-MSG-001, REQ-MSG-006  | RSK-012, RSK-020   | TC-MSG-002-01, TC-MSG-002-02                |
| SCN-MSG-003 | REQ-MSG-001               | RSK-020            | TC-MSG-003-01                               |
| SCN-MSG-004 | REQ-MSG-002               | RSK-008            | TC-MSG-004-01                               |
| SCN-MSG-005 | REQ-MSG-002               | RSK-008            | TC-MSG-005-01, TC-MSG-006-01, TC-MSG-006-02 |
| SCN-MSG-006 | REQ-MSG-003               | RSK-004            | TC-MSG-006-01, TC-MSG-006-02                |
| SCN-MSG-007 | REQ-MSG-004               | RSK-017            | TC-MSG-007-01, TC-MSG-007-02                |
| SCN-MSG-008 | REQ-MSG-005               | RSK-018            | TC-MSG-008-01, TC-MSG-008-02                |
| SCN-MSG-009 | REQ-MSG-007               | RSK-004            | TC-MSG-009-01                               |

The test cases are designed for subsequent execution and may be refined during review. Their presence in this document does not imply that they have been executed or passed.
