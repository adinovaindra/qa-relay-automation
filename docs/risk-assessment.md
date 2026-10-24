# Relay — Risk Assessment

## 1. Purpose

This document identifies and prioritizes product risks that may affect the functional correctness, security, data integrity, session integrity, and usability of the Relay web application.

The risk assessment is used to guide test coverage and testing depth throughout the QA lifecycle, ensuring that testing effort is prioritized according to the potential consequences and likelihood of failure.

Risk assessments are based on the documented product scope, functional requirements, and current understanding of the application. Each identified risk is mapped to relevant requirements to maintain traceability between risk assessment and subsequent test design.

Higher-risk areas receive greater testing attention during initial test execution, including negative testing, authorization checks, multi-user scenarios, session-state checks, persistence checks, and relevant edge cases.

Retesting and regression testing after defect fixes are outside the defined portfolio deliverables.

---

## 2. Risk Assessment Approach

Risk is assessed using two primary dimensions:

- **Impact** — the potential consequence if the behavior fails.
- **Likelihood** — the estimated possibility that the behavior may fail or produce an unintended result.

Likelihood ratings represent qualitative QA estimates based on the documented requirements, current understanding of the application, and available evidence. They are not derived from production defect statistics or historical incident data.

The overall risk level is determined using the following matrix.

| Impact \ Likelihood | Low    | Medium | High   |
| ------------------- | ------ | ------ | ------ |
| **Low**             | Low    | Low    | Medium |
| **Medium**          | Low    | Medium | High   |
| **High**            | Medium | High   | High   |

### 2.1 Impact

| Level      | Definition                                                                                                                                                                                                                   |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Low**    | Failure has a limited effect on usability or a non-critical user experience without compromising core functionality or data integrity.                                                                                       |
| **Medium** | Failure significantly affects a feature, user workflow, or the accuracy of displayed information but does not directly compromise a critical security boundary or core data integrity.                                       |
| **High**   | Failure can compromise authorization or authentication boundaries, expose protected resources, misattribute message ownership, cause significant data integrity issues, or prevent access to core application functionality. |

### 2.2 Likelihood

| Level      | Definition                                                                                                                        |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Low**    | Failure is considered less likely under normal usage, based on the current understanding of the application and its requirements. |
| **Medium** | Failure is reasonably possible, particularly under negative, boundary, multi-user, or state-dependent conditions.                 |
| **High**   | Failure is considered plausible under normal or easily reproducible conditions, based on available evidence.                      |

Likelihood shall not be rated High solely because a test scenario is easy to execute. Ratings should be supported by the available evidence and reviewed when additional information becomes available.

### 2.3 Risk Level and Testing Priority

Risk level determines the relative testing attention assigned to each risk.

- **High risk:** Highest testing priority, with deeper negative testing and relevant security, state, persistence, or multi-user checks.
- **Medium risk:** Functional verification with relevant negative, boundary, and edge-case testing where applicable.
- **Low risk:** Standard functional verification appropriate to the potential impact of failure.

Risk level determines testing priority, not the number of test cases that must be created. Test coverage should be proportionate to the behavior and failure conditions associated with each risk.

---

## 3. Risk Register

The following register identifies the principal risks associated with the functional requirements and testing scope defined for Relay.

| Risk ID | Risk Area                                                                   | Failure Scenario                                                                                                                                                   | Impact | Likelihood | Risk Level | Related Requirements                                                             |
| ------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | ---------- | ---------- | -------------------------------------------------------------------------------- |
| RSK-001 | Authorization                                                               | A user can access or interact with a conversation for which they are not an authorized participant.                                                                | High   | Medium     | High       | REQ-AUTHZ-001, REQ-AUTHZ-002, REQ-AUTHZ-005                                      |
| RSK-002 | Message Sender Identity                                                     | A message is attributed to a user other than the authenticated sender.                                                                                             | High   | Medium     | High       | REQ-AUTHZ-003, REQ-AUTHZ-004                                                     |
| RSK-003 | Authentication                                                              | The application incorrectly accepts invalid login credentials or rejects valid login credentials.                                                                  | High   | Medium     | High       | REQ-AUTH-002, REQ-AUTH-007                                                       |
| RSK-004 | Message Persistence                                                         | Messages are lost or unavailable after application refresh or re-login.                                                                                            | High   | Medium     | High       | REQ-MSG-003                                                                      |
| RSK-005 | Conversation Access                                                         | A user cannot access an authorized conversation or is provided access to an incorrect conversation.                                                                | High   | Medium     | High       | REQ-CONV-001, REQ-CONV-002                                                       |
| RSK-006 | Session and Logout Behavior                                                 | The application fails to correctly invalidate or maintain authenticated state across logout, browser tabs, protected access attempts, or session expiration.       | High   | Medium     | High       | REQ-AUTH-003, REQ-AUTH-004, REQ-AUTH-005, REQ-AUTH-010                           |
| RSK-007 | Registration and Message Input Validation                                   | The application incorrectly accepts registration or message input that violates the defined validation rules, or rejects valid registration data.                  | Medium | Medium     | Medium     | REQ-AUTH-001, REQ-AUTH-006, REQ-AUTH-008, REQ-AUTH-009, REQ-MSG-001, REQ-MSG-006 |
| RSK-008 | Message and Conversation Ordering                                           | Messages or conversations appear in an incorrect order, causing misleading conversation history or previews.                                                       | Medium | Medium     | Medium     | REQ-MSG-002, REQ-CONV-006                                                        |
| RSK-009 | Error Handling for Invalid Login Credentials and Non-Existent Conversations | The application fails to display the required error feedback when login credentials are invalid or a conversation does not exist.                                  | Medium | Medium     | Medium     | REQ-AUTH-007, REQ-CONV-008                                                       |
| RSK-010 | Responsive Behavior                                                         | Core functionality becomes difficult to use on smaller screens.                                                                                                    | Medium | Medium     | Medium     | REQ-UX-004                                                                       |
| RSK-011 | Conversation Previews and Timestamps                                        | Conversation details, previews, or timestamps are displayed incorrectly or inconsistently.                                                                         | Medium | Medium     | Medium     | REQ-CONV-003, REQ-CONV-004, REQ-CONV-005                                         |
| RSK-012 | Message Input UI State                                                      | The Send button remains enabled when the message input is empty or contains only whitespace, allowing message submission through the UI.                           | Medium | Medium     | Medium     | REQ-MSG-006                                                                      |
| RSK-013 | Self-Conversation Restrictions                                              | The application allows a user to create or access a one-to-one conversation with themselves through the UI or API.                                                 | Medium | Medium     | Medium     | REQ-CONV-007                                                                     |
| RSK-014 | Registration Validation Feedback                                            | The application fails to display the required registration validation feedback or displays incorrect validation messages for registration errors.                  | Medium | Medium     | Medium     | REQ-AUTH-006, REQ-AUTH-008, REQ-AUTH-009                                         |
| RSK-015 | Empty States                                                                | The application fails to display the required empty-state content or displays incorrect empty-state content based on conversation availability or selection state. | Low    | Medium     | Low        | REQ-CONV-004, REQ-UX-005                                                         |
| RSK-016 | Theme Persistence                                                           | The selected theme does not persist as documented.                                                                                                                 | Low    | Medium     | Low        | REQ-UX-003                                                                       |
| RSK-017 | Message Scrolling                                                           | The conversation does not automatically scroll to the bottom when opened or after the user sends a message.                                                        | Low    | Medium     | Low        | REQ-MSG-004                                                                      |
| RSK-018 | Message Timestamps and Date Separators                                      | Message timestamps or date separators are displayed incorrectly or inconsistently.                                                                                 | Low    | Medium     | Low        | REQ-MSG-005                                                                      |
| RSK-019 | Theme Rendering and Application Failure                                     | Light Mode or Dark Mode is not applied correctly or consistently across the Register, Login, and Chat pages.                                                       | Medium | Low        | Low        | REQ-UX-001, REQ-UX-002                                                           |

### 3.1 Risk Register Notes

The risk register represents an initial assessment of potential failure scenarios. The ratings are qualitative estimates rather than confirmed defect probabilities.

The following distinctions apply:

- **Authentication and authorization risks** address access to protected functionality and resources.
- **Sender identity risk** addresses whether message ownership is derived from the authenticated user rather than a client-provided identity.
- **Persistence and ordering risks** address the correctness and consistency of message and conversation data.
- **Input validation and UI state risks** address separate validation responsibilities at the API and user interface layers.
- **Display and usability risks** address whether the application presents the information and interaction behavior required by the documented requirements.

Related requirement IDs identify the expected behavior that supports each risk. A requirement may be associated with more than one risk when the potential failure scenarios are distinct.

---

## 4. Risk-Based Testing Strategy

The risk register determines the relative depth and priority of testing. Testing activities shall remain within the product and QA scope defined in `product-scope.md`.

### 4.1 High-Risk Areas

High-risk areas receive the highest testing attention during initial execution.

Testing may include:

- Positive and negative scenarios.
- Multi-user scenarios using separate authenticated accounts.
- Authorization checks through relevant API interfaces.
- Attempts to access protected resources without valid authentication.
- Attempts to use client-provided identity values that differ from the authenticated user.
- Session-state checks across refresh, logout, multiple tabs, and session expiration.
- Message persistence checks after refresh and re-login.
- Conversation retrieval and creation checks for the same pair of users.

High-risk areas include:

- Authorization (RSK-001).
- Message sender identity (RSK-002).
- Authentication (RSK-003).
- Message persistence (RSK-004).
- Conversation access (RSK-005).
- Session and logout behavior (RSK-006).

The testing approach should prioritize the potential consequences of failure, particularly unauthorized access, incorrect identity attribution, and loss of persistent message data.

### 4.2 Medium-Risk Areas

Medium-risk areas receive functional coverage with relevant negative, boundary, and edge-case testing.

These include:

- Registration and message input validation (RSK-007).
- Message and conversation ordering (RSK-008).
- Error handling for invalid login credentials and non-existent conversations (RSK-009).
- Responsive behavior (RSK-010).
- Conversation previews and timestamps (RSK-011).
- Message input UI state (RSK-012).
- Self-conversation restrictions (RSK-013).
- Registration validation feedback (RSK-014).

Testing should verify the documented expected behavior and relevant failure conditions without introducing requirements that have not been defined.

### 4.3 Low-Risk Areas

Low-risk areas receive standard functional verification appropriate to their potential impact.

These include:

- Empty states (RSK-015).
- Theme persistence (RSK-016).
- Message scrolling (RSK-017).
- Message timestamps and date separators (RSK-018).
- Theme Rendering and Application Failure (RSK-019).

Testing should verify the specific behavior described by the associated requirements, including relevant device layouts, date boundaries, and navigation or message-sending actions where applicable.

---

## 5. Risk-Based Test Coverage

Risk assessment determines the relative depth of testing rather than distributing an equal number of test cases across all functional areas.

For example, authorization risk may require the following coverage:

```text
Authorization
    ↓
High Risk
    ↓
Authorized access + Unauthorized access
    ↓
Multi-user scenarios + API checks
    ↓
High Initial Test Depth
```

A lower-risk feature may require a more focused approach:

```text
Theme Persistence
    ↓
Low Risk
    ↓
Theme selection + Persistence checks
    ↓
Navigation + Refresh + Browser restart
    ↓
Standard Functional Coverage
```

The specific scenarios and test cases shall be defined in the subsequent test design artifacts. The risk assessment does not replace detailed requirements or independently establish new expected application behavior.

Coverage depth should be based on:

- The potential impact of failure.
- The likelihood estimate and its supporting rationale.
- The number and type of relevant failure conditions.
- The applicable product requirements.
- The testing interfaces available within the project scope.

---

## 6. Scope Boundaries

Risk-based testing shall follow the boundaries established in `product-scope.md`.

The assessment covers functional behavior related to authentication, authorization, conversations, messaging, and user experience, including UI and API automation where applicable.

The following activities and capabilities remain outside the defined project scope:

- Performance testing.
- Load and stress testing.
- Formal penetration testing.
- Comprehensive security assessment beyond the defined functional access-control checks.
- Native Android or iOS application testing.
- Retesting after a defect fix.
- Regression testing after a defect fix.
- Realtime message delivery or live synchronization as a product capability.

Message scrolling is included only for the documented behavior of automatically scrolling to the latest message when a conversation is opened or when the user sends a message. The risk assessment does not include realtime incoming-message scrolling or live synchronization scenarios.

These exclusions do not imply that the excluded capabilities have been tested or verified.

---

## 7. Risk Assessment Limitations and Review

The risk ratings in this document are initial QA assessments based on:

- The documented Relay product scope.
- The functional requirements and their identified failure scenarios.
- The potential impact of failure.
- The current understanding of the application.
- Available evidence and requirement clarifications.

Likelihood ratings are not based on production defect statistics, historical incident data, or measured failure rates.

Risk levels may be reviewed when additional information becomes available through:

- Requirement clarification.
- Exploratory testing.
- Initial test execution.
- Defect discovery.
- Technical investigation.
- New evidence about application behavior.

A risk rating should be changed only when there is a clear reason supported by updated requirements, relevant evidence, or a justified reassessment of impact or likelihood.

The risk assessment represents the current testing priority. It is not a guarantee that a particular defect exists or that a lower-risk feature cannot fail.

---

## 8. Traceability and Maintenance

Each risk shall remain traceable to the requirements that define the expected behavior being evaluated.

The expected traceability workflow is:

**Product Scope → Requirement → Risk Assessment → Test Scenario → Test Case → Test Execution → Evidence → Defect → Test Summary**

Risk IDs shall remain stable when test scenarios or test cases are added, unless a change to the risk register structure is explicitly justified.

When a risk is associated with multiple requirements, the relationship shall reflect the actual failure scenario rather than broad thematic similarity alone.

Risk assessment updates shall remain aligned with the latest locked requirements and product scope. Any requirement change that materially affects a risk shall be reviewed before the risk assessment is treated as current.

Open defects and behavior that has not been verified shall be reported transparently in the relevant test documentation.
