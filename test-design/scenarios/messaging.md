# Relay — Messaging Test Scenarios

## 1. Purpose

This document defines the messaging test scenarios derived from Relay's documented product scope, messaging requirements, and risk assessment.

The scenarios identify the messaging behaviors that require verification before detailed test cases and test execution activities are created.

The scenarios remain at a higher level than individual test cases. Each scenario may cover multiple relevant conditions, including message submission, content validation, message ordering, persistence, scrolling, timestamps, and input state, where supported by the documented requirements and associated risks.

---

## 2. Scenario Design Approach

Messaging scenarios are derived from the following sources:

- Product scope
- Messaging requirements
- Risk assessment

The scenario design follows this relationship:

Product Scope
    +
Messaging Requirements
    +
Risk Assessment
    ↓
Messaging Test Scenarios

The scenario design prioritizes message persistence, message ordering, and correct message submission while maintaining coverage of message presentation and input behavior.

Risk assessment is used to inform scenario coverage and testing priority. It does not establish additional product requirements or replace the expected behavior documented in the requirements.

Where the requirements specify exact behavior or display formats, the scenarios preserve those expectations. Unspecified behavior is not assumed; any unresolved expectation must be clarified before it is treated as a definitive pass/fail criterion.

---

## 3. Messaging Scenarios

### SCN-MSG-001 — Send Text Message

Verify that a user can send text messages within an authorized conversation.

**Related Requirements:** REQ-MSG-001  
**Related Risks:** RSK-007  
**Risk Level:** Medium

**Coverage Considerations:**

- Send text content within an authorized conversation.
- Verify that the message can be submitted when it contains non-whitespace content.
- Verify that message content is handled according to the documented input requirements.

---

### SCN-MSG-002 — Empty and Whitespace-Only Message Validation

Verify that empty and whitespace-only message content is rejected according to the documented UI and API requirements.

**Related Requirements:** REQ-MSG-001, REQ-MSG-006  
**Related Risks:** RSK-007, RSK-012  
**Risk Level:** Medium

**Coverage Considerations:**

- The Send button is disabled when the input is empty.
- The Send button is disabled when the input contains only whitespace.
- The UI prevents submission when the input is empty or whitespace-only.
- The API rejects empty message content.
- The API rejects whitespace-only message content.

---

### SCN-MSG-003 — Message Content Preservation

Verify that submitted message content preserves the documented whitespace and line-break behavior.

**Related Requirements:** REQ-MSG-001  
**Related Risks:** RSK-007  
**Risk Level:** Medium

**Coverage Considerations:**

- Preserve leading whitespace.
- Preserve trailing whitespace.
- Preserve repeated whitespace.
- Preserve line breaks.
- Accept content containing both non-whitespace and whitespace characters.
- Do not treat content containing non-whitespace characters as whitespace-only.

---

### SCN-MSG-004 — Chronological Message Ordering

Verify that messages are displayed in chronological order, with the oldest message at the top and the newest message at the bottom.

**Related Requirements:** REQ-MSG-002  
**Related Risks:** RSK-008  
**Risk Level:** Medium

**Coverage Considerations:**

- Older messages appear before newer messages.
- Newer messages appear below older messages.
- Displayed timestamps do not determine message ordering.

---

### SCN-MSG-005 — Message Ordering Consistency Across Refresh and Re-Login

Verify that message ordering remains consistent after page refresh and re-login, including when multiple messages have equal timestamps.

**Related Requirements:** REQ-MSG-002  
**Related Risks:** RSK-008  
**Risk Level:** Medium

**Coverage Considerations:**

- Message order remains consistent after page refresh.
- Message order remains consistent after logout and re-login.
- Messages with equal timestamps maintain consistent relative ordering across users, refreshes, and re-logins.
- Displayed timestamps do not determine message ordering.

---

### SCN-MSG-006 — Message Persistence

Verify that sent messages remain available after page refresh and re-login.

**Related Requirements:** REQ-MSG-003  
**Related Risks:** RSK-004  
**Risk Level:** High

**Coverage Considerations:**

- Messages remain available after page refresh.
- Messages remain available after logout and subsequent login.
- Persisted messages retain their original content.
- Persisted messages remain associated with the correct conversation.

---

### SCN-MSG-007 — Automatic Message Scrolling

Verify that the conversation scrolls to the latest message under the documented conditions.

**Related Requirements:** REQ-MSG-004  
**Related Risks:** RSK-017  
**Risk Level:** Low

**Coverage Considerations:**

- Scroll to the latest message when opening a conversation.
- Scroll to the latest message after the user sends a message.

This scenario does not cover automatic scrolling in response to incoming messages or real-time synchronization.

---

### SCN-MSG-008 — Message Timestamps and Date Separators

Verify that message timestamps and date separators follow the documented formats and the user's local calendar date.

**Related Requirements:** REQ-MSG-005  
**Related Risks:** RSK-018  
**Risk Level:** Low

**Coverage Considerations:**

- Display a timestamp under each message bubble in `HH.mm` 24-hour format.
- Display `Today` for messages on the current local calendar date.
- Display `Yesterday` for messages on the previous local calendar date.
- Display `DD Mmm` for messages from earlier calendar dates.
- Determine date separators using the user's local calendar date rather than elapsed time.

---

## 4. Scenario Traceability

The messaging scenarios maintain traceability between the documented requirements, associated risks, and scenario identifiers.

The relationship is:

Requirement
    ↓
Risk Assessment
    ↓
Messaging Scenario
    ↓
Test Cases
    ↓
Execution and Evidence

### Requirement-to-Scenario Traceability

| Requirement ID | Related Risk ID(s) | Scenario ID(s) |
|---|---|---|
| REQ-MSG-001 | RSK-007 | SCN-MSG-001, SCN-MSG-002, SCN-MSG-003 |
| REQ-MSG-002 | RSK-008 | SCN-MSG-004, SCN-MSG-005 |
| REQ-MSG-003 | RSK-004 | SCN-MSG-006 |
| REQ-MSG-004 | RSK-017 | SCN-MSG-007 |
| REQ-MSG-005 | RSK-018 | SCN-MSG-008 |
| REQ-MSG-006 | RSK-007, RSK-012 | SCN-MSG-002 |

### Risk-to-Scenario Traceability

| Risk ID | Risk Area | Scenario ID(s) |
|---|---|---|
| RSK-004 | Message Persistence | SCN-MSG-006 |
| RSK-007 | Registration and Message Input Validation | SCN-MSG-001, SCN-MSG-002, SCN-MSG-003 |
| RSK-008 | Message and Conversation Ordering | SCN-MSG-004, SCN-MSG-005 |
| RSK-012 | Message Input UI State | SCN-MSG-002 |
| RSK-017 | Message Scrolling | SCN-MSG-007 |
| RSK-018 | Message Timestamps and Date Separators | SCN-MSG-008 |

The scenario set is intended to guide subsequent test-case design. Scenario coverage does not imply that the scenarios have been executed or that the corresponding functionality has passed testing.