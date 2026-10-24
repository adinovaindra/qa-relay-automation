# Relay — Conversation Test Scenarios

## 1. Purpose

This document defines the conversation test scenarios derived from Relay's documented product scope, conversation requirements, and risk assessment.

The scenarios identify the conversation behaviors that require verification before detailed test cases and test execution activities are created.

The scenarios remain at a higher level than individual test cases. Each scenario may cover multiple relevant conditions, including conversation creation, retrieval, participant relationships, conversation list information, activity ordering, and error handling, where supported by the documented requirements and associated risks.

---

## 2. Scenario Design Approach

Conversation scenarios are derived from the following sources:

- Product scope
- Conversation requirements
- Risk assessment

The scenario design follows this relationship:

```text
Product Scope
    +
Conversation Requirements
    +
Risk Assessment
    ↓
Conversation Test Scenarios
```

The scenario design prioritizes conversation access, creation and retrieval behavior, and the integrity of conversation list information.

Risk assessment is used to inform scenario coverage and testing priority. It does not establish additional product requirements or replace the expected behavior documented in the requirements.

Where the requirements specify exact behavior or error messages, the scenarios preserve those expectations. Unspecified behavior is not assumed; any unresolved expectation must be clarified before it is treated as a definitive pass/fail criterion.

---

## 3. Conversation Scenarios

### SCN-CONV-001 — One-to-One Conversation

Verify that Relay supports one-to-one conversations between two users.

**Related Requirements:** REQ-CONV-001  
**Related Risks:** RSK-005  
**Risk Level:** High

**Coverage Considerations:**

- Conversation between two users.
- Conversation participant relationship.
- Retrieval of a conversation by its intended participants.

---

### SCN-CONV-002 — Conversation Creation and Retrieval

Verify that Relay supports creating and retrieving conversations according to the documented behavior.

**Related Requirements:** REQ-CONV-002  
**Related Risks:** RSK-005  
**Risk Level:** High

**Coverage Considerations:**

- Create a conversation between a user pair when no conversation already exists.
- Retrieve a conversation for a user pair that already has a conversation.
- Return the existing conversation when the same pair attempts to create another conversation.
- Prevent creation of duplicate conversations for the same user pair.

---

### SCN-CONV-003 — Self-Conversation Prevention

Verify that Relay prevents a user from creating a conversation with themselves through both the UI and API.

**Related Requirements:** REQ-CONV-007  
**Related Risks:** RSK-013  
**Risk Level:** Medium

**Coverage Considerations:**

- Attempt to create a self-conversation through the UI.
- Attempt to create a self-conversation through the API.
- Verify that self-conversation creation is prevented through both entry points.

---

### SCN-CONV-004 — Conversation Counterpart Name

Verify that each conversation list item displays the name of the other participant.

**Related Requirements:** REQ-CONV-003  
**Related Risks:** RSK-011  
**Risk Level:** Medium

**Coverage Considerations:**

- Display the counterpart's name in the conversation list.
- Verify the displayed name corresponds to the other participant in the conversation.

---

### SCN-CONV-005 — Latest Message Preview and Empty Conversation Preview

Verify that the conversation list displays the documented latest-message preview or empty preview for each conversation.

**Related Requirements:** REQ-CONV-004  
**Related Risks:** RSK-011, RSK-015  
**Risk Level:** Medium

**Coverage Considerations:**

- Display the latest message as the conversation preview.
- Display `No messages yet.` when the conversation contains no messages.
- Display the preview on a single line.
- Truncate long message previews with an ellipsis.

---

### SCN-CONV-006 — Conversation Activity Timestamp

Verify that conversation activity timestamps use the documented format based on the user's local date and time.

**Related Requirements:** REQ-CONV-005  
**Related Risks:** RSK-011  
**Risk Level:** Medium

**Coverage Considerations:**

- Activity occurring today is displayed in `HH.MM` format.
- Activity from the previous calendar day is displayed as `Yesterday`.
- Older activity is displayed in `DD Mmm` format.
- Date classification uses the user's local calendar date.

---

### SCN-CONV-007 — Conversation Ordering by Latest Activity

Verify that conversations are ordered according to their latest activity, including conversation creation and message sending.

**Related Requirements:** REQ-CONV-006  
**Related Risks:** RSK-008  
**Risk Level:** Medium

**Coverage Considerations:**

- Conversations are ordered by latest activity.
- Sending a message updates the conversation's activity ordering.
- Creating a new conversation counts as activity even when the conversation has no messages.
- A newly created empty conversation can appear at the top of the conversation list.

---

### SCN-CONV-008 — Nonexistent Conversation Error State

Verify that attempting to access a nonexistent conversation displays the documented error state.

**Related Requirements:** REQ-CONV-008  
**Related Risks:** RSK-009  
**Risk Level:** Medium

**Coverage Considerations:**

- Attempt to access a nonexistent conversation.
- Display the heading `This page couldn’t load`.
- Display the message `A server error occurred. Reload to try again.`
- Display the `Reload` button.

---

## 4. Scenario Traceability

The conversation scenarios maintain traceability between the documented requirements, associated risks, and scenario identifiers.

The relationship is:

```text
Requirement
    ↓
Risk Assessment
    ↓
Conversation Scenario
    ↓
Test Cases
    ↓
Execution and Evidence
```

### Requirement-to-Scenario Traceability

| Requirement ID | Related Risk ID(s) | Scenario ID(s) |
| -------------- | ------------------ | -------------- |
| REQ-CONV-001   | RSK-005            | SCN-CONV-001   |
| REQ-CONV-002   | RSK-005            | SCN-CONV-002   |
| REQ-CONV-003   | RSK-011            | SCN-CONV-004   |
| REQ-CONV-004   | RSK-011, RSK-015   | SCN-CONV-005   |
| REQ-CONV-005   | RSK-011            | SCN-CONV-006   |
| REQ-CONV-006   | RSK-008            | SCN-CONV-007   |
| REQ-CONV-007   | RSK-013            | SCN-CONV-003   |
| REQ-CONV-008   | RSK-009            | SCN-CONV-008   |

### Risk-to-Scenario Traceability

| Risk ID | Risk Area                                                                   | Scenario ID(s)                           |
| ------- | --------------------------------------------------------------------------- | ---------------------------------------- |
| RSK-005 | Conversation Access                                                         | SCN-CONV-001, SCN-CONV-002               |
| RSK-008 | Message and Conversation Ordering                                           | SCN-CONV-007                             |
| RSK-009 | Error Handling for Invalid Login Credentials and Non-Existent Conversations | SCN-CONV-008                             |
| RSK-011 | Conversation Previews and Timestamps                                        | SCN-CONV-004, SCN-CONV-005, SCN-CONV-006 |
| RSK-013 | Self-Conversation Restrictions                                              | SCN-CONV-003                             |
| RSK-015 | Empty States                                                                | SCN-CONV-005                             |

The scenario set is intended to guide subsequent test-case design. Scenario coverage does not imply that the scenarios have been executed or that the corresponding functionality has passed testing.
