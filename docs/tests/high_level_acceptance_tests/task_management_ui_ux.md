# High-Level Acceptance Tests: Task Management & UI/UX

This document outlines high-level acceptance tests for the Task Management interface and overall User Interface/User Experience (UI/UX) of the Project Sevak PWA (Progressive Web App) mobile companion app, as defined in the [`docs/research/high_level_test_strategy_report.md`](../../research/high_level_test_strategy_report.md:96) and referenced in the [`docs/tests/master_acceptance_test_plan.md`](../master_acceptance_test_plan.md:121).

## Test Suite: UIX - Task Management & UI/UX

### Test Case: UIX-001
*   **ID**: UIX-001
*   **Description**: Verify user can easily and accurately define a simple rectangular cutting area, a drop-off point, and a home base using the map interface on the UI.
*   **Pre-conditions**:
    *   Sevak PWA (Progressive Web App) mobile companion app is active and connected to the system (simulated or real) via a compatible browser.
    *   Map data for the test area is loaded and displayed within the PWA.
    *   User is on the Task Definition screen within the PWA.
*   **Steps**:
    1.  **Given** the user is on the Task Definition screen with a visible map.
    2.  **When** the user selects the "Define Cutting Area" tool.
    3.  **And** the user draws/taps a rectangle on the map to define 'field_C_simple_rect'.
    4.  **Then** the defined area 'field_C_simple_rect' should be visually highlighted on the map, and its coordinates/area should be displayed.
    5.  **When** the user selects the "Define Drop-off Point" tool.
    6.  **And** the user taps a location on the map to define 'dp_barn_west'.
    7.  **Then** 'dp_barn_west' should be marked on the map, and its coordinates displayed.
    8.  **When** the user selects the "Define Home Base" tool.
    9.  **And** the user taps a location on the map to define 'hb_charging_station'.
    10. **Then** 'hb_charging_station' should be marked on the map, and its coordinates displayed.
    11. **When** the user saves the task.
    12. **Then** a confirmation "Task 'Task_001' saved successfully" should be displayed.
*   **Expected Results**:
    *   User can intuitively define all required task elements.
    *   Visual feedback is clear and accurate.
    *   Defined elements are saved correctly.
*   **AI Verifiable Pass/Fail Criteria**:
    *   **Pass**:
        *   UI interaction log (e.g., from an automated UI testing tool like Playwright/Cypress) shows successful completion of all steps within the PWA.
        *   Browser console log shows no critical errors during task definition steps.
        *   System log `sevak_pwa_interaction_log_[timestamp].txt` (or equivalent backend log if UI actions trigger backend calls) contains "EVENT:TASK_AREA_DEFINED NAME:field_C_simple_rect COORDS:[...]"
        *   System log contains "EVENT:DROPOFF_DEFINED NAME:dp_barn_west COORDS:[...]".
        *   System log contains "EVENT:HOMEBASE_DEFINED NAME:hb_charging_station COORDS:[...]".
        *   System log contains "EVENT:TASK_SAVED ID:Task_001".
        *   API call to `GET /api/sevak/tasks/Task_001` returns a JSON object containing the correct coordinates for 'field_C_simple_rect', 'dp_barn_west', and 'hb_charging_station'.
        *   (If applicable) Data for 'field_C_simple_rect', 'dp_barn_west', 'hb_charging_station' and 'Task_001' is correctly stored in browser local storage (e.g., IndexedDB or localStorage) as verified by an automation script.
        *   Automated visual validation tool (if used) confirms PWA UI elements (highlighted area, markers) appear correctly on screen captures.
    *   **Fail**: Any step cannot be completed, visual feedback is incorrect/missing, task fails to save, or saved task data (verified via API or local storage) is incorrect. Log entries (browser or system) are missing or erroneous.

### Test Case: UIX-002
*   **ID**: UIX-002
*   **Description**: Verify dashboard clarity: user can quickly understand key tractor status information (location, battery level, current activity, critical alerts).
*   **Pre-conditions**:
    *   Sevak PWA dashboard is active and displayed in a browser.
    *   Sevak system is operational (simulated or real) and providing status updates to the PWA.
    *   Sevak is performing a task, has 65% battery, is at coordinates (X,Y), and a "Low Obstacle Sensor Signal" warning is active.
*   **Steps**:
    1.  **Given** the Sevak dashboard is displayed.
    2.  **And** Sevak is at GPS coordinates (X,Y), battery is 65%, current activity is "Cutting Fodder", and a "WARN_OBSTACLE_SENSOR_LOW_SIGNAL" alert is active.
    3.  **When** the user views the dashboard.
    4.  **Then** the dashboard should clearly display:
        *   Current Location: (X,Y) or a human-readable map equivalent.
        *   Battery Level: 65% (with appropriate visual indicator like a battery bar).
        *   Current Activity: "Cutting Fodder".
        *   Active Alerts: "Low Obstacle Sensor Signal" (or similar) prominently displayed.
*   **Expected Results**:
    *   All key status information is present, accurate, and easily legible on the dashboard.
    *   Alerts are clearly distinguishable.
*   **AI Verifiable Pass/Fail Criteria**:
    *   **Pass**:
        *   Automated UI test (e.g., Playwright/Cypress) scrapes PWA dashboard text/values and confirms:
            *   Displayed location matches `(X,Y)` (or derived map position).
            *   Displayed battery matches `65%`.
            *   Displayed activity matches `"Cutting Fodder"`.
            *   Displayed alert matches `"WARN_OBSTACLE_SENSOR_LOW_SIGNAL"`.
        *   Browser console log shows no critical errors related to dashboard data rendering or updates.
        *   System status API `GET /api/sevak/dashboard_data` (or WebSocket message stream) returns JSON/data matching the displayed values.
        *   Visual validation tool confirms alert styling (e.g., color, icon) in the PWA meets specifications.
    *   **Fail**: Any information is missing, incorrect, illegible, or alerts are not displayed prominently in the PWA. API data mismatch. Critical browser console errors present.

### Test Case: UIX-003
*   **ID**: UIX-003
*   **Description**: Verify manual control responsiveness and precision using the virtual joystick for maneuvering in CET.
*   **Pre-conditions**:
    *   Sevak is in CET and in "Manual Control" mode.
    *   PWA with virtual joystick is active in a browser and connected to Sevak.
*   **Steps**:
    1.  **Given** Sevak is in 'Manual Control' mode in CET.
    2.  **When** the user activates the virtual joystick forward.
    3.  **Then** Sevak should move forward smoothly.
    4.  **When** the user activates the virtual joystick to turn left.
    5.  **Then** Sevak should turn left.
    6.  **When** the user attempts to navigate Sevak through a simple coned chicane using only the virtual joystick.
    7.  **Then** the user should be able to complete the maneuver without hitting cones, and the tractor's response should feel timely (low latency).
*   **Expected Results**:
    *   Sevak responds promptly and accurately to joystick inputs.
    *   User can perform precise maneuvers.
    *   Latency between joystick input and tractor movement is minimal (e.g., <200ms).
*   **AI Verifiable Pass/Fail Criteria**:
    *   **Pass**:
        *   Telemetry log `sevak_cet_log_[timestamp].txt` shows joystick input commands (e.g., `CMD_MANUAL_JOYSTICK X:value Y:value`) received from the PWA, followed by corresponding changes in vehicle odometry/speed/heading within 200ms of the command being logged by the PWA.
        *   Log contains `METRIC:MANUAL_CONTROL_LATENCY_AVG: [value < 200ms]` (end-to-end from PWA input to tractor response).
        *   Video recording of the chicane test (analyzed by AI or human) shows no cones hit.
        *   PWA's browser console log or specific interaction log shows joystick commands (e.g., touch events, calculated vector) sent without error and with timestamps.
    *   **Fail**: Noticeable lag, jerky movements, inability to perform precise maneuvers, cones hit, or telemetry shows latency >200ms. Errors in PWA console related to joystick command transmission.

### Test Case: UIX-004
*   **ID**: UIX-004
*   **Description**: Verify clarity, timeliness, and actionability of system alerts (e.g., low battery, critical obstacle detected, task completion) on the UI.
*   **Pre-conditions**:
    *   Sevak PWA is active in a browser.
    *   System is capable of generating various alerts intended for display in the PWA.
*   **Steps**:
    1.  **Given** the Sevak UI is active.
    2.  **When** the system simulates a "Low Battery Warning" (e.g., battery drops to 20%).
    3.  **Then** a clear "Low Battery - Return to Home Recommended" alert should appear on the PWA UI within 5 seconds, potentially using the Web Notifications API if the app is not in the foreground, or as an in-app modal.
    4.  **And** the alert should offer an actionable option (e.g., "Initiate Return to Home" button).
    5.  **When** the system simulates a "Critical Obstacle Detected - Emergency Stop" event.
    6.  **Then** a prominent, high-priority "EMERGENCY STOP - Obstacle Detected!" alert should appear immediately (<1 sec) on the PWA UI, possibly with a distinct sound/visual cue.
    7.  **When** an autonomous task is successfully completed.
    8.  **Then** a "Task Completed Successfully" notification should appear on the PWA UI within 5 seconds (or via Web Notifications API).
*   **Expected Results**:
    *   Alerts are displayed promptly with appropriate severity indicators.
    *   Alert messages are clear and understandable.
    *   Actionable alerts provide clear options.
*   **AI Verifiable Pass/Fail Criteria**:
    *   **Pass**:
        *   PWA UI event log or automated UI test (e.g., Playwright/Cypress) confirms:
            *   Low battery alert displayed within 5s of simulated event, message matches, "Initiate Return to Home" button is present and enabled. Log (PWA console or system) contains `PWA_ALERT_DISPLAYED: LOW_BATTERY`.
            *   Emergency stop alert displayed within 1s, message matches, visual style indicates high priority. Log (PWA console or system) contains `PWA_ALERT_DISPLAYED: EMERGENCY_STOP`.
            *   Task completion notification displayed within 5s, message matches. Log (PWA console or system) contains `PWA_ALERT_DISPLAYED: TASK_COMPLETED`.
        *   If Web Notifications API is used, browser's permission status for notifications is "granted", and an automated test (e.g., by stubbing `Notification` constructor or checking OS-level notifications if feasible with testing tools) confirms notification dispatch.
        *   System log `sevak_alerts_log_[timestamp].txt` correlates with PWA alerts, showing timestamps for alert generation and (if instrumented) PWA display.
        *   Browser console log shows no errors during alert display or interaction.
    *   **Fail**: Alerts delayed, missing, unclear, not matching severity, or actionable options missing/non-functional. Log entries missing or timestamps out of bounds. Web Notification permission denied or notifications not triggered as expected. Critical browser console errors.

### Test Case: UIX-005
*   **ID**: UIX-005
*   **Description**: Verify PWA installability ("Add to Home Screen" functionality) and core offline capabilities (e.g., app shell loading offline, basic data access from local storage when offline).
*   **Pre-conditions**:
    *   Sevak PWA is deployed and accessible via a URL in a compatible browser on a mobile device or desktop.
    *   The browser supports PWA installation prompts.
    *   Network connection is initially available.
*   **Steps**:
    1.  **Given** the user navigates to the Sevak PWA URL in a compatible browser.
    2.  **When** the browser presents an "Add to Home Screen" (or similar) prompt (or the user manually triggers the installation process if the prompt is deferred).
    3.  **And** the user accepts the installation.
    4.  **Then** the Sevak PWA should be installed on the device, and an app icon should appear on the home screen/app drawer.
    5.  **When** the user launches the Sevak PWA from its home screen icon.
    6.  **Then** the PWA should launch and display its main interface.
    7.  **When** the user disconnects the device from all network connections (Wi-Fi, mobile data).
    8.  **And** the user (re)launches or refreshes the Sevak PWA.
    9.  **Then** the PWA app shell (core UI structure, navigation, static assets) should load correctly without requiring a network connection.
    10. **And** if the PWA is designed to show previously cached data (e.g., last known status, saved task definitions), this data should be visible and accessible from local browser storage (e.g., IndexedDB/localStorage).
*   **Expected Results**:
    *   User can successfully install the Sevak PWA.
    *   The installed PWA launches correctly from its icon.
    *   The PWA's app shell loads and is usable when the device is offline.
    *   Basic, previously cached application data is accessible offline.
*   **AI Verifiable Pass/Fail Criteria**:
    *   **Pass**:
        *   Automated test script (e.g., using Playwright/Cypress):
            *   Successfully detects and interacts with the "beforeinstallprompt" event or programmatically verifies PWA installability criteria (e.g., manifest validity, service worker registration).
            *   Confirms service worker is registered, active, and controlling the page.
            *   Lighthouse PWA audit (run via automation) achieves a minimum score for "Installable" (e.g., >90/100) and "Offline" capabilities.
            *   Simulates network disconnection (e.g., `page.setOffline(true)`).
            *   Successfully reloads/navigates within the PWA offline.
            *   Verifies that core app shell UI elements are rendered correctly offline (e.g., by checking for presence of specific DOM elements).
            *   Browser console shows no network errors related to loading critical app shell assets when offline.
            *   (If applicable) Verifies that data previously written to IndexedDB/localStorage by the PWA can be read and is correctly displayed in the UI when offline.
    *   **Fail**: "Add to Home Screen" prompt is not available when criteria are met, or installation fails. PWA icon not created or PWA fails to launch from icon. App shell does not load offline or critical UI elements are missing. Network errors appear in the console when trying to load core assets offline. Cached data is not accessible or is corrupted when offline. Lighthouse PWA audit scores below acceptable thresholds for installability or offline support. Service worker not registered or not functional.

---
*More test cases for complex task definitions, error handling UI, usability in different field conditions (sun glare - simulated/tested), accessibility for users with varying tech familiarity (tested via user studies), and specific dashboard elements would be added here.*