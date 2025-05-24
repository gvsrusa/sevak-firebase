# High-Level Acceptance Tests: Electric Powertrain & Battery Management

This document outlines high-level acceptance tests for the electric powertrain and battery management system of Project Sevak, as defined in the [`docs/research/high_level_test_strategy_report.md`](../../research/high_level_test_strategy_report.md:112) and referenced in the [`docs/tests/master_acceptance_test_plan.md`](../master_acceptance_test_plan.md:124).

## Test Suite: PBM - Powertrain & Battery Management

### Test Case: PBM-001
*   **ID**: PBM-001
*   **Description**: Verify operational endurance: Sevak completes a simulated 4-hour workday (cutting and transport) on a single full charge in CET under representative load.
*   **Pre-conditions**:
    *   Sevak is in CET.
    *   Battery is fully charged (100%, State of Charge - SoC).
    *   A series of tasks are queued to simulate a 4-hour continuous operation involving cutting (medium density fodder model) and transport (50% max load capacity).
    *   Ambient temperature is 25°C.
*   **Steps**:
    1.  **Given** Sevak is in CET with 100% SoC and a 4-hour task queue.
    2.  **When** the autonomous operation is initiated.
    3.  **Then** Sevak should operate continuously for at least 4 hours, performing cutting and transport tasks.
    4.  **And** battery SoC should decrease gradually.
    5.  **And** motor and battery temperatures should remain within safe operational limits.
*   **Expected Results**:
    *   Sevak operates for a minimum of 4 hours without premature battery depletion.
    *   No overheating warnings or shutdowns from powertrain components.
    *   At the end of 4 hours, SoC should be > X% (e.g., 15%, to allow return to home).
*   **AI Verifiable Pass/Fail Criteria**:
    *   **Pass**:
        *   Telemetry log `sevak_cet_log_[timestamp].txt` shows continuous operation for >= 4.0 hours (based on timestamps of operational state changes).
        *   Log contains "METRIC:BATTERY_SOC_END_4HR: [value > 15.0]".
        *   Log contains "METRIC:MAX_MOTOR_TEMP_4HR: [value < safe_op_limit_motor_C]" and "METRIC:MAX_BATTERY_TEMP_4HR: [value < safe_op_limit_battery_C]".
        *   No `ERR_POWERTRAIN_OVERHEAT` or `ERR_UNEXPECTED_SHUTDOWN_LOW_POWER` entries within the 4-hour window.
        *   System status API `GET /api/sevak/powertrain_status` at 4 hours shows `{"battery_soc": >15, "motor_temp": <limit>, "battery_temp": <limit>}`.
    *   **Fail**: Operation stops before 4 hours due to battery depletion, overheating occurs, or SoC at 4 hours is below the defined threshold.

### Test Case: PBM-002
*   **ID**: PBM-002
*   **Description**: Verify accurate low battery warnings and autonomous "return to home/charging station" function.
*   **Pre-conditions**:
    *   Sevak is operating autonomously in CET or RFT.
    *   Battery SoC is approaching the low warning threshold (e.g., 20%).
    *   A 'Home Base' with a simulated or real charging station is defined.
*   **Steps**:
    1.  **Given** Sevak is operating and its battery SoC drops to 20%.
    2.  **Then** a "Low Battery Warning - SoC at 20%. Return to Home Recommended." alert should be displayed on the UI and logged.
    3.  **And** the system should provide an option to initiate "Return to Home" or continue task with caution.
    4.  **When** battery SoC drops to critical threshold (e.g., 15%) OR user initiates "Return to Home".
    5.  **Then** Sevak should pause its current task.
    6.  **And** Sevak should autonomously navigate to the defined 'Home Base'/charging station.
    7.  **And** log "EVENT:AUTONOMOUS_RETURN_TO_HOME_LOW_BATTERY_INITIATED".
*   **Expected Results**:
    *   Timely and accurate low battery warnings are issued.
    *   Autonomous return to home function engages reliably and navigates correctly.
    *   Sevak reaches home base before complete battery depletion.
*   **AI Verifiable Pass/Fail Criteria**:
    *   **Pass**:
        *   Telemetry log `sevak_log_[timestamp].txt` contains "ALERT:LOW_BATTERY_WARNING_SOC_20" when SoC crosses 20% (+/- 1% tolerance).
        *   Log contains "EVENT:AUTONOMOUS_RETURN_TO_HOME_LOW_BATTERY_INITIATED" when SoC crosses 15% (or user action).
        *   Log contains "EVENT:REACHED_HOME_BASE_LOW_BATTERY".
        *   Final SoC upon reaching home base is `> 5%` (safety margin).
        *   UI log (if available) confirms display of low battery alert.
        *   GPS track data confirms navigation to the correct Home Base coordinates.
    *   **Fail**: Warnings not issued or inaccurate, return to home fails to initiate or navigates incorrectly, Sevak runs out of power before reaching home.

### Test Case: PBM-003
*   **ID**: PBM-003
*   **Description**: Verify charging performance: time to charge from low state (e.g., 15%) to full (e.g., 95%) and charging system safety.
*   **Pre-conditions**:
    *   Sevak is at the charging station.
    *   Battery SoC is at 15%.
    *   Charging system is connected and active.
    *   Ambient temperature 25°C.
*   **Steps**:
    1.  **Given** Sevak is at the charging station with 15% SoC and connected to the charger.
    2.  **When** charging is initiated.
    3.  **Then** the UI and system logs should indicate "STATUS:CHARGING_IN_PROGRESS".
    4.  **And** battery SoC should increase over time.
    5.  **And** battery temperature should be monitored and remain within safe charging limits.
    6.  **When** battery SoC reaches 95% (or defined full charge level).
    7.  **Then** charging should automatically stop or switch to trickle charge.
    8.  **And** UI and system logs should indicate "STATUS:CHARGING_COMPLETE" or "STATUS:TRICKLE_CHARGE".
*   **Expected Results**:
    *   Battery charges from 15% to 95% within the specified timeframe (e.g., < 3 hours).
    *   Charging process is safe, without overheating.
    *   System correctly identifies full charge and stops/adjusts charging.
*   **AI Verifiable Pass/Fail Criteria**:
    *   **Pass**:
        *   Telemetry log `sevak_charging_log_[timestamp].txt` shows SoC increasing from 15% to 95%.
        *   Log contains "METRIC:CHARGE_TIME_15_TO_95: [value < 3.0 hours]".
        *   Log contains "METRIC:MAX_BATTERY_TEMP_DURING_CHARGE: [value < safe_charging_temp_limit_C]".
        *   Log contains "EVENT:CHARGING_STARTED SOC:15%", "EVENT:CHARGING_PROGRESSED SOC:50%", "EVENT:CHARGING_COMPLETE SOC:95%".
        *   No `ERR_CHARGER_FAULT` or `ERR_BATTERY_OVERHEAT_CHARGE` entries.
        *   Charger API (if available) reports status changes correctly.
    *   **Fail**: Charging time exceeds specification, battery overheats, charging does not stop at full, or errors are logged.

### Test Case: PBM-004
*   **ID**: PBM-004
*   **Description**: Verify powertrain safety interlocks (e.g., over-current, over-temperature protection for motor and battery) during high-load conditions (simulated or CET).
*   **Pre-conditions**:
    *   Sevak is subjected to a high-load scenario (e.g., cutting very dense fodder model, climbing a steep incline at max payload in simulation/CET).
    *   Monitoring tools for current draw and temperature are active.
*   **Steps**:
    1.  **Given** Sevak is operating under sustained high load.
    2.  **When** motor temperature approaches its critical limit (e.g., 90°C).
    3.  **Then** the system should trigger a power reduction or temporary shutdown of the motor, log "WARN_MOTOR_OVERTEMP_PROTECTION_ACTIVE", and alert the UI.
    4.  **When** battery discharge current exceeds its safe limit for a defined period.
    5.  **Then** the system should limit power output, log "WARN_BATTERY_OVERCURRENT_PROTECTION_ACTIVE", and alert the UI.
*   **Expected Results**:
    *   Safety interlocks activate correctly to prevent damage to powertrain components.
    *   System behavior is predictable and safe when limits are exceeded.
    *   Clear logs and UI alerts are generated.
*   **AI Verifiable Pass/Fail Criteria**:
    *   **Pass**:
        *   Telemetry log `sevak_log_[timestamp].txt` shows motor temperature reaching near-limit, followed by "WARN_MOTOR_OVERTEMP_PROTECTION_ACTIVE" and a corresponding reduction in motor power/speed telemetry. Motor temperature subsequently stabilizes or reduces.
        *   Log shows battery current exceeding threshold, followed by "WARN_BATTERY_OVERCURRENT_PROTECTION_ACTIVE" and a corresponding reduction in power output. Current subsequently drops below threshold.
        *   No `ERR_MOTOR_FAILURE_OVERHEAT` or `ERR_BATTERY_DAMAGE_OVERCURRENT` entries.
        *   System status API `GET /api/sevak/powertrain_status` reflects the protective state (e.g. `{"motor_status": "power_limited_temp"}`).
    *   **Fail**: Interlocks fail to activate, components exceed critical temperature/current limits leading to simulated/actual damage, or no logs/alerts generated.

---
*More test cases for different ambient temperatures, battery types (if options exist), regenerative braking (if applicable), and specific powertrain fault condition responses would be added here.*