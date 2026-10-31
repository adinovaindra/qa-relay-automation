# Defect Reports — Relay QA Automation

This directory contains documented defects identified during the testing of the Relay messaging application.

Each defect report provides the information necessary to understand the observed behavior, compare it against the expected requirements, reproduce the issue, assess its impact, and support further investigation and verification.

## 1. Scope

These reports cover defects identified through automated testing and technical investigation of the Relay messaging application.

Each report is maintained as an independent record and linked to its relevant testing artifacts whenever applicable.

## 2. Defect Identification

Defect IDs follow this format:

`BUG-NNN`

Examples:

- `BUG-001`
- `BUG-002`
- `BUG-003`

IDs are assigned sequentially when a new defect is documented. An assigned ID must not be reused, even if the defect is later rejected, closed, or determined to be a duplicate.

Each defect should have a corresponding Jira issue. The Jira issue key and URL must be recorded in the relevant defect report.

## 3. Defect Report Structure

Each defect report follows the standard structure below:

1. Defect Identification
2. Traceability
3. Environment
4. Description
5. Preconditions
6. Test Data
7. Steps to Reproduce
8. Expected Result
9. Actual Result
10. Impact Assessment
11. Evidence
12. Automation Execution Details
13. Reproducibility
14. Status and Verification Notes

This structure ensures that each reported defect contains sufficient information for investigation, reproduction, prioritization, and verification.

## 4. Severity and Priority

Severity describes the impact of a defect on the application's functionality, usability, data integrity, or security.

Priority describes how urgently a defect should be addressed.

Severity and priority are separate assessments and must not automatically be treated as equivalent.

Both classifications use the following levels:

| Level  | Severity                                                                                                  | Priority                                                                |
| ------ | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| High   | Significantly impacts core functionality, critical user workflows, data integrity, or security.           | Requires prompt attention because of its significant impact or urgency. |
| Medium | Impacts a feature or user workflow, but the application remains usable or a reasonable workaround exists. | Should be addressed within normal development priorities.               |
| Low    | Causes a minor functional, validation, or presentation discrepancy with limited impact.                   | Can be addressed when scheduling permits.                               |

Severity and priority must be assigned based on the available evidence and impact assessment, rather than solely on the fact that an automated test failed.

## 5. Reproducibility

Reproducibility describes whether the reported behavior can be consistently observed under the documented conditions.

The following statuses are used:

- **Not Yet Established** — There is insufficient repeated execution evidence to determine whether the behavior is reproducible.
- **Reproducible** — Repeated attempts under documented conditions produce the same defect behavior.
- **Intermittent** — The defect occurs inconsistently under otherwise comparable conditions.
- **Not Reproducible** — The behavior could not be reproduced during subsequent attempts.

Each report must record the number of reproduction attempts and successful reproductions accurately.

An initial defect observation must not automatically be presented as proof of repeatability.

## 6. Evidence and Automation Details

Evidence must support the reported observation and provide sufficient context for investigation.

Depending on availability, evidence may include:

- Screenshots
- Playwright HTML reports
- Playwright traces
- Test execution videos
- Terminal output
- Relevant HTTP request and response details
- Additional supporting documentation

Automation execution details should identify the relevant spec file, test case, execution command, result, duration, and available test run or commit references.

Manual observations must be clearly distinguished from automated assertions. A behavior must not be described as automatically verified unless an automated check actually performed that verification.

## 7. Traceability

Each defect should be linked to the relevant testing artifacts whenever applicable:

- Requirement ID
- Test Scenario ID
- Test Case ID
- Test Execution Record
- Jira Issue

All references must use their actual identifiers and valid links. Missing references must be identified with an appropriate placeholder rather than an invented identifier.

## 8. Reporting Principles

All defect reports follow these principles:

1. **Evidence-based:** Document only behavior that has actually been observed.
2. **Requirement-driven:** Identify the documented requirement or expected contract that the behavior violates.
3. **Reproducible:** Provide clear reproduction steps and accurately record reproduction attempts.
4. **Objective:** Distinguish confirmed impact from potential consequences.
5. **Traceable:** Maintain links between defects, requirements, test cases, execution records, and Jira issues.
6. **Accurate:** Preserve the exact observed result, including error messages, response codes, and relevant execution details.
7. **Consistent:** Use the established defect identification, reporting, severity, priority, and reproducibility conventions.

## 9. Directory Structure

```text
defect-reports/
├── README.md
├── authentication.md
├── authorization.md
├── conversation.md
├── messaging.md
├── user-experience.md
└── end-to-end.md
```

Defect reports are grouped by functional area. Each functional-area file contains defects identified within that area.

A new functional-area file is created when the first defect is identified in an area that does not yet have one.

## 10. Defect Report Template

Use the following template for every new defect report. Replace the placeholders with the corresponding defect information. Remove optional evidence entries that are not available or applicable.

```markdown
# BUG-NNN — Defect Title

## 1. Defect Identification

| Field           | Value                         |
| --------------- | ----------------------------- |
| Defect ID       | BUG-NNN                       |
| Jira Issue      | [JIRA-KEY](JIRA-URL)          |
| Title           | Defect Title                  |
| Functional Area | Functional Area / Sub-feature |
| Severity        | High / Medium / Low           |
| Priority        | High / Medium / Low           |
| Status          | Open                          |
| Date Identified | YYYY-MM-DD                    |

## 2. Traceability

| Reference        | ID / Link                                 |
| ---------------- | ----------------------------------------- |
| Requirement      | REQ-XXX                                   |
| Test Scenario    | SCN-XXX                                   |
| Test Case        | TC-XXX                                    |
| Execution Record | [Execution Record](EXECUTION-RECORD-LINK) |

## 3. Environment

- Application URL:
- Application Version / Commit:
- Browser:
- Browser Version:
- Operating System:
- Test Framework:
- Framework Version:
- Execution Mode:
- Execution Environment:

## 4. Description

Provide a concise description of the observed behavior and the discrepancy against the documented requirement.

## 5. Preconditions

- Precondition 1.
- Precondition 2.

## 6. Test Data

| Data        | Value |
| ----------- | ----- |
| Test Data 1 | Value |

## 7. Steps to Reproduce

1. Step 1.
2. Step 2.
3. Step 3.

## 8. Expected Result

Describe the behavior required by the applicable requirement or expected contract.

## 9. Actual Result

Describe the behavior actually observed during execution. Include the exact error message, response code, or relevant output where applicable.

## 10. Impact Assessment

Describe the impact supported by the available evidence. Distinguish confirmed impact from potential consequences.

## 11. Evidence

- Screenshot:
- Trace:
- Video:
- Error Context:

## 12. Automation Execution Details

| Field              | Value                    |
| ------------------ | ------------------------ |
| Spec File          | `tests/...`              |
| Test Case ID       | TC-XXX                   |
| Test Command       | Executed command         |
| Execution Result   | PASS / FAIL              |
| Test Run Reference | Local / CI run reference |

## 13. Reproducibility

| Field                           | Value                         |
| ------------------------------- | ----------------------------- |
| Reproducibility Status          | Not Yet Established           |
| Number of Reproduction Attempts | 0                             |
| Successful Reproductions        | 0                             |
| Failed Reproductions            | 0                             |
| Notes                           | Additional observations / N/A |
```
