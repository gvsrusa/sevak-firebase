# Sevak Mobile Companion Application System Architecture

## 1. Introduction

This document defines the high-level architecture for the Sevak Mobile Companion Application, a critical component of the overall Sevak autonomous fodder cutting and transport mini-tractor system. This architecture is designed to meet the functional and non-functional requirements outlined in [`docs/PRDMasterPlan.md`](docs/PRDMasterPlan.md), support the AI-verifiable tasks within it, and ensure the successful execution of the high-level acceptance tests located in [`docs/tests/high_level_acceptance_tests/`](docs/tests/high_level_acceptance_tests/). The design also incorporates and adapts the `mvllow/next-pwa-template` as detailed in the [`docs/research/github_template_research_report.md`](docs/research/github_template_research_report.md) and [`docs/template_integration_guide.md`](docs/template_integration_guide.md).

This architecture serves as a foundational step for the project, guiding subsequent development, testing, and deployment phases.

## 2. Overall System Context

The Sevak system comprises two primary, interconnected entities:

1.  **Sevak Tractor Unit:** The physical autonomous mini-tractor responsible for fodder cutting, loading, and transport. It includes hardware components (chassis, drivetrain, power system, sensors, actuators) and an onboard control unit running robotics software (e.g., ROS).
2.  **Sevak Mobile Companion Application:** A Progressive Web Application (PWA) that serves as the primary user interface for farmers to interact with the Sevak Tractor. It enables task definition, real-time monitoring, manual control, and system configuration.

The mobile application communicates directly with the Sevak Tractor via a local wireless connection, emphasizing offline capability for core operations.

## 3. Sevak Mobile Companion Application Architecture

The Sevak Mobile Companion Application will be built as a Next.js PWA, leveraging its capabilities for offline support and native-like user experience.

### 3.1. Component Diagram (Conceptual)

```mermaid
graph TD
    A[User Device (Smartphone/Tablet)] -->|Local Wi-Fi/Bluetooth| B(Sevak Mobile App PWA)
    B -->|Commands, Task Data| C(Communication Layer)
    C -->|Real-time Status, Alerts, Logs| B
    C -->|Local Wi-Fi/Bluetooth| D[Sevak Tractor Unit]

    subgraph Sevak Mobile App PWA
        B1(User Interface & Experience Layer)
        B2(Application Logic Layer)
        B3(Local Data Persistence Layer)
        B4(Communication Layer)
        B1 --- B2
        B2 --- B3
        B2 --- B4
    end

    subgraph Sevak Tractor Unit
        D1(Onboard Control Unit - ROS)
        D2(Sensor Suite)
        D3(Actuator Control)
        D4(Power Management System)
        D1 --- D2
        D1 --- D3
        D1 --- D4
        D1 --- C
    end

    B1 -->|Map Interaction| B1.1(Mapping Component)
    B1 -->|User Input| B1.2(Control Components)
    B1 -->|Display Data| B1.3(Status Display Components)
    B2 -->|Task Management| B2.1(Task Manager Module)
    B2 -->|Data Handling| B2.2(Data Processor Module)
    B3 -->|Offline Storage| B3.1(IndexedDB/LocalStorage)
```

### 3.2. Key Components and Responsibilities

*   **User Interface & Experience (UI/UX) Layer:**
    *   **Responsibility:** Presents information to the user and captures user input. Focuses on intuitive design, high contrast, and clear iconography for rural farmers.
    *   **Sub-components:**
        *   **Dashboard:** Displays real-time status (location, battery, current activity, alerts). Directly supports `UIX-002`.
        *   **Map View:** Interactive map for defining cutting areas (polygons), drop-off points, and home base locations. Enables visual monitoring of Sevak's path. Directly supports `US1.1`, `US1.2`, `US2.1`, `UIX-001`.
        *   **Task Management UI:** Interface for creating, saving, starting, pausing, and stopping autonomous tasks. Supports `US1.3`, `US2.1`, `5.A.4`.
        *   **Manual Control UI:** Virtual joystick and toggles for direct control of Sevak's movement, cutter, and loader. Supports `US2.2`, `UIX-003`.
        *   **Notifications Display:** Prominently displays alerts (low battery, obstacle, task completion) and provides actionable options. Supports `US1.4`, `US2.5`, `UIX-004`.
        *   **Settings & History:** Configuration options and a view of past tasks and basic logs. Supports `US2.3`, `5.C.4`, `5.C.5`.
*   **Application Logic Layer:**
    *   **Responsibility:** Processes user input, manages application state, orchestrates data flow between UI and Communication Layer, and handles local data validation.
    *   **Modules:**
        *   **Task Manager Module:** Manages the lifecycle of tasks (creation, validation, saving, loading, queuing).
        *   **Data Processor Module:** Transforms raw data from the tractor into a format suitable for UI display and vice-versa. Handles data aggregation for history/logs.
        *   **State Management:** Centralized state management (e.g., using React Context API or a lightweight library like Zustand) for tractor status, task definitions, and UI state.
*   **Local Data Persistence Layer:**
    *   **Responsibility:** Stores application data locally on the device to enable offline functionality and persist user settings and task history.
    *   **Technologies:** Primarily IndexedDB for structured data (tasks, logs) and localStorage for simpler key-value pairs (settings). This is crucial for `US2.1` and `5.C.6`.
*   **Communication Layer:**
    *   **Responsibility:** Establishes and maintains a secure, reliable local communication channel with the Sevak Tractor. Sends commands and receives telemetry.
    *   **Protocols:**
        *   **WebSockets over Local Wi-Fi:** Preferred for real-time, bidirectional communication for status updates and control commands due to higher bandwidth and lower latency.
        *   **Bluetooth Low Energy (BLE):** As a fallback or for initial pairing/low-bandwidth data, especially if Wi-Fi direct is problematic in some scenarios.
    *   **API Contracts:** Defines clear data structures for commands (e.g., `{"command": "start_task", "task_id": "uuid", "payload": {"cutting_area": [...]}}`) and telemetry (e.g., `{"status": "cutting", "location": {"lat": ..., "lon": ...}, "battery": 75}`). This supports AI-verifiable outcomes in tests like `AO-001` (API status checks) and `DLSI-004` (data retrieval).

### 3.3. Data Flow (Sequence Diagram Ideas)

**Initiate Autonomous Task:**
1.  User defines `cuttingArea`, `dropOffLocation`, `homeBaseLocation` via Map View UI.
2.  UI/UX Layer sends task data to Application Logic Layer.
3.  Application Logic Layer validates and saves task to Local Data Persistence.
4.  Application Logic Layer sends "Start Task" command with task parameters to Communication Layer.
5.  Communication Layer transmits command to Sevak Tractor.
6.  Sevak Tractor acknowledges, begins task, and sends real-time status updates back via Communication Layer.
7.  Communication Layer relays status to Application Logic Layer.
8.  Application Logic Layer updates UI/UX Layer for display on Dashboard and Map View.

**Real-time Status Update:**
1.  Sevak Tractor continuously sends telemetry (location, battery, status) to Communication Layer.
2.  Communication Layer receives and forwards to Application Logic Layer.
3.  Application Logic Layer processes and updates relevant state.
4.  UI/UX Layer re-renders Dashboard and Map View with latest data.

### 3.4. Technology Stack

*   **Frontend Framework:** Next.js (Pages Router)
*   **UI Library:** React
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **PWA Capabilities:** `next-pwa`
*   **Theming:** `next-themes`
*   **Mapping:** Leaflet.js (or similar open-source mapping library for cost-effectiveness and offline map tile support)
*   **Local Storage:** IndexedDB, localStorage
*   **Communication:** WebSockets (for real-time), potentially Bluetooth API (for device pairing/low-bandwidth).

## 4. Integration with Sevak Tractor

The mobile application acts as the command and control interface for the Sevak Tractor. The communication link is critical.

*   **API Contract Definition:** A formal API contract will be defined for all interactions between the mobile app and the tractor's onboard control unit. This contract will specify message formats (e.g., JSON), endpoints/topics, and expected responses for commands (e.g., `start_task`, `manual_drive`, `emergency_stop`) and telemetry (e.g., `current_location`, `battery_status`, `error_alerts`). This directly supports AI-verifiable tests that check API responses and log entries.
*   **Robustness:** The communication layer will implement retry mechanisms, error handling, and state synchronization to ensure reliable operation even with intermittent connectivity, supporting `FSILR-004`.
*   **Security:** Secure pairing and encrypted communication channels (e.g., WPA2 for Wi-Fi, secure Bluetooth pairing) will be implemented to prevent unauthorized control, addressing `6.5. Security` in the PRD.

## 5. Alignment with PRD and High-Level Acceptance Tests

The architectural design directly supports the AI-verifiable tasks and high-level acceptance tests:

*   **PRD Feature 5.A (Autonomous Fodder Cutting & Transport Task Management):** The UI/UX Layer's Map View and Task Management UI are central to defining and initiating tasks. The Communication Layer ensures these tasks are transmitted to the tractor. `UIX-001` (defining areas) and `AO-001` (full task cycle) are directly enabled.
*   **PRD Feature 5.C.1 (Status Monitoring):** The Dashboard and Map View components in the UI/UX Layer are designed for real-time display of tractor status, directly addressing `UIX-002`.
*   **PRD Feature 5.C.2 (Manual Control Mode):** The Manual Control UI with its virtual joystick is a dedicated component for this, supporting `UIX-003`.
*   **PRD Feature 5.C.3 (Notifications):** The Notifications Display component ensures timely and actionable alerts, as verified by `UIX-004`.
*   **PRD Feature 5.C.5 (Task History/Logs):** The Local Data Persistence Layer and associated UI components will store and display task history, supporting `DLSI-001`, `DLSI-002`, `DLSI-004`.
*   **PRD Feature 5.C.6 (Offline Capability):** The PWA nature, enabled by `next-pwa` and the Local Data Persistence Layer, directly addresses this critical requirement, supporting `US2.1`.
*   **Non-Functional Requirements (Section 6 of PRD):**
    *   **Performance:** Next.js and React provide a performant foundation. Efficient data handling and optimized communication protocols will ensure responsiveness (`6.1. Performance`).
    *   **Usability:** The UI/UX Layer's focus on simplicity and clarity directly addresses usability goals (`6.3. Usability`).
    *   **Reliability & Availability:** Offline capabilities and robust communication contribute to reliability (`6.4. Reliability & Availability`).
    *   **Security:** Secure communication protocols are a core part of the Communication Layer (`6.5. Security`).
    *   **Maintainability:** Modular component design and TypeScript usage enhance maintainability (`6.6. Maintainability`).
*   **High-Level Acceptance Tests:** Each test case (e.g., `AO-001`, `OA-001`, `PBM-002`, `DLSI-001`, `FSILR-001`) has specific AI-verifiable criteria that depend on the mobile app's ability to send commands, display status, and retrieve logs, all of which are supported by this architecture.

## 6. Leveraging `mvllow/next-pwa-template`

The `mvllow/next-pwa-template` forms the foundational boilerplate for the Sevak Mobile Companion Application.

*   **Core PWA Setup:** The template's pre-configured `next-pwa` integration, `next.config.js` setup, and `public/manifest.json` are directly adopted, providing immediate PWA capabilities (installability, service worker registration, offline caching of static assets). This significantly accelerates the initial setup for offline functionality.
*   **Technology Stack Alignment:** The template's use of Next.js, React, TypeScript, and Tailwind CSS aligns perfectly with the project's chosen frontend technologies, minimizing integration friction.
*   **Routing Strategy:** As per the [`docs/template_integration_guide.md`](docs/template_integration_guide.md), the decision is to proceed with the **Pages Router** structure provided by the template for the mobile application. This keeps the PWA self-contained and leverages the template's existing routing paradigm, simplifying initial development. Future considerations might involve adapting to an App Router if a unified frontend codebase becomes a higher priority.
*   **Theming:** The `next-themes` integration from the template will be utilized for light/dark mode functionality, enhancing user experience.
*   **Boilerplate Adaptation:** The template's "fluffless" nature means minimal extraneous code to remove. The existing `components/`, `pages/`, `public/`, and `styles/` directories will be adapted and extended with Sevak-specific UI and logic.

## 7. Scalability, Security, Performance, Maintainability Considerations

*   **Scalability:** V1 focuses on a single tractor per app. The architecture supports this by relying on local device storage and direct peer-to-peer communication. Future scalability to multiple tractors would require a backend service for centralized management and potentially cloud-based communication, which is out of V1 scope but considered for future iterations.
*   **Security:** Emphasis on secure local communication (WPA2, secure BLE pairing) and data protection for locally stored task definitions. No sensitive personal data is stored. Regular security audits will be part of the development lifecycle.
*   **Performance:** Next.js's optimizations, efficient React component rendering, and streamlined data flow will ensure a responsive UI. Local communication minimizes network latency. PWA caching improves load times.
*   **Maintainability:** Modular component design, clear separation of concerns (UI, logic, data, communication), and strong typing with TypeScript will enhance code readability, testability, and maintainability. Comprehensive documentation (like this architecture document) and adherence to coding standards will be enforced.

## 8. Identified Scaffolding Needs

Based on this architecture, the following scaffolding needs are identified to implement the Sevak Mobile Companion Application:

*   **Project Setup:** Initializing the Next.js project within the `mobile-app/` directory, copying and adapting the `mvllow/next-pwa-template` files, and installing dependencies.
*   **Core UI Components:** Developing reusable React components for the dashboard, map, task lists, status indicators, and manual controls (e.g., virtual joystick).
*   **Mapping Integration:** Setting up the chosen mapping library (e.g., Leaflet.js) and implementing map interaction logic (polygon drawing, pin placement).
*   **Communication Modules:** Implementing the WebSockets and/or Bluetooth communication clients to interact with the Sevak Tractor's API. This includes defining data models for messages.
*   **Local Data Storage:** Setting up IndexedDB and/or localStorage for persistent storage of tasks, settings, and logs.
*   **Routing:** Defining the page structure and navigation using Next.js Pages Router.
*   **Testing Infrastructure:** Setting up unit, integration, and end-to-end testing frameworks for the mobile application, aligning with the AI-verifiable criteria in the high-level acceptance tests.

## 9. Conclusion

This architectural design for the Sevak Mobile Companion Application provides a robust, user-centric, and technically sound foundation. By leveraging the `mvllow/next-pwa-template`, it ensures strong PWA capabilities and aligns with the project's chosen technology stack. The defined components, data flows, and technology choices directly support the AI-verifiable tasks in [`docs/PRDMasterPlan.md`](docs/PRDMasterPlan.md) and are explicitly designed to pass the high-level acceptance tests, particularly those related to task management, UI/UX, and offline functionality. As a foundational architectural step, it sets the stage for detailed design and implementation, with clear scaffolding needs identified for the development team.