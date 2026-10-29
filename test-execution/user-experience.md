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

| Automation Order | Test Case ID | Test Case Title                                                          | Risk Level | Source Priority | Automation Layer | Automation Decision | Execution Status |
| ---------------: | ------------ | ------------------------------------------------------------------------ | ---------- | --------------- | ---------------- | ------------------- | ---------------- |
|                1 | TC-UX-004-01 | Verify Responsive Layout on Desktop                                      | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|                2 | TC-UX-004-02 | Verify Responsive Layout on Mobile                                       | Medium     | Medium          | UI               | Include             | Not Executed Yet |
|                3 | TC-UX-005-01 | Verify Desktop Empty State When No Conversations Exist                   | Low        | Low             | UI               | Include             | Not Executed Yet |
|                4 | TC-UX-006-01 | Verify Desktop Empty State When Conversations Exist but None Is Selected | Low        | Low             | UI               | Include             | Not Executed Yet |
|                5 | TC-UX-007-01 | Verify Desktop Empty State for a Selected Conversation Without Messages  | Low        | Low             | UI               | Include             | Not Executed Yet |
|                6 | TC-UX-008-01 | Verify Mobile Empty State When No Conversations Exist                    | Low        | Low             | UI               | Include             | Not Executed Yet |
|                7 | TC-UX-009-01 | Verify Mobile Empty State When Conversations Exist but None Is Selected  | Low        | Low             | UI               | Include             | Not Executed Yet |
|                8 | TC-UX-010-01 | Verify Mobile Empty State for a Selected Conversation Without Messages   | Low        | Low             | UI               | Include             | Not Executed Yet |
|                9 | TC-UX-003-01 | Verify Theme Persistence After Navigation and Refresh                    | Low        | Low             | UI               | Include             | Not Executed Yet |
|               10 | TC-UX-001-01 | Verify Light Mode Across Register, Login, and Chat Pages                 | Low        | Low             | UI               | Include             | Not Executed Yet |
|               11 | TC-UX-002-01 | Verify Dark Mode Across Register, Login, and Chat Pages                  | Low        | Low             | UI               | Include             | Not Executed Yet |
|               12 | TC-UX-003-02 | Verify Theme Persistence After Browser Restart                           | Low        | Low             | UI               | Defer               | Not Executed Yet |
|               13 | TC-UX-003-03 | Verify Theme Persistence After Logout and Re-Login                       | Low        | Low             | UI               | Defer               | Not Executed Yet |

### 2.3 Matrix Notes

- The matrix contains 13 test cases defined in the current User Experience test-case source.
- Test Case IDs, titles, Risk Levels, and Source Priorities retain their source values.
- Automation Order represents implementation order, not source priority or a record of actual execution order.
- `Include` indicates that a test case belongs to the initial automation scope. Additional setup or assertion requirements do not remove a case from scope.
- All selected cases use the UI automation layer because they verify observable presentation, responsive behavior, theme rendering, or theme persistence.
- Responsive layout tests are prioritized first because their source Risk Level and Priority are Medium, while the remaining selected User Experience test cases have Low Risk Levels and Priorities.
- The six empty-state test cases cover the documented combinations of desktop/mobile layout and conversation availability or selection state.
- `TC-UX-003-02` and `TC-UX-003-03` are deferred from the initial implementation sequence. They remain valid test cases for subsequent theme-persistence coverage.
- `Not Executed Yet` means no automated execution result has been recorded for that test case.
- A test case must not be marked as passed, failed, or blocked without an actual execution attempt and a corresponding record.

### 2.4 Implementation Dependencies

#### Responsive Layout

`TC-UX-004-01` and `TC-UX-004-02` verify responsive behavior at representative desktop and mobile viewport sizes.

The implementation must use the viewport dimensions defined in the source test cases and verify that primary features and controls remain usable. Assertions must check for important elements being clipped and whether horizontal scrolling is required to access the primary interface.

The selected viewport sizes represent test conditions, not an exhaustive list of supported screen sizes or a definition of official responsive breakpoints.

#### Desktop and Mobile Empty States

`TC-UX-005-01`, `TC-UX-006-01`, `TC-UX-007-01`, `TC-UX-008-01`, `TC-UX-009-01`, and `TC-UX-010-01` cover the documented empty-state combinations across desktop and mobile layouts.

The implementation must establish the required conversation state before navigating to the relevant view:

- No conversations are available.
- Conversations exist, but none is selected.
- An existing conversation is selected, but it contains no messages.

Assertions must verify the documented text and visibility of the conversation list and main chat area for the relevant state and viewport. Exact text assertions must follow `REQ-UX-005`.

The test data strategy must allow each state to be established repeatably. A test must not depend on another test having created or removed conversations.

#### Theme Persistence

`TC-UX-003-01` verifies that the selected theme persists across navigation and page refresh.

The implementation must select Dark Mode, navigate between accessible pages, refresh the relevant page, and verify that the selected theme remains applied while the stored browser preference remains available.

`TC-UX-003-02` and `TC-UX-003-03` are deferred from the initial implementation sequence. Browser restart and logout/re-login conditions must preserve the browser's stored theme preference when those cases are implemented.

#### Light and Dark Mode Rendering

`TC-UX-001-01` and `TC-UX-002-01` verify theme availability and consistent rendering across Register, Login, and Chat pages.

The implementation must establish the intended theme and verify that it is applied to each page. Page content and primary controls must remain visible and usable in the selected theme.

The test must distinguish the theme being selected from the theme actually being applied to the rendered interface.

---

## 3. Execution Summary

### 3.1 Current Execution Status

| Metric                             | Count |
| ---------------------------------- | ----: |
| Test Cases in Coverage Matrix      |    13 |
| Test Cases Selected for Automation |    13 |
| Test Cases Implemented             |     0 |
| Test Cases Executed                |     0 |
| Passed                             |     0 |
| Failed                             |     0 |
| Blocked                            |     0 |
| Not Executed                       |    13 |

### 3.2 Summary Notes

- The initial User Experience automation scope contains 13 selected test cases.
- No User Experience automated test has been executed.
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
- The selected empty-state cases cover the six combinations defined in the source test cases. They do not establish exhaustive coverage of all possible conversation-list states.
- Responsive layout coverage is limited to the representative viewport sizes defined in the source test cases. It does not establish behavior at every possible screen size or device.
- Theme rendering and persistence must be verified through observable UI behavior. A selected preference alone does not prove that the correct theme has been applied.
- Theme-persistence tests must preserve the stored browser preference during the relevant state transitions.
- Empty-state assertions must use the exact expected content and visibility rules defined by `REQ-UX-005`.
- Test data setup and cleanup must be repeatable and must not depend on another test having executed first.
- Browser-specific visual differences must not automatically be classified as defects unless they violate the documented requirement.
- The two deferred theme-persistence cases remain outside the initial implementation sequence. Their deferral does not imply that their behavior has been verified.
- Test execution outcomes must be supported by actual results and evidence.
- A failed assertion or unexpected observation is not automatically a confirmed defect. Defect classification must be supported by the applicable requirement and the collected evidence.
- The automation scope is limited to the selected User Experience test cases. It does not imply exhaustive coverage of every behavior in the functional area.

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
