# Granular Test Plan: Tractor Autonomous Fodder Cutting and Loading

## 1. Introduction

### 1.1. Purpose
This document outlines the detailed granular test plan for the "Tractor Autonomous Fodder Cutting and Loading" feature of the Sevak mini-tractor system. The primary goal is to ensure the robust, reliable, and correct implementation of the autonomous cutting and loading functionalities, adhering strictly to the London School of Test-Driven Development (TDD) principles. This plan emphasizes interaction-based testing, where the behavior of units is verified through their interactions with mocked collaborators, rather than inspecting internal state. Furthermore, it defines a comprehensive recursive testing strategy to ensure continuous stability and early detection of regressions as the system evolves towards passing high-level acceptance tests. Every task and phase within this test plan includes AI verifiable completion criteria, ensuring clear milestones for automated verification.

### 1.2. Scope: AI Verifiable End Results from PRDMasterPlan.md

This granular test plan targets the verification of the following AI Verifiable End Results from [`docs/PRDMasterPlan.md`](docs/PRDMasterPlan.md), specifically focusing on sections 5.B.2 (Autonomous Fodder Cutting), 5.B.3 (Autonomous Fodder Loading), and related aspects of 5.A.4 (Initiate Task & Monitor):

*   **From 5.A.4: Initiate Task & Monitor**
    *   **AVR-5.A.4.1:** User can successfully initiate a defined task from the app.
    *   **AVR-5.A.4.2:** Tractor receives task parameters and begins autonomous operation.
    *   **AVR-5.A.4.3:** Tractor cuts fodder within the defined polygon (e.g., >90% coverage).
    *   **AVR-5.A.4.4:** Tractor transports fodder to the drop-off location within an acceptable margin of error.
    *   **AVR-5.A.4.5:** App accurately reflects tractor status and location throughout the task.
    *   **AVR-5.A.4.6:** User receives notification upon task completion or critical events.

*   **From 5.B.2: Autonomous Fodder Cutting**
    *   **AVR-5.B.2.1:** Cutting mechanism engages upon command.
    *   **AVR-5.B.2.2:** Cutting mechanism disengages upon command/completion.
    *   **AVR-5.B.2.3:** Tractor maintains appropriate operational speed during cutting.
    *   **AVR-5.B.2.4:** Tractor covers the defined cutting area systematically.

*   **From 5.B.3: Autonomous Fodder Loading**
    *   **AVR-5.B.3.1:** Loading mechanism engages in coordination with cutting.
    *   **AVR-5.B.3.2:** Loading mechanism disengages upon completion/command.

## 2. Test Strategy

### 2.1. London School TDD Principles

This test plan adopts the London School of TDD, focusing on interaction-based testing. For each Unit Under Test (UUT), tests will:
*   **Verify Observable Outcomes:** Instead of inspecting the internal state of the UUT, tests will assert on the observable outcomes, which primarily involve the UUT's interactions with its collaborators.
*   **Mock Collaborators:** All direct dependencies (collaborators) of the UUT will be mocked or stubbed. This isolates the UUT, ensuring that tests verify its specific behavior and not the behavior of its dependencies.
*   **Expect Interactions:** Tests will define explicit expectations for how the UUT interacts with its mocked collaborators (e.g., which methods are called, with what arguments, and in what order).
*   **Focus on Behavior:** The core of each test case is to verify that the UUT behaves correctly by making the expected calls to its collaborators and producing the correct external effects.

### 2.2. Recursive Testing Strategy (Frequent Regression Testing)

A comprehensive recursive testing strategy is crucial for maintaining system stability and catching regressions early. This strategy defines when and how tests should be re-executed.

#### 2.2.1. SDLC Touch Points for Re-testing Triggers

Tests will be re-run at various stages of the Software Development Life Cycle (SDLC) to ensure continuous quality:

*   **Continuous Integration (CI) / Every Commit/Push (`@fast-regression`):**
    *   **Trigger:** Every code commit or push to the version control system.
    *   **Scope:** Fast-running unit tests (`@unit`) and critical integration tests (`@critical-integration`) directly related to the changed code or core functionalities.
    *   **Goal:** Immediate feedback on code changes, catching basic regressions quickly.
    *   **AI Verifiable Criterion:** All `@fast-regression` tagged tests pass.

*   **Feature Completion / Pull Request Merge (`@feature-regression`):**
    *   **Trigger:** Completion of a feature or module, prior to merging into a main development branch.
    *   **Scope:** All unit tests (`@unit`) for the feature, feature-specific integration tests (`@feature-integration`), and a subset of broader regression tests (`@regression-medium`) that might be impacted by the new feature.
    *   **Goal:** Ensure the new feature works as expected and hasn't introduced regressions in related areas.
    *   **AI Verifiable Criterion:** All `@feature-regression` tagged tests pass for the specific feature.

*   **Sprint End / Major Integration (`@sprint-regression`):**
    *   **Trigger:** End of a development sprint, before a major integration build, or significant dependency updates.
    *   **Scope:** A broader set of integration tests, including cross-module interactions, and a significant portion of the regression suite (`@regression-medium`).
    *   **Goal:** Verify stability across integrated features and detect regressions from cumulative changes.
    *   **AI Verifiable Criterion:** All `@sprint-regression` tagged tests pass.

*   **Release Candidate / Pre-Deployment (`@full-regression`):**
    *   **Trigger:** Before a release candidate build or deployment to a staging/production environment.
    *   **Scope:** The entire suite of unit, integration, and end-to-end tests (`@unit`, `@integration`, `@e2e`, `@full-regression`).
    *   **Goal:** Comprehensive validation of the entire system's stability and adherence to all requirements.
    *   **AI Verifiable Criterion:** All `@full-regression` tagged tests pass.

#### 2.2.2. Test Prioritization and Tagging

Tests will be tagged to facilitate selective execution based on the triggers:
*   `@unit`: Isolated unit tests, very fast.
*   `@integration`: Tests involving interactions between a few modules/services.
*   `@feature:Cutting`: Tests specific to the Fodder Cutting feature.
*   `@feature:Loading`: Tests specific to the Fodder Loading feature.
*   `@feature:TaskInitiation`: Tests specific to task initiation.
*   `@critical`: Tests covering core, high-impact functionalities.
*   `@fast-regression`: Subset for CI/every commit.
*   `@feature-regression`: Subset for feature completion/PR merge.
*   `@sprint-regression`: Subset for sprint end/major integration.
*   `@full-regression`: All tests for release candidates.

#### 2.2.3. Test Subset Selection for Regression Triggers

*   **`@fast-regression`:** Run all tests tagged `@unit` and `@critical`.
*   **`@feature-regression`:** Run all tests tagged `@unit`, `@integration`, and specific `@feature:<FeatureName>` tags relevant to the changes. Also include `@critical-integration`.
*   **`@sprint-regression`:** Run all tests tagged `@unit`, `@integration`, and all tests tagged `@feature:*`.
*   **`@full-regression`:** Run all available tests.

## 3. Test Cases

This section details granular test cases for the target components, aligning with London School TDD principles and AI verifiable outcomes.

### 3.1. `mobile-app/modules/CuttingMechanismController.ts`

**Description:** This module is responsible for managing the state and commands related to the tractor's fodder cutting mechanism from the mobile app's perspective. It interacts with `TractorCommunicationService` to send commands and `TractorStatusService` to receive status updates.

#### Test Case 3.1.1: Initiate Cutting Command

*   **Targeted AI Verifiable End Result(s):** AVR-5.A.4.1, AVR-5.A.4.2, AVR-5.B.2.1
*   **Unit Under Test (UUT):** `mobile-app/modules/CuttingMechanismController.ts`
*   **Interactions to Test on UUT:**
    *   Calling `initiateCutting()` method.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService` (mocked as `mockTractorCommunicationService`)
    *   `TractorStatusService` (mocked as `mockTractorStatusService`)
    *   `NotificationService` (mocked as `mockNotificationService`)
*   **Expected Mock Interactions:**
    *   `mockTractorCommunicationService.sendCommand('CUTTER_ENGAGE')` is called exactly once.
    *   `mockTractorStatusService.updateCuttingStatus('ENGAGING')` is called.
    *   `mockNotificationService.sendNotification('Cutting initiated')` is called.
*   **Observable Outcome (AI Verifiable):**
    *   The `initiateCutting()` method completes without error.
    *   The `mockTractorCommunicationService.sendCommand` method was invoked with the correct command.
    *   The `mockTractorStatusService.updateCuttingStatus` method was invoked with the correct status.
    *   The `mockNotificationService.sendNotification` method was invoked with the correct message.
*   **Recursive Testing Scope:** `@unit`, `@feature:Cutting`, `@feature:TaskInitiation`, `@fast-regression`
*   **Test Data/Mock Configurations:**
    *   `mockTractorCommunicationService.sendCommand` resolves successfully.
    *   `mockTractorStatusService.updateCuttingStatus` resolves successfully.
    *   `mockNotificationService.sendNotification` resolves successfully.

#### Test Case 3.1.2: Stop Cutting Command

*   **Targeted AI Verifiable End Result(s):** AVR-5.B.2.2
*   **Unit Under Test (UUT):** `mobile-app/modules/CuttingMechanismController.ts`
*   **Interactions to Test on UUT:**
    *   Calling `stopCutting()` method.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService` (mocked as `mockTractorCommunicationService`)
    *   `TractorStatusService` (mocked as `mockTractorStatusService`)
*   **Expected Mock Interactions:**
    *   `mockTractorCommunicationService.sendCommand('CUTTER_DISENGAGE')` is called exactly once.
    *   `mockTractorStatusService.updateCuttingStatus('DISENGAGING')` is called.
*   **Observable Outcome (AI Verifiable):**
    *   The `stopCutting()` method completes without error.
    *   The `mockTractorCommunicationService.sendCommand` method was invoked with the correct command.
    *   The `mockTractorStatusService.updateCuttingStatus` method was invoked with the correct status.
*   **Recursive Testing Scope:** `@unit`, `@feature:Cutting`, `@fast-regression`
*   **Test Data/Mock Configurations:**
    *   `mockTractorCommunicationService.sendCommand` resolves successfully.
    *   `mockTractorStatusService.updateCuttingStatus` resolves successfully.

#### Test Case 3.1.3: Handle Tractor Cutting Status Update

*   **Targeted AI Verifiable End Result(s):** AVR-5.A.4.5
*   **Unit Under Test (UUT):** `mobile-app/modules/CuttingMechanismController.ts`
*   **Interactions to Test on UUT:**
    *   The UUT's internal listener for `TractorStatusService` events.
*   **Collaborators to Mock:**
    *   `TractorStatusService` (mocked as `mockTractorStatusService`)
    *   `NotificationService` (mocked as `mockNotificationService`)
*   **Expected Mock Interactions:**
    *   `mockTractorStatusService.on('cuttingStatusUpdate', callback)` is registered.
    *   When `mockTractorStatusService` emits a 'cuttingStatusUpdate' event with 'ACTIVE', `mockNotificationService.sendNotification('Cutting in progress')` is called.
    *   When `mockTractorStatusService` emits a 'cuttingStatusUpdate' event with 'COMPLETE', `mockNotificationService.sendNotification('Cutting completed')` is called.
*   **Observable Outcome (AI Verifiable):**
    *   The `CuttingMechanismController` correctly processes status updates from `TractorStatusService`.
    *   The `mockNotificationService.sendNotification` method was invoked with the appropriate message based on the status update.
*   **Recursive Testing Scope:** `@unit`, `@feature:Cutting`, `@integration`, `@sprint-regression`
*   **Test Data/Mock Configurations:**
    *   Simulate `TractorStatusService` emitting different cutting status updates (`'ACTIVE'`, `'COMPLETE'`, `'ERROR'`).

### 3.2. `mobile-app/modules/LoadingMechanismController.ts`

**Description:** This module manages the state and commands for the tractor's fodder loading mechanism from the mobile app. It interacts with `TractorCommunicationService` and `TractorStatusService`.

#### Test Case 3.2.1: Initiate Loading Command

*   **Targeted AI Verifiable End Result(s):** AVR-5.A.4.1, AVR-5.A.4.2, AVR-5.B.3.1
*   **Unit Under Test (UUT):** `mobile-app/modules/LoadingMechanismController.ts`
*   **Interactions to Test on UUT:**
    *   Calling `initiateLoading()` method.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService` (mocked as `mockTractorCommunicationService`)
    *   `TractorStatusService` (mocked as `mockTractorStatusService`)
    *   `NotificationService` (mocked as `mockNotificationService`)
*   **Expected Mock Interactions:**
    *   `mockTractorCommunicationService.sendCommand('LOADER_ENGAGE')` is called exactly once.
    *   `mockTractorStatusService.updateLoadingStatus('ENGAGING')` is called.
    *   `mockNotificationService.sendNotification('Loading initiated')` is called.
*   **Observable Outcome (AI Verifiable):**
    *   The `initiateLoading()` method completes without error.
    *   The `mockTractorCommunicationService.sendCommand` method was invoked with the correct command.
    *   The `mockTractorStatusService.updateLoadingStatus` method was invoked with the correct status.
    *   The `mockNotificationService.sendNotification` method was invoked with the correct message.
*   **Recursive Testing Scope:** `@unit`, `@feature:Loading`, `@feature:TaskInitiation`, `@fast-regression`
*   **Test Data/Mock Configurations:**
    *   `mockTractorCommunicationService.sendCommand` resolves successfully.
    *   `mockTractorStatusService.updateLoadingStatus` resolves successfully.
    *   `mockNotificationService.sendNotification` resolves successfully.

#### Test Case 3.2.2: Stop Loading Command

*   **Targeted AI Verifiable End Result(s):** AVR-5.B.3.2
*   **Unit Under Test (UUT):** `mobile-app/modules/LoadingMechanismController.ts`
*   **Interactions to Test on UUT:**
    *   Calling `stopLoading()` method.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService` (mocked as `mockTractorCommunicationService`)
    *   `TractorStatusService` (mocked as `mockTractorStatusService`)
*   **Expected Mock Interactions:**
    *   `mockTractorCommunicationService.sendCommand('LOADER_DISENGAGE')` is called exactly once.
    *   `mockTractorStatusService.updateLoadingStatus('DISENGAGING')` is called.
*   **Observable Outcome (AI Verifiable):**
    *   The `stopLoading()` method completes without error.
    *   The `mockTractorCommunicationService.sendCommand` method was invoked with the correct command.
    *   The `mockTractorStatusService.updateLoadingStatus` method was invoked with the correct status.
*   **Recursive Testing Scope:** `@unit`, `@feature:Loading`, `@fast-regression`
*   **Test Data/Mock Configurations:**
    *   `mockTractorCommunicationService.sendCommand` resolves successfully.
    *   `mockTractorStatusService.updateLoadingStatus` resolves successfully.

#### Test Case 3.2.3: Handle Tractor Loading Status Update

*   **Targeted AI Verifiable End Result(s):** AVR-5.A.4.5
*   **Unit Under Test (UUT):** `mobile-app/modules/LoadingMechanismController.ts`
*   **Interactions to Test on UUT:**
    *   The UUT's internal listener for `TractorStatusService` events.
*   **Collaborators to Mock:**
    *   `TractorStatusService` (mocked as `mockTractorStatusService`)
    *   `NotificationService` (mocked as `mockNotificationService`)
*   **Expected Mock Interactions:**
    *   `mockTractorStatusService.on('loadingStatusUpdate', callback)` is registered.
    *   When `mockTractorStatusService` emits a 'loadingStatusUpdate' event with 'ACTIVE', `mockNotificationService.sendNotification('Loading in progress')` is called.
    *   When `mockTractorStatusService` emits a 'loadingStatusUpdate' event with 'COMPLETE', `mockNotificationService.sendNotification('Loading completed')` is called.
*   **Observable Outcome (AI Verifiable):**
    *   The `LoadingMechanismController` correctly processes status updates from `TractorStatusService`.
    *   The `mockNotificationService.sendNotification` method was invoked with the appropriate message based on the status update.
*   **Recursive Testing Scope:** `@unit`, `@feature:Loading`, `@integration`, `@sprint-regression`
*   **Test Data/Mock Configurations:**
    *   Simulate `TractorStatusService` emitting different loading status updates (`'ACTIVE'`, `'COMPLETE'`, `'ERROR'`).

### 3.3. `mobile-app/services/MotorController.ts` (Enhancements for Cutting/Loading)

**Description:** This existing service will be enhanced to handle motor commands specifically for the cutting and loading mechanisms.

#### Test Case 3.3.1: Engage Cutting Motor

*   **Targeted AI Verifiable End Result(s):** AVR-5.B.2.1
*   **Unit Under Test (UUT):** `mobile-app/services/MotorController.ts`
*   **Interactions to Test on UUT:**
    *   Calling `engageCuttingMotor()` method.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService` (mocked as `mockTractorCommunicationService`) - assuming this service sends low-level motor commands to the tractor.
*   **Expected Mock Interactions:**
    *   `mockTractorCommunicationService.sendLowLevelCommand('CUTTING_MOTOR_ON', { speed: 'optimal' })` is called exactly once.
*   **Observable Outcome (AI Verifiable):**
    *   The `engageCuttingMotor()` method completes without error.
    *   The `mockTractorCommunicationService.sendLowLevelCommand` method was invoked with the correct command and parameters.
*   **Recursive Testing Scope:** `@unit`, `@feature:Cutting`, `@fast-regression`
*   **Test Data/Mock Configurations:**
    *   `mockTractorCommunicationService.sendLowLevelCommand` resolves successfully.

#### Test Case 3.3.2: Disengage Cutting Motor

*   **Targeted AI Verifiable End Result(s):** AVR-5.B.2.2
*   **Unit Under Test (UUT):** `mobile-app/services/MotorController.ts`
*   **Interactions to Test on UUT:**
    *   Calling `disengageCuttingMotor()` method.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService` (mocked as `mockTractorCommunicationService`)
*   **Expected Mock Interactions:**
    *   `mockTractorCommunicationService.sendLowLevelCommand('CUTTING_MOTOR_OFF')` is called exactly once.
*   **Observable Outcome (AI Verifiable):**
    *   The `disengageCuttingMotor()` method completes without error.
    *   The `mockTractorCommunicationService.sendLowLevelCommand` method was invoked with the correct command.
*   **Recursive Testing Scope:** `@unit`, `@feature:Cutting`, `@fast-regression`
*   **Test Data/Mock Configurations:**
    *   `mockTractorCommunicationService.sendLowLevelCommand` resolves successfully.

#### Test Case 3.3.3: Engage Loading Motor

*   **Targeted AI Verifiable End Result(s):** AVR-5.B.3.1
*   **Unit Under Test (UUT):** `mobile-app/services/MotorController.ts`
*   **Interactions to Test on UUT:**
    *   Calling `engageLoadingMotor()` method.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService` (mocked as `mockTractorCommunicationService`)
*   **Expected Mock Interactions:**
    *   `mockTractorCommunicationService.sendLowLevelCommand('LOADING_MOTOR_ON', { speed: 'standard' })` is called exactly once.
*   **Observable Outcome (AI Verifiable):**
    *   The `engageLoadingMotor()` method completes without error.
    *   The `mockTractorCommunicationService.sendLowLevelCommand` method was invoked with the correct command and parameters.
*   **Recursive Testing Scope:** `@unit`, `@feature:Loading`, `@fast-regression`
*   **Test Data/Mock Configurations:**
    *   `mockTractorCommunicationService.sendLowLevelCommand` resolves successfully.

#### Test Case 3.3.4: Disengage Loading Motor

*   **Targeted AI Verifiable End Result(s):** AVR-5.B.3.2
*   **Unit Under Test (UUT):** `mobile-app/services/MotorController.ts`
*   **Interactions to Test on UUT:**
    *   Calling `disengageLoadingMotor()` method.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService` (mocked as `mockTractorCommunicationService`)
*   **Expected Mock Interactions:**
    *   `mockTractorCommunicationService.sendLowLevelCommand('LOADING_MOTOR_OFF')` is called exactly once.
*   **Observable Outcome (AI Verifiable):**
    *   The `disengageLoadingMotor()` method completes without error.
    *   The `mockTractorCommunicationService.sendLowLevelCommand` method was invoked with the correct command.
*   **Recursive Testing Scope:** `@unit`, `@feature:Loading`, `@fast-regression`
*   **Test Data/Mock Configurations:**
    *   `mockTractorCommunicationService.sendLowLevelCommand` resolves successfully.

### 3.4. `mobile-app/services/TractorStatusService.ts` (Enhancements for Cutting/Loading Status)

**Description:** This existing service will be enhanced to emit specific events related to the cutting and loading mechanism status, which `CuttingMechanismController` and `LoadingMechanismController` will subscribe to.

#### Test Case 3.4.1: Emit Cutting Status Update

*   **Targeted AI Verifiable End Result(s):** AVR-5.A.4.5
*   **Unit Under Test (UUT):** `mobile-app/services/TractorStatusService.ts`
*   **Interactions to Test on UUT:**
    *   Calling `updateCuttingStatus(status: string)` method.
*   **Collaborators to Mock:**
    *   None (this is an event emitter, testing its own emission).
*   **Expected Mock Interactions:**
    *   N/A (testing the UUT's emission directly).
*   **Observable Outcome (AI Verifiable):**
    *   When `updateCuttingStatus('ACTIVE')` is called, the service emits a `'cuttingStatusUpdate'` event with payload `'ACTIVE'`.
    *   When `updateCuttingStatus('COMPLETE')` is called, the service emits a `'cuttingStatusUpdate'` event with payload `'COMPLETE'`.
*   **Recursive Testing Scope:** `@unit`, `@feature:Cutting`, `@integration`, `@fast-regression`
*   **Test Data/Mock Configurations:**
    *   Listeners can be set up in the test to capture emitted events.

#### Test Case 3.4.2: Emit Loading Status Update

*   **Targeted AI Verifiable End Result(s):** AVR-5.A.4.5
*   **Unit Under Test (UUT):** `mobile-app/services/TractorStatusService.ts`
*   **Interactions to Test on UUT:**
    *   Calling `updateLoadingStatus(status: string)` method.
*   **Collaborators to Mock:**
    *   None.
*   **Expected Mock Interactions:**
    *   N/A.
*   **Observable Outcome (AI Verifiable):**
    *   When `updateLoadingStatus('ACTIVE')` is called, the service emits a `'loadingStatusUpdate'` event with payload `'ACTIVE'`.
    *   When `updateLoadingStatus('COMPLETE')` is called, the service emits a `'loadingStatusUpdate'` event with payload `'COMPLETE'`.
*   **Recursive Testing Scope:** `@unit`, `@feature:Loading`, `@integration`, `@fast-regression`
*   **Test Data/Mock Configurations:**
    *   Listeners can be set up in the test to capture emitted events.

### 3.5. `mobile-app/services/NotificationService.ts` (Enhancements for Cutting/Loading Notifications)

**Description:** This existing service will be enhanced to send specific notifications related to the cutting and loading process.

#### Test Case 3.5.1: Send Cutting Completion Notification

*   **Targeted AI Verifiable End Result(s):** AVR-5.A.4.6
*   **Unit Under Test (UUT):** `mobile-app/services/NotificationService.ts`
*   **Interactions to Test on UUT:**
    *   Calling `sendNotification('Cutting completed')` method.
*   **Collaborators to Mock:**
    *   `SystemNotificationAPI` (mocked as `mockSystemNotificationAPI`) - representing the underlying OS notification system.
*   **Expected Mock Interactions:**
    *   `mockSystemNotificationAPI.displayNotification({ title: 'Sevak Update', body: 'Cutting completed' })` is called exactly once.
*   **Observable Outcome (AI Verifiable):**
    *   The `sendNotification()` method completes without error.
    *   The `mockSystemNotificationAPI.displayNotification` method was invoked with the correct notification content.
*   **Recursive Testing Scope:** `@unit`, `@feature:Cutting`, `@integration`, `@fast-regression`
*   **Test Data/Mock Configurations:**
    *   `mockSystemNotificationAPI.displayNotification` resolves successfully.

#### Test Case 3.5.2: Send Loading Completion Notification

*   **Targeted AI Verifiable End Result(s):** AVR-5.A.4.6
*   **Unit Under Test (UUT):** `mobile-app/services/NotificationService.ts`
*   **Interactions to Test on UUT:**
    *   Calling `sendNotification('Loading completed')` method.
*   **Collaborators to Mock:**
    *   `SystemNotificationAPI` (mocked as `mockSystemNotificationAPI`)
*   **Expected Mock Interactions:**
    *   `mockSystemNotificationAPI.displayNotification({ title: 'Sevak Update', body: 'Loading completed' })` is called exactly once.
*   **Observable Outcome (AI Verifiable):**
    *   The `sendNotification()` method completes without error.
    *   The `mockSystemNotificationAPI.displayNotification` method was invoked with the correct notification content.
*   **Recursive Testing Scope:** `@unit`, `@feature:Loading`, `@integration`, `@fast-regression`
*   **Test Data/Mock Configurations:**
    *   `mockSystemNotificationAPI.displayNotification` resolves successfully.

#### Test Case 3.5.3: Send Critical Event Notification (e.g., Cutting Error)

*   **Targeted AI Verifiable End Result(s):** AVR-5.A.4.6
*   **Unit Under Test (UUT):** `mobile-app/services/NotificationService.ts`
*   **Interactions to Test on UUT:**
    *   Calling `sendNotification('Cutting mechanism error: [details]')` method.
*   **Collaborators to Mock:**
    *   `SystemNotificationAPI` (mocked as `mockSystemNotificationAPI`)
*   **Expected Mock Interactions:**
    *   `mockSystemNotificationAPI.displayNotification({ title: 'Sevak Critical Alert', body: 'Cutting mechanism error: Obstruction detected' })` is called exactly once.
*   **Observable Outcome (AI Verifiable):**
    *   The `sendNotification()` method completes without error.
    *   The `mockSystemNotificationAPI.displayNotification` method was invoked with the correct critical alert content.
*   **Recursive Testing Scope:** `@unit`, `@feature:Cutting`, `@feature:Loading`, `@critical`, `@fast-regression`
*   **Test Data/Mock Configurations:**
    *   `mockSystemNotificationAPI.displayNotification` resolves successfully.