# Relay — Authorization Test Cases

## 1. Purpose

This document defines the detailed authorization test cases derived from Relay's approved authorization scenarios, documented authorization requirements, product scope, and risk assessment.

The test cases translate the approved scenarios into repeatable verification steps with explicit preconditions, test data, expected results, and traceability. They describe test design only; execution outcomes and evidence are recorded separately.

---

## 2. Test Case Design Approach

Authorization test cases are derived from the following sources:

- Product scope
- Authorization requirements
- Risk assessment
- Approved authorization scenarios

The design considers authorized and unauthorized conversation access, client-provided identity manipulation, message sender identity, and server-side authorization enforcement where supported by the documented requirements.

Test cases inherit their scope from the approved scenarios but map only to the requirements and risks directly relevant to the behavior being verified. Risk level informs execution priority; it does not determine the number of test cases required.

Expected results are based on the documented authorization requirements. Where a requirement does not specify implementation details, such as exact API endpoint names, request field names, or HTTP status codes, this document does not invent an acceptance criterion.

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

For example, `TC-AUTHZ-001-01` identifies the first test case derived from `SCN-AUTHZ-001`. An additional test case derived from the same scenario would use `TC-AUTHZ-001-02`.

The test case ID must remain unique within the test case repository and maintain a clear reference to its parent scenario.

Execution-specific information such as browser environment, browser version, operating system, execution mode, actual result, status, evidence, and defect ID is recorded separately during test execution.

---

## 4. Authorization Test Cases

### TC-AUTHZ-001-01 — Authorized user accesses an existing conversation

| Field               | Value                                                                                                                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Test Case ID        | TC-AUTHZ-001-01                                                                                                                                                                                                                                                    |
| Title               | Authorized user accesses an existing conversation                                                                                                                                                                                                                  |
| Related Scenario    | SCN-AUTHZ-001 [SCN-AUTHZ-001](../scenarios/authorization.md#scn-authz-001--authorized-conversation-access)                                                                                                                                                         |
| Related Requirement | REQ-AUTHZ-001 [REQ-AUTHZ-001](../../docs/requirements/authorization.md#req-authz-001--conversation-access-based-on-user-relationship), REQ-AUTHZ-002 [REQ-AUTHZ-002](../../docs/requirements/authorization.md#req-authz-002--authorized-conversation-participants) |
| Related Risk        | RSK-001 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                                                                                                                                                        |
| Risk Level          | High                                                                                                                                                                                                                                                               |
| Test Design Method  | Requirement-Based                                                                                                                                                                                                                                                  |
| Test Type           | Functional / Positive                                                                                                                                                                                                                                              |
| Priority            | High                                                                                                                                                                                                                                                               |

#### Preconditions

- Relay is accessible.
- User A and User B are registered users.
- An existing conversation between User A and User B is available.
- User A's valid credentials are available.

#### Test Data

| Data              | Value                                       |
| ----------------- | ------------------------------------------- |
| Authorized User   | User A — Alice (`alice@example.com`)        |
| Other Participant | User B — Bob (`bob@example.com`)            |
| Conversation      | Existing conversation between Alice and Bob |
| Credentials       | Valid credentials for User A                |

#### Steps

1. Open the Relay application.
2. Sign in as User A using valid credentials.
3. Navigate to the existing conversation between User A and User B.
4. Observe the conversation and its displayed content.

#### Expected Result

- User A can access the existing conversation.
- The conversation content is displayed to User A.
- The displayed conversation corresponds to the conversation between User A and User B.

---

### TC-AUTHZ-002-01 — Non-participant cannot access another user's conversation through direct navigation

| Field               | Value                                                                                                                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Test Case ID        | TC-AUTHZ-002-01                                                                                                                                                                                                                                                    |
| Title               | Non-participant cannot access another user's conversation through direct navigation                                                                                                                                                                                |
| Related Scenario    | SCN-AUTHZ-002 [SCN-AUTHZ-002](../scenarios/authorization.md#scn-authz-002--unauthorized-conversation-access)                                                                                                                                                       |
| Related Requirement | REQ-AUTHZ-001 [REQ-AUTHZ-001](../../docs/requirements/authorization.md#req-authz-001--conversation-access-based-on-user-relationship), REQ-AUTHZ-002 [REQ-AUTHZ-002](../../docs/requirements/authorization.md#req-authz-002--authorized-conversation-participants) |
| Related Risk        | RSK-001 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                                                                                                                                                        |
| Risk Level          | High                                                                                                                                                                                                                                                               |
| Test Design Method  | Requirement-Based / Risk-Based                                                                                                                                                                                                                                     |
| Test Type           | Security / Negative                                                                                                                                                                                                                                                |
| Priority            | High                                                                                                                                                                                                                                                               |

#### Preconditions

- Relay is accessible.
- User A and User B are registered users.
- An existing conversation between User A and User B is available.
- User C is a registered user who is not a participant in that conversation.
- User C's valid credentials are available.
- The application's supported navigation mechanism for opening a conversation is known.

#### Test Data

| Data                | Value                                       |
| ------------------- | ------------------------------------------- |
| Conversation Owner  | User A — Alice (`alice@example.com`)        |
| Other Participant   | User B — Bob (`bob@example.com`)            |
| Authenticated User  | User C — Charlie (`charlie@example.com`)    |
| Target Conversation | Existing conversation between Alice and Bob |
| Credentials         | Valid credentials for User C                |

#### Steps

1. Open the Relay application.
2. Sign in as User C using valid credentials.
3. Attempt to navigate directly to the existing conversation between User A and User B using the application's supported conversation navigation mechanism.
4. Observe whether the target conversation can be accessed and whether its protected content is displayed.

#### Expected Result

- User C cannot access the conversation because User C is not an authorized participant.
- Protected conversation content is not disclosed to User C.
- The application does not grant access merely because the target conversation can be referenced through direct navigation.

---

### TC-AUTHZ-002-02 — API request cannot retrieve conversation data for a non-participant

| Field               | Value                                                                                                                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Test Case ID        | TC-AUTHZ-002-02                                                                                                                                                                                                                                                    |
| Title               | API request cannot retrieve conversation data for a non-participant                                                                                                                                                                                                |
| Related Scenario    | SCN-AUTHZ-002 [SCN-AUTHZ-002](../scenarios/authorization.md#scn-authz-002--unauthorized-conversation-access)                                                                                                                                                       |
| Related Requirement | REQ-AUTHZ-001 [REQ-AUTHZ-001](../../docs/requirements/authorization.md#req-authz-001--conversation-access-based-on-user-relationship), REQ-AUTHZ-002 [REQ-AUTHZ-002](../../docs/requirements/authorization.md#req-authz-002--authorized-conversation-participants) |
| Related Risk        | RSK-001 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                                                                                                                                                        |
| Risk Level          | High                                                                                                                                                                                                                                                               |
| Test Design Method  | Requirement-Based / Risk-Based                                                                                                                                                                                                                                     |
| Test Type           | API / Security / Negative                                                                                                                                                                                                                                          |
| Priority            | High                                                                                                                                                                                                                                                               |

#### Preconditions

- Relay is accessible.
- User A and User B have an existing conversation.
- User C is an authenticated user who is not a participant in that conversation.
- The relevant conversation retrieval API endpoint and request contract are identified.
- A request can be sent using User C's valid authentication context.

#### Test Data

| Data                | Value                                                                  |
| ------------------- | ---------------------------------------------------------------------- |
| Authenticated User  | User C — Charlie (`charlie@example.com`)                               |
| Target Conversation | Existing conversation between Alice and Bob                            |
| Authentication      | Valid authentication context for User C                                |
| API Request         | Conversation retrieval request using the target conversation reference |

#### Steps

1. Authenticate as User C and obtain the valid authentication context required for API requests.
2. Identify the documented API operation used to retrieve the target conversation.
3. Send a request to retrieve the conversation between User A and User B using User C's authentication context.
4. Inspect the response for protected conversation content or other evidence of unauthorized access.

#### Expected Result

- The API does not grant User C access to the target conversation.
- Protected conversation content is not returned to User C.
- The response does not provide unauthorized access to the conversation.
- The exact HTTP status code is not specified by the authorization requirements and must not be invented as an acceptance criterion.

---

### TC-AUTHZ-003-01 — Client-provided user identity does not override the authenticated user's identity

| Field               | Value                                                                                                                |
| ------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTHZ-003-01                                                                                                      |
| Title               | Client-provided user identity does not override the authenticated user's identity                                    |
| Related Scenario    | SCN-AUTHZ-003 [SCN-AUTHZ-003](../scenarios/authorization.md#scn-authz-003--authenticated-user-identity-enforcement)  |
| Related Requirement | REQ-AUTHZ-003 [REQ-AUTHZ-003](../../docs/requirements/authorization.md#req-authz-003--client-provided-user-identity) |
| Related Risk        | RSK-002 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                          |
| Risk Level          | High                                                                                                                 |
| Test Design Method  | Requirement-Based / Risk-Based                                                                                       |
| Test Type           | API / Security / Negative                                                                                            |
| Priority            | High                                                                                                                 |

#### Preconditions

- Relay is accessible.
- User A and User B are registered users.
- User A's valid authentication context is available.
- A protected operation relevant to the authorization requirements is identified.
- The operation's request contract and any supported client-controlled identity fields are understood.

#### Test Data

| Data                      | Value                                                            |
| ------------------------- | ---------------------------------------------------------------- |
| Authenticated User        | User A — Alice (`alice@example.com`)                             |
| Alternative User Identity | User B — Bob (`bob@example.com`)                                 |
| Authentication Context    | Valid authentication context for User A                          |
| Protected Operation       | A documented operation requiring authorization                   |
| Client-Provided Identity  | User B's identity, if the request contract supports such a field |

#### Steps

1. Authenticate as User A and prepare a request for the selected protected operation.
2. Establish the expected behavior using User A's valid authentication context and the documented request contract.
3. Where the request contract permits a client-controlled user identity value, submit a request containing User B's identity while retaining User A's authentication context.
4. Inspect the resulting authorization behavior and the identity used for the authorization decision.

#### Expected Result

- Authorization decisions rely on the authenticated identity of User A rather than treating a client-provided identity as authoritative.
- A client-provided identity value cannot grant User A permissions belonging to User B.
- The protected operation follows the authorization rules applicable to the authenticated user.
- If the selected operation does not accept a client-controlled identity field, no unsupported request field is assumed; the test setup must use a documented operation that allows the behavior to be evaluated.

---

### TC-AUTHZ-004-01 — Message is attributed to the authenticated user

| Field               | Value                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTHZ-004-01                                                                                                 |
| Title               | Message is attributed to the authenticated user                                                                 |
| Related Scenario    | SCN-AUTHZ-004 [SCN-AUTHZ-004](../scenarios/authorization.md#scn-authz-004--message-sender-identity-enforcement) |
| Related Requirement | REQ-AUTHZ-004 [REQ-AUTHZ-004](../../docs/requirements/authorization.md#req-authz-004--message-sender-identity)  |
| Related Risk        | RSK-002 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                     |
| Risk Level          | High                                                                                                            |
| Test Design Method  | Requirement-Based                                                                                               |
| Test Type           | Functional / Positive                                                                                           |
| Priority            | High                                                                                                            |

#### Preconditions

- Relay is accessible.
- User A and User B are registered users.
- A conversation exists between User A and User B.
- User A's valid credentials are available.

#### Test Data

| Data        | Value                                |
| ----------- | ------------------------------------ |
| Sender      | User A — Alice (`alice@example.com`) |
| Recipient   | User B — Bob (`bob@example.com`)     |
| Credentials | Valid credentials for User A         |
| Message     | `Authorization test message 001`     |

#### Steps

1. Open the Relay application.
2. Sign in as User A using valid credentials.
3. Navigate to the existing conversation between User A and User B.
4. Enter the test message.
5. Send the message.
6. Observe the newly created message and its displayed sender identity.

#### Expected Result

- The message is created successfully.
- The message is attributed to User A, the authenticated user who sent it.
- The sender identity displayed for the message corresponds to User A.

---

### TC-AUTHZ-004-02 — Client-provided sender identity cannot override the authenticated sender

| Field               | Value                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTHZ-004-02                                                                                                 |
| Title               | Client-provided sender identity cannot override the authenticated sender                                        |
| Related Scenario    | SCN-AUTHZ-004 [SCN-AUTHZ-004](../scenarios/authorization.md#scn-authz-004--message-sender-identity-enforcement) |
| Related Requirement | REQ-AUTHZ-004 [REQ-AUTHZ-004](../../docs/requirements/authorization.md#req-authz-004--message-sender-identity)  |
| Related Risk        | RSK-002 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                     |
| Risk Level          | High                                                                                                            |
| Test Design Method  | Requirement-Based / Risk-Based                                                                                  |
| Test Type           | API / Security / Negative                                                                                       |
| Priority            | High                                                                                                            |

#### Preconditions

- Relay is accessible.
- User A and User B are registered users.
- A conversation exists in which User A is an authorized participant.
- User A's valid authentication context is available.
- The documented message-creation API operation and request contract are identified.

#### Test Data

| Data                      | Value                                                   |
| ------------------------- | ------------------------------------------------------- |
| Authenticated Sender      | User A — Alice (`alice@example.com`)                    |
| Alternative Sender        | User B — Bob (`bob@example.com`)                        |
| Conversation              | Existing conversation between Alice and Bob             |
| Message                   | `Authorization sender identity test`                    |
| Authentication Context    | Valid authentication context for User A                 |
| Client-Provided Sender ID | User B's identity, if supported by the request contract |

#### Steps

1. Authenticate as User A and prepare a valid message-creation request for the existing conversation.
2. Establish the normal message-creation behavior using User A's authentication context and the documented request contract.
3. Where the request contract permits a client-provided sender identity, submit a message-creation request that specifies User B as the sender while retaining User A's authentication context.
4. Inspect the resulting message and its associated sender identity.

#### Expected Result

- The system derives the message sender identity from the authenticated user.
- A client-provided sender identity cannot override User A's authenticated identity.
- The resulting message is not attributed to User B merely because the client supplied User B's identity.
- If the request contract does not expose a client-provided sender identity field, no unsupported field is assumed; the test setup must use the documented mechanism available for evaluating sender identity enforcement.

---

### TC-AUTHZ-005-01 — Server-side authorization prevents unauthorized access when client-side restrictions are bypassed

| Field               | Value                                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTHZ-005-01                                                                                                   |
| Title               | Server-side authorization prevents unauthorized access when client-side restrictions are bypassed                 |
| Related Scenario    | SCN-AUTHZ-005 [SCN-AUTHZ-005](../scenarios/authorization.md#scn-authz-005--server-side-authorization-enforcement) |
| Related Requirement | REQ-AUTHZ-005 [REQ-AUTHZ-005](../../docs/requirements/authorization.md#req-authz-005--server-side-authorization)  |
| Related Risk        | RSK-001 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                       |
| Risk Level          | High                                                                                                              |
| Test Design Method  | Requirement-Based / Risk-Based                                                                                    |
| Test Type           | API / Security / Negative                                                                                         |
| Priority            | High                                                                                                              |

#### Preconditions

- Relay is accessible.
- User A and User B have an existing conversation.
- User C is authenticated but is not a participant in that conversation.
- The relevant protected API operation and request contract are identified.
- User C's valid authentication context is available.

#### Test Data

| Data                   | Value                                                            |
| ---------------------- | ---------------------------------------------------------------- |
| Authenticated User     | User C — Charlie (`charlie@example.com`)                         |
| Target Conversation    | Existing conversation between Alice and Bob                      |
| Authentication Context | Valid authentication context for User C                          |
| Access Method          | Direct API request without relying on UI navigation restrictions |

#### Steps

1. Sign in as User C and obtain the authentication context required for API requests.
2. Identify a protected API operation that accesses the conversation or its protected resources.
3. Submit a request directly to the API using User C's authentication context and the target conversation reference, without relying on the UI to restrict access.
4. Inspect the response for protected data or evidence that the operation was performed.
5. Confirm whether the server enforced the authorization requirement independently of client-side restrictions.

#### Expected Result

- The server denies User C unauthorized access to the target conversation or its protected resources.
- Protected conversation data is not disclosed.
- Bypassing client-side navigation or visibility restrictions does not grant unauthorized access.
- The exact HTTP status code is not specified by the authorization requirements and must not be invented as an acceptance criterion.

---

## 5. Scenario-to-Test Case Traceability

This table maps each approved authorization scenario to the test cases designed to verify it. Requirement and risk IDs are included to make the coverage relationship reviewable without creating a separate risk-to-test-case traceability section.

| Scenario ID   | Related Requirement ID(s)    | Related Risk ID(s) | Test Case ID(s)                  |
| ------------- | ---------------------------- | ------------------ | -------------------------------- |
| SCN-AUTHZ-001 | REQ-AUTHZ-001, REQ-AUTHZ-002 | RSK-001            | TC-AUTHZ-001-01                  |
| SCN-AUTHZ-002 | REQ-AUTHZ-001, REQ-AUTHZ-002 | RSK-001            | TC-AUTHZ-002-01, TC-AUTHZ-002-02 |
| SCN-AUTHZ-003 | REQ-AUTHZ-003                | RSK-002            | TC-AUTHZ-003-01                  |
| SCN-AUTHZ-004 | REQ-AUTHZ-004                | RSK-002            | TC-AUTHZ-004-01, TC-AUTHZ-004-02 |
| SCN-AUTHZ-005 | REQ-AUTHZ-005                | RSK-001            | TC-AUTHZ-005-01                  |

The test cases are designed for subsequent execution and may be refined during review. Their presence in this document does not imply that they have been executed or passed.
