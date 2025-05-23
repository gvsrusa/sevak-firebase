# Phase 1 Specification: Core Tractor Mobility & Manual Control

## 1. Overview

This document outlines the specifications for Phase 1 of the Sevak project: "Core Tractor Mobility & Manual Control." The goal of this phase is to demonstrate reliable remote manual operation of the tractor platform. This phase corresponds to Milestones M1-M3 as defined in the Product Requirements Document ([`responses_LS2.md`](responses_LS2.md)).

## 2. Phase 1 Goal

Demonstrate reliable remote manual operation of the Sevak tractor platform, including basic tractor functionalities and a mobile application for pairing, manual control, and status display.

## 3. Tractor Specifications (V1 - Phase 1 Focus)

### 3.1. Core Systems
-   **Chassis & Drivetrain:** Basic platform capable of movement.
    -   Motors should be controllable for forward, reverse, left turn, right turn, and stop.
-   **Power System:**
    -   Operational battery pack and Battery Management System (BMS).
    -   Ability to power the control unit and motors.
-   **Onboard Control Unit (MCU/SBC):**
    -   Successfully boots.
    -   Capable of controlling drive motors based on commands.
    -   Runs foundational software (e.g., ROS or similar, basic firmware).
    -   Communicates with the mobile app (via Wi-Fi/Bluetooth).
-   **Communication Module:**
    -   Wi-Fi and/or Bluetooth module functional for connection with the mobile app.
    -   Protocol: To be selected (Decision Owner: Software Team Lead, Due: Sprint 1 End - PRD Section 8.2). Assume a placeholder for initial development.

### 3.2. Key Functionalities
-   **Motor Control:** The control unit must be able to receive commands (e.g., from the app via communication module) and translate them into motor actions for basic mobility.
-   **Physical Emergency Stop (E-Stop):**
    -   A physical E-Stop button on the tractor must be functional.
    -   Activation immediately cuts power to drive motors and other key mechanisms (cutter/loader if present).
    -   System enters a safe, non-operational state until manually reset.
    -   (Ref: PRD Section 5.B.7 - [`responses_LS2.md:454`](responses_LS2.md:454))
    -   **Acceptance Criteria (subset for physical E-Stop):**
        -   Pressing the physical E-Stop button brings all tractor motion to a complete stop within 1 second (or as fast as physically possible and safe).
        -   The tractor remains in a stopped state after E-Stop activation until a deliberate reset procedure is performed.

## 4. Mobile Application Specifications (V1 - Phase 1 Focus)

The mobile application will be developed for Android first.

### 4.1. Basic App Structure
-   Intuitive navigation.
-   Key screens/views for:
    -   Pairing/Connection Management.
    -   Manual Control Interface.
    -   Basic Status Display.
-   (Ref: PRD Section 4.3 - [`responses_LS2.md:238`](responses_LS2.md:238))

### 4.2. Connectivity & Pairing
-   **Functionality:** Allow the app to discover and pair with the Sevak tractor via Wi-Fi or Bluetooth.
-   **UI/UX:** Clear interface for initiating pairing, showing connection status.
-   (Ref: PRD Section 5.C.4 - [`responses_LS2.md:543`](responses_LS2.md:543) for settings related to pairing)
-   **Acceptance Criteria (subset for pairing):**
    -   User can successfully pair the app with the Sevak tractor via the settings menu or a dedicated connection screen.
    -   App clearly indicates connection status (Connected, Disconnected, Connecting).

### 4.3. Manual Control
-   **Functionality:** Provide direct remote control over the tractor's movements and (placeholder) auxiliary functions.
    -   (Ref: PRD Section 5.C.2 - [`responses_LS2.md:494`](responses_LS2.md:494))
-   **Interface:**
    -   Virtual joystick (or separate buttons) for:
        -   Forward
        -   Reverse
        -   Left Turn
        -   Right Turn
        -   Stop
    -   Toggle buttons for manual engagement/disengagement of cutter and loader mechanisms (these can be placeholders if mechanisms are not physically ready, but the app interface and command structure should exist).
-   **Safety:**
    -   Manual control speed should be limited to a very slow walking pace.
    -   Prominent E-Stop button on the manual control screen.
    -   "Deadman switch" concept or timeout for manual control enablement.
-   **Acceptance Criteria:**
    -   User can successfully control tractor's forward, reverse, left, and right movements using the app's manual controls. Tractor responds to commands within 1 second over a stable connection.
    -   User can send engage/disengage commands for cutter and loader mechanisms via app controls (tractor acknowledges command, actual mechanism activation depends on hardware readiness).
    -   Tractor operates at a reduced, safe speed (e.g., max 1 km/h) in manual mode.
    -   Manual control is disabled if app-tractor connection is lost.
    -   Activating the E-Stop from the mobile app brings all motion and powered mechanisms to a stop within 2 seconds.

### 4.4. Basic Status Display
-   **Functionality:** Display essential information from the tractor.
    -   (Ref: PRD Section 5.C.1 - [`responses_LS2.md:473`](responses_LS2.md:473))
-   **Information to Display:**
    -   Battery level of the tractor.
    -   Connectivity status to the tractor (e.g., "Connected," "Disconnected," signal strength if available).
    -   Basic tractor state (e.g., "Idle," "Manual Mode," "E-Stop Active").
-   **UI/UX:** Clear, easily understandable display.
-   **Acceptance Criteria (subset for Phase 1):**
    -   App displays tractor's battery level (accuracy depends on BMS integration, placeholder acceptable initially), updated periodically (e.g., every 30 seconds).
    -   App clearly indicates connection status to the tractor.
    -   App displays the tractor's E-Stop status.

## 5. Key Technologies & Decisions (from PRD V1 Recommendations)

-   **Onboard Control Unit:** Raspberry Pi, Jetson Nano, or automotive-grade MCU (PRD Section 4.3).
-   **Robotics Middleware (Tractor):** ROS (ROS 1 Noetic or ROS 2 Humble - Decision: Robotics Software Lead, Due: Sprint 2) or similar (PRD Section 10.8).
-   **Communication Protocol (App-Tractor):** Secure Wi-Fi (TCP/IP, UDP, MQTT) or Bluetooth (BLE/Classic) (Decision: Software Team Lead, Due: Sprint 1 End - PRD Section 8.2, 10.5).
    -   For Phase 1, a simple Wi-Fi TCP/IP or Bluetooth SPP (Serial Port Profile) might be the quickest to implement as a placeholder.
-   **Mobile App Platform:** Android primary (PRD Section 1.3). Existing codebase is Next.js/TypeScript.

## 6. Exclusions for Phase 1 (Explicitly from PRD Phase 1 description)

-   Autonomous navigation (waypoints, geofencing, full obstacle avoidance beyond E-Stop).
-   Autonomous cutting/loading operations.
-   Full task definition (polygon drawing, drop-off points on map).
-   Advanced status monitoring beyond battery/connectivity/basic state.
-   Notifications beyond basic connection/error.
-   Task history/logs.
-   Offline capabilities (beyond basic resilience of manual control commands).

## 7. Documentation & Testing

-   Code modules should be < 500 lines.
-   Unit tests should be integrated (TDD principles).
-   CI checks to be configured.
-   Test specifications to be provided by or collaborated on with TDD mode.