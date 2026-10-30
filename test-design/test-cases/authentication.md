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

- Relay is accessible.
- The email address in the test data has not been registered.

#### Test Data

| Data             | Value                                          |
| ---------------- | ---------------------------------------------- |
| Name             | Test User                                      |
| Email            | test.user@example.com (unique, unused address) |
| Password         | testuser123                                    |
| Confirm Password | testuser123                                    |

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
| Related Scenario    | SCN-AUTH-003 [SCN-AUTH-003](../scenarios/authentication.md#scn-auth-003--login-required-field-validation)                       |
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

| Data             | Value                      |
| ---------------- | -------------------------- |
| Name             | Dino Test                  |
| Email            | dino.auth.005a@example.com |
| Password         | simplepass                 |
| Confirm Password | differentpass              |

#### Steps

1. Open the Register page.
2. Enter valid required values except that Password and Confirm Password differ.
3. Submit the form.

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

| Data             | Value                           |
| ---------------- | ------------------------------- |
| Name             | Whitespace-only value           |
| Email            | existing.registered@example.com |
| Password         | simplepass                      |
| Confirm Password | differentpass                   |

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

| Data             | Value                           |
| ---------------- | ------------------------------- |
| Name             | Whitespace-only value           |
| Email            | existing.registered@example.com |
| Password         | simplepass                      |
| Confirm Password | simplepass                      |

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

- Relay is accessible.
- A registered user exists and the valid credentials are available.

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
- The email address in the test data is not registered.

#### Test Data

| Data     | Value                         |
| -------- | ----------------------------- |
| Email    | unregistered.user@example.com |
| Password | Any non-empty password        |

#### Steps

1. Open the Login page.
2. Enter the unregistered email and a non-empty password.
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
- A registered user exists and the valid password is known.

#### Test Data

| Data     | Value                       |
| -------- | --------------------------- |
| Email    | registered.user@example.com |
| Password | Incorrect password          |

#### Steps

1. Open the Login page.
2. Enter the registered email and an incorrect non-empty password.
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
- One registered account is available.
- The comparison can be performed in separate login attempts.

#### Test Data

| Data      | Value                                              |
| --------- | -------------------------------------------------- |
| Attempt A | Unregistered email with non-empty password         |
| Attempt B | Registered email with incorrect non-empty password |

#### Steps

1. Submit a login attempt using an unregistered email.
2. Record the displayed application error.
3. Submit a second login attempt using a registered email and incorrect password.
4. Compare the displayed errors.

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

| Data            | Value                                    |
| --------------- | ---------------------------------------- |
| Invalid attempt | Registered email with incorrect password |
| Valid attempt   | Correct credentials for the same account |

#### Steps

1. Submit a login attempt with an incorrect password.
2. Verify the generic authentication error appears.
3. Replace the credentials with the valid credentials.
4. Submit the form again.

#### Expected Result

- The invalid attempt displays `Invalid email or password.`
- The successful attempt clears the previous authentication error.
- The application redirects to `/chat`.

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
| Test Type           | API / Security / Negative                                                                                                                                                                          |
| Priority            | High                                                                                                                                                                                               |

#### Preconditions

- A valid authenticated session and a protected API endpoint are available.
- The test can retain a copy of the pre-logout token or equivalent authenticated request context without exposing secrets in evidence.

#### Test Data

| Data                 | Value                                            |
| -------------------- | ------------------------------------------------ |
| Authentication token | Token captured before logout; handle as a secret |

#### Steps

1. Authenticate and retain the token for the test only.
2. Log out through Relay.
3. Send a request to the protected API using the pre-logout token.

#### Expected Result

- The invalidated token does not grant access to protected resources or functionality.
- The user must authenticate again to regain access.

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
| Test Type           | Session / Boundary                                                                                        |
| Priority            | High                                                                                                      |

#### Preconditions

- A test account can establish a new authenticated session.
- Execution timing can be recorded relative to successful login.

#### Test Data

| Data       | Value                                    |
| ---------- | ---------------------------------------- |
| Login time | Recorded successful login timestamp      |
| Check time | Before 24 hours have elapsed since login |

#### Steps

1. Log in and record the successful login time.
2. Before 24 hours have elapsed, access a protected page or perform an authenticated operation.

#### Expected Result

- The token remains valid before the documented 24-hour expiration point.
- The user remains able to access protected functionality while the session is valid.

---

### TC-AUTH-013-02 — Expired token is rejected at the 24-hour expiration point

| Field               | Value                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| Test Case ID        | TC-AUTH-013-02                                                                                            |
| Title               | Expired token is rejected at the 24-hour expiration point                                                 |
| Related Scenario    | SCN-AUTH-013 [SCN-AUTH-013](../scenarios/authentication.md#scn-auth-013--authentication-token-expiration) |
| Related Requirement | REQ-AUTH-010 [REQ-AUTH-010](../../docs/requirements/authentication.md#req-auth-010--session-expiration)   |
| Related Risk        | RSK-006 [Risk Register List](../../docs/risk-assessment.md#3-risk-register)                               |
| Risk Level          | High                                                                                                      |
| Test Design Method  | Requirement-Based / Boundary Value Analysis                                                               |
| Test Type           | Session / Boundary / Negative                                                                             |
| Priority            | High                                                                                                      |

#### Preconditions

- A test account can establish a session and the test can be performed at or after the documented expiration point.
- If a controlled test setup is used to create an expired session, it must represent the documented 24-hour expiration behavior rather than changing the expected requirement.

#### Test Data

| Data       | Value                                         |
| ---------- | --------------------------------------------- |
| Login time | Recorded successful login timestamp           |
| Check time | At or after 24 hours have elapsed since login |

#### Steps

1. Log in and record the successful login time.
2. Keep the session context available until the token reaches its documented expiration point, or use an approved test setup that represents an expired token.
3. Attempt to access a protected page or perform an authenticated operation.

#### Expected Result

- The expired token is no longer recognized as authenticated.
- The expired token does not grant access to protected pages, data, or functionality.

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

- A user is authenticated in Relay.
- The session can be observed at or after the documented 24-hour expiration point.

#### Test Data

| Data           | Value                                  |
| -------------- | -------------------------------------- |
| Protected page | A protected Relay page such as `/chat` |

#### Steps

1. Keep Relay open in an authenticated state until the session expires, or prepare an approved expired-session test context.
2. Attempt a protected action after expiration.
3. Observe the route and access outcome.

#### Expected Result

- The application invalidates the authenticated state.
- Protected functionality is blocked.
- The application redirects the user to `/login`.

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
| Test Type           | Session / State Transition / Negative                                                                     |
| Priority            | High                                                                                                      |

#### Preconditions

- The same user is authenticated in multiple Relay tabs within one browser profile.
- The shared session can be observed at or after the documented expiration point.

#### Test Data

| Data            | Value                     |
| --------------- | ------------------------- |
| Browser profile | Same profile for all tabs |
| Session state   | Expired                   |

#### Steps

1. Allow the session to reach the documented expiration point, or prepare an approved expired-session test context.
2. Attempt a protected operation in each open tab.
3. Return to the Login page and authenticate again using valid credentials.

#### Expected Result

- Tabs using the expired session no longer permit authenticated operations.
- Protected access is denied after expiration.
- The user can establish a new authenticated session by logging in again.

---

## 5. Scenario-to-Test Case Traceability

This table maps each approved authentication scenario to the test cases designed to verify it. Requirement and risk IDs are included to make the coverage relationship reviewable without creating a separate risk-to-test-case traceability section.

| Scenario ID  | Related Requirement ID(s)  | Related Risk ID(s) | Test Case ID(s)                                                                |
| ------------ | -------------------------- | ------------------ | ------------------------------------------------------------------------------ |
| SCN-AUTH-001 | REQ-AUTH-001               | RSK-007            | TC-AUTH-001-01                                                                 |
| SCN-AUTH-002 | REQ-AUTH-006               | RSK-007, RSK-014   | TC-AUTH-002-01, TC-AUTH-002-02, TC-AUTH-002-03, TC-AUTH-002-04                 |
| SCN-AUTH-003 | REQ-AUTH-006, REQ-AUTH-008 | RSK-003            | TC-AUTH-003-01, TC-AUTH-003-02, TC-AUTH-003-03, TC-AUTH-004-05                 |
| SCN-AUTH-004 | REQ-AUTH-008               | RSK-007, RSK-014   | TC-AUTH-004-01, TC-AUTH-004-02, TC-AUTH-004-03, TC-AUTH-004-04                 |
| SCN-AUTH-005 | REQ-AUTH-009               | RSK-007, RSK-014   | TC-AUTH-005-01, TC-AUTH-005-02, TC-AUTH-005-03, TC-AUTH-005-04, TC-AUTH-005-05 |
| SCN-AUTH-006 | REQ-AUTH-002               | RSK-003            | TC-AUTH-006-01                                                                 |
| SCN-AUTH-007 | REQ-AUTH-007               | RSK-003, RSK-009   | TC-AUTH-007-01, TC-AUTH-007-02                                                 |
| SCN-AUTH-008 | REQ-AUTH-007               | RSK-003, RSK-009   | TC-AUTH-008-01, TC-AUTH-008-02                                                 |
| SCN-AUTH-009 | REQ-AUTH-003               | RSK-006            | TC-AUTH-009-01, TC-AUTH-009-02                                                 |
| SCN-AUTH-010 | REQ-AUTH-003, REQ-AUTH-004 | RSK-006            | TC-AUTH-010-01, TC-AUTH-010-02                                                 |
| SCN-AUTH-011 | REQ-AUTH-003, REQ-AUTH-004 | RSK-006            | TC-AUTH-011-01, TC-AUTH-011-02, TC-AUTH-011-03, TC-AUTH-011-04                 |
| SCN-AUTH-012 | REQ-AUTH-002, REQ-AUTH-005 | RSK-006            | TC-AUTH-012-01, TC-AUTH-012-02                                                 |
| SCN-AUTH-013 | REQ-AUTH-010               | RSK-006            | TC-AUTH-013-01, TC-AUTH-013-02, TC-AUTH-013-03, TC-AUTH-013-04                 |

The test cases are designed for subsequent execution and may be refined during review. Their presence in this document does not imply that they have been executed or passed.
