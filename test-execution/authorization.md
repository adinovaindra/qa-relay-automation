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

| Automation Order | Test Case ID    | Test Case Title                                                                                             | Risk Level | Source Priority | Automation Layer | Automation Decision | Execution Status |
| ---------------: | --------------- | ----------------------------------------------------------------------------------------------------------- | ---------- | --------------- | ---------------- | ------------------- | ---------------- |
|                1 | TC-AUTHZ-001-01 | Authorized user accesses an existing conversation                                                           | High       | High            | UI               | Include             | Passed           |
|                2 | TC-AUTHZ-002-01 | Non-participant cannot access another user's conversation through direct navigation                         | High       | High            | UI               | Include             | Passed           |
|                3 | TC-AUTHZ-002-02 | API request cannot retrieve conversation data for a non-participant                                         | High       | High            | API              | Include             | Passed           |
|                4 | TC-AUTHZ-005-01 | Server-side authorization prevents unauthorized message creation when client-side restrictions are bypassed | High       | High            | API              | Include             | Passed           |
|                5 | TC-AUTHZ-003-01 | Client-provided user identity does not override the authenticated user's identity                           | High       | High            | API              | Include             | Passed           |
|                6 | TC-AUTHZ-004-01 | Message is attributed to the authenticated user                                                             | High       | High            | UI + API         | Include             | Passed           |
|                7 | TC-AUTHZ-004-02 | Client-provided sender identity cannot override the authenticated sender                                    | High       | High            | API              | Include             | Passed           |

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
| Test Cases Implemented             |     7 |
| Test Cases Executed                |     7 |
| Passed                             |     7 |
| Failed                             |     0 |
| Blocked                            |     0 |
| Not Executed                       |     0 |

### 3.2 Summary Notes

- The Authorization automation scope contains 7 selected test cases.
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

#### TC-AUTHZ-001-01 — Authorized user accesses an existing conversation

**Test Case Reference:** [TC-AUTHZ-001-01](../test-design/test-cases/authorization.md#tc-authz-001-01--authorized-user-accesses-an-existing-conversation)
**Scenario Reference:** SCN-AUTHZ-001
**Requirement Reference:** REQ-AUTHZ-001, REQ-AUTHZ-002
**Risk Reference:** RSK-001
**Execution Date:** 2026-11-02

**Environment**

- Application URL: http://localhost:3000
- Browser / Project: Chromium
- Browser Version: 156.0.8078.4 (Official Build) (64-bit)
- Operating System: Windows 11 Pro 25H2
- Execution Mode:
- Workers: 1
- Test Run / Commit Reference: Local execution; two consecutive executions using `--repeat-each=2`.

**Preconditions**

- Relay is accessible.
- The QA Safety Guard passes and targets the `relay_qa_automation` database using the `relay_test_user` role.
- Alice (`alice@example.com`) and Bob (`bob@example.com`) are registered test users.
- An existing conversation between Alice and Bob is prepared through the database setup helper.
- Alice's valid credentials are available.

**Expected Result**

- User A can access the existing conversation.
- The conversation content is displayed to User A.
- The displayed conversation corresponds to the conversation between User A and User B.

**Actual Result**

- The QA Safety Guard passed before Playwright execution.
- Existing conversation data between Alice and Bob was removed during test setup.
- Alice and Bob were prepared as registered test users.
- An existing conversation between Alice and Bob was created through the database setup helper.
- Alice successfully signed in through the UI.
- The application displayed the Conversations heading.
- Alice selected Bob's conversation from the conversation list.
- The application navigated to the conversation URL containing the expected conversation ID.
- Bob was displayed as the conversation counterpart.
- The conversation content area and its empty-message state were displayed successfully.
- Both consecutive test executions completed successfully.

**Execution Result:** PASS

**Evidence**

- QA Safety Guard output: `Passed: local PostgreSQL, database relay_qa_automation, role relay_test_user.`
- Playwright terminal output: `Running 2 tests using 1 worker`.
- Playwright test result: `2 passed (19.3s)`.
- Playwright HTML report generated locally.

**Defect Reference:** None identified.

#### TC-AUTHZ-002-01 — Non-participant cannot access another user's conversation through direct navigation

**Test Case Reference:** [TC-AUTHZ-002-01](../test-design/test-cases/authorization.md#tc-authz-002-01--non-participant-cannot-access-another-users-conversation-through-direct-navigation)
**Scenario Reference:** SCN-AUTHZ-002
**Requirement Reference:** REQ-AUTHZ-001, REQ-AUTHZ-002
**Risk Reference:** RSK-001
**Execution Date:** 2026-11-02

**Environment**

- Application URL: http://localhost:3000
- Browser / Project: Chromium
- Browser Version: 156.0.8078.4 (Official Build) (64-bit)
- Operating System: Windows 11 Pro 25H2
- Execution Mode: Headed
- Workers: 1
- Test Run / Commit Reference: Local execution; two consecutive executions using `--repeat-each=2`.

**Preconditions**

- Relay is accessible.
- The QA Safety Guard passes and targets the `relay_qa_automation` database using the `relay_test_user` role.
- Alice (`alice@example.com`), Bob (`bob@example.com`), and Charlie (`charlie@example.com`) are registered test users.
- An existing conversation between Alice and Bob is prepared through the database setup helper.
- The conversation contains the protected message `Hi Bob. How are you?`.
- Charlie's valid credentials are available.
- Charlie is not a participant in Alice and Bob's conversation.

**Expected Result**

- User C cannot access the conversation because User C is not an authorized participant.
- Protected conversation content is not disclosed to User C.
- The application does not grant access merely because the target conversation can be referenced through direct navigation.

**Actual Result**

- The QA Safety Guard passed before Playwright execution.
- Alice, Bob, and Charlie were prepared as registered test users.
- An existing conversation between Alice and Bob was created through the database setup helper.
- The protected message `Hi Bob. How are you?` was inserted into the conversation.
- Charlie successfully signed in through the UI.
- The application displayed the Conversations heading after authentication.
- The browser directly navigated to the target conversation URL using its conversation ID.
- The Relay server executed the conversation participant authorization check.
- The server rejected the unauthorized access attempt with `403 FORBIDDEN` and the error message `You are not a participant of this conversation`.
- The protected message was not displayed to Charlie.
- Both consecutive test executions completed successfully.

**Execution Result:** PASS

**Evidence**

- QA Safety Guard output: `Passed: local PostgreSQL, database relay_qa_automation, role relay_test_user.`
- Playwright terminal output: `Running 2 tests using 1 worker`.
- Server authorization output: `statusCode: 403`, `code: FORBIDDEN`.
- Playwright test result: `2 passed (17.6s)`.
- Playwright HTML report generated locally.

**Defect Reference:** None identified.

#### TC-AUTHZ-002-02 — API request cannot retrieve conversation data for a non-participant

**Test Case Reference:** [TC-AUTHZ-002-02](../test-design/test-cases/authorization.md#tc-authz-002-02--api-request-cannot-retrieve-conversation-data-for-a-non-participant)
**Scenario Reference:** SCN-AUTHZ-002
**Requirement Reference:** REQ-AUTHZ-001, REQ-AUTHZ-002
**Risk Reference:** RSK-001
**Execution Date:** 2026-11-02

**Environment**

- Application URL: http://localhost:3000
- Browser / Project: Chromium Playwright project (API request fixture)
- Browser Version: 156.0.8078.4 (Official Build) (64-bit)
- Operating System: Windows 11 Pro 25H2
- Execution Mode: Headed command; API request fixture (no browser UI interaction).
- Workers: 1
- Test Run / Commit Reference: Local execution; two consecutive executions using `--repeat-each=2`.

**Preconditions**

- Relay is accessible.
- The QA Safety Guard passes and targets the `relay_qa_automation` database using the `relay_test_user` role.
- Alice (`alice@example.com`), Bob (`bob@example.com`), and Charlie (`charlie@example.com`) are registered test users.
- An existing conversation between Alice and Bob is prepared through the database setup helper.
- The conversation contains the protected message `Hi Bob. How are you?`.
- Charlie's valid credentials are available.
- Charlie is not a participant in Alice and Bob's conversation.

**Expected Result**

- User C cannot access the conversation because User C is not an authorized participant.
- Protected conversation content is not disclosed to User C.
- The application does not grant access merely because the target conversation can be referenced through direct navigation.

**Actual Result**

- The QA Safety Guard passed before Playwright execution.
- Alice, Bob, and Charlie were prepared as registered test users.
- An existing conversation between Alice and Bob was created through the database setup helper.
- The protected message `Hi Bob. How are you?` was inserted into the conversation.
- Charlie successfully authenticated through the login API.
- An API GET request was sent to the conversation messages endpoint using Alice and Bob's conversation ID.
- The API response indicated an authorization denial with `success: false` and error code `FORBIDDEN`.
- The response did not disclose the protected message.
- Both consecutive test executions completed successfully.

**Execution Result:** PASS

**Evidence**

- QA Safety Guard output: `Passed: local PostgreSQL, database relay_qa_automation, role relay_test_user.`
- Playwright terminal output: `Running 2 tests using 1 worker`.
- Playwright test result: `2 passed (13.1s)`.
- Playwright HTML report generated locally.

**Defect Reference:** None identified.

#### TC-AUTHZ-005-01 — Server-side authorization prevents unauthorized message creation when client-side restrictions are bypassed

**Test Case Reference:** [TC-AUTHZ-005-01](../test-design/test-cases/authorization.md)
**Scenario Reference:** SCN-AUTHZ-005
**Requirement Reference:** REQ-AUTHZ-005
**Risk Reference:** RSK-001
**Execution Date:** 2026-11-02

**Environment**

- Application URL: http://localhost:3000
- Test Type: API
- API Client: Playwright built-in `request` fixture (`APIRequestContext`)
- Browser / Project: Chromium project; no browser UI interaction
- Execution Mode: API request execution
- Workers: 1
- Test Run / Commit Reference: Local execution; two consecutive executions using `--repeat-each=2`.

**Preconditions**

- Relay application is accessible.
- The QA database is available.
- The QA Safety Guard is enabled for automated test execution.
- Alice (`alice@example.com`) and Bob (`bob@example.com`) are registered test users.
- Charlie (`charlie@example.com`) is a registered test user and is not a participant in the Alice-Bob conversation.
- An existing conversation between Alice and Bob is prepared through the database setup helper.
- Charlie's valid credentials are available.
- The message creation API operation and request contract are identified.

**Expected Result**

- The server rejects Charlie's attempt to create a message in a conversation for which he is not an authorized participant.
- The API response indicates that the operation is forbidden.
- The unauthorized message is not persisted in the database.
- Server-side authorization prevents the protected operation even when client-side restrictions are bypassed.

**Actual Result**

- The QA Safety Guard passed, confirming the target database was `relay_qa_automation` and the application role was `relay_test_user`.
- Alice, Bob, and Charlie were prepared as registered test users.
- An existing conversation between Alice and Bob was created through the database setup helper.
- Charlie successfully authenticated through `POST /api/auth/login`.
- A direct API request was submitted to `POST /api/conversations/{conversationId}/messages` using Charlie's authenticated session.
- The API returned HTTP `403 Forbidden`.
- The response body indicated `success: false` and error code `FORBIDDEN`.
- The database verification assertion confirmed that the unauthorized message was not persisted.
- All Playwright assertions passed in two consecutive executions.
- The test cleanup completed without reporting an error.

**Execution Result:** PASS

**Evidence**

- QA Safety Guard output: `Passed: local PostgreSQL, database relay_qa_automation, role relay_test_user.`
- Playwright terminal output: `Running 2 tests using 1 worker`.
- Playwright test result: `2 passed (11.7s)`.
- Playwright HTML report generated locally.

**Defect Reference:** None identified.

#### TC-AUTHZ-003-01 — Client-provided user identity does not override the authenticated user's identity

**Test Case Reference:** [TC-AUTHZ-003-01](../test-design/test-cases/authorization.md)
**Scenario Reference:** SCN-AUTHZ-003
**Requirement Reference:** REQ-AUTHZ-003
**Risk Reference:** RSK-002
**Execution Date:** 2026-11-02

**Environment**

- Application URL: http://localhost:3000
- Test Type: API
- API Client: Playwright built-in `request` fixture (`APIRequestContext`)
- Browser / Project: Chromium project; no browser UI interaction
- Execution Mode: API request execution
- Workers: 1
- Test Run / Commit Reference: Local execution; two consecutive executions using `--repeat-each=2`.

**Preconditions**

- Relay application is accessible.
- The QA database is available.
- The QA Safety Guard is enabled for automated test execution.
- Alice (`alice@example.com`), Bob (`bob@example.com`), and Charlie (`charlie@example.com`) are registered test users.
- No existing conversation between Alice and Charlie or Bob and Charlie interferes with the test setup.
- Alice's valid credentials are available.
- The conversation creation API operation and request contract are identified.

**Expected Result**

- The system derives the requester identity from Alice's authenticated session.
- The injected identity of Bob is not used as the requester identity.
- The resulting conversation contains Alice and Charlie as participants.
- Bob is not added as a participant as a result of the injected identity.

**Actual Result**

- The QA Safety Guard passed, confirming the target database was `relay_qa_automation` and the application role was `relay_test_user`.
- Alice, Bob, and Charlie were prepared as registered test users.
- Existing conversations between Alice and Charlie and Bob and Charlie were removed during test setup.
- The user IDs of Alice, Bob, and Charlie were retrieved from the QA database.
- Alice successfully authenticated through `POST /api/auth/login`.
- A direct API request was submitted to `POST /api/conversations` with Charlie's user ID as `targetUserId` and Bob's user ID as an additional injected `userId` field.
- The API successfully created the conversation.
- Database verification confirmed that Alice and Charlie were the two conversation participants.
- Bob was not included as a conversation participant.
- All Playwright assertions passed in two consecutive executions.
- The test cleanup completed without reporting an error.

**Execution Result:** PASS

**Evidence**

- QA Safety Guard output: `Passed: local PostgreSQL, database relay_qa_automation, role relay_test_user.`
- Playwright terminal output: `Running 2 tests using 1 worker`.
- Playwright test result: `2 passed (10.1s)`.
- Playwright HTML report generated locally.

**Defect Reference:** None identified.

#### TC-AUTHZ-004-01 — Message is attributed to the authenticated user

**Test Case Reference:** [TC-AUTHZ-004-01](../test-design/test-cases/authorization.md)
**Scenario Reference:** SCN-AUTHZ-004
**Requirement Reference:** REQ-AUTHZ-004
**Risk Reference:** RSK-001
**Execution Date:** 2026-11-03

**Environment**

- Application URL: http://localhost:3000
- Test Type: UI + API
- Automation Framework: Playwright
- Browser / Project: Chromium
- Execution Mode: Headed
- Workers: 1
- Test Run / Commit Reference: Local execution; two consecutive executions using `--repeat-each=2`.

**Preconditions**

- Relay application is accessible.
- The QA database is available.
- Alice (`alice@example.com`) and Bob (`bob@example.com`) are registered test users.
- An existing conversation between Alice and Bob is prepared.
- Alice's valid credentials are available.

**Expected Result**

- Alice can successfully authenticate.
- Alice can send a message in the existing conversation.
- The message is displayed as Alice's own message in the UI.
- The API response identifies Alice as the message sender.
- The persisted message record identifies Alice as the sender.

**Actual Result**

- Alice successfully authenticated through the UI.
- The existing Alice-Bob conversation was opened.
- Alice successfully sent a message through the UI.
- The message creation API returned HTTP 201.
- The API response indicated successful message creation and returned Alice's user ID as `senderId`.
- The sent message was visible in the conversation UI.
- The message bubble was aligned to the right, consistent with the UI representation of the authenticated user's own message.
- Database verification confirmed that the persisted message's `senderId` matched Alice's user ID.
- All Playwright assertions passed in two consecutive executions.
- Test cleanup completed without a reported error.

**Execution Result:** PASS

**Evidence**

- Playwright terminal output: `Running 2 tests using 1 worker`.
- Playwright test result: `2 passed (24.3s)`.
- HTML report generated locally.
- Non-blocking warning observed: `Slow filesystem detected` during WebServer startup.

**Defect Reference:** None identified.

#### TC-AUTHZ-004-02 — Client-provided sender identity cannot override the authenticated sender

**Test Case Reference:** [TC-AUTHZ-004-02](../test-design/test-cases/authorization.md)
**Scenario Reference:** SCN-AUTHZ-004
**Requirement Reference:** REQ-AUTHZ-004
**Risk Reference:** RSK-001
**Execution Date:** 2026-11-03

**Environment**

- Application URL: http://localhost:3000
- Test Type: API
- Automation Framework: Playwright
- API Client: Playwright built-in `request` fixture (`APIRequestContext`)
- Browser / Project: Chromium project; no browser UI interaction
- Execution Mode: API request execution
- Workers: 1
- Test Run / Commit Reference: Local execution; two consecutive executions using `--repeat-each=2`.

**Preconditions**

- Relay application is accessible.
- The QA database is available.
- The QA Safety Guard is enabled for automated test execution.
- Alice (`alice@example.com`), Bob (`bob@example.com`), and Charlie (`charlie@example.com`) are registered test users.
- An existing conversation between Alice and Bob is prepared.
- Alice's valid credentials are available.
- The message creation API operation and request contract are identified.

**Expected Result**

- Alice successfully authenticates.
- The server accepts the message creation request.
- The injected sender identity belonging to Charlie does not override Alice's authenticated identity.
- The API response identifies Alice as the message sender.
- The persisted message record identifies Alice as the sender.

**Actual Result**

- The QA Safety Guard passed, confirming the target database was `relay_qa_automation` and the application role was `relay_test_user`.
- Alice, Bob, and Charlie were prepared as registered test users.
- An existing conversation between Alice and Bob was created through the database setup helper.
- Alice successfully authenticated through `POST /api/auth/login`.
- A direct API request was submitted to `POST /api/conversations/{conversationId}/messages` with Charlie's user ID injected as the `senderId` field.
- The API returned HTTP 201, indicating successful message creation.
- The API response identified Alice's user ID as `senderId`, rather than Charlie's injected user ID.
- Database verification confirmed that the persisted message's `senderId` matched Alice's user ID and did not match Charlie's user ID.
- All Playwright assertions passed in two consecutive executions.
- Test cleanup completed without a reported error.

**Execution Result:** PASS

**Evidence**

- QA Safety Guard output: `Passed: local PostgreSQL, database relay_qa_automation, role relay_test_user.`
- Playwright terminal output: `Running 2 tests using 1 worker`.
- Playwright test result: `2 passed (11.4s)`.
- Playwright HTML report generated locally.

**Defect Reference:** None identified.
