# Relay — Conversation Test Cases

## 1. Purpose

This document defines the detailed conversation test cases derived from Relay's approved conversation scenarios, documented conversation requirements, product scope, and risk assessment.

The test cases translate the approved scenarios into repeatable verification steps with explicit preconditions, test data, expected results, and traceability. They describe test design only; execution outcomes and evidence are recorded separately.

---

## 2. Test Case Design Approach

Conversation test cases are derived from the following sources:

- Product scope
- Conversation requirements
- Risk assessment
- Approved conversation scenarios

The design covers one-to-one conversation access, conversation creation and retrieval, self-conversation prevention, conversation list information, latest-message previews, activity timestamps, conversation ordering, and the documented error state for nonexistent conversations.

Test cases inherit their scope from the approved scenarios but map only to requirements and risks directly relevant to the behavior being verified. Risk level informs execution priority; it does not determine the number of test cases required.

Expected results follow the documented requirements and approved scenarios. Where the requirements do not specify implementation details, such as exact API endpoints, request field names, or HTTP status codes, this document does not invent an acceptance criterion.

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

For example, `TC-CONV-001-01` identifies the first test case derived from `SCN-CONV-001`. An additional test case derived from the same scenario would use `TC-CONV-001-02`.

The test case ID must remain unique within the test case repository and maintain a clear reference to its parent scenario.

Execution-specific information such as browser environment, browser version, operating system, execution mode, actual result, status, evidence, and defect ID is recorded separately during test execution.

---

## 4. Conversation Test Cases

### TC-CONV-001-01 — Authorized participants can access their one-to-one conversation

| Field               | Value                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-CONV-001-01                                                                                              |
| Title               | Authorized participants can access their one-to-one conversation                                            |
| Related Scenario    | SCN-CONV-001 [SCN-CONV-001](../scenarios/conversation.md#scn-conv-001--one-to-one-conversation)             |
| Related Requirement | REQ-CONV-001 [REQ-CONV-001](../../docs/requirements/conversation.md#req-conv-001--one-to-one-conversations) |
| Related Risk        | RSK-005 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                 |
| Risk Level          | High                                                                                                        |
| Test Design Method  | Requirement-Based                                                                                           |
| Test Type           | Functional / Positive                                                                                       |
| Priority            | High                                                                                                        |

#### Preconditions

- Relay is accessible.
- User A and User B are registered users.
- An existing one-to-one conversation between User A and User B is available.
- Valid credentials for both users are available.

#### Test Data

| Data         | Value                                       |
| ------------ | ------------------------------------------- |
| User A       | Alice (`alice@example.com`)                 |
| User B       | Bob (`bob@example.com`)                     |
| Conversation | Existing conversation between Alice and Bob |
| Credentials  | Valid credentials for each user             |

#### Steps

1. Open Relay and sign in as User A.
2. Navigate to the existing conversation between User A and User B.
3. Verify that the conversation can be accessed and its content is displayed.
4. Log out of User A's session.
5. Sign in as User B.
6. Navigate to the same conversation.
7. Verify that User B can also access the conversation.

#### Expected Result

- Both authorized participants can access the existing one-to-one conversation.
- The conversation corresponds to the intended user pair.
- The conversation content is displayed to each authorized participant.

---

### TC-CONV-002-01 — User can create a conversation with another user when no conversation exists

| Field               | Value                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-CONV-002-01                                                                                                         |
| Title               | User can create a conversation with another user when no conversation exists                                           |
| Related Scenario    | SCN-CONV-002 [SCN-CONV-002](../scenarios/conversation.md#scn-conv-002--conversation-creation-and-retrieval)            |
| Related Requirement | REQ-CONV-002 [REQ-CONV-002](../../docs/requirements/conversation.md#req-conv-002--conversation-creation-and-retrieval) |
| Related Risk        | RSK-005 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                            |
| Risk Level          | High                                                                                                                   |
| Test Design Method  | Requirement-Based                                                                                                      |
| Test Type           | Functional / Positive                                                                                                  |
| Priority            | High                                                                                                                   |

#### Preconditions

- Relay is accessible.
- User A and User B are registered users.
- No existing conversation exists between User A and User B.
- User A's valid credentials are available.
- The supported conversation creation workflow is known.

#### Test Data

| Data                     | Value                                          |
| ------------------------ | ---------------------------------------------- |
| Initiating User          | Alice (`alice@example.com`)                    |
| Conversation Counterpart | Bob (`bob@example.com`)                        |
| Initial State            | No existing conversation between Alice and Bob |

#### Steps

1. Sign in as User A.
2. Navigate to the supported workflow for starting a conversation with another user.
3. Select User B as the conversation counterpart.
4. Complete the supported conversation creation action.
5. Observe the resulting conversation and conversation list.

#### Expected Result

- A conversation between User A and User B is created according to the documented behavior.
- The resulting conversation corresponds to the intended user pair.
- The conversation is available to the initiating user.

---

### TC-CONV-002-02 — Existing conversation is retrieved instead of creating a duplicate

| Field               | Value                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-CONV-002-02                                                                                                         |
| Title               | Existing conversation is retrieved instead of creating a duplicate                                                     |
| Related Scenario    | SCN-CONV-002 [SCN-CONV-002](../scenarios/conversation.md#scn-conv-002--conversation-creation-and-retrieval)            |
| Related Requirement | REQ-CONV-002 [REQ-CONV-002](../../docs/requirements/conversation.md#req-conv-002--conversation-creation-and-retrieval) |
| Related Risk        | RSK-005 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                            |
| Risk Level          | High                                                                                                                   |
| Test Design Method  | Requirement-Based / Risk-Based                                                                                         |
| Test Type           | Functional / Data Integrity                                                                                            |
| Priority            | High                                                                                                                   |

#### Preconditions

- Relay is accessible.
- User A and User B are registered users.
- An existing conversation between User A and User B is available.
- User A's valid credentials are available.

#### Test Data

| Data                     | Value                                           |
| ------------------------ | ----------------------------------------------- |
| Initiating User          | Alice (`alice@example.com`)                     |
| Conversation Counterpart | Bob (`bob@example.com`)                         |
| Initial State            | One existing conversation between Alice and Bob |

#### Steps

1. Sign in as User A.
2. Record the existing conversation between User A and User B.
3. Start another conversation with User B using the supported workflow.
4. Observe the resulting conversation.
5. Compare the resulting conversation with the previously existing conversation.

#### Expected Result

- Relay returns or opens the existing conversation for the same user pair.
- A duplicate conversation is not created for that pair.
- The resulting conversation corresponds to the existing conversation.

---

### TC-CONV-003-01 — User cannot create a conversation with themselves through the UI

| Field               | Value                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-CONV-003-01                                                                                                   |
| Title               | User cannot create a conversation with themselves through the UI                                                 |
| Related Scenario    | SCN-CONV-003 [SCN-CONV-003](../scenarios/conversation.md#scn-conv-003--self-conversation-prevention)             |
| Related Requirement | REQ-CONV-007 [REQ-CONV-007](../../docs/requirements/conversation.md#req-conv-007--self-conversation-restriction) |
| Related Risk        | RSK-013 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                      |
| Risk Level          | Medium                                                                                                           |
| Test Design Method  | Requirement-Based / Risk-Based                                                                                   |
| Test Type           | Functional / Negative                                                                                            |
| Priority            | Medium                                                                                                           |

#### Preconditions

- Relay is accessible.
- User A is a registered user.
- User A's valid credentials are available.
- The UI workflow for starting a conversation is available.

#### Test Data

| Data                 | Value                       |
| -------------------- | --------------------------- |
| Authenticated User   | Alice (`alice@example.com`) |
| Selected Counterpart | Alice (`alice@example.com`) |

#### Steps

1. Sign in as User A.
2. Open the supported workflow for starting a conversation.
3. Attempt to select User A as the conversation counterpart.
4. If the UI permits the selection, attempt to complete the conversation creation action.
5. Observe the resulting application state.

#### Expected Result

- Relay prevents User A from creating a conversation with themselves.
- A self-conversation is not created.

---

### TC-CONV-003-02 — API request cannot create a conversation with the same user as both participants

| Field               | Value                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-CONV-003-02                                                                                                   |
| Title               | API request cannot create a conversation with the same user as both participants                                 |
| Related Scenario    | SCN-CONV-003 [SCN-CONV-003](../scenarios/conversation.md#scn-conv-003--self-conversation-prevention)             |
| Related Requirement | REQ-CONV-007 [REQ-CONV-007](../../docs/requirements/conversation.md#req-conv-007--self-conversation-restriction) |
| Related Risk        | RSK-013 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                      |
| Risk Level          | Medium                                                                                                           |
| Test Design Method  | Requirement-Based / Risk-Based                                                                                   |
| Test Type           | API / Negative                                                                                                   |
| Priority            | Medium                                                                                                           |

#### Preconditions

- Relay is accessible.
- User A is a registered user.
- User A's valid authentication context is available.
- The documented conversation creation API operation and request contract are identified.

#### Test Data

| Data                   | Value                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| Authenticated User     | Alice (`alice@example.com`)                                                                                  |
| Participant Identity   | Alice (`alice@example.com`)                                                                                  |
| Authentication Context | Valid authentication context for User A                                                                      |
| Request                | Conversation creation request using the same user as both participants, if supported by the request contract |

#### Steps

1. Authenticate as User A and prepare a request for the documented conversation creation operation.
2. Construct a request that attempts to use User A as both participants, using only fields supported by the request contract.
3. Submit the request.
4. Inspect the response and verify whether a self-conversation was created.

#### Expected Result

- Relay prevents creation of a self-conversation through the API.
- No self-conversation is created.
- The exact HTTP status code is not specified here and must not be assumed without support from the API contract.

---

### TC-CONV-004-01 — Conversation list displays the correct counterpart name

| Field               | Value                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-CONV-004-01                                                                                                   |
| Title               | Conversation list displays the correct counterpart name                                                          |
| Related Scenario    | SCN-CONV-004 [SCN-CONV-004](../scenarios/conversation.md#scn-conv-004--conversation-counterpart-name)            |
| Related Requirement | REQ-CONV-003 [REQ-CONV-003](../../docs/requirements/conversation.md#req-conv-003--conversation-counterpart-name) |
| Related Risk        | RSK-011 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                      |
| Risk Level          | Medium                                                                                                           |
| Test Design Method  | Requirement-Based                                                                                                |
| Test Type           | Functional / UI                                                                                                  |
| Priority            | Medium                                                                                                           |

#### Preconditions

- Relay is accessible.
- User A and User B are registered users.
- An existing conversation between User A and User B is available.
- The counterpart's displayed name is known.

#### Test Data

| Data                      | Value                       |
| ------------------------- | --------------------------- |
| Authenticated User        | Alice (`alice@example.com`) |
| Conversation Counterpart  | Bob (`bob@example.com`)     |
| Expected Counterpart Name | Bob                         |

#### Steps

1. Sign in as User A.
2. Open the conversation list.
3. Locate the conversation between User A and User B.
4. Observe the counterpart name displayed for that conversation.
5. Compare the displayed name with User B's expected name.

#### Expected Result

- The conversation list displays the name of the other participant.
- The displayed name corresponds to User B, not User A or an unrelated user.

---

### TC-CONV-005-01 — Conversation list displays the latest message preview

| Field               | Value                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-CONV-005-01                                                                                                                |
| Title               | Conversation list displays the latest message preview                                                                         |
| Related Scenario    | SCN-CONV-005 [SCN-CONV-005](../scenarios/conversation.md#scn-conv-005--latest-message-preview-and-empty-conversation-preview) |
| Related Requirement | REQ-CONV-004 [REQ-CONV-004](../../docs/requirements/conversation.md#req-conv-004--latest-message-preview)                     |
| Related Risk        | RSK-011 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                   |
| Risk Level          | Medium                                                                                                                        |
| Test Design Method  | Requirement-Based                                                                                                             |
| Test Type           | Functional / UI                                                                                                               |
| Priority            | Medium                                                                                                                        |

#### Preconditions

- Relay is accessible.
- User A and User B have an existing conversation.
- The conversation contains at least two messages with distinguishable content.
- The latest message is known.

#### Test Data

| Data            | Value                           |
| --------------- | ------------------------------- |
| User A          | Alice (`alice@example.com`)     |
| User B          | Bob (`bob@example.com`)         |
| Earlier Message | `Previous conversation message` |
| Latest Message  | `Latest conversation message`   |

#### Steps

1. Ensure that the conversation contains the earlier message and the latest message in the specified order.
2. Sign in as a participant in the conversation.
3. Open the conversation list.
4. Locate the conversation.
5. Observe the message preview displayed for the conversation.

#### Expected Result

- The conversation list displays the latest message as the conversation preview.
- The preview corresponds to `Latest conversation message`, not the earlier message.

---

### TC-CONV-005-02 — Empty conversation displays the documented empty preview

| Field               | Value                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-CONV-005-02                                                                                                                |
| Title               | Empty conversation displays the documented empty preview                                                                      |
| Related Scenario    | SCN-CONV-005 [SCN-CONV-005](../scenarios/conversation.md#scn-conv-005--latest-message-preview-and-empty-conversation-preview) |
| Related Requirement | REQ-CONV-004 [REQ-CONV-004](../../docs/requirements/conversation.md#req-conv-004--latest-message-preview)                     |
| Related Risk        | RSK-015 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                   |
| Risk Level          | Medium                                                                                                                        |
| Test Design Method  | Requirement-Based                                                                                                             |
| Test Type           | Functional / Empty State                                                                                                      |
| Priority            | Medium                                                                                                                        |

#### Preconditions

- Relay is accessible.
- User A and User B have an existing conversation.
- The conversation contains no messages.
- User A's valid credentials are available.

#### Test Data

| Data               | Value                       |
| ------------------ | --------------------------- |
| User A             | Alice (`alice@example.com`) |
| User B             | Bob (`bob@example.com`)     |
| Conversation State | Empty; no messages          |
| Expected Preview   | `No messages yet.`          |

#### Steps

1. Sign in as User A.
2. Open the conversation list.
3. Locate the empty conversation between User A and User B.
4. Observe the message preview displayed for that conversation.

#### Expected Result

- The conversation list displays `No messages yet.` for the empty conversation.
- The empty conversation does not display a message preview that implies a message exists.

---

### TC-CONV-005-03 — Long latest-message preview is displayed on one line and truncated with an ellipsis

| Field               | Value                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-CONV-005-03                                                                                                                |
| Title               | Long latest-message preview is displayed on one line and truncated with an ellipsis                                           |
| Related Scenario    | SCN-CONV-005 [SCN-CONV-005](../scenarios/conversation.md#scn-conv-005--latest-message-preview-and-empty-conversation-preview) |
| Related Requirement | REQ-CONV-004 [REQ-CONV-004](../../docs/requirements/conversation.md#req-conv-004--latest-message-preview)                     |
| Related Risk        | RSK-011 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                   |
| Risk Level          | Medium                                                                                                                        |
| Test Design Method  | Requirement-Based / Boundary-Oriented                                                                                         |
| Test Type           | Functional / UI / Boundary                                                                                                    |
| Priority            | Medium                                                                                                                        |

#### Preconditions

- Relay is accessible.
- User A and User B have an existing conversation.
- The conversation contains a long latest message that exceeds the available preview width.
- User A's valid credentials are available.

#### Test Data

| Data           | Value                                                                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| User A         | Alice (`alice@example.com`)                                                                                                              |
| User B         | Bob (`bob@example.com`)                                                                                                                  |
| Latest Message | `This is a deliberately long message used to verify how the conversation preview handles text that exceeds the available display width.` |

#### Steps

1. Ensure that the long test message is the latest message in the conversation.
2. Sign in as User A.
3. Open the conversation list.
4. Locate the conversation.
5. Observe the preview's line layout and truncation.

#### Expected Result

- The preview is displayed on a single line.
- Text exceeding the available preview width is truncated with an ellipsis.
- The conversation list remains readable without the preview expanding onto multiple lines.

---

### TC-CONV-006-01 — Conversation activity timestamp uses the documented format for today, yesterday, and older dates

| Field               | Value                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-CONV-006-01                                                                                            |
| Title               | Conversation activity timestamp uses the documented format for today, yesterday, and older dates          |
| Related Scenario    | SCN-CONV-006 [SCN-CONV-006](../scenarios/conversation.md#scn-conv-006--conversation-activity-timestamp)   |
| Related Requirement | REQ-CONV-005 [REQ-CONV-006](../../docs/requirements/conversation.md#req-conv-005--conversation-timestamp) |
| Related Risk        | RSK-011 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                               |
| Risk Level          | Medium                                                                                                    |
| Test Design Method  | Requirement-Based / Boundary-Oriented                                                                     |
| Test Type           | Functional / Date-Time                                                                                    |
| Priority            | Medium                                                                                                    |

#### Preconditions

- Relay is accessible.
- Test conversations with known latest-activity dates are available.
- The user's local date and time are known.
- The expected local calendar date for each test conversation can be established.

#### Test Data

| Data                       | Value                                              |
| -------------------------- | -------------------------------------------------- |
| Activity Today             | Activity on the user's current local calendar date |
| Activity Yesterday         | Activity on the previous local calendar date       |
| Older Activity             | Activity before the previous local calendar date   |
| Expected Today Format      | `HH.MM`                                            |
| Expected Yesterday Format  | `Yesterday`                                        |
| Expected Older-Date Format | `DD Mmm`                                           |

#### Steps

1. Sign in to Relay.
2. Open the conversation list.
3. Locate the conversation whose latest activity occurred today.
4. Verify that its activity timestamp uses the `HH.MM` format.
5. Locate the conversation whose latest activity occurred yesterday.
6. Verify that its activity timestamp displays `Yesterday`.
7. Locate the conversation whose latest activity occurred before yesterday.
8. Verify that its activity timestamp uses the `DD Mmm` format.

#### Expected Result

- Activity occurring today is displayed in `HH.MM` format.
- Activity from the previous local calendar day is displayed as `Yesterday`.
- Older activity is displayed in `DD Mmm` format.
- The displayed classification corresponds to the user's local calendar date.

---

### TC-CONV-007-01 — Sending a message updates conversation ordering by latest activity

| Field               | Value                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-CONV-007-01                                                                                                   |
| Title               | Sending a message updates conversation ordering by latest activity                                               |
| Related Scenario    | SCN-CONV-007 [SCN-CONV-007](../scenarios/conversation.md#scn-conv-007--conversation-ordering-by-latest-activity) |
| Related Requirement | REQ-CONV-006 [REQ-CONV-006](../../docs/requirements/conversation.md#req-conv-006--conversation-ordering)         |
| Related Risk        | RSK-008 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                      |
| Risk Level          | Medium                                                                                                           |
| Test Design Method  | Requirement-Based                                                                                                |
| Test Type           | Functional / Ordering                                                                                            |
| Priority            | Medium                                                                                                           |

#### Preconditions

- Relay is accessible.
- User A has at least two conversations with distinguishable latest-activity ordering.
- User A is a participant in both conversations.
- Valid credentials for User A are available.

#### Test Data

| Data           | Value                                           |
| -------------- | ----------------------------------------------- |
| User A         | Alice (`alice@example.com`)                     |
| Conversation 1 | Existing conversation between Alice and Bob     |
| Conversation 2 | Existing conversation between Alice and Charlie |
| New Message    | `Conversation ordering verification message`    |

#### Steps

1. Sign in as User A.
2. Open the conversation list and record the initial order of the two conversations.
3. Open the conversation that is currently lower in the list.
4. Send the new test message.
5. Return to the conversation list.
6. Observe the relative order of the two conversations.

#### Expected Result

- Sending a message updates the conversation's activity ordering.
- The conversation with the latest activity appears ahead of the conversation with older activity.
- The displayed order is consistent with the latest-activity rule.

---

### TC-CONV-007-02 — Newly created empty conversation can appear at the top of the conversation list

| Field               | Value                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-CONV-007-02                                                                                                   |
| Title               | Newly created empty conversation can appear at the top of the conversation list                                  |
| Related Scenario    | SCN-CONV-007 [SCN-CONV-007](../scenarios/conversation.md#scn-conv-007--conversation-ordering-by-latest-activity) |
| Related Requirement | REQ-CONV-006 [REQ-CONV-006](../../docs/requirements/conversation.md#req-conv-006--conversation-ordering)         |
| Related Risk        | RSK-008 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                      |
| Risk Level          | Medium                                                                                                           |
| Test Design Method  | Requirement-Based                                                                                                |
| Test Type           | Functional / Ordering                                                                                            |
| Priority            | Medium                                                                                                           |

#### Preconditions

- Relay is accessible.
- User A has at least one existing conversation.
- User A and User C are registered users.
- No conversation exists between User A and User C.
- User A's valid credentials are available.

#### Test Data

| Data                         | Value                                                            |
| ---------------------------- | ---------------------------------------------------------------- |
| User A                       | Alice (`alice@example.com`)                                      |
| New Conversation Counterpart | Charlie (`charlie@example.com`)                                  |
| Initial State                | At least one existing conversation; no conversation with Charlie |
| New Conversation State       | Created with no messages                                         |

#### Steps

1. Sign in as User A.
2. Open the conversation list and observe the existing conversation order.
3. Create a conversation with User C through the supported workflow.
4. Do not send any messages in the new conversation.
5. Return to the conversation list.
6. Observe the position of the newly created empty conversation.

#### Expected Result

- Creating the conversation counts as activity even when it contains no messages.
- The newly created empty conversation can appear at the top of the conversation list according to the documented ordering behavior.
- The new conversation is not required to contain a message to be considered recent activity.

---

### TC-CONV-008-01 — Accessing a nonexistent conversation displays the documented error state

| Field               | Value                                                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-CONV-008-01                                                                                                          |
| Title               | Accessing a nonexistent conversation displays the documented error state                                                |
| Related Scenario    | SCN-CONV-008 [SCN-CONV-008](../scenarios/conversation.md#scn-conv-008--nonexistent-conversation-error-state)            |
| Related Requirement | REQ-CONV-008 [REQ-CONV-008](../../docs/requirements/conversation.md#req-conv-008--invalid-or-non-existent-conversation) |
| Related Risk        | RSK-009 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                             |
| Risk Level          | Medium                                                                                                                  |
| Test Design Method  | Requirement-Based                                                                                                       |
| Test Type           | Functional / Error Handling / Negative                                                                                  |
| Priority            | Medium                                                                                                                  |

#### Preconditions

- Relay is accessible.
- User A is authenticated.
- A method for navigating to a conversation reference is available.
- The target conversation reference is confirmed not to correspond to an existing conversation.

#### Test Data

| Data                | Value                                           |
| ------------------- | ----------------------------------------------- |
| Authenticated User  | Alice (`alice@example.com`)                     |
| Target Conversation | A confirmed nonexistent conversation            |
| Expected Heading    | `This page couldn’t load`                       |
| Expected Message    | `A server error occurred. Reload to try again.` |
| Expected Control    | `Reload` button                                 |

#### Steps

1. Sign in to Relay as User A.
2. Navigate to the supported conversation route or reference for the confirmed nonexistent conversation.
3. Observe the resulting page.
4. Verify the displayed error heading.
5. Verify the displayed error message.
6. Verify the presence of the `Reload` button.

#### Expected Result

- The heading `This page couldn’t load` is displayed.
- The message `A server error occurred. Reload to try again.` is displayed.
- A `Reload` button is available.
- The error state matches the documented behavior for a nonexistent conversation.

---

## 5. Scenario-to-Test Case Traceability

This table maps each approved conversation scenario to the test cases designed to verify it. Requirement and risk IDs are included to make the coverage relationship reviewable without creating a separate risk-to-test-case traceability section.

| Scenario ID  | Related Requirement ID(s) | Related Risk ID(s) | Test Case ID(s)                                |
| ------------ | ------------------------- | ------------------ | ---------------------------------------------- |
| SCN-CONV-001 | REQ-CONV-001              | RSK-005            | TC-CONV-001-01                                 |
| SCN-CONV-002 | REQ-CONV-002              | RSK-005            | TC-CONV-002-01, TC-CONV-002-02                 |
| SCN-CONV-003 | REQ-CONV-007              | RSK-013            | TC-CONV-003-01, TC-CONV-003-02                 |
| SCN-CONV-004 | REQ-CONV-003              | RSK-011            | TC-CONV-004-01                                 |
| SCN-CONV-005 | REQ-CONV-004              | RSK-011, RSK-015   | TC-CONV-005-01, TC-CONV-005-02, TC-CONV-005-03 |
| SCN-CONV-006 | REQ-CONV-005              | RSK-011            | TC-CONV-006-01                                 |
| SCN-CONV-007 | REQ-CONV-006              | RSK-008            | TC-CONV-007-01, TC-CONV-007-02                 |
| SCN-CONV-008 | REQ-CONV-008              | RSK-009            | TC-CONV-008-01                                 |

The test cases are designed for subsequent execution and may be refined during review. Their presence in this document does not imply that they have been executed or passed.
