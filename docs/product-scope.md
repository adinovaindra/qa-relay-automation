# Relay — Product & QA Scope

## 1. Purpose

This document defines the product scope and quality assurance (QA) scope for testing the Relay messaging web application.

It establishes the application's key functional areas, the features and behaviors included in the testing scope, and the boundaries of the planned testing activities. It serves as the foundation for requirements documentation, risk assessment, test design, and test execution.

The scope is intended to support structured, traceable testing of Relay's documented product behavior while distinguishing expected behavior from implementation details and observed runtime behavior.

---

## 2. System Under Test

The system under test (SUT) is Relay, a full-stack web application designed for one-to-one messaging and simple team communication.

The application provides functionality for user authentication, conversation management, and text messaging. Its behavior is evaluated through the application's supported interfaces and observable responses, with particular attention to functional correctness, access control, and message persistence.

The application behavior evaluated in this project is limited to the functionality and workflows defined in this document's project scope. The specific interfaces and technical layers covered by testing are described in the In Scope and Testing Strategy sections.

---

## 3. Product Overview

Relay is a full-stack web application for one-to-one messaging and simple team communication. Its primary functionality is organized into the following areas:

- **Authentication:** User registration, login, and session-related functionality.
- **Conversations:** Creating, accessing, and managing one-to-one conversations.
- **Messaging:** Sending and accessing text messages within conversations, including message persistence.
- **Authorization:** Controlling access to protected application resources and ensuring that users can only perform actions permitted to them.
- **User Experience:** The application's interface, navigation, feedback, and interaction behavior across supported user workflows.

These areas provide a high-level overview of Relay's product functionality. Detailed expected behavior and feature-specific requirements are documented separately in the requirements documentation.

---

## 4. QA Objective

The objective of this project is to design, implement, and evaluate automated tests for the Relay web application to assess its functional behavior against documented requirements and defined test cases.

The project focuses on applying automation testing to relevant application workflows to identify functional defects, evaluate expected application behavior, and support consistent and repeatable test execution.

Testing activities are guided by structured test design, risk-based prioritization, and traceability between requirements, test scenarios, test cases, automated test implementations, execution results, and supporting evidence. Defects identified during testing are documented with sufficient information to describe the observed behavior and its deviation from the expected result.

The project also aims to demonstrate a structured automation testing workflow, from requirement analysis and test design through automated test implementation, execution, result analysis, and defect documentation.

---

## 5. In Scope

The scope of this project covers functional areas and application workflows selected for automation testing of the Relay web application. Testing focuses on evaluating application behavior against documented requirements and defined test cases.

The project explicitly includes both **UI automation testing** and **API automation testing**. These approaches are used to evaluate relevant application behavior through the user interface and API interfaces, respectively. The specific allocation of test coverage between these approaches, including the selection of appropriate testing layers for individual scenarios, is defined in the Test Strategy section.

The following functional areas and workflows are included in the project scope.

### 5.1 Authentication

Authentication testing covers the following areas:

- **User registration**
- **Login with valid credentials**
- **Login with invalid credentials**
- **Logout**
- **Protected access**
- **Authentication state behavior**

### 5.2 Authorization

Authorization testing covers the following areas:

- **Access control for conversations**
- **Access control for messages**
- **Prevention of unauthorized access to other users' resources**
- **Enforcement of access restrictions through the API**

### 5.3 Conversations

Conversation testing covers the following areas:

- **1-on-1 conversation access**
- **Conversation participant relationships**
- **Conversation creation**
- **Conversation listing and retrieval**
- **Conversation ordering based on latest activity**

For conversation ordering, the latest activity is defined as either the creation of a new conversation or a new message in an existing conversation. A newly created conversation may therefore appear at the top of the conversation list even when it does not yet contain any messages, provided its creation is the most recent activity.

### 5.4 Messaging

Messaging testing covers the following areas:

- **Sending text messages**
- **Receiving/displaying messages**
- **Message persistence**
- **Message ordering**
- **Message history**
- **Message scrolling**
- **Date separators**

### 5.5 User Experience

User experience testing covers the following areas:

- **Empty states**
- **Error states**
- **Light and dark mode**
- **Theme persistence**
- **Responsive desktop/mobile behavior**

### 5.6 End-to-End Workflows

The project includes an end-to-end workflow that evaluates the interaction between authentication, conversation management, messaging, and protected access.

The workflow consists of the following sequence:

1. Register a new user.
2. Log in using the newly registered account.
3. Create a conversation.
4. Send a message within the conversation.
5. Log out.
6. Attempt to access a protected page after logout.

This workflow evaluates the application across multiple functional areas within a single user journey.

---

## 6. Testing Strategy

This project adopts a structured, risk-based automation testing approach to evaluate the functional behavior of the Relay web application. The strategy combines UI automation testing and API automation testing to assess application behavior through the interfaces relevant to each test scenario.

### 6.1 Testing Approach

Automated tests are developed based on documented requirements and defined test cases. Test coverage is prioritized according to the risks identified during risk assessment, with consideration given to the functional areas and workflows included in the project scope.

UI automation testing and API automation testing are applied according to the objectives of individual test scenarios and the behavior being evaluated. Each approach is used where appropriate to provide relevant coverage of the application's functionality and access control.

Test execution results are evaluated against the expected outcomes defined in the test cases. Results and supporting evidence are documented to maintain traceability between requirements, test design, automated test implementations, execution outcomes, and identified defects.

### 6.2 UI Automation Testing

UI automation testing is used to evaluate application behavior through the Relay user interface. It focuses on verifying user-facing functionality, interface behavior, and relevant workflows defined in the project scope.

Automated UI tests are designed to interact with the application as a user would and to evaluate the resulting application behavior against the expected outcomes defined in the test cases.

### 6.3 API Automation Testing

API automation testing is used to evaluate application behavior through the relevant API interfaces. It focuses on verifying API responses, functional behavior, and access control where applicable to the requirements and test cases.

API automated tests complement UI automation by evaluating behavior at the API interface without requiring every check to be performed through the user interface.

### 6.4 Test Execution and Results

Automated tests are executed against the configured test environment using the procedures established for the project. Execution results are evaluated against the expected outcomes defined in the test cases.

Test results and supporting evidence are documented to support traceability and communicate the outcome of testing. Any identified deviations from expected behavior are reviewed and documented as potential defects when supported by the available requirements and evidence.

---

## 7. Out of Scope

The following testing activities and application capabilities are excluded from this project:

- **Performance testing:** Evaluating application performance characteristics, such as response times and resource utilization, as a dedicated testing activity.
- **Load and stress testing:** Evaluating application behavior under high traffic, concurrent workloads, or excessive system load.
- **Formal penetration testing:** Conducting a formal penetration testing engagement to identify and exploit security vulnerabilities.
- **Comprehensive security assessment:** Performing an extensive security assessment beyond the functional access control and authorization checks defined in the project scope.
- **Native mobile application testing:** Testing dedicated native Android or iOS applications. Responsive behavior of the Relay web application on desktop and mobile viewports remains in scope.
- **Retesting after a fix:** Re-executing failed tests specifically to verify whether a reported defect has been corrected.
- **Regression testing after a fix:** Re-executing previously passing tests to identify unintended side effects following a defect fix.
- **Realtime messaging:** Testing realtime message delivery or live synchronization as a product capability.

These exclusions define the boundaries of the planned testing activities and do not imply that the excluded capabilities have been evaluated or verified.

---

## 8. Requirement Sources

The primary source of product requirements for this project is the Relay README. It serves as the reference for identifying the application's intended functionality and expected behavior.

The documented requirements are used as the basis for test design, including the development of test scenarios, test cases, and automated tests.

---
