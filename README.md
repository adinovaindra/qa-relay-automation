# Relay — QA Automation & Technical Debugging

## 1. Project Overview

This repository contains a self-directed QA portfolio project for **Relay**, a full-stack one-to-one messaging web application.

The project extends the existing Relay manual QA portfolio through selected UI and API automation using Playwright and TypeScript, supported by structured test design, controlled test data, database setup and cleanup, execution evidence, and technical investigation.

The objective is to demonstrate a practical QA workflow that connects documented requirements, risk assessment, test design, automation implementation, execution results, and defect reporting.

Automation is implemented incrementally based on test value, risk, repeatability, stability, and maintenance considerations. The project does not aim to automate every manually designed test case.

This is an ongoing portfolio project. Its current automation coverage, execution outcomes, and limitations are documented transparently. No test result or defect is claimed without supporting execution records and evidence.

## 2. System Under Test

| Attribute            | Description                                                                           |
| -------------------- | ------------------------------------------------------------------------------------- |
| Application          | [Relay — Messaging Application](https://github.com/adinovaindra/relay-messaging-team) |
| Application Type     | Full-stack one-to-one messaging web application                                       |
| Testing Type         | UI automation and selected API automation                                             |
| Automation Framework | Playwright                                                                            |
| Programming Language | TypeScript                                                                            |
| Runtime              | Node.js                                                                               |
| Database             | PostgreSQL                                                                            |
| ORM                  | Prisma                                                                                |
| Test Environment     | Local development environment                                                         |
| Base URL             | `http://localhost:3000`                                                               |
| Project Type         | Self-directed QA portfolio project                                                    |
| Testing Approach     | Requirement-based, risk-informed, and evidence-driven                                 |

The Relay application source code is maintained in a separate repository from this QA automation project.

## 3. QA Scope

The project evaluates selected Relay functionality against documented product requirements and defined test cases.

The testing scope is organized into six functional areas:

- **Authentication:** User registration, login, logout, and authentication-related behavior.
- **Authorization:** Access control and enforcement of authorized application resources and actions.
- **Conversation:** One-to-one conversation creation, retrieval, and conversation-related behavior.
- **Messaging:** Message submission, validation, ordering, persistence, and message presentation.
- **User Experience:** Theme behavior, responsive layouts, and user interface states.
- **End-to-End:** Cross-feature workflows involving registration, authentication, conversation creation, messaging, and logout.

Testing activities use the UI and API layers where they provide appropriate coverage. Database setup, cleanup, and selected technical verification support reliable test execution and investigation.

The final automation scope is determined by the documented requirements, risk assessment, test scenarios, and test cases. Not every manually designed test case is necessarily suitable for automation.

Automation results are evaluated against documented expected behavior. An unexpected observation or failed assertion is not automatically classified as a confirmed application defect.

## 4. QA Workflow

The project follows this workflow:

```text
Requirement Analysis
        ↓
Risk Assessment
        ↓
Test Scenario and Test Case Design
        ↓
Automation Candidate Selection
        ↓
Test Implementation
        ↓
Automated Test Execution
        ↓
Evidence Collection
        ↓
Result Analysis and Technical Investigation
        ↓
Defect Reporting, Where Supported
        ↓
Execution Summary and Maintenance
```

Each automation candidate is reviewed for requirement traceability, expected behavior, test data, execution stability, and verification requirements before implementation.

Test design, automation implementation, and test execution are documented separately to maintain clear traceability and avoid reporting planned work as completed work.

## 5. Current Automation Status

**Project Status: In Progress — Automation Implementation and Portfolio Review**

As of **2026-11-07**, the automation coverage and execution documents report the following results:

| Metric                       | Test Cases |
| ---------------------------- | ---------: |
| Total Test Cases in Coverage |         81 |
| Selected for Automation      |         81 |
| Implemented                  |         39 |
| Executed                     |         39 |
| Passed                       |         33 |
| Failed                       |          6 |
| Blocked                      |          0 |
| Not Executed                 |         42 |

### 5.1 Functional Area Breakdown

| Functional Area | Selected | Implemented | Passed | Failed | Not Executed |
| --------------- | -------: | ----------: | -----: | -----: | -----------: |
| Authentication  |       39 |           5 |      2 |      3 |           34 |
| Authorization   |        7 |           7 |      7 |      0 |            0 |
| Conversation    |       13 |           5 |      5 |      0 |            8 |
| Messaging       |       13 |          13 |     13 |      0 |            0 |
| User Experience |        8 |           8 |      5 |      3 |            0 |
| End-to-End      |        1 |           1 |      1 |      0 |            0 |
| **Total**       |   **81** |      **39** | **33** |  **6** |       **42** |

### 5.2 Progress Notes

- All six functional areas have selected test cases and implemented automation.
- Authorization, Messaging, and End-to-End have completed their currently selected automation scope.
- Authentication and Conversation remain partially implemented, with additional selected test cases not yet automated.
- User Experience has completed its selected implementation and execution scope, with three failed test cases.
- Six test cases currently have a failed execution result. Their observations and related defect information are documented in the relevant execution and defect reports.
- Forty-two selected test cases remain unexecuted.

These metrics describe distinct test cases, not the total number of individual test runs. Repeated execution of the same test case does not increase the unique test case count.

The execution status is a snapshot of the documented results. It does not imply exhaustive feature coverage or that the application is defect-free.

## 6. Tools and Technologies

| Tool / Technology  | Purpose                                       |
| ------------------ | --------------------------------------------- |
| Playwright         | Browser and API test automation               |
| TypeScript         | Automation implementation                     |
| Node.js and npm    | Runtime and dependency management             |
| PostgreSQL         | Dedicated QA test database                    |
| Prisma             | Database access used by the Relay application |
| Docker             | Local development environment support         |
| Visual Studio Code | Development environment                       |
| Git and GitHub     | Version control and repository hosting        |
| Markdown           | QA documentation and reporting                |

The automation project uses Playwright with Chromium, Firefox, and WebKit browser projects configured in `playwright.config.ts`. Browser coverage in execution records reflects the browsers actually used for each recorded test run.

## 7. Repository Structure

The repository is organized into product documentation, test design, automation implementation, execution records, defect reports, and supporting evidence.

```text
qa-relay-automation/
├── docs/
│   ├── requirements/
│   ├── README.md
│   ├── product-scope.md
│   └── risk-assessment.md
│
├── test-design/
│   ├── scenarios/
│   ├── test-cases/
│   └── README.md
│
├── tests/
│   ├── authentication/
│   ├── authorization/
│   ├── conversation/
│   ├── end-to-end/
│   ├── messaging/
│   ├── support/
│   └── user-experience/
│
├── test-execution/
│   ├── README.md
│   ├── authentication.md
│   ├── authorization.md
│   ├── conversation.md
│   ├── end-to-end.md
│   ├── messaging.md
│   └── user-experience.md
│
├── defect-reports/
│   ├── README.md
│   ├── authentication.md
│   └── user-experience.md
│
├── evidence/
│   ├── BUG-001/
│   │   ├── TC-AUTH-007-01/
│   │   ├── TC-AUTH-007-02/
│   │   └── TC-AUTH-008-01/
│   │
│   ├── BUG-003/
│   │   ├── TC-UX-004-01/
│   │   └── TC-UX-005-01/
│   │
│   └── BUG-004/
│       ├── TC-UX-005-01/
│       └── TC-UX-008-01/
│
├── scripts/
│   └── guard-test-database.mjs
│
├── .env.test.example
├── .gitignore
├── .prettierrc
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

### Directory Guide

| Directory / File       | Purpose                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| `docs/`                | Product scope, functional requirements, and risk assessment.                                            |
| `test-design/`         | Test scenarios and detailed test cases derived from documented requirements and risks.                  |
| `tests/`               | Playwright test specifications organized by functional area.                                            |
| `tests/support/`       | Database setup and cleanup helpers used by automated tests.                                             |
| `test-execution/`      | Automation coverage matrices, implementation status, execution summaries, and actual execution records. |
| `defect-reports/`      | Documented defects identified during testing and supported by requirements and evidence.                |
| `evidence/`            | Supporting screenshots, traces, videos, and technical investigation records organized by defect.        |
| `scripts/`             | Supporting scripts, including the QA database safety guard.                                             |
| `.env.test.example`    | Template for configuring the local test environment.                                                    |
| `playwright.config.ts` | Playwright configuration, browser projects, and Relay application startup settings.                     |
| `package.json`         | Project scripts and development dependencies.                                                           |
| `tsconfig.json`        | TypeScript compiler configuration.                                                                      |

## 8. Environment Architecture

The portfolio uses two separate repositories:

1. **Relay application repository:** Contains the Next.js application, Prisma schema, migrations, and application source code.
2. **QA automation repository:** Contains Playwright tests, automation configuration, test design, execution documentation, and supporting scripts.

Playwright starts the Relay application using its existing development command and supplies the dedicated QA database connection to the application process.

The intended local architecture is:

```text
QA Automation Repository
        |
        | Playwright
        v
Relay Application (Next.js)
        |
        | Prisma
        v
PostgreSQL
        |
        v
relay_qa_automation
```

The automation environment uses a dedicated local PostgreSQL database:

| Database Component | Configuration           |
| ------------------ | ----------------------- |
| QA Database        | `relay_qa_automation`   |
| Test Role          | `relay_test_user`       |
| Cleanup Role       | `relay_qa_cleanup`      |
| Application URL    | `http://localhost:3000` |

The automation environment must not intentionally target the development database `relay`.

The test and cleanup roles are separate to maintain distinct permissions for test execution and test-data cleanup. The automation roles must not be PostgreSQL superusers or used for database creation, schema migrations, or administrative operations.

## 9. Prerequisites

Before setting up the project, ensure the following are available:

- Git
- Node.js compatible with the project configuration
- npm
- Docker Desktop or another compatible Docker environment
- The Relay application repository
- The QA automation repository
- A local PostgreSQL instance
- The dedicated QA database with the required Relay schema initialized

The Relay application and QA automation repositories must remain separate.

The QA database schema must be initialized using an appropriate database-owner or migration role before automated tests are executed. The test and cleanup roles should have only the permissions required by their respective operations.

## 10. Setup Instructions

### 10.1 Clone the Repositories

Clone the Relay application repository:

```bash
git clone https://github.com/adinovaindra/relay-messaging-team.git
```

Clone this QA automation repository from its GitHub repository page :

```bash
git clone https://github.com/adinovaindra/qa-relay-automation.git
```

Keep both repositories in separate local directories and note the absolute path of the Relay application directory.

### 10.2 Install Automation Dependencies

Open a terminal in the root of `qa-relay-automation` and run:

```bash
npm ci
```

Install the Chromium browser binary:

```bash
npx playwright install chromium
```

Firefox and WebKit browser binaries can also be installed when those browser projects are required:

```bash
npx playwright install
```

### 10.3 Prepare the QA Database

Start the local PostgreSQL service and ensure that the dedicated `relay_qa_automation` database contains the required Relay schema.

Configure the following PostgreSQL roles:

- `relay_test_user` for test execution.
- `relay_qa_cleanup` for test-data cleanup.

Both roles must use test-only credentials and must not have unnecessary administrative privileges.

Do not reset, drop, or recreate the existing QA database or its persistent volume as part of routine test execution.

### 10.4 Configure the Test Environment

Copy `.env.test.example` to `.env.test` in the root of the automation repository.

Configure the following variables in `.env.test`:

```dotenv
QA_AUTOMATION_ENABLED=1

RELAY_APP_DIR=F:/path/to/relay-messaging-team

DATABASE_URL="postgresql://relay_test_user:YOUR_TEST_PASSWORD@127.0.0.1:5432/relay_qa_automation?schema=public"

DATABASE_CLEANUP_URL="postgresql://relay_qa_cleanup:YOUR_CLEANUP_PASSWORD@127.0.0.1:5432/relay_qa_automation?schema=public"

JWT_SECRET=YOUR_RANDOM_TEST_ONLY_SECRET
```

Replace the example values with the correct local configuration.

- `QA_AUTOMATION_ENABLED` explicitly enables the automation environment.
- `RELAY_APP_DIR` points to the absolute path of the local Relay application repository.
- `DATABASE_URL` points to the dedicated QA database using the test role.
- `DATABASE_CLEANUP_URL` points to the same QA database using the cleanup role.
- `JWT_SECRET` is a secret used only for local testing.

Generate a random test-only JWT secret using:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

This command generates a 64-character hexadecimal secret.

URL-encode reserved characters in database URL credentials when necessary.

Never commit `.env.test` or publish passwords, database credentials, tokens, or JWT secrets.

### 10.5 Verify the Configuration

From the root of `qa-relay-automation`, run:

```bash
node scripts/guard-test-database.mjs
```

The QA Safety Guard checks the configured local test environment before Playwright execution.

A successful guard result confirms that the configured environment satisfies the guard's checks. It does not, by itself, prove that the application or every test case behaves correctly.

## 11. Running Tests

The repository currently defines the following npm scripts:

| Command                 | Purpose                                                          |
| ----------------------- | ---------------------------------------------------------------- |
| `npm test`              | Run Playwright tests after the database safety guard passes.     |
| `npm run test:headed`   | Run tests in headed browser mode after the safety guard passes.  |
| `npm run test:chromium` | Run tests in the Chromium project after the safety guard passes. |
| `npm run typecheck`     | Check TypeScript types without executing tests.                  |

To list the tests discovered by Playwright without executing them:

```bash
npx playwright test --list
```

To run a specific test area in Chromium with a single worker:

```bash
npm run test:headed -- end-to-end/end-to-end --project=chromium --workers=1
```

Shared static-account tests should be executed with `--workers=1` to avoid concurrent modifications to shared test data.

To repeat a test case twice:

```bash
npm run test:headed -- end-to-end/end-to-end --project=chromium --workers=1 --repeat-each=2
```

Repeated executions provide additional evidence about repeatability but do not represent additional unique test cases.

## 12. Test Data and Database Safety

The automation environment uses a dedicated QA database to isolate test data from the development database.

Automated tests may create or modify persistent user, conversation, and message records. Test data must therefore be managed carefully to avoid unintended conflicts, including duplicate-email failures during repeated registration tests.

The project uses database setup and cleanup helpers to support controlled test data management.

The following principles apply:

- Use the dedicated QA database for automation.
- Keep test and cleanup database roles separate.
- Use controlled test data and repeatable setup procedures.
- Clean up test data through the established helpers.
- Do not reset, drop, or recreate the database or Docker volumes during routine test execution.
- Do not use the test role for schema migrations or administrative operations.
- Treat the QA Safety Guard as an additional safeguard, not a replacement for correct database permissions and environment configuration.

## 13. Execution Reporting and Evidence

Automation coverage and execution results are documented separately from test design.

Each functional-area execution document contains its automation coverage matrix, implementation dependencies, execution summary, and actual execution records.

Supporting evidence is maintained in `evidence/` and may include:

- Screenshots
- Playwright traces
- Test execution videos
- Error context and technical investigation notes
- Other relevant supporting records

When a test fails, investigation should distinguish between:

- An actual requirement violation.
- An automation or assertion issue.
- An environment or configuration failure.
- A test data conflict.
- Behavior requiring clarification.

A failed assertion alone does not automatically establish a confirmed application defect. Defect reports require supporting evidence and a relevant documented requirement or contract.

Execution records must reflect actual test runs. Planned tests, unexecuted tests, and repeated executions must not be misrepresented as completed unique test cases.

## 14. Project Limitations

This is a self-directed QA portfolio project, not professional QA work performed for an employer.

The project demonstrates selected automation and technical QA methods applied to Relay within the documented scope. It does not claim:

- Exhaustive application or requirement coverage.
- Complete automation of all designed test cases.
- Production reliability or production environment validation.
- That the Relay application is defect-free.
- Comprehensive security or penetration testing.
- Performance, load, or stress testing.
- Native Android or iOS application testing.
- Realtime message delivery or live synchronization as a product capability.

Retesting after a defect fix and regression testing after a fix are outside the current portfolio deliverables.

The database initialization procedure must be reviewed and validated on a clean environment before the repository can be considered fully reproducible by external users.

## 15. Related Documentation

### Product Documentation

- [Product Documentation Index](./docs/README.md)
- [Product & QA Scope](./docs/product-scope.md)
- [Risk Assessment](./docs/risk-assessment.md)
- [Authentication Requirements](./docs/requirements/authentication.md)
- [Authorization Requirements](./docs/requirements/authorization.md)
- [Conversation Requirements](./docs/requirements/conversation.md)
- [Messaging Requirements](./docs/requirements/messaging.md)
- [User Experience Requirements](./docs/requirements/user-experience.md)

### Test Design

- [Test Design Documentation](./test-design/README.md)
- [Test Scenarios](./test-design/scenarios/)
- [Test Cases](./test-design/test-cases/)

### Test Execution

- [Test Execution Documentation](./test-execution/README.md)

### Defect Reports and Evidence

- [Defect Reports](./defect-reports/README.md)
- [Supporting Evidence](./evidence/)

### Automation Implementation

- [Playwright Test Specifications](./tests/)
- [Database Setup and Cleanup Helpers](./tests/support/)
- [QA Database Safety Guard](./scripts/guard-test-database.mjs)

## 16. Author

**Adinova Indra Permana**

Self-directed QA portfolio project focused on Playwright automation, technical investigation, and progression toward Technical QA.
