# Master Acceptance Test Plan: Project Sevak

## 1. Introduction

### 1.1. Purpose
This Master Acceptance Test Plan (MATP) outlines the strategy, scope, resources, schedule, and deliverables for the high-level end-to-end acceptance testing of Project Sevak, an autonomous electric fodder cutting and transport mini-tractor. The primary goal of this MATP is to define a comprehensive set of acceptance tests that, if passed, provide high confidence that Sevak meets its specified requirements and user expectations, aligning with the principles outlined in the [`docs/research/high_level_test_strategy_report.md`](../research/high_level_test_strategy_report.md:1).

### 1.2. Scope of Testing
This MATP covers end-to-end acceptance testing, focusing on:
*   Verification of complete user-centric operational flows.
*   Integration of all critical hardware and software components.
*   Validation against real-world scenarios and data.
*   Assessment of overall system reliability, safety, and usability.
*   Confirmation of launch readiness.

This plan does *not* cover unit, component, or granular integration testing, which are assumed to be addressed at earlier stages of development.

### 1.3. Project Goals Alignment
The acceptance tests defined herein are directly derived from Project Sevak's core objectives: to provide farmers with a reliable, efficient, safe, and easy-to-use autonomous solution for fodder management.

## 2. Overall Test Strategy

### 2.1. Approach
The testing strategy, as detailed in the [`docs/research/high_level_test_strategy_report.md`](../research/high_level_test_strategy_report.md:58), adopts a blended, iterative approach:
1.  **Simulation-Based Testing (SBT)**: Extensive use of virtual environments to test algorithms, sensor fusion, and a wide range of scenarios (including hazardous ones) in a controlled, cost-effective, and repeatable manner.
    *   **AI Verifiable Completion**: Simulation logs confirm successful completion of N test scenarios without critical failures, achieving X% path accuracy and Y% obstacle detection/avoidance rates.
2.  **Controlled Environment Testing (CET)**: Testing on dedicated test tracks or controlled farm plots with physical mock-ups and real hardware.
    *   **AI Verifiable Completion**: Telemetry data from CET runs shows adherence to planned paths within Z cm tolerance, successful obstacle negotiation for M predefined obstacles, and operational logs match expected outcomes for P test cases.
3.  **Real-World Field Testing (RFT)**: Phased testing in actual farm environments, progressing from supervised to more independent operation.
    *   **AI Verifiable Completion**: Field operation logs from RFT demonstrate successful completion of Q autonomous task cycles covering A_total area, with an operational uptime of U% and user-reported critical issues below S_threshold. Data logs are complete and accurate.

Feedback from each phase will inform development and subsequent test cycles.

### 2.2. Test Levels
This MATP focuses exclusively on **Acceptance Testing**.

### 2.3. Test Types
The primary types of tests to be conducted include:
*   **Functional Tests**: Verifying core features and capabilities.
*   **Scenario-Based Tests**: Simulating real-world user workflows.
*   **Usability Tests**: Assessing ease of use and user experience.
*   **Performance Tests**: Evaluating operational endurance and efficiency.
*   **Reliability Tests**: Assessing system stability over extended operations.
*   **Safety Tests**: Verifying all safety-critical functions.

## 3. Test Environment and Resources

### 3.1. Test Environments
*   **Simulation Environment**: High-fidelity simulator (e.g., Gazebo, CARLA, NVIDIA Isaac Sim) with models for agricultural terrain, crops, Sevak vehicle dynamics, sensors (GPS, LiDAR, cameras, IMU), and weather.
    *   **AI Verifiable Setup**: Automated script verifies simulator version, presence of required environment models (e.g., `farm_model_v1.2.sdf`), sensor models, and vehicle model `sevak_v1.0.urdf` are loaded.
*   **Controlled Test Environment**: A dedicated, secure test track or controlled farm plot with physical markers, mock obstacles (static and dynamic soft targets), and charging infrastructure.
    *   **AI Verifiable Setup**: Pre-test checklist run via a mobile app confirms: track clear, N static obstacles placed at predefined coordinates (verified by GPS tags), M dynamic soft targets operational, charging station voltage nominal.
*   **Real-World Farm Environments**: Selected partner farms representing diverse conditions (terrain, crop types, typical obstacles).
    *   **AI Verifiable Setup**: Geofence for the test area is uploaded to Sevak and confirmed via system status API. Pre-operation safety checklist (e.g., weather conditions within limits, emergency communication channel active) confirmed via system log.

### 3.2. Test Tools
*   **Test Management**: Jira with Xray/Zephyr or TestRail.
*   **BDD Framework**: Cucumber/Behave for test case definition.
*   **Data Logging & Analysis**: ROS bags, custom logging frameworks, ELK stack, Grafana.
*   **Version Control**: Git for test scripts, models, data.
*   **Simulation Platform**: As specified in 3.1.

### 3.3. Roles and Responsibilities
*   **Test Manager**: Oversees test planning, execution, and reporting.
*   **Test Engineers**: Design, develop, and execute test cases; analyze results.
*   **Domain Experts (Agriculture)**: Provide input on realistic scenarios and usability.
*   **Development Team**: Provide support, fix defects.
*   **Product Owner**: Approves acceptance criteria and final acceptance.

## 4. Test Schedule (High-Level Phases)

1.  **Phase 1: Simulation-Based Testing (SBT)**
    *   Focus: Algorithm validation, core autonomous functions, broad scenario coverage, initial obstacle avoidance.
    *   Duration: [Specify Duration, e.g., 4-6 Weeks]
    *   AI Verifiable Milestone: 80% of SBT test cases for autonomous navigation and basic obstacle avoidance pass. Simulation logs show consistent performance metrics.
2.  **Phase 2: Controlled Environment Testing (CET)**
    *   Focus: Hardware-software integration, refined obstacle avoidance, powertrain performance, basic UI/UX.
    *   Duration: [Specify Duration, e.g., 3-5 Weeks]
    *   AI Verifiable Milestone: 70% of CET test cases pass, including successful completion of 5 full task cycles. Telemetry data validates performance against benchmarks.
3.  **Phase 3: Real-World Field Testing (RFT) - Pilot**
    *   Focus: Performance in diverse real environments, extended operations, usability with real users, data logging accuracy.
    *   Duration: [Specify Duration, e.g., 6-8 Weeks]
    *   AI Verifiable Milestone: Sevak completes 20 operational hours in real farm environments with <X critical incidents. User feedback (via digital survey) scores >Y on key usability metrics. Data logs are 99% complete and accurate.
4.  **Phase 4: Full System Integration & Launch Readiness Testing**
    *   Focus: "Day/Week in the Life" scenarios, stress testing, final safety validation, all features.
    *   Duration: [Specify Duration, e.g., 2-4 Weeks]
    *   AI Verifiable Milestone: All P0 and P1 test cases pass. System achieves 95% operational availability over a continuous 48-hour test period. All safety interlocks verified via diagnostic logs.

## 5. Key Test Categories and Deliverables

The high-level acceptance tests are organized into the following categories, detailed in separate documents within the [`docs/tests/high_level_acceptance_tests/`](./high_level_acceptance_tests/) directory:

*   **`autonomous_operation.md`**: Tests for navigation, path planning, task execution.
    *   AI Verifiable Deliverable: Test execution logs from simulation/CET/RFT show successful completion of N autonomous missions, with path deviation < X cm and task completion rate > Y%.
*   **`obstacle_avoidance.md`**: Tests for detecting and avoiding static and dynamic obstacles.
    *   AI Verifiable Deliverable: Sensor logs and video recordings (analyzed by an AI model) confirm detection of P predefined obstacles with Q% accuracy and successful avoidance maneuvers in R% of encounters.
*   **`task_management_ui_ux.md`**: Tests for PWA dashboard, map interface, manual controls, alerts, PWA installability, and offline capabilities.
    *   AI Verifiable Deliverable: Automated UI tests (e.g., using Playwright/Cypress) complete S PWA user flows successfully. User interaction logs (browser and system) show task completion times within T seconds for key operations. Lighthouse PWA audit scores meet defined thresholds for installability and offline support. Service worker and local storage interactions verified.
*   **`powertrain_battery_management.md`**: Tests for endurance, charging, low battery behavior.
    *   AI Verifiable Deliverable: Telemetry logs confirm battery discharge rates align with projections (+/- Z%), charging completes within specified time, and low-battery "return home" initiated at correct SoC.
*   **`data_logging_system_integrity.md`**: Tests for accuracy and completeness of logged data.
    *   AI Verifiable Deliverable: Automated script compares logged operational data (e.g., area_covered, hours_worked) against ground truth data from simulation/CET, with discrepancies < D%. Error injection tests confirm correct logging of E predefined fault codes.
*   **`full_system_integration_launch_readiness.md`**: Comprehensive end-to-end scenarios.
    *   AI Verifiable Deliverable: Successful completion of "Day in the Life" scenarios verified by aggregated system logs and telemetry. All safety critical function tests pass, confirmed by diagnostic system status reports.

### 5.1. Test Deliverables
*   This Master Acceptance Test Plan document.
*   High-Level Acceptance Test Case documents (Gherkin/BDD format).
*   Test Data (simulation models, farm layouts, obstacle libraries).
*   Test Execution Logs (from simulation, CET, RFT).
*   Bug Reports.
*   Test Summary Reports for each phase.
*   Final Acceptance Test Report.
    *   AI Verifiable Completion: Final report generated, digitally signed (or committed to Git with specific tag by Product Owner), and all linked test execution summaries show a pass rate >98% for critical tests.

## 6. Entry and Exit Criteria

### 6.1. Entry Criteria for Acceptance Testing
*   All lower-level testing (unit, component, integration) completed and passed.
*   System build deployed to the designated test environment.
*   Test environment configured and verified.
*   Required test data available.
*   Key documentation (Blueprint, System Architecture, User Manual draft) available.
*   AI Verifiable Check: Automated script confirms: latest build tag deployed, test environment health check API returns "OK", N critical test data sets are present and checksum-verified.

### 6.2. Exit Criteria for Acceptance Testing (Launch Readiness)
*   All defined high-level acceptance test cases executed.
*   100% pass rate for all critical (Priority 0, Priority 1) test cases.
*   >95% pass rate for all other test cases.
*   No outstanding critical or major defects.
*   All major known issues have documented workarounds approved by the Product Owner.
*   Test Summary Reports and Final Acceptance Report approved.
*   AI Verifiable Check: Test management tool API reports 0 open P0/P1 defects. Automated analysis of test execution logs shows overall pass rate meeting thresholds. Final Acceptance Report has "Approved" status in document management system (or specific Git commit tag).

## 7. AI Verifiability
Throughout this plan, "AI Verifiable" criteria are specified. This implies that the completion or success of a task, test, or phase can be determined programmatically, often by:
*   Parsing log files for specific entries, patterns, or metrics.
*   Querying system APIs for status or data.
*   Analyzing telemetry data against benchmarks.
*   Using AI/ML models for image/video analysis (e.g., obstacle detection in test footage).
*   Checking for the existence and integrity of specific files or data artifacts.
*   Verifying digital signatures or specific commit tags in version control.

This approach aims to automate parts of the verification process, increasing efficiency and objectivity.

## 8. Document Approval
| Role             | Name          | Signature/Approval Date |
|------------------|---------------|-------------------------|
| Test Manager     | [To Be Named] |                         |
| Product Owner    | [To Be Named] |                         |
| Project Lead     | [To Be Named] |                         |