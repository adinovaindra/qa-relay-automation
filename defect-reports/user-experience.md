# User Experience Defect Reports

This document contains defect reports identified within the User Experience functional area of the Relay messaging application.

---

# BUG-003 — Desktop Empty-State Heading Is Missing the Required Trailing Period

## 1. Defect Identification

| Field           | Value                                                               |
| --------------- | ------------------------------------------------------------------- |
| Defect ID       | BUG-003                                                             |
| Jira Issue      | [QRA-3](https://adinovapramono69.atlassian.net/browse/QRA-3)        |
| Title           | Desktop Empty-State Heading Is Missing the Required Trailing Period |
| Functional Area | User Experience / Desktop Empty State                               |
| Severity        | Low                                                                 |
| Priority        | Low                                                                 |
| Status          | Open                                                                |
| Date Identified | 2026-11-05                                                          |

## 2. Traceability

| Reference        | ID / Link                                                                                                                                                                                                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requirement      | [REQ-UX-005](../docs/requirements/user-experience.md#req-ux-005--empty-state-behavior)                                                                                                                                                                                                                     |
| Test Scenario    | [SCN-UX-005](../test-design/scenarios/user-experience.md#scn-ux-005--desktop-empty-state-no-conversations), [SCN-UX-006](../test-design/scenarios/user-experience.md#scn-ux-006--desktop-empty-state-conversations-exist-but-none-is-selected)                                                             |
| Test Case        | [TC-UX-004-01](../test-design/test-cases/user-experience.md#tc-ux-004-01--verify-desktop-layout-with-conversations-available-and-none-selected), [TC-UX-005-01](../test-design/test-cases/user-experience.md#tc-ux-005-01--verify-desktop-empty-state-without-conversations-and-after-starting-a-new-chat) |
| Related Risks    | RSK-015 [Risk Register List](../docs/risk-assessment.md#3-risk-register)                                                                                                                                                                                                                                   |
| Execution Record | [TC-UX-004-01](../test-execution/user-experience.md#tc-ux-004-01--verify-desktop-layout-with-conversations-available-and-none-selected), [TC-UX-005-01](../test-execution/user-experience.md#tc-ux-005-01--verify-desktop-empty-state-without-conversations-and-after-starting-a-new-chat)                 |

## 3. Environment

- Application URL: http://localhost:3000
- Application Version / Commit: Not recorded.
- Browser: Chromium
- Browser Version: 156.0.8078.4 (Official Build) (64-bit)
- Operating System: Windows 11 Pro 25H2
- Test Framework: Playwright
- Framework Version: 1.64.1
- Execution Mode: Headed
- Execution Environment: Local QA automation environment using the `relay_qa_automation` database. QA Safety Guard passed before execution.

## 4. Description

When the user opens the Chat page on a desktop viewport and no conversation is selected, the main chat area displays the empty-selection heading without a trailing period.

The discrepancy was observed under two conditions:

1. Conversations are available, but none is selected (REQ-UX-005, State B; TC-UX-004-01).
2. No conversations are available (REQ-UX-005, State A; TC-UX-005-01).

In both conditions, the displayed heading is:

`Select a conversation`

However, REQ-UX-005 explicitly requires the exact heading:

`Select a conversation.`

The missing trailing period causes the exact-text Playwright assertions in both test cases to fail.

## 5. Preconditions

- The Relay application is accessible.
- Alice (`alice@example.com`) has a registered account and valid credentials.
- The browser viewport is set to 1366 × 768 pixels.

**Condition A — Conversations Exist, but None Is Selected (TC-UX-004-01)**

- Alice has at least two existing populated conversations: one with Bob (`bob@example.com`) and one with Charlie (`charlie@example.com`).
- The Alice–Bob conversation contains `Hi Bob. How are you?`.
- The Alice–Charlie conversation contains `Hi Charlie. How are you?`.
- No conversation is selected when the Chat page is displayed.

**Condition B — No Conversations Available (TC-UX-005-01)**

- Alice has no conversations associated with her account before the test begins.
- Bob (`bob@example.com`) has a registered account and is available as a user with whom Alice can start a new conversation.
- No conversation is selected when the Chat page is initially displayed.

## 6. Test Data

| Data                   | Value                                      |
| ---------------------- | ------------------------------------------ |
| User                   | Alice (`alice@example.com`)                |
| Conversation 1         | Alice – Bob (`bob@example.com`)            |
| Conversation 1 Message | `Hi Bob. How are you?`                     |
| Conversation 2         | Alice – Charlie (`charlie@example.com`)    |
| Conversation 2 Message | `Hi Charlie. How are you?`                 |
| Additional User        | Bob (`bob@example.com`)                    |
| Initial State A        | Two populated conversations; none selected |
| Initial State B        | No conversations available                 |
| Viewport               | 1366 × 768 pixels                          |

## 7. Steps to Reproduce

**Condition A — Conversations Exist, but None Is Selected (TC-UX-004-01)**

1. Ensure Alice is registered and has valid login credentials.
2. Prepare two populated conversations for Alice: one with Bob and one with Charlie.
3. Add at least one message to each conversation.
4. Open the Relay application at `http://localhost:3000` in Chromium.
5. Set the browser viewport to 1366 × 768 pixels.
6. Sign in as Alice.
7. Open the Chat page and do not select either conversation.
8. Observe the heading displayed in the main chat area.

**Condition B — No Conversations Available (TC-UX-005-01)**

1. Ensure Alice and Bob are registered and have valid login credentials.
2. Ensure Alice has no existing conversations.
3. Open the Relay application at `http://localhost:3000` in Chromium.
4. Set the browser viewport to 1366 × 768 pixels.
5. Sign in as Alice.
6. Open the Chat page without starting or selecting a conversation.
7. Observe the heading displayed in the main chat area.

## 8. Expected Result

According to REQ-UX-005:

- Desktop State A — When no conversations are available, the main chat area displays exactly `Select a conversation.`.
- Desktop State B — When conversations are available but none is selected, the main chat area displays exactly `Select a conversation.`.
- In both states, the main chat area displays the supporting text `Choose a conversation from the list or start a new chat to begin messaging.`.

## 9. Actual Result

**Condition A — Conversations Exist, but None Is Selected (TC-UX-004-01)**

- The conversation list and main chat area are displayed side by side.
- Both populated conversations are displayed in the conversation list.
- The main chat area displays the supporting text as required.
- The main chat area displays `Select a conversation` without the required trailing period.
- The exact heading assertion fails with:

```text
Expected: "Select a conversation."
Received: "Select a conversation"
```

**Condition B — No Conversations Available (TC-UX-005-01)**

- The conversation list and main chat area are displayed side by side.
- The conversation list displays `No conversations yet` without the required trailing period.
- The main chat area displays the supporting text as required.
- The main chat area displays `Select a conversation` without the required trailing period.
- The exact heading assertion for the main chat area fails with the same mismatch.

The same missing trailing period in the main chat area heading was reproduced in both repetitions of TC-UX-004-01 and both repetitions of TC-UX-005-01.

The other assertions shown in the supplied Playwright execution records completed without reported failures, except for the separately documented empty-state heading mismatches in TC-UX-005-01.

## 10. Impact Assessment

**Confirmed Impact:**

- The displayed empty-state heading does not conform to the exact text specified in REQ-UX-005.
- The exact-text assertions in TC-UX-004-01 and TC-UX-005-01 fail consistently under the documented test conditions.

**Potential Impact:**

- The empty-state heading is textually inconsistent with the documented interface content.

No loss of conversation data, inability to access conversations, layout failure, or broader functional impact was established by this execution. The observed discrepancy is limited to the missing trailing period.

**Severity:** Low

**Priority:** Low

## 11. Evidence

- Screenshot: [TC-UX-004-01](../evidence/BUG-003/TC-UX-004-01/screenshot.png), [TC-UX-005-01](../evidence/BUG-003/TC-UX-005-01/screenshot.png)
- Trace: [TC-UX-004-01](../evidence/BUG-003/TC-UX-004-01/trace.zip), [TC-UX-005-01](../evidence/BUG-003/TC-UX-005-01/trace.zip)
- Video: [TC-UX-004-01](../evidence/BUG-003/TC-UX-004-01/video.webm), [TC-UX-005-01](../evidence/BUG-003/TC-UX-005-01/video.webm)
- Error Context: [TC-UX-004-01](../evidence/BUG-003/TC-UX-004-01/error-context.md), [TC-UX-005-01](../evidence/BUG-003/TC-UX-005-01/error-context.md)

**Observed Assertion Output:**

```text
Expected: "Select a conversation."
Received: "Select a conversation"
```

## 12. Automation Execution Details

| Field              | Value                                                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| Spec File          | `tests/user-experience/user-experience.spec.ts`                                                                               |
| Test Case ID       | TC-UX-004-01                                                                                                                  |
| Test Command       | `npm run test:headed -- user-experience/user-experience --grep="TC-UX-004-01" --workers=1 --project=chromium --repeat-each=2` |
| Execution Result   | FAIL — both repetitions failed at the same exact-heading assertion                                                            |
| Test Run Reference | Local headed Chromium execution, QA Safety Guard passed                                                                       |

**Execution Notes**

- The test was repeated twice using `--repeat-each=2`; both repetitions produced the same heading-text mismatch.
- The other assertions visible in the supplied Playwright execution trace completed without reported failures.
- The failure is a requirement-conformance discrepancy, not a test locator or timeout failure.
- The exact expected heading is retained from REQ-UX-005 and the source test case. It was not relaxed to match the current application output.
- The test case is recorded as one executed test case with two reproduction attempts, not as two distinct test cases.

### Additional Reproduction — TC-UX-005-01 (2026-11-06)

- Test Case: TC-UX-005-01 — Verify Desktop Empty State Without Conversations and After Starting a New Chat.
- Viewport: 1366 × 768 pixels.
- Execution: Headed Chromium, Playwright 1.64.1, one worker.
- Test Command:

  `npm run test:headed -- user-experience/user-experience --grep="TC-UX-005-01" --workers=1 --project=chromium --repeat-each=2`

- Result: FAIL — both repetitions reproduced the same missing trailing period.
- Expected: `Select a conversation.`
- Actual: `Select a conversation`

The same desktop empty-selection heading discrepancy was reproduced in TC-UX-005-01, in addition to its earlier reproduction in TC-UX-004-01.

## 13. Reproducibility

| Field                           | Value                                                                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Reproducibility Status          | Reproducible                                                                                                              |
| Number of Reproduction Attempts | 4                                                                                                                         |
| Successful Reproductions        | 4                                                                                                                         |
| Failed Reproductions            | 0                                                                                                                         |
| Notes                           | The same missing trailing period was reproduced in both repetitions of TC-UX-004-01 and both repetitions of TC-UX-005-01. |

---

# BUG-004 — Empty-State Headings Are Missing the Required Trailing Periods

## 1. Defect Identification

| Field           | Value                                                          |
| --------------- | -------------------------------------------------------------- |
| Defect ID       | BUG-004                                                        |
| Jira Issue      | [QRA-4](https://adinovapramono69.atlassian.net/browse/QRA-4)   |
| Title           | Empty-State Headings Are Missing the Required Trailing Periods |
| Functional Area | User Experience / Empty States                                 |
| Severity        | Low                                                            |
| Priority        | Low                                                            |
| Status          | Open                                                           |
| Date Identified | 2026-11-06                                                     |

## 2. Traceability

| Reference        | ID / Link                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requirement      | [REQ-UX-005](../docs/requirements/user-experience.md#req-ux-005--empty-state-behavior)                                                                                                                                                                                                                                                                                                                                                                                                 |
| Test Scenario    | [SCN-UX-005](../test-design/scenarios/user-experience.md#scn-ux-005--desktop-empty-state-no-conversations), [SCN-UX-007](../test-design/scenarios/user-experience.md#scn-ux-007--desktop-empty-state-selected-conversation-has-no-messages), [SCN-UX-008](../test-design/scenarios/user-experience.md#scn-ux-008--mobile-empty-state-no-conversations), [SCN-UX-010](../test-design/scenarios/user-experience.md#scn-ux-010--mobile-empty-state-selected-conversation-has-no-messages) |
| Test Case        | [TC-UX-005-01](../test-design/test-cases/user-experience.md#tc-ux-005-01--verify-desktop-empty-state-without-conversations-and-after-starting-a-new-chat), [TC-UX-008-01](../test-design/test-cases/user-experience.md#tc-ux-008-01--verify-mobile-empty-state-without-conversations-and-after-starting-a-new-chat)                                                                                                                                                                    |
| Related Risks    | RSK-010, RSK-015 [Risk Register List](../docs/risk-assessment.md#3-risk-register)                                                                                                                                                                                                                                                                                                                                                                                                      |
| Execution Record | [TC-UX-005-01](../test-execution/user-experience.md#tc-ux-005-01--verify-desktop-empty-state-without-conversations-and-after-starting-a-new-chat), [TC-UX-008-01](../test-execution/user-experience.md#tc-ux-008-01--verify-mobile-empty-state-without-conversations-and-after-starting-a-new-chat)                                                                                                                                                                                    |

## 3. Environment

- Application URL: http://localhost:3000
- Application Version / Commit: Not recorded.
- Browser: Chromium
- Browser Version: 156.0.8078.4 (Official Build) (64-bit)
- Operating System: Windows 11 Pro 25H2
- Test Framework: Playwright
- Framework Version: 1.64.1
- Execution Mode: Headed
- Execution Environment: Local QA automation environment using the `relay_qa_automation` database. QA Safety Guard passed before execution.
- Initial Detection Viewport: 390 × 844 pixels

## 4. Description

During the desktop and mobile empty-state journeys, two headings displayed by the Relay application do not match the exact text required by REQ-UX-005.

The same two discrepancies were also reproduced during the desktop empty-state journey in TC-UX-005-01, in addition to their earlier reproduction in TC-UX-008-01 on mobile.

The first discrepancy occurs when Alice opens the Chat page without any existing conversations.

The displayed conversation list empty-state heading is:

`No conversations yet`

However, REQ-UX-005 requires:

`No conversations yet.`

The second discrepancy occurs after Alice starts a new conversation with Bob through the UI. The selected conversation contains no messages.

The displayed empty message-state heading is:

`No messages yet`

However, REQ-UX-005 requires:

`No messages yet.`

Both headings are missing their required trailing periods. These discrepancies cause the corresponding exact-text Playwright assertions in TC-UX-008-01 and TC-UX-005-01 to fail.

## 5. Preconditions

- The Relay application is accessible.
- Alice (`alice@example.com`) and Bob (`bob@example.com`) have registered accounts and valid credentials.
- Alice has no conversations associated with her account before execution.
- Bob is available as a user with whom Alice can start a new conversation.
- The initial state is established independently using the existing database setup helpers.
- Test data is cleaned up using the existing database cleanup helpers.

**Condition A — Mobile Empty-State Journey (TC-UX-008-01)**

- The browser viewport is configured to 390 × 844 pixels.
- The mobile conversation list is displayed before a conversation is selected.
- The main chat area remains hidden until Alice starts and selects a conversation.

**Condition B — Desktop Empty-State Journey (TC-UX-005-01)**

- The browser viewport is configured to 1366 × 768 pixels.
- The desktop Chat page is displayed with no conversations associated with Alice.
- The conversation list panel and main chat area are displayed side by side.
- No conversation is selected initially.

## 6. Test Data

| Data                      | Value                                        |
| ------------------------- | -------------------------------------------- |
| User A                    | Alice (`alice@example.com`)                  |
| User B                    | Bob (`bob@example.com`)                      |
| Initial Conversation Data | No conversations associated with Alice       |
| New Conversation          | A new conversation started by Alice with Bob |
| New Conversation Messages | No messages                                  |
| Mobile Viewport           | 390 × 844 pixels                             |
| Desktop Viewport          | 1366 × 768 pixels                            |
| Test Framework            | Playwright 1.64.1                            |
| Browser                   | Chromium                                     |

## 7. Steps to Reproduce

**Condition A — Mobile Empty-State Journey (TC-UX-008-01)**

1. Ensure Alice and Bob are registered and have valid credentials.
2. Ensure Alice has no existing conversations.
3. Open the Relay application at `http://localhost:3000` in Chromium.
4. Set the browser viewport to 390 × 844 pixels.
5. Sign in as Alice.
6. Observe the conversation list empty state.
7. Verify the displayed heading against the exact expected text in REQ-UX-005.
8. Open the New Chat flow.
9. Select Bob and click Start Chat.
10. Verify that the newly created conversation is displayed as the selected conversation.
11. Observe the selected conversation's empty message state.
12. Verify the displayed heading against the exact expected text in REQ-UX-005.
13. Use the back button to return to the conversation list.

**Condition B — Desktop Empty-State Journey (TC-UX-005-01)**

1. Ensure Alice and Bob are registered and have valid credentials.
2. Ensure Alice has no existing conversations.
3. Open the Relay application at `http://localhost:3000` in Chromium.
4. Set the browser viewport to 1366 × 768 pixels.
5. Sign in as Alice.
6. Observe the conversation list empty state.
7. Verify the displayed heading against the exact expected text in REQ-UX-005.
8. Observe the main chat area's initial unselected state.
9. Open the New Chat flow.
10. Select Bob and click Start Chat.
11. Verify that the newly created conversation is displayed as the selected conversation.
12. Observe the selected conversation's empty message state.
13. Verify the displayed heading against the exact expected text in REQ-UX-005.

## 8. Expected Result

According to REQ-UX-005:

- The conversation list empty-state heading displays exactly `No conversations yet.`.
- After Alice starts a new conversation with Bob, the selected conversation's empty message-state heading displays exactly `No messages yet.`.
- Both headings conform to the documented empty-state content.

## 9. Actual Result

- The conversation list empty-state heading displays `No conversations yet` without a trailing period.
- After starting a new conversation with Bob, the selected conversation's empty message-state heading displays `No messages yet` without a trailing period.
- Both exact-text assertions fail because the actual rendered text differs from the documented expected text.

The discrepancies were observed in both repetitions of TC-UX-008-01.

**Observed Assertion Output — Conversation List Empty State:**

```text
Expected: "No conversations yet."
Received: "No conversations yet"
```

**Observed Assertion Output — Selected Conversation Empty State:**

```text
Expected: "No messages yet."
Received: "No messages yet"
```

The same two discrepancies were reproduced in both repetitions of TC-UX-008-01 on mobile and both repetitions of TC-UX-005-01 on desktop.

## 10. Impact Assessment

**Confirmed Impact:**

- Both desktop and mobile empty-state headings do not conform to the exact text specified in REQ-UX-005.
- The exact-text assertions in TC-UX-005-01 and TC-UX-008-01 fail consistently under their documented test conditions.
- Both discrepancies were reproduced across two consecutive test executions on each viewport.

**Potential Impact:**

- The empty-state headings are textually inconsistent with the documented interface content across desktop and mobile viewports.

No inability to start a conversation, access the selected conversation, return to the conversation list, or use the tested primary controls was established by this execution.

The observed discrepancies are limited to the missing trailing periods in the two empty-state headings.

**Severity:** Low

**Priority:** Low

## 11. Evidence

- Screenshot: [TC-UX-008-01](../evidence/BUG-004/TC-UX-008-01/screenshot.png), [TC-UX-005-01](../evidence/BUG-004/TC-UX-005-01/screenshot.png)
- Trace: [TC-UX-008-01](../evidence/BUG-004/TC-UX-008-01/trace.zip), [TC-UX-005-01](../evidence/BUG-004/TC-UX-005-01/trace.zip)
- Video: [TC-UX-008-01](../evidence/BUG-004/TC-UX-008-01/video.webm), [TC-UX-005-01](../evidence/BUG-004/TC-UX-005-01/video.webm)
- Error Context: [TC-UX-008-01](../evidence/BUG-004/TC-UX-008-01/error-context.md), [TC-UX-005-01](../evidence/BUG-004/TC-UX-005-01/error-context.md)

**Observed Assertion Output:**

```text
Expected: "No conversations yet."
Received: "No conversations yet"

Expected: "No messages yet."
Received: "No messages yet"
```

## 12. Automation Execution Details

| Field              | Value                                                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| Spec File          | `tests/user-experience/user-experience.spec.ts`                                                                               |
| Test Case ID       | TC-UX-008-01                                                                                                                  |
| Test Command       | `npm run test:headed -- user-experience/user-experience --grep="TC-UX-008-01" --workers=1 --project=chromium --repeat-each=2` |
| Execution Result   | FAIL — both repetitions failed at the same two exact-heading assertions                                                       |
| Test Run Reference | Local headed Chromium execution; QA Safety Guard passed                                                                       |

**Execution Notes**

- The test was repeated twice using `--repeat-each=2`.
- Both repetitions produced the same two heading-text mismatches.
- The remaining assertions completed without reported failures in the supplied Playwright output.
- The test successfully executed the Start Chat UI flow, displayed the selected conversation, and returned to the conversation list using the back button.
- The test used `toHaveText()` to verify the exact expected heading content.
- The expected text was retained from REQ-UX-005 and the source test case. It was not relaxed to match the current application output.
- The test case is recorded as one executed test case with two reproduction attempts, not as two distinct test cases.

### Additional Reproduction — TC-UX-005-01 (2026-11-06)

- Test Case: TC-UX-005-01 — Verify Desktop Empty State Without Conversations and After Starting a New Chat.
- Viewport: 1366 × 768 pixels.
- Execution: Headed Chromium, Playwright 1.64.1, one worker.
- Test Command:

  `npm run test:headed -- user-experience/user-experience --grep="TC-UX-005-01" --workers=1 --project=chromium --repeat-each=2`

- Result: FAIL — both repetitions reproduced the same two missing-period discrepancies.

The same two empty-state heading discrepancies were reproduced in TC-UX-005-01 on desktop, in addition to their earlier reproduction in TC-UX-008-01 on mobile.

## 13. Reproducibility

| Field                           | Value                                                                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Reproducibility Status          | Reproducible                                                                                                                                     |
| Number of Reproduction Attempts | 4                                                                                                                                                |
| Successful Reproductions        | 4                                                                                                                                                |
| Failed Reproductions            | 0                                                                                                                                                |
| Notes                           | Both missing-period discrepancies were reproduced in both repetitions of TC-UX-008-01 on mobile and both repetitions of TC-UX-005-01 on desktop. |
