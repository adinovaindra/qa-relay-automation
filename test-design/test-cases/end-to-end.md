# Relay — End-to-End Test Cases

## 1. Purpose

This document defines the detailed end-to-end test cases derived from Relay's approved end-to-end scenarios, documented functional requirements, product scope, and risk assessment.

The test cases translate the approved end-to-end scenarios into repeatable verification steps with explicit preconditions, test data, expected results, and traceability. They verify documented cross-feature workflows from the user's initial action through the completion of the workflow. Execution outcomes and evidence are recorded separately.

---

## 2. Test Case Design Approach

End-to-end test cases are derived from the following sources:

- Product scope
- Functional requirements
- Risk assessment
- Approved end-to-end scenarios

The design focuses on the documented user workflow across registration, authentication, conversation creation, message submission, logout, and protected-page access after logout.

Test cases inherit their scope from the approved end-to-end scenarios but map only to the requirements and risks directly relevant to the behavior being verified. Risk level informs execution priority; it does not determine the number of test cases required.

Expected results are based on the documented requirements. Where a requirement does not specify a detail, this document does not invent an acceptance criterion. End-to-end verification complements feature-level test cases and does not replace detailed verification of individual features.

Browser, browser version, operating system, execution mode, actual result, status, evidence, and defect references belong in separate execution records rather than being repeated in each test case.

---

## 3. Test Case Structure

Each test case uses the following structure:

| Field               | Description                                                                         |
| ------------------- | ----------------------------------------------------------------------------------- |
| Test Case ID        | Unique identifier linked to the parent scenario.                                    |
| Title               | Concise description of the behavior being verified.                                 |
| Related Scenario    | Approved parent scenario.                                                           |
| Related Requirement | Requirement or requirements directly verified by the test case.                     |
| Related Risk        | Risk or risks directly relevant to the behavior verified.                           |
| Risk Level          | Risk level associated with the behavior, based on the risk assessment.              |
| Test Design Method  | Method used to derive the test case.                                                |
| Test Type           | Classification of the test, such as end-to-end functional or session-state testing. |
| Priority            | Recommended execution priority, informed by risk and coverage needs.                |
| Preconditions       | Conditions that must be true before the steps begin.                                |
| Test Data           | Values or data conditions needed to execute the test.                               |
| Steps               | Ordered actions performed by the tester or implemented by an automated test.        |
| Expected Result     | Observable result required by the documented requirements.                          |

### Test Case ID Convention

Test case IDs follow the conceptual format:

`TC-{FEATURE}-{SCENARIO NUMBER}-{CASE SEQUENCE}`

- `TC` identifies the artifact as a test case.
- `{FEATURE}` identifies the functional area, such as AUTH, AUTHZ, CONV, MSG, UX, or E2E.
- `{SCENARIO NUMBER}` identifies the parent scenario number to which the test case belongs.
- `{CASE SEQUENCE}` distinguishes individual test cases derived from the same scenario, using a sequential number starting from `01`.

For example, `TC-E2E-001-01` identifies the first test case derived from `SCN-E2E-001`. An additional test case derived from the same scenario would use `TC-E2E-001-02`.

The test case ID must remain unique within the test case repository and maintain a clear reference to its parent scenario.

Execution-specific information such as browser environment, browser version, operating system, execution mode, actual result, status, evidence, and defect ID is recorded separately during test execution.

---

## 4. End-to-End Test Cases

### TC-E2E-001-01 — Complete User Registration, Messaging, and Logout Workflow

| Field               | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Test Case ID        | TC-E2E-001-01                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Title               | Complete user registration, messaging, and logout workflow                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Related Scenario    | SCN-E2E-001 [SCN-E2E-001](../scenarios/end-to-end.md#scn-e2e-001--user-registration-messaging-and-logout-workflow)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Related Requirement | REQ-AUTH-001 [Authentication Requirements](../../docs/requirements/authentication.md#req-auth-001--successful-registration), REQ-AUTH-002 [Authentication Requirements](../../docs/requirements/authentication.md#req-auth-002--successful-login), REQ-AUTH-003 [Authentication Requirements](../../docs/requirements/authentication.md#req-auth-003--logout), REQ-AUTH-004 [Authentication Requirements](../../docs/requirements/authentication.md#req-auth-004--protected-access), REQ-CONV-002 [Conversation Requirements](../../docs/requirements/conversation.md#req-conv-002--conversation-creation-and-retrieval), REQ-MSG-001 [Messaging Requirements](../../docs/requirements/messaging.md#req-msg-001--message-sending-and-validation) |
| Related Risk        | RSK-003, RSK-005, RSK-006, RSK-007 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Risk Level          | High                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Test Design Method  | Requirement-Based + Risk-Based                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Test Type           | End-to-End Functional / Session State                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Priority            | High                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

#### Preconditions

- Relay is accessible.
- The tester is not authenticated.
- The Register and Login pages are accessible.
- An existing registered user account is available as the conversation counterpart.
- The counterpart account's identifying information is available.
- The test email address for the new account has not been registered.
- The tester can access the Chat page after successful authentication.

#### Test Data

| Data                     | Value                                                       |
| ------------------------ | ----------------------------------------------------------- |
| New User Name            | E2E Test User                                               |
| New User Email           | e2e.test.unique@example.com (unique, unused address)        |
| New User Password        | Valid password satisfying the documented registration rules |
| Confirm Password         | Same value as New User Password                             |
| Conversation Counterpart | Existing registered user account                            |
| Message Content          | E2E workflow verification message                           |
| Protected Page           | `/chat`                                                     |
| Expected Login Page      | `/login`                                                    |

#### Steps

1. Open the Relay application.
2. Navigate to the Register page.
3. Enter a valid name, unique email address, password, and matching confirmation password.
4. Submit the registration form.
5. Verify the registration result and resulting page.
6. Verify that the application redirects to `/login`.
7. Enter the newly registered account's email address and password.
8. Submit the Login form.
9. Verify that the application redirects to `/chat`.
10. Verify that the authenticated user can access the Chat page.
11. Create or retrieve a conversation with the existing registered counterpart according to the documented conversation behavior.
12. Open the conversation.
13. Enter the test message into the message input.
14. Submit the message.
15. Verify that the message appears in the selected conversation with the submitted content.
16. Log out from Relay.
17. Verify that the application redirects to `/login`.
18. Enter `/chat` directly in the browser address bar.
19. Attempt to access the protected page.
20. Verify the resulting page and authentication state.

#### Expected Result

- Registration succeeds when all required information is valid.
- After successful registration, the application redirects to `/login`.
- The newly registered user can log in using the registered credentials.
- After successful login, the application redirects to `/chat`.
- The authenticated user can access the Chat page.
- The user can create or retrieve a conversation with the existing counterpart according to the documented conversation behavior.
- The selected conversation is accessible to the authenticated user.
- The user can submit a non-empty text message within the conversation.
- The submitted message appears in the selected conversation with the entered content.
- The user can log out successfully.
- After logout, the application redirects to `/login`.
- Direct access to `/chat` after logout is denied.
- The unauthenticated user is redirected to `/login` when attempting to access `/chat`.
- The workflow does not restore authenticated access after logout.

---

## 5. Scenario-to-Test Case Traceability

The end-to-end test cases maintain traceability between approved scenarios, documented requirements, associated risks, and test case identifiers.

The relationship is:

```text
Product Scope
    ↓
Requirements
    ↓
Risk Assessment
    ↓
End-to-End Scenario
    ↓
Test Case
    ↓
Execution and Evidence
```

### Scenario-to-Test Case Traceability

| Scenario ID | Related Requirement ID(s)                                                         | Related Risk ID(s)                 | Test Case ID(s) |
| ----------- | --------------------------------------------------------------------------------- | ---------------------------------- | --------------- |
| SCN-E2E-001 | REQ-AUTH-001, REQ-AUTH-002, REQ-CONV-002, REQ-MSG-001, REQ-AUTH-003, REQ-AUTH-004 | RSK-003, RSK-005, RSK-006, RSK-007 | TC-E2E-001-01   |

The end-to-end test case is intended to verify the documented cross-feature workflow. Its design does not imply that the case has been executed or that the corresponding functionality has passed testing. Feature-level test cases remain responsible for detailed verification of individual behaviors.
