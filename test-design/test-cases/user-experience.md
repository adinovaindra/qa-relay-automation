# Relay — User Experience Test Cases

## 1. Purpose

This document defines the detailed user experience test cases derived from Relay's approved user experience scenarios, documented user experience requirements, product scope, and risk assessment.

The test cases translate the approved scenarios into repeatable verification steps with explicit preconditions, test data, expected results, and traceability. They describe test design only; execution outcomes and evidence are recorded separately.

---

## 2. Test Case Design Approach

User experience test cases are derived from the following sources:

- Product scope
- User experience requirements
- Risk assessment
- Approved user experience scenarios

The design considers theme rendering across application pages, theme preference persistence across supported state transitions, responsive layout usability, and empty-state presentation across desktop and mobile layouts.

Test cases inherit their scope from the approved scenarios but map only to the requirements and risks directly relevant to the behavior being verified. Risk level informs execution priority; it does not determine the number of test cases required.

Expected results are based on the documented requirements. Where a requirement does not specify a detail, such as exact responsive breakpoints or an unspecified visual design property, this document does not invent an acceptance criterion.

Browser, browser version, operating system, execution mode, actual result, status, evidence, and defect references belong in separate execution records rather than being repeated in each test case.

---

## 3. Test Case Structure

Each test case uses the following structure:

| Field               | Description                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| Test Case ID        | Unique identifier linked to the parent scenario.                                                 |
| Title               | Concise description of the behavior being verified.                                              |
| Related Scenario    | Approved parent scenario.                                                                        |
| Related Requirement | Requirement or requirements directly verified by the test case.                                  |
| Related Risk        | Risk or risks directly relevant to the behavior verified.                                        |
| Risk Level          | Risk level associated with the behavior, based on the risk assessment.                           |
| Test Design Method  | Method used to derive the test case.                                                             |
| Test Type           | Classification of the test, such as functional, responsive, visual, or state-transition testing. |
| Priority            | Recommended execution priority, informed by risk and coverage needs.                             |
| Preconditions       | Conditions that must be true before the steps begin.                                             |
| Test Data           | Values or data conditions needed to execute the test.                                            |
| Steps               | Ordered actions performed by the tester or implemented by an automated test.                     |
| Expected Result     | Observable result required by the documented requirement.                                        |

### Test Case ID Convention

Test case IDs follow the conceptual format:

`TC-{FEATURE}-{SCENARIO NUMBER}-{CASE SEQUENCE}`

- `TC` identifies the artifact as a test case.
- `{FEATURE}` identifies the functional area, such as AUTH, AUTHZ, CONV, MSG, or UX.
- `{SCENARIO NUMBER}` identifies the parent scenario number to which the test case belongs.
- `{CASE SEQUENCE}` distinguishes individual test cases derived from the same scenario, using a sequential number starting from `01`.

For example, `TC-UX-001-01` identifies the first test case derived from `SCN-UX-001`. An additional test case derived from the same scenario would use `TC-UX-001-02`.

The test case ID must remain unique within the test case repository and maintain a clear reference to its parent scenario.

Execution-specific information such as browser environment, browser version, operating system, execution mode, actual result, status, evidence, and defect ID is recorded separately during test execution.

---

## 4. User Experience Test Cases

### TC-UX-001-01 — Verify Light Mode Across Register, Login, and Chat Pages

| Field               | Value                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-UX-001-01                                                                                            |
| Title               | Verify Light Mode across Register, Login, and Chat pages                                                |
| Related Scenario    | SCN-UX-001 [SCN-UX-001](../scenarios/user-experience.md#scn-ux-001--light-mode-rendering)               |
| Related Requirement | REQ-UX-001 [REQ-UX-001](../../docs/requirements/user-experience.md#req-ux-001--light-mode-availability) |
| Related Risk        | RSK-019 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                             |
| Risk Level          | Low                                                                                                     |
| Test Design Method  | Requirement-Based + Risk-Based                                                                          |
| Test Type           | Functional / Visual                                                                                     |
| Priority            | Low                                                                                                     |

#### Preconditions

- Relay is accessible.
- The Register, Login, and Chat pages are available.
- A registered user account and valid credentials are available.
- The tester can access the Register and Login pages while unauthenticated and the Chat page after authentication.

#### Test Data

| Data              | Value                             |
| ----------------- | --------------------------------- |
| User              | Registered test user              |
| Theme             | Light Mode                        |
| Application Pages | Register, Login, and Chat         |
| UI Elements       | Page content and primary controls |

#### Steps

1. Open the Relay application.
2. Navigate to the Register page while unauthenticated.
3. Select Light Mode if it is not already active.
4. Observe the page content and primary controls.
5. Navigate to the Login page.
6. Observe the page content and primary controls.
7. Sign in using valid credentials.
8. Verify that the Chat page is displayed.
9. Observe the page content and primary controls.
10. Verify that Light Mode is applied across all three pages.

#### Expected Result

- Light Mode is available and can be applied.
- Light Mode is applied on the Register page.
- Light Mode is applied on the Login page.
- Light Mode is applied on the Chat page.
- Page content and primary controls remain visible and usable in Light Mode.
- Light Mode is applied consistently across the three pages.

---

### TC-UX-002-01 — Verify Dark Mode Across Register, Login, and Chat Pages

| Field               | Value                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------ |
| Test Case ID        | TC-UX-002-01                                                                                           |
| Title               | Verify Dark Mode across Register, Login, and Chat pages                                                |
| Related Scenario    | SCN-UX-002 [SCN-UX-002](../scenarios/user-experience.md#scn-ux-002--dark-mode-rendering)               |
| Related Requirement | REQ-UX-002 [REQ-UX-002](../../docs/requirements/user-experience.md#req-ux-002--dark-mode-availability) |
| Related Risk        | RSK-019 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                            |
| Risk Level          | Low                                                                                                    |
| Test Design Method  | Requirement-Based + Risk-Based                                                                         |
| Test Type           | Functional / Visual                                                                                    |
| Priority            | Low                                                                                                    |

#### Preconditions

- Relay is accessible.
- The Register, Login, and Chat pages are available.
- A registered user account and valid credentials are available.
- The tester can access the Register and Login pages while unauthenticated and the Chat page after authentication.

#### Test Data

| Data              | Value                             |
| ----------------- | --------------------------------- |
| User              | Registered test user              |
| Theme             | Dark Mode                         |
| Application Pages | Register, Login, and Chat         |
| UI Elements       | Page content and primary controls |

#### Steps

1. Open the Relay application.
2. Navigate to the Register page while unauthenticated.
3. Select Dark Mode.
4. Observe the page content and primary controls.
5. Navigate to the Login page.
6. Observe the page content and primary controls.
7. Sign in using valid credentials.
8. Verify that the Chat page is displayed.
9. Observe the page content and primary controls.
10. Verify that Dark Mode is applied across all three pages.

#### Expected Result

- Dark Mode is available and can be applied.
- Dark Mode is applied on the Register page.
- Dark Mode is applied on the Login page.
- Dark Mode is applied on the Chat page.
- Page content and primary controls remain visible and usable in Dark Mode.
- Dark Mode is applied consistently across the three pages.

---

### TC-UX-003-01 — Verify Theme Persistence After Navigation and Refresh

| Field               | Value                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| Test Case ID        | TC-UX-003-01                                                                                                 |
| Title               | Verify theme persistence after navigation and refresh                                                        |
| Related Scenario    | SCN-UX-003 [SCN-UX-003](../scenarios/user-experience.md#scn-ux-003--theme-persistence)                       |
| Related Requirement | REQ-UX-003 [REQ-UX-003](../../docs/requirements/user-experience.md#req-ux-003--theme-preference-persistence) |
| Related Risk        | RSK-016 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                  |
| Risk Level          | Low                                                                                                          |
| Test Design Method  | Requirement-Based + Risk-Based                                                                               |
| Test Type           | Functional / State Transition                                                                                |
| Priority            | Low                                                                                                          |

#### Preconditions

- Relay is accessible.
- A registered user account and valid credentials are available.
- The tester can access the Register, Login, and Chat pages.
- The browser's stored theme preference remains available throughout the test.

#### Test Data

| Data              | Value                            |
| ----------------- | -------------------------------- |
| User              | Registered test user             |
| Selected Theme    | Dark Mode                        |
| State Transitions | Page navigation and page refresh |

#### Steps

1. Open Relay and select Dark Mode.
2. Verify that Dark Mode is applied.
3. Navigate between the Register, Login, and Chat pages as permitted by the current authentication state.
4. Observe the theme applied on each accessible page.
5. Refresh the current page.
6. Observe the theme after the page reloads.
7. Navigate to another accessible page.
8. Verify that the previously selected theme remains applied.

#### Expected Result

- Dark Mode is applied after it is selected.
- The selected theme remains applied when navigating between accessible Relay pages.
- Dark Mode remains applied after a page refresh.
- The selected theme and displayed theme remain consistent while the stored browser preference remains available.

---

### TC-UX-003-02 — Verify Theme Persistence After Browser Restart

| Field               | Value                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| Test Case ID        | TC-UX-003-02                                                                                                 |
| Title               | Verify theme persistence after browser restart                                                               |
| Related Scenario    | SCN-UX-003 [SCN-UX-003](../scenarios/user-experience.md#scn-ux-003--theme-persistence)                       |
| Related Requirement | REQ-UX-003 [REQ-UX-003](../../docs/requirements/user-experience.md#req-ux-003--theme-preference-persistence) |
| Related Risk        | RSK-016 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                  |
| Risk Level          | Low                                                                                                          |
| Test Design Method  | Requirement-Based + Risk-Based                                                                               |
| Test Type           | Functional / State Transition                                                                                |
| Priority            | Low                                                                                                          |

#### Preconditions

- Relay is accessible.
- A registered user account and valid credentials are available.
- The browser can be closed and reopened.
- The browser's stored theme preference remains available and is not cleared when the browser closes.

#### Test Data

| Data             | Value                |
| ---------------- | -------------------- |
| User             | Registered test user |
| Selected Theme   | Dark Mode            |
| State Transition | Browser restart      |

#### Steps

1. Open Relay in the browser.
2. Select Dark Mode.
3. Verify that Dark Mode is applied.
4. Close the browser.
5. Reopen the browser without clearing its stored site data.
6. Navigate to Relay.
7. Observe the theme applied on the page.
8. Sign in if required.
9. Observe the theme applied to the accessible application page.
10. Verify that the previously selected theme remains applied.

#### Expected Result

- Dark Mode is applied before the browser is closed.
- The browser is reopened without clearing the stored theme preference.
- The previously selected Dark Mode remains applied after Relay is reopened.
- The selected theme remains consistent with the stored browser preference.

---

### TC-UX-003-03 — Verify Theme Persistence After Logout and Re-Login

| Field               | Value                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| Test Case ID        | TC-UX-003-03                                                                                                 |
| Title               | Verify theme persistence after logout and re-login                                                           |
| Related Scenario    | SCN-UX-003 [SCN-UX-003](../scenarios/user-experience.md#scn-ux-003--theme-persistence)                       |
| Related Requirement | REQ-UX-003 [REQ-UX-003](../../docs/requirements/user-experience.md#req-ux-003--theme-preference-persistence) |
| Related Risk        | RSK-016 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                  |
| Risk Level          | Low                                                                                                          |
| Test Design Method  | Requirement-Based + Risk-Based                                                                               |
| Test Type           | Functional / State Transition                                                                                |
| Priority            | Low                                                                                                          |

#### Preconditions

- Relay is accessible.
- A registered user account and valid credentials are available.
- The user can select a theme and log out.
- The browser's stored theme preference remains available throughout the test.

#### Test Data

| Data             | Value                |
| ---------------- | -------------------- |
| User             | Registered test user |
| Selected Theme   | Dark Mode            |
| State Transition | Logout and re-login  |

#### Steps

1. Open Relay and sign in using valid credentials.
2. Select Dark Mode.
3. Verify that Dark Mode is applied.
4. Log out from Relay.
5. Sign in again using the same account.
6. Observe the theme applied to the application.
7. Verify that the previously selected theme remains applied.

#### Expected Result

- Dark Mode is applied before logout.
- The user can log out and sign in again successfully.
- Dark Mode remains applied after re-login while the stored browser preference remains available.
- The selected theme and displayed theme remain consistent.

---

### TC-UX-004-01 — Verify Responsive Layout on Desktop

| Field               | Value                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-UX-004-01                                                                                      |
| Title               | Verify responsive layout on desktop                                                               |
| Related Scenario    | SCN-UX-004 [SCN-UX-004](../scenarios/user-experience.md#scn-ux-004--responsive-layout)            |
| Related Requirement | REQ-UX-004 [REQ-UX-004](../../docs/requirements/user-experience.md#req-ux-004--responsive-layout) |
| Related Risk        | RSK-010 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                       |
| Risk Level          | Medium                                                                                            |
| Test Design Method  | Requirement-Based + Risk-Based                                                                    |
| Test Type           | Functional / Responsive                                                                           |
| Priority            | Medium                                                                                            |

#### Preconditions

- Relay is accessible.
- A registered user account and valid credentials are available.
- At least one existing conversation is available to the user.
- A desktop browser viewport can be configured to a representative desktop size.

#### Test Data

| Data               | Value                                                         |
| ------------------ | ------------------------------------------------------------- |
| User               | Registered test user                                          |
| Viewport           | Representative desktop viewport: 1366 × 768 pixels            |
| Conversation State | Populated conversation and empty conversation-list state      |
| UI Elements        | Conversation list, main area, message input, primary controls |

#### Steps

1. Open Relay in a desktop browser.
2. Set the browser viewport to 1366 × 768 pixels.
3. Sign in using valid credentials.
4. Observe the conversation list and main chat area.
5. Verify that the conversation list and primary controls are visible.
6. Open an existing conversation.
7. Observe the main chat area and message input.
8. Verify that the conversation content and primary controls remain accessible.
9. Inspect the layout for important elements that are clipped or overlapping.
10. Inspect whether horizontal scrolling is required to access the primary interface.
11. If available, repeat the layout inspection with an empty conversation-list state.

#### Expected Result

- The layout adapts to the representative desktop viewport.
- Primary features and controls remain usable.
- Important elements are not clipped in a way that prevents their use.
- Horizontal scrolling is not required to access the primary interface.
- The tested populated and empty states remain usable where applicable.
- The test does not establish official responsive breakpoints beyond the tested viewport.

---

### TC-UX-004-02 — Verify Responsive Layout on Mobile

| Field               | Value                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-UX-004-02                                                                                      |
| Title               | Verify responsive layout on mobile                                                                |
| Related Scenario    | SCN-UX-004 [SCN-UX-004](../scenarios/user-experience.md#scn-ux-004--responsive-layout)            |
| Related Requirement | REQ-UX-004 [REQ-UX-004](../../docs/requirements/user-experience.md#req-ux-004--responsive-layout) |
| Related Risk        | RSK-010 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                       |
| Risk Level          | Medium                                                                                            |
| Test Design Method  | Requirement-Based + Risk-Based                                                                    |
| Test Type           | Functional / Responsive                                                                           |
| Priority            | Medium                                                                                            |

#### Preconditions

- Relay is accessible.
- A registered user account and valid credentials are available.
- At least one existing conversation is available to the user.
- A mobile browser or browser viewport configured to represent a mobile screen is available.

#### Test Data

| Data               | Value                                                         |
| ------------------ | ------------------------------------------------------------- |
| User               | Registered test user                                          |
| Viewport           | Representative mobile viewport: 390 × 844 pixels              |
| Conversation State | Populated conversation and empty conversation-list state      |
| UI Elements        | Conversation list, main area, message input, primary controls |

#### Steps

1. Open Relay in a mobile browser or configure the viewport to 390 × 844 pixels.
2. Sign in using valid credentials.
3. Observe the conversation list and main chat area.
4. Verify that the conversation list can be accessed.
5. Open an existing conversation.
6. Observe the main chat area and message input.
7. Verify that primary features and controls remain accessible.
8. Inspect the layout for important elements that are clipped or overlapping.
9. Inspect whether horizontal scrolling is required to access the primary interface.
10. If available, repeat the layout inspection with an empty conversation-list state.

#### Expected Result

- The layout adapts to the representative mobile viewport.
- Primary features and controls remain usable.
- Important elements are not clipped in a way that prevents their use.
- Horizontal scrolling is not required to access the primary interface.
- The tested populated and empty states remain usable where applicable.
- The test does not establish official responsive breakpoints beyond the tested viewport.

---

### TC-UX-005-01 — Verify Desktop Empty State When No Conversations Exist

| Field               | Value                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-UX-005-01                                                                                              |
| Title               | Verify desktop empty state when no conversations exist                                                    |
| Related Scenario    | SCN-UX-005 [SCN-UX-005](../scenarios/user-experience.md#scn-ux-005--desktop-empty-state-no-conversations) |
| Related Requirement | REQ-UX-005 [REQ-UX-005](../../docs/requirements/user-experience.md#req-ux-005--empty-state-behavior)      |
| Related Risk        | RSK-015 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                               |
| Risk Level          | Low                                                                                                       |
| Test Design Method  | Requirement-Based + Risk-Based                                                                            |
| Test Type           | Functional / Positive                                                                                     |
| Priority            | Low                                                                                                       |

#### Preconditions

- Relay is accessible.
- A registered user account and valid credentials are available.
- The user has no conversations associated with their account.
- A desktop viewport is available.

#### Test Data

| Data              | Value                                     |
| ----------------- | ----------------------------------------- |
| User              | Registered test user                      |
| Conversation Data | No conversations associated with the user |
| Layout            | Desktop                                   |

#### Steps

1. Open Relay in a desktop browser.
2. Sign in using valid credentials.
3. Verify that the Chat page is displayed.
4. Ensure that the account has no conversations.
5. Observe the conversation list panel.
6. Observe the main chat area.
7. Verify the displayed empty-state headings and supporting text.

#### Expected Result

- The conversation list panel displays the heading `No conversations yet.`
- The conversation list panel displays the supporting text `Start a new chat below.`
- The main chat area displays the heading `Select a conversation.`
- The main chat area displays the supporting text `Choose a conversation from the list or start a new chat to begin messaging.`
- The conversation list and main chat area display their respective empty states together.

---

### TC-UX-006-01 — Verify Desktop Empty State When Conversations Exist but None Is Selected

| Field               | Value                                                                                                                             |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-UX-006-01                                                                                                                      |
| Title               | Verify desktop empty state when conversations exist but none is selected                                                          |
| Related Scenario    | SCN-UX-006 [SCN-UX-006](../scenarios/user-experience.md#scn-ux-006--desktop-empty-state-conversations-exist-but-none-is-selected) |
| Related Requirement | REQ-UX-005 [REQ-UX-005](../../docs/requirements/user-experience.md#req-ux-005--empty-state-behavior)                              |
| Related Risk        | RSK-015 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                       |
| Risk Level          | Low                                                                                                                               |
| Test Design Method  | Requirement-Based + Risk-Based                                                                                                    |
| Test Type           | Functional / Positive                                                                                                             |
| Priority            | Low                                                                                                                               |

#### Preconditions

- Relay is accessible.
- A registered user account and valid credentials are available.
- The user has at least one conversation.
- No conversation is selected when the Chat page is displayed.
- At least one conversation without messages is available to verify the empty preview.

#### Test Data

| Data                  | Value                                           |
| --------------------- | ----------------------------------------------- |
| User                  | Registered test user                            |
| Conversation Data     | At least one existing conversation              |
| Selected Conversation | None                                            |
| Empty Conversation    | One conversation with no messages, if available |
| Layout                | Desktop                                         |

#### Steps

1. Open Relay in a desktop browser.
2. Sign in using valid credentials.
3. Verify that the Chat page is displayed.
4. Ensure that conversations exist and no conversation is selected.
5. Observe the conversation list panel.
6. Verify that available conversations are displayed.
7. If an empty conversation is available, observe its preview.
8. Observe the main chat area.
9. Verify that the main area displays the documented unselected-conversation empty state.
10. Verify that messages from a conversation are not displayed when no conversation is selected.

#### Expected Result

- Available conversations are displayed in the conversation list panel.
- A conversation without messages displays the preview `No messages yet.` when applicable.
- The main chat area displays the heading `Select a conversation.`
- The main chat area displays the supporting text `Choose a conversation from the list or start a new chat to begin messaging.`
- Messages from a conversation are not displayed in the main area when no conversation is selected.

---

### TC-UX-007-01 — Verify Desktop Empty State for a Selected Conversation Without Messages

| Field               | Value                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Test Case ID        | TC-UX-007-01                                                                                                                   |
| Title               | Verify desktop empty state for a selected conversation without messages                                                        |
| Related Scenario    | SCN-UX-007 [SCN-UX-007](../scenarios/user-experience.md#scn-ux-007--desktop-empty-state-selected-conversation-has-no-messages) |
| Related Requirement | REQ-UX-005 [REQ-UX-005](../../docs/requirements/user-experience.md#req-ux-005--empty-state-behavior)                           |
| Related Risk        | RSK-015 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                    |
| Risk Level          | Low                                                                                                                            |
| Test Design Method  | Requirement-Based + Risk-Based                                                                                                 |
| Test Type           | Functional / Positive                                                                                                          |
| Priority            | Low                                                                                                                            |

#### Preconditions

- Relay is accessible.
- A registered user account and valid credentials are available.
- An existing conversation is available to the user.
- The selected conversation contains no messages.
- The user is authorized to access the conversation.
- A desktop viewport is available.

#### Test Data

| Data                  | Value                                  |
| --------------------- | -------------------------------------- |
| User                  | Registered test user                   |
| Conversation          | Existing conversation with no messages |
| Selected Conversation | The empty conversation                 |
| Layout                | Desktop                                |

#### Steps

1. Open Relay in a desktop browser.
2. Sign in using valid credentials.
3. Verify that the Chat page is displayed.
4. Select the existing conversation that contains no messages.
5. Observe the main chat area.
6. Verify the displayed empty-state heading and supporting text.
7. Verify that the general unselected-conversation empty state is no longer displayed.

#### Expected Result

- The selected conversation is displayed in the main chat area.
- The main chat area displays the heading `No messages yet.`
- The main chat area displays the supporting text `Send a message to start the conversation.`
- The selected conversation's empty state is displayed instead of the general `Select a conversation.` state.

---

### TC-UX-008-01 — Verify Mobile Empty State When No Conversations Exist

| Field               | Value                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-UX-008-01                                                                                             |
| Title               | Verify mobile empty state when no conversations exist                                                    |
| Related Scenario    | SCN-UX-008 [SCN-UX-008](../scenarios/user-experience.md#scn-ux-008--mobile-empty-state-no-conversations) |
| Related Requirement | REQ-UX-005 [REQ-UX-005](../../docs/requirements/user-experience.md#req-ux-005--empty-state-behavior)     |
| Related Risk        | RSK-015 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                              |
| Risk Level          | Low                                                                                                      |
| Test Design Method  | Requirement-Based + Risk-Based                                                                           |
| Test Type           | Functional / Responsive                                                                                  |
| Priority            | Low                                                                                                      |

#### Preconditions

- Relay is accessible.
- A registered user account and valid credentials are available.
- The user has no conversations associated with their account.
- A mobile browser or browser viewport configured to represent a mobile screen is available.

#### Test Data

| Data              | Value                                     |
| ----------------- | ----------------------------------------- |
| User              | Registered test user                      |
| Conversation Data | No conversations associated with the user |
| Layout            | Mobile                                    |

#### Steps

1. Open Relay in a mobile browser or configure the viewport to a representative mobile size.
2. Sign in using valid credentials.
3. Verify that the Chat page is displayed.
4. Ensure that the account has no conversations.
5. Observe the conversation list panel.
6. Verify the displayed empty-state heading and supporting text.
7. Observe whether the main chat area is displayed.

#### Expected Result

- The conversation list panel is displayed.
- The conversation list displays the heading `No conversations yet.`
- The conversation list displays the supporting text `Start a new chat below.`
- The main chat area remains hidden.

---

### TC-UX-009-01 — Verify Mobile Empty State When Conversations Exist but None Is Selected

| Field               | Value                                                                                                                            |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-UX-009-01                                                                                                                     |
| Title               | Verify mobile empty state when conversations exist but none is selected                                                          |
| Related Scenario    | SCN-UX-009 [SCN-UX-009](../scenarios/user-experience.md#scn-ux-009--mobile-empty-state-conversations-exist-but-none-is-selected) |
| Related Requirement | REQ-UX-005 [REQ-UX-005](../../docs/requirements/user-experience.md#req-ux-005--empty-state-behavior)                             |
| Related Risk        | RSK-015 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                      |
| Risk Level          | Low                                                                                                                              |
| Test Design Method  | Requirement-Based + Risk-Based                                                                                                   |
| Test Type           | Functional / Responsive                                                                                                          |
| Priority            | Low                                                                                                                              |

#### Preconditions

- Relay is accessible.
- A registered user account and valid credentials are available.
- The user has at least one conversation.
- No conversation is selected when the Chat page is displayed.
- A mobile browser or browser viewport configured to represent a mobile screen is available.
- At least one conversation without messages is available to verify the empty preview.

#### Test Data

| Data                  | Value                                           |
| --------------------- | ----------------------------------------------- |
| User                  | Registered test user                            |
| Conversation Data     | At least one existing conversation              |
| Selected Conversation | None                                            |
| Empty Conversation    | One conversation with no messages, if available |
| Layout                | Mobile                                          |

#### Steps

1. Open Relay in a mobile browser or configure the viewport to a representative mobile size.
2. Sign in using valid credentials.
3. Verify that the Chat page is displayed.
4. Ensure that conversations exist and no conversation is selected.
5. Observe the conversation list panel.
6. Verify that available conversations are displayed.
7. If an empty conversation is available, observe its preview.
8. Observe whether the main chat area is displayed.

#### Expected Result

- Available conversations are displayed in the conversation list panel.
- A conversation without messages displays the preview `No messages yet.` when applicable.
- The conversation list remains visible.
- The main chat area remains hidden until a conversation is selected.

---

### TC-UX-010-01 — Verify Mobile Empty State for a Selected Conversation Without Messages

| Field               | Value                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-UX-010-01                                                                                                                  |
| Title               | Verify mobile empty state for a selected conversation without messages                                                        |
| Related Scenario    | SCN-UX-010 [SCN-UX-010](../scenarios/user-experience.md#scn-ux-010--mobile-empty-state-selected-conversation-has-no-messages) |
| Related Requirement | REQ-UX-005 [REQ-UX-005](../../docs/requirements/user-experience.md#req-ux-005--empty-state-behavior)                          |
| Related Risk        | RSK-015 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                   |
| Risk Level          | Low                                                                                                                           |
| Test Design Method  | Requirement-Based + Risk-Based                                                                                                |
| Test Type           | Functional / Responsive                                                                                                       |
| Priority            | Low                                                                                                                           |

#### Preconditions

- Relay is accessible.
- A registered user account and valid credentials are available.
- An existing conversation is available to the user.
- The selected conversation contains no messages.
- The user is authorized to access the conversation.
- A mobile browser or browser viewport configured to represent a mobile screen is available.

#### Test Data

| Data                  | Value                                  |
| --------------------- | -------------------------------------- |
| User                  | Registered test user                   |
| Conversation          | Existing conversation with no messages |
| Selected Conversation | The empty conversation                 |
| Layout                | Mobile                                 |

#### Steps

1. Open Relay in a mobile browser or configure the viewport to a representative mobile size.
2. Sign in using valid credentials.
3. Verify that the conversation list is displayed.
4. Select the existing conversation that contains no messages.
5. Observe the main chat area.
6. Verify the displayed empty-state heading and supporting text.
7. Verify that the conversation list panel is hidden.
8. Verify that a back button is available.

#### Expected Result

- The selected conversation's chat area is displayed.
- The conversation list panel is hidden.
- The main chat area displays the heading `No messages yet.`
- The main chat area displays the supporting text `Send a message to start the conversation.`
- A back button is available to allow the user to return to the conversation list.

---

## 5. Scenario-to-Test Case Traceability

The user experience test cases maintain traceability between approved scenarios, documented requirements, associated risks, and test case identifiers.

The relationship is:

```text
Requirement
    ↓
Risk Assessment
    ↓
User Experience Scenario
    ↓
Test Case
    ↓
Execution and Evidence
```

### Scenario-to-Test Case Traceability

| Scenario ID | Related Requirement ID(s) | Related Risk ID(s) | Test Case ID(s)                          |
| ----------- | ------------------------- | ------------------ | ---------------------------------------- |
| SCN-UX-001  | REQ-UX-001                | RSK-019            | TC-UX-001-01                             |
| SCN-UX-002  | REQ-UX-002                | RSK-019            | TC-UX-002-01                             |
| SCN-UX-003  | REQ-UX-003                | RSK-016            | TC-UX-003-01, TC-UX-003-02, TC-UX-003-03 |
| SCN-UX-004  | REQ-UX-004                | RSK-010            | TC-UX-004-01, TC-UX-004-02               |
| SCN-UX-005  | REQ-UX-005                | RSK-015            | TC-UX-005-01                             |
| SCN-UX-006  | REQ-UX-005                | RSK-015            | TC-UX-006-01                             |
| SCN-UX-007  | REQ-UX-005                | RSK-015            | TC-UX-007-01                             |
| SCN-UX-008  | REQ-UX-005                | RSK-015            | TC-UX-008-01                             |
| SCN-UX-009  | REQ-UX-005                | RSK-015            | TC-UX-009-01                             |
| SCN-UX-010  | REQ-UX-005                | RSK-015            | TC-UX-010-01                             |

### Requirement-to-Test Case Traceability

| Requirement ID | Related Risk ID(s) | Test Case ID(s)                                                                    |
| -------------- | ------------------ | ---------------------------------------------------------------------------------- |
| REQ-UX-001     | RSK-019            | TC-UX-001-01                                                                       |
| REQ-UX-002     | RSK-019            | TC-UX-002-01                                                                       |
| REQ-UX-003     | RSK-016            | TC-UX-003-01, TC-UX-003-02, TC-UX-003-03                                           |
| REQ-UX-004     | RSK-010            | TC-UX-004-01, TC-UX-004-02                                                         |
| REQ-UX-005     | RSK-015            | TC-UX-005-01, TC-UX-006-01, TC-UX-007-01, TC-UX-008-01, TC-UX-009-01, TC-UX-010-01 |

The test case set is intended to guide subsequent test execution. Test case design does not imply that the cases have been executed or that the corresponding functionality has passed testing.
