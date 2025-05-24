# Granular Test Plan: Tractor Autonomous Navigation

**Feature Name:** Tractor Autonomous Navigation

**Document Path:** [`docs/tests/granular_test_plans/tractor_autonomous_navigation_test_plan.md`](docs/tests/granular_test_plans/tractor_autonomous_navigation_test_plan.md)

## 1. Introduction

### 1.1. Purpose

This document outlines the granular test plan for the "Tractor Autonomous Navigation" feature of the Sevak project. It defines the scope, strategy, and specific test cases required to verify the successful implementation of this feature, adhering to London School of Test-Driven Development (TDD) principles and ensuring alignment with the AI Verifiable End Results (AVRs) specified in the [`docs/PRDMasterPlan.md`](docs/PRDMasterPlan.md). This plan also details a comprehensive recursive testing strategy to ensure ongoing stability and early regression detection.

### 1.2. Scope (AI Verifiable End Results Targeted)

This test plan specifically targets the verification of the following AI Verifiable End Results (AVRs) from Section 5.B.1: Autonomous Navigation in [`docs/PRDMasterPlan.md`](docs/PRDMasterPlan.md), along with closely related navigation aspects from 5.A.4 and 5.B.4:

*   **AVR-AN-1: Waypoint Navigation Accuracy:** The tractor successfully navigates to a specified GPS waypoint within an acceptable margin of error (e.g., +/- 0.5 meters).
*   **AVR-AN-2: Path Planning Efficiency:** The tractor follows an optimized path between waypoints, minimizing travel distance or time, as determined by the path planning algorithm.
*   **AVR-AN-3: Geofence Adherence (Entry Prevention):** The tractor prevents entry into a defined geofenced exclusion zone.
*   **AVR-AN-4: Geofence Adherence (Exit Prevention):** The tractor remains within a defined geofenced operational boundary.
*   **AVR-AN-5: Dynamic Obstacle Avoidance (Basic):** The tractor detects a dynamic obstacle in its path and safely stops or performs a basic avoidance maneuver.
*   **AVR-AN-6: Static Obstacle Avoidance (Basic):** The tractor detects a static obstacle and safely stops or performs a basic avoidance maneuver.
*   **AVR-AN-7: Navigation Resilience to GPS Signal Loss:** The tractor maintains its course or safely stops/pauses operation for a short period upon temporary GPS signal loss, and resumes navigation once signal is restored.
*   **AVR-AN-8: Return to Home Base:** The tractor successfully navigates autonomously to its predefined home base location upon command or low battery.

## 2. Test Strategy: London School of TDD

The testing strategy for "Tractor Autonomous Navigation" will strictly adhere to the London School of TDD. This approach emphasizes interaction-based testing, focusing on the observable behavior of a unit (e.g., a navigation controller module) by verifying its interactions with its collaborators.

*   **Interaction Testing:** Tests will assert that the Unit Under Test (UUT) correctly interacts with its dependencies (collaborators) by calling specific methods with expected arguments, in a particular order, and at appropriate times.
*   **Mocking Collaborators:** External dependencies, such as GPS sensors, IMU, motor controllers, obstacle detection sensors, and communication services, will be mocked or stubbed. This isolates the UUT, allowing for focused testing of its logic without relying on the availability or complex setup of real hardware or external systems. Mocks will be configured to return predefined values or simulate specific behaviors to trigger various scenarios within the UUT.
*   **Outcome Verification:** Instead of inspecting the internal state of the UUT, tests will verify observable outcomes, which primarily manifest as specific interactions with mocked collaborators (e.g., `motorController.move(direction, speed)` calls, `communicationService.sendAlert(message)` calls) or changes in the UUT's own public interface (e.g., `navigationController.getCurrentStatus()` returning "NAVIGATING").

## 3. Recursive Testing Strategy (Regression)

A comprehensive recursive testing strategy will be implemented to ensure continuous quality assurance and early detection of regressions as the system evolves towards passing high-level acceptance tests.

### 3.1. Triggers for Re-execution

Test suites or subsets thereof will be re-executed at various Software Development Life Cycle (SDLC) touch points:

*   **On Commit/Push (`@unit`, `@fast`):** Automated execution of all unit tests and critical fast-running integration tests on every code commit to the version control system. This provides immediate feedback to developers.
*   **Pre-Merge/Pull Request (`@integration`, `@critical`):** A more comprehensive suite of unit and integration tests, including critical path tests, will run before code is merged into the main development branch. This ensures feature stability and prevents regressions from entering the main codebase.
*   **Nightly Builds (`@regression`, `@all`):** A full regression suite, encompassing all unit, integration, and end-to-end (simulated) tests, will run nightly. This catches broader regressions that might not be apparent from smaller, isolated test runs.
*   **Sprint End/Feature Complete (`@feature-complete`, `@acceptance-prep`):** All tests related to the completed feature, plus relevant integration and system tests, will be run to confirm readiness for higher-level acceptance testing.
*   **Pre-Release/Release Candidate (`@full-system`, `@performance`, `@safety`):** The most extensive test suite, including performance, stress, and safety-critical tests, will be executed to ensure overall system stability and readiness for deployment.

### 3.2. Test Prioritization and Tagging

Tests will be tagged to facilitate selective execution and prioritization:

*   **`@unit`:** Pure unit tests, fast-running, isolated.
*   **`@integration`:** Tests involving interactions between multiple units or mocked external systems.
*   **`@navigation`:** Specific to the Autonomous Navigation feature.
*   **`@safety`:** Tests critical safety behaviors (e.g., obstacle avoidance, geofence adherence).
*   **`@performance`:** Tests related to navigation speed, path planning efficiency.
*   **`@critical`:** Tests covering core functionalities whose failure would block major workflows.
*   **`@fast`:** Tests that complete quickly, suitable for frequent execution.
*   **`@slow`:** Tests that take longer to run, suitable for nightly or pre-release builds.

### 3.3. Test Subset Selection for Regression

*   **Local Development:** Developers will run `@unit` and `@fast` tests relevant to their current changes.
*   **CI/CD Pipeline (Commit):** All `@unit` and `@fast` tests.
*   **CI/CD Pipeline (Pull Request):** All `@unit`, `@integration`, `@navigation`, and `@critical` tests.
*   **Nightly Builds:** All `@regression` (which includes all `@unit`, `@integration`, `@navigation`, `@safety`, `@performance`) and `@slow` tests.
*   **Pre-Release:** All tests, including specialized performance and safety simulations.

## 4. Test Cases

This section details individual test cases, mapping them to the AI Verifiable End Results (AVRs) and outlining the London School TDD approach for each.

---

### Test Case ID: TC-AN-001
**AI Verifiable End Result Targeted:** AVR-AN-1: Waypoint Navigation Accuracy
**Unit Under Test (UUT):** `NavigationController` (or equivalent module responsible for path execution)
**Interactions to Test on UUT:**
*   `NavigationController.navigateToWaypoint(waypoint: GPSCoordinate)`
*   `NavigationController.getCurrentLocation()`
**Collaborators to Mock:**
*   `GPSModule`: Simulates GPS readings.
*   `IMUModule`: Simulates orientation data.
*   `MotorController`: Controls tractor movement.
**Expected Mock Interactions:**
*   `GPSModule.getCurrentPosition()` will be mocked to return a sequence of coordinates simulating movement towards the target waypoint.
*   `IMUModule.getOrientation()` will be mocked to provide appropriate orientation changes.
*   `MotorController.move(direction, speed)` will be called repeatedly by the UUT to adjust tractor's path.
*   `MotorController.stop()` will be called when the UUT determines the waypoint is reached.
**Observable Outcome (AI Verifiable Completion Criterion):**
*   The `MotorController.stop()` method is called by the `NavigationController` when `GPSModule.getCurrentPosition()` reports coordinates within +/- 0.5 meters of the target `waypoint`.
*   **AI Verifiable Step:** Verify `MotorController.stop()` was called and `GPSModule.getCurrentPosition()` at that moment is within `0.5m` of `waypoint`.
**Test Data / Mock Configurations:**
*   `waypoint`: `{ lat: 12.345, lon: 67.890 }`
*   `GPSModule` mock sequence: Start at `{ lat: 12.340, lon: 67.880 }`, then incrementally move closer to `waypoint`.
*   `IMUModule` mock: Consistent orientation for straight path, then slight adjustments.
**Recursive Testing Scope Inclusion (Tags):** `@unit`, `@integration`, `@navigation`, `@critical`, `@fast`

---

### Test Case ID: TC-AN-002
**AI Verifiable End Result Targeted:** AVR-AN-2: Path Planning Efficiency
**Unit Under Test (UUT):** `PathPlanner` (or equivalent module responsible for generating paths)
**Interactions to Test on UUT:**
*   `PathPlanner.generatePath(start: GPSCoordinate, end: GPSCoordinate, obstacles: Polygon[], geofence: Polygon)`
**Collaborators to Mock:**
*   None directly for path generation, but the output path will be consumed by `NavigationController`.
**Expected Mock Interactions:**
*   N/A (This is a pure function test, verifying output based on input).
**Observable Outcome (AI Verifiable Completion Criterion):**
*   The `PathPlanner.generatePath()` method returns a sequence of waypoints that represents a valid, non-colliding path from `start` to `end`, and the total path length (sum of distances between waypoints) is within a predefined acceptable percentage (e.g., 10%) of the direct Euclidean distance, avoiding `obstacles` and respecting `geofence`.
*   **AI Verifiable Step:** Verify the returned path's validity (no collision with obstacles/geofence) and its length efficiency against a baseline.
**Test Data / Mock Configurations:**
*   `start`: `{ lat: 10.0, lon: 10.0 }`
*   `end`: `{ lat: 10.1, lon: 10.1 }`
*   `obstacles`: `[{ polygon: [...] }]` (e.g., a square in the direct path)
*   `geofence`: `[{ polygon: [...] }]` (e.g., a large bounding box)
**Recursive Testing Scope Inclusion (Tags):** `@unit`, `@navigation`, `@performance`, `@fast`

---

### Test Case ID: TC-AN-003
**AI Verifiable End Result Targeted:** AVR-AN-3: Geofence Adherence (Entry Prevention)
**Unit Under Test (UUT):** `GeofenceMonitor` (or integrated into `NavigationController`)
**Interactions to Test on UUT:**
*   `GeofenceMonitor.updateCurrentLocation(location: GPSCoordinate)`
*   `NavigationController.setGeofence(geofence: Polygon)`
*   `MotorController.stop()`
**Collaborators to Mock:**
*   `GPSModule`: Simulates GPS readings.
*   `MotorController`: Controls tractor movement.
*   `NotificationService`: Sends alerts to the app.
**Expected Mock Interactions:**
*   `GPSModule.getCurrentPosition()` will simulate movement towards and then attempting to cross into an exclusion geofence.
*   `MotorController.stop()` is expected to be called by the UUT when the simulated location enters the exclusion zone.
*   `NotificationService.sendAlert('Geofence Breach Attempt')` is expected to be called.
**Observable Outcome (AI Verifiable Completion Criterion):**
*   When `GPSModule.getCurrentPosition()` reports a location inside a defined exclusion geofence, the `MotorController.stop()` method is called by the UUT, and `NotificationService.sendAlert()` is called with a geofence breach message.
*   **AI Verifiable Step:** Verify `MotorController.stop()` and `NotificationService.sendAlert()` calls upon simulated geofence entry.
**Test Data / Mock Configurations:**
*   `exclusionGeofence`: A small polygon defining an forbidden area.
*   `GPSModule` mock sequence: Starts outside, moves towards, and then into the `exclusionGeofence`.
**Recursive Testing Scope Inclusion (Tags):** `@unit`, `@integration`, `@navigation`, `@safety`, `@critical`, `@fast`

---

### Test Case ID: TC-AN-004
**AI Verifiable End Result Targeted:** AVR-AN-4: Geofence Adherence (Exit Prevention)
**Unit Under Test (UUT):** `GeofenceMonitor` (or integrated into `NavigationController`)
**Interactions to Test on UUT:**
*   `GeofenceMonitor.updateCurrentLocation(location: GPSCoordinate)`
*   `NavigationController.setOperationalBoundary(boundary: Polygon)`
*   `MotorController.stop()`
**Collaborators to Mock:**
*   `GPSModule`: Simulates GPS readings.
*   `MotorController`: Controls tractor movement.
*   `NotificationService`: Sends alerts to the app.
**Expected Mock Interactions:**
*   `GPSModule.getCurrentPosition()` will simulate movement towards and then attempting to cross out of the operational boundary.
*   `MotorController.stop()` is expected to be called by the UUT when the simulated location exits the boundary.
*   `NotificationService.sendAlert('Geofence Boundary Exited')` is expected to be called.
**Observable Outcome (AI Verifiable Completion Criterion):**
*   When `GPSModule.getCurrentPosition()` reports a location outside the defined operational boundary, the `MotorController.stop()` method is called by the UUT, and `NotificationService.sendAlert()` is called with a geofence boundary exited message.
*   **AI Verifiable Step:** Verify `MotorController.stop()` and `NotificationService.sendAlert()` calls upon simulated geofence exit.
**Test Data / Mock Configurations:**
*   `operationalBoundary`: A large polygon defining the allowed operational area.
*   `GPSModule` mock sequence: Starts inside, moves towards, and then outside the `operationalBoundary`.
**Recursive Testing Scope Inclusion (Tags):** `@unit`, `@integration`, `@navigation`, `@safety`, `@critical`, `@fast`

---

### Test Case ID: TC-AN-005
**AI Verifiable End Result Targeted:** AVR-AN-5: Dynamic Obstacle Avoidance (Basic)
**Unit Under Test (UUT):** `ObstacleDetectionModule` (or integrated into `NavigationController`)
**Interactions to Test on UUT:**
*   `ObstacleDetectionModule.detectObstacle(sensorReadings: any)`
*   `NavigationController.handleObstacleDetected(obstacleType: 'dynamic', location: GPSCoordinate)`
*   `MotorController.stop()`
*   `NotificationService.sendAlert()`
**Collaborators to Mock:**
*   `LidarSensor`: Simulates LiDAR readings.
*   `UltrasonicSensor`: Simulates ultrasonic readings.
*   `MotorController`: Controls tractor movement.
*   `NotificationService`: Sends alerts to the app.
**Expected Mock Interactions:**
*   `LidarSensor.getScan()` and `UltrasonicSensor.getDistance()` will be mocked to simulate a dynamic obstacle appearing in the tractor's path.
*   `MotorController.stop()` is expected to be called by the UUT immediately upon obstacle detection.
*   `NotificationService.sendAlert('Dynamic Obstacle Detected')` is expected to be called.
**Observable Outcome (AI Verifiable Completion Criterion):**
*   Upon simulated detection of a dynamic obstacle, the `MotorController.stop()` method is called by the UUT within a specified time (e.g., 100ms), and `NotificationService.sendAlert()` is called with the appropriate message.
*   **AI Verifiable Step:** Verify `MotorController.stop()` call within time limit and `NotificationService.sendAlert()` call.
**Test Data / Mock Configurations:**
*   `LidarSensor` mock: Returns data indicating an object moving into the path.
*   `UltrasonicSensor` mock: Returns decreasing distance values.
**Recursive Testing Scope Inclusion (Tags):** `@unit`, `@integration`, `@navigation`, `@safety`, `@critical`, `@fast`

---

### Test Case ID: TC-AN-006
**AI Verifiable End Result Targeted:** AVR-AN-6: Static Obstacle Avoidance (Basic)
**Unit Under Test (UUT):** `ObstacleDetectionModule` (or integrated into `NavigationController`)
**Interactions to Test on UUT:**
*   `ObstacleDetectionModule.detectObstacle(sensorReadings: any)`
*   `NavigationController.handleObstacleDetected(obstacleType: 'static', location: GPSCoordinate)`
*   `MotorController.stop()`
*   `PathPlanner.replanPath()` (if avoidance is attempted)
*   `NotificationService.sendAlert()`
**Collaborators to Mock:**
*   `LidarSensor`: Simulates LiDAR readings.
*   `UltrasonicSensor`: Simulates ultrasonic readings.
*   `MotorController`: Controls tractor movement.
*   `PathPlanner`: For replanning.
*   `NotificationService`: Sends alerts to the app.
**Expected Mock Interactions:**
*   `LidarSensor.getScan()` and `UltrasonicSensor.getDistance()` will be mocked to simulate a static obstacle in the tractor's path.
*   `MotorController.stop()` is expected to be called by the UUT.
*   If avoidance logic is implemented, `PathPlanner.replanPath()` might be called, followed by new `MotorController.move()` commands.
*   `NotificationService.sendAlert('Static Obstacle Detected')` is expected to be called if the obstacle persists or cannot be avoided.
**Observable Outcome (AI Verifiable Completion Criterion):**
*   Upon simulated detection of a static obstacle, the `MotorController.stop()` method is called by the UUT. If avoidance is attempted, `PathPlanner.replanPath()` is called, and the tractor resumes movement along a new path. If avoidance fails or is not attempted, `NotificationService.sendAlert()` is called.
*   **AI Verifiable Step:** Verify `MotorController.stop()` call, and either `PathPlanner.replanPath()` followed by movement, or `NotificationService.sendAlert()`.
**Test Data / Mock Configurations:**
*   `LidarSensor` mock: Returns data indicating a stationary object in the path.
*   `UltrasonicSensor` mock: Returns constant decreasing distance values.
**Recursive Testing Scope Inclusion (Tags):** `@unit`, `@integration`, `@navigation`, `@safety`, `@critical`, `@slow` (if replanning is complex)

---

### Test Case ID: TC-AN-007
**AI Verifiable End Result Targeted:** AVR-AN-7: Navigation Resilience to GPS Signal Loss
**Unit Under Test (UUT):** `NavigationController`
**Interactions to Test on UUT:**
*   `NavigationController.startNavigation()`
*   `GPSModule.getCurrentPosition()`
*   `MotorController.stop()`
*   `NotificationService.sendAlert()`
**Collaborators to Mock:**
*   `GPSModule`: Simulates GPS readings, including signal loss.
*   `MotorController`: Controls tractor movement.
*   `NotificationService`: Sends alerts to the app.
**Expected Mock Interactions:**
*   `GPSModule.getCurrentPosition()` will initially return valid coordinates, then `null` or an error for a period, then resume valid coordinates.
*   `MotorController.stop()` is expected to be called by the UUT shortly after GPS signal loss.
*   `NotificationService.sendAlert('GPS Signal Lost')` is expected to be called.
*   `MotorController.move()` is expected to resume after signal restoration.
**Observable Outcome (AI Verifiable Completion Criterion):**
*   When `GPSModule.getCurrentPosition()` reports signal loss, the `MotorController.stop()` method is called by the UUT within a defined threshold (e.g., 2 seconds). `NotificationService.sendAlert()` is called. When signal is restored, `MotorController.move()` commands resume, and navigation continues towards the target.
*   **AI Verifiable Step:** Verify `MotorController.stop()` and `NotificationService.sendAlert()` on signal loss, and resumption of `MotorController.move()` on signal recovery.
**Test Data / Mock Configurations:**
*   `GPSModule` mock: Sequence of valid, then invalid (null/error), then valid coordinates.
**Recursive Testing Scope Inclusion (Tags):** `@unit`, `@integration`, `@navigation`, `@critical`, `@safety`, `@slow`

---

### Test Case ID: TC-AN-008
**AI Verifiable End Result Targeted:** AVR-AN-8: Return to Home Base
**Unit Under Test (UUT):** `NavigationController`
**Interactions to Test on UUT:**
*   `NavigationController.returnToHomeBase()`
*   `NavigationController.setHomeBase(homeBase: GPSCoordinate)`
*   `GPSModule.getCurrentPosition()`
*   `MotorController.move()`
*   `MotorController.stop()`
**Collaborators to Mock:**
*   `GPSModule`: Simulates GPS readings.
*   `IMUModule`: Simulates orientation data.
*   `MotorController`: Controls tractor movement.
*   `TractorStatusService`: Reports battery level (for low battery trigger).
**Expected Mock Interactions:**
*   `NavigationController.setHomeBase()` is called with a predefined home base.
*   `TractorStatusService.getBatteryLevel()` can be mocked to trigger a low battery scenario, or `returnToHomeBase()` is called directly.
*   `GPSModule.getCurrentPosition()` will simulate movement towards the home base.
*   `MotorController.move(direction, speed)` will be called by the UUT.
*   `MotorController.stop()` will be called when the UUT determines the home base is reached.
**Observable Outcome (AI Verifiable Completion Criterion):**
*   Upon `returnToHomeBase()` command or simulated low battery, the `NavigationController` initiates movement, and `MotorController.stop()` is called when `GPSModule.getCurrentPosition()` reports coordinates within +/- 0.5 meters of the `homeBase` location.
*   **AI Verifiable Step:** Verify `MotorController.stop()` was called and `GPSModule.getCurrentPosition()` at that moment is within `0.5m` of `homeBase`.
**Test Data / Mock Configurations:**
*   `homeBase`: `{ lat: 12.000, lon: 67.000 }`
*   `GPSModule` mock sequence: Starts at a distance, then incrementally moves closer to `homeBase`.
*   `TractorStatusService` mock: `getBatteryLevel()` returns a value below the critical threshold.
**Recursive Testing Scope Inclusion (Tags):** `@unit`, `@integration`, `@navigation`, `@critical`, `@fast`

---

## 5. Conclusion

This granular test plan for the "Tractor Autonomous Navigation" feature provides a clear roadmap for test implementation. By focusing on AI Verifiable End Results from [`docs/PRDMasterPlan.md`](docs/PRDMasterPlan.md) and adopting London School of TDD principles, we ensure that tests verify observable outcomes through interaction testing and judicious mocking of collaborators. The integrated recursive testing strategy, with its defined triggers, tagging, and subset selection, guarantees continuous regression testing, fostering early detection of issues and maintaining system stability as development progresses. Every test case is designed with AI verifiable completion criteria, enabling automated validation of feature implementation. This plan is now ready for test code implementation by subsequent AI agents and human programmers.