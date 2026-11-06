# User Experience — Automation Coverage and Test Execution

## 1. Overview

This document defines the automation coverage plan and records actual test execution results for the User Experience functional area of Relay.

The Automation Coverage Matrix identifies the test cases selected for automation, their implementation order, proposed automation layers, automation decisions, and current execution status.

Execution Records document the results of test cases that have actually been executed. Test selection, implementation, and execution are distinct activities. A selected or implemented test must not be reported as executed without an actual test run and supporting evidence.

**Source documents**

- [User Experience Test Cases](../test-design/test-cases/user-experience.md)
- [User Experience Scenarios](../test-design/scenarios/user-experience.md)
- [User Experience Requirements](../docs/requirements/user-experience.md)
- [Risk Assessment](../docs/risk-assessment.md)

---

## 2. User Experience Coverage Matrix

### 2.1 Matrix Purpose

This matrix defines the User Experience automation scope and implementation order.

Automation Order establishes the intended implementation sequence. It is separate from Source Priority and does not represent the chronological order of actual test execution.

Test Case IDs, titles, Risk Levels, and Source Priorities follow the current User Experience test-case source. Automation layers and decisions identify the intended automation approach for each case.

### 2.2 Automation Coverage

| Automation Order | Test Case ID | Test Case Title                                                                | Risk Level | Source Priority | Automation Layer | Automation Decision | Execution Status |
| ---------------: | ------------ | ------------------------------------------------------------------------------ | ---------- | --------------- | ---------------- | ------------------- | ---------------- |
|                1 | TC-UX-004-01 | Verify Desktop Layout with Conversations Available and None Selected           | Medium     | Medium          | UI               | Include             | Failed           |
|                2 | TC-UX-004-02 | Verify Mobile Layout with Conversations Available and None Selected            | Medium     | Medium          | UI               | Include             | Passed           |
|                3 | TC-UX-008-01 | Verify Mobile Empty State Without Conversations and After Starting a New Chat  | Medium     | Medium          | UI               | Include             | Failed           |
|                4 | TC-UX-001-01 | Verify Light Mode Across Register, Login, and Chat Pages                       | Low        | Low             | UI               | Include             | Passed           |
|                5 | TC-UX-002-01 | Verify Dark Mode Across Register, Login, and Chat Pages                        | Low        | Low             | UI               | Include             | Passed           |
|                6 | TC-UX-005-01 | Verify Desktop Empty State Without Conversations and After Starting a New Chat | Low        | Low             | UI               | Include             | Failed           |
|                7 | TC-UX-003-01 | Verify Theme Persistence After Browser Restart                                 | Low        | Low             | UI               | Include             | Passed           |
|                8 | TC-UX-003-02 | Verify Theme Persistence After Logout and Re-Login                             | Low        | Low             | UI               | Include             | Passed           |

### 2.3 Matrix Notes

- The matrix contains 8 test cases defined in the current User Experience test-case source.
- Test Case IDs, titles, Risk Levels, and Source Priorities retain their source values.
- Automation Order represents implementation order, not source priority or a record of actual execution order.
- `Include` indicates that a test case belongs to the User Experience automation scope. All 8 test cases are included; no test case is deferred from this scope.
- All selected cases use the UI automation layer because they verify observable presentation, responsive behavior, theme rendering, or theme persistence through the Relay user interface.
- Responsive layout and mobile empty-state tests are prioritized first because their source Risk Levels and Priorities are Medium. The remaining selected User Experience test cases have Low Risk Levels and Priorities.
- The consolidated empty-state cases verify the documented journeys for desktop and mobile layouts: no conversations followed by starting a new chat, and the resulting selected empty conversation.
- `TC-UX-001-01` and `TC-UX-002-01` verify theme selection while unauthenticated, theme rendering across Register, Login, and Chat, and persistence across navigation and refresh.
- `TC-UX-003-01` and `TC-UX-003-02` verify persistence after browser restart and logout/re-login, respectively.
- `Not Executed Yet` means no automated execution result has been recorded for that test case.
- A test case must not be marked as passed, failed, or blocked without an actual execution attempt and a corresponding record.

### 2.4 Implementation Dependencies

#### Responsive Layout

`TC-UX-004-01` and `TC-UX-004-02` verify responsive behavior at representative desktop and mobile viewport sizes.

The implementation must use the viewport dimensions defined in the source test cases and verify that primary features and controls remain usable. Assertions must check for important elements being clipped and whether horizontal scrolling is required to access the primary interface.

The selected viewport sizes represent test conditions, not an exhaustive list of supported screen sizes or a definition of official responsive breakpoints.

#### Desktop and Mobile Empty-State Journeys

`TC-UX-005-01` and `TC-UX-008-01` cover the documented no-conversation and selected-empty-conversation states on desktop and mobile layouts, respectively.

The implementation must establish the required initial conversation state before navigating to the relevant view:

- Alice has no conversations associated with her account, including conversations with users other than Bob.
- Alice and Bob are registered users.
- Bob is available as a user with whom Alice can start a new conversation.

The new conversation must be initiated through the UI's Start Chat flow because that user journey is part of the behavior under test. Database helpers may be used for independent setup and cleanup, but must not replace the UI action being verified.

Assertions must verify the exact documented empty-state text and the visibility of the conversation list and main chat area for the relevant layout. On mobile, the implementation must also verify the back-button behavior.

Test data setup and cleanup must be repeatable and independent. A test must not depend on another test having created or removed conversations.

#### Populated Conversation Responsive States

`TC-UX-004-01` and `TC-UX-004-02` verify responsive behavior when Alice has at least two populated conversations and none is initially selected.

The implementation must prepare the required conversations and messages independently for each test. On desktop, the conversation list and main chat area must be displayed side by side. On mobile, the conversation list must be displayed initially; selecting a conversation must display the main chat area and hide the conversation list. The back button must return the user to the conversation list.

Assertions must follow the documented requirements and source test cases. The representative viewport sizes do not establish official responsive breakpoints.

#### Theme Rendering and Persistence Across Navigation

`TC-UX-001-01` and `TC-UX-002-01` verify Light Mode and Dark Mode, respectively, across Register, Login, and Chat pages.

The implementation must select the relevant theme while the user is unauthenticated, verify that it is applied on the Register page, navigate to Login, refresh the page, sign in, and verify the theme on Chat after navigation and refresh.

The test must distinguish the theme being selected from the theme actually being applied to the rendered interface. Page content and primary controls must remain visible and usable in the selected theme.

#### Theme Persistence After Browser Restart

`TC-UX-003-01` verifies that the selected theme persists after a complete browser restart.

The implementation must select Dark Mode while the user is unauthenticated, close the browser completely, and reopen it using the same persistent browser profile without clearing the stored site data. It must then verify the theme on an unauthenticated Relay page and after signing in.

A newly created isolated browser context or a different browser profile does not, by itself, demonstrate persistence across browser restart.

#### Theme Persistence After Logout and Re-Login

`TC-UX-003-02` verifies that the selected theme remains applied after logout and subsequent login using the same account.

The implementation must select Dark Mode, log out, verify the theme on the unauthenticated page, sign in again using the same account, and verify the theme on Chat. The browser's stored theme preference must remain available throughout the test.

---

## 3. Execution Summary

### 3.1 Current Execution Status

| Metric                             | Count |
| ---------------------------------- | ----: |
| Test Cases in Coverage Matrix      |     8 |
| Test Cases Selected for Automation |     8 |
| Test Cases Implemented             |     8 |
| Test Cases Executed                |     8 |
| Passed                             |     5 |
| Failed                             |     3 |
| Blocked                            |     0 |
| Not Executed                       |     0 |

### 3.2 Summary Notes

- The User Experience automation scope contains 8 selected test cases.
- All 8 test cases are included in the automation scope.
- Selection and implementation do not constitute execution evidence.
- A failed assertion is recorded as a failed execution only after the test has actually run.
- A test that cannot run because of environment or setup problems must be recorded as blocked rather than being reported as passed.
- Execution metrics must reflect actual test runs and their corresponding records.

---

## 4. Execution Result Definitions

| Status       | Definition                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| PASS         | The test was executed, and the observed result satisfied the documented expected result.                                 |
| FAIL         | The test was executed, and the observed result did not satisfy the documented expected result.                           |
| BLOCKED      | The test could not complete because a required dependency, environment condition, or setup prerequisite was unavailable. |
| NOT EXECUTED | No execution attempt has been completed and recorded.                                                                    |

A status must reflect the actual execution outcome. Implementation status, expected behavior, and assumptions must not be used as substitutes for execution evidence.

---

## 5. Coverage Notes and Limitations

- The matrix defines intended automation coverage; it does not demonstrate that automated coverage has been achieved.
- Source Risk Levels and Priorities are retained as documented. They are distinct from Automation Order.
- All 8 User Experience test cases are included in the automation scope. No test case is deferred.
- Responsive layout coverage is limited to the representative viewport sizes defined in the source test cases. It does not establish behavior at every possible screen size or device.
- The populated responsive test cases require at least two populated conversations associated with Alice. Test data availability must be confirmed before implementation; the test must not rely on another test case having created the conversations.
- The empty-state journey tests require Alice to have no conversations with any user before execution. Setup and cleanup must be repeatable and independent.
- The Start Chat action is performed through the UI in the empty-state journey tests. Database helpers may be used for setup and cleanup but must not replace the user action under test.
- Theme rendering and persistence must be verified through observable UI behavior. A selected preference alone does not prove that the correct theme has been applied.
- Browser restart verification must use the same persistent browser profile and retain the stored site data. A fresh isolated context does not demonstrate browser-restart persistence.
- Theme-persistence tests must preserve the stored browser preference during the relevant state transitions.
- Empty-state assertions must use the exact expected content and visibility rules defined by `REQ-UX-005`.
- Browser-specific visual differences must not automatically be classified as defects unless they violate the documented requirement.
- Test execution outcomes must be supported by actual results and evidence.
- A failed assertion or unexpected observation is not automatically a confirmed defect. Defect classification must be supported by the applicable requirement and the collected evidence.
- The automation scope is limited to the 8 selected User Experience test cases. It does not imply exhaustive coverage of every behavior in the functional area.

---

## 6. Execution Records

### TC-UX-004-01 — Verify Desktop Layout with Conversations Available and None Selected

- **Test Case Reference:** [TC-UX-004-01](../test-design/test-cases/user-experience.md#tc-ux-004-01--verify-desktop-layout-with-conversations-available-and-none-selected)
- **Scenario Reference:** SCN-UX-004 [SCN-UX-004](../test-design/scenarios/user-experience.md#scn-ux-004--responsive-layout), SCN-UX-006 [SCN-UX-006](../test-design/scenarios/user-experience.md#scn-ux-006--desktop-empty-state-conversations-exist-but-none-is-selected)
- **Requirement Reference:** REQ-UX-004 [REQ-UX-004](../docs/requirements/user-experience.md#req-ux-004--responsive-layout), REQ-UX-005 [REQ-UX-005](../docs/requirements/user-experience.md#req-ux-005--empty-state-behavior)
- **Risk Reference:** RSK-010, RSK-015 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
- **Execution Date:** 2026-11-05

**Environment**

- Application URL: http://localhost:3000
- Browser / Project: Chromium
- Browser Version: 156.0.8078.4 (Official Build) (64-bit)
- Operating System: Windows 11 Pro 25H2
- Execution Mode: Headed
- Workers: 1
- Test Framework: Playwright 1.64.1
- Test Run / Commit Reference: Local execution; two consecutive executions using `--repeat-each=2`

**Preconditions**

- Relay is accessible.
- Alice (`alice@example.com`) has a registered account and valid credentials.
- Alice has two existing populated conversations: one with Bob (`bob@example.com`) and one with Charlie (`charlie@example.com`).
- The Alice–Bob conversation contains `Hi Bob. How are you?`.
- The Alice–Charlie conversation contains `Hi Charlie. How are you?`.
- No conversation is selected when the Chat page is displayed.
- The viewport is configured to 1366 × 768 pixels.
- Test data is prepared and cleaned up by the test's database setup/cleanup flow.

**Expected Result**

- The layout adapts to the representative desktop viewport.
- The conversation list panel and main chat area are displayed side by side.
- Available conversations are displayed in the conversation list panel.
- The main chat area displays the exact heading `Select a conversation.`.
- The main chat area displays `Choose a conversation from the list or start a new chat to begin messaging.`.
- Messages from a conversation are not displayed in the main area when no conversation is selected.
- Primary features and controls remain usable.
- Important elements are not clipped in a way that prevents their use.
- Horizontal scrolling is not required to access the primary interface.

**Actual Result**

- The QA Safety Guard passed before Playwright execution, confirming the local PostgreSQL QA database `relay_qa_automation` and role `relay_test_user`.
- Alice successfully signed in and the application navigated to `/chat`.
- The `Conversations` heading, conversation list panel, and main chat area were visible.
- The conversation list and main chat area were positioned side by side. The recorded layout geometry and element-bound checks passed.
- Both populated conversations (Alice–Bob and Alice–Charlie) were visible and enabled in the conversation list.
- Both conversation previews displayed their respective seeded messages.
- The main chat area displayed the supporting text `Choose a conversation from the list or start a new chat to begin messaging.`.
- Messages from both conversations were absent from the unselected main chat area, and the message input was not present.
- The empty-state heading was rendered as `Select a conversation` without a trailing period.
- The exact heading assertion failed because the documented expected text is `Select a conversation.`.
- The text clipping checks, New Chat control checks/interactions, theme toggle checks, logout visibility/enabled checks, important-element viewport bounds, and horizontal-overflow check completed without reported assertion failures in the Playwright trace.
- The same heading mismatch occurred in both repetitions. No other assertion failure was shown in the supplied execution trace.

**Execution Result:** FAIL

**Evidence**

- Playwright terminal output: `2 failed` across two repetitions; both failures were the same exact-heading assertion.
- QA Safety Guard passed before test execution.
- Assertion comparison:
  - Expected: `Select a conversation.`
  - Received: `Select a conversation`
- Playwright screenshot, video, error context, and trace generated locally.
- QA Safety Guard passed before execution.

**Defect Reference:** [BUG-003](../defect-reports/user-experience.md#bug-003--desktop-empty-state-heading-is-missing-the-required-trailing-period)

### TC-UX-004-02 — Verify Mobile Layout with Conversations Available and None Selected

- **Test Case Reference:** [TC-UX-004-02](../test-design/test-cases/user-experience.md#tc-ux-004-02--verify-mobile-layout-with-conversations-available-and-none-selected)
- **Scenario Reference:** SCN-UX-004 [SCN-UX-004](../test-design/scenarios/user-experience.md#scn-ux-004--responsive-layout), SCN-UX-009 [SCN-UX-009](../test-design/scenarios/user-experience.md#scn-ux-009--mobile-empty-state-conversations-exist-but-none-is-selected)
- **Requirement Reference:** REQ-UX-004 [REQ-UX-004](../docs/requirements/user-experience.md#req-ux-004--responsive-layout), REQ-UX-005 [REQ-UX-005](../docs/requirements/user-experience.md#req-ux-005--empty-state-behavior)
- **Risk Reference:** RSK-010, RSK-015 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
- **Execution Date:** 2026-11-05

**Environment**

- Application URL: http://localhost:3000
- Browser / Project: Chromium
- Browser Version: 156.0.8078.4 (Official Build) (64-bit)
- Operating System: Windows 11 Pro 25H2
- Execution Mode: Headed
- Workers: 1
- Test Framework: Playwright 1.64.1
- Viewport: 390 × 844 pixels
- Test Run / Commit Reference: Local execution; two consecutive executions using `--repeat-each=2`

**Preconditions**

- Relay is accessible.
- Alice (`alice@example.com`) has a registered account and valid credentials.
- Alice has two existing populated conversations: one with Bob (`bob@example.com`) and one with Charlie (`charlie@example.com`).
- The Alice–Bob conversation contains `Hi Bob. How are you?`.
- The Alice–Charlie conversation contains `Hi Charlie. How are you?`.
- No conversation is selected when the Chat page is displayed.
- The viewport is configured to 390 × 844 pixels.
- Test data is prepared and cleaned up by the test's database setup/cleanup flow.

**Expected Result**

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

**Actual Result**

- The QA Safety Guard passed before Playwright execution, confirming the local PostgreSQL QA database `relay_qa_automation` and role `relay_test_user`.
- Alice successfully signed in and the application navigated to `/chat` at the configured mobile viewport.
- With no conversation selected, the conversation list panel was visible and the main chat area was hidden.
- Both populated conversations (Alice–Bob and Alice–Charlie) were visible and displayed their respective seeded message previews.
- The Alice–Bob conversation was selected. The application navigated to its conversation URL, displayed the main chat area, and hid the conversation list panel.
- The selected conversation heading and seeded message were visible.
- The message input was visible and enabled. The Send button was visible and disabled while the message input was empty.
- The `Back to conversations` control was visible and enabled.
- After using the back button, the application returned to `/chat`, displayed the conversation list, and hid the main chat area.
- Horizontal bounds checks for the tested panels and primary controls completed without reported assertion failures.
- Horizontal-overflow checks completed without reported assertion failures in the initial list state, selected conversation state, and returned list state.
- The test completed both repetitions without reported assertion failures.

**Execution Result:** PASS

**Evidence**

- Playwright terminal output: `2 passed (20.0s)` across two repetitions.
- QA Safety Guard passed before test execution.
- Playwright HTML report contains the successful execution result. No separate screenshot or trace path was supplied for the passing run.
- The earlier exploratory screenshot showed the initial mobile conversation-list state and a vertical scrollbar. Vertical scrolling was not treated as a failure because the test case does not prohibit vertical scrolling; its responsive acceptance criterion specifically states that horizontal scrolling is not required.

**Defect Reference:** None identified by this execution.

### TC-UX-008-01 — Verify Mobile Empty State Without Conversations and After Starting a New Chat

- **Test Case Reference:** [TC-UX-008-01](../test-design/test-cases/user-experience.md#tc-ux-008-01--verify-mobile-empty-state-without-conversations-and-after-starting-a-new-chat)
- **Scenario Reference:** SCN-UX-004 [SCN-UX-004](../test-design/scenarios/user-experience.md#scn-ux-004--responsive-layout), SCN-UX-008 [SCN-UX-008](../test-design/scenarios/user-experience.md#scn-ux-008--mobile-empty-state-no-conversations), SCN-UX-010 [SCN-UX-010](../test-design/scenarios/user-experience.md#scn-ux-010--mobile-empty-state-selected-conversation-has-no-messages)
- **Requirement Reference:** REQ-UX-004 [REQ-UX-004](../docs/requirements/user-experience.md#req-ux-004--responsive-layout), REQ-UX-005 [REQ-UX-005](../docs/requirements/user-experience.md#req-ux-005--empty-state-behavior)
- **Risk Reference:** RSK-010, RSK-015 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
- **Execution Date:** 2026-11-06

**Environment**

- Application URL: http://localhost:3000
- Browser / Project: Chromium
- Browser Version: 156.0.8078.4 (Official Build) (64-bit)
- Operating System: Windows 11 Pro 25H2
- Execution Mode: Headed
- Workers: 1
- Test Framework: Playwright 1.64.1
- Viewport: 390 × 844 pixels
- Test Run / Commit Reference: Local execution; two consecutive executions using `--repeat-each=2`

**Preconditions**

- Relay is accessible.
- Alice (`alice@example.com`) and Bob (`bob@example.com`) have registered accounts and valid credentials.
- Alice has no conversations associated with her account before execution.
- Bob is available as a user with whom Alice can start a new conversation.
- The initial state is established independently using the existing database setup helpers.
- Test data is cleaned up using the existing database cleanup helpers.

**Expected Result**

- Before starting a new chat, the conversation list panel is displayed.
- The conversation list panel displays the exact heading `No conversations yet.`.
- The conversation list panel displays the supporting text `Start a new chat below.`.
- The main chat area remains hidden before a conversation is selected.
- Alice can start a new conversation with Bob through the UI's Start Chat flow.
- The newly created conversation is displayed as the selected conversation.
- The main chat area is displayed and the conversation list panel is hidden.
- The main chat area displays the exact heading `No messages yet.`.
- The main chat area displays the supporting text `Send a message to start the conversation.`.
- A back button is available.
- Using the back button returns Alice to the conversation list, and the main chat area is hidden.
- Primary controls remain usable and horizontal scrolling is not required to access the primary interface.

**Actual Result**

- The QA Safety Guard passed before Playwright execution, confirming the local PostgreSQL QA database `relay_qa_automation` and role `relay_test_user`.
- Alice successfully signed in and the application navigated to `/chat`.
- The conversation list panel was visible and the main chat area was hidden in the initial mobile state.
- The conversation list empty-state heading was rendered as `No conversations yet` without the required trailing period.
- The conversation list supporting text `Start a new chat below.` was displayed.
- The New Chat heading and user selection control were visible and usable.
- The Start Chat button was initially disabled, became enabled after Bob was selected, and successfully initiated a new conversation through the UI.
- The application navigated to the selected conversation.
- The main chat area was visible and the conversation list panel was hidden.
- The selected conversation heading displayed Bob's name.
- The empty message-state heading was rendered as `No messages yet` without the required trailing period.
- The empty message-state supporting text `Send a message to start the conversation.` was displayed.
- The Back to conversations control was visible and usable.
- The message input and Send button were visible; the Send button was disabled while the input was empty.
- The back-button interaction returned the application to `/chat`, displayed the conversation list, and hid the main chat area.
- Horizontal-overflow assertions completed without reported failures in the initial list state, selected conversation state, and returned list state.
- The other assertions completed without reported failures in both repetitions.
- The same two empty-state heading mismatches occurred in both repetitions.

**Execution Result:** FAIL

**Evidence**

- Playwright terminal output: `2 failed` across two consecutive repetitions.
- QA Safety Guard passed before execution.
- Each repetition produced two soft assertion failures:
  - Conversation list empty-state heading:
    - Expected: `No conversations yet.`
    - Received: `No conversations yet`
  - Selected conversation empty-state heading:
    - Expected: `No messages yet.`
    - Received: `No messages yet`
- Both assertions used `toHaveText()` with the exact expected text.
- Playwright generated screenshots, videos, error contexts, and traces for both failed repetitions.
- The second repetition successfully executed the same setup and user journey, demonstrating that the test can be repeated sequentially using the existing setup/cleanup pattern.

**Defect Reference:** [BUG-004](../defect-reports/user-experience.md#bug-004--mobile-empty-state-headings-are-missing-the-required-trailing-periods)

### TC-UX-001-01 — Verify Light Mode Across Register, Login, and Chat Pages

- **Test Case Reference:** [TC-UX-001-01](../test-design/test-cases/user-experience.md#tc-ux-001-01--verify-light-mode-across-register-login-and-chat-pages)
- **Scenario Reference:** SCN-UX-001 [SCN-UX-001](../test-design/scenarios/user-experience.md#scn-ux-001--light-mode-rendering), SCN-UX-003 [SCN-UX-003](../test-design/scenarios/user-experience.md#scn-ux-003--theme-persistence)
- **Requirement Reference:** REQ-UX-001 [REQ-UX-001](../docs/requirements/user-experience.md#req-ux-001--light-mode-availability), REQ-UX-003 [REQ-UX-003](../docs/requirements/user-experience.md#req-ux-003--theme-preference-persistence)
- **Risk Reference:** RSK-019, RSK-016 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
- **Execution Date:** 2026-11-06

**Environment**

- Application URL: http://localhost:3000
- Browser / Project: Chromium
- Browser Version: 156.0.8078.4 (Official Build) (64-bit)
- Operating System: Windows 11 Pro 25H2
- Execution Mode: Headed
- Workers: 1
- Test Framework: Playwright 1.64.1
- Test Run / Commit Reference: Local execution; two consecutive executions using `--repeat-each=2`

**Preconditions**

- Relay is accessible.
- The Register, Login, and Chat pages are available.
- Alice (`alice@example.com`) has a registered account and valid credentials.
- The user is unauthenticated when accessing the Register and Login pages.
- The browser's stored theme preference is retained during page navigation and refresh.
- The QA test environment is configured to use the designated local QA database.

**Expected Result**

- Light Mode is available and can be selected while the user is unauthenticated.
- Selecting Light Mode while unauthenticated does not require the user to log in.
- Light Mode is applied on the Register page.
- Light Mode remains applied after navigation to the Login page.
- Light Mode remains applied after the Login page is refreshed.
- Light Mode remains applied after the user signs in and accesses the Chat page.
- Light Mode remains applied after the Chat page is refreshed.
- Page content and primary controls remain visible and usable in Light Mode.
- The selected theme and displayed theme remain consistent across the tested pages and state transitions.

**Actual Result**

- The QA Safety Guard passed before Playwright execution, confirming that the test environment targeted the local PostgreSQL QA database `relay_qa_automation` using the role `relay_test_user`.
- The test started with the user unauthenticated on the Register page.
- The Light Mode theme toggle was available on the Register page and could be used without signing in.
- Light Mode was explicitly selected through the UI. The test verified that the document theme attribute was set to `light` and the browser's `localStorage` theme preference was set to `light`.
- The Register page remained in Light Mode after the selection. The Register heading, theme toggle, form fields, and Register submit button were visible.
- The user navigated to the Login page without signing in. The Login page remained in Light Mode, and the Login heading, theme toggle, form fields, and Login submit button were visible.
- The Login page was refreshed. After the reload, the page remained in Light Mode and the Login heading and theme toggle remained visible.
- Alice successfully signed in using the valid test credentials.
- The application navigated to the Chat page. Light Mode remained applied, and the Conversations heading, theme toggle, and Logout control were visible.
- The Chat page was refreshed. After the reload, the application remained on the Chat page and Light Mode remained applied. The Conversations heading, theme toggle, and Logout control remained visible.
- At each verified page state, the test explicitly checked that the document theme attribute was `light` and that the stored browser theme preference was `light`.
- No assertion failures were reported in either execution.

**Execution Result:** PASS

**Evidence**

- Playwright terminal output: `2 passed (20.6s)` across two consecutive executions.
- QA Safety Guard output: `Passed: local PostgreSQL, database relay_qa_automation, role relay_test_user.`
- Execution command:
  ```bash
  npm run test:headed -- user-experience/user-experience --grep="TC-UX-001-01" --workers=1 --project=chromium --repeat-each=2
  ```
- The supplied terminal output confirms that both repetitions passed. No separate screenshot, video, or trace path was supplied for this passing run.

**Defect Reference:** None identified by this execution.

### TC-UX-002-01 — Verify Dark Mode Across Register, Login, and Chat Pages

- **Test Case Reference:** TC-UX-002-01
- **Scenario Reference:** SCN-UX-002, SCN-UX-003
- **Requirement Reference:** REQ-UX-002, REQ-UX-003
- **Risk Reference:** RSK-019, RSK-016
- **Execution Date:** 2026-11-06

**Environment**

- Application URL: http://localhost:3000
- Browser / Project: Chromium
- Browser Version: 156.0.8078.4 (Official Build) (64-bit)
- Operating System: Windows 11 Pro 25H2
- Execution Mode: Headed
- Workers: 1
- Test Framework: Playwright 1.64.1
- Test Run / Commit Reference: Local execution; two consecutive executions using `--repeat-each=2`

**Preconditions**

- Relay application is accessible.
- Register, Login, and Chat pages are available.
- Alice (`alice@example.com`) has a registered account with valid credentials.
- The user is unauthenticated when accessing the Register and Login pages.
- The browser can retain its theme preference across page navigation and refresh.
- The QA test environment is configured to use the designated local QA database.

**Expected Result**

- Dark Mode is available and can be selected while the user is unauthenticated.
- Selecting Dark Mode does not require the user to log in.
- Dark Mode is applied on the Register page.
- Dark Mode remains applied after navigation to the Login page.
- Dark Mode remains applied after the Login page is refreshed.
- Dark Mode remains applied after the user signs in and accesses the Chat page.
- Dark Mode remains applied after the Chat page is refreshed.
- Page content and primary controls remain visible and usable in Dark Mode.
- The selected theme and displayed theme remain consistent across the tested pages and state transitions.

**Actual Result**

- The QA Safety Guard passed before Playwright execution, confirming that the test environment targeted the local PostgreSQL QA database `relay_qa_automation` using the role `relay_test_user`.
- The test started with the user unauthenticated on the Register page.
- The Dark Mode theme toggle was available and enabled on the Register page.
- Dark Mode was explicitly selected through the UI without requiring authentication.
- After selection, the document theme attribute was verified as `dark`, and the browser's `localStorage` theme preference was verified as `dark`.
- The Register page remained in Dark Mode. The account creation heading, theme toggle, Name, Email, Password, Confirm Password fields, and Create Account button were visible. The theme toggle and submit button were enabled.
- The user navigated to the Login page without signing in. The Login page remained in Dark Mode. The Login heading, theme toggle, Email and Password fields, and Sign In button were visible. The theme toggle and Sign In button were enabled.
- The Login page was refreshed. After the reload, the application remained on the Login page, and both the document theme attribute and stored theme preference remained `dark`.
- Alice successfully signed in using the valid test credentials.
- The application navigated to the Chat page. Dark Mode remained applied. The Conversations heading, theme toggle, and Logout control were visible. The theme toggle and Logout control were enabled.
- The Chat page was refreshed. After the reload, the application remained on the Chat page, and Dark Mode remained applied.
- At the verified page states, the test explicitly checked that the document theme attribute was `dark` and that the stored browser theme preference was `dark`.
- No assertion failures were reported in either execution.
- Test cleanup completed without reported errors.

**Execution Result:** PASS

**Evidence**

- Playwright terminal output: `2 passed (19.5s)` across two consecutive executions.
- QA Safety Guard output: `Passed: local PostgreSQL, database relay_qa_automation, role relay_test_user.`
- Execution command:
  ```bash
  npm run test:headed -- user-experience/user-experience --grep="TC-UX-002-01" --workers=1 --project=chromium --repeat-each=2
  ```
- The supplied terminal output confirms that both repetitions passed. No separate screenshot, video, or trace path was supplied for this passing run.

**Defect Reference:** None identified by this execution.

### TC-UX-005-01 — Verify Desktop Empty State Without Conversations and After Starting a New Chat

- **Test Case Reference:** [TC-UX-005-01](../test-design/test-cases/user-experience.md)
- **Scenario Reference:** SCN-UX-005, SCN-UX-007
- **Requirement Reference:** REQ-UX-005
- **Risk Reference:** RSK-015 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
- **Execution Date:** 2026-11-06

**Environment**

- Application URL: http://localhost:3000
- Browser / Project: Chromium
- Browser Version: 156.0.8078.4 (Official Build) (64-bit)
- Operating System: Windows 11 Pro 25H2
- Execution Mode: Headed
- Workers: 1
- Test Framework: Playwright 1.64.1
- Viewport: 1366 × 768 pixels
- Test Run / Commit Reference: Local execution; two consecutive executions using `--repeat-each=2`

**Preconditions**

- Relay is accessible.
- Alice (`alice@example.com`) and Bob (`bob@example.com`) have registered accounts and valid credentials.
- Alice has no conversations displayed in the initial Chat page state.
- Bob is available as a user with whom Alice can start a new conversation.
- The desktop viewport is configured to 1366 × 768 pixels.
- Initial test data is established using the test's database setup helpers.

**Expected Result**

- Before starting a new chat, the conversation list panel displays the exact heading `No conversations yet.`.
- The conversation list panel displays `Start a new chat below.`.
- The main chat area displays the exact heading `Select a conversation.`.
- The main chat area displays `Choose a conversation from the list or start a new chat to begin messaging.`.
- Alice can start a new conversation with Bob through the UI's Start Chat flow.
- The newly created conversation is displayed as the selected conversation.
- The main chat area displays the exact heading `No messages yet.`.
- The main chat area displays `Send a message to start the conversation.`.

**Actual Result**

- The QA Safety Guard passed before Playwright execution, confirming the local PostgreSQL QA database `relay_qa_automation` and role `relay_test_user`.
- Alice successfully signed in and the application navigated to `/chat`.
- The conversation list panel and main chat area were visible in the initial desktop state.
- The conversation list empty-state heading was rendered as `No conversations yet` without the required trailing period.
- The conversation list supporting text `Start a new chat below.` was displayed.
- The main chat area displayed the supporting text `Choose a conversation from the list or start a new chat to begin messaging.`.
- The main chat area's unselected-state heading was rendered as `Select a conversation` without the required trailing period.
- Alice successfully selected Bob through the New Chat control and started a conversation using the UI.
- The newly created conversation was displayed as the selected conversation.
- The main chat area displayed the empty message-state heading `No messages yet` without the required trailing period.
- The main chat area displayed the supporting text `Send a message to start the conversation.`.
- The same three heading-text mismatches occurred in both repetitions.
- No other assertion failures were reported in the supplied Playwright output.

**Execution Result:** FAIL

**Evidence**

- Playwright terminal output: `2 failed` across two consecutive repetitions.
- QA Safety Guard passed before execution.
- Three soft assertion failures occurred in each repetition:
  1. Conversation list empty-state heading:
     - Expected: `No conversations yet.`
     - Received: `No conversations yet`

  2. Unselected main chat area heading:
     - Expected: `Select a conversation.`
     - Received: `Select a conversation`

  3. Selected conversation empty message-state heading:
     - Expected: `No messages yet.`
     - Received: `No messages yet`

**Defect References:**

- [BUG-003](../defect-reports/user-experience.md#bug-003--desktop-empty-state-heading-is-missing-the-required-trailing-period)
- [BUG-004](../defect-reports/user-experience.md#bug-004--empty-state-headings-are-missing-the-required-trailing-periods)

### TC-UX-003-01 — Verify Theme Persistence After Browser Restart

- **Test Case Reference:** [TC-UX-003-01](../test-design/test-cases/user-experience.md)
- **Scenario Reference:** SCN-UX-003
- **Requirement Reference:** REQ-UX-003
- **Risk Reference:** RSK-016 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
- **Execution Date:** 2026-11-07

**Environment**

- Application URL: http://localhost:3000
- Browser / Project: Chromium
- Browser Version: 156.0.8078.4 (Official Build) (64-bit)
- Operating System: Windows 11 Pro 25H2
- Execution Mode: Headed
- Workers: 1
- Test Framework: Playwright 1.64.1
- Test Run / Commit Reference: Local execution; two consecutive executions using `--repeat-each=2`

**Preconditions**

- Relay application is accessible.
- Alice (`alice@example.com`) has a registered account with valid credentials.
- The browser can be fully closed and reopened.
- The test can reopen the same persistent browser profile.
- The browser's stored theme preference remains available and is not cleared when the browser closes.
- The QA test environment is configured to use the designated local QA database.

**Expected Result**

- Dark Mode is applied before the browser is closed.
- The browser is reopened using the same profile without clearing the stored theme preference.
- Dark Mode remains applied after Relay is reopened on an unauthenticated page.
- Dark Mode remains applied after Alice signs in and accesses the Chat page.
- The selected theme and displayed theme remain consistent while the stored browser preference remains available.

**Actual Result**

- The QA Safety Guard passed before Playwright execution, confirming that the test environment targeted the local PostgreSQL QA database `relay_qa_automation` using the role `relay_test_user`.
- Alice's test account was prepared before the browser session.
- The browser was launched using a persistent browser profile.
- The test accessed the Register page while the user was unauthenticated.
- Dark Mode was selected through the UI.
- The document theme attribute was verified as `dark`, and the browser's `localStorage` theme preference was verified as `dark`.
- The browser was completely closed.
- Chromium was launched again using the same persistent browser profile.
- After reopening Relay, the application remained in Dark Mode on the unauthenticated Register page.
- The document theme attribute and stored browser theme preference were verified as `dark` after the restart.
- Alice successfully signed in using the valid test credentials.
- The application navigated to the Chat page.
- Dark Mode remained applied after authentication. The document theme attribute and stored browser theme preference were verified as `dark`.
- Both consecutive executions completed without reported assertion failures.
- Test cleanup was performed after execution.

**Execution Result:** PASS

**Evidence**

- Playwright terminal output: `2 passed (23.2s)` across two consecutive executions.
- QA Safety Guard output: `Passed: local PostgreSQL, database relay_qa_automation, role relay_test_user.`
- Execution command:
  ```bash
  npm run test:headed -- user-experience/user-experience --grep="TC-UX-003-01" --workers=1 --project=chromium --repeat-each=2
  ```
- The supplied terminal output confirms that both repetitions passed. No separate screenshot, video, or trace path was supplied for this passing run.

**Defect Reference:** None identified by this execution.

### TC-UX-003-02 — Verify Theme Persistence After Logout and Re-Login

- **Test Case Reference:** [TC-UX-003-02](../test-design/test-cases/user-experience.md)
- **Scenario Reference:** SCN-UX-003
- **Requirement Reference:** REQ-UX-003
- **Risk Reference:** RSK-016 [Risk Register List](../docs/risk-assessment.md#3-risk-register)
- **Execution Date:** 2026-11-07

**Environment**

- Application URL: http://localhost:3000
- Browser / Project: Chromium
- Browser Version: 156.0.8078.4 (Official Build) (64-bit)
- Operating System: Windows 11 Pro 25H2
- Execution Mode: Headed
- Workers: 1
- Test Framework: Playwright 1.64.1
- Test Run / Commit Reference: Local execution; two consecutive executions using `--repeat-each=2`

**Preconditions**

- Relay application is accessible.
- Alice (`alice@example.com`) has a registered account with valid credentials.
- The browser session is available.
- The browser's stored theme preference remains available throughout login, logout, and re-login.
- The QA test environment is configured to use the designated local QA database.

**Expected Result**

- Alice can successfully sign in to Relay.
- Dark Mode can be selected through the application UI.
- The selected theme preference is stored as `dark`.
- Dark Mode remains applied after Alice logs out.
- Dark Mode remains applied after Alice signs in again using the same account.
- The displayed theme and stored browser preference remain consistent throughout the authentication state transitions.

**Actual Result**

- The QA Safety Guard passed before Playwright execution, confirming that the test environment targeted the local PostgreSQL QA database `relay_qa_automation` using the role `relay_test_user`.
- Alice's test account was prepared before execution.
- Alice successfully signed in and accessed the Chat page.
- Dark Mode was selected through the UI.
- The document theme attribute was verified as `dark`, and the browser's `localStorage` theme preference was verified as `dark`.
- Alice successfully logged out and was redirected to the Login page.
- Dark Mode remained applied after logout.
- The document theme attribute and stored browser theme preference remained `dark`.
- Alice successfully signed in again using the same account.
- The application navigated back to the Chat page.
- Dark Mode remained applied after re-login.
- The document theme attribute and stored browser theme preference were verified as `dark`.
- Both consecutive executions completed without reported assertion failures.
- Test cleanup was performed after execution.

**Execution Result:** PASS

**Evidence**

- Playwright terminal output: `2 passed (18.7s)` across two consecutive executions.
- QA Safety Guard output: `Passed: local PostgreSQL, database relay_qa_automation, role relay_test_user.`
- Execution command:
  ```bash
  npm run test:headed -- user-experience/user-experience --grep="TC-UX-003-02" --workers=1 --project=chromium --repeat-each=2
  ```
- The supplied terminal output confirms that both repetitions passed. No separate screenshot, video, or trace path was supplied for this passing run.

**Defect Reference:** None identified by this execution.
