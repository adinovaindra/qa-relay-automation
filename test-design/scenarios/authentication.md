# Relay — Authentication Test Scenarios

## 1. Purpose

This document defines the authentication test scenarios derived from Relay's documented product scope, authentication requirements, and risk assessment.

The scenarios identify the authentication behaviors that require verification before detailed test cases and test execution activities are created.

The scenarios remain at a higher level than individual test cases. Each scenario may cover multiple relevant conditions, including positive, negative, and boundary conditions, where supported by the documented requirements and associated risks.

---

## 2. Scenario Design Approach

Authentication scenarios are derived from the following sources:

- Product scope
- Authentication requirements
- Risk assessment

The scenario design follows this relationship:

```text
Product Scope
    +
Authentication Requirements
    +
Risk Assessment
    ↓
Authentication Test Scenarios
```

The design prioritizes authentication and session-related risks while maintaining traceability to the requirements being verified.

High-risk authentication areas receive particular attention, including credential validation, authentication state, protected access, logout behavior, and session expiration.

Risk assessment is used to inform scenario coverage and testing priority. It does not establish additional product requirements or replace the expected behavior documented in the requirements.

Where the requirements specify exact behavior or error messages, the scenarios preserve those expectations. Unspecified behavior is not assumed; any unresolved expectation must be clarified before it is treated as a definitive pass/fail criterion.

---

## 3. Authentication Scenarios

### SCN-AUTH-001 — User Registration

Verify that a user can register a new account by providing the required registration information.

**Related Requirements:** REQ-AUTH-001  
**Related Risks:** RSK-007  
**Risk Level:** Medium

**Coverage Considerations:**

- Registration with valid required fields.
- Submission of the required Name, Email, Password, and Confirm Password fields.
- Successful registration redirects the user to `/login`.
- Registration success does not display a success message or notification.

---

### SCN-AUTH-002 — Registration Required-Field Validation

Verify that registration enforces the documented required-field validation and validation order.

**Related Requirements:** REQ-AUTH-006  
**Related Risks:** RSK-007, RSK-014  
**Risk Level:** Medium

**Coverage Considerations:**

- Required-field validation for Name, Email, Password, and Confirm Password.
- Validation order: Name → Email → Password → Confirm Password.
- The first invalid or empty required field receives the browser-native validation tooltip.
- The empty required-field tooltip displays `Please fill out this field.`
- Native validation prevents form submission.

---

### SCN-AUTH-003 — Login Required-Field Validation

Verify that login enforces the documented required-field validation and email-format validation.

**Related Requirements:** REQ-AUTH-006  
**Related Risks:** RSK-007  
**Risk Level:** Medium

**Coverage Considerations:**

- Required-field validation for Email and Password.
- Validation order: Email → Password.
- The first invalid or empty required field receives the browser-native validation tooltip.
- The empty required-field tooltip displays `Please fill out this field.`
- Invalid email format is handled through browser-native validation.
- Native validation prevents form submission and does not trigger the application-level authentication error.

---

### SCN-AUTH-004 — Registration Email and Password Validation

Verify that registration enforces the documented email-format and minimum password-length requirements.

**Related Requirements:** REQ-AUTH-008  
**Related Risks:** RSK-007, RSK-014  
**Risk Level:** Medium

**Coverage Considerations:**

- Registration email input must satisfy the documented email-format validation.
- Registration password must contain at least eight characters.
- Whitespace characters count toward the minimum password length.
- No additional password complexity requirements are imposed, such as mandatory uppercase letters, lowercase letters, digits, or symbols.
- The minimum password-length requirement applies to Registration, not Login.

---

### SCN-AUTH-005 — Registration Application-Level Validation and Error Priority

Verify that registration displays the documented application-level errors and applies the required error priority when multiple invalid conditions occur.

**Related Requirements:** REQ-AUTH-009  
**Related Risks:** RSK-007, RSK-014  
**Risk Level:** Medium

**Coverage Considerations:**

- Password mismatch displays `Passwords do not match.`
- A name containing only whitespace displays `Invalid request data.`
- Registering an already registered email displays `An account with this email already exists.`
- Password mismatch takes priority over whitespace-only name and duplicate-email errors.
- When passwords match but the name contains only whitespace, `Invalid request data.` takes priority over the duplicate-email error.
- When the preceding higher-priority conditions do not apply, a duplicate email displays the documented duplicate-email error.
- Browser-native validation occurs before application-level validation.

---

### SCN-AUTH-006 — Valid User Login

Verify that a registered user can authenticate with valid credentials and access the authenticated area of Relay.

**Related Requirements:** REQ-AUTH-002  
**Related Risks:** RSK-003  
**Risk Level:** High

**Coverage Considerations:**

- Login using valid registered credentials.
- Successful login redirects the user to `/chat`.
- Authentication remains valid across page refresh while the session remains valid.
- Successful login does not display an additional success message or cause an additional redirect.

---

### SCN-AUTH-007 — Invalid User Login

Verify that login fails when an unregistered email address or an incorrect password is provided.

**Related Requirements:** REQ-AUTH-007  
**Related Risks:** RSK-003, RSK-009  
**Risk Level:** High

**Coverage Considerations:**

- Login with an unregistered email address.
- Login with a registered email address and an incorrect password.
- Failed authentication displays the exact error message `Invalid email or password.`
- Failed authentication does not grant access to protected functionality.
- The error message does not disclose whether the email address is registered.
- Browser-native validation does not trigger the application-level authentication error.

---

### SCN-AUTH-008 — Consistent Login Error Feedback

Verify that different invalid credential conditions produce the same generic login error and that a subsequent successful login clears the error.

**Related Requirements:** REQ-AUTH-007  
**Related Risks:** RSK-003, RSK-009  
**Risk Level:** High

**Coverage Considerations:**

- An unregistered email address and an incorrect password produce the same error message.
- The exact error message is `Invalid email or password.`
- The error message does not reveal whether the email address is registered.
- A subsequent successful login clears the previous error.
- Successful login redirects the user to `/chat`.

---

### SCN-AUTH-009 — Logout and Cross-Tab Session Invalidation

Verify that logout invalidates the authenticated state and prevents continued authenticated operations across Relay tabs in the same browser profile.

**Related Requirements:** REQ-AUTH-003  
**Related Risks:** RSK-006  
**Risk Level:** High

**Coverage Considerations:**

- Logout from an authenticated session.
- The current tab redirects to `/login`.
- Logout invalidates authentication state across other Relay tabs in the same browser profile.
- Other tabs are not required to redirect immediately.
- When another tab attempts a protected action or refreshes after invalidation, it must redirect to `/login`.
- No authenticated operation succeeds after the session has been invalidated.

---

### SCN-AUTH-010 — Protected Access After Logout and Browser Back

Verify that logging out prevents previously authenticated access from being restored through browser navigation.

**Related Requirements:** REQ-AUTH-003, REQ-AUTH-004  
**Related Risks:** RSK-006  
**Risk Level:** High

**Coverage Considerations:**

- Attempt to access a protected page after logout.
- Use browser Back after logout.
- The application redirects to `/login` rather than restoring authenticated access.
- Accessing protected functionality requires logging in again.

---

### SCN-AUTH-011 — Protected Page and API Access Without Valid Authentication

Verify that protected pages and APIs reject requests without a valid authentication token.

**Related Requirements:** REQ-AUTH-004  
**Related Risks:** RSK-006  
**Risk Level:** High

**Coverage Considerations:**

- Direct navigation to a protected page while unauthenticated.
- Access to a protected API without a valid token.
- Access using an invalid token.
- Access using an invalidated token.
- Unauthenticated protected-page access redirects to `/login`.
- Invalid or invalidated tokens cannot access protected resources or functionality.
- Protected access remains blocked after logout.

---

### SCN-AUTH-012 — Authentication State Persistence Across Tabs and Refresh

Verify that Relay recognizes an existing valid authenticated session across refreshes and tabs in the same browser profile.

**Related Requirements:** REQ-AUTH-005  
**Related Risks:** RSK-006  
**Risk Level:** High

**Coverage Considerations:**

- Authentication state persists across page refresh while the session remains valid.
- Other Relay tabs recognize an existing valid authenticated session in the same browser profile.
- A newly opened Relay tab recognizes the existing valid authenticated session.
- Authentication persistence does not override logout, token invalidation, or token expiration.
- Authenticated state is based on a server-verified authentication token.

---

### SCN-AUTH-013 — Authentication Token Expiration

Verify that an authentication token becomes invalid 24 hours after login and that expiration prevents further protected access.

**Related Requirements:** REQ-AUTH-010  
**Related Risks:** RSK-006  
**Risk Level:** High

**Coverage Considerations:**

- Token validity before the documented 24-hour expiration point.
- Token invalidation at the documented expiration point.
- Expiration blocks access to protected pages, data, and functionality.
- An active session that expires redirects the user to `/login`.
- Token expiration applies across Relay tabs in the same browser profile.
- The user must log in again to establish a new session.

---

## 4. Scenario Traceability

The authentication scenarios maintain traceability between the documented requirements, associated risks, and scenario identifiers.

The relationship is:

```text
Requirement
    ↓
Risk Assessment
    ↓
Authentication Scenario
    ↓
Test Cases
    ↓
Execution and Evidence
```

### Requirement-to-Scenario Traceability

| Requirement ID | Related Risk ID(s) | Scenario ID(s)             |
| -------------- | ------------------ | -------------------------- |
| REQ-AUTH-001   | RSK-007            | SCN-AUTH-001               |
| REQ-AUTH-002   | RSK-003            | SCN-AUTH-006               |
| REQ-AUTH-003   | RSK-006            | SCN-AUTH-009, SCN-AUTH-010 |
| REQ-AUTH-004   | RSK-006            | SCN-AUTH-010, SCN-AUTH-011 |
| REQ-AUTH-005   | RSK-006            | SCN-AUTH-012               |
| REQ-AUTH-006   | RSK-007, RSK-014   | SCN-AUTH-002, SCN-AUTH-003 |
| REQ-AUTH-007   | RSK-003, RSK-009   | SCN-AUTH-007, SCN-AUTH-008 |
| REQ-AUTH-008   | RSK-007, RSK-014   | SCN-AUTH-004               |
| REQ-AUTH-009   | RSK-007, RSK-014   | SCN-AUTH-005               |
| REQ-AUTH-010   | RSK-006            | SCN-AUTH-013               |

### Risk-to-Scenario Traceability

| Risk ID | Risk Area                                                                   | Scenario ID(s)                                                       |
| ------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| RSK-003 | Authentication                                                              | SCN-AUTH-006, SCN-AUTH-007, SCN-AUTH-008                             |
| RSK-006 | Session and Logout Behavior                                                 | SCN-AUTH-009, SCN-AUTH-010, SCN-AUTH-011, SCN-AUTH-012, SCN-AUTH-013 |
| RSK-007 | Registration and Message Input Validation                                   | SCN-AUTH-001, SCN-AUTH-002, SCN-AUTH-003, SCN-AUTH-004, SCN-AUTH-005 |
| RSK-009 | Error Handling for Invalid Login Credentials and Non-Existent Conversations | SCN-AUTH-007, SCN-AUTH-008                                           |
| RSK-014 | Registration Validation Feedback                                            | SCN-AUTH-002, SCN-AUTH-004, SCN-AUTH-005                             |

The scenario set is intended to guide subsequent test-case design. Scenario coverage does not imply that the scenarios have been executed or that the corresponding functionality has passed testing.
