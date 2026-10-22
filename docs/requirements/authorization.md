# Authorization Requirements

## 1. Purpose

This document defines the expected authorization behavior for Relay, including conversation access control, client-provided user identity, message sender identity, and server-side authorization.

These requirements describe the expected system behavior independently of the current implementation. The implementation shall be evaluated against these requirements, and any deviations shall be documented as defects where applicable.

## 2. Requirement Classification

Authorization requirements are organized into the following areas:

- Conversation Access
- Client-Provided User Identity
- Message Sender Identity
- Server-Side Authorization

Requirement IDs follow the format `REQ-AUTHZ-NNN`.

Authentication and authorization are treated as separate but related responsibilities:

- **Authentication:** Establishes the identity of the user making a request.
- **Authorization:** Determines whether the authenticated user is permitted to access a resource or perform an operation.

The system shall enforce authorization rules independently of client-provided claims about user identity.

## 3. Conversation Access Requirements

### REQ-AUTHZ-001 — Conversation Access Based on User Relationship

The system shall determine conversation access based on the relationship between the authenticated user and the requested conversation.

### REQ-AUTHZ-002 — Authorized Conversation Participants

The system shall allow a user to access only conversations for which the user is an authorized participant.

Users shall not be permitted to access conversations for which they are not authorized participants.

## 4. Client Identity and Message Sender Requirements

### REQ-AUTHZ-003 — Client-Provided User Identity

The system shall not treat client-provided user identity as the authoritative identity for authorization decisions.

Authorization decisions shall rely on the authenticated user's identity rather than an identity value supplied by the client.

### REQ-AUTHZ-004 — Message Sender Identity

The system shall derive message sender identity from the authenticated user rather than treating sender identity provided in the request body as authoritative.

A client-provided sender identity shall not override the identity of the authenticated user when determining who sent a message.

## 5. Server-Side Authorization Requirements

### REQ-AUTHZ-005 — Server-Side Authorization

The system shall perform authentication and authorization checks on the server for protected operations.

Protected operations shall not rely solely on client-side checks to determine whether a user is permitted to access a resource or perform an operation.

## 6. Requirement Traceability and Verification

Each requirement shall be traceable to relevant test scenarios, test cases, execution results, and supporting evidence.

The expected traceability workflow is:

**Requirement → Test Scenario → Test Case → Test Execution → Evidence → Defect → Test Summary**

Authorization requirements shall be verified through appropriate test methods, including UI and API testing where applicable.

API tests may be used to verify that the server enforces authorization rules independently of client-side behavior. Test results and supporting evidence shall be documented, and any deviation from the expected behavior shall be recorded as a defect where applicable.

Retesting and regression testing after defect fixes are outside the defined portfolio deliverables. Open defects and behavior that has not been verified shall be reported transparently in the relevant test documentation.