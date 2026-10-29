# Relay — End-to-End Test Scenarios

## 1. Purpose

This document defines the end-to-end test scenarios derived from Relay's documented product scope, functional requirements, and risk assessment.

The scenarios identify cross-feature workflows that require verification before detailed test cases and test execution activities are created.

The scenarios complement the feature-level scenarios by verifying that the documented user workflow operates across multiple features in the intended sequence.

---

## 2. Scenario Design Approach

End-to-end scenarios are derived from the following sources:

- Product scope
- Functional requirements
- Risk assessment

The scenario design follows this relationship:

```text
Product Scope
    +
Functional Requirements
    +
Risk Assessment
    ↓
End-to-End Test Scenarios
```

The scenario design prioritizes the documented end-to-end workflow, covering registration, authentication, conversation creation, message submission, logout, and protected-page access after logout.

Risk assessment is used to inform scenario coverage and testing priority. It does not establish additional product requirements or replace the expected behavior documented in the requirements.

The end-to-end scenarios complement the feature-level scenarios. They do not replace detailed verification of individual feature behavior.

---

## 3. End-to-End Scenarios

### SCN-E2E-001 — User Registration, Messaging, and Logout Workflow

Verify that a new user can complete the documented end-to-end workflow, from account registration through messaging, logout, and attempted access to a protected page.

**Related Requirements:** REQ-AUTH-001, REQ-AUTH-002, REQ-CONV-002, REQ-MSG-001, REQ-AUTH-003, REQ-AUTH-004
**Related Risks:** RSK-003, RSK-005, RSK-006, RSK-007, RSK-020
**Risk Level:** High

**Coverage Considerations:**

- Register a new user with valid required information.
- Verify that successful registration redirects the user to `/login`.
- Log in using the newly registered account.
- Verify that successful login redirects the user to `/chat`.
- Create a conversation according to the documented conversation behavior.
- Send a text message within the conversation.
- Log out from the authenticated session.
- Attempt to access a protected page after logout.
- Verify that the protected page redirects the unauthenticated user to `/login`.
- Verify that the workflow does not restore authenticated access after logout.

---

## 4. Scenario Traceability

The end-to-end scenarios maintain traceability between the documented requirements, associated risks, and scenario identifiers.

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
Test Cases
    ↓
Execution and Evidence
```

### Requirement-to-Scenario Traceability

| Requirement ID | Related Risk ID(s) | Scenario ID(s) |
| -------------- | ------------------ | -------------- |
| REQ-AUTH-001   | RSK-007            | SCN-E2E-001    |
| REQ-AUTH-002   | RSK-003            | SCN-E2E-001    |
| REQ-CONV-002   | RSK-005            | SCN-E2E-001    |
| REQ-MSG-001    | RSK-020            | SCN-E2E-001    |
| REQ-AUTH-003   | RSK-006            | SCN-E2E-001    |
| REQ-AUTH-004   | RSK-006            | SCN-E2E-001    |

### Risk-to-Scenario Traceability

| Risk ID | Risk Area                   | Scenario ID(s) |
| ------- | --------------------------- | -------------- |
| RSK-003 | Authentication              | SCN-E2E-001    |
| RSK-005 | Conversation Access         | SCN-E2E-001    |
| RSK-006 | Session and Logout Behavior | SCN-E2E-001    |
| RSK-007 | Registration Validation     | SCN-E2E-001    |
| RSK-020 | Message Input Validation    | SCN-E2E-001    |

The scenario set is intended to guide subsequent test-case design. Scenario coverage does not imply that the scenarios have been executed or that the corresponding functionality has passed testing.
