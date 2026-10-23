# Product Documentation

## Purpose

This directory contains the product and QA documentation used to define Relay's product scope, documented requirements, and risk priorities for testing.

These documents establish the basis for test design and help maintain traceability between expected application behavior, identified risks, and testing activities.

## Documents

| Document                                                          | Purpose                                                                                                                                                                          |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Product & QA Scope](./product-scope.md)                          | Defines Relay's system under test, product functionality, QA objectives, in-scope and out-of-scope areas, testing strategy, and requirement sources.                             |
| [Authentication Requirements](./requirements/authentication.md)   | Documents requirements for user registration, login, logout, protected access, authentication state persistence, and session expiration.                                         |
| [Authorization Requirements](./requirements/authorization.md)     | Documents requirements for conversation access, authorized participants, client-provided identity, message sender identity, and server-side authorization.                       |
| [Conversation Requirements](./requirements/conversation.md)       | Documents requirements for one-to-one conversations, conversation creation and retrieval, conversation list information and ordering, and invalid or non-existent conversations. |
| [Messaging Requirements](./requirements/messaging.md)             | Documents requirements for message sending and validation, message ordering and persistence, history scrolling, timestamps, date separators, and empty message input handling.   |
| [User Experience Requirements](./requirements/user-experience.md) | Documents requirements for theme availability and persistence, responsive layout, and empty-state behavior.                                                                      |
| [Risk Assessment](./risk-assessment.md)                           | Defines the risk assessment approach, risk register, risk-based testing priorities, coverage considerations, scope boundaries, and traceability practices.                       |

## How These Documents Are Used

1. Review the product and QA scope to understand the boundaries of the testing effort.
2. Use the feature-specific requirements to identify documented expected behavior and maintain requirement traceability.
3. Use the risk assessment to prioritize testing activities according to the identified risks.
4. Derive test scenarios and test cases from the documented requirements and identified risks.
5. Evaluate observed behavior against the applicable requirements and available evidence before classifying a deviation as a defect.

Requirements or behavior that are not sufficiently specified must not be treated as confirmed product expectations. Such gaps should be recorded for clarification or investigation rather than automatically classified as defects.

## Documentation Structure

- `product-scope.md` — Product and QA scope.
- `requirements/` — Feature-specific requirements for authentication, authorization, conversations, messaging, and user experience.
- `risk-assessment.md` — Risk assessment and risk-based testing guidance.

## Documentation Principles

- **Requirement traceability:** Keep requirements linked to relevant risks and downstream test design artifacts.
- **Evidence-based evaluation:** Assess observed behavior against documented expectations and available evidence.
- **Scope discipline:** Keep testing activities within the defined scope and acknowledge documented exclusions.
- **Transparent limitations:** Distinguish confirmed requirements, unresolved ambiguities, and behavior that has not been verified.
