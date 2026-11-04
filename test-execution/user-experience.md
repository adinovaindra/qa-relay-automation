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
|                1 | TC-UX-004-01 | Verify Desktop Layout with Conversations Available and None Selected           | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|                2 | TC-UX-004-02 | Verify Mobile Layout with Conversations Available and None Selected            | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|                3 | TC-UX-008-01 | Verify Mobile Empty State Without Conversations and After Starting a New Chat  | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|                4 | TC-UX-001-01 | Verify Light Mode Across Register, Login, and Chat Pages                       | Low        | Low             | UI               | Include             | Not Executed Yet |
|                5 | TC-UX-002-01 | Verify Dark Mode Across Register, Login, and Chat Pages                        | Low        | Low             | UI               | Include             | Not Executed Yet |
|                6 | TC-UX-005-01 | Verify Desktop Empty State Without Conversations and After Starting a New Chat | Low        | Low             | UI               | Include             | Not Executed Yet |
|                7 | TC-UX-003-01 | Verify Theme Persistence After Browser Restart                                 | Low        | Low             | UI               | Include             | Not Executed Yet |
|                8 | TC-UX-003-02 | Verify Theme Persistence After Logout and Re-Login                             | Low        | Low             | UI               | Include             | Not Executed Yet |

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
| Test Cases Implemented             |     0 |
| Test Cases Executed                |     0 |
| Passed                             |     0 |
| Failed                             |     0 |
| Blocked                            |     0 |
| Not Executed                       |     8 |

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

### 6.1 Execution Record Template

Use the following template to record each automated test execution. Replace the example identifiers and fields with verified information for the actual test run.

#### TC-UX-XXX-XX — [Test Case Title]

**Test Case Reference:** [User Experience Test Cases](../test-design/test-cases/user-experience.md)

**Scenario Reference:** [Scenario ID]

**Requirement Reference:** [Requirement ID]

**Risk Reference:** [Risk ID]

**Execution Date:** YYYY-MM-DD

**Environment**

- Application URL: [URL]
- Browser / Project: [Browser and Playwright project]
- Browser Version: [Version]
- Operating System: [Operating system]
- Execution Mode: Headed / Headless
- Test Run / Commit Reference: [Run identifier or commit]

**Preconditions**

- [Record the verified preconditions used for this execution.]

**Expected Result**

- [Copy or summarize the expected result from the source test case without changing its acceptance criteria.]

**Actual Result**

- [Record only behavior observed during the actual execution.]

**Execution Result:** NOT EXECUTED

**Evidence**

- Test report: [Reference]
- Screenshot / Trace / Video: [Reference, where applicable]

**Defect Reference:** None identified / [Defect reference]

**Execution Notes**

- [Record relevant observations, limitations, or investigation notes.]

---
