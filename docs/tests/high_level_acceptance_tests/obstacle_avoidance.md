# High-Level Acceptance Tests: Obstacle Detection & Avoidance

This document outlines high-level acceptance tests for the obstacle detection and avoidance capabilities of Project Sevak, as defined in the [`docs/research/high_level_test_strategy_report.md`](../../research/high_level_test_strategy_report.md:82) and referenced in the [`docs/tests/master_acceptance_test_plan.md`](../master_acceptance_test_plan.md:118). These tests are safety-critical.

## Test Suite: OA - Obstacle Avoidance

### Test Case: OA-001
*   **ID**: OA-001
*   **Description**: Verify detection and safe avoidance of a static obstacle (e.g., large rock) in a simulated environment.
*   **Pre-conditions**:
    *   Sevak is in a simulated environment (`simulation_farm_static_obstacle_v1`).
    *   A static obstacle (`rock_large_01`) is placed directly on Sevak's planned autonomous path.
    *   Sevak is operating at a standard speed (e.g., 5 km/h).
*   **Steps**:
    1.  **Given** Sevak is autonomously navigating a path in 'simulation_farm_static_obstacle_v1'.
    2.  **And** a large static rock 'rock_large_01' is on its direct path.
    3.  **When** Sevak approaches 'rock_large_01'.
    4.  **Then** Sevak's sensors (simulated LiDAR/camera) should detect 'rock_large_01' at a safe distance (e.g., >10 meters).
    5.  **And** Sevak should autonomously execute a safe avoidance maneuver (e.g., slow down, steer around, or stop if no clear path).
    6.  **And** a log entry "EVENT:STATIC_OBSTACLE_DETECTED ID:rock_large_01" should be created.
    7.  **And** a log entry "EVENT:AVOIDANCE_MANEUVER_INITIATED" or "EVENT:SAFE_STOP_OBSTACLE" should be created.
*   **Expected Results**:
    *   Sevak detects the static obstacle in time.
    *   Sevak avoids collision by maneuvering around it or stopping safely.
    *   Minimum safe distance (e.g., 1m) is maintained from the obstacle during and after the maneuver.
*   **AI Verifiable Pass/Fail Criteria**:
    *   **Pass**:
        *   Simulation log `sevak_sim_log_[timestamp].txt` contains "EVENT:STATIC_OBSTACLE_DETECTED ID:rock_large_01" and ("EVENT:AVOIDANCE_MANEUVER_SUCCESSFUL" or "EVENT:SAFE_STOP_OBSTACLE_COMPLETED").
        *   Proximity sensor data in log shows `min_distance_to_rock_large_01 > 1.0m` throughout the encounter.
        *   No `ERR_COLLISION` log entry related to `rock_large_01`.
        *   AI analysis of simulated sensor data (e.g. point cloud) confirms detection of `rock_large_01` prior to maneuver.
    *   **Fail**: Collision with `rock_large_01`, failure to detect, detection too late for safe maneuver, or absence of correct log entries.

### Test Case: OA-002
*   **ID**: OA-002
*   **Description**: Verify detection and safe response to a dynamic obstacle (e.g., simulated human-sized soft target) crossing Sevak's path in CET.
*   **Pre-conditions**:
    *   Sevak is in a Controlled Environment Test (CET) track.
    *   Sevak is operating autonomously at a standard speed (e.g., 5 km/h).
    *   A dynamic soft target (`pedestrian_dummy_01`) is programmed to cross Sevak's path perpendicularly.
*   **Steps**:
    1.  **Given** Sevak is autonomously navigating in CET.
    2.  **When** 'pedestrian_dummy_01' begins to cross Sevak's path from the side, 15 meters ahead.
    3.  **Then** Sevak's sensors should detect 'pedestrian_dummy_01'.
    4.  **And** Sevak should predict the collision course and initiate a safe response (e.g., emergency stop or significant speed reduction and alert).
    5.  **And** a log entry "EVENT:DYNAMIC_OBSTACLE_DETECTED ID:pedestrian_dummy_01 TYPE:human_like" should be created.
    6.  **And** a log entry "EVENT:EMERGENCY_STOP_INITIATED" or "EVENT:CRITICAL_AVOIDANCE_MANEUVER" should be created.
*   **Expected Results**:
    *   Sevak detects the dynamic obstacle and its trajectory.
    *   Sevak performs an emergency stop or slows drastically to avoid collision.
    *   No contact with 'pedestrian_dummy_01'.
*   **AI Verifiable Pass/Fail Criteria**:
    *   **Pass**:
        *   Telemetry log `sevak_cet_log_[timestamp].txt` contains "EVENT:DYNAMIC_OBSTACLE_DETECTED ID:pedestrian_dummy_01", and ("EVENT:EMERGENCY_STOP_COMPLETED" or "EVENT:CRITICAL_AVOIDANCE_SUCCESSFUL").
        *   Vehicle speed telemetry shows rapid deceleration to < 1 km/h or 0 km/h before potential impact point.
        *   Video recording of the test (analyzed by AI or human) confirms no contact with `pedestrian_dummy_01`.
        *   Proximity sensor data logs `min_distance_to_pedestrian_dummy_01 > 0.5m`.
    *   **Fail**: Collision with `pedestrian_dummy_01`, failure to detect or react in time, or absence of correct log entries.

### Test Case: OA-003
*   **ID**: OA-003
*   **Description**: Verify obstacle detection performance under challenging lighting conditions (e.g., strong sunlight causing glare, deep shadows) in simulation.
*   **Pre-conditions**:
    *   Sevak is in a simulated environment (`simulation_farm_challenging_light_v1`) with areas of strong glare and deep shadows.
    *   Static obstacles (`obstacle_glare_01`, `obstacle_shadow_01`) are placed in these challenging areas on Sevak's path.
*   **Steps**:
    1.  **Given** Sevak is autonomously navigating in 'simulation_farm_challenging_light_v1'.
    2.  **When** Sevak approaches 'obstacle_glare_01' (in simulated sun glare).
    3.  **Then** Sevak's sensor fusion system should detect 'obstacle_glare_01' and avoid it.
    4.  **When** Sevak approaches 'obstacle_shadow_01' (in simulated deep shadow).
    5.  **Then** Sevak's sensor fusion system should detect 'obstacle_shadow_01' and avoid it.
*   **Expected Results**:
    *   Sevak successfully detects and avoids obstacles despite challenging lighting.
    *   Sensor fusion algorithms demonstrate robustness.
*   **AI Verifiable Pass/Fail Criteria**:
    *   **Pass**:
        *   Simulation log `sevak_sim_log_[timestamp].txt` contains detection and successful avoidance events for both `obstacle_glare_01` and `obstacle_shadow_01`.
        *   Log entries like "SENSOR_STATUS:CAMERA_GLARE_DETECTED_HIGH" or "SENSOR_STATUS:LIDAR_PRIMARY_FOR_DETECTION" might indicate sensor fusion working as expected.
        *   No `ERR_COLLISION` for either obstacle.
        *   AI analysis of simulated camera/LiDAR data confirms detection despite adverse conditions.
    *   **Fail**: Collision with either obstacle, failure to detect, or log indicating sensor failure without appropriate fallback.

### Test Case: OA-004
*   **ID**: OA-004
*   **Description**: Verify system behavior (graceful degradation or safe stop) when one primary obstacle detection sensor is compromised (e.g., simulated camera failure/occlusion) in CET.
*   **Pre-conditions**:
    *   Sevak is in CET, operating autonomously.
    *   A known static obstacle is on its path.
    *   The primary camera input is programmatically disabled or physically occluded during the approach.
*   **Steps**:
    1.  **Given** Sevak is approaching a known static obstacle in CET.
    2.  **When** the primary camera feed is simulated as lost (e.g., `sendCommand(camera0, disable)`).
    3.  **Then** the system should log "WARN_SENSOR_DEGRADED:PRIMARY_CAMERA_OFFLINE".
    4.  **And** the system should rely on other sensors (e.g., LiDAR, secondary cameras) to detect and avoid the obstacle.
    5.  **Or** if redundancy is insufficient for safe operation, the system should perform a safe stop and alert the user.
*   **Expected Results**:
    *   Sevak either avoids the obstacle using redundant sensors or performs a controlled safe stop.
    *   No collision occurs.
    *   System logs indicate sensor degradation and the responsive action taken.
*   **AI Verifiable Pass/Fail Criteria**:
    *   **Pass**:
        *   Telemetry log `sevak_cet_log_[timestamp].txt` contains "WARN_SENSOR_DEGRADED:PRIMARY_CAMERA_OFFLINE".
        *   Log subsequently contains either ("EVENT:OBSTACLE_DETECTED_VIA_REDUNDANT_SENSOR" and "EVENT:AVOIDANCE_MANEUVER_SUCCESSFUL") OR "EVENT:SAFE_STOP_SENSOR_DEGRADATION".
        *   No `ERR_COLLISION` with the obstacle.
        *   System status API `GET /api/sevak/status` reports `{"system_health": "degraded", "active_sensors": ["LiDAR", "IMU"]}` (example).
    *   **Fail**: Collision, failure to detect obstacle after sensor loss without safe stop, or absence of relevant log entries.

---
*More test cases for various obstacle types (animals, other vehicles), sizes, materials, approach angles, speeds, and environmental conditions (dust, rain - simulated first) would be added here, following the same structure and drawing from the High-Level Test Strategy Report.*