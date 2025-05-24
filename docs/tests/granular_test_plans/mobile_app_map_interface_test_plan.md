# Granular Test Plan: Mobile App Map Interface & Point Definition

## 1. Introduction

### 1.1. Feature Overview
The "Mobile App Map Interface & Point Definition" feature enables users to interact with a map within the Sevak mobile application to define key operational areas for the autonomous mini-tractor. This includes drawing polygonal cutting areas, setting specific drop-off locations for fodder, and designating a home base for the tractor. Furthermore, it encompasses the functionality to initiate these defined tasks and monitor the tractor's real-time status and location throughout its autonomous operation. This feature is crucial for providing an intuitive and user-friendly interface for task management, directly addressing the user's need for easy control over the Sevak system.

### 1.2. Purpose of this Document
This document outlines a detailed granular test plan for the "Mobile App Map Interface & Point Definition" feature. It specifies the testing approach, individual test cases, and a comprehensive recursive testing strategy. The plan adheres strictly to London School Test-Driven Development (TDD) principles, focusing on interaction-based testing and the strategic mocking of collaborators to verify observable outcomes. Each test case is designed with AI verifiable completion criteria to ensure clear and unambiguous validation of functionality.

### 1.3. Alignment with PRDMasterPlan.md and High-Level Acceptance Tests
This granular test plan directly aligns with and aims to verify the AI Verifiable End Results outlined in `docs/PRDMasterPlan.md`, specifically within Section 5.A: "Autonomous Fodder Cutting & Transport Task Management (Mobile App & Tractor)". By ensuring these granular requirements are met, this plan contributes to the successful achievement of higher-level acceptance tests, such as "Task Management UI/UX" and "Full System Integration & Launch Readiness," which are broad user-centric verifications of complete system flows.

## 2. Test Scope: AI Verifiable End Results

This test plan targets the following AI Verifiable End Results from `docs/PRDMasterPlan.md`:

*   **5.A.1: Define Cutting Area (Mobile App)**
    *   **Acceptance Criteria:**
        *   User can successfully draw and save a valid polygonal cutting area on the map.
        *   The defined area's coordinates are stored correctly.
        *   The app prevents creation of invalid polygons (e.g., self-intersecting, if problematic for path planning).
*   **5.A.2: Set Drop-off Location (Mobile App)**
    *   **Acceptance Criteria:**
        *   User can successfully set and save a drop-off location pin on the map.
        *   The location's coordinates are stored correctly.
*   **5.A.3: Set Home Base Location (Mobile App - Optional for task, but needed for "Return Home")**
    *   **Acceptance Criteria:**
        *   User can set and save a home base location.
*   **5.A.4: Initiate Task & Monitor (Mobile App & Tractor)**
    *   **Acceptance Criteria:**
        *   User can successfully initiate a defined task from the app.
        *   Tractor receives task parameters and begins autonomous operation.
        *   App accurately reflects tractor status and location throughout the task.
        *   User receives notification upon task completion or critical events.

## 3. Test Strategy: London School of TDD

The testing strategy for the "Mobile App Map Interface & Point Definition" feature will strictly follow the London School of Test-Driven Development (TDD). This approach emphasizes interaction-based testing, where the focus is on verifying the behavior of a unit (e.g., a component, a service) by observing its interactions with its collaborators, rather than inspecting its internal state.

Key principles applied:
*   **Interaction Testing:** Tests will assert that the Unit Under Test (UUT) makes specific calls to its dependencies (collaborators) with the correct arguments, and that it reacts appropriately to responses from these collaborators.
*   **Mocking Collaborators:** External dependencies and collaborators (e.g., `MapService`, `TractorCommunicationService`, `LocalStorageService`, `NotificationService`) will be replaced with mock objects. These mocks will be configured to simulate specific behaviors and record interactions, allowing for isolated testing of the UUT's logic and its communication patterns.
*   **Observable Outcomes:** Tests will verify observable outcomes, such as:
    *   A specific method being called on a mocked service.
    *   An event being emitted by the UUT.
    *   A UI element being rendered or updated based on data received or actions performed.
    *   Data being passed correctly between the UUT and its collaborators.
This approach ensures that tests are robust, maintainable, and provide clear feedback on the unit's adherence to its defined responsibilities and interactions within the system architecture.

## 4. Recursive Testing Strategy (Frequent Regression)

A comprehensive recursive testing strategy is crucial to ensure the ongoing stability and quality of the Sevak mobile application as it evolves. This strategy defines when and how tests should be re-executed to catch regressions early and maintain system integrity.

### 4.1. SDLC Touchpoints for Re-execution

Test suites or subsets thereof will be re-executed at the following Software Development Life Cycle (SDLC) touchpoints:

*   **On Every Commit/Pull Request (PR):** Fast-running unit and integration tests directly related to the changed code. This provides immediate feedback to developers.
*   **Before Merging Feature Branches:** A more comprehensive set of integration and core regression tests for the specific feature's domain to ensure the new feature integrates correctly and doesn't break existing functionality within its scope.
*   **At Sprint End/Milestone Completion:** A broader `regression-core` suite covering critical paths and key functionalities across the entire system to validate overall stability.
*   **Before Release Candidate Generation:** A full `regression-full` suite, including all unit, integration, and end-to-end tests, to ensure the entire system is stable and ready for deployment.
*   **After Critical Bug Fixes:** Targeted re-execution of tests related to the bug, plus relevant `regression-core` tests to confirm the fix and prevent new regressions.

### 4.2. Test Prioritization and Tagging

Tests will be prioritized and tagged to facilitate efficient selection for different regression scopes:

*   `@unit`: Highly isolated tests, verifying individual functions or small classes without external dependencies (or with trivial mocks). These are very fast.
*   `@integration`: Tests verifying interactions between a UUT and its immediate collaborators, where collaborators are mocked. These are fast but provide more behavioral coverage.
*   `@regression-core`: Tests covering critical user flows and core functionalities. These are essential for system stability and are run frequently.
*   `@regression-full`: All tests, including less frequently run edge cases and comprehensive scenarios.

### 4.3. Test Subset Selection for Regression Triggers

*   **Commit/PR:** Run tests tagged `@unit` and `@integration` within the modified module(s) or related components.
    *   *AI Verifiable Criterion:* CI/CD pipeline executes `jest --findRelatedTests <changed_files> --testTag=@unit --testTag=@integration`.
*   **Feature Branch Merge:** Execute tests tagged `@integration` and `@regression-core` relevant to the feature's domain.
    *   *AI Verifiable Criterion:* CI/CD pipeline executes `jest --testTag=@integration --testTag=@regression-core --testPathPattern=<feature_specific_paths>`.
*   **Sprint End/Milestone:** Execute all tests tagged `@regression-core`.
    *   *AI Verifiable Criterion:* CI/CD pipeline executes `jest --testTag=@regression-core`.
*   **Release Candidate:** Execute all tests tagged `@regression-full`.
    *   *AI Verifiable Criterion:* CI/CD pipeline executes `jest --testTag=@regression-full`.
*   **Critical Bug Fixes:** Execute specific tests related to the bug, plus all tests tagged `@regression-core`.
    *   *AI Verifiable Criterion:* CI/CD pipeline executes `jest <bug_related_test_files> --testTag=@regression-core`.

## 5. Detailed Test Cases

This section details the granular test cases for the "Mobile App Map Interface & Point Definition" feature, adhering to London School TDD principles and mapping directly to the AI Verifiable End Results from `docs/PRDMasterPlan.md`.

**Assumed Collaborators/Services:**
*   `MapService`: Handles map interactions (drawing, pinning, coordinate conversion).
*   `TaskService`: Manages task data (saving, loading, validating polygons/points).
*   `TractorCommunicationService`: Communicates with the physical tractor (sending commands, receiving status).
*   `NotificationService`: Handles in-app and push notifications.
*   `LocalStorageService`: For offline data persistence.

---

### 5.1. Define Cutting Area (PRDMasterPlan.md: 5.A.1)

#### Test Case: MAP-001 - Successful Polygon Drawing and Saving

*   **AI Verifiable End Result Targeted:** `PRDMasterPlan.md:5.A.1` - "User can successfully draw and save a valid polygonal cutting area on the map." and "The defined area's coordinates are stored correctly."
*   **Unit Under Test (UUT):** `MapInteractionComponent` (or `MapDrawingService` if separated).
*   **Interactions to Test on the Unit:**
    *   User interaction simulating tapping on the map to define vertices.
    *   Calling a `savePolygon` method on the UUT.
*   **Collaborators to Mock:**
    *   `MapService`: To simulate map taps and return coordinates.
    *   `TaskService`: To verify `saveCuttingArea` is called with correct data.
    *   `LocalStorageService`: To verify data persistence.
*   **Expected Mock Interactions:**
    *   `MapService.onMapTap` is called multiple times, returning `[lat, lon]` coordinates.
    *   `TaskService.saveCuttingArea` is called once with a valid array of coordinates representing the polygon.
    *   `LocalStorageService.saveItem` is called with the serialized task data.
*   **Observable Outcome from UUT:**
    *   The `MapInteractionComponent` visually renders the polygon as points are tapped.
    *   Upon saving, a success message is displayed (e.g., via `NotificationService`).
    *   `TaskService.saveCuttingArea` is invoked with the correct polygon data.
*   **Test Data & Mock Configurations:**
    *   Mock `MapService` to return predefined `[lat, lon]` pairs for a simple square polygon.
    *   Mock `TaskService.saveCuttingArea` to be a spy, asserting it's called.
    *   Mock `LocalStorageService.saveItem` to be a spy.
*   **Recursive Testing Scope:** `@unit`, `@integration`, `@regression-core`

#### Test Case: MAP-002 - Invalid Polygon Prevention (Self-Intersecting)

*   **AI Verifiable End Result Targeted:** `PRDMasterPlan.md:5.A.1` - "The app prevents creation of invalid polygons (e.g., self-intersecting, if problematic for path planning)."
*   **Unit Under Test (UUT):** `MapInteractionComponent` / `TaskValidationService`.
*   **Interactions to Test on the Unit:**
    *   User interaction simulating tapping on the map to define self-intersecting vertices.
    *   Attempting to call `savePolygon` on the UUT.
*   **Collaborators to Mock:**
    *   `MapService`: To simulate map taps.
    *   `TaskService`: To verify `saveCuttingArea` is *not* called, or throws a validation error.
    *   `NotificationService`: To verify an error message is displayed.
*   **Expected Mock Interactions:**
    *   `MapService.onMapTap` is called with coordinates forming a self-intersecting polygon.
    *   `TaskService.saveCuttingArea` is *not* called, or `TaskService.validatePolygon` is called and returns `false`.
    *   `NotificationService.displayError` is called with an appropriate error message.
*   **Observable Outcome from UUT:**
    *   The `MapInteractionComponent` visually indicates the invalidity (e.g., red outline).
    *   An error notification is displayed to the user.
    *   The polygon is *not* saved.
*   **Test Data & Mock Configurations:**
    *   Mock `MapService` to return coordinates for a self-intersecting polygon.
    *   Mock `TaskService.saveCuttingArea` to be a spy, asserting it's *not* called.
    *   Mock `NotificationService.displayError` to be a spy.
*   **Recursive Testing Scope:** `@unit`, `@integration`, `@regression-core`

#### Test Case: MAP-003 - Polygon Adjustment/Clear

*   **AI Verifiable End Result Targeted:** Implicit in `PRDMasterPlan.md:5.A.1` - "User can adjust points or clear the polygon and restart."
*   **Unit Under Test (UUT):** `MapInteractionComponent`.
*   **Interactions to Test on the Unit:**
    *   User interaction simulating dragging a vertex to adjust.
    *   User interaction simulating clicking a "Clear" button.
*   **Collaborators to Mock:**
    *   `MapService`: To simulate drag events or clear commands.
*   **Expected Mock Interactions:**
    *   `MapService.onVertexDrag` is called with new coordinates.
    *   `MapService.clearDrawing` is called.
*   **Observable Outcome from UUT:**
    *   The `MapInteractionComponent` visually updates the polygon shape.
    *   The `MapInteractionComponent` clears the drawn polygon from the map.
*   **Test Data & Mock Configurations:**
    *   Mock `MapService` to simulate drag events on existing polygon vertices.
    *   Mock `MapService` to simulate a clear command.
*   **Recursive Testing Scope:** `@unit`, `@integration`

---

### 5.2. Set Drop-off Location (PRDMasterPlan.md: 5.A.2)

#### Test Case: MAP-004 - Successful Drop-off Pin Placement and Saving

*   **AI Verifiable End Result Targeted:** `PRDMasterPlan.md:5.A.2` - "User can successfully set and save a drop-off location pin on the map." and "The location's coordinates are stored correctly."
*   **Unit Under Test (UUT):** `MapInteractionComponent` / `TaskDefinitionScreen`.
*   **Interactions to Test on the Unit:**
    *   User interaction simulating tapping on the map to place a pin.
    *   Calling a `saveDropOffLocation` method on the UUT.
*   **Collaborators to Mock:**
    *   `MapService`: To simulate map taps and return coordinates.
    *   `TaskService`: To verify `saveDropOffLocation` is called with correct data.
    *   `LocalStorageService`: To verify data persistence.
*   **Expected Mock Interactions:**
    *   `MapService.onMapTap` is called, returning `[lat, lon]` for the pin.
    *   `TaskService.saveDropOffLocation` is called once with the correct coordinates.
    *   `LocalStorageService.saveItem` is called with the serialized task data.
*   **Observable Outcome from UUT:**
    *   The `MapInteractionComponent` visually renders the pin on the map.
    *   Upon saving, a success message is displayed.
    *   `TaskService.saveDropOffLocation` is invoked with the correct location data.
*   **Test Data & Mock Configurations:**
    *   Mock `MapService` to return a specific `[lat, lon]` for the drop-off.
    *   Mock `TaskService.saveDropOffLocation` to be a spy.
    *   Mock `LocalStorageService.saveItem` to be a spy.
*   **Recursive Testing Scope:** `@unit`, `@integration`, `@regression-core`

#### Test Case: MAP-005 - Drop-off Pin Adjustment

*   **AI Verifiable End Result Targeted:** Implicit in `PRDMasterPlan.md:5.A.2` - "The pin can be dragged to adjust its position."
*   **Unit Under Test (UUT):** `MapInteractionComponent`.
*   **Interactions to Test on the Unit:**
    *   User interaction simulating dragging the placed pin to a new location.
*   **Collaborators to Mock:**
    *   `MapService`: To simulate drag events on the pin.
*   **Expected Mock Interactions:**
    *   `MapService.onPinDrag` is called with new `[lat, lon]` coordinates.
*   **Observable Outcome from UUT:**
    *   The `MapInteractionComponent` visually updates the pin's position on the map.
*   **Test Data & Mock Configurations:**
    *   Mock `MapService` to simulate a drag event from an initial `[lat, lon]` to a new `[lat, lon]`.
*   **Recursive Testing Scope:** `@unit`, `@integration`

---

### 5.3. Set Home Base Location (PRDMasterPlan.md: 5.A.3)

#### Test Case: MAP-006 - Successful Home Base Pin Placement and Saving

*   **AI Verifiable End Result Targeted:** `PRDMasterPlan.md:5.A.3` - "User can set and save a home base location."
*   **Unit Under Test (UUT):** `MapInteractionComponent` / `SettingsScreen`.
*   **Interactions to Test on the Unit:**
    *   User interaction simulating tapping on the map to place a home base pin.
    *   Calling a `saveHomeBaseLocation` method on the UUT.
*   **Collaborators to Mock:**
    *   `MapService`: To simulate map taps and return coordinates.
    *   `TaskService`: To verify `saveHomeBaseLocation` is called with correct data.
    *   `LocalStorageService`: To verify data persistence.
*   **Expected Mock Interactions:**
    *   `MapService.onMapTap` is called, returning `[lat, lon]` for the home base pin.
    *   `TaskService.saveHomeBaseLocation` is called once with the correct coordinates.
    *   `LocalStorageService.saveItem` is called with the serialized home base data.
*   **Observable Outcome from UUT:**
    *   The `MapInteractionComponent` visually renders the home base pin on the map.
    *   Upon saving, a success message is displayed.
    *   `TaskService.saveHomeBaseLocation` is invoked with the correct location data.
*   **Test Data & Mock Configurations:**
    *   Mock `MapService` to return a specific `[lat, lon]` for the home base.
    *   Mock `TaskService.saveHomeBaseLocation` to be a spy.
    *   Mock `LocalStorageService.saveItem` to be a spy.
*   **Recursive Testing Scope:** `@unit`, `@integration`, `@regression-core`

---

### 5.4. Initiate Task & Monitor (PRDMasterPlan.md: 5.A.4)

#### Test Case: MAP-007 - Successful Task Initiation (App to Tractor)

*   **AI Verifiable End Result Targeted:** `PRDMasterPlan.md:5.A.4` - "User can successfully initiate a defined task from the app." and "Tractor receives task parameters and begins autonomous operation."
*   **Unit Under Test (UUT):** `TaskManagementScreen` / `TaskInitiationService`.
*   **Interactions to Test on the Unit:**
    *   User interaction simulating clicking the "Start Task" button.
    *   The UUT calling a method to send task parameters to the tractor.
*   **Collaborators to Mock:**
    *   `TaskService`: To provide the defined cutting area, drop-off, and home base.
    *   `TractorCommunicationService`: To verify `sendTaskParameters` is called with correct data.
    *   `NotificationService`: To verify a "Command Sent" message is displayed.
*   **Expected Mock Interactions:**
    *   `TaskService.getDefinedTask` is called to retrieve the task details.
    *   `TractorCommunicationService.sendTaskParameters` is called once with the complete task object (polygon coordinates, drop-off coordinates, home base coordinates).
    *   `NotificationService.displayInfo` is called with a "Command Sent" message.
*   **Observable Outcome from UUT:**
    *   The "Start Task" button state changes (e.g., disabled, loading indicator).
    *   A confirmation message is displayed to the user.
    *   `TractorCommunicationService.sendTaskParameters` is invoked with the correct task data.
*   **Test Data & Mock Configurations:**
    *   Mock `TaskService.getDefinedTask` to return a predefined valid task object.
    *   Mock `TractorCommunicationService.sendTaskParameters` to be a spy.
    *   Mock `NotificationService.displayInfo` to be a spy.
*   **Recursive Testing Scope:** `@unit`, `@integration`, `@regression-core`

#### Test Case: MAP-008 - App Reflects Tractor Status: Navigating to Field

*   **AI Verifiable End Result Targeted:** `PRDMasterPlan.md:5.A.4` - "App accurately reflects tractor status and location throughout the task."
*   **Unit Under Test (UUT):** `StatusDisplayComponent` / `MapComponent`.
*   **Interactions to Test on the Unit:**
    *   The UUT receiving a status update from `TractorCommunicationService`.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService`: To simulate receiving a "Navigating to Field" status and updated location.
    *   `MapService`: To verify `updateTractorLocation` is called.
*   **Expected Mock Interactions:**
    *   `TractorCommunicationService.onStatusUpdate` (or similar event) emits a status object `{ status: 'Navigating to Field', location: [lat, lon] }`.
    *   `MapService.updateTractorLocation` is called with the new `[lat, lon]` coordinates.
*   **Observable Outcome from UUT:**
    *   The `StatusDisplayComponent` displays "Navigating to Field".
    *   The tractor icon on the `MapComponent` moves to the new location.
*   **Test Data & Mock Configurations:**
    *   Mock `TractorCommunicationService` to emit status updates with varying locations.
    *   Mock `MapService.updateTractorLocation` to be a spy.
*   **Recursive Testing Scope:** `@unit`, `@integration`, `@regression-core`

#### Test Case: MAP-009 - App Reflects Tractor Status: Cutting Fodder

*   **AI Verifiable End Result Targeted:** `PRDMasterPlan.md:5.A.4` - "App accurately reflects tractor status and location throughout the task."
*   **Unit Under Test (UUT):** `StatusDisplayComponent` / `MapComponent`.
*   **Interactions to Test on the Unit:**
    *   The UUT receiving a status update from `TractorCommunicationService`.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService`: To simulate receiving a "Cutting Fodder" status and updated location.
*   **Expected Mock Interactions:**
    *   `TractorCommunicationService.onStatusUpdate` emits a status object `{ status: 'Cutting Fodder', location: [lat, lon], progress: 0.5 }`.
*   **Observable Outcome from UUT:**
    *   The `StatusDisplayComponent` displays "Cutting Fodder" and potentially a progress indicator.
    *   The tractor icon on the `MapComponent` continues to move within the cutting area.
*   **Test Data & Mock Configurations:**
    *   Mock `TractorCommunicationService` to emit status updates with "Cutting Fodder" status and progress.
*   **Recursive Testing Scope:** `@unit`, `@integration`, `@regression-core`

#### Test Case: MAP-010 - App Reflects Tractor Status: Transporting Fodder

*   **AI Verifiable End Result Targeted:** `PRDMasterPlan.md:5.A.4` - "App accurately reflects tractor status and location throughout the task."
*   **Unit Under Test (UUT):** `StatusDisplayComponent` / `MapComponent`.
*   **Interactions to Test on the Unit:**
    *   The UUT receiving a status update from `TractorCommunicationService`.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService`: To simulate receiving a "Transporting Fodder" status and updated location.
*   **Expected Mock Interactions:**
    *   `TractorCommunicationService.onStatusUpdate` emits a status object `{ status: 'Transporting Fodder', location: [lat, lon] }`.
*   **Observable Outcome from UUT:**
    *   The `StatusDisplayComponent` displays "Transporting Fodder".
    *   The tractor icon on the `MapComponent` moves from the cutting area towards the drop-off location.
*   **Test Data & Mock Configurations:**
    *   Mock `TractorCommunicationService` to emit status updates with "Transporting Fodder" status and location updates.
*   **Recursive Testing Scope:** `@unit`, `@integration`, `@regression-core`

#### Test Case: MAP-011 - App Reflects Tractor Status: Awaiting Unloading

*   **AI Verifiable End Result Targeted:** `PRDMasterPlan.md:5.A.4` - "App accurately reflects tractor status and location throughout the task."
*   **Unit Under Test (UUT):** `StatusDisplayComponent` / `MapComponent`.
*   **Interactions to Test on the Unit:**
    *   The UUT receiving a status update from `TractorCommunicationService`.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService`: To simulate receiving an "Awaiting Unloading" status.
*   **Expected Mock Interactions:**
    *   `TractorCommunicationService.onStatusUpdate` emits a status object `{ status: 'Awaiting Unloading at [Drop-off Name]', location: [lat, lon] }`.
*   **Observable Outcome from UUT:**
    *   The `StatusDisplayComponent` displays "Awaiting Unloading at [Drop-off Name]".
    *   The tractor icon on the `MapComponent` is stationary at the drop-off location.
*   **Test Data & Mock Configurations:**
    *   Mock `TractorCommunicationService` to emit status updates with "Awaiting Unloading" status.
*   **Recursive Testing Scope:** `@unit`, `@integration`, `@regression-core`

#### Test Case: MAP-012 - Notification on Task Completion

*   **AI Verifiable End Result Targeted:** `PRDMasterPlan.md:5.A.4` - "User receives notification upon task completion or critical events."
*   **Unit Under Test (UUT):** `NotificationHandlerService` (or `TaskManagementScreen` if it handles notifications directly).
*   **Interactions to Test on the Unit:**
    *   The UUT receiving a task completion event from `TractorCommunicationService`.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService`: To simulate a task completion event.
    *   `NotificationService`: To verify `sendNotification` is called.
*   **Expected Mock Interactions:**
    *   `TractorCommunicationService.onTaskCompletion` (or similar event) emits a task completion signal.
    *   `NotificationService.sendNotification` is called with a message like "Task Completed: [Task Name]".
*   **Observable Outcome from UUT:**
    *   A notification is triggered (e.g., a toast message in the app, or a simulated push notification).
*   **Test Data & Mock Configurations:**
    *   Mock `TractorCommunicationService` to emit a task completion event.
    *   Mock `NotificationService.sendNotification` to be a spy.
*   **Recursive Testing Scope:** `@unit`, `@integration`, `@regression-core`

#### Test Case: MAP-013 - Notification on Critical Event (e.g., Obstacle)

*   **AI Verifiable End Result Targeted:** `PRDMasterPlan.md:5.A.4` - "User receives notification upon task completion or critical events."
*   **Unit Under Test (UUT):** `NotificationHandlerService`.
*   **Interactions to Test on the Unit:**
    *   The UUT receiving a critical event (e.g., obstacle detected) from `TractorCommunicationService`.
*   **Collaborators to Mock:**
    *   `TractorCommunicationService`: To simulate an obstacle detection event.
    *   `NotificationService`: To verify `sendNotification` is called.
*   **Expected Mock Interactions:**
    *   `TractorCommunicationService.onCriticalEvent` (or similar) emits an event with type 'ObstacleDetected' and location.
    *   `NotificationService.sendNotification` is called with an appropriate error message (e.g., "Obstacle Detected at [Location]").
*   **Observable Outcome from UUT:**
    *   A critical notification is triggered.
    *   The app's status display updates to reflect the error state.
*   **Test Data & Mock Configurations:**
    *   Mock `TractorCommunicationService` to emit an obstacle detection event with specific coordinates.
    *   Mock `NotificationService.sendNotification` to be a spy.
*   **Recursive Testing Scope:** `@unit`, `@integration`, `@regression-core`

#### Test Case: MAP-014 - User Instructs Tractor to Return Home

*   **AI Verifiable End Result Targeted:** Implicit in `PRDMasterPlan.md:5.A.4` - "Farmer can then instruct Sevak via app to 'Return Home' or start another predefined task."
*   **Unit Under Test (UUT):** `TaskManagementScreen` / `TaskInitiationService`.
*   **Interactions to Test on the Unit:**
    *   User interaction simulating clicking the "Return Home" button.
    *   The UUT calling a method to send the "Return Home" command to the tractor.
*   **Collaborators to Mock:**
    *   `TaskService`: To provide the defined home base location.
    *   `TractorCommunicationService`: To verify `sendReturnHomeCommand` is called with the home base coordinates.
    *   `NotificationService`: To verify a "Command Sent" message is displayed.
*   **Expected Mock Interactions:**
    *   `TaskService.getHomeBaseLocation` is called to retrieve the home base coordinates.
    *   `TractorCommunicationService.sendReturnHomeCommand` is called once with the home base coordinates.
    *   `NotificationService.displayInfo` is called with a "Return Home Command Sent" message.
*   **Observable Outcome from UUT:**
    *   The "Return Home" button state changes.
    *   A confirmation message is displayed to the user.
    *   `TractorCommunicationService.sendReturnHomeCommand` is invoked with the correct home base data.
*   **Test Data & Mock Configurations:**
    *   Mock `TaskService.getHomeBaseLocation` to return a predefined valid home base `[lat, lon]`.
    *   Mock `TractorCommunicationService.sendReturnHomeCommand` to be a spy.
    *   Mock `NotificationService.displayInfo` to be a spy.
*   **Recursive Testing Scope:** `@unit`, `@integration`, `@regression-core`

## 6. AI Verifiable Completion Criteria for the Test Plan Document

The successful completion of this task is AI verifiable by the presence and content of the generated Markdown document at `docs/tests/granular_test_plans/mobile_app_map_interface_test_plan.md`. Specifically, the document must:

1.  Exist at the specified path: `docs/tests/granular_test_plans/mobile_app_map_interface_test_plan.md`.
2.  Contain the following top-level sections: "Introduction", "Test Scope: AI Verifiable End Results", "Test Strategy: London School of TDD", "Recursive Testing Strategy (Frequent Regression)", and "Detailed Test Cases".
3.  Each "Detailed Test Case" must explicitly map to one or more AI Verifiable End Results from `docs/PRDMasterPlan.md` (specifically sections 5.A.1, 5.A.2, 5.A.3, 5.A.4).
4.  The "Test Strategy" section must clearly articulate the adoption of London School TDD principles, emphasizing interaction-based testing and the mocking of collaborators to verify observable outcomes.
5.  The "Recursive Testing Strategy" section must define SDLC touchpoints for re-execution, a test prioritization/tagging scheme, and methods for selecting appropriate test subsets for regression triggers.
6.  Every individual test case within the "Detailed Test Cases" section must include:
    *   A "Test Case ID".
    *   A clear reference to the "AI Verifiable End Result Targeted".
    *   Identification of the "Unit Under Test (UUT)".
    *   Description of "Interactions to Test on the Unit".
    *   Identification of "Collaborators to Mock".
    *   Detailed "Expected Mock Interactions".
    *   A precise "Observable Outcome from UUT" that confirms the AI Verifiable End Result.
    *   Description of "Test Data & Mock Configurations".
    *   Guidance on "Recursive Testing Scope" using the defined tags.
7.  All descriptions within the document must be clear, comprehensive, and actionable for human programmers and subsequent AI testing agents.