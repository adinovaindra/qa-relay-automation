# Relay — Authorization Test Scenarios

## 1. Purpose

This document defines the authorization test scenarios derived from Relay's documented product scope, authorization requirements, and risk assessment.

The scenarios identify the authorization behaviors that require verification before detailed test cases and test execution activities are created.

The scenarios remain at a higher level than individual test cases. Each scenario may cover multiple relevant conditions, including authorized access, unauthorized access, and attempts to manipulate client-provided identity values, where supported by the documented requirements and associated risks.

---

## 2. Scenario Design Approach

Authorization scenarios are derived from the following sources:

- Product scope
- Authorization requirements
- Risk assessment

The scenario design follows this relationship:

Product Scope
    +
Authorization Requirements
    +
Risk Assessment
    ↓
Authorization Test Scenarios

The scenario design prioritizes access control and identity-related risks, particularly unauthorized conversation access and attempts to override the authenticated user's identity.

Risk assessment is used to inform scenario coverage and testing priority. It does not establish additional product requirements or replace the expected behavior documented in the requirements.

Where the requirements specify expected authorization behavior, the scenarios preserve those expectations. Unspecified behavior is not assumed; any unresolved expectation must be clarified before it is treated as a definitive pass/fail criterion.

---

## 3. Authorization Scenarios

### SCN-AUTHZ-001 — Authorized Conversation Access

Verify that an authenticated participant can access a conversation they are authorized to access.

**Related Requirements:** REQ-AUTHZ-001, REQ-AUTHZ-002  
**Related Risks:** RSK-001  
**Risk Level:** High

**Coverage Considerations:**

- Access to a conversation by an authorized participant.
- Authorization based on the relationship between the authenticated user and the conversation.
- Access to conversation data by an authorized participant.

---

### SCN-AUTHZ-002 — Unauthorized Conversation Access

Verify that a user who is not an authorized participant cannot access another conversation's protected resources.

**Related Requirements:** REQ-AUTHZ-001, REQ-AUTHZ-002, REQ-AUTHZ-005  
**Related Risks:** RSK-001  
**Risk Level:** High

**Coverage Considerations:**

- Attempt to access a conversation for which the authenticated user is not a participant.
- Attempt to retrieve protected conversation data without the required participant relationship.
- Verify that server-side authorization enforcement prevents unauthorized access.
- Verify that client-side restrictions alone are not treated as sufficient authorization enforcement.

---

### SCN-AUTHZ-003 — Authenticated User Identity Enforcement

Verify that authorization decisions use the authenticated user's identity rather than relying on client-provided user identity values.

**Related Requirements:** REQ-AUTHZ-003  
**Related Risks:** RSK-001  
**Risk Level:** High

**Coverage Considerations:**

- Perform a protected operation using the authenticated user's valid identity.
- Attempt to provide a different user identity through client-controlled request data.
- Verify that client-provided identity values do not override the authenticated user's identity in authorization decisions.

---

### SCN-AUTHZ-004 — Message Sender Identity Enforcement

Verify that a message is attributed to the authenticated user who sends it, rather than to a sender identity supplied or manipulated by the client.

**Related Requirements:** REQ-AUTHZ-004  
**Related Risks:** RSK-002  
**Risk Level:** High

**Coverage Considerations:**

- Send a message as an authenticated user under normal conditions.
- Attempt to override the sender identity through client-provided request data.
- Verify that the resulting message sender identity is derived from the authenticated user.
- Verify that a client-provided sender identity cannot override the authenticated sender.

---

### SCN-AUTHZ-005 — Server-Side Authorization Enforcement

Verify that protected operations enforce authentication and authorization on the server side rather than relying solely on client-side access restrictions.

**Related Requirements:** REQ-AUTHZ-005  
**Related Risks:** RSK-001  
**Risk Level:** High

**Coverage Considerations:**

- Attempt protected operations through the API without relying on the UI's access restrictions.
- Verify that server-side checks enforce the required authentication and authorization conditions.
- Verify that bypassing or manipulating client-side restrictions does not grant unauthorized access to protected operations or resources.

---

## 4. Scenario Traceability

The authorization scenarios maintain traceability between the documented requirements, associated risks, and scenario identifiers.

The relationship is:

Requirement
    ↓
Risk Assessment
    ↓
Authorization Scenario
    ↓
Test Cases
    ↓
Execution and Evidence

### Requirement-to-Scenario Traceability

| Requirement ID | Related Risk ID(s) | Scenario ID(s) |
|---|---|---|
| REQ-AUTHZ-001 | RSK-001 | SCN-AUTHZ-001, SCN-AUTHZ-002 |
| REQ-AUTHZ-002 | RSK-001 | SCN-AUTHZ-001, SCN-AUTHZ-002 |
| REQ-AUTHZ-003 | RSK-001 | SCN-AUTHZ-003 |
| REQ-AUTHZ-004 | RSK-002 | SCN-AUTHZ-004 |
| REQ-AUTHZ-005 | RSK-001 | SCN-AUTHZ-002, SCN-AUTHZ-005 |

### Risk-to-Scenario Traceability

| Risk ID | Risk Area | Scenario ID(s) |
|---|---|---|
| RSK-001 | Authorization | SCN-AUTHZ-001, SCN-AUTHZ-002, SCN-AUTHZ-003, SCN-AUTHZ-005 |
| RSK-002 | Message Sender Identity | SCN-AUTHZ-004 |

The scenario set is intended to guide subsequent test-case design. Scenario coverage does not imply that the scenarios have been executed or that the corresponding functionality has passed testing.