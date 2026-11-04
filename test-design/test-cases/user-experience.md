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
| Test Case ID        | Unique identifier linked to the primary parent scenario.                                         |
| Title               | Concise description of the behavior being verified.                                              |
| Related Scenario    | Approved parent scenario or scenarios.                                                           |
| Related Requirement | Requirement or requirements directly verified by the test case.                                  |
| Related Risk        | Risk or risks directly relevant to the behavior verified.                                        |
| Risk Level          | Highest risk level among the risks directly relevant to the test case.                           |
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

| Field               | Value                                                                                                                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-UX-001-01                                                                                                                                                                                                          |
| Title               | Verify Light Mode across Register, Login, and Chat pages                                                                                                                                                              |
| Related Scenario    | SCN-UX-001 [SCN-UX-001](../scenarios/user-experience.md#scn-ux-001--light-mode-rendering), SCN-UX-003 [SCN-UX-003](../scenarios/user-experience.md#scn-ux-003--theme-persistence)                                     |
| Related Requirement | REQ-UX-001 [REQ-UX-001](../../docs/requirements/user-experience.md#req-ux-001--light-mode-availability), REQ-UX-003 [REQ-UX-003](../../docs/requirements/user-experience.md#req-ux-003--theme-preference-persistence) |
| Related Risk        | RSK-019, RSK-016 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                                                                                                  |
| Risk Level          | Low                                                                                                                                                                                                                   |
| Test Design Method  | Requirement-Based + Risk-Based                                                                                                                                                                                        |
| Test Type           | Functional / Visual / State Transition                                                                                                                                                                                |
| Priority            | Low                                                                                                                                                                                                                   |

#### Preconditions

- Relay is accessible.
- The Register, Login, and Chat pages are available.
- A registered user account and valid credentials are available.
- The tester can access the Register and Login pages while unauthenticated and the Chat page after authentication.
- The browser's stored theme preference can be retained during page navigation and refresh.

#### Test Data

| Data              | Value                                                                       |
| ----------------- | --------------------------------------------------------------------------- |
| User              | User A - Alice (`alice@example.com`)                                        |
| Theme             | Light Mode                                                                  |
| Application Pages | Register, Login, and Chat                                                   |
| UI Elements       | Page content and primary controls                                           |
| State Transitions | Unauthenticated theme selection, page navigation, sign-in, and page refresh |

#### Steps

1. Open the Relay application in a browser.
2. Ensure the user is unauthenticated and navigate to the Register page.
3. Select Light Mode while unauthenticated.
4. Verify that Light Mode is applied on the Register page.
5. Navigate to the Login page without signing in.
6. Verify that Light Mode remains applied on the Login page.
7. Refresh the Login page.
8. Verify that Light Mode remains applied after the page reloads.
9. Sign in using Alice's valid credentials.
10. Verify that the Chat page is displayed.
11. Verify that Light Mode remains applied on the Chat page.
12. Refresh the Chat page.
13. Verify that Light Mode remains applied after the page reloads.

#### Expected Result

- Light Mode is available and can be selected while the user is unauthenticated.
- Selecting Light Mode while unauthenticated does not require the user to log in.
- Light Mode is applied on the Register page.
- Light Mode remains applied after navigation to the Login page.
- Light Mode remains applied after the Login page is refreshed.
- Light Mode remains applied after the user signs in and accesses the Chat page.
- Light Mode remains applied after the Chat page is refreshed.
- Page content and primary controls remain visible and usable in Light Mode.
- The selected theme and displayed theme remain consistent across the tested pages and state transitions.

---

### TC-UX-002-01 — Verify Dark Mode Across Register, Login, and Chat Pages

| Field               | Value                                                                                                                                                                                                                |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-UX-002-01                                                                                                                                                                                                         |
| Title               | Verify Dark Mode across Register, Login, and Chat pages                                                                                                                                                              |
| Related Scenario    | SCN-UX-002 [SCN-UX-002](../scenarios/user-experience.md#scn-ux-002--dark-mode-rendering), SCN-UX-003 [SCN-UX-003](../scenarios/user-experience.md#scn-ux-003--theme-persistence)                                     |
| Related Requirement | REQ-UX-002 [REQ-UX-002](../../docs/requirements/user-experience.md#req-ux-002--dark-mode-availability), REQ-UX-003 [REQ-UX-003](../../docs/requirements/user-experience.md#req-ux-003--theme-preference-persistence) |
| Related Risk        | RSK-019, RSK-016 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                                                                                                 |
| Risk Level          | Low                                                                                                                                                                                                                  |
| Test Design Method  | Requirement-Based + Risk-Based                                                                                                                                                                                       |
| Test Type           | Functional / Visual / State Transition                                                                                                                                                                               |
| Priority            | Low                                                                                                                                                                                                                  |

#### Preconditions

- Relay is accessible.
- The Register, Login, and Chat pages are available.
- A registered user account and valid credentials are available.
- The tester can access the Register and Login pages while unauthenticated and the Chat page after authentication.
- The browser's stored theme preference can be retained during page navigation and refresh.

#### Test Data

| Data              | Value                                                                       |
| ----------------- | --------------------------------------------------------------------------- |
| User              | User A - Alice (`alice@example.com`)                                        |
| Theme             | Dark Mode                                                                   |
| Application Pages | Register, Login, and Chat                                                   |
| UI Elements       | Page content and primary controls                                           |
| State Transitions | Unauthenticated theme selection, page navigation, sign-in, and page refresh |

#### Steps

1. Open the Relay application in a browser.
2. Ensure the user is unauthenticated and navigate to the Register page.
3. Select Dark Mode while unauthenticated.
4. Verify that Dark Mode is applied on the Register page.
5. Navigate to the Login page without signing in.
6. Verify that Dark Mode remains applied on the Login page.
7. Refresh the Login page.
8. Verify that Dark Mode remains applied after the page reloads.
9. Sign in using Alice's valid credentials.
10. Verify that the Chat page is displayed.
11. Verify that Dark Mode remains applied on the Chat page.
12. Refresh the Chat page.
13. Verify that Dark Mode remains applied after the page reloads.

#### Expected Result

- Dark Mode is available and can be selected while the user is unauthenticated.
- Selecting Dark Mode while unauthenticated does not require the user to log in.
- Dark Mode is applied on the Register page.
- Dark Mode remains applied after navigation to the Login page.
- Dark Mode remains applied after the Login page is refreshed.
- Dark Mode remains applied after the user signs in and accesses the Chat page.
- Dark Mode remains applied after the Chat page is refreshed.
- Page content and primary controls remain visible and usable in Dark Mode.
- The selected theme and displayed theme remain consistent across the tested pages and state transitions.

---

### TC-UX-003-01 — Verify Theme Persistence After Browser Restart

| Field               | Value                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| Test Case ID        | TC-UX-003-01                                                                                                 |
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
- The browser can be fully closed and reopened.
- The test can reopen the same browser profile.
- The browser's stored theme preference remains available and is not cleared when the browser closes.

#### Test Data

| Data             | Value                                                    |
| ---------------- | -------------------------------------------------------- |
| User             | User A - Alice (`alice@example.com`)                     |
| Selected Theme   | Dark Mode                                                |
| State Transition | Browser restart                                          |
| Browser Profile  | Same persistent browser profile before and after restart |

#### Steps

1. Open Relay in the browser using the designated persistent browser profile.
2. Ensure the user is unauthenticated.
3. Select Dark Mode.
4. Verify that Dark Mode is applied.
5. Close the browser completely.
6. Reopen the browser using the same browser profile without clearing stored site data.
7. Navigate to Relay.
8. Verify the theme applied on the unauthenticated page.
9. Sign in using Alice's valid credentials.
10. Verify the theme applied on the Chat page.

#### Expected Result

- Dark Mode is applied before the browser is closed.
- The browser is reopened using the same profile without clearing the stored theme preference.
- Dark Mode remains applied after Relay is reopened.
- Dark Mode remains applied after the user signs in and accesses the Chat page.
- The selected theme and displayed theme remain consistent while the stored browser preference remains available.

#### Execution Considerations

- This test requires a real browser restart while preserving the same browser profile and its site data.
- A new isolated browser context or a newly created temporary profile does not, by itself, demonstrate persistence across browser restart.
- The test must not clear browser storage or site data between the initial selection and the post-restart verification.

---

### TC-UX-003-02 — Verify Theme Persistence After Logout and Re-Login

| Field               | Value                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| Test Case ID        | TC-UX-003-02                                                                                                 |
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
- Alice has a registered account and valid credentials.
- The user can select a theme, log out, and sign in again.
- The browser's stored theme preference remains available throughout the test.

#### Test Data

| Data               | Value                                                |
| ------------------ | ---------------------------------------------------- |
| User               | User A - Alice (`alice@example.com`)                 |
| Selected Theme     | Dark Mode                                            |
| State Transition   | Logout and re-login                                  |
| Browser Preference | Stored theme preference retained throughout the test |

#### Steps

1. Open Relay and sign in using Alice's valid credentials.
2. Select Dark Mode.
3. Verify that Dark Mode is applied.
4. Log out from Relay.
5. Verify that the user is returned to an unauthenticated page.
6. Verify that Dark Mode remains applied after logout.
7. Sign in again using the same Alice account.
8. Verify that the Chat page is displayed.
9. Verify that Dark Mode remains applied after re-login.

#### Expected Result

- Dark Mode is applied before logout.
- The user can log out and sign in again successfully.
- Dark Mode remains applied after logout.
- Dark Mode remains applied after re-login using the same account.
- The selected theme and displayed theme remain consistent while the stored browser preference remains available.

---

### TC-UX-004-01 — Verify Desktop Layout with Conversations Available and None Selected

| Field               | Value                                                                                                                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-UX-004-01                                                                                                                                                                                                              |
| Title               | Verify desktop layout with conversations available and none selected                                                                                                                                                      |
| Related Scenario    | SCN-UX-004 [SCN-UX-004](../scenarios/user-experience.md#scn-ux-004--responsive-layout), SCN-UX-006 [SCN-UX-006](../scenarios/user-experience.md#scn-ux-006--desktop-empty-state-conversations-exist-but-none-is-selected) |
| Related Requirement | REQ-UX-004 [REQ-UX-004](../../docs/requirements/user-experience.md#req-ux-004--responsive-layout), REQ-UX-005 [REQ-UX-005](../../docs/requirements/user-experience.md#req-ux-005--empty-state-behavior)                   |
| Related Risk        | RSK-010, RSK-015 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                                                                                                      |
| Risk Level          | Medium                                                                                                                                                                                                                    |
| Test Design Method  | Requirement-Based + Risk-Based                                                                                                                                                                                            |
| Test Type           | Functional / Responsive                                                                                                                                                                                                   |
| Priority            | Medium                                                                                                                                                                                                                    |

#### Preconditions

- Relay is accessible.
- Alice has a registered account and valid credentials.
- Alice has at least two existing conversations, each containing at least one message.
- The test data is available independently of other test cases.
- No conversation is selected when the Chat page is displayed.
- A desktop browser viewport can be configured to 1366 × 768 pixels.

#### Test Data

| Data                  | Value                                                                  |
| --------------------- | ---------------------------------------------------------------------- |
| User                  | User A - Alice (`alice@example.com`)                                   |
| Conversation Data     | At least two populated conversations associated with Alice             |
| Messages              | At least one message in each conversation                              |
| Selected Conversation | None                                                                   |
| Viewport              | Representative desktop viewport: 1366 × 768 pixels                     |
| UI Elements           | Conversation list, main chat area, message input, and primary controls |

#### Steps

1. Open Relay in a desktop browser.
2. Set the browser viewport to 1366 × 768 pixels.
3. Sign in using Alice's valid credentials.
4. Verify that the Chat page is displayed with no conversation selected.
5. Observe the conversation list panel and main chat area.
6. Verify that the conversation list panel and main chat area are displayed side by side.
7. Verify that the available conversations are displayed in the conversation list.
8. Verify that the main chat area displays the heading `Select a conversation.`
9. Verify that the main chat area displays the supporting text `Choose a conversation from the list or start a new chat to begin messaging.`
10. Verify that messages from a conversation are not displayed in the main area while no conversation is selected.
11. Inspect the layout for important elements that are clipped or overlapping.
12. Inspect whether horizontal scrolling is required to access the primary interface.
13. Verify that the conversation list, message input where applicable, and primary controls remain usable.

#### Expected Result

- The layout adapts to the representative desktop viewport.
- The conversation list panel and main chat area are displayed side by side.
- Available conversations are displayed in the conversation list panel.
- The main chat area displays the heading `Select a conversation.`
- The main chat area displays the supporting text `Choose a conversation from the list or start a new chat to begin messaging.`
- Messages from a conversation are not displayed in the main area when no conversation is selected.
- Primary features and controls remain usable.
- Important elements are not clipped in a way that prevents their use.
- Horizontal scrolling is not required to access the primary interface.
- The test does not establish official responsive breakpoints beyond the tested viewport.

---

### TC-UX-004-02 — Verify Mobile Layout with Conversations Available and None Selected

| Field               | Value                                                                                                                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Test Case ID        | TC-UX-004-02                                                                                                                                                                                                             |
| Title               | Verify mobile layout with conversations available and none selected                                                                                                                                                      |
| Related Scenario    | SCN-UX-004 [SCN-UX-004](../scenarios/user-experience.md#scn-ux-004--responsive-layout), SCN-UX-009 [SCN-UX-009](../scenarios/user-experience.md#scn-ux-009--mobile-empty-state-conversations-exist-but-none-is-selected) |
| Related Requirement | REQ-UX-004 [REQ-UX-004](../../docs/requirements/user-experience.md#req-ux-004--responsive-layout), REQ-UX-005 [REQ-UX-005](../../docs/requirements/user-experience.md#req-ux-005--empty-state-behavior)                  |
| Related Risk        | RSK-010, RSK-015 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                                                                                                     |
| Risk Level          | Medium                                                                                                                                                                                                                   |
| Test Design Method  | Requirement-Based + Risk-Based                                                                                                                                                                                           |
| Test Type           | Functional / Responsive / State Transition                                                                                                                                                                               |
| Priority            | Medium                                                                                                                                                                                                                   |

#### Preconditions

- Relay is accessible.
- Alice has a registered account and valid credentials.
- Alice has at least two existing conversations, each containing at least one message.
- The test data is available independently of other test cases.
- No conversation is selected when the Chat page is displayed.
- A mobile browser or browser viewport configured to represent a mobile screen is available.

#### Test Data

| Data                          | Value                                                                               |
| ----------------------------- | ----------------------------------------------------------------------------------- |
| User                          | User A - Alice (`alice@example.com`)                                                |
| Conversation Data             | At least two populated conversations associated with Alice                          |
| Messages                      | At least one message in each conversation                                           |
| Initial Selected Conversation | None                                                                                |
| Viewport                      | Representative mobile viewport: 390 × 844 pixels                                    |
| UI Elements                   | Conversation list, main chat area, message input, back button, and primary controls |

#### Steps

1. Open Relay in a mobile browser or configure the viewport to 390 × 844 pixels.
2. Sign in using Alice's valid credentials.
3. Verify that the Chat page is displayed with no conversation selected.
4. Observe the conversation list panel and main chat area.
5. Verify that the conversation list panel is displayed.
6. Verify that the main chat area remains hidden while no conversation is selected.
7. Select one of Alice's existing populated conversations.
8. Verify that the main chat area is displayed and the conversation list panel is hidden.
9. Verify that the selected conversation's content and primary controls remain accessible.
10. Verify that a back button is available.
11. Use the back button to return to the conversation list.
12. Verify that the conversation list is displayed again and the main chat area is hidden.
13. Inspect the layout for important elements that are clipped or overlapping.
14. Inspect whether horizontal scrolling is required to access the primary interface.

#### Expected Result

- The layout adapts to the representative mobile viewport.
- When no conversation is selected, the conversation list panel is displayed and the main chat area remains hidden.
- When a conversation is selected, the main chat area is displayed and the conversation list panel is hidden.
- The selected conversation's content and primary controls remain usable.
- A back button is available when a conversation is selected.
- Using the back button returns the user to the conversation list.
- Primary features and controls remain usable.
- Important elements are not clipped in a way that prevents their use.
- Horizontal scrolling is not required to access the primary interface.
- The test does not establish official responsive breakpoints beyond the tested viewport.

---

### TC-UX-005-01 — Verify Desktop Empty State Without Conversations and After Starting a New Chat

| Field               | Value                                                                                                                                                                                                                                     |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-UX-005-01                                                                                                                                                                                                                              |
| Title               | Verify desktop empty state without conversations and after starting a new chat                                                                                                                                                            |
| Related Scenario    | SCN-UX-005 [SCN-UX-005](../scenarios/user-experience.md#scn-ux-005--desktop-empty-state-no-conversations), SCN-UX-007 [SCN-UX-007](../scenarios/user-experience.md#scn-ux-007--desktop-empty-state-selected-conversation-has-no-messages) |
| Related Requirement | REQ-UX-005 [REQ-UX-005](../../docs/requirements/user-experience.md#req-ux-005--empty-state-behavior)                                                                                                                                      |
| Related Risk        | RSK-015 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                                                                                                                               |
| Risk Level          | Low                                                                                                                                                                                                                                       |
| Test Design Method  | Requirement-Based + Risk-Based                                                                                                                                                                                                            |
| Test Type           | Functional / Positive / State Transition                                                                                                                                                                                                  |
| Priority            | Low                                                                                                                                                                                                                                       |

#### Preconditions

- Relay is accessible.
- Alice and Bob have registered accounts and valid credentials.
- Alice has no conversations associated with her account, including conversations with users other than Bob.
- Bob is available as a user with whom Alice can start a new conversation.
- A desktop browser viewport is available.
- The initial state is established independently of other test cases.

#### Test Data

| Data                      | Value                                        |
| ------------------------- | -------------------------------------------- |
| User A                    | Alice (`alice@example.com`)                  |
| User B                    | Bob (`bob@example.com`)                      |
| Initial Conversation Data | No conversations associated with Alice       |
| New Conversation          | A new conversation started by Alice with Bob |
| New Conversation Messages | No messages                                  |
| Layout                    | Desktop                                      |

#### Steps

1. Open Relay in a desktop browser.
2. Sign in using Alice's valid credentials.
3. Verify that the Chat page is displayed.
4. Verify that Alice has no conversations.
5. Observe the conversation list panel.
6. Verify the conversation list's empty-state heading and supporting text.
7. Observe the main chat area.
8. Verify the main chat area's unselected-state heading and supporting text.
9. Use the UI's Start Chat flow to start a new conversation with Bob.
10. Verify that the newly created conversation is displayed as the selected conversation.
11. Observe the main chat area.
12. Verify the selected conversation's empty-state heading and supporting text.

#### Expected Result

- Before starting a new chat, the conversation list panel displays the heading `No conversations yet.`
- Before starting a new chat, the conversation list panel displays the supporting text `Start a new chat below.`
- Before starting a new chat, the main chat area displays the heading `Select a conversation.`
- Before starting a new chat, the main chat area displays the supporting text `Choose a conversation from the list or start a new chat to begin messaging.`
- The UI Start Chat flow allows Alice to start a new conversation with Bob.
- The newly created conversation is displayed as the selected conversation.
- The main chat area displays the heading `No messages yet.`
- The main chat area displays the supporting text `Send a message to start the conversation.`

#### Test Data Setup and Cleanup Considerations

- Setup must ensure that Alice has no conversations with any user before the test begins.
- The new conversation must be created through the UI because starting a chat is part of the user journey under test.
- Database helpers may be used for independent setup and cleanup, but must not replace the UI action being verified.
- Cleanup must remove only test data created for this test and must preserve unrelated data.

---

### TC-UX-008-01 — Verify Mobile Empty State Without Conversations and After Starting a New Chat

| Field               | Value                                                                                                                                                                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-UX-008-01                                                                                                                                                                                                                            |
| Title               | Verify mobile empty state without conversations and after starting a new chat                                                                                                                                                           |
| Related Scenario    | SCN-UX-008 [SCN-UX-008](../scenarios/user-experience.md#scn-ux-008--mobile-empty-state-no-conversations), SCN-UX-010 [SCN-UX-010](../scenarios/user-experience.md#scn-ux-010--mobile-empty-state-selected-conversation-has-no-messages) |
| Related Requirement | REQ-UX-004 [REQ-UX-004](../../docs/requirements/user-experience.md#req-ux-004--responsive-layout), REQ-UX-005 [REQ-UX-005](../../docs/requirements/user-experience.md#req-ux-005--empty-state-behavior)                                 |
| Related Risk        | RSK-010, RSK-015 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                                                                                                                    |
| Risk Level          | Medium                                                                                                                                                                                                                                  |
| Test Design Method  | Requirement-Based + Risk-Based                                                                                                                                                                                                          |
| Test Type           | Functional / Responsive / Positive / State Transition                                                                                                                                                                                   |
| Priority            | Medium                                                                                                                                                                                                                                  |

#### Preconditions

- Relay is accessible.
- Alice and Bob have registered accounts and valid credentials.
- Alice has no conversations associated with her account, including conversations with users other than Bob.
- Bob is available as a user with whom Alice can start a new conversation.
- A mobile browser or browser viewport configured to represent a mobile screen is available.
- The initial state is established independently of other test cases.

#### Test Data

| Data                      | Value                                            |
| ------------------------- | ------------------------------------------------ |
| User A                    | Alice (`alice@example.com`)                      |
| User B                    | Bob (`bob@example.com`)                          |
| Initial Conversation Data | No conversations associated with Alice           |
| New Conversation          | A new conversation started by Alice with Bob     |
| New Conversation Messages | No messages                                      |
| Viewport                  | Representative mobile viewport: 390 × 844 pixels |

#### Steps

1. Open Relay in a mobile browser or configure the viewport to 390 × 844 pixels.
2. Sign in using Alice's valid credentials.
3. Verify that the Chat page is displayed.
4. Verify that Alice has no conversations.
5. Observe the conversation list panel.
6. Verify that the conversation list's empty-state heading and supporting text are displayed.
7. Verify that the main chat area remains hidden.
8. Use the UI's Start Chat flow to start a new conversation with Bob.
9. Verify that the newly created conversation is displayed as the selected conversation.
10. Verify that the main chat area is displayed and the conversation list panel is hidden.
11. Verify the selected conversation's empty-state heading and supporting text.
12. Verify that a back button is available.
13. Use the back button to return to the conversation list.
14. Verify that the conversation list is displayed again and the main chat area is hidden.

#### Expected Result

- Before starting a new chat, the conversation list panel is displayed.
- Before starting a new chat, the conversation list panel displays the heading `No conversations yet.`
- Before starting a new chat, the conversation list panel displays the supporting text `Start a new chat below.`
- Before starting a new chat, the main chat area remains hidden.
- The UI Start Chat flow allows Alice to start a new conversation with Bob.
- The newly created conversation is displayed as the selected conversation.
- When the new conversation is selected, the main chat area is displayed and the conversation list panel is hidden.
- The main chat area displays the heading `No messages yet.`
- The main chat area displays the supporting text `Send a message to start the conversation.`
- A back button is available to allow the user to return to the conversation list.
- Using the back button returns the user to the conversation list, and the main chat area is hidden.

#### Test Data Setup and Cleanup Considerations

- Setup must ensure that Alice has no conversations with any user before the test begins.
- The new conversation must be created through the UI because starting a chat is part of the user journey under test.
- Database helpers may be used for independent setup and cleanup, but must not replace the UI action being verified.
- Cleanup must remove only test data created for this test and must preserve unrelated data.

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

| Scenario ID | Related Requirement ID(s) | Related Risk ID(s) | Test Case ID(s)                                        |
| ----------- | ------------------------- | ------------------ | ------------------------------------------------------ |
| SCN-UX-001  | REQ-UX-001, REQ-UX-003    | RSK-019, RSK-016   | TC-UX-001-01                                           |
| SCN-UX-002  | REQ-UX-002, REQ-UX-003    | RSK-019, RSK-016   | TC-UX-002-01                                           |
| SCN-UX-003  | REQ-UX-003                | RSK-016            | TC-UX-001-01, TC-UX-002-01, TC-UX-003-01, TC-UX-003-02 |
| SCN-UX-004  | REQ-UX-004                | RSK-010            | TC-UX-004-01, TC-UX-004-02, TC-UX-008-01               |
| SCN-UX-005  | REQ-UX-005                | RSK-015            | TC-UX-005-01                                           |
| SCN-UX-006  | REQ-UX-005                | RSK-015            | TC-UX-004-01                                           |
| SCN-UX-007  | REQ-UX-005                | RSK-015            | TC-UX-005-01                                           |
| SCN-UX-008  | REQ-UX-005                | RSK-015            | TC-UX-008-01                                           |
| SCN-UX-009  | REQ-UX-005                | RSK-015            | TC-UX-004-02                                           |
| SCN-UX-010  | REQ-UX-005                | RSK-015            | TC-UX-008-01                                           |

### Requirement-to-Test Case Traceability

| Requirement ID | Related Risk ID(s) | Test Case ID(s)                                        |
| -------------- | ------------------ | ------------------------------------------------------ |
| REQ-UX-001     | RSK-019            | TC-UX-001-01                                           |
| REQ-UX-002     | RSK-019            | TC-UX-002-01                                           |
| REQ-UX-003     | RSK-016            | TC-UX-001-01, TC-UX-002-01, TC-UX-003-01, TC-UX-003-02 |
| REQ-UX-004     | RSK-010            | TC-UX-004-01, TC-UX-004-02, TC-UX-008-01               |
| REQ-UX-005     | RSK-015            | TC-UX-004-01, TC-UX-004-02, TC-UX-005-01, TC-UX-008-01 |

### Risk-to-Test Case Traceability

| Risk ID | Risk Area                               | Risk Level | Test Case ID(s)                                        |
| ------- | --------------------------------------- | ---------- | ------------------------------------------------------ |
| RSK-010 | Responsive Behavior                     | Medium     | TC-UX-004-01, TC-UX-004-02, TC-UX-008-01               |
| RSK-015 | Empty States                            | Low        | TC-UX-004-01, TC-UX-004-02, TC-UX-005-01, TC-UX-008-01 |
| RSK-016 | Theme Persistence                       | Low        | TC-UX-001-01, TC-UX-002-01, TC-UX-003-01, TC-UX-003-02 |
| RSK-019 | Theme Rendering and Application Failure | Low        | TC-UX-001-01, TC-UX-002-01                             |

The risk level of a consolidated test case is the highest risk level among the risks directly relevant to the behavior verified by that test case. Therefore, the responsive cases that also verify empty-state behavior retain Medium risk because they include RSK-010.

The test case set is intended to guide subsequent test execution. Test case design does not imply that the cases have been executed or that the corresponding functionality has passed testing.
