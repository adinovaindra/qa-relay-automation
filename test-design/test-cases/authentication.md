# Relay — Authentication Test Cases

## 1. Purpose

This document defines the detailed authentication test cases derived from Relay's approved authentication scenarios, documented authentication requirements, product scope, and risk assessment.

The test cases translate the approved scenarios into repeatable verification steps with explicit preconditions, test data, expected results, and traceability. They describe test design only; execution outcomes and evidence are recorded separately.

---

## 2. Test Case Design Approach

Authentication test cases are derived from the following sources:

- Product scope
- Authentication requirements
- Risk assessment
- Approved authentication scenarios

The design considers positive and negative testing, boundary-value checks, validation and error-priority combinations, protected-access checks, and session-state transitions where supported by the documented requirements.

Test cases inherit their scope from the approved scenarios but map only to the requirements and risks directly relevant to the behavior being verified. Risk level informs execution priority; it does not determine the number of test cases required.

Expected results are based on the documented requirements. Where a requirement does not specify a detail, such as an exact API status code or browser-native tooltip wording across browsers, this document does not invent an acceptance criterion.

Browser, browser version, operating system, execution mode, actual result, status, evidence, and defect references belong in separate execution records rather than being repeated in each test case.

---

## 3. Test Case Structure

Each test case uses the following structure:

| Field               | Description                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | Unique identifier linked to the parent scenario.                                                               |
| Title               | Concise description of the behavior being verified.                                                            |
| Related Scenario    | Approved parent scenario.                                                                                      |
| Related Requirement | Requirement or requirements directly verified by the test case.                                                |
| Related Risk        | Risk or risks directly relevant to the behavior verified.                                                      |
| Risk Level          | Risk level associated with the behavior, based on the risk assessment.                                         |
| Test Design Method  | Method used to derive the test case.                                                                           |
| Test Type           | Classification of the test, such as functional, validation, API, security, boundary, or session-state testing. |
| Priority            | Recommended execution priority, informed by risk and coverage needs.                                           |
| Preconditions       | Conditions that must be true before the steps begin.                                                           |
| Test Data           | Values or data conditions needed to execute the test.                                                          |
| Steps               | Ordered actions performed by the tester or implemented by an automated test.                                   |
| Expected Result     | Observable result required by the documented requirement.                                                      |

### Test Case ID Convention

Test case IDs follow the conceptual format:

`TC-{FEATURE}-{SCENARIO NUMBER}-{CASE SEQUENCE}`

- `TC` identifies the artifact as a test case.
- `{FEATURE}` identifies the functional area, such as AUTH, AUTHZ, CONV, MSG, or UX.
- `{SCENARIO NUMBER}` identifies the parent scenario number to which the test case belongs.
- `{CASE SEQUENCE}` distinguishes individual test cases derived from the same scenario, using a sequential number starting from `01`.

For example, `TC-AUTH-001-01` identifies the first test case derived from `SCN-AUTH-001`. An additional test case derived from the same scenario would use `TC-AUTH-001-02`.

The test case ID must remain unique within the test case repository and maintain a clear reference to its parent scenario.

Execution-specific information such as browser environment, browser version, operating system, execution mode, actual result, status, evidence, and defect ID is recorded separately during test execution.

---

## 4. Authentication Test Cases

### TC-AUTH-001-01 — Register a new account with valid required information

| Field               | Value                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| Test Case ID        | TC-AUTH-001-01                                                                                               |
| Title               | Register a new account with valid required information                                                       |
| Related Scenario    | SCN-AUTH-001 [SCN-AUTH-001](../scenarios/authentication.md#scn-auth-001--user-registration)                  |
| Related Requirement | REQ-AUTH-001 [REQ-AUTH-001](../../docs/requirements/authentication.md#req-auth-001--successful-registration) |
| Related Risk        | RSK-007 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                  |
| Risk Level          | High                                                                                                         |
| Test Design Method  | Requirement-Based                                                                                            |
| Test Type           | Functional / Positive                                                                                        |
| Priority            | High                                                                                                         |

#### Preconditions

- Relay application is accessible.
- The email address `test.user@example.com` is not registered.
- The local QA automation database is available.
- The QA application and cleanup database roles are configured.

#### Test Data

| Data             | Value                 |
| ---------------- | --------------------- |
| Name             | Test User             |
| Email            | test.user@example.com |
| Password         | testuser123           |
| Confirm Password | testuser123           |

#### Steps

1. Open Relay Application webpage.
2. Go to `Create one` button.
3. Verify the register page is opened.
4. Enter the valid Name, Email, Password, and Confirm Password values.
5. Submit the registration form.
6. Observe the resulting page and any success feedback.

#### Expected Result

- The account is registered successfully.
- The application redirects to `/login`.
- No success message or confirmation notification is displayed.

---

### TC-AUTH-002-01 — Registration validates an empty Name field first

| Field               | Value                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-002-01                                                                                                            |
| Title               | Registration validates an empty Name field first                                                                          |
| Related Scenario    | SCN-AUTH-002 [SCN-AUTH-002](../scenarios/authentication.md#scn-auth-002--registration-required-field-validation)          |
| Related Requirement | REQ-AUTH-006 [REQ-AUTH-006](../../docs/requirements/authentication.md#req-auth-006--required-field-and-native-validation) |
| Related Risk        | RSK-007, RSK-014 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                      |
| Risk Level          | High                                                                                                                      |
| Test Design Method  | Requirement-Based                                                                                                         |
| Test Type           | Validation / Negative                                                                                                     |
| Priority            | High                                                                                                                      |

#### Preconditions

- Relay Register page is accessible.

#### Test Data

| Data             | Value |
| ---------------- | ----- |
| Name             | Empty |
| Email            | Empty |
| Password         | Empty |
| Confirm Password | Empty |

#### Steps

1. Open the Register page.
2. Leave all required fields empty.
3. Submit the form.
4. Observe the field receiving native browser validation.

#### Expected Result

- Native browser validation prevents submission.
- The Name field is identified as the first invalid required field according to the documented order.
- The native empty-field tooltip displays `Please fill out this field.` where supported by the browser.
- No registration request is completed.

---

### TC-AUTH-002-02 — Registration validates an empty Email field after Name is provided

| Field               | Value                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-002-02                                                                                                            |
| Title               | Registration validates an empty Email field after Name is provided                                                        |
| Related Scenario    | SCN-AUTH-002 [SCN-AUTH-002](../scenarios/authentication.md#scn-auth-002--registration-required-field-validation)          |
| Related Requirement | REQ-AUTH-006 [REQ-AUTH-006](../../docs/requirements/authentication.md#req-auth-006--required-field-and-native-validation) |
| Related Risk        | RSK-007, RSK-014 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                      |
| Risk Level          | High                                                                                                                      |
| Test Design Method  | Requirement-Based                                                                                                         |
| Test Type           | Validation / Negative                                                                                                     |
| Priority            | High                                                                                                                      |

#### Preconditions

- Relay Register page is accessible.

#### Test Data

| Data             | Value     |
| ---------------- | --------- |
| Name             | Dino Test |
| Email            | Empty     |
| Password         | Empty     |
| Confirm Password | Empty     |

#### Steps

1. Open the Register page.
2. Enter a valid Name and leave Email, Password, and Confirm Password empty.
3. Submit the form.
4. Observe the field receiving native browser validation.

#### Expected Result

- Native browser validation prevents submission.
- The Email field is identified as the first invalid required field according to the documented order.
- The native empty-field tooltip displays `Please fill out this field.` where supported by the browser.

---

### TC-AUTH-002-03 — Registration validates an empty Password field after Name and Email are provided

| Field               | Value                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-002-03                                                                                                            |
| Title               | Registration validates an empty Password field after Name and Email are provided                                          |
| Related Scenario    | SCN-AUTH-002 [SCN-AUTH-002](../scenarios/authentication.md#scn-auth-002--registration-required-field-validation)          |
| Related Requirement | REQ-AUTH-006 [REQ-AUTH-006](../../docs/requirements/authentication.md#req-auth-006--required-field-and-native-validation) |
| Related Risk        | RSK-007, RSK-014 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                      |
| Risk Level          | High                                                                                                                      |
| Test Design Method  | Requirement-Based                                                                                                         |
| Test Type           | Validation / Negative                                                                                                     |
| Priority            | High                                                                                                                      |

#### Preconditions

- Relay Register page is accessible.

#### Test Data

| Data             | Value                     |
| ---------------- | ------------------------- |
| Name             | Dino Test                 |
| Email            | dino.auth.002@example.com |
| Password         | Empty                     |
| Confirm Password | Empty                     |

#### Steps

1. Open the Register page.
2. Enter a valid Name and valid Email; leave Password and Confirm Password empty.
3. Submit the form.
4. Observe the field receiving native browser validation.

#### Expected Result

- Native browser validation prevents submission.
- The Password field is identified as the first invalid required field according to the documented order.
- The native empty-field tooltip displays `Please fill out this field.` where supported by the browser.

---

### TC-AUTH-002-04 — Registration validates an empty Confirm Password field last

| Field               | Value                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-002-04                                                                                                            |
| Title               | Registration validates an empty Confirm Password field last                                                               |
| Related Scenario    | SCN-AUTH-002 [SCN-AUTH-002](../scenarios/authentication.md#scn-auth-002--registration-required-field-validation)          |
| Related Requirement | REQ-AUTH-006 [REQ-AUTH-006](../../docs/requirements/authentication.md#req-auth-006--required-field-and-native-validation) |
| Related Risk        | RSK-007, RSK-014 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                      |
| Risk Level          | High                                                                                                                      |
| Test Design Method  | Requirement-Based                                                                                                         |
| Test Type           | Validation / Negative                                                                                                     |
| Priority            | High                                                                                                                      |

#### Preconditions

- Relay Register page is accessible.

#### Test Data

| Data             | Value                     |
| ---------------- | ------------------------- |
| Name             | Dino Test                 |
| Email            | dino.auth.003@example.com |
| Password         | simplepass                |
| Confirm Password | Empty                     |

#### Steps

1. Open the Register page.
2. Enter a valid Name, valid Email, and valid Password; leave Confirm Password empty.
3. Submit the form.
4. Observe the field receiving native browser validation.

#### Expected Result

- Native browser validation prevents submission.
- The Confirm Password field is identified as the first invalid required field.
- The native empty-field tooltip displays `Please fill out this field.` where supported by the browser.

---

### TC-AUTH-003-01 — Login blocks submission when Email is empty

| Field               | Value                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-003-01                                                                                                            |
| Title               | Login blocks submission when Email is empty                                                                               |
| Related Scenario    | SCN-AUTH-003 [SCN-AUTH-003](../scenarios/authentication.md#scn-auth-003--login-required-field-validation)                 |
| Related Requirement | REQ-AUTH-006 [REQ-AUTH-006](../../docs/requirements/authentication.md#req-auth-006--required-field-and-native-validation) |
| Related Risk        | RSK-003 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                               |
| Risk Level          | Medium                                                                                                                    |
| Test Design Method  | Requirement-Based                                                                                                         |
| Test Type           | Validation / Negative                                                                                                     |
| Priority            | Medium                                                                                                                    |

#### Preconditions

- Relay Login page is accessible.

#### Test Data

| Data     | Value               |
| -------- | ------------------- |
| Email    | Empty               |
| Password | Any non-empty value |

#### Steps

1. Open the Login page.
2. Leave Email empty and enter any value in Password.
3. Submit the form.

#### Expected Result

- Native browser validation identifies Email as the first invalid required field.
- Submission is prevented.
- The application-level `Invalid email or password.` error is not triggered.

---

### TC-AUTH-003-02 — Login blocks submission when Password is empty

| Field               | Value                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-003-02                                                                                                            |
| Title               | Login blocks submission when Password is empty                                                                            |
| Related Scenario    | SCN-AUTH-003 [SCN-AUTH-003](../scenarios/authentication.md#scn-auth-003--login-required-field-validation)                 |
| Related Requirement | REQ-AUTH-006 [REQ-AUTH-006](../../docs/requirements/authentication.md#req-auth-006--required-field-and-native-validation) |
| Related Risk        | RSK-003 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                               |
| Risk Level          | Medium                                                                                                                    |
| Test Design Method  | Requirement-Based                                                                                                         |
| Test Type           | Validation / Negative                                                                                                     |
| Priority            | Medium                                                                                                                    |

#### Preconditions

- Relay Login page is accessible.

#### Test Data

| Data     | Value                     |
| -------- | ------------------------- |
| Email    | dino.auth.003@example.com |
| Password | Empty                     |

#### Steps

1. Open the Login page.
2. Enter an email value and leave Password empty.
3. Submit the form.

#### Expected Result

- Native browser validation identifies Password as the first invalid required field.
- Submission is prevented.
- The application-level `Invalid email or password.` error is not triggered.

---

### TC-AUTH-003-03 — Login blocks submission when Email has an invalid format

| Field               | Value                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-003-03                                                                                                            |
| Title               | Login blocks submission when Email has an invalid format                                                                  |
| Related Scenario    | SCN-AUTH-003 [SCN-AUTH-003](../scenarios/authentication.md#scn-auth-003--login-required-field-validation)                 |
| Related Requirement | REQ-AUTH-006 [REQ-AUTH-006](../../docs/requirements/authentication.md#req-auth-006--required-field-and-native-validation) |
| Related Risk        | RSK-003 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                               |
| Risk Level          | Medium                                                                                                                    |
| Test Design Method  | Requirement-Based                                                                                                         |
| Test Type           | Validation / Negative                                                                                                     |
| Priority            | Medium                                                                                                                    |

#### Preconditions

- Relay Login page is accessible.

#### Test Data

| Data     | Value               |
| -------- | ------------------- |
| Email    | dinotest            |
| Password | Any non-empty value |

#### Steps

1. Open the Login page.
2. Enter `dinotest` in Email and a non-empty value in Password.
3. Submit the form.

#### Expected Result

- Native browser email-format validation prevents submission.
- The application-level `Invalid email or password.` error is not triggered.
- The user remains on the Login page.

---

### TC-AUTH-004-01 — Registration rejects a password shorter than eight characters

| Field               | Value                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-004-01                                                                                                                  |
| Title               | Registration rejects a password shorter than eight characters                                                                   |
| Related Scenario    | SCN-AUTH-004 [SCN-AUTH-004](../scenarios/authentication.md#scn-auth-004--registration-email-and-password-validation)            |
| Related Requirement | REQ-AUTH-008 [REQ-AUTH-008](../../docs/requirements/authentication.md#req-auth-008--registration-email-and-password-validation) |
| Related Risk        | RSK-007, RSK-014 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                            |
| Risk Level          | High                                                                                                                            |
| Test Design Method  | Requirement-Based / Boundary Value Analysis                                                                                     |
| Test Type           | Validation / Boundary                                                                                                           |
| Priority            | High                                                                                                                            |

#### Preconditions

- Relay Register page is accessible.

#### Test Data

| Data             | Value                      |
| ---------------- | -------------------------- |
| Name             | Dino Test                  |
| Email            | dino.auth.004a@example.com |
| Password         | pass123                    |
| Confirm Password | pass123                    |

#### Steps

1. Open the Register page.
2. Enter valid Name and Email values.
3. Enter matching seven-character Password and Confirm Password values.
4. Submit the form.

#### Expected Result

- Native browser length validation prevents submission because Password is shorter than eight characters.
- The account is not registered.
- The browser displays its native length-validation tooltip; exact wording may vary by browser and browser language.

---

### TC-AUTH-004-02 — Registration accepts a password at the eight-character minimum

| Field               | Value                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-004-02                                                                                                                  |
| Title               | Registration accepts a password at the eight-character minimum                                                                  |
| Related Scenario    | SCN-AUTH-004 [SCN-AUTH-004](../scenarios/authentication.md#scn-auth-004--registration-email-and-password-validation)            |
| Related Requirement | REQ-AUTH-008 [REQ-AUTH-008](../../docs/requirements/authentication.md#req-auth-008--registration-email-and-password-validation) |
| Related Risk        | RSK-007, RSK-014 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                            |
| Risk Level          | High                                                                                                                            |
| Test Design Method  | Requirement-Based / Boundary Value Analysis                                                                                     |
| Test Type           | Validation / Boundary                                                                                                           |
| Priority            | High                                                                                                                            |

#### Preconditions

- Relay Register page is accessible.
- The email address in the test data has not been registered.

#### Test Data

| Data             | Value                      |
| ---------------- | -------------------------- |
| Name             | Dino Test                  |
| Email            | dino.auth.004b@example.com |
| Password         | pass1234 (8 characters)    |
| Confirm Password | pass1234                   |

#### Steps

1. Open the Register page.
2. Enter the valid Name and Email values.
3. Enter matching eight-character Password and Confirm Password values.
4. Submit the form.

#### Expected Result

- Native browser minimum-length validation does not block submission.
- Registration succeeds if all other documented validation rules pass.
- The application redirects to `/login` without a success notification.

---

### TC-AUTH-004-03 — Whitespace characters count toward the registration password minimum length

| Field               | Value                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-004-03                                                                                                                  |
| Title               | Whitespace characters count toward the registration password minimum length                                                     |
| Related Scenario    | SCN-AUTH-004 [SCN-AUTH-004](../scenarios/authentication.md#scn-auth-004--registration-email-and-password-validation)            |
| Related Requirement | REQ-AUTH-008 [REQ-AUTH-008](../../docs/requirements/authentication.md#req-auth-008--registration-email-and-password-validation) |
| Related Risk        | RSK-007, RSK-014 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                            |
| Risk Level          | High                                                                                                                            |
| Test Design Method  | Requirement-Based / Boundary Value Analysis                                                                                     |
| Test Type           | Validation / Boundary                                                                                                           |
| Priority            | High                                                                                                                            |

#### Preconditions

- Relay Register page is accessible.
- The email address in the test data has not been registered.

#### Test Data

| Data             | Value                                       |
| ---------------- | ------------------------------------------- |
| Name             | Dino Test                                   |
| Email            | dino.auth.004c@example.com                  |
| Password         | Seven spaces followed by `a` (8 characters) |
| Confirm Password | Seven spaces followed by `a` (8 characters) |

#### Steps

1. Open the Register page.
2. Enter a valid Name and Email.
3. Enter seven whitespace characters followed by `a` in Password and Confirm Password (eight characters total).
4. Submit the form.

#### Expected Result

- Whitespace characters count toward the minimum length, so the eight-character value satisfies the documented minimum.
- Native minimum-length validation does not block submission.
- No additional password complexity rule blocks the value; if all other documented validation rules pass, registration succeeds and redirects to `/login`.

---

### TC-AUTH-004-04 — Registration does not require password character-class complexity

| Field               | Value                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-004-04                                                                                                                  |
| Title               | Registration does not require password character-class complexity                                                               |
| Related Scenario    | SCN-AUTH-004 [SCN-AUTH-004](../scenarios/authentication.md#scn-auth-004--registration-email-and-password-validation)            |
| Related Requirement | REQ-AUTH-008 [REQ-AUTH-008](../../docs/requirements/authentication.md#req-auth-008--registration-email-and-password-validation) |
| Related Risk        | RSK-007, RSK-014 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                            |
| Risk Level          | High                                                                                                                            |
| Test Design Method  | Requirement-Based                                                                                                               |
| Test Type           | Functional / Positive                                                                                                           |
| Priority            | High                                                                                                                            |

#### Preconditions

- Relay Register page is accessible.
- The email address in the test data has not been registered.

#### Test Data

| Data             | Value                      |
| ---------------- | -------------------------- |
| Name             | Dino Test                  |
| Email            | dino.auth.004d@example.com |
| Password         | abcdefgh                   |
| Confirm Password | abcdefgh                   |

#### Steps

1. Open the Register page.
2. Enter a valid Name and Email.
3. Enter matching eight-character lowercase-only values in Password and Confirm Password.
4. Submit the form.

#### Expected Result

- Registration is not rejected solely because the password lacks uppercase letters, digits, or symbols.
- If all other documented validation rules pass, registration succeeds and redirects to `/login`.

---

### TC-AUTH-004-05 — Login does not apply the registration minimum password-length rule

| Field               | Value                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-004-05                                                                                                                  |
| Title               | Login does not apply the registration minimum password-length rule                                                              |
| Related Scenario    | SCN-AUTH-004 [SCN-AUTH-004](../scenarios/authentication.md#scn-auth-004--registration-email-and-password-validation)            |
| Related Requirement | REQ-AUTH-008 [REQ-AUTH-008](../../docs/requirements/authentication.md#req-auth-008--registration-email-and-password-validation) |
| Related Risk        | RSK-003 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                     |
| Risk Level          | Medium                                                                                                                          |
| Test Design Method  | Requirement-Based                                                                                                               |
| Test Type           | Validation / Negative                                                                                                           |
| Priority            | Medium                                                                                                                          |

#### Preconditions

- Relay Login page is accessible.

#### Test Data

| Data     | Value                      |
| -------- | -------------------------- |
| Email    | dino.auth.004e@example.com |
| Password | short                      |

#### Steps

1. Open the Login page.
2. Enter the email and a password shorter than eight characters.
3. Submit the form.

#### Expected Result

- The registration minimum-length rule does not block the login submission.
- The form does not apply the registration-only minimum-length restriction to the login password field; the subsequent authentication outcome is governed by the login requirements.

---

### TC-AUTH-004-06 — Registration rejects an invalid email format

| Field               | Value                                                                                                                |
| ------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-004-06                                                                                                       |
| Title               | Registration rejects an invalid email format                                                                         |
| Related Scenario    | SCN-AUTH-004 [SCN-AUTH-004](../scenarios/authentication.md#scn-auth-004--registration-email-and-password-validation) |
| Related Requirement | REQ-AUTH-006, REQ-AUTH-008 [Authentication Requirements](../../docs/requirements/authentication.md)                  |
| Related Risk        | RSK-007, RSK-014 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                 |
| Risk Level          | High                                                                                                                 |
| Test Design Method  | Requirement-Based                                                                                                    |
| Test Type           | Validation / Negative                                                                                                |
| Priority            | High                                                                                                                 |

#### Preconditions

- Relay Register page is accessible.

#### Test Data

| Data             | Value       |
| ---------------- | ----------- |
| Name             | Test User   |
| Email            | testuser    |
| Password         | password123 |
| Confirm Password | password123 |

#### Steps

1. Open the Register page.
2. Enter `Test User` in the Name field.
3. Enter `testuser` in the Email field.
4. Enter `password123` in the Password field.
5. Enter `password123` in the Confirm Password field.
6. Submit the registration form.
7. Observe the browser's native email-format validation feedback.

#### Expected Result

- Native browser email-format validation prevents form submission.
- The browser displays its native email-format validation tooltip for the invalid Email value.
- The exact tooltip wording may vary depending on the browser and browser language.
- Registration is not completed.
- The user remains on the Register page.

---

### TC-AUTH-005-01 — Registration displays the password mismatch error

| Field               | Value                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-005-01                                                                                                                         |
| Title               | Registration displays the password mismatch error                                                                                      |
| Related Scenario    | SCN-AUTH-005 [SCN-AUTH-005](../scenarios/authentication.md#scn-auth-005--registration-application-level-validation-and-error-priority) |
| Related Requirement | REQ-AUTH-009 [REQ-AUTH-009](../../docs/requirements/authentication.md#req-auth-009--registration-application-level-validation-errors)  |
| Related Risk        | RSK-007, RSK-014 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                   |
| Risk Level          | High                                                                                                                                   |
| Test Design Method  | Requirement-Based                                                                                                                      |
| Test Type           | Functional / Negative                                                                                                                  |
| Priority            | High                                                                                                                                   |

#### Preconditions

- Relay Register page is accessible.
- The email address in the test data has not been registered.

#### Test Data

| Data             | Value                 |
| ---------------- | --------------------- |
| Name             | Test User             |
| Email            | test.user@example.com |
| Password         | password123           |
| Confirm Password | password124           |

#### Steps

1. Open Relay Application webpage.
2. Go to `Create one` button.
3. Enter valid required values with given test data.
4. Submit the form.

#### Expected Result

- The application displays exactly `Passwords do not match.`
- Registration is not completed.

---

### TC-AUTH-005-02 — Registration rejects a whitespace-only Name

| Field               | Value                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-005-02                                                                                                                         |
| Title               | Registration rejects a whitespace-only Name                                                                                            |
| Related Scenario    | SCN-AUTH-005 [SCN-AUTH-005](../scenarios/authentication.md#scn-auth-005--registration-application-level-validation-and-error-priority) |
| Related Requirement | REQ-AUTH-009 [REQ-AUTH-009](../../docs/requirements/authentication.md#req-auth-009--registration-application-level-validation-errors)  |
| Related Risk        | RSK-007, RSK-014 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                   |
| Risk Level          | High                                                                                                                                   |
| Test Design Method  | Requirement-Based                                                                                                                      |
| Test Type           | Functional / Negative                                                                                                                  |
| Priority            | High                                                                                                                                   |

#### Preconditions

- Relay Register page is accessible.
- The email address in the test data has not been registered.

#### Test Data

| Data             | Value                                    |
| ---------------- | ---------------------------------------- |
| Name             | Three or more whitespace characters only |
| Email            | dino.auth.005b@example.com               |
| Password         | simplepass                               |
| Confirm Password | simplepass                               |

#### Steps

1. Open the Register page.
2. Enter whitespace-only Name and otherwise valid registration values.
3. Submit the form.

#### Expected Result

- The application displays exactly `Invalid request data.`
- Registration is not completed.

---

### TC-AUTH-005-03 — Registration rejects an already registered email address

| Field               | Value                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-005-03                                                                                                                         |
| Title               | Registration rejects an already registered email address                                                                               |
| Related Scenario    | SCN-AUTH-005 [SCN-AUTH-005](../scenarios/authentication.md#scn-auth-005--registration-application-level-validation-and-error-priority) |
| Related Requirement | REQ-AUTH-009 [REQ-AUTH-009](../../docs/requirements/authentication.md#req-auth-009--registration-application-level-validation-errors)  |
| Related Risk        | RSK-007, RSK-014 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                   |
| Risk Level          | High                                                                                                                                   |
| Test Design Method  | Requirement-Based                                                                                                                      |
| Test Type           | Functional / Negative                                                                                                                  |
| Priority            | High                                                                                                                                   |

#### Preconditions

- Relay Register page is accessible.
- The test email is already registered.

#### Test Data

| Data             | Value                           |
| ---------------- | ------------------------------- |
| Name             | Dino Test                       |
| Email            | existing.registered@example.com |
| Password         | simplepass                      |
| Confirm Password | simplepass                      |

#### Steps

1. Open the Register page.
2. Enter valid Name, matching valid passwords, and the already registered email.
3. Submit the form.

#### Expected Result

- The application displays exactly `An account with this email already exists.`
- Registration is not completed.

---

### TC-AUTH-005-04 — Password mismatch takes priority over other registration validation errors

| Field               | Value                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-005-04                                                                                                                         |
| Title               | Password mismatch takes priority over other registration validation errors                                                             |
| Related Scenario    | SCN-AUTH-005 [SCN-AUTH-005](../scenarios/authentication.md#scn-auth-005--registration-application-level-validation-and-error-priority) |
| Related Requirement | REQ-AUTH-009 [REQ-AUTH-009](../../docs/requirements/authentication.md#req-auth-009--registration-application-level-validation-errors)  |
| Related Risk        | RSK-007, RSK-014 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                   |
| Risk Level          | High                                                                                                                                   |
| Test Design Method  | Requirement-Based / Decision Table                                                                                                     |
| Test Type           | Functional / Negative                                                                                                                  |
| Priority            | High                                                                                                                                   |

#### Preconditions

- Relay Register page is accessible.
- The test email is already registered.

#### Test Data

| Data             | Value                                     |
| ---------------- | ----------------------------------------- |
| Name             | Three ASCII space characters (U+0020 × 3) |
| Email            | existing.registered@example.com           |
| Password         | simplepass                                |
| Confirm Password | differentpass                             |

#### Steps

1. Open the Register page.
2. Enter a whitespace-only Name, an already registered Email, and non-matching Password and Confirm Password values.
3. Ensure all native browser validations pass.
4. Submit the form.

#### Expected Result

- The application displays exactly `Passwords do not match.`
- This error takes priority over the whitespace-only Name and duplicate-email conditions.
- Registration is not completed.

---

### TC-AUTH-005-05 — Whitespace-only Name takes priority over duplicate-email error when passwords match

| Field               | Value                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-005-05                                                                                                                         |
| Title               | Whitespace-only Name takes priority over duplicate-email error when passwords match                                                    |
| Related Scenario    | SCN-AUTH-005 [SCN-AUTH-005](../scenarios/authentication.md#scn-auth-005--registration-application-level-validation-and-error-priority) |
| Related Requirement | REQ-AUTH-009 [REQ-AUTH-009](../../docs/requirements/authentication.md#req-auth-009--registration-application-level-validation-errors)  |
| Related Risk        | RSK-007, RSK-014 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                   |
| Risk Level          | High                                                                                                                                   |
| Test Design Method  | Requirement-Based / Decision Table                                                                                                     |
| Test Type           | Functional / Negative                                                                                                                  |
| Priority            | High                                                                                                                                   |

#### Preconditions

- Relay Register page is accessible.
- The test email is already registered.

#### Test Data

| Data             | Value                                     |
| ---------------- | ----------------------------------------- |
| Name             | Three ASCII space characters (U+0020 × 3) |
| Email            | existing.registered@example.com           |
| Password         | simplepass                                |
| Confirm Password | simplepass                                |

#### Steps

1. Open the Register page.
2. Enter a whitespace-only Name, an already registered Email, and matching valid passwords.
3. Ensure all native browser validations pass.
4. Submit the form.

#### Expected Result

- The application displays exactly `Invalid request data.`
- This error takes priority over the duplicate-email error.
- Registration is not completed.

---

### TC-AUTH-006-01 — Registered user logs in successfully

| Field               | Value                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-006-01                                                                                        |
| Title               | Registered user logs in successfully                                                                  |
| Related Scenario    | SCN-AUTH-006 [SCN-AUTH-006](../scenarios/authentication.md#scn-auth-006--valid-user-login)            |
| Related Requirement | REQ-AUTH-002 [REQ-AUTH-002](../../docs/requirements/authentication.md#req-auth-002--successful-login) |
| Related Risk        | RSK-003 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                           |
| Risk Level          | High                                                                                                  |
| Test Design Method  | Requirement-Based                                                                                     |
| Test Type           | Functional / Positive                                                                                 |
| Priority            | High                                                                                                  |

#### Preconditions

- Relay application is accessible.
- The QA database is available.
- The QA application and cleanup database roles are configured.
- The registered test account is prepared using Prisma upsert before UI execution.

#### Test Data

| Data     | Value                       |
| -------- | --------------------------- |
| Email    | registered.user@example.com |
| Password | password123                 |

#### Steps

1. Open Relay Application webpage.
2. Enter the registered user credentials.
3. Submit the form.
4. Observe the resulting route and user feedback.

#### Expected Result

- Authentication succeeds.
- The application redirects to `/chat`.
- No success message is displayed and no additional redirect occurs after reaching `/chat`.

---

### TC-AUTH-007-01 — Login rejects an unregistered email with the generic authentication error

| Field               | Value                                                                                                          |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-007-01                                                                                                 |
| Title               | Login rejects an unregistered email with the generic authentication error                                      |
| Related Scenario    | SCN-AUTH-007 [SCN-AUTH-007](../scenarios/authentication.md#scn-auth-007--invalid-user-login)                   |
| Related Requirement | REQ-AUTH-007 [REQ-AUTH-007](../../docs/requirements/authentication.md#req-auth-007--invalid-login-credentials) |
| Related Risk        | RSK-003, RSK-009 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                           |
| Risk Level          | High                                                                                                           |
| Test Design Method  | Requirement-Based                                                                                              |
| Test Type           | Functional / Negative                                                                                          |
| Priority            | High                                                                                                           |

#### Preconditions

- Relay Login page is accessible.
- The email address `unregistered.user@example.com` is not registered.
- The QA database is available.
- The precondition was verified using Prisma before UI execution.

#### Test Data

| Data     | Value                         |
| -------- | ----------------------------- |
| Email    | unregistered.user@example.com |
| Password | password123                   |

#### Steps

1. Open the Relay Application page.
2. Enter the email and a password as published by test data.
3. Submit the form.

#### Expected Result

- The application displays exactly `Invalid email or password.`
- The user remains on the Login page.
- No authenticated access is granted.
- The message does not reveal whether the email address is registered.

---

### TC-AUTH-007-02 — Login rejects an incorrect password with the generic authentication error

| Field               | Value                                                                                                          |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-007-02                                                                                                 |
| Title               | Login rejects an incorrect password with the generic authentication error                                      |
| Related Scenario    | SCN-AUTH-007 [SCN-AUTH-007](../scenarios/authentication.md#scn-auth-007--invalid-user-login)                   |
| Related Requirement | REQ-AUTH-007 [REQ-AUTH-007](../../docs/requirements/authentication.md#req-auth-007--invalid-login-credentials) |
| Related Risk        | RSK-003, RSK-009 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                           |
| Risk Level          | High                                                                                                           |
| Test Design Method  | Requirement-Based                                                                                              |
| Test Type           | Functional / Negative                                                                                          |
| Priority            | High                                                                                                           |

#### Preconditions

- Relay Login page is accessible.
- The registered test account `registered.user@example.com` exists.
- The valid password for the registered account is known.
- The QA database is available.
- The QA application and cleanup database roles are configured.
- The registered test account is prepared using Prisma upsert before UI execution.

#### Test Data

| Data     | Value                       |
| -------- | --------------------------- |
| Email    | registered.user@example.com |
| Password | password124                 |

#### Steps

1. Open the Relay Application page.
2. Enter the email and a password as published by test data.
3. Submit the form.

#### Expected Result

- The application displays exactly `Invalid email or password.`
- The user remains on the Login page.
- No authenticated access is granted.
- The message does not reveal whether the email address is registered.

---

### TC-AUTH-008-01 — Invalid credential conditions produce identical login error feedback

| Field               | Value                                                                                                          |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-008-01                                                                                                 |
| Title               | Invalid credential conditions produce identical login error feedback                                           |
| Related Scenario    | SCN-AUTH-008 [SCN-AUTH-008](../scenarios/authentication.md#scn-auth-008--consistent-login-error-feedback)      |
| Related Requirement | REQ-AUTH-007 [REQ-AUTH-007](../../docs/requirements/authentication.md#req-auth-007--invalid-login-credentials) |
| Related Risk        | RSK-003, RSK-009 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                           |
| Risk Level          | High                                                                                                           |
| Test Design Method  | Requirement-Based                                                                                              |
| Test Type           | Functional / Negative                                                                                          |
| Priority            | High                                                                                                           |

#### Preconditions

- Relay Login page is accessible.
- The email address `unregistered.user@example.com` is not registered.
- A registered account `registered.user@example.com` is available with known valid credentials.
- The QA database is available.
- The QA application and cleanup database roles are configured.

#### Test Data

| Data      | Value                                                                         |
| --------- | ----------------------------------------------------------------------------- |
| Attempt A | Unregistered email : `unregistered.user@example.com` password : `password123` |
| Attempt B | Registered email : `registered.user@example.com` password : `password124`     |

#### Steps

1. Open the Relay Application page.
2. Submit a login attempt using an unregistered email.
3. Record the displayed application error.
4. Submit a second login attempt using a registered email and incorrect password.
5. Compare the displayed errors.

#### Expected Result

- Both attempts display exactly `Invalid email or password.`
- Neither message reveals whether the email address is registered.
- Both attempts remain on the Login page.

---

### TC-AUTH-008-02 — Successful login clears a previous authentication error

| Field               | Value                                                                                                          |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-008-02                                                                                                 |
| Title               | Successful login clears a previous authentication error                                                        |
| Related Scenario    | SCN-AUTH-008 [SCN-AUTH-008](../scenarios/authentication.md#scn-auth-008--consistent-login-error-feedback)      |
| Related Requirement | REQ-AUTH-007 [REQ-AUTH-007](../../docs/requirements/authentication.md#req-auth-007--invalid-login-credentials) |
| Related Risk        | RSK-003, RSK-009 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                           |
| Risk Level          | High                                                                                                           |
| Test Design Method  | Requirement-Based                                                                                              |
| Test Type           | Functional / State Transition                                                                                  |
| Priority            | High                                                                                                           |

#### Preconditions

- Relay Login page is accessible.
- A registered user exists and valid credentials are available.

#### Test Data

| Data            | Value                                                                     |
| --------------- | ------------------------------------------------------------------------- |
| Invalid attempt | Registered email : `registered.user@example.com` password : `password124` |
| Valid attempt   | Registered email : `registered.user@example.com` password : `password123` |

#### Steps

1. Open the Relay Application page.
2. Submit a login attempt with an incorrect password.
3. Verify the generic authentication error appears.
4. Replace the credentials with the valid credentials.
5. Submit the form again.

#### Expected Result

- The first login attempt displays exactly `Invalid email or password.`
- The user can submit valid credentials immediately after the failed attempt without refreshing or reopening the Login page.
- The application successfully authenticates the user.
- The application redirects the user to `/chat`.

---

### TC-AUTH-009-01 — Logout invalidates the current authenticated session

| Field               | Value                                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-009-01                                                                                                      |
| Title               | Logout invalidates the current authenticated session                                                                |
| Related Scenario    | SCN-AUTH-009 [SCN-AUTH-009](../scenarios/authentication.md#scn-auth-009--logout-and-cross-tab-session-invalidation) |
| Related Requirement | REQ-AUTH-003 [REQ-AUTH-003](../../docs/requirements/authentication.md#req-auth-003--logout)                         |
| Related Risk        | RSK-006 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                         |
| Risk Level          | High                                                                                                                |
| Test Design Method  | Requirement-Based                                                                                                   |
| Test Type           | Session / Positive                                                                                                  |
| Priority            | High                                                                                                                |

#### Preconditions

- A registered user is authenticated in Relay.

#### Test Data

| Data    | Value                   |
| ------- | ----------------------- |
| Account | Registered test account |

#### Steps

1. Open an authenticated Relay page.
2. Initiate logout from the current tab.
3. Observe the resulting route.
4. Attempt to access an authenticated feature from the logged-out tab.

#### Expected Result

- The current tab redirects to `/login`.
- The authenticated state is invalidated.
- The user cannot perform authenticated operations without logging in again.

---

### TC-AUTH-009-02 — Logout in one tab invalidates authenticated operations in another tab

| Field               | Value                                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-009-02                                                                                                      |
| Title               | Logout in one tab invalidates authenticated operations in another tab                                               |
| Related Scenario    | SCN-AUTH-009 [SCN-AUTH-009](../scenarios/authentication.md#scn-auth-009--logout-and-cross-tab-session-invalidation) |
| Related Requirement | REQ-AUTH-003 [REQ-AUTH-003](../../docs/requirements/authentication.md#req-auth-003--logout)                         |
| Related Risk        | RSK-006 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                         |
| Risk Level          | High                                                                                                                |
| Test Design Method  | Requirement-Based / Risk-Based                                                                                      |
| Test Type           | Session / Negative                                                                                                  |
| Priority            | High                                                                                                                |

#### Preconditions

- The same user is authenticated in two Relay tabs within one browser profile.
- A protected action is available in the second tab.

#### Test Data

| Data             | Value                                                                                |
| ---------------- | ------------------------------------------------------------------------------------ |
| Browser profile  | Same profile for both tabs                                                           |
| Protected action | Refresh the page or perform an authenticated action such as selecting a conversation |

#### Steps

1. Keep the authenticated page open in Tab A and Tab B.
2. Log out in Tab A.
3. Do not require Tab B to redirect immediately.
4. In Tab B, perform a protected action or refresh the page.

#### Expected Result

- Tab A redirects to `/login` after logout.
- Tab B may continue displaying its current page until an authentication-requiring action occurs.
- When the protected action or refresh occurs in Tab B, the user is redirected to `/login`.
- No authenticated operation succeeds after invalidation.

---

### TC-AUTH-010-01 — Browser Back does not restore authenticated access after logout

| Field               | Value                                                                                                                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-010-01                                                                                                                                                                                     |
| Title               | Browser Back does not restore authenticated access after logout                                                                                                                                    |
| Related Scenario    | SCN-AUTH-010 [SCN-AUTH-010](../scenarios/authentication.md#scn-auth-010--protected-access-after-logout-and-browser-back)                                                                           |
| Related Requirement | REQ-AUTH-003 [REQ-AUTH-003](../../docs/requirements/authentication.md#req-auth-003--logout), REQ-AUTH-004 [REQ-AUTH-004](../../docs/requirements/authentication.md#req-auth-004--protected-access) |
| Related Risk        | RSK-006 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                                                                                        |
| Risk Level          | High                                                                                                                                                                                               |
| Test Design Method  | Requirement-Based / Risk-Based                                                                                                                                                                     |
| Test Type           | Session / Negative                                                                                                                                                                                 |
| Priority            | High                                                                                                                                                                                               |

#### Preconditions

- A registered user is authenticated and has visited a protected page.

#### Test Data

| Data           | Value                                  |
| -------------- | -------------------------------------- |
| Protected page | A protected Relay page such as `/chat` |

#### Steps

1. Log out from the authenticated session.
2. Use the browser Back button to return toward the previously visited protected page.
3. Attempt to use protected functionality if the page is displayed from browser history.

#### Expected Result

- The application redirects the user to `/login`.
- Browser history does not restore authenticated state or grant access to protected functionality.
- The user must log in again to regain access.

---

### TC-AUTH-010-02 — Protected page remains inaccessible after logout

| Field               | Value                                                                                                                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-010-02                                                                                                                                                                                     |
| Title               | Protected page remains inaccessible after logout                                                                                                                                                   |
| Related Scenario    | SCN-AUTH-010 [SCN-AUTH-010](../scenarios/authentication.md#scn-auth-010--protected-access-after-logout-and-browser-back)                                                                           |
| Related Requirement | REQ-AUTH-003 [REQ-AUTH-003](../../docs/requirements/authentication.md#req-auth-003--logout), REQ-AUTH-004 [REQ-AUTH-004](../../docs/requirements/authentication.md#req-auth-004--protected-access) |
| Related Risk        | RSK-006 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                                                                                        |
| Risk Level          | High                                                                                                                                                                                               |
| Test Design Method  | Requirement-Based / Risk-Based                                                                                                                                                                     |
| Test Type           | Security / Negative                                                                                                                                                                                |
| Priority            | High                                                                                                                                                                                               |

#### Preconditions

- A registered user has logged in and then logged out.

#### Test Data

| Data          | Value                            |
| ------------- | -------------------------------- |
| Protected URL | A known protected Relay page URL |

#### Steps

1. After logout, enter the protected page URL directly in the browser address bar.
2. Navigate to the URL.

#### Expected Result

- The application denies protected access and redirects to `/login`.
- The previous session is not restored.

---

### TC-AUTH-011-01 — Unauthenticated user is redirected from a protected page to Login

| Field               | Value                                                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Test Case ID        | TC-AUTH-011-01                                                                                                                       |
| Title               | Unauthenticated user is redirected from a protected page to Login                                                                    |
| Related Scenario    | SCN-AUTH-011 [SCN-AUTH-011](../scenarios/authentication.md#scn-auth-011--protected-page-and-api-access-without-valid-authentication) |
| Related Requirement | REQ-AUTH-004 [REQ-AUTH-004](../../docs/requirements/authentication.md#req-auth-004--protected-access)                                |
| Related Risk        | RSK-006 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                          |
| Risk Level          | High                                                                                                                                 |
| Test Design Method  | Requirement-Based / Risk-Based                                                                                                       |
| Test Type           | Security / Negative                                                                                                                  |
| Priority            | High                                                                                                                                 |

#### Preconditions

- Relay is accessible.
- The browser has no valid authenticated session for Relay.

#### Test Data

| Data          | Value                            |
| ------------- | -------------------------------- |
| Protected URL | A known protected Relay page URL |

#### Steps

1. Open a new browser context or clear the existing Relay authenticated state.
2. Navigate directly to the protected URL.

#### Expected Result

- The application denies access to the protected page.
- The user is redirected to `/login`.

---

### TC-AUTH-011-02 — Protected API rejects a request without an authentication token

| Field               | Value                                                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Test Case ID        | TC-AUTH-011-02                                                                                                                       |
| Title               | Protected API rejects a request without an authentication token                                                                      |
| Related Scenario    | SCN-AUTH-011 [SCN-AUTH-011](../scenarios/authentication.md#scn-auth-011--protected-page-and-api-access-without-valid-authentication) |
| Related Requirement | REQ-AUTH-004 [REQ-AUTH-004](../../docs/requirements/authentication.md#req-auth-004--protected-access)                                |
| Related Risk        | RSK-006 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                          |
| Risk Level          | High                                                                                                                                 |
| Test Design Method  | Requirement-Based / Risk-Based                                                                                                       |
| Test Type           | API / Security / Negative                                                                                                            |
| Priority            | High                                                                                                                                 |

#### Preconditions

- A protected API endpoint relevant to the authentication requirements is identified.
- The request can be sent without browser-managed authentication credentials.

#### Test Data

| Data                 | Value                          |
| -------------------- | ------------------------------ |
| Authentication token | Not provided                   |
| API endpoint         | A protected Relay API endpoint |

#### Steps

1. Send a request to the protected API endpoint without an authentication token.
2. Inspect the response and whether protected data or functionality is returned.

#### Expected Result

- The API rejects the unauthenticated request.
- Protected data or functionality is not granted.
- The exact HTTP status code is not specified by the current requirement and must not be invented as an acceptance criterion.

---

### TC-AUTH-011-03 — Protected access rejects an invalid authentication token

| Field               | Value                                                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Test Case ID        | TC-AUTH-011-03                                                                                                                       |
| Title               | Protected access rejects an invalid authentication token                                                                             |
| Related Scenario    | SCN-AUTH-011 [SCN-AUTH-011](../scenarios/authentication.md#scn-auth-011--protected-page-and-api-access-without-valid-authentication) |
| Related Requirement | REQ-AUTH-004 [REQ-AUTH-004](../../docs/requirements/authentication.md#req-auth-004--protected-access)                                |
| Related Risk        | RSK-006 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                          |
| Risk Level          | High                                                                                                                                 |
| Test Design Method  | Requirement-Based / Risk-Based                                                                                                       |
| Test Type           | API / Security / Negative                                                                                                            |
| Priority            | High                                                                                                                                 |

#### Preconditions

- A protected API endpoint or protected page is identified.

#### Test Data

| Data                 | Value                                |
| -------------------- | ------------------------------------ |
| Authentication token | Malformed or otherwise invalid token |

#### Steps

1. Send a protected API request using the invalid token, or navigate to the protected page with the invalid token in the application's supported authentication mechanism.
2. Inspect the response and access outcome.

#### Expected Result

- The invalid token does not grant access to protected data or functionality.
- If invalid-token detection occurs during protected-page access, the application denies access and redirects to `/login`.
- The exact API status code is not specified by the current requirement.

---

### TC-AUTH-011-04 — Invalidated authentication token does not restore access after logout

| Field               | Value                                                                                                                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-011-04                                                                                                                                                                                     |
| Title               | Invalidated authentication token does not restore access after logout                                                                                                                              |
| Related Scenario    | SCN-AUTH-011 [SCN-AUTH-011](../scenarios/authentication.md#scn-auth-011--protected-page-and-api-access-without-valid-authentication)                                                               |
| Related Requirement | REQ-AUTH-003 [REQ-AUTH-003](../../docs/requirements/authentication.md#req-auth-003--logout), REQ-AUTH-004 [REQ-AUTH-004](../../docs/requirements/authentication.md#req-auth-004--protected-access) |
| Related Risk        | RSK-006 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                                                                                        |
| Risk Level          | High                                                                                                                                                                                               |
| Test Design Method  | Requirement-Based / Risk-Based                                                                                                                                                                     |
| Test Type           | API / UI / Security / Negative                                                                                                                                                                     |
| Priority            | High                                                                                                                                                                                               |

#### Preconditions

- A registered QA user account is available.
- The user can successfully authenticate through Relay.
- A protected API endpoint is available.
- The test can securely retain the original authentication token before logout and restore it for a replay attempt without exposing the token in logs or evidence.
- The original token remains unexpired during the test.

#### Test Data

| Data                 | Value                                       |
| -------------------- | ------------------------------------------- |
| User account         | Registered QA user                          |
| Authentication token | Original token captured before logout       |
| Token status         | Valid and unexpired before and after logout |
| Logout mechanism     | Relay Logout button                         |
| Protected API        | `GET /api/conversations`                    |

#### Steps

1. Open the Relay application.
2. Log in using valid QA user credentials.
3. Verify that the login succeeds and the user reaches `/chat`.
4. Securely capture and retain the original `auth_token` cookie value from the authenticated browser context without exposing it in logs or evidence.
5. Verify that the captured token is still valid and unexpired.
6. Initiate logout using the Logout button in Relay.
7. Verify that the application redirects the user to `/login` and the `auth_token` cookie is removed from the browser context.
8. Restore the exact original pre-logout token as the `auth_token` cookie in the same browser context, keeping the cookie valid and preserving its original token value.
9. Verify that the retained original token is still unexpired at the time of the replay request.
10. Send a same-origin `GET /api/conversations` request using the browser page context.
11. Verify that the request includes the original pre-logout token without exposing its value in logs or evidence.
12. Observe the HTTP response status and response body.
13. Navigate to `/chat` using the same browser context while retaining the restored original pre-logout token.
14. Observe whether the protected page grants access or redirects the user to `/login`.

#### Expected Result

- The user successfully logs out through Relay.
- The application redirects the user to `/login`.
- The original `auth_token` cookie is removed during logout.
- The exact original pre-logout token is restored for the replay attempt.
- The replay request reaches the protected API with the original token.
- The invalidated token does not grant access to protected conversation data or functionality.
- The API denies the request and does not return protected conversation data.
- The user must authenticate again to regain access to protected functionality.
- The original pre-logout token does not grant access to the protected `/chat` page.
- The application denies access and redirects the user to `/login`.

---

### TC-AUTH-012-01 — Authenticated state persists after page refresh while the session is valid

| Field               | Value                                                                                                                                                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-012-01                                                                                                                                                                                                               |
| Title               | Authenticated state persists after page refresh while the session is valid                                                                                                                                                   |
| Related Scenario    | SCN-AUTH-012 [SCN-AUTH-012](../scenarios/authentication.md#scn-auth-012--authentication-state-persistence-across-tabs-and-refresh)                                                                                           |
| Related Requirement | REQ-AUTH-002 [REQ-AUTH-002](../../docs/requirements/authentication.md#req-auth-002--successful-login), REQ-AUTH-005 [REQ-AUTH-005](../../docs/requirements/authentication.md#req-auth-005--authentication-state-persistence) |
| Related Risk        | RSK-006 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                                                                                                                  |
| Risk Level          | High                                                                                                                                                                                                                         |
| Test Design Method  | Requirement-Based                                                                                                                                                                                                            |
| Test Type           | Session / State Persistence                                                                                                                                                                                                  |
| Priority            | High                                                                                                                                                                                                                         |

#### Preconditions

- A registered user is logged in and the session is valid.

#### Test Data

| Data           | Value   |
| -------------- | ------- |
| Protected page | `/chat` |

#### Steps

1. Log in with valid credentials.
2. Verify the user reaches `/chat`.
3. Refresh the page.
4. Observe the route and protected access after the page reloads.

#### Expected Result

- The user remains authenticated while the session remains valid.
- The user can access the protected page after refresh without logging in again.

---

### TC-AUTH-012-02 — Existing and newly opened tabs recognize a valid session in the same browser profile

| Field               | Value                                                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-012-02                                                                                                                     |
| Title               | Existing and newly opened tabs recognize a valid session in the same browser profile                                               |
| Related Scenario    | SCN-AUTH-012 [SCN-AUTH-012](../scenarios/authentication.md#scn-auth-012--authentication-state-persistence-across-tabs-and-refresh) |
| Related Requirement | REQ-AUTH-005 [REQ-AUTH-005](../../docs/requirements/authentication.md#req-auth-005--authentication-state-persistence)              |
| Related Risk        | RSK-006 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                        |
| Risk Level          | High                                                                                                                               |
| Test Design Method  | Requirement-Based                                                                                                                  |
| Test Type           | Session / State Persistence                                                                                                        |
| Priority            | High                                                                                                                               |

#### Preconditions

- A registered user is authenticated in one Relay tab.
- The session remains valid.

#### Test Data

| Data            | Value                             |
| --------------- | --------------------------------- |
| Browser profile | Same browser profile for all tabs |

#### Steps

1. With the user logged in, open another Relay tab in the same browser profile.
2. Navigate to a protected page in the new tab.
3. Return to the original tab and refresh it.

#### Expected Result

- The new tab recognizes the existing valid authenticated session without requiring another login.
- The original tab remains authenticated after refresh.
- These behaviors apply only while the session remains valid and has not been invalidated.

---

### TC-AUTH-012-03 — Protected API accepts a valid authentication token

| Field               | Value                                                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-012-03                                                                                                                     |
| Title               | Protected API accepts a valid authentication token                                                                                 |
| Related Scenario    | SCN-AUTH-012 [SCN-AUTH-012](../scenarios/authentication.md#scn-auth-012--authentication-state-persistence-across-tabs-and-refresh) |
| Related Requirement | REQ-AUTH-005 [REQ-AUTH-005](../../docs/requirements/authentication.md#req-auth-005--authentication-state-persistence)              |
| Related Risk        | RSK-006 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                                                        |
| Risk Level          | High                                                                                                                               |
| Test Design Method  | Requirement-Based                                                                                                                  |
| Test Type           | API / Authentication / Positive                                                                                                    |
| Priority            | High                                                                                                                               |

#### Preconditions

- A registered QA user account is available.
- The Relay application is accessible.
- The user can successfully log in and establish a valid authenticated session.

#### Test Data

| Data             | Value                                             |
| ---------------- | ------------------------------------------------- |
| User account     | Valid registered QA user                          |
| Protected API    | `GET /api/auth/me`                                |
| Authentication   | Valid authenticated session                       |
| Expected User ID | User ID associated with the registered QA account |

#### Steps

1. Open the Relay application.
2. Log in using valid QA user credentials.
3. Verify that the login succeeds and the user reaches `/chat`.
4. Using the same authenticated browser context, send a `GET` request to `/api/auth/me`.
5. Observe the HTTP response status and response body.
6. Verify that the returned user ID corresponds to the authenticated QA user.

#### Expected Result

- The browser sends the existing authentication cookie with the API request.
- The server accepts and successfully verifies the valid authentication token.
- The API returns HTTP status `200 OK`.
- The response body contains `success: true`.
- The response body contains `data.userId` corresponding to the authenticated QA user.
- The API does not expose the authentication token or user credentials in its response.

---

### TC-AUTH-013-01 — Authentication token remains valid before the 24-hour expiration point

| Field               | Value                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-013-01                                                                                            |
| Title               | Authentication token remains valid before the 24-hour expiration point                                    |
| Related Scenario    | SCN-AUTH-013 [SCN-AUTH-013](../scenarios/authentication.md#scn-auth-013--authentication-token-expiration) |
| Related Requirement | REQ-AUTH-010 [REQ-AUTH-010](../../docs/requirements/authentication.md#req-auth-010--session-expiration)   |
| Related Risk        | RSK-006 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                               |
| Risk Level          | High                                                                                                      |
| Test Design Method  | Requirement-Based / Boundary Value Analysis                                                               |
| Test Type           | API / Session / Boundary / Positive                                                                       |
| Priority            | High                                                                                                      |

#### Preconditions

- A registered QA user account is available.
- The Relay application is accessible.
- The test environment uses the same test-only JWT secret configured for the Relay application.
- A controlled JWT fixture can be generated and injected into the Playwright browser context.

#### Test Data

| Data                     | Value                                               |
| ------------------------ | --------------------------------------------------- |
| User account             | Registered QA user                                  |
| Protected API            | `GET /api/auth/me`                                  |
| Token issued-at (`iat`)  | Controlled timestamp representing the login time    |
| Token expiration (`exp`) | `iat + 86400` seconds                               |
| Remaining token lifetime | 60 seconds at the time of the API request           |
| Authentication cookie    | `auth_token`, retained for the duration of the test |
| Time reference           | Server time at the API request                      |

#### Steps

1. Retrieve the user ID of the registered QA account.
2. Generate a signed JWT fixture using the QA test secret and the QA user's ID as the token subject.
3. Set the token's `iat` and `exp` claims so that the token has exactly 60 seconds remaining before its 24-hour expiration point.
4. Add the generated token to the Playwright browser context as the `auth_token` cookie. Configure the cookie expiry to remain valid for the test duration so that browser cookie expiration does not interfere with JWT expiration verification.
5. Send a `GET` request to `/api/auth/me` using the same browser context.
6. Observe the HTTP response status and response body.

#### Expected Result

- The authentication cookie is sent with the API request.
- The server successfully verifies the JWT.
- The API returns HTTP status `200 OK`.
- The response body contains `success: true`.
- The response body contains `data.userId` corresponding to the registered QA user.
- The token remains accepted because the request occurs before its documented 24-hour expiration point.

---

### TC-AUTH-013-02 — Expired token is rejected at or after the 24-hour expiration point

| Field               | Value                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-013-02                                                                                            |
| Title               | Expired token is rejected at or after the 24-hour expiration point                                        |
| Related Scenario    | SCN-AUTH-013 [SCN-AUTH-013](../scenarios/authentication.md#scn-auth-013--authentication-token-expiration) |
| Related Requirement | REQ-AUTH-010 [REQ-AUTH-010](../../docs/requirements/authentication.md#req-auth-010--session-expiration)   |
| Related Risk        | RSK-006 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                               |
| Risk Level          | High                                                                                                      |
| Test Design Method  | Requirement-Based / Boundary Value Analysis                                                               |
| Test Type           | API / Session / Boundary / Negative                                                                       |
| Priority            | High                                                                                                      |

#### Preconditions

- A registered QA user account is available.
- The Relay application is accessible.
- The test environment uses the same test-only JWT secret configured for the Relay application.
- A controlled expired JWT fixture can be generated and injected into the Playwright browser context.

#### Test Data

| Data                     | Value                                               |
| ------------------------ | --------------------------------------------------- |
| User account             | Registered QA user                                  |
| Protected API            | `GET /api/auth/me`                                  |
| Token issued-at (`iat`)  | Controlled timestamp representing the login time    |
| Token expiration (`exp`) | `iat + 86400` seconds                               |
| Expiration status        | 60 seconds past the JWT expiration point            |
| Authentication cookie    | `auth_token`, retained for the duration of the test |
| Time reference           | Server time at the API request                      |

#### Steps

1. Retrieve the user ID of the registered QA account.
2. Generate a signed JWT fixture using the QA test secret and the QA user's ID as the token subject.
3. Set the token's `iat` and `exp` claims so that the token expired 60 seconds before the API request.
4. Add the generated token to the Playwright browser context as the `auth_token` cookie. Configure the cookie expiry to remain valid for the test duration so that the browser does not discard the cookie before the server verifies the expired JWT.
5. Send a `GET` request to `/api/auth/me` using the same browser context.
6. Observe the HTTP response status and response body.

#### Expected Result

- The authentication cookie is sent with the API request.
- The server rejects the JWT because its expiration point has passed.
- The API returns HTTP status `401 Unauthorized`.
- The response body contains `error.code: "UNAUTHORIZED"`.
- The response body does not contain `data.userId`.
- The expired token does not grant access to protected functionality.

---

### TC-AUTH-013-03 — Active session expiration redirects the user to Login and blocks protected operations

| Field               | Value                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-013-03                                                                                            |
| Title               | Active session expiration redirects the user to Login and blocks protected operations                     |
| Related Scenario    | SCN-AUTH-013 [SCN-AUTH-013](../scenarios/authentication.md#scn-auth-013--authentication-token-expiration) |
| Related Requirement | REQ-AUTH-010 [REQ-AUTH-010](../../docs/requirements/authentication.md#req-auth-010--session-expiration)   |
| Related Risk        | RSK-006 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                               |
| Risk Level          | High                                                                                                      |
| Test Design Method  | Requirement-Based / Risk-Based                                                                            |
| Test Type           | Session / Negative                                                                                        |
| Priority            | High                                                                                                      |

#### Preconditions

- A registered QA user account is available.
- The user can successfully authenticate and access the Relay chat page.
- A valid QA JWT can be generated and subsequently replaced with a signed expired JWT using the test-only JWT secret.
- The expired JWT can be injected into the existing Playwright browser context without the browser discarding the authentication cookie.
- A test conversation is available for attempting a protected messaging operation.

#### Test Data

| Data                  | Value                                                    |
| --------------------- | -------------------------------------------------------- |
| User account          | Registered QA user                                       |
| Protected page        | `/chat`                                                  |
| Protected operation   | Send a message through the conversation message composer |
| Protected API         | `POST /api/conversations/{conversationId}/messages`      |
| Authentication cookie | `auth_token`                                             |
| JWT expiration        | Already expired at the time of the protected API request |
| Cookie expiration     | Kept valid during the test                               |
| Message content       | Unique test message                                      |

#### Steps

1. Open the Relay application.
2. Log in using valid QA user credentials.
3. Open `/chat` and verify that the authenticated chat interface is displayed.
4. Ensure that a test conversation is selected and the message composer is available.
5. Replace the existing `auth_token` cookie in the same browser context with a signed JWT fixture whose expiration timestamp has already passed.
6. Keep the browser cookie valid so that the expired JWT is still sent with subsequent requests.
7. Enter a unique test message in the message composer.
8. Submit the message.
9. Verify that the protected API request includes the `auth_token` cookie without exposing its value in test logs or evidence.
10. Observe the protected API response, browser URL, and application behavior.
11. Verify through the existing QA database verification mechanism that the unique test message was not persisted.

#### Expected Result

- The expired authentication token is sent to the protected API.
- The server rejects the expired token and returns HTTP status `401 Unauthorized`.
- The protected messaging operation is denied.
- The message is not successfully sent or persisted.
- The application invalidates the authenticated state.
- The application redirects the user to `/login`.
- The user can no longer access protected functionality using the expired session.

---

### TC-AUTH-013-04 — Session expiration applies across tabs and requires login again

| Field               | Value                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-013-04                                                                                            |
| Title               | Session expiration applies across tabs and requires login again                                           |
| Related Scenario    | SCN-AUTH-013 [SCN-AUTH-013](../scenarios/authentication.md#scn-auth-013--authentication-token-expiration) |
| Related Requirement | REQ-AUTH-010 [REQ-AUTH-010](../../docs/requirements/authentication.md#req-auth-010--session-expiration)   |
| Related Risk        | RSK-006 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                               |
| Risk Level          | High                                                                                                      |
| Test Design Method  | Requirement-Based / Risk-Based                                                                            |
| Test Type           | Session / Cross-tab / State Transition                                                                    |
| Priority            | High                                                                                                      |

#### Preconditions

- A registered QA user account with valid login credentials is available.
- The Relay application is accessible.
- Two browser tabs can be opened within the same Playwright browser context.
- The test environment uses the same test-only JWT secret configured for the Relay application.
- A signed expired JWT fixture can be generated and injected into the shared browser context.
- The expired JWT can be retained in the browser cookie storage during the test.

#### Test Data

| Data                  | Value                                 |
| --------------------- | ------------------------------------- |
| User account          | Registered QA user                    |
| Browser context       | Same browser context for both tabs    |
| Tab 1                 | Authenticated Relay session           |
| Tab 2                 | Authenticated Relay session           |
| Authentication cookie | `auth_token`                          |
| JWT expiration        | 60 seconds before the API request     |
| Cookie expiration     | Kept valid during the test            |
| Protected API         | `GET /api/conversations`              |
| Re-authentication     | Valid credentials of the same QA user |

#### Steps

1. Open the Relay application in Tab 1.
2. Log in using valid QA user credentials.
3. Verify that Tab 1 successfully accesses `/chat`.
4. Open `/chat` in Tab 2 using the same Playwright browser context.
5. Verify that Tab 2 also displays the authenticated chat interface.
6. Generate a signed expired JWT fixture using the QA test secret and the QA user's ID as the token subject.
7. Set the JWT expiration timestamp so that it has already passed by at least 60 seconds at the time of the protected API requests.
8. Replace the existing `auth_token` cookie in the shared browser context with the expired JWT. Keep the browser cookie valid so that it is not discarded before the server verifies the JWT.
9. From Tab 1, execute a same-origin `GET /api/conversations` request using the browser page context.
10. From Tab 2, execute a same-origin `GET /api/conversations` request using the browser page context.
11. Verify that both requests include the expired `auth_token` cookie without exposing its value in test logs or evidence.
12. Observe the HTTP response status and response body from both requests.
13. Navigate Tab 1 to `/login`.
14. Log in again using the same QA user credentials.
15. Verify that the new login succeeds and Tab 1 returns to `/chat`.
16. From Tab 1, execute a same-origin `GET /api/conversations` request using the browser page context.
17. From Tab 2, execute a same-origin `GET /api/conversations` request using the browser page context.
18. Observe and compare the responses from both tabs.
19. Reload `/chat` in Tab 2 after re-authentication and observe whether the protected page loads successfully.

#### Expected Result

- Both tabs initially share the same authenticated browser session.
- The expired authentication token is sent with the protected API request from both tabs.
- The server rejects the expired token in both tabs.
- Both protected API requests return HTTP status `401 Unauthorized`.
- Both responses contain `error.code: "UNAUTHORIZED"`.
- Neither tab receives protected conversation data while using the expired session.
- The user can successfully log in again using valid credentials.
- The login process establishes a new authenticated session by setting a renewed `auth_token` cookie.
- The protected API returns HTTP status `200 OK` when requested from Tab 1 after re-authentication.
- The protected API also returns HTTP status `200 OK` when requested from Tab 2 after re-authentication.
- Both tabs can access protected functionality again using the renewed authenticated session.
- Tab 2 successfully reloads `/chat` after re-authentication using the renewed shared session.

---

## 5. Scenario-to-Test Case Traceability

This table maps each approved authentication scenario to the test cases designed to verify it. Requirement and risk IDs are included to make the coverage relationship reviewable without creating a separate risk-to-test-case traceability section.

| Scenario ID  | Related Requirement ID(s)  | Related Risk ID(s) | Test Case ID(s)                                                                                |
| ------------ | -------------------------- | ------------------ | ---------------------------------------------------------------------------------------------- |
| SCN-AUTH-001 | REQ-AUTH-001               | RSK-007            | TC-AUTH-001-01                                                                                 |
| SCN-AUTH-002 | REQ-AUTH-006               | RSK-007, RSK-014   | TC-AUTH-002-01, TC-AUTH-002-02, TC-AUTH-002-03, TC-AUTH-002-04                                 |
| SCN-AUTH-003 | REQ-AUTH-006, REQ-AUTH-008 | RSK-003            | TC-AUTH-003-01, TC-AUTH-003-02, TC-AUTH-003-03                                                 |
| SCN-AUTH-004 | REQ-AUTH-006, REQ-AUTH-008 | RSK-007, RSK-014   | TC-AUTH-004-01, TC-AUTH-004-02, TC-AUTH-004-03, TC-AUTH-004-04, TC-AUTH-004-05, TC-AUTH-004-06 |
| SCN-AUTH-005 | REQ-AUTH-009               | RSK-007, RSK-014   | TC-AUTH-005-01, TC-AUTH-005-02, TC-AUTH-005-03, TC-AUTH-005-04, TC-AUTH-005-05                 |
| SCN-AUTH-006 | REQ-AUTH-002               | RSK-003            | TC-AUTH-006-01                                                                                 |
| SCN-AUTH-007 | REQ-AUTH-007               | RSK-003, RSK-009   | TC-AUTH-007-01, TC-AUTH-007-02                                                                 |
| SCN-AUTH-008 | REQ-AUTH-007               | RSK-003, RSK-009   | TC-AUTH-008-01, TC-AUTH-008-02                                                                 |
| SCN-AUTH-009 | REQ-AUTH-003               | RSK-006            | TC-AUTH-009-01, TC-AUTH-009-02                                                                 |
| SCN-AUTH-010 | REQ-AUTH-003, REQ-AUTH-004 | RSK-006            | TC-AUTH-010-01, TC-AUTH-010-02                                                                 |
| SCN-AUTH-011 | REQ-AUTH-003, REQ-AUTH-004 | RSK-006            | TC-AUTH-011-01, TC-AUTH-011-02, TC-AUTH-011-03, TC-AUTH-011-04                                 |
| SCN-AUTH-012 | REQ-AUTH-002, REQ-AUTH-005 | RSK-006            | TC-AUTH-012-01, TC-AUTH-012-02, TC-AUTH-012-03                                                 |
| SCN-AUTH-013 | REQ-AUTH-010               | RSK-006            | TC-AUTH-013-01, TC-AUTH-013-02, TC-AUTH-013-03, TC-AUTH-013-04                                 |

The test cases are designed for subsequent execution and may be refined during review. Their presence in this document does not imply that they have been executed or passed.
