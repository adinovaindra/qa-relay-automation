# Authentication Requirements

## 1. Purpose

This document defines the expected authentication behavior for Relay, including user registration, login, logout, protected access, authentication state persistence, and session expiration.

These requirements describe the expected system behavior independently of the current implementation. The implementation shall be evaluated against these requirements, and any deviations shall be documented as defects where applicable.

## 2. Requirement Classification

Authentication requirements are organized into the following areas:

- Registration
- Login
- Logout
- Protected Access
- Authentication State Persistence
- Session Expiration

Requirement IDs follow the format `REQ-AUTH-NNN`.

Browser-native validation and application-level validation are treated separately:

- **Native browser validation:** Validation performed by the browser before form submission. It may display browser-native validation tooltips.
- **Application-level validation:** Validation performed by the application after native browser validation has passed. Errors are displayed through the application's user interface.

Unless otherwise specified, exact error messages in this document are part of the expected behavior and must match the stated text, including punctuation.

## 3. Registration Requirements

### REQ-AUTH-001 — Successful Registration

The application shall allow a user to register an account when all required registration fields contain valid data and all registration validation rules are satisfied.

The registration form shall require the following fields:

1. Name
2. Email
3. Password
4. Confirm Password

When registration succeeds, the system shall redirect the user to `/login`. The system shall not display a success message or confirmation notification after successful registration.

### REQ-AUTH-006 — Required-Field and Native Validation

The application shall use native browser validation to prevent form submission when any required field is empty or when the email address fails browser email-format validation.

For the registration form, the required fields shall be validated in the following order:

1. Name
2. Email
3. Password
4. Confirm Password

When multiple required fields are empty, the browser shall display the validation tooltip for the first empty field according to this order.

Only one native validation tooltip shall be displayed at a time.

The expected browser tooltip for an empty required field is:

`Please fill out this field.`

An invalid email format shall trigger the browser's native email-format validation tooltip. For example, an email value of `dinotest` may produce a browser message indicating that the address is missing an `@` character.

Native browser validation shall prevent submission until all applicable native validation conditions pass.

For the login form, the required fields shall be validated in the following order:

1. Email
2. Password

When multiple required fields are empty, the browser shall display the validation tooltip for the first empty field according to this order.

The same native validation behavior for empty required fields and invalid email format shall apply to the login form.

### REQ-AUTH-008 — Registration Email and Password Validation

The system shall enforce the following registration validation rules:

1. The Email field must contain a valid email format. An invalid email format shall trigger native browser validation and prevent form submission.
2. The Password field must contain at least eight characters. A password shorter than eight characters shall trigger native browser validation and prevent form submission.
3. Whitespace characters shall count toward the minimum password length.
4. No additional password complexity requirements shall apply. Uppercase letters, lowercase letters, digits, and symbols shall not be individually required.
5. The minimum password length requirement applies to Registration. Login shall not impose this minimum-length restriction before authentication is attempted.

For a password shorter than eight characters, the browser shall display its native length-validation tooltip. The exact wording may vary by browser and browser language.

### REQ-AUTH-009 — Registration Application-Level Validation Errors

After native browser validation passes, the system shall reject registration requests that violate the following application-level rules:

| Condition                                  | Expected error message                       |
| ------------------------------------------ | -------------------------------------------- |
| Password and Confirm Password do not match | `Passwords do not match.`                    |
| Name contains only whitespace characters   | `Invalid request data.`                      |
| Email address is already registered        | `An account with this email already exists.` |

The system shall display the corresponding error message in the application UI and shall not complete registration when any of these conditions applies.

When multiple application-level validation conditions apply simultaneously, the system shall follow these priority rules:

1. If Password and Confirm Password do not match, the system shall display `Passwords do not match.`, even when the Email is already registered and/or Name contains only whitespace characters.
2. If Password and Confirm Password match, but Name contains only whitespace characters, the system shall display `Invalid request data.`, even when the Email is already registered.
3. If Password and Confirm Password match, Name does not contain only whitespace characters, and the Email is already registered, the system shall display `An account with this email already exists.`.

These priority rules apply only after native browser validation has passed.

## 4. Login Requirements

### REQ-AUTH-002 — Successful Login

The system shall allow a registered user to log in using valid credentials.

Upon successful login, the system shall redirect the user to `/chat`. The authenticated state shall persist across page refreshes while the session remains valid.

The system shall not display a success message or perform an additional redirect after the user has been redirected to `/chat`.

### REQ-AUTH-007 — Invalid Login Credentials

If the email address is not registered or the password is incorrect, the system shall display the exact error message:

`Invalid email or password.`

The error shall be displayed on the Login page without navigating away from that page. The message shall be identical for both conditions and shall not reveal whether the email address is registered.

If a subsequent login attempt succeeds, the system shall clear the previous authentication error message and redirect the user to `/chat`.

Native browser validation failures, including an empty required field or an invalid email format, shall prevent form submission and shall not trigger this application-level authentication error.

## 5. Logout Requirements

### REQ-AUTH-003 — Logout

The system shall allow an authenticated user to log out. Upon logout, the system shall invalidate the authenticated state and redirect the user to the Login page.

Logging out in one tab shall invalidate the authenticated state across all other Relay tabs within the same browser profile.

The tab in which logout is initiated shall redirect the user to `/login` immediately after logout.

Other tabs shall not be required to redirect immediately and may continue displaying their current page. However, when the user performs an action that requires authentication, such as selecting another conversation, sending a message, or refreshing the page, the system shall redirect that tab to `/login`. The system shall not permit the user to perform authenticated operations after the authenticated state has been invalidated.

After logout, using the browser Back button shall redirect the user to `/login`. The browser Back action shall not restore the authenticated state or grant access to protected functionality.

The user must log in again to regain access to authenticated functionality.

## 6. Protected Access Requirements

### REQ-AUTH-004 — Protected Access

The system shall restrict access to protected pages and functionality to authenticated users.

When an unauthenticated user attempts to access a protected page, including by entering its URL directly in the browser, the system shall deny access and redirect the user to the `/login` page.

The system shall reject API requests that require authentication when the request does not contain a valid authentication token.

An invalid or invalidated token shall not grant access to protected pages, data, or functionality. When an invalid or invalidated token is detected during access to a protected page, the system shall deny access and redirect the user to the Login page.

These restrictions shall remain effective after logout. Users must authenticate again to regain access to protected pages and functionality.

## 7. Authentication State Persistence

### REQ-AUTH-005 — Authentication State Persistence

The system shall derive the authenticated state from an authentication token verified server-side.

After successful login, the authenticated state shall persist across page refreshes while the session remains valid.

Other Relay tabs within the same browser profile shall recognize the authenticated state while the session remains valid. A newly opened tab within the same browser profile shall recognize the existing authenticated state and allow access to protected pages without requiring the user to log in again.

Authentication state persistence shall not override logout, token invalidation, or session expiration.

## 8. Session Expiration

### REQ-AUTH-010 — Session Expiration

The authentication token shall become invalid 24 hours after the user successfully logs in.

Once the token expires, the system shall no longer recognize the user as authenticated, and the expired token shall not grant access to protected pages, data, or functionality.

If the session expires while the user is active, the system shall invalidate the authenticated state, stop access to protected functionality, and redirect the user to the `/login` page.

Session expiration shall apply across all Relay tabs within the same browser profile. Tabs using the expired session shall no longer permit authenticated operations.

The user must log in again to establish a new authenticated session.

## 9. Requirement Traceability and Verification

Each requirement shall be traceable to relevant test scenarios, test cases, execution results, and supporting evidence.

The expected traceability workflow is:

**Requirement → Test Scenario → Test Case → Test Execution → Evidence → Defect → Test Summary**

When actual implementation behavior differs from a defined requirement, the discrepancy shall be documented as a defect where applicable. The requirement shall not be changed solely to match the current implementation.

Retesting and regression testing after defect fixes are outside the defined portfolio deliverables. Open defects and behavior that has not been verified shall be reported transparently in the relevant test documentation.
