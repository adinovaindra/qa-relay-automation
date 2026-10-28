# Relay — QA Automation & Technical Debugging

## Project Overview

This repository contains a self-directed QA portfolio project for **Relay**, a full-stack 1-on-1 messaging web application.

The project focuses on browser-based test automation using Playwright and TypeScript, supported by structured test design, controlled test data, database verification, and evidence-based technical investigation.

The portfolio builds on the existing Relay manual QA project by extending selected test cases into repeatable automated checks and investigating relevant application behavior at the UI, API, and database levels where appropriate.

The objective is to demonstrate a practical QA workflow that connects test requirements, automation implementation, execution results, and technical evidence.

This is an ongoing portfolio project. Test coverage, execution results, and technical findings will be documented as the implementation progresses. No test result or defect is claimed unless supported by actual execution and evidence.

## System Under Test

- **Application:** Relay [relay-messaging-team](https://github.com/adinovaindra/relay-messaging-team)
- **Application Type:** Full-stack 1-on-1 messaging web application
- **Testing Type:** UI automation and selected technical verification
- **Automation Framework:** Playwright
- **Programming Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Project Type:** Self-directed QA portfolio project
- **Testing Approach:** Requirement-based, risk-informed, and evidence-driven testing

The Relay application source code is maintained in a separate repository from this automation project.

## QA Scope

The portfolio extends testing of selected Relay functionality through automation and technical investigation.

Potential coverage areas include:

- Authentication and registration
- Authentication and session behavior
- Authorization and access control
- Conversation and messaging behavior
- Message persistence and data integrity
- Browser-level behavior and UI states
- API behavior where it provides distinct coverage
- Database verification where appropriate
- Technical investigation of observed failures

The final automation scope is determined by the existing product requirements, risk assessment, test scenarios, and test cases. Not every manual test case is necessarily suitable for automation.

The project prioritizes test value, repeatability, stability, risk coverage, and the cost of maintaining each automated check.

Automation results are interpreted against documented requirements and expected behavior. An unexpected observation is not automatically classified as a confirmed defect.

## QA Workflow

The portfolio workflow is:

```text
Requirement Analysis
        ↓
Risk Assessment
        ↓
Test Scenario and Test Case Review
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
Test Summary and Maintenance
```

Test cases are implemented incrementally. Each candidate is reviewed for traceability, expected behavior, test data, execution stability, and verification requirements before the automation scope is expanded.

Technical investigation and database verification are performed where they provide meaningful evidence beyond the browser's observed behavior.

## Tools and Technologies

- Playwright
- TypeScript
- Node.js and npm
- PostgreSQL
- Prisma
- Docker
- Visual Studio Code
- Git and GitHub
- Markdown

The exact tool versions and runtime requirements will be maintained alongside the project configuration as the portfolio develops.

## Repository Structure

The current repository is organized around automation, test design, documentation, and safety configuration.

```text
qa-relay-automation/
├── .gitignore
├── .env.test.example
├── docs/
├── test-design/
├── tests/
├── scripts/
│   └── guard-test-database.mjs
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
```

The structure may evolve as additional tests and supporting utilities are introduced.

### Directory Guide

- `docs/` — Project documentation and supporting technical notes.
- `test-design/` — Test design artifacts used to identify and select automation candidates.
- `tests/` — Playwright test specifications.
- `scripts/` — Supporting scripts, including the test database safety guard.
- `.env.test.example` — Template for the local automation environment.
- `playwright.config.ts` — Playwright configuration, browser projects, and application startup settings.
- `package.json` — Project scripts and dependencies.

The root README provides the project overview and setup instructions. Detailed test design and execution artifacts remain in their respective directories.

## Environment Architecture

The portfolio uses two separate repositories:

1. **Relay application repository** — Contains the Next.js application, Prisma schema, migrations, and application code.
2. **QA automation repository** — Contains Playwright tests, automation configuration, test design, and supporting scripts.

The automation configuration starts the Relay application using its existing development command and supplies the dedicated QA database connection to the application process.

The intended local environment is:

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

The automation environment uses the dedicated `relay_qa_automation` database and the `relay_test_user` PostgreSQL role. It must not intentionally target the development database `relay`.

## Prerequisites

Before setting up the project, ensure the following are available:

- Git
- Node.js compatible with the project configuration
- npm
- Docker Desktop or another compatible Docker environment
- The Relay application repository
- The QA automation repository
- A local PostgreSQL instance with the dedicated QA database and required schema already initialized

The versions of Node.js and the project's dependencies should be checked against the repository configuration. The database setup must be completed before automated registration tests are executed.

## Setup Instructions

### 1. Clone the repositories

Clone both the Relay application repository and this QA automation repository from their respective GitHub URLs.

Keep the repositories separate and note the absolute path of the Relay application directory.

### 2. Install automation dependencies

Open a terminal in the root of `qa-relay-automation` and run:

```bash
npm ci
```

Install the required Playwright browser binaries if they are not already available:

```bash
npx playwright install chromium
```

Additional browser binaries can be installed when the corresponding browser projects are ready to be executed.

### 3. Prepare the QA database

Start the existing PostgreSQL service and ensure that the dedicated `relay_qa_automation` database contains the required Relay schema.

Create or configure the dedicated `relay_test_user` role with a test-only password and the minimum privileges needed by the selected automated tests.

The automation role must not be a PostgreSQL superuser and must not be granted access to the development database unless a separate, explicitly justified requirement exists.

Do not use the automation test role to create databases, run schema migrations, or perform administrative database operations.

The database schema must be initialized using an appropriate database-owner or migration role before running the tests. The exact database initialization procedure must be documented and verified before this project is considered reproducible from a clean environment.

### 4. Configure the test environment

Copy `.env.test.example` to `.env.test` in the root of the automation repository.

Configure the following variables in `.env.test`:

```dotenv
QA_AUTOMATION_ENABLED=1

RELAY_APP_DIR=F:/path/to/relay-messaging-team

DATABASE_URL="postgresql://relay_test_user:YOUR_TEST_PASSWORD@127.0.0.1:5432/relay_qa_automation?schema=public"

JWT_SECRET=YOUR_RANDOM_TEST_ONLY_SECRET
```

Replace the example values with the correct local configuration.

- `QA_AUTOMATION_ENABLED` explicitly enables the automation environment.
- `RELAY_APP_DIR` points to the local Relay application repository.
- `DATABASE_URL` points to the dedicated local QA database.
- `JWT_SECRET` is a secret used only for local testing.

Use a strong, unique password for the test database role and a random, test-only JWT secret of at least 32 characters. Generate a suitable JWT secret by running the following command in your terminal:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

This command generates a 64-character hexadecimal secret (256 bits of randomness). URL-encode reserved characters in the database URL credentials when necessary.

Never commit `.env.test` or publish passwords, database credentials, tokens, or JWT secrets.

### 5. Verify the configuration

From the root of `qa-relay-automation`, run:

```bash
node scripts/guard-test-database.mjs
```

The safety guard checks the local test configuration before the test command proceeds.

A successful guard result confirms that the configured environment satisfies the guard's checks. It does not, by itself, prove that the application can register an account or that every database operation will succeed.

## Running Tests

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

To run a specific test after it has been implemented, use Playwright's test filtering options and the relevant project configuration.

The current implementation is still in the initial setup stage. The commands above describe the configured test workflow; they do not imply that Relay automation tests have already passed.

## Test Strategy

Automation candidates are selected from the existing Relay test design rather than from an unverified list of proposed test cases.

Selection considers:

- Requirement and risk traceability
- Expected business and user impact
- Repeatability and suitability for automation
- Test data and environment requirements
- Stability of the expected behavior
- Value beyond existing manual coverage
- Maintenance cost and execution time

Test case IDs and titles must match the current source documents.

The initial implementation will proceed one test at a time. Each test should have a clear purpose, explicit assertions, appropriate test data, and an evidence-based interpretation of its result.

## Test Data and Database Safety

The automation environment uses a dedicated QA database to isolate test data from the development database.

Registration tests may create persistent user records. Test data must therefore be designed to avoid unintended conflicts, including duplicate-email failures caused by repeated executions.

The test setup must not reset, drop, or recreate the existing database or its persistent volume as part of routine test execution.

The safety guard is an additional safeguard, not a substitute for correct database permissions, controlled test data, or careful environment configuration.

## Reporting and Evidence

Automated test results should be recorded based on actual execution.

When a test fails, investigation should distinguish between:

- An actual requirement violation
- An automation or assertion issue
- An environment or configuration failure
- A test data conflict
- Behavior requiring clarification

Playwright reports and other supporting evidence should be retained where useful and should not expose secrets or sensitive test data.

A failed assertion alone does not automatically establish a confirmed application defect. Defect reports require supporting evidence and a relevant requirement or contract.

## Project Status

**Status: In Progress — Initial Setup**

The following setup milestones have been verified:

- Playwright and TypeScript configuration passes type checking.
- Playwright discovers the configured Chromium, Firefox, and WebKit projects.
- The database safety guard passes for the configured local QA environment.
- The dedicated `relay_test_user` role can authenticate to `relay_qa_automation`.
- Prisma successfully connects to the dedicated QA database using the configured test credentials.

The repository currently has no implemented Relay Playwright tests.

## Limitations

This is a self-directed QA portfolio project, not professional QA work performed for an employer.

The project demonstrates automation and technical QA methods applied to Relay within the documented scope. It does not claim exhaustive application coverage, production reliability, or that the application is defect-free.

Database connectivity verification does not establish end-to-end registration correctness. Runtime behavior, registration results, persisted test data, and relevant technical findings must be verified through subsequent test execution.

The setup instructions and database initialization procedure should be reviewed and validated on a clean environment before the repository is presented as fully reproducible by external users.

## Related Documentation

Detailed requirements, risks, test cases, execution records, and supporting technical documentation are maintained in the relevant project directories as those artifacts are finalized.

See `docs/` and `test-design/` for the current project documentation and test design materials.

## Author

**Adinova Indra Permana**

Self-directed QA portfolio project focused on Playwright automation, technical investigation, and progression toward Technical QA.
