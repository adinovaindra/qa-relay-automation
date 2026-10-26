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

The design considers positive and negative testing, boundary and edge conditions, message content validation, chronological ordering, persistence, automatic scrolling, and timestamp and date-separator behavior where supported by the documented requirements.

Test cases inherit their scope from the approved scenarios but map only to the requirements and risks directly relevant to the behavior being verified. Risk level informs execution priority; it does not determine the number of test cases required.

Expected results are based on the documented requirements. Where a requirement does not specify a detail, such as an exact API status code or the setup needed to produce equal-timestamp messages, this document does not invent an acceptance criterion.

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
| Related Risk        | RSK-007 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                 |
| Risk Level          | Medium                                                                                                      |
| Test Design Method  | Requirement-Based                                                                                           |
| Test Type           | Functional / Positive                                                                                       |
| Priority            | Medium                                                                                                      |

#### Preconditions

- Relay is accessible.
- User A is authenticated.
- User A has access to an existing conversation.

#### Test Data

| Data         | Value                               |
| ------------ | ----------------------------------- |
| Message      | Hello, this is a test message.      |
| Conversation | An existing authorized conversation |
| Sender       | User A                              |

#### Steps

1. Open the authorized conversation.
2. Enter the test message into the message input.
3. Submit the message using the Send control.
4. Observe the resulting conversation history.

#### Expected Result

- The message is submitted successfully.
- The message appears in the conversation after sending.
- The displayed message content matches the submitted content.
- The message is associated with the conversation in which it was sent.
- The message is associated with the authenticated sender.

---

### TC-MSG-002-01 — Empty message input disables the Send button

| Field               | Value                                                                                                                             |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-MSG-002-01                                                                                                                     |
| Title               | Empty message input disables the Send button                                                                                      |
| Related Scenario    | SCN-MSG-002 [SCN-MSG-002](../scenarios/messaging.md#scn-msg-002--empty-and-whitespace-only-message-validation)                    |
| Related Requirement | REQ-MSG-001, REQ-MSG-006 [Messaging Requirements](../../docs/requirements/messaging.md#req-msg-006--empty-message-input-handling) |
| Related Risk        | RSK-007, RSK-012 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                              |
| Risk Level          | Medium                                                                                                                            |
| Test Design Method  | Requirement-Based                                                                                                                 |
| Test Type           | Functional / Validation / Negative                                                                                                |
| Priority            | Medium                                                                                                                            |

#### Preconditions

- Relay is accessible.
- User A is authenticated.
- User A has access to an existing conversation.

#### Test Data

| Data          | Value |
| ------------- | ----- |
| Message input | Empty |

#### Steps

1. Open the conversation.
2. Ensure the message input is empty.
3. Observe the Send button.
4. Attempt to interact with the Send button.

#### Expected Result

- The Send button is disabled while the input is empty.
- The UI prevents submission of an empty message.

---

### TC-MSG-002-02 — Whitespace-only message input disables the Send button

| Field               | Value                                                                                                                             |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-MSG-002-02                                                                                                                     |
| Title               | Whitespace-only message input disables the Send button                                                                            |
| Related Scenario    | SCN-MSG-002 [SCN-MSG-002](../scenarios/messaging.md#scn-msg-002--empty-and-whitespace-only-message-validation)                    |
| Related Requirement | REQ-MSG-001, REQ-MSG-006 [Messaging Requirements](../../docs/requirements/messaging.md#req-msg-006--empty-message-input-handling) |
| Related Risk        | RSK-007, RSK-012 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                              |
| Risk Level          | Medium                                                                                                                            |
| Test Design Method  | Requirement-Based / Boundary and Edge Conditions                                                                                  |
| Test Type           | Functional / Validation / Negative                                                                                                |
| Priority            | Medium                                                                                                                            |

#### Preconditions

- Relay is accessible.
- User A is authenticated.
- User A has access to an existing conversation.

#### Test Data

| Data          | Value                                                               |
| ------------- | ------------------------------------------------------------------- |
| Message input | Spaces only                                                         |
| Variation     | Other whitespace-only content, where supported by the input control |

#### Steps

1. Open the conversation.
2. Enter whitespace-only content into the message input.
3. Observe the Send button.
4. Attempt to interact with the Send button.

#### Expected Result

- The Send button is disabled while the input contains only whitespace.
- The UI prevents submission of a whitespace-only message.

---

### TC-MSG-002-03 — API rejects empty message content

| Field               | Value                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-MSG-002-03                                                                                                          |
| Title               | API rejects empty message content                                                                                      |
| Related Scenario    | SCN-MSG-002 [SCN-MSG-002](../scenarios/messaging.md#scn-msg-002--empty-and-whitespace-only-message-validation)         |
| Related Requirement | REQ-MSG-001 [Messaging Requirements](../../docs/requirements/messaging.md#req-msg-001--message-sending-and-validation) |
| Related Risk        | RSK-007 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                            |
| Risk Level          | Medium                                                                                                                 |
| Test Design Method  | Requirement-Based                                                                                                      |
| Test Type           | API / Negative                                                                                                         |
| Priority            | Medium                                                                                                                 |

#### Preconditions

- A valid authenticated API context is available.
- The target conversation is authorized for the authenticated user.
- The documented message-submission API contract is available.

#### Test Data

| Data            | Value        |
| --------------- | ------------ |
| Message content | Empty string |

#### Steps

1. Submit a message-creation request containing empty message content using the documented API contract.
2. Inspect the API response.
3. Verify whether a message was created.
4. Inspect the conversation history, if necessary, to verify that no empty message was added.

#### Expected Result

- The API rejects empty message content.
- No empty message is created or added to the conversation.
- The specific HTTP status code and error response structure follow the documented API contract; they are not assumed by this test case.

---

### TC-MSG-002-04 — API rejects whitespace-only message content

| Field               | Value                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-MSG-002-04                                                                                                          |
| Title               | API rejects whitespace-only message content                                                                            |
| Related Scenario    | SCN-MSG-002 [SCN-MSG-002](../scenarios/messaging.md#scn-msg-002--empty-and-whitespace-only-message-validation)         |
| Related Requirement | REQ-MSG-001 [Messaging Requirements](../../docs/requirements/messaging.md#req-msg-001--message-sending-and-validation) |
| Related Risk        | RSK-007 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                            |
| Risk Level          | Medium                                                                                                                 |
| Test Design Method  | Requirement-Based / Boundary and Edge Conditions                                                                       |
| Test Type           | API / Negative                                                                                                         |
| Priority            | Medium                                                                                                                 |

#### Preconditions

- A valid authenticated API context is available.
- The target conversation is authorized for the authenticated user.
- The documented message-submission API contract is available.

#### Test Data

| Data            | Value                                                                |
| --------------- | -------------------------------------------------------------------- |
| Message content | Spaces only                                                          |
| Variation       | Other whitespace-only content, where supported by the request format |

#### Steps

1. Submit a message-creation request containing whitespace-only content using the documented API contract.
2. Inspect the API response.
3. Verify whether a message was created.
4. Inspect the conversation history, if necessary, to verify that no whitespace-only message was added.

#### Expected Result

- The API rejects whitespace-only message content.
- No whitespace-only message is created or added to the conversation.
- The specific HTTP status code and error response structure follow the documented API contract; they are not assumed by this test case.

---

### TC-MSG-003-01 — Submitted message content preserves whitespace and line breaks

| Field               | Value                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-MSG-003-01                                                                                                          |
| Title               | Submitted message content preserves whitespace and line breaks                                                         |
| Related Scenario    | SCN-MSG-003 [SCN-MSG-003](../scenarios/messaging.md#scn-msg-003--message-content-preservation)                         |
| Related Requirement | REQ-MSG-001 [Messaging Requirements](../../docs/requirements/messaging.md#req-msg-001--message-sending-and-validation) |
| Related Risk        | RSK-007 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                            |
| Risk Level          | Medium                                                                                                                 |
| Test Design Method  | Requirement-Based / Boundary and Edge Conditions                                                                       |
| Test Type           | Functional / Data Integrity                                                                                            |
| Priority            | Medium                                                                                                                 |

#### Preconditions

- Relay is accessible.
- User A is authenticated.
- User A has access to an existing conversation.

#### Test Data

| Data Variation               | Value                                                                               |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| Leading whitespace           | `  Hello`                                                                           |
| Trailing whitespace          | `Hello  `                                                                           |
| Repeated internal whitespace | `Hello   world`                                                                     |
| Line break                   | `Hello` followed by a line break and `world`                                        |
| Mixed content                | Content containing non-whitespace characters, repeated whitespace, and a line break |

#### Steps

1. Open the authorized conversation.
2. Submit each test-data variation as a separate message.
3. Observe each message in the conversation history.
4. Compare the displayed content with the submitted content.

#### Expected Result

- Leading whitespace is preserved.
- Trailing whitespace is preserved.
- Repeated whitespace is preserved.
- Line breaks are preserved.
- Content containing both non-whitespace and whitespace characters is accepted.
- Content containing non-whitespace characters is not treated as whitespace-only.

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

- User A is authenticated.
- An existing conversation contains multiple messages sent at different times.
- The message sequence can be identified.

#### Test Data

| Data             | Value                                                               |
| ---------------- | ------------------------------------------------------------------- |
| Message sequence | At least three distinguishable messages sent in chronological order |

#### Steps

1. Open the conversation.
2. Observe the order of messages in the conversation history.
3. Compare their displayed positions with the known chronological sequence.
4. Verify that displayed timestamp text is not used as the sole basis for determining message order.

#### Expected Result

- The oldest message appears above newer messages.
- Newer messages appear below older messages.
- Messages are displayed in chronological order.
- Displayed timestamps do not determine message ordering.

---

### TC-MSG-005-01 — Message ordering remains consistent after page refresh

| Field               | Value                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-MSG-005-01                                                                                                              |
| Title               | Message ordering remains consistent after page refresh                                                                     |
| Related Scenario    | SCN-MSG-005 [SCN-MSG-005](../scenarios/messaging.md#scn-msg-005--message-ordering-consistency-across-refresh-and-re-login) |
| Related Requirement | REQ-MSG-002 [Messaging Requirements](../../docs/requirements/messaging.md#req-msg-002--message-ordering)                   |
| Related Risk        | RSK-008 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                |
| Risk Level          | Medium                                                                                                                     |
| Test Design Method  | Requirement-Based                                                                                                          |
| Test Type           | Functional / Consistency                                                                                                   |
| Priority            | Medium                                                                                                                     |

#### Preconditions

- User A is authenticated.
- An existing conversation contains multiple messages in a known order.

#### Test Data

| Data             | Value                                                            |
| ---------------- | ---------------------------------------------------------------- |
| Message sequence | Multiple distinguishable messages in a known chronological order |

#### Steps

1. Open the conversation and record the current message order.
2. Refresh the page.
3. Reopen the conversation if necessary.
4. Compare the displayed message order with the order recorded before refreshing.

#### Expected Result

- The message order remains consistent after refresh.
- Older messages remain above newer messages.
- Refreshing does not change the established relative ordering of messages.

---

### TC-MSG-005-02 — Message ordering remains consistent after logout and re-login

| Field               | Value                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-MSG-005-02                                                                                                              |
| Title               | Message ordering remains consistent after logout and re-login                                                              |
| Related Scenario    | SCN-MSG-005 [SCN-MSG-005](../scenarios/messaging.md#scn-msg-005--message-ordering-consistency-across-refresh-and-re-login) |
| Related Requirement | REQ-MSG-002 [Messaging Requirements](../../docs/requirements/messaging.md#req-msg-002--message-ordering)                   |
| Related Risk        | RSK-008 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                |
| Risk Level          | Medium                                                                                                                     |
| Test Design Method  | Requirement-Based                                                                                                          |
| Test Type           | Functional / Consistency                                                                                                   |
| Priority            | Medium                                                                                                                     |

#### Preconditions

- User A is authenticated.
- An existing conversation contains multiple messages in a known order.

#### Test Data

| Data             | Value                                                            |
| ---------------- | ---------------------------------------------------------------- |
| Message sequence | Multiple distinguishable messages in a known chronological order |

#### Steps

1. Open the conversation and record the current message order.
2. Log out.
3. Log in again as User A.
4. Reopen the same conversation.
5. Compare the displayed message order with the order recorded before logout.

#### Expected Result

- The message order remains consistent after re-login.
- Older messages remain above newer messages.
- Re-login does not change the established relative ordering of messages.

---

### TC-MSG-005-03 — Messages with equal timestamps maintain consistent relative ordering

| Field               | Value                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-MSG-005-03                                                                                                              |
| Title               | Messages with equal timestamps maintain consistent relative ordering                                                       |
| Related Scenario    | SCN-MSG-005 [SCN-MSG-005](../scenarios/messaging.md#scn-msg-005--message-ordering-consistency-across-refresh-and-re-login) |
| Related Requirement | REQ-MSG-002 [Messaging Requirements](../../docs/requirements/messaging.md#req-msg-002--message-ordering)                   |
| Related Risk        | RSK-008 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                |
| Risk Level          | Medium                                                                                                                     |
| Test Design Method  | Requirement-Based / Boundary and Edge Conditions                                                                           |
| Test Type           | Functional / Consistency                                                                                                   |
| Priority            | Medium                                                                                                                     |

#### Preconditions

- A conversation contains multiple distinguishable messages with equal timestamps.
- Their relative order can be identified before refreshing or re-logging in.
- The test environment allows the equal-timestamp condition to be reliably established or identified.

#### Test Data

| Data             | Value                                                       |
| ---------------- | ----------------------------------------------------------- |
| Messages         | At least two distinguishable messages with equal timestamps |
| Initial ordering | Known relative order of the selected messages               |

#### Steps

1. Open the conversation and record the relative order of the equal-timestamp messages.
2. Refresh the page and compare their relative order.
3. Log out and log in again.
4. Reopen the conversation and compare their relative order again.
5. Where the same scenario is verified across users, compare the relative order displayed to each authorized participant.

#### Expected Result

- Messages with equal timestamps maintain consistent relative ordering across the documented conditions.
- Refreshing or re-logging in does not arbitrarily change their established relative order.
- Displayed timestamps do not determine message ordering.

---

### TC-MSG-006-01 — Sent messages remain available after page refresh

| Field               | Value                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-MSG-006-01                                                                                               |
| Title               | Sent messages remain available after page refresh                                                           |
| Related Scenario    | SCN-MSG-006 [SCN-MSG-006](../scenarios/messaging.md#scn-msg-006--message-persistence)                       |
| Related Requirement | REQ-MSG-003 [Messaging Requirements](../../docs/requirements/messaging.md#req-msg-003--message-persistence) |
| Related Risk        | RSK-004 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                 |
| Risk Level          | High                                                                                                        |
| Test Design Method  | Requirement-Based                                                                                           |
| Test Type           | Functional / Persistence                                                                                    |
| Priority            | High                                                                                                        |

#### Preconditions

- User A is authenticated.
- User A has access to an existing conversation.

#### Test Data

| Data         | Value                               |
| ------------ | ----------------------------------- |
| Message      | Persistence check MSG-006-01        |
| Conversation | An existing authorized conversation |

#### Steps

1. Open the conversation.
2. Send the test message.
3. Verify that the message appears in the conversation.
4. Refresh the page.
5. Reopen the same conversation if necessary.
6. Locate the test message and compare its content with the original input.

#### Expected Result

- The sent message remains available after refresh.
- The message content remains unchanged.
- The message remains associated with the correct conversation.

---

### TC-MSG-006-02 — Sent messages remain available after logout and re-login

| Field               | Value                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-MSG-006-02                                                                                               |
| Title               | Sent messages remain available after logout and re-login                                                    |
| Related Scenario    | SCN-MSG-006 [SCN-MSG-006](../scenarios/messaging.md#scn-msg-006--message-persistence)                       |
| Related Requirement | REQ-MSG-003 [Messaging Requirements](../../docs/requirements/messaging.md#req-msg-003--message-persistence) |
| Related Risk        | RSK-004 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                 |
| Risk Level          | High                                                                                                        |
| Test Design Method  | Requirement-Based                                                                                           |
| Test Type           | Functional / Persistence                                                                                    |
| Priority            | High                                                                                                        |

#### Preconditions

- User A is authenticated.
- User A has access to an existing conversation.

#### Test Data

| Data         | Value                               |
| ------------ | ----------------------------------- |
| Message      | Persistence check MSG-006-02        |
| Conversation | An existing authorized conversation |

#### Steps

1. Open the conversation.
2. Send the test message.
3. Verify that the message appears in the conversation.
4. Log out.
5. Log in again as User A.
6. Reopen the same conversation.
7. Locate the test message and compare its content with the original input.

#### Expected Result

- The sent message remains available after re-login.
- The message content remains unchanged.
- The message remains associated with the correct conversation.

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

- User A is authenticated.
- An existing conversation contains enough messages to require scrolling.
- The latest message is not fully visible when the conversation history is positioned at the top.

#### Test Data

| Data           | Value                                                  |
| -------------- | ------------------------------------------------------ |
| Conversation   | An existing conversation with multiple messages        |
| Latest message | A distinguishable message at the bottom of the history |

#### Steps

1. Navigate away from the conversation.
2. Open the conversation again.
3. Observe the initial scroll position.
4. Verify whether the latest message is visible.

#### Expected Result

- The conversation automatically scrolls to the latest message when opened.
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

- User A is authenticated.
- User A has access to an existing conversation containing enough messages to require scrolling.

#### Test Data

| Data    | Value                       |
| ------- | --------------------------- |
| Message | Latest message scroll check |

#### Steps

1. Open the conversation.
2. Scroll away from the bottom of the conversation history.
3. Enter the test message.
4. Submit the message.
5. Observe the conversation scroll position.

#### Expected Result

- After the message is sent, the conversation automatically scrolls to the latest message.
- The newly sent message is visible.

---

### TC-MSG-008-01 — Message timestamps use the documented format

| Field               | Value                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Test Case ID        | TC-MSG-008-01                                                                                                                  |
| Title               | Message timestamps use the documented format                                                                                   |
| Related Scenario    | SCN-MSG-008 [SCN-MSG-008](../scenarios/messaging.md#scn-msg-008--message-timestamps-and-date-separators)                       |
| Related Requirement | REQ-MSG-005 [Messaging Requirements](../../docs/requirements/messaging.md#req-msg-005--message-timestamps-and-date-separators) |
| Related Risk        | RSK-018 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                    |
| Risk Level          | Low                                                                                                                            |
| Test Design Method  | Requirement-Based                                                                                                              |
| Test Type           | Functional / UI                                                                                                                |
| Priority            | Low                                                                                                                            |

#### Preconditions

- User A is authenticated.
- An existing conversation contains messages with available timestamps.

#### Test Data

| Data            | Value                                             |
| --------------- | ------------------------------------------------- |
| Message history | Multiple messages with distinguishable timestamps |

#### Steps

1. Open the conversation.
2. Inspect the timestamp displayed under each message bubble.
3. Compare the displayed timestamp format with the documented format.

#### Expected Result

- Each message bubble displays its timestamp.
- Timestamps use the 24-hour `HH.mm` format.
- A period separates the hours and minutes.

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

- User A is authenticated.
- The conversation contains messages from multiple calendar dates.
- The message dates can be reliably identified.
- The user's local date and time zone are known for the test.

#### Test Data

| Data Variation               | Value                                        |
| ---------------------------- | -------------------------------------------- |
| Current local calendar date  | Messages sent on the current local date      |
| Previous local calendar date | Messages sent on the previous local date     |
| Older calendar date          | Messages sent before the previous local date |

#### Steps

1. Open the conversation.
2. Identify the date separator associated with messages from the current local calendar date.
3. Identify the date separator associated with messages from the previous local calendar date.
4. Identify the date separator associated with older messages.
5. Compare each displayed separator with the corresponding message date using the user's local calendar date.

#### Expected Result

- Messages from the current local calendar date are grouped under `Today`.
- Messages from the previous local calendar date are grouped under `Yesterday`.
- Messages from earlier calendar dates use the `DD Mmm` format.
- Date classification follows the user's local calendar date rather than elapsed time alone.

---

### TC-MSG-009-01 — Message becomes available to the recipient after refresh

| Field               | Value                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-MSG-009-01                                                                                                   |
| Title               | Message becomes available to the recipient after refresh                                                        |
| Related Scenario    | SCN-MSG-009 [SCN-MSG-009](../scenarios/messaging.md#scn-msg-009--message-availability-after-recipient-refresh)  |
| Related Requirement | REQ-MSG-007 [REQ-MSG-007](../../docs/requirements/messaging.md#req-msg-007--message-availability-after-refresh) |
| Related Risk        | RSK-004 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                     |
| Risk Level          | High                                                                                                            |
| Test Design Method  | Requirement-Based / Risk-Based                                                                                  |
| Test Type           | Functional / Multi-User / Persistence                                                                           |
| Priority            | High                                                                                                            |

#### Preconditions

- Relay is accessible.
- User A and User B have separate authenticated sessions.
- User A and User B have access to the same conversation.
- User B has the shared conversation open before User A sends a new message.
- The two users can access Relay through separate browser contexts or devices without interfering with each other's authenticated sessions.

#### Test Data

| Data         | Value                                         |
| ------------ | --------------------------------------------- |
| Sender       | User A                                        |
| Recipient    | User B                                        |
| Conversation | An existing conversation shared by both users |
| Message      | Message availability after recipient refresh  |

#### Steps

1. Open the shared conversation as User B and leave it open.
2. Open the same conversation as User A in a separate browser context or device.
3. Send the test message as User A.
4. Observe User B's already-open conversation view without refreshing it.
5. Refresh the conversation as User B.
6. Inspect the conversation history and verify the new message's position.

#### Expected Result

- The newly sent message does not appear automatically in User B's already-open conversation view.
- After User B refreshes the conversation, the newly sent message becomes available.
- The message is displayed in the conversation history in the documented chronological order, with older messages above newer messages.
- The message remains associated with the shared conversation.

---

## 5. Scenario-to-Test Case Traceability

This table maps each approved messaging scenario to the test cases designed to verify it. Requirement and risk IDs are included to make the coverage relationship reviewable without creating a separate risk-to-test-case traceability section.

| Scenario ID | Related Requirement ID(s) | Related Risk ID(s) | Test Case ID(s)                                            |
| ----------- | ------------------------- | ------------------ | ---------------------------------------------------------- |
| SCN-MSG-001 | REQ-MSG-001               | RSK-007            | TC-MSG-001-01                                              |
| SCN-MSG-002 | REQ-MSG-001, REQ-MSG-006  | RSK-007, RSK-012   | TC-MSG-002-01, TC-MSG-002-02, TC-MSG-002-03, TC-MSG-002-04 |
| SCN-MSG-003 | REQ-MSG-001               | RSK-007            | TC-MSG-003-01                                              |
| SCN-MSG-004 | REQ-MSG-002               | RSK-008            | TC-MSG-004-01                                              |
| SCN-MSG-005 | REQ-MSG-002               | RSK-008            | TC-MSG-005-01, TC-MSG-005-02, TC-MSG-005-03                |
| SCN-MSG-006 | REQ-MSG-003               | RSK-004            | TC-MSG-006-01, TC-MSG-006-02                               |
| SCN-MSG-007 | REQ-MSG-004               | RSK-017            | TC-MSG-007-01, TC-MSG-007-02                               |
| SCN-MSG-008 | REQ-MSG-005               | RSK-018            | TC-MSG-008-01, TC-MSG-008-02                               |
| SCN-MSG-009 | REQ-MSG-007               | RSK-004            | TC-MSG-009-01                                              |

The test cases are designed for subsequent execution and may be refined during review. Their presence in this document does not imply that they have been executed or passed.
