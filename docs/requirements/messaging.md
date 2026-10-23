# Messaging Requirements

## 1. Purpose

This document defines the functional and behavioral requirements for messaging in Relay.

The requirements are used as the basis for automation QA activities and are written to support traceability to test scenarios, test cases, execution results, and defects.

The requirements are derived from the available Relay project documentation and explicit product decisions made during requirements clarification.

## 2. Requirement Classification

Messaging requirements are grouped into the following functional areas:

- **Message Sending and Validation:** Defines the rules for sending text messages, validating message content, and preserving the content entered by the user.
- **Message Ordering:** Defines the chronological order of messages and the consistency of that order across users and application sessions.
- **Message Persistence:** Defines the availability of previously sent messages after application refresh and re-login.
- **Message History Scrolling:** Defines automatic scrolling behavior when a conversation is opened, messages are sent or received, and the user navigates through older messages.
- **Message Timestamps and Date Separators:** Defines the display format of message timestamps and the grouping of messages by calendar date.
- **Empty Message Input Handling:** Defines the UI behavior when the message input is empty or contains only whitespace.

Requirement IDs use the following format:

`REQ-MSG-NNN`

The requirements below describe expected product behavior without prescribing specific implementation mechanisms unless explicitly required.

## 3. Message Sending and Validation

### REQ-MSG-001 — Message Sending and Validation

The application shall allow users to send text messages within an authorized conversation.

The API shall reject messages that are empty or contain only whitespace characters.

The application shall preserve the exact message content entered by the user, including leading whitespace, trailing whitespace, repeated whitespace, and line breaks.

Messages containing text alongside whitespace characters shall be accepted, provided that the message is not empty or composed entirely of whitespace.

### Message Length

The product does not define a maximum message length requirement.

No maximum character limit is specified in this document.

## 4. Message History and Persistence

### REQ-MSG-002 — Message Ordering

Messages shall be displayed within the conversation history in chronological order, with the oldest message at the top and the newest message at the bottom.

Message ordering shall remain consistent after application refresh and re-login.

Messages with identical timestamps shall maintain a consistent relative order across users and after application refresh and re-login.

The displayed timestamp shall not determine message ordering.

### REQ-MSG-003 — Message Persistence

Messages shall persist across application refresh and re-login.

Messages previously sent within a conversation shall remain available in the conversation history after the user refreshes the application or logs out and logs in again.

## 5. Message History Scrolling Behavior

### REQ-MSG-004 — Message History Scrolling Behavior

The application shall automatically scroll to the bottom of the conversation history to display the most recent message when a conversation is opened.

When a user sends a message, the application shall automatically scroll to the bottom of the conversation history to display the newly sent message.

## 6. Message Timestamps and Date Separators

### REQ-MSG-005 — Message Timestamps and Date Separators

The application shall display a timestamp for each message, positioned below the message bubble.

Message timestamps shall use the 24-hour format `HH.mm` (e.g., `16.01`).

The application shall group messages in the conversation history by calendar date using the following date separator labels:

- **Today:** Messages sent on the current calendar date.
- **Yesterday:** Messages sent on the previous calendar date.
- **DD Mmm:** Messages sent before the previous calendar date, displayed using the day and abbreviated month format (e.g., `13 Oct`).

Date separator labels shall be determined based on the user's local calendar date, rather than the elapsed time since a message was sent.

## 7. Empty Message Input Handling

### REQ-MSG-006 — Empty Message Input Handling

The application shall disable the Send button when the message input is empty or contains whitespace characters only, preventing message submission through the UI.

This UI behavior shall complement the API validation defined in `REQ-MSG-001`.

## 8. Requirement Traceability and Verification

Each requirement is identified by a unique ID to support traceability to its corresponding test scenarios, test cases, execution results, and defects.

The requirement IDs shall remain stable when additional test scenarios or test cases are created, unless a change to the requirement structure is explicitly justified.

The expected traceability workflow is:

**Product Scope → Requirement → Risk Assessment → Test Scenario → Test Case → Test Execution → Evidence → Defect → Test Summary**

Retesting and regression testing after defect fixes are outside the defined portfolio deliverables. Open defects and behavior that has not been verified shall be reported transparently in the relevant test documentation.
