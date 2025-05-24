# Granular Test Plan: Mobile App Manual Control Mode

## 1. Introduction

### 1.1. Feature Name
Mobile App Manual Control Mode

### 1.2. Purpose
This document outlines a detailed granular test plan for the "Mobile App Manual Control Mode" feature of the Sevak project. The purpose of this plan is to ensure the robust, reliable, and safe operation of the manual control functionalities, adhering to the specified requirements and contributing to the overall system's high-level acceptance criteria. This plan is designed to be clear and actionable for human programmers and subsequent AI testing agents, ensuring direct alignment with AI verifiable project milestones.

### 1.3. Scope: AI Verifiable End Results Targeted
This granular test plan specifically targets the following AI Verifiable End Results (AVRs) from the [`PRDMasterPlan.md`](docs/PRDMasterPlan.md), ensuring that the implementation of the "Mobile App Manual Control Mode" feature directly contributes to these project milestones:

*   **AVR-MCM-1: Virtual Joystick Responsiveness:** The mobile app's virtual joystick accurately translates user input into corresponding directional commands (forward, backward, left, right) sent to the tractor's control system within the specified response time (1-2 seconds). (Derived from `PRDMasterPlan.md`: Section 5.C.2, 6.1)
*   **AVR-MCM-2: Cutter Engagement/Disengagement:** The mobile app's "Engage Cutter" and "Disengage Cutter" buttons, when pressed, send the correct commands to the tractor's control system, resulting in the physical cutter mechanism engaging or disengaging. (Derived from `PRDMasterPlan.md`: Section 5.C.2)
*   **AVR-MCM-3: Loader Engagement/Disengagement:** The mobile app's "Engage Loader" and "Disengage Loader" buttons, when pressed, send the correct commands to the tractor's control system, resulting in the physical loader mechanism engaging or disengaging. (Derived from `PRDMasterPlan.md`: Section 5.C.2)
*   **AVR-MCM-4: Safety Interlock - Speed Limitation:** When in manual control mode, the tractor's maximum speed is limited to a very slow speed (e.g., a defined "manual mode speed") regardless of joystick input, ensuring safety. (Derived from `PRDMasterPlan.md`: Section 5.C.2)
*   **AVR-MCM-5: Stable Communication Link:** The mobile app maintains a direct and stable local connection (Bluetooth/local Wi-Fi) with the tractor during manual control operations, ensuring continuous command transmission and status reception. (Derived from `PRDMasterPlan.md`: Section 5.C.2)
*   **AVR-MCM-6: Secure Communication:** The communication channel between the mobile app and the tractor for manual control commands is secure, preventing unauthorized control. (Derived from `PRDMasterPlan.md`: Section 6.5)
*   **AVR-MCM-7: App Status Reflection:** The mobile app accurately displays the tractor's `status` as "ManualMode" when manual control is active, and updates `currentLocation` and `batteryLevel` in real-time. (Derived from `PRDMasterPlan.md`: Section 5.C.1, 7)

## 2. Test Strategy: London School of TDD

This test plan adopts the London School of Test-Driven Development (TDD) principles, emphasizing interaction-based testing. The core tenets of this strategy are:

*   **Interaction-Based Testing:** Tests will focus on verifying the behavior of a unit (e.g., a UI component, a service layer) by observing its interactions with its collaborators, rather than inspecting its internal state. This ensures that the unit correctly fulfills its responsibilities by sending the right messages to the right collaborators at the right time.
*   **Mocking Collaborators:** External dependencies and collaborators (e.g., communication services, hardware interfaces) will be mocked or stubbed. This isolates the unit under test, making tests faster, more reliable, and less prone to external system failures. Mocks will be used to define expected interactions and verify that these interactions occurred as anticipated.
*   **Verifying Observable Outcomes:** The success of a test case will be determined by observable outcomes, such as specific method calls on mocked collaborators, changes in the unit's public API, or emitted events, rather than direct inspection of private fields or complex internal logic. This approach ensures that the tests validate the *contract* of the unit.

## 3. Recursive Testing Strategy (Frequent Regression)

A comprehensive recursive testing strategy is crucial to ensure ongoing stability and catch regressions early as the system evolves towards passing high-level acceptance tests. This strategy involves frequent re-execution of test suites or subsets thereof based on various Software Development Life Cycle (SDLC) touch points.

### 3.1. Triggers for Re-running Tests

*   **Unit/Component Level (Continuous Integration - CI):**
    *   **Trigger:** Every code commit to a feature branch.
    *   **Scope:** All unit tests related to the changed module and its direct dependencies.
    *   **Purpose:** Immediate feedback on code changes, ensuring no new bugs are introduced at the lowest level.
*   **Feature/Module Level (Pre-Merge/Pull Request - PR):**
    *   **Trigger:** Before merging a feature branch into a development branch (e.g., `develop`).
    *   **Scope:** All unit tests for the feature, plus relevant integration tests for the feature's interactions with its immediate collaborators.
    *   **Purpose:** Verify the feature's functionality and its integration within its module before broader integration.
*   **Integration Level (Daily/Nightly Builds):**
    *   **Trigger:** Daily or nightly automated builds on the `develop` branch.
    *   **Scope:** All integration tests across the system, focusing on interactions between different modules and services.
    *   **Purpose:** Catch integration issues early, identify breaking changes between modules.
*   **System/Regression Level (Weekly/Pre-Release):**
    *   **Trigger:** Weekly builds, before major feature freezes, or prior to release candidates.
    *   **Scope:** A comprehensive suite of critical path integration tests, high-level acceptance tests (if applicable at this stage), and a selection of performance/security tests. This includes all tests tagged as `critical` or `regression`.
    *   **Purpose:** Ensure overall system stability, performance, and security, and that no regressions have been introduced across the entire application.
*   **Full Regression (Major Release/Critical Bug Fix):**
    *   **Trigger:** Before a major release, after significant architectural changes, or following a critical bug fix.
    *   **Scope:** All unit, integration, and high-level acceptance tests.
    *   **Purpose:** Provide the highest level of confidence in the system's stability and correctness before deployment.

### 3.2. Test Prioritization and Tagging

Tests will be tagged to facilitate selective execution and prioritization:

*   `@unit`: For isolated unit tests.
*   `@integration`: For tests verifying interactions between components/modules.
*   `@manual_control`: Specific to the Manual Control Mode feature.
*   `@critical`: Tests covering core, high-impact functionalities.
*   `@regression`: Tests that are part of the regular regression suite.
*   `@performance`: Tests focused on response times and efficiency.
*   `@security`: Tests verifying security aspects.

### 3.3. Test Subset Selection for Regression

Test runners will be configured to execute tests based on tags:

*   **CI:** Run tests tagged `@unit` for changed files.
*   **PR:** Run tests tagged `@unit` and `@integration` for the feature, plus `@critical` tests.
*   **Daily/Nightly:** Run all tests tagged `@integration`.
*   **Weekly/Pre-Release:** Run all tests tagged `@regression`, `@critical`, and `@manual_control`.
*   **Full Regression:** Run all tests.

## 4. Test Cases: Mobile App Manual Control Mode

Each test case is designed to verify a specific aspect of the "Mobile App Manual Control Mode" feature, directly mapping to the defined AI Verifiable End Results.

---

### Test Case 4.1: Virtual Joystick - Forward Movement

*   **Test Case ID:** `TC-MCM-001`
*   **AI Verifiable End Result Targeted:** `AVR-MCM-1: Virtual Joystick Responsiveness`
*   **Unit Under Test:** `ManualControlViewModel` (or equivalent component responsible for handling joystick input and sending commands)
*   **Interactions to Test:** User drags the virtual joystick forward.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService`: Mock this service to simulate sending commands to the tractor.
    *   `TractorStatusService`: Mock to provide initial tractor status (e.g., `Idle`, `ManualMode`).
*   **Expected Mock Interactions:**
    *   `TractorCommunicationService.sendCommand('MOVE_FORWARD', { speed: <manual_mode_speed> })` should be called.
*   **Observable Outcome:**
    *   The `ManualControlViewModel`'s internal state (e.g., `currentCommand`) reflects `MOVE_FORWARD`.
    *   The `TractorCommunicationService.sendCommand` method is invoked with the correct command and speed.
*   **Test Data & Mock Configurations:**
    *   `manual_mode_speed`: A predefined slow speed value (e.g., 3 km/h).
    *   `TractorStatusService` mock configured to return `status: 'ManualMode'`.
*   **Recursive Testing Scope:** `@unit`, `@manual_control`, `@regression`
*   **AI Verifiable Completion Criterion:** Verification that `TractorCommunicationService.sendCommand` was called exactly once with `('MOVE_FORWARD', { speed: <manual_mode_speed> })` within the expected response time (e.g., 1-2 seconds).

---

### Test Case 4.2: Virtual Joystick - Backward Movement

*   **Test Case ID:** `TC-MCM-002`
*   **AI Verifiable End Result Targeted:** `AVR-MCM-1: Virtual Joystick Responsiveness`
*   **Unit Under Test:** `ManualControlViewModel`
*   **Interactions to Test:** User drags the virtual joystick backward.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService`
    *   `TractorStatusService`
*   **Expected Mock Interactions:**
    *   `TractorCommunicationService.sendCommand('MOVE_BACKWARD', { speed: <manual_mode_speed> })` should be called.
*   **Observable Outcome:**
    *   The `ManualControlViewModel`'s internal state reflects `MOVE_BACKWARD`.
    *   `TractorCommunicationService.sendCommand` is invoked with the correct command and speed.
*   **Test Data & Mock Configurations:**
    *   `manual_mode_speed`: A predefined slow speed value.
    *   `TractorStatusService` mock configured to return `status: 'ManualMode'`.
*   **Recursive Testing Scope:** `@unit`, `@manual_control`, `@regression`
*   **AI Verifiable Completion Criterion:** Verification that `TractorCommunicationService.sendCommand` was called exactly once with `('MOVE_BACKWARD', { speed: <manual_mode_speed> })` within the expected response time.

---

### Test Case 4.3: Virtual Joystick - Left Turn

*   **Test Case ID:** `TC-MCM-003`
*   **AI Verifiable End Result Targeted:** `AVR-MCM-1: Virtual Joystick Responsiveness`
*   **Unit Under Test:** `ManualControlViewModel`
*   **Interactions to Test:** User drags the virtual joystick left.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService`
    *   `TractorStatusService`
*   **Expected Mock Interactions:**
    *   `TractorCommunicationService.sendCommand('TURN_LEFT', { angle: <turn_angle_value> })` should be called.
*   **Observable Outcome:**
    *   The `ManualControlViewModel`'s internal state reflects `TURN_LEFT`.
    *   `TractorCommunicationService.sendCommand` is invoked with the correct command and angle.
*   **Test Data & Mock Configurations:**
    *   `turn_angle_value`: A predefined turn angle (e.g., 15 degrees).
    *   `TractorStatusService` mock configured to return `status: 'ManualMode'`.
*   **Recursive Testing Scope:** `@unit`, `@manual_control`, `@regression`
*   **AI Verifiable Completion Criterion:** Verification that `TractorCommunicationService.sendCommand` was called exactly once with `('TURN_LEFT', { angle: <turn_angle_value> })` within the expected response time.

---

### Test Case 4.4: Virtual Joystick - Right Turn

*   **Test Case ID:** `TC-MCM-004`
*   **AI Verifiable End Result Targeted:** `AVR-MCM-1: Virtual Joystick Responsiveness`
*   **Unit Under Test:** `ManualControlViewModel`
*   **Interactions to Test:** User drags the virtual joystick right.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService`
    *   `TractorStatusService`
*   **Expected Mock Interactions:**
    *   `TractorCommunicationService.sendCommand('TURN_RIGHT', { angle: <turn_angle_value> })` should be called.
*   **Observable Outcome:**
    *   The `ManualControlViewModel`'s internal state reflects `TURN_RIGHT`.
    *   `TractorCommunicationService.sendCommand` is invoked with the correct command and angle.
*   **Test Data & Mock Configurations:**
    *   `turn_angle_value`: A predefined turn angle (e.g., 15 degrees).
    *   `TractorStatusService` mock configured to return `status: 'ManualMode'`.
*   **Recursive Testing Scope:** `@unit`, `@manual_control`, `@regression`
*   **AI Verifiable Completion Criterion:** Verification that `TractorCommunicationService.sendCommand` was called exactly once with `('TURN_RIGHT', { angle: <turn_angle_value> })` within the expected response time.

---

### Test Case 4.5: Engage Cutter Button

*   **Test Case ID:** `TC-MCM-005`
*   **AI Verifiable End Result Targeted:** `AVR-MCM-2: Cutter Engagement/Disengagement`
*   **Unit Under Test:** `ManualControlViewModel`
*   **Interactions to Test:** User taps the "Engage Cutter" button.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService`
    *   `TractorStatusService`
*   **Expected Mock Interactions:**
    *   `TractorCommunicationService.sendCommand('ENGAGE_CUTTER')` should be called.
*   **Observable Outcome:**
    *   The `ManualControlViewModel`'s `cutterStatus` property (or equivalent) changes to `ENGAGED`.
    *   `TractorCommunicationService.sendCommand` is invoked with the correct command.
*   **Test Data & Mock Configurations:**
    *   `TractorStatusService` mock configured to return `status: 'ManualMode'` and initial `cutterStatus: 'DISENGAGED'`.
*   **Recursive Testing Scope:** `@unit`, `@manual_control`, `@regression`
*   **AI Verifiable Completion Criterion:** Verification that `TractorCommunicationService.sendCommand` was called exactly once with `('ENGAGE_CUTTER')` and that the `cutterStatus` observable property of the `ManualControlViewModel` transitions to `ENGAGED`.

---

### Test Case 4.6: Disengage Cutter Button

*   **Test Case ID:** `TC-MCM-006`
*   **AI Verifiable End Result Targeted:** `AVR-MCM-2: Cutter Engagement/Disengagement`
*   **Unit Under Test:** `ManualControlViewModel`
*   **Interactions to Test:** User taps the "Disengage Cutter" button.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService`
    *   `TractorStatusService`
*   **Expected Mock Interactions:**
    *   `TractorCommunicationService.sendCommand('DISENGAGE_CUTTER')` should be called.
*   **Observable Outcome:**
    *   The `ManualControlViewModel`'s `cutterStatus` property changes to `DISENGAGED`.
    *   `TractorCommunicationService.sendCommand` is invoked with the correct command.
*   **Test Data & Mock Configurations:**
    *   `TractorStatusService` mock configured to return `status: 'ManualMode'` and initial `cutterStatus: 'ENGAGED'`.
*   **Recursive Testing Scope:** `@unit`, `@manual_control`, `@regression`
*   **AI Verifiable Completion Criterion:** Verification that `TractorCommunicationService.sendCommand` was called exactly once with `('DISENGAGE_CUTTER')` and that the `cutterStatus` observable property of the `ManualControlViewModel` transitions to `DISENGAGED`.

---

### Test Case 4.7: Engage Loader Button

*   **Test Case ID:** `TC-MCM-007`
*   **AI Verifiable End Result Targeted:** `AVR-MCM-3: Loader Engagement/Disengagement`
*   **Unit Under Test:** `ManualControlViewModel`
*   **Interactions to Test:** User taps the "Engage Loader" button.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService`
    *   `TractorStatusService`
*   **Expected Mock Interactions:**
    *   `TractorCommunicationService.sendCommand('ENGAGE_LOADER')` should be called.
*   **Observable Outcome:**
    *   The `ManualControlViewModel`'s `loaderStatus` property changes to `ENGAGED`.
    *   `TractorCommunicationService.sendCommand` is invoked with the correct command.
*   **Test Data & Mock Configurations:**
    *   `TractorStatusService` mock configured to return `status: 'ManualMode'` and initial `loaderStatus: 'DISENGAGED'`.
*   **Recursive Testing Scope:** `@unit`, `@manual_control`, `@regression`
*   **AI Verifiable Completion Criterion:** Verification that `TractorCommunicationService.sendCommand` was called exactly once with `('ENGAGE_LOADER')` and that the `loaderStatus` observable property of the `ManualControlViewModel` transitions to `ENGAGED`.

---

### Test Case 4.8: Disengage Loader Button

*   **Test Case ID:** `TC-MCM-008`
*   **AI Verifiable End Result Targeted:** `AVR-MCM-3: Loader Engagement/Disengagement`
*   **Unit Under Test:** `ManualControlViewModel`
*   **Interactions to Test:** User taps the "Disengage Loader" button.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService`
    *   `TractorStatusService`
*   **Expected Mock Interactions:**
    *   `TractorCommunicationService.sendCommand('DISENGAGE_LOADER')` should be called.
*   **Observable Outcome:**
    *   The `ManualControlViewModel`'s `loaderStatus` property changes to `DISENGAGED`.
    *   `TractorCommunicationService.sendCommand` is invoked with the correct command.
*   **Test Data & Mock Configurations:**
    *   `TractorStatusService` mock configured to return `status: 'ManualMode'` and initial `loaderStatus: 'ENGAGED'`.
*   **Recursive Testing Scope:** `@unit`, `@manual_control`, `@regression`
*   **AI Verifiable Completion Criterion:** Verification that `TractorCommunicationService.sendCommand` was called exactly once with `('DISENGAGE_LOADER')` and that the `loaderStatus` observable property of the `ManualControlViewModel` transitions to `DISENGAGED`.

---

### Test Case 4.9: Speed Limitation in Manual Mode

*   **Test Case ID:** `TC-MCM-009`
*   **AI Verifiable End Result Targeted:** `AVR-MCM-4: Safety Interlock - Speed Limitation`
*   **Unit Under Test:** `ManualControlViewModel`
*   **Interactions to Test:** User drags the virtual joystick to maximum forward input.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService`
    *   `TractorStatusService`
*   **Expected Mock Interactions:**
    *   `TractorCommunicationService.sendCommand('MOVE_FORWARD', { speed: <manual_mode_speed_limit> })` should be called, where `<manual_mode_speed_limit>` is the enforced maximum speed.
*   **Observable Outcome:**
    *   The `TractorCommunicationService.sendCommand` method is invoked with the speed parameter capped at the defined `manual_mode_speed_limit`, regardless of the joystick's maximum input value.
*   **Test Data & Mock Configurations:**
    *   `manual_mode_speed_limit`: A predefined maximum safe speed for manual mode (e.g., 3 km/h).
    *   `TractorStatusService` mock configured to return `status: 'ManualMode'`.
*   **Recursive Testing Scope:** `@unit`, `@manual_control`, `@critical`, `@regression`
*   **AI Verifiable Completion Criterion:** Verification that `TractorCommunicationService.sendCommand` was called with a `speed` parameter that does not exceed `manual_mode_speed_limit`, even when the joystick input represents a higher desired speed.

---

### Test Case 4.10: Stable Communication Link - Command Transmission

*   **Test Case ID:** `TC-MCM-010`
*   **AI Verifiable End Result Targeted:** `AVR-MCM-5: Stable Communication Link`
*   **Unit Under Test:** `TractorCommunicationService` (or the underlying communication module)
*   **Interactions to Test:** Repeatedly send manual control commands (e.g., joystick movements, button presses) over a simulated stable connection.
*   **Collaborators to Mock:**
    *   `BluetoothAdapter` / `WiFiDirectService`: Mock to simulate a stable, connected communication channel.
*   **Expected Mock Interactions:**
    *   `BluetoothAdapter.sendData(command)` or `WiFiDirectService.sendData(command)` should be called consistently without errors for a defined period.
*   **Observable Outcome:**
    *   All commands sent by the `TractorCommunicationService` are successfully received by the mocked communication layer without dropped packets or connection errors.
    *   The `TractorCommunicationService` does not report connection loss or command transmission failures.
*   **Test Data & Mock Configurations:**
    *   Simulated stable connection environment.
    *   Mock `BluetoothAdapter` or `WiFiDirectService` to always return success on `sendData` and maintain a connected state.
*   **Recursive Testing Scope:** `@integration`, `@manual_control`, `@critical`, `@regression`, `@performance`
*   **AI Verifiable Completion Criterion:** Verification that a sequence of N commands (e.g., N=100) sent by the `TractorCommunicationService` are all successfully transmitted to the mocked communication layer within expected latency, and no connection error events are emitted by the service.

---

### Test Case 4.11: Stable Communication Link - Status Reception

*   **Test Case ID:** `TC-MCM-011`
*   **AI Verifiable End Result Targeted:** `AVR-MCM-5: Stable Communication Link`
*   **Unit Under Test:** `TractorStatusService` (or the underlying communication module)
*   **Interactions to Test:** Simulate continuous status updates from the tractor over a stable connection.
*   **Collaborators to Mock:**
    *   `BluetoothAdapter` / `WiFiDirectService`: Mock to simulate receiving data from the tractor.
*   **Expected Mock Interactions:**
    *   The mocked communication layer should continuously emit simulated tractor status data.
*   **Observable Outcome:**
    *   The `TractorStatusService` consistently receives and processes status updates (e.g., `status`, `currentLocation`, `batteryLevel`) without interruption or data corruption.
    *   The `TractorStatusService` does not report connection loss or data reception failures.
*   **Test Data & Mock Configurations:**
    *   Simulated stable connection environment.
    *   Mock `BluetoothAdapter` or `WiFiDirectService` to continuously emit valid tractor status JSON payloads at a regular interval (e.g., every 500ms).
*   **Recursive Testing Scope:** `@integration`, `@manual_control`, `@critical`, `@regression`, `@performance`
*   **AI Verifiable Completion Criterion:** Verification that the `TractorStatusService` successfully processes a sequence of N status updates (e.g., N=100) from the mocked communication layer, and that the observable status properties (e.g., `tractorStatus.status`, `tractorStatus.location`) are updated correctly and consistently.

---

### Test Case 4.12: Secure Communication - Unauthorized Access Prevention

*   **Test Case ID:** `TC-MCM-012`
*   **AI Verifiable End Result Targeted:** `AVR-MCM-6: Secure Communication`
*   **Unit Under Test:** `TractorCommunicationService` (specifically its connection/pairing mechanism)
*   **Interactions to Test:** Attempt to establish a connection and send commands from an unauthorized/unpaired device.
*   **Collaborators to Mock:**
    *   `BluetoothAdapter` / `WiFiDirectService`: Mock to simulate connection attempts and data reception from unauthorized sources.
    *   `SecurityModule` (if applicable): Mock to simulate authentication/authorization checks.
*   **Expected Mock Interactions:**
    *   `BluetoothAdapter.attemptConnection(unauthorized_device_id)` should fail or be rejected.
    *   `SecurityModule.authenticate(device_id)` should return `false` for unauthorized devices.
*   **Observable Outcome:**
    *   The `TractorCommunicationService` rejects connection attempts from unauthorized devices.
    *   No commands from unauthorized sources are processed or forwarded to the tractor.
    *   An appropriate error or rejection event is emitted by the `TractorCommunicationService`.
*   **Test Data & Mock Configurations:**
    *   `unauthorized_device_id`: A simulated device ID that is not paired or authorized.
    *   Mock `BluetoothAdapter` / `WiFiDirectService` to simulate connection requests from this ID.
    *   Mock `SecurityModule` to enforce authorization rules.
*   **Recursive Testing Scope:** `@integration`, `@security`, `@critical`, `@full_regression`
*   **AI Verifiable Completion Criterion:** Verification that the `TractorCommunicationService` explicitly rejects connection attempts or discards commands originating from `unauthorized_device_id`, and that no `sendCommand` calls are made to the tractor's control system as a result of these unauthorized attempts.

---

### Test Case 4.13: App Status Reflection - Manual Mode Active

*   **Test Case ID:** `TC-MCM-013`
*   **AI Verifiable End Result Targeted:** `AVR-MCM-7: App Status Reflection`
*   **Unit Under Test:** `ManualControlViewModel` (and associated UI components)
*   **Interactions to Test:** Tractor enters manual control mode (simulated via status update).
*   **Collaborators to Mock:**
    *   `TractorStatusService`: Mock to emit a status update indicating `ManualMode`.
*   **Expected Mock Interactions:**
    *   `TractorStatusService` emits a status update with `status: 'ManualMode'`.
*   **Observable Outcome:**
    *   The `ManualControlViewModel`'s `tractorStatus` observable property updates to `ManualMode`.
    *   The UI (e.g., a status indicator on the screen) visually reflects "Manual Mode" or similar.
*   **Test Data & Mock Configurations:**
    *   `TractorStatusService` mock configured to emit `{ status: 'ManualMode', currentLocation: { lat: 12.34, lon: 56.78 }, batteryLevel: 75 }`.
*   **Recursive Testing Scope:** `@unit`, `@manual_control`, `@regression`
*   **AI Verifiable Completion Criterion:** Verification that the `ManualControlViewModel`'s `tractorStatus` property is observed to be `ManualMode` after the mocked `TractorStatusService` emits the corresponding status update.

---

### Test Case 4.14: App Status Reflection - Real-time Location Update

*   **Test Case ID:** `TC-MCM-014`
*   **AI Verifiable End Result Targeted:** `AVR-MCM-7: App Status Reflection`
*   **Unit Under Test:** `ManualControlViewModel` (and associated UI components, e.g., map display)
*   **Interactions to Test:** Tractor sends continuous location updates while in manual mode.
*   **Collaborators to Mock:**
    *   `TractorStatusService`: Mock to emit a sequence of location updates.
*   **Expected Mock Interactions:**
    *   `TractorStatusService` emits multiple status updates with varying `currentLocation` values.
*   **Observable Outcome:**
    *   The `ManualControlViewModel`'s `currentLocation` observable property updates in real-time with each new location received.
    *   The UI (e.g., tractor icon on a map) visually moves according to the received coordinates.
*   **Test Data & Mock Configurations:**
    *   `TractorStatusService` mock configured to emit a series of `{ status: 'ManualMode', currentLocation: { lat: X, lon: Y }, batteryLevel: Z }` payloads, where X and Y change incrementally.
*   **Recursive Testing Scope:** `@unit`, `@manual_control`, `@regression`, `@performance`
*   **AI Verifiable Completion Criterion:** Verification that the `ManualControlViewModel`'s `currentLocation` property is updated to match each `currentLocation` value emitted by the mocked `TractorStatusService` within a defined latency (e.g., < 500ms per update).

---

### Test Case 4.15: App Status Reflection - Battery Level Update

*   **Test Case ID:** `TC-MCM-015`
*   **AI Verifiable End Result Targeted:** `AVR-MCM-7: App Status Reflection`
*   **Unit Under Test:** `ManualControlViewModel` (and associated UI components)
*   **Interactions to Test:** Tractor sends battery level updates.
*   **Collaborators to Mock:**
    *   `TractorStatusService`: Mock to emit battery level updates.
*   **Expected Mock Interactions:**
    *   `TractorStatusService` emits status updates with varying `batteryLevel` values.
*   **Observable Outcome:**
    *   The `ManualControlViewModel`'s `batteryLevel` observable property updates with each new battery level received.
    *   The UI (e.g., battery indicator) visually reflects the updated level.
*   **Test Data & Mock Configurations:**
    *   `TractorStatusService` mock configured to emit a series of `{ status: 'ManualMode', currentLocation: { lat: X, lon: Y }, batteryLevel: Z }` payloads, where Z changes (e.g., 75, 74, 73).
*   **Recursive Testing Scope:** `@unit`, `@manual_control`, `@regression`
*   **AI Verifiable Completion Criterion:** Verification that the `ManualControlViewModel`'s `batteryLevel` property is updated to match each `batteryLevel` value emitted by the mocked `TractorStatusService`.

---

This test plan provides a comprehensive framework for testing the "Mobile App Manual Control Mode" feature, aligning with London School TDD principles and incorporating a robust recursive testing strategy. Every test case is designed with AI verifiable completion criteria, ensuring clear and objective assessment of the feature's implementation.