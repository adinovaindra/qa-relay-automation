# Relay — User Experience Test Scenarios

## 1. Purpose

This document defines the user experience test scenarios derived from Relay's documented product scope, user experience requirements, and risk assessment.

The scenarios identify the user experience behaviors that require verification before detailed test cases and test execution activities are created.

The scenarios remain at a higher level than individual test cases. Each scenario may cover multiple relevant conditions, including theme rendering, theme persistence, responsive layout, and empty-state behavior, where supported by the documented requirements and associated risks.

---

## 2. Scenario Design Approach

User experience scenarios are derived from the following sources:

- Product scope
- User experience requirements
- Risk assessment

The scenario design follows this relationship:

Product Scope
    +
User Experience Requirements
    +
Risk Assessment
    ↓
User Experience Test Scenarios

The scenario design prioritizes responsive behavior and empty-state presentation while maintaining coverage of theme rendering and theme persistence.

Risk assessment is used to inform scenario coverage and testing priority. It does not establish additional product requirements or replace the expected behavior documented in the requirements.

Where the requirements specify exact display text, layout behavior, or persistence expectations, the scenarios preserve those expectations. Unspecified behavior is not assumed; any unresolved expectation must be clarified before it is treated as a definitive pass/fail criterion.

---

## 3. User Experience Scenarios

### SCN-UX-001 — Light Mode Rendering

Verify that Light Mode is applied correctly across the Register, Login, and Chat pages.

**Related Requirements:** REQ-UX-001
**Related Risks:** RSK-019
**Risk Level:** Low

**Coverage Considerations:**

- Light Mode on the Register page.
- Light Mode on the Login page.
- Light Mode on the Chat page.
- Consistent application of Light Mode across all three pages.
- Visibility and usability of page content and primary controls in Light Mode.

---

### SCN-UX-002 — Dark Mode Rendering

Verify that Dark Mode is applied correctly across the Register, Login, and Chat pages.

**Related Requirements:** REQ-UX-002
**Related Risks:** RSK-019
**Risk Level:** Low

**Coverage Considerations:**

- Dark Mode on the Register page.
- Dark Mode on the Login page.
- Dark Mode on the Chat page.
- Consistent application of Dark Mode across all three pages.
- Visibility and usability of page content and primary controls in Dark Mode.

---

### SCN-UX-003 — Theme Persistence

Verify that the last selected theme persists across navigation, refresh, browser restart, logout, and subsequent login while the stored browser preference remains available.

**Related Requirements:** REQ-UX-003
**Related Risks:** RSK-016
**Risk Level:** Low

**Coverage Considerations:**

- Theme persistence across navigation between the Register, Login, and Chat pages.
- Theme persistence after page refresh.
- Theme persistence after browser restart.
- Theme persistence after logout and subsequent login.
- Consistent application of the stored theme preference across the application's pages.

---

### SCN-UX-004 — Responsive Layout

Verify that Relay's layout adapts to modern desktop and mobile screen sizes while keeping primary features and controls usable.

**Related Requirements:** REQ-UX-004
**Related Risks:** RSK-010
**Risk Level:** Medium

**Coverage Considerations:**

- Layout behavior at representative modern desktop screen sizes.
- Layout behavior at representative modern mobile screen sizes.
- Usability of primary features and controls across the tested screen sizes.
- Important elements are not clipped.
- Horizontal scrolling is not required.
- Layout usability across relevant populated and empty conversation states.

---

### SCN-UX-005 — Desktop Empty State: No Conversations

Verify that the desktop layout displays the documented empty-state content when the user has no conversations.

**Related Requirements:** REQ-UX-005
**Related Risks:** RSK-015
**Risk Level:** Low

**Coverage Considerations:**

- The conversation list displays `No conversations yet.`
- The conversation list displays `Start a new chat below.`
- The main area displays `Select a conversation.`
- The main area displays `Choose a conversation from the list or start a new chat to begin messaging.`
- The conversation list and main area display their respective empty states together.

---

### SCN-UX-006 — Desktop Empty State: Conversations Exist but None Is Selected

Verify that the desktop layout displays available conversations while showing the documented empty state in the main area when no conversation is selected.

**Related Requirements:** REQ-UX-005
**Related Risks:** RSK-015
**Risk Level:** Low

**Coverage Considerations:**

- Available conversations appear in the conversation list.
- An empty conversation preview displays `No messages yet.` when applicable.
- The main area displays `Select a conversation.`
- The main area displays `Choose a conversation from the list or start a new chat to begin messaging.`
- The main area does not display messages from a conversation when no conversation is selected.

---

### SCN-UX-007 — Desktop Empty State: Selected Conversation Has No Messages

Verify that the desktop layout displays the documented empty state when the user selects a conversation that contains no messages.

**Related Requirements:** REQ-UX-005
**Related Risks:** RSK-015
**Risk Level:** Low

**Coverage Considerations:**

- The selected conversation is displayed in the main area.
- The main area displays `No messages yet.`
- The main area displays `Send a message to start the conversation.`
- The selected conversation's empty state is displayed instead of the general `Select a conversation.` state.

---

### SCN-UX-008 — Mobile Empty State: No Conversations

Verify that the mobile layout displays the documented conversation-list empty state when the user has no conversations.

**Related Requirements:** REQ-UX-005
**Related Risks:** RSK-015
**Risk Level:** Low

**Coverage Considerations:**

- The conversation list panel is displayed.
- The list displays `No conversations yet.`
- The list displays `Start a new chat below.`
- The main chat area is hidden.

---

### SCN-UX-009 — Mobile Empty State: Conversations Exist but None Is Selected

Verify that the mobile layout displays available conversations without displaying the main chat area when no conversation is selected.

**Related Requirements:** REQ-UX-005
**Related Risks:** RSK-015
**Risk Level:** Low

**Coverage Considerations:**

- Available conversations appear in the conversation list.
- An empty conversation preview displays `No messages yet.` when applicable.
- The conversation list remains visible.
- The main chat area remains hidden until a conversation is selected.

---

### SCN-UX-010 — Mobile Empty State: Selected Conversation Has No Messages

Verify that the mobile layout displays the documented empty state when the user selects a conversation that contains no messages.

**Related Requirements:** REQ-UX-005
**Related Risks:** RSK-015
**Risk Level:** Low

**Coverage Considerations:**

- The selected conversation's chat area is displayed.
- The conversation list is hidden.
- The main area displays `No messages yet.`
- The main area displays `Send a message to start the conversation.`
- The back button is available.

---

## 4. Scenario Traceability

The user experience scenarios maintain traceability between the documented requirements, associated risks, and scenario identifiers.

The relationship is:

Requirement
    ↓
Risk Assessment
    ↓
User Experience Scenario
    ↓
Test Cases
    ↓
Execution and Evidence

### Requirement-to-Scenario Traceability

| Requirement ID | Related Risk ID(s) | Scenario ID(s) |
|---|---|---|
| REQ-UX-001 | RSK-019 | SCN-UX-001 |
| REQ-UX-002 | RSK-019 | SCN-UX-002 |
| REQ-UX-003 | RSK-016 | SCN-UX-003 |
| REQ-UX-004 | RSK-010 | SCN-UX-004 |
| REQ-UX-005 | RSK-015 | SCN-UX-005, SCN-UX-006, SCN-UX-007, SCN-UX-008, SCN-UX-009, SCN-UX-010 |

### Risk-to-Scenario Traceability

| Risk ID | Risk Area | Scenario ID(s) |
|---|---|---|
| RSK-010 | Responsive Behavior | SCN-UX-004 |
| RSK-015 | Empty States | SCN-UX-005, SCN-UX-006, SCN-UX-007, SCN-UX-008, SCN-UX-009, SCN-UX-010 |
| RSK-016 | Theme Persistence | SCN-UX-003 |
| RSK-019 | Theme Rendering and Application Failure | SCN-UX-001, SCN-UX-002 |

The scenario set is intended to guide subsequent test-case design. Scenario coverage does not imply that the scenarios have been executed or that the corresponding functionality has passed testing.