# Conversation Requirements

## 1. Purpose

This document defines the functional requirements for one-to-one conversations in Relay, including conversation creation and retrieval, conversation list display, latest message previews, timestamps, conversation ordering, self-conversation restrictions, and handling invalid or non-existent conversations.

These requirements describe the expected product behavior independently of the underlying implementation.

## 2. Requirement Classification

Conversation requirements are organized into the following areas:

- One-to-One Conversations
- Conversation Creation and Retrieval
- Conversation List Display
- Conversation Timestamps
- Conversation Ordering
- Self-Conversation Restriction
- Invalid or Non-Existent Conversation

Requirement IDs follow the format `REQ-CONV-NNN`.

Conversation creation and retrieval, conversation list display, and conversation ordering are treated as separate but related responsibilities:

- **Conversation creation and retrieval:** Establishes or retrieves the conversation associated with a pair of users, reusing an existing conversation when one already exists for the same pair.
- **Conversation list display:** Presents conversation information, including the counterpart's name, latest message preview, and timestamp.
- **Conversation ordering:** Determines the position of each conversation in the list based on its latest activity.
- **Invalid or non-existent conversation:** Defines how the system handles attempts to access conversations that are invalid or do not exist, including displaying an appropriate error state.

## 3. Conversation Creation and Retrieval

### REQ-CONV-001 — One-to-One Conversations

The system shall support one-to-one conversations between two users.

### REQ-CONV-002 — Conversation Creation and Retrieval

The system shall allow users to retrieve or create conversations through the supported conversation functionality.

When a user requests a conversation with another user and a conversation between the same pair of users already exists, the system shall return the existing conversation rather than create a new one.

### REQ-CONV-007 — Self-Conversation Restriction

The system shall not allow users to create or access a one-to-one conversation with themselves.

Self-conversation attempts shall be prevented through both the user interface and the API.

## 4. Conversation List Display

### REQ-CONV-003 — Conversation Counterpart Name

The system shall display the conversation counterpart's name in the conversation list.

### REQ-CONV-004 — Latest Message Preview

The system shall display a preview of the latest message in each conversation in the conversation list.

When a conversation contains no messages, the system shall display the text `No messages yet.` as the preview.

The preview shall be displayed on a single line. If the message content exceeds the available display width, the system shall truncate the displayed text and indicate truncation with an ellipsis.

### REQ-CONV-005 — Conversation Timestamp

The system shall display timestamp information for each conversation in the conversation list based on the latest conversation activity.

The displayed timestamp shall follow these rules, using the user's local date and time:

- If the latest conversation activity occurred on the current calendar date, the system shall display the activity time in `HH.MM` format (e.g., `09.00`).
- If the latest conversation activity occurred on the previous calendar date, the system shall display `Yesterday`.
- If the latest conversation activity occurred before the previous calendar date, the system shall display the activity date in `DD Mmm` format (e.g., `22 Oct`).

## 5. Conversation Ordering

### REQ-CONV-006 — Conversation Ordering

The system shall order conversations based on their latest activity.

Latest activity shall include conversation creation and the sending of a message in an existing conversation.

A newly created conversation with no messages shall appear at the top of the conversation list when its creation is the most recent activity.

## 6. Invalid or Non-Existent Conversation

### REQ-CONV-008 — Invalid or Non-Existent Conversation

The system shall display an error state when a user attempts to access a conversation that does not exist.

The error state shall display the following elements:

- **Heading:** `This page couldn’t load`
- **Message:** `A server error occurred. Reload to try again.`
- **Button:** `Reload`

## 7. Requirement Traceability and Verification

Each conversation requirement shall be mapped to one or more test scenarios and test cases to support systematic verification.

Verification shall cover the relevant UI behavior and, where applicable, API behavior.

The conversation testing workflow shall maintain traceability across the following artifacts:

Requirement → Test Scenario → Test Case → Test Execution → Evidence → Defect → Test Summary.

Test results shall reflect the behavior actually observed during execution. Any requirement that has not been verified shall be reported transparently rather than assumed to have passed.

Retesting and regression testing after defect fixes are outside the defined portfolio deliverables. Open defects and behavior that has not been verified shall be reported transparently in the relevant test documentation.