# High-Level Acceptance Tests: Data Logging & System Integrity

This document outlines high-level acceptance tests for the data logging and system integrity capabilities of Project Sevak, as defined in the [`docs/research/high_level_test_strategy_report.md`](../../research/high_level_test_strategy_report.md:125) and referenced in the [`docs/tests/master_acceptance_test_plan.md`](../master_acceptance_test_plan.md:127).

## Test Suite: DLSI - Data Logging & System Integrity

### Test Case: DLSI-001
*   **ID**: DLSI-001
*   **Description**: Verify accuracy of logged operational data (hours worked, area covered, distance traveled) against ground truth from a simulated task.
*   **Pre-conditions**:
    *   Sevak is in a simulated environment.
    *   A specific task is defined: cut a 10m x 10m (100 sqm) area, involving 500m of travel to/from/within the field. The task is expected to take 0.25 hours (15 minutes) of operational time (excluding travel to first point/from last point if not part of "hours worked").
    *   Data logging is active.
*   **Steps**:
    1.  **Given** Sevak is in simulation with a task to cut 100sqm, travel 500m, estimated 0.25 operational hours.
    2.  **When** Sevak completes the autonomous task.
    3.  **Then** the system should log operational data.
    4.  **And** the logged data should be retrieved for verification.
*   **Expected Results**:
    *   Logged `hours_worked` is 0.25 hours +/- 5%.
    *   Logged `area_covered` is 100 sqm +/- 5%.
    *   Logged `distance_traveled` (operational) is 500m +/- 5%.
*   **AI Verifiable Pass/Fail Criteria**:
    *   **Pass**:
        *   Operational log file `sevak_op_log_[timestamp].json` (or database query) for the completed task ID contains:
            *   `"task_summary": {"hours_worked": value_between_0.2375_and_0.2625}`
            *   `"task_summary": {"area_covered_sqm": value_between_95_and_105}`
            *   `"task_summary": {"distance_traveled_m": value_between_475_and_525}`
        *   Simulation environment's ground truth data (if available, e.g., `sim_ground_truth_task_[id].json`) confirms these values.
        *   Automated script compares logged values against expected ranges and returns "MATCH".
    *   **Fail**: Any logged value is outside the +/- 5% tolerance, or data is missing. Script returns "MISMATCH".

### Test Case: DLSI-002
*   **ID**: DLSI-002
*   **Description**: Verify completeness of logged data: all critical events and parameters are logged during a typical task cycle.
*   **Pre-conditions**:
    *   Sevak performs a full task cycle (navigate, cut, transport, return) in CET.
    *   Data logging is active.
*   **Steps**:
    1.  **Given** Sevak is performing a full task cycle in CET.
    2.  **When** the task is completed.
    3.  **Then** retrieve the comprehensive log for this task execution.
    4.  **And** verify the presence of key event types and parameters.
*   **Expected Results**:
    *   The log should contain entries for:
        *   Task start/end, navigation segment start/end, cutting start/end, fodder drop-off.
        *   Key parameters like GPS coordinates at intervals, speed, battery SoC at intervals, sensor status changes.
        *   Any alerts or warnings generated (e.g., obstacle detected, low battery warning).
*   **AI Verifiable Pass/Fail Criteria**:
    *   **Pass**:
        *   An automated log parsing script checks `sevak_cet_log_[task_id].txt` (or structured log) for the presence of mandatory event markers:
            *   `EVENT:TASK_STARTED`, `EVENT:NAV_SEGMENT_START`, `EVENT:CUTTING_OPERATIONS_START`, `EVENT:FODDER_DROPOFF_COMPLETE`, `EVENT:TASK_ENDED_SUCCESS`.
            *   At least N (e.g., 100) `DATA:GPS_POSITION` entries.
            *   At least M (e.g., 50) `DATA:BATTERY_SOC` entries.
            *   If an obstacle was deliberately part of the test: `EVENT:OBSTACLE_DETECTED`.
        *   The script reports "ALL_CRITICAL_EVENTS_LOGGED: TRUE".
    *   **Fail**: Script reports "ALL_CRITICAL_EVENTS_LOGGED: FALSE" due to missing mandatory event types or insufficient data points for key parameters.

### Test Case: DLSI-003
*   **ID**: DLSI-003
*   **Description**: Verify correct logging of system errors and fault codes when a fault is injected.
*   **Pre-conditions**:
    *   Sevak is operational (simulated or CET).
    *   A fault injection mechanism is available (e.g., simulate a sensor failure like `FAULT_INJECT:LIDAR_TIMEOUT`).
*   **Steps**:
    1.  **Given** Sevak is operational.
    2.  **When** a 'LiDAR Timeout' fault (Fault Code: `ERR_LIDAR_001`) is injected.
    3.  **Then** the system should detect the fault.
    4.  **And** the system error log should contain an entry for `ERR_LIDAR_001` with a timestamp and relevant context (e.g., current operational state).
    5.  **And** the UI should display an appropriate alert (tested in UIX suite, but log is key here).
*   **Expected Results**:
    *   The specific fault code is logged accurately and promptly.
    *   Sufficient contextual information is logged with the error.
*   **AI Verifiable Pass/Fail Criteria**:
    *   **Pass**:
        *   Error log `sevak_error_log_[timestamp].json` contains an entry:
            `{"timestamp": "[iso_datetime]", "fault_code": "ERR_LIDAR_001", "message": "LiDAR sensor timeout detected", "context": {"current_op_mode": "AUTONOMOUS_CUTTING", "speed_kmh": 5.2}}` (context details may vary).
        *   The timestamp in the log is within X seconds (e.g., 2 seconds) of the fault injection command timestamp.
        *   Automated script verifies the presence and correctness of the fault code and timestamp proximity.
    *   **Fail**: Fault code not logged, logged incorrectly, logged with significant delay, or contextual information is missing/irrelevant.

### Test Case: DLSI-004
*   **ID**: DLSI-004
*   **Description**: Verify data retrieval: logged operational data can be easily accessed/exported by a user (or authorized system) via a defined mechanism (e.g., API endpoint, export function in UI).
*   **Pre-conditions**:
    *   Several tasks have been completed, and their data logged.
    *   A data retrieval mechanism (e.g., `GET /api/sevak/logs/task/{task_id}` or UI export button) is implemented.
*   **Steps**:
    1.  **Given** data for `Task_XYZ` has been logged.
    2.  **When** a request is made to retrieve logs for `Task_XYZ` via the API endpoint `GET /api/sevak/logs/task/Task_XYZ`.
    3.  **Then** the API should return a JSON (or specified format) payload containing the operational log data for `Task_XYZ`.
    4.  **And** the retrieved data should match the data that was originally logged (verify a subset of key fields).
    5.  **(Alternative for UI)** **When** the user navigates to the log export section in the UI and requests export for `Task_XYZ`.
    6.  **Then** a file (e.g., `Task_XYZ_log.csv`) should be generated and downloadable, containing the correct data.
*   **Expected Results**:
    *   Logged data is retrievable through the defined mechanism.
    *   The format of retrieved/exported data is correct.
    *   The content of the retrieved/exported data is accurate.
*   **AI Verifiable Pass/Fail Criteria**:
    *   **Pass**:
        *   For API: An automated test client calls `GET /api/sevak/logs/task/Task_XYZ`. The HTTP response code is 200. The response body is valid JSON and contains expected key fields like `task_summary.area_covered_sqm` with a value matching the known logged value for `Task_XYZ`.
        *   For UI Export: An automated UI test clicks the export button. A file `Task_XYZ_log.csv` is downloaded. An automated script parses the CSV and verifies key data points match known logged values for `Task_XYZ`. The script reports "EXPORTED_DATA_VALIDATION: SUCCESS".
    *   **Fail**: API returns error, response data is malformed or incorrect. UI export fails, file not generated, or file content is incorrect. Script reports failure.

### Test Case: DLSI-005
*   **ID**: DLSI-005
*   **Description**: Verify basic data integrity: logs are protected against trivial corruption (e.g., check for log file consistency or checksums if implemented).
*   **Pre-conditions**:
    *   A task has been completed and its log file `task_log_abc.dat` generated.
    *   A checksum or integrity validation mechanism for logs is in place (e.g., log file includes a SHA256 hash of its content, or a central log management system verifies integrity upon ingestion).
*   **Steps**:
    1.  **Given** `task_log_abc.dat` has been generated with an internal checksum/hash.
    2.  **When** the log file is retrieved.
    3.  **Then** an automated script recalculates the checksum/hash of the log content (excluding the stored checksum itself).
    4.  **And** the recalculated checksum/hash should match the stored checksum/hash within the log file.
    5.  **(Alternative for central system)** **When** `task_log_abc.dat` is ingested by the central log system.
    6.  **Then** the central log system's status API for that log should report `{"log_id": "task_log_abc.dat", "integrity_status": "VALID"}`.
*   **Expected Results**:
    *   Log integrity check passes, indicating no trivial corruption.
*   **AI Verifiable Pass/Fail Criteria**:
    *   **Pass**:
        *   Automated script reads `task_log_abc.dat`, extracts stored hash, recalculates hash of content, and they match. Script outputs "LOG_INTEGRITY_CHECK: PASSED for task_log_abc.dat".
        *   OR, API call to central log system `GET /api/log_ingestion_status/task_log_abc.dat` returns `{"integrity_status": "VALID"}`.
    *   **Fail**: Calculated checksum/hash does not match stored one. Log system reports "INVALID" or "CORRUPTED".

---
*More test cases for log rotation, storage limits, data security/access controls (if specified), and performance of the logging system under high event load would be added here.*