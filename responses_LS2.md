Product Requirements Document: Sevak

Autonomous Electric Fodder Cutting & Transport Mini-Tractor

Version: 1.1 (was 1.0)

Date: May 23, 2025

Prepared For: SPARC Program Generation

Prepared By: Sevak Project Team / AI Product Manager

# 1. Introduction

## 1.1. Purpose of this PRD:

This Product Requirements Document (PRD) outlines the vision, features, functionalities, and technical considerations for the "Sevak" project - an autonomous electric fodder cutting and transport mini-tractor. It serves as the foundational guide for the SPARC team to design, develop, test, and deploy the Sevak system, including the physical tractor and its companion mobile application. This document aims to ensure a shared understanding of the project goals and deliverables.

## 1.2. Vision for Sevak:

Sevak aims to revolutionize fodder management for farmers in rural India by providing an affordable, reliable, and autonomous solution. The vision is to empower these farmers by significantly reducing their manual labor and time spent on fodder cutting and transportation, thereby allowing them to focus on other agricultural activities, improve their quality of life, and potentially enhance livestock productivity through a consistent and timely fodder supply. Sevak will be a robust, easy-to-use tool designed for the unique challenges of rural Indian agricultural environments.

## 1.3. Scope:

**In Scope (V1):**

- **Sevak Tractor:**
    - Autonomous navigation to predefined field areas.
    - Autonomous fodder cutting within specified boundaries.
    - Autonomous loading of cut fodder into an attached trailer.
    - Autonomous transport of fodder to a defined drop-off location.
    - Autonomous return to a home base or charging station.
    - Obstacle detection and avoidance (basic).
    - Operation within geofenced boundaries.
    - Battery charging capability.
    - Physical emergency stop button.
- **Sevak Mobile Application (Android Primary, iOS Secondary):**
    - Define cutting areas on a map (polygon drawing).
    - Set fodder drop-off locations (pinning).
    - Set home/charging base locations (pinning).
    - Start/stop autonomous tasks.
    - Monitor Sevak's status (idle, cutting, transporting, battery level, location).
    - Manual control of Sevak for precise movements (virtual joystick).
    - Manual engagement/disengagement of cutter and loader mechanisms.
    - Receive notifications (task completion, low battery, errors).
    - Basic settings configuration (e.g., Wi-Fi for local communication if applicable, potential cutting height if adjustable).
    - View task history/logs (basic).
    - Offline functionality for task definition and tractor operation using locally stored data, with sync upon reconnection.

**Out of Scope (V1 - May be considered for future versions):**

- Automated trailer tipping/unloading.
- Integration with weather services.
- Sophisticated fodder analysis sensors (e.g., moisture content).
- Cooperative operation of multiple Sevak units.
- Voice commands via the app.
- Variable speed operation based on fodder density (unless basic implementation is feasible).
- Roof-integrated solar panel for supplemental trickle charging.
- Advanced load sensing in trailer for precise fill level (basic estimation is in scope).
- Live camera feed(s) in the app.
- User account management beyond simple device pairing or local profiles.
- Advanced farm management software integration.
- Cellular connectivity for the tractor (initial focus on Wi-Fi/Bluetooth for app-tractor communication).

## 1.4. Reference to Source Document:

The primary source and inspiration for the Sevak project's requirements, user needs, and operational concepts is the "Zero-Code User Blueprint for SPARC Program Generation: Sevak" document, dated May 23, 2025. This PRD aims to formalize and expand upon the details provided in that blueprint.

## 1.5. Glossary of Terms:

- **A* (A-star):** A pathfinding and graph traversal algorithm used to find the shortest path between two points.
- **AI/ML (Artificial Intelligence / Machine Learning):** Computer systems able to perform tasks that normally require human intelligence, such as learning, problem-solving, and decision-making.
- **AMCL (Adaptive Monte Carlo Localization):** A probabilistic localization algorithm used for robots moving in a 2D environment to estimate their position and orientation within a known map.
- **API (Application Programming Interface):** A set of rules, protocols, and tools that allows different software applications to communicate and exchange data with each other.
- **Autonomous Operation:** The ability of Sevak to perform tasks (navigate, cut, transport) without direct continuous human control.
- **BLE (Bluetooth Low Energy):** A wireless personal area network technology designed for low power consumption, suitable for short-range communication between devices.
- **BMS (Battery Management System):** An electronic system that manages a rechargeable battery (cell or battery pack), monitoring its state, calculating secondary data, reporting that data, protecting the battery, controlling its environment, and/or balancing it.
- **COTS (Commercial Off-The-Shelf):** Products that are commercially available and can be bought and used directly, rather than being custom-developed.
- **Cutting Area:** A user-defined polygonal area on a map within the app where fodder is to be cut.
- **DFMA (Design for Manufacturability and Assembly):** An engineering methodology that focuses on simplifying product design to improve the ease and efficiency of manufacturing and assembly processes.
- **Drop-off Location:** A user-defined point on a map where Sevak will transport and deliver the cut fodder.
- **FK (Foreign Key):** In relational databases, a field (or collection of fields) in one table that uniquely identifies a row of another table or the same table. It is used to establish and enforce a link between the data in two tables.
- **Fodder:** Livestock feed, typically plant-based, grown in fields.
- **Geofencing:** Defining virtual boundaries (a geofence) within which Sevak is permitted to operate.
- **Home Base:** A user-defined point on a map where Sevak returns after tasks or for charging.
- **i18n (Internationalization):** The process of designing and developing software applications so that they can be adapted to various languages and regions without requiring engineering changes to the core product.
- **IMU (Inertial Measurement Unit):** An electronic device that measures and reports a body's specific force, angular rate, and sometimes the orientation of the body, using a combination of accelerometers, gyroscopes, and sometimes magnetometers.
- **l10n (Localization):** The process of adapting internationalized software for a specific region or language by adding locale-specific components and translating text.
- **LiFePO4 (Lithium Iron Phosphate):** A type of lithium-ion rechargeable battery chemistry known for its long cycle life, good thermal stability, and enhanced safety.
- **LIDAR (Light Detection and Ranging):** A remote sensing method that uses light in the form of a pulsed laser to measure ranges (variable distances) to the Earth or other objects. It can be used to create 3D maps of the environment.
- **MCU (Microcontroller Unit):** A small, self-contained computer on a single integrated circuit (IC) or chip, containing a processor core, memory (RAM, ROM, flash), and programmable input/output peripherals.
- **Mobile App:** The smartphone application (Android primary) used to control, configure, and monitor Sevak.
- **MQTT (Message Queuing Telemetry Transport):** A lightweight, publish-subscribe network protocol that transports messages between devices, often used in IoT applications.
- **MTBF (Mean Time Between Failures):** A measure of the predicted elapsed time between inherent failures of a mechanical or electronic system during normal system operation.
- **NMC (Nickel Manganese Cobalt):** A type of lithium-ion battery chemistry that combines nickel, manganese, and cobalt, known for its high energy density and good performance.
- **NPS (Net Promoter Score):** A management tool that can be used to gauge the loyalty of a firm's customer relationships. It serves as an alternative to traditional customer satisfaction research.
- **Obstacle Detection:** Sevak's ability to identify and react to unexpected objects in its path.
- **PCL (Point Cloud Library):** An open-source library for 2D/3D image and point cloud processing, providing algorithms for filtering, feature estimation, segmentation, registration, and more.
- **PK (Primary Key):** In relational databases, a specific choice of a minimal set of attributes (columns) that uniquely specify a tuple (row) in a relation (table).
- **QSG (Quick Start Guide):** A short, concise document that provides essential instructions to help users begin using a product or service quickly and effectively.
- **ROS (Robot Operating System):** A flexible framework for writing robot software. It is a collection of tools, libraries, and conventions that aim to simplify the task of creating complex and robust robot behavior across a wide variety of robotic platforms.
- **SDK (Software Development Kit):** A collection of software development tools in one installable package, facilitating the creation of applications for a specific software package, software framework, hardware platform, computer system, video game console, operating system, or similar development platform.
- **Sevak:** The autonomous electric fodder cutting and transport mini-tractor.
- **SLAM (Simultaneous Localization and Mapping):** A computational problem in robotics of constructing or updating a map of an unknown environment while simultaneously keeping track of an agent's location within it.
- **SPARC:** The AI-powered team of virtual coding assistants responsible for developing Sevak.
- **TCP/IP (Transmission Control Protocol/Internet Protocol):** A suite of communication protocols used to interconnect network devices on the internet and other computer networks.
- **UDP (User Datagram Protocol):** A communication protocol used across the Internet for time-sensitive transmissions such as video playback or Domain Name System (DNS) lookups. It offers a connectionless datagram service that emphasizes low-latency and loss-tolerating connections.
- **UI/UX (User Interface / User Experience):** UI refers to the graphical layout of an application, consisting of the buttons users click on, the text they read, the images, sliders, text entry fields, and all the rest of the items the user interacts with. UX refers to the overall experience a user has with a product or service, especially in terms of how easy or pleasing it is to use.
- **UUID (Universally Unique Identifier):** A 128-bit number used to identify information in computer systems. When generated according to standard methods, UUIDs are for practical purposes unique.

# 2. Goals and Objectives

## 2.1. Business Goals (Inferred):

- Successfully develop and deploy a functional and reliable autonomous fodder management solution tailored for rural Indian farmers.
- Achieve positive user adoption and satisfaction within the target farming community.
- Establish Sevak as an affordable and practical example of agricultural technology (AgriTech) for small-scale farming.
- Gather data and learnings to inform future iterations and potential expansion of autonomous solutions for small farms.

## 2.2. Product Goals:

- **Reduce Farmer Labor:** Significantly decrease the physical effort and time farmers spend on manually cutting and transporting fodder.
- **Increase Farmer Efficiency:** Free up farmers' time, allowing them to focus on other income-generating activities or personal well-being.
- **Improve Livestock Management:** Enable a more consistent and timely supply of fodder, potentially leading to better livestock health and productivity.
- **Enhance Safety:** Reduce risks associated with manual fodder cutting and handling.
- **Ensure Ease of Use:** Provide a simple, intuitive mobile application for task definition and monitoring, accessible to users with varying levels of technological literacy.
- **Maintain Affordability & Robustness:** Design Sevak using cost-effective components and ensure it can withstand typical rural environmental conditions.

## 2.3. Key Success Metrics:

- **Task Completion Rate:** Percentage of fodder cutting and transport tasks successfully completed by Sevak without critical errors or required manual intervention (beyond defined interactions like unloading).
- **Time Saved per Farmer:** Average reduction in daily/weekly hours spent on fodder management by user farmers.
- **User Satisfaction Score:** Measured through app feedback, surveys, or direct interviews (e.g., Net Promoter Score - NPS, or a simpler satisfaction scale).
- **Adoption Rate:** Number of farmers actively using Sevak within a pilot program or initial deployment area.
- **System Reliability (MTBF):** Mean Time Between Failures for the Sevak tractor and its core components.
- **Accuracy of Navigation & Cutting:** Percentage of defined cutting area successfully covered; deviation from planned drop-off points.
- **Obstacle Avoidance Success Rate:** Percentage of obstacles successfully detected and avoided without collision or unnecessary prolonged stoppage.

# 3. Target Audience & User Personas

## 3.1. Primary Users:

Farmers in rural India, particularly those involved in livestock rearing (e.g., dairy farmers, cattle owners) who currently spend a significant portion of their day on manual fodder collection and management. These users may have limited access to expensive agricultural machinery and varying levels of experience with digital technology, though smartphone penetration is growing.

### User Persona 1: Ramesh Kumar

- **Age:** 45
- **Occupation:** Small-scale dairy farmer with 5-10 cows.
- **Location:** Rural village in Northern India.
- **Tech Savviness:** Uses a basic Android smartphone primarily for calls, WhatsApp, and some YouTube. Can follow simple app instructions if clear and in a familiar language (or highly visual).
- **Fodder Needs:** Spends 3-4 hours daily cutting fodder by hand from his small field and transporting it via headload or a handcart to his cattle shed.
- **Goals:** Reduce physical strain, save time to potentially manage more livestock or engage in other farm activities, ensure his cows get enough fodder consistently.
- **Frustrations:** Physical exhaustion, time consumed by fodder tasks, inconsistent fodder availability during peak labor seasons or bad weather.

### User Persona 2: Priya Patel

- **Age:** 32
- **Occupation:** Manages the family farm with her husband, focusing on livestock and vegetable cultivation.
- **Location:** Village in Western India.
- **Tech Savviness:** Comfortable using an Android smartphone for various apps, including banking, information seeking, and social media. Quick learner for new apps if they are user-friendly.
- **Fodder Needs:** The family has around 15-20 mixed livestock (cows, goats). Fodder management is a shared responsibility but still very time-consuming.
- **Goals:** Automate repetitive tasks like fodder cutting to improve overall farm efficiency, explore modern farming techniques, and reduce reliance on hired labor which can be unreliable or expensive.
- **Frustrations:** Difficulty finding reliable help for fodder collection, the drudgery of the task, and the desire to optimize farm operations.

## 3.2. User Needs & Pain Points:

- **Need:** Automation of laborious fodder cutting.
    - **Pain Point:** Physical strain, injuries, and time lost from manual cutting with sickles or basic tools.
- **Need:** Automation of fodder transportation.
    - **Pain Point:** Difficulty and effort in carrying heavy loads of fodder over distances, often multiple times a day.
- **Need:** Simple and intuitive control over the autonomous system.
    - **Pain Point:** Fear of complex technology; lack of technical expertise to operate complicated machinery or software.
- **Need:** Reliable operation in varied field conditions.
    - **Pain Point:** Concerns about technology failing in uneven terrain, dusty environments, or during minor weather changes.
- **Need:** Safety for themselves, their families, and livestock.
    - **Pain Point:** Apprehension about autonomous machinery operating near people or animals.
- **Need:** Affordability in terms of initial cost and maintenance.
    - **Pain Point:** Limited capital for large investments; access to repair services can be difficult or expensive.
- **Need:** Clear feedback on task progress and system status.
    - **Pain Point:** Uncertainty about whether the machine is working correctly or if an issue has occurred.
- **Need:** Ability to operate even with intermittent or no internet connectivity.
    - **Pain Point:** Unreliable internet access in many rural areas.

## 3.3. User Stories:

**For Ramesh Kumar (Small-scale Dairy Farmer):**

- **US1.1 (Define Task):** "As Ramesh, I want to open the Sevak app on my Android phone, see a map of my area, and easily draw a boundary around the section of my fodder field that needs cutting today, so that Sevak knows exactly where to work."
- **US1.2 (Set Drop-off):** "As Ramesh, I want to tap on the map near my cow shed to set the drop-off point for the cut fodder, so Sevak brings it right where I need it."
- **US1.3 (Start & Monitor):** "As Ramesh, I want to press a big, clear 'Start' button in the app to send Sevak to work, and then see its location on the map and a simple status like 'Cutting' or 'Bringing Fodder', so I know what it's doing without having to watch it constantly."
- **US1.4 (Notification):** "As Ramesh, I want to receive a simple notification on my phone when Sevak has finished cutting and has brought the fodder to the shed, so I know when to go and unload it."
- **US1.5 (Emergency Stop):** "As Ramesh, if I see a problem or my child runs near Sevak, I want to be able to quickly press an 'EMERGENCY STOP' button in the app (and on the tractor itself) to make it stop immediately, so everyone stays safe."

**For Priya Patel (Tech-Savvier Farm Manager):**

- **US2.1 (Offline Task Setup):** "As Priya, I want to be able to define multiple cutting areas and drop-off points in the Sevak app even when I don't have internet in the fields, and have these tasks saved, so Sevak can execute them later or when I'm back in Wi-Fi range to initiate."
- **US2.2 (Manual Control):** "As Priya, I want a virtual joystick in the app to manually drive Sevak for short distances, like moving it precisely into its storage shed or navigating a tricky spot not suitable for full autonomy, so I have fine-grained control when needed."
- **US2.3 (Task History):** "As Priya, I want to see a list of past tasks Sevak completed, including which field area was cut and when, so I can keep track of my fodder management activities."
- **US2.4 (Battery Monitoring & Return Home):** "As Priya, I want to clearly see Sevak's battery level in the app and receive a warning if it's low, and I want Sevak to automatically return to its charging base if the battery is critically low or after completing a task if I instruct it to, so it's always ready for the next job."
- **US2.5 (Obstacle Alert):** "As Priya, if Sevak encounters an obstacle it cannot navigate around, I want it to stop safely and send an alert to my app with its location, so I can investigate and resolve the issue."

# 4. Proposed Solution: Sevak Overview

## 4.1. Core Concept:

Sevak is an integrated system comprising a compact, rugged, electric-powered autonomous mini-tractor and a user-friendly mobile application. The tractor is designed for the specific tasks of cutting fodder crops and transporting them. The mobile app serves as the primary interface for users to define work areas, schedule tasks, monitor progress, and perform manual interventions if necessary. The system prioritizes safety, simplicity, affordability, and reliability for rural Indian farmers.

## 4.2. Guiding Principles for Design:

- **Simplicity & Ease of Use:** The mobile app and tractor operation must be intuitive for users with minimal technical experience. High-contrast visuals and clear iconography are key for the app.
- **Safety First:** Incorporate multiple safety mechanisms, including robust obstacle detection, geofencing, emergency stops (physical and in-app), and slow operational speeds.
- **Robustness & Durability:** Design the tractor to withstand common rural conditions like dust, uneven terrain (within limits), and minor weather variations.
- **Affordability:** Utilize locally sourceable components where feasible and focus on a cost-effective design for both manufacturing and maintenance.
- **Autonomy for Core Tasks:** Automate the primary workflow of navigating to the field, cutting fodder, and transporting it to a drop-off point.
- **Reliable Offline Operation:** The tractor must be able to complete defined tasks even if direct communication with the app is temporarily lost, using on-board stored task data. The app should allow offline task definition.
- **Clear Feedback:** Provide users with timely and understandable information about Sevak's status, actions, and any issues encountered.

## 4.3. High-Level Architecture Sketch (Conceptual):

**Sevak Tractor Unit:**

- **Chassis & Drivetrain:** Electric motors, wheels, steering mechanism.
- **Power System:** Rechargeable battery pack, battery management system (BMS).
- **Navigation & Perception Module:**
    - **GPS:** For global positioning.
    - **IMU:** For orientation and motion tracking.
    - **LiDAR/Ultrasonic Sensors/Cameras:** For obstacle detection, boundary adherence, and potentially row following. (Sensor suite optimization: Decision Owner: Systems Engineering Lead, Due: Sprint 2. V1 design recommendation: See Section 10.1 for initial sensor set).
- **Control Unit (Onboard Computer):**
    - Microcontroller/Single-Board Computer (e.g., Raspberry Pi, Jetson Nano, or automotive-grade MCU).
    - Runs ROS or similar robotics middleware.
    - Stores task definitions, executes navigation and cutting logic, processes sensor data.
- **Fodder Cutting Mechanism:** Electric-powered cutter (e.g., rotary or flail type. Design details: Decision Owner: Mechanical Design Lead, Due: Sprint 2 Design Review. V1 design recommendation: Rotary Mower, see Section 10.3).
- **Fodder Loading Mechanism:** Simple conveyor or auger to move cut fodder into the trailer.
- **Trailer:** Attached, passive trailer for holding cut fodder.
- **Communication Module:** Wi-Fi and/or Bluetooth for communication with the mobile app.
- **Safety Systems:** Physical emergency stop button, fail-safe braking.

**Sevak Mobile Application (Android/iOS):**

- **User Interface (UI):**
    - **Dashboard:** Status overview, quick actions.
    - **Map View:** For defining work zones (cutting areas, drop-off, home base).
    - **Task Management:** Creating, starting, stopping tasks.
    - **Manual Control:** Virtual joystick, cutter/loader toggles.
    - **Status & Notifications:** Real-time updates, alerts.
    - **Settings:** Configuration options.
    - **History/Logs:** Past task details.
- **Backend Logic (App-side):**
    - User input processing.
    - Communication with Sevak tractor (sending commands, receiving status).
    - Local data storage (task definitions, app settings).
    - Map data handling (potentially using a lightweight mapping SDK).
- **Communication Module:** Uses device Wi-Fi/Bluetooth to connect to the tractor.

**Communication Link:**

- Primarily local Wi-Fi or Bluetooth connection between the mobile app and the Sevak tractor for sending commands, receiving status updates, and initial task data transfer.
- No mandatory continuous internet connection required for core operation once tasks are synced to the tractor.

# 5. Detailed Features & Functionalities

## Feature 5.A: Autonomous Fodder Cutting & Transport Task Management (Mobile App & Tractor)

**User Problem Solved:** Automates the entire process of defining a work area, initiating fodder cutting, and having it transported, freeing the farmer from manual labor and constant supervision.

**How it Supports Goals:** Directly addresses core goals of reducing labor, increasing efficiency, and ensuring ease of use.

### 5.A.1: Define Cutting Area (Mobile App)

- **Detailed Description:** Users can view an interactive map (e.g., satellite or simple schematic view) of their surroundings. They can use a "draw polygon" tool to tap points on the map, creating a closed boundary that defines the specific area in their field where fodder needs to be cut.
- **Step-by-Step User Interaction Flow:**
    - User opens Sevak app, navigates to "Map & Task Management" or "Create New Task" screen.
    - App displays a map centered on the user's (or tractor's last known) location.
    - User selects "Define Cutting Area" or a polygon drawing tool icon.
    - User taps sequentially on the map to define vertices of the cutting area. The app visually connects these points to form a polygon.
    - User can adjust points or clear the polygon and restart.
    - User confirms/saves the polygon. It may be assigned a default name or user can name it (e.g., "North Field Patch").
- **UI/UX Considerations:**
    - Clear iconography for drawing tools.
    - Map should be responsive and allow zoom/pan.
    - Visual feedback as polygon is drawn.
    - Easy editing/undo for points.
    - Option to save frequently used areas.
    - High contrast for outdoor visibility.
- **Acceptance Criteria:**
    - User can successfully draw and save a valid polygonal cutting area on the map.
    - The defined area's coordinates are stored correctly.
    - The app prevents creation of invalid polygons (e.g., self-intersecting, if problematic for path planning).

### 5.A.2: Set Drop-off Location (Mobile App)

- **Detailed Description:** Users can place a pin on the map to designate where the Sevak tractor should deliver the cut fodder.
- **Step-by-Step User Interaction Flow:**
    - Within the task creation flow (after or before defining cutting area).
    - User selects "Set Drop-off Location" or a pin-drop tool icon.
    - User taps on the map to place the pin. The pin can be dragged to adjust its position.
    - User confirms/saves the drop-off location. It may be named (e.g., "Cow Shed Door").
- **UI/UX Considerations:**
    - Clear pin icon.
    - Easy to tap and drag.
    - Option to save frequently used drop-off points.
- **Acceptance Criteria:**
    - User can successfully set and save a drop-off location pin on the map.
    - The location's coordinates are stored correctly.

### 5.A.3: Set Home Base Location (Mobile App - Optional for task, but needed for "Return Home")

- **Detailed Description:** Similar to setting a drop-off location, users can define a "Home Base" or charging station location.
- **User Interaction:** Similar to 5.A.2.
- **Acceptance Criteria:** User can set and save a home base location.

### 5.A.4: Initiate Task & Monitor (Mobile App & Tractor)

- **Detailed Description:** Once cutting area and drop-off are defined, the user can start the task. The app sends the task parameters (area coordinates, drop-off coordinates) to the Sevak tractor. The tractor then autonomously executes the task: navigates to the field, cuts fodder, loads it, transports it to the drop-off, and notifies the user. The app provides real-time status updates.
- **Step-by-Step User Interaction Flow (Key Feature Deep Dive from Blueprint):**
    - Farmer opens the Sevak mobile app. Sees Dashboard with Sevak's current status (e.g., "Idle at Home Base," Battery: 80%).
    - Farmer navigates to "Map & Task Management" or selects a saved task.
    - (Assuming area and drop-off are defined as per 5.A.1, 5.A.2). Farmer reviews the task details on the map.
    - Farmer clicks a prominent "Start Task" (or "Start Cutting & Transport") button.
    - App confirms command transmission to Sevak. Status changes (e.g., "Command Sent").
    - Sevak tractor acknowledges command. App status updates to "Navigating to Field." Tractor's physical movement begins. App shows Sevak's icon moving on the map.
    - Upon reaching the cutting area, Sevak begins cutting fodder (e.g., in systematic rows). App status changes to "Cutting Fodder." App may show estimated % area cut or time remaining.
    - Loading mechanism operates simultaneously or in phases.
    - Once cutting is complete (or trailer is full, if sensed/estimated), Sevak stops cutting. App status changes to "Transporting Fodder."
    - Sevak autonomously navigates to the predefined drop-off location.
    - Upon arrival, Sevak stops. App status changes to "Awaiting Unloading at [Drop-off Name]." A notification is sent to the farmer's phone.
    - Farmer manually unloads fodder.
    - Farmer can then instruct Sevak via app to "Return Home" or start another predefined task.
- **UI/UX Considerations (App):**
    - Large, unambiguous "Start," "Pause," "Stop Task" buttons.
    - Clear visual indication of tractor's current action and location on map.
    - Progress indicators (e.g., percentage complete, estimated time).
    - Persistent notifications for critical events (task complete, error, low battery).
- **Tractor Behavior:**
    - Path planning algorithm for navigation and cutting pattern.
    - Smooth acceleration/deceleration.
    - Cutter and loader engage/disengage automatically as per task logic.
- **Acceptance Criteria:**
    - User can successfully initiate a defined task from the app.
    - Tractor receives task parameters and begins autonomous operation.
    - Tractor navigates to the cutting area within an acceptable margin of error (e.g., +/- 2 meters).
    - Tractor cuts fodder within the defined polygon (e.g., >90% coverage of the accessible area).
    - Tractor transports fodder to the drop-off location within an acceptable margin of error (e.g., +/- 2 meters).
    - App accurately reflects tractor status and location (updated at least every 5-10 seconds) throughout the task.
    - User receives notification within 30 seconds of task completion or critical events.

## 5.B: Tractor Core Autonomous Functions (Sevak Tractor)

### 5.B.1: Autonomous Navigation
- **Detailed Description:** This function enables Sevak to independently travel between specified GPS waypoints. This includes navigating from its Home Base to a designated Cutting Area, from the Cutting Area to a Drop-off Location, and from the Drop-off Location back to the Home Base or to the next Cutting Area.
- **System Behavior/Logic:**
    - **Input:** A sequence of GPS waypoints defining the desired path, geofence boundaries.
    - **Processing:** The onboard computer uses a path planning algorithm (e.g., A* or Dijkstra for point-to-point, potentially modified for field paths) to generate a feasible route between waypoints. It continuously monitors its current position (via GPS, IMU, wheel odometry fusion) and compares it to the planned path. Steering and speed commands are generated to minimize cross-track error and heading error. The system respects geofence boundaries, halting or replanning if a breach is imminent.
    - **Output:** Motor commands for steering and propulsion.
- **Key Technical Considerations:**
    - Accuracy of GPS and sensor fusion for reliable positioning (especially near boundaries or obstacles).
    - Robustness of path tracking algorithms to handle minor terrain irregularities.
    - Computational efficiency of the path planner on the onboard computer.
    - Smoothness of motion to prevent excessive wear or instability.
- **Acceptance Criteria:**
    - Sevak can navigate between two GPS waypoints (50m apart) with a final position accuracy of +/- 2 meters.
    - Sevak follows a multi-segment path (at least 3 waypoints) maintaining a cross-track error of less than +/- 1 meter from the planned straight-line segments.
    - Sevak stops if it deviates more than 3 meters from the planned path or approaches a geofence boundary within a predefined safety margin (e.g., 1 meter).
    - Sevak successfully navigates a predefined 100m test course involving at least two turns.

### 5.B.2: Autonomous Fodder Cutting
- **Detailed Description:** Sevak autonomously operates its cutting mechanism while traversing a predefined pattern within the specified Cutting Area.
- **System Behavior/Logic:**
    - **Input:** Coordinates of the polygonal Cutting Area, desired cutting pattern (e.g., boustrophedon), cutter engagement status.
    - **Processing:** The onboard computer generates a coverage path plan (e.g., boustrophedon) for the defined polygon. As Sevak navigates this path, it sends commands to engage the cutting mechanism. The system monitors its position to ensure it stays within the cutting area and follows the pattern. Speed is controlled to be optimal for cutting (Optimal cutting speed: Decision Owner: Agronomy/Testing Team, Due: Sprint 4 Field Trials).
    - **Output:** Commands to the cutting mechanism (engage/disengage, speed if controllable) and drive motors.
- **Key Technical Considerations:**
    - Accuracy of the coverage path planning to ensure minimal missed spots and overlaps.
    - Coordination between navigation and cutter engagement/disengagement, especially at turns and boundaries.
    - Power management for the cutting mechanism.
    - Safety interlocks to prevent cutter operation outside the designated area or when unsafe.
- **Acceptance Criteria:**
    - Sevak can autonomously cut at least 90% of a 10m x 10m defined rectangular area.
    - The cutting mechanism engages only when Sevak is within the defined cutting area and moving along the planned cutting path.
    - The cutting mechanism disengages when Sevak exits the cutting area or completes the pattern.
    - Sevak maintains a consistent cutting speed (e.g., 1-2 km/h. Final speed: Decision Owner: Engineering Lead, Due: Sprint 3 Testing) during operation.

### 5.B.3: Autonomous Fodder Loading
- **Detailed Description:** Sevak autonomously operates its loading mechanism to transfer freshly cut fodder into the attached trailer, typically in coordination with the cutting process.
- **System Behavior/Logic:**
    - **Input:** Cutter engagement status, potentially simple sensors indicating fodder flow or trailer proximity (if any).
    - **Processing:** The loading mechanism (e.g., conveyor, auger) is activated when the cutting mechanism is engaged and fodder is being processed. The logic ensures continuous operation during cutting to prevent clogging.
    - **Output:** Commands to the loading mechanism motor (engage/disengage).
- **Key Technical Considerations:**
    - Synchronization with the cutting mechanism.
    - Robustness of the loading mechanism to handle varying fodder types and densities.
    - Power requirements for the loading mechanism.
    - Minimizing spillage and ensuring efficient transfer to the trailer.
- **Acceptance Criteria:**
    - The loading mechanism activates within 2 seconds of the cutting mechanism engaging.
    - The loading mechanism deactivates within 2 seconds of the cutting mechanism disengaging.
    - At least 80% of fodder cut by the mechanism is successfully transferred into the trailer during a test run over a 10m strip.

### 5.B.4: Obstacle Detection & Avoidance
- **Detailed Description:** Sevak can detect unexpected obstacles in its path using its sensor suite and take appropriate action to ensure safety, such as stopping or, if feasible, performing a minor evasive maneuver.
- **System Behavior/Logic:**
    - **Input:** Data from LiDAR, ultrasonic sensors, and/or cameras. Current path and speed.
    - **Processing:** Sensor data is continuously processed to identify objects within a defined safety zone around Sevak. If an obstacle is detected that intersects the current path:
        - **Immediate Stop:** If the obstacle is within a critical stopping distance, Sevak performs an emergency stop.
        - **Cautious Stop:** If the obstacle is further out, Sevak decelerates to a stop.
        - **Basic Avoidance (Optional V1):** If the obstacle is small and there's clear space, Sevak might attempt a minor lateral deviation to go around it, then return to its original path. This requires more advanced sensor fusion and path planning. For V1, a stop-and-alert is the primary response.
    - **Output:** Deceleration/stop commands to motors, alert to the mobile app.
- **Key Technical Considerations:**
    - Reliability of sensors in various environmental conditions (dust, light).
    - Sensor fusion to reduce false positives/negatives.
    - Defining appropriate safety zones and stopping distances based on speed.
    - Algorithm complexity vs. onboard processing power for avoidance maneuvers.
    - Distinguishing between traversable (e.g., tall grass) and non-traversable obstacles.
- **Acceptance Criteria:**
    - Sevak detects a static obstacle (e.g., 0.5m x 0.5m x 0.5m) at least 3 meters ahead while traveling at 2 km/h and comes to a complete stop at least 0.5 meters before the obstacle.
    - Sevak detects a dynamic obstacle (e.g., person walking towards it) at least 5 meters ahead and stops.
    - The system sends an "Obstacle Detected" alert to the mobile app within 5 seconds of stopping for an obstacle.
    - False positive obstacle detection rate is less than 1 per 100 meters of travel in clear terrain.

### 5.B.5: Geofencing Adherence
- **Detailed Description:** Sevak operates strictly within user-defined or system-defined virtual boundaries (geofences) to prevent it from straying into unintended or unsafe areas.
- **System Behavior/Logic:**
    - **Input:** GPS coordinates defining the geofence polygon(s). Current tractor GPS position.
    - **Processing:** The onboard system continuously checks if the tractor's current position is inside the permitted geofenced area(s). If the tractor approaches a boundary, it will slow down. If it is about to breach the boundary, it will stop all motion.
    - **Output:** Speed reduction or stop commands to motors. Alert to the mobile app if a stop occurs due to geofence.
- **Key Technical Considerations:**
    - Accuracy of GPS and the defined geofence.
    - Reliability of position tracking near boundaries.
    - Defining appropriate buffer zones for safety.
- **Acceptance Criteria:**
    - Sevak stops within 0.5 meters of a defined geofence boundary when approaching it.
    - Sevak does not cross a defined geofence boundary during autonomous operation.
    - An alert is sent to the app if Sevak stops due to geofence proximity.

### 5.B.6: Battery Management & Charging
- **Detailed Description:** Sevak monitors its battery status and can initiate actions based on battery level, including navigating to a charging station. It also provides the physical interface for charging.
- **System Behavior/Logic:**
    - **Input:** Battery voltage/current/temperature from BMS. Predefined low battery thresholds. Location of Home Base/Charging Station.
    - **Processing:** The system continuously monitors the battery level.
        - If battery drops to a "warning" level (e.g., 20%), an alert is sent to the app.
        - If battery drops to a "critical" level (e.g., 10%), Sevak will pause its current task (if safe to do so), send an alert, and if a Home Base is defined and reachable, attempt to autonomously navigate to it. If not, it will stop safely.
    - **Output:** Battery level data to app. Navigation commands for "Return Home for Charging." Physical charging port.
- **Key Technical Considerations:**
    - Accurate State of Charge (SoC) estimation.
    - Defining appropriate low battery thresholds to allow safe return/stop.
    - Reliability of autonomous docking/navigation to charging station (if implemented; manual plug-in is V1 baseline).
    - Safety during charging.
- **Acceptance Criteria:**
    - The mobile app displays battery level with +/- 5% accuracy.
    - A "Low Battery Warning" notification is sent to the app when battery level reaches 20%.
    - Sevak automatically stops its current task (or completes current segment and stops) and attempts to return to a predefined Home Base if battery reaches 10% and a path is available.
    - The tractor can be successfully charged via its charging port.

### 5.B.7: Emergency Stop System
- **Detailed Description:** A safety-critical system that allows immediate halting of all tractor motion and powered mechanisms, initiated either by a physical button on the tractor or a command from the mobile app.
- **System Behavior/Logic:**
    - **Input:** Signal from physical E-Stop button (hardware interrupt), E-Stop command from mobile app (software signal).
    - **Processing:** Upon receiving an E-Stop signal, the control system immediately cuts power to drive motors, cutting mechanism, and loading mechanism, and engages any available brakes. The system enters a safe, non-operational state until manually reset.
    - **Output:** Motors and mechanisms de-energized. Brakes engaged. Status update to app indicating E-Stop activation.
- **Key Technical Considerations:**
    - Reliability and failsafe nature of the E-Stop circuit (physical button should override software).
    - Speed of system halt.
    - Clear visual indication on the tractor when E-Stop is active.
    - Procedure for safely resetting the system after an E-Stop.
- **Acceptance Criteria:**
    - Pressing the physical E-Stop button brings all tractor motion and powered mechanisms (cutter, loader) to a complete stop within 1 second (or as fast as physically possible and safe).
    - Activating the E-Stop from the mobile app brings all motion and powered mechanisms to a stop within 2 seconds (allowing for communication latency).
    - The tractor remains in a stopped state after E-Stop activation until a deliberate reset procedure is performed.
    - The app reflects the E-Stop status.

## 5.C: Mobile App Core Functions (Sevak Mobile App)

### 5.C.1: Status Monitoring
- **Detailed Description:** The app provides a real-time overview of the Sevak tractor's operational status, location, and key parameters, allowing the user to stay informed about its activities.
- **Step-by-Step User Interaction Flow:**
    - User opens the app. The main dashboard or a dedicated status screen is visible.
    - The screen displays:
        - Tractor's current action (e.g., "Idle," "Cutting Fodder at North Field," "Navigating to Drop-off," "Charging," "Error - Obstacle Detected").
        - Tractor's current location visualized on a mini-map or as coordinates.
        - Battery level percentage and/or an icon.
        - Connectivity status to the tractor (e.g., "Connected," "Disconnected," signal strength if available).
    - This information updates dynamically as the tractor's status changes.
- **UI/UX Considerations:**
    - Clear, easily understandable text labels and icons for status (e.g., green for active, yellow for warning, red for error).
    - Prominent display of critical information like battery level and error states.
    - Map view should clearly indicate tractor position and orientation.
    - Information should be glanceable.
- **Acceptance Criteria:**
    - App displays tractor's current action (e.g., Idle, Cutting, Navigating, Error) updated within 5 seconds of change.
    - App displays tractor's battery level with an accuracy of +/- 5%, updated at least every 30 seconds.
    - App displays tractor's location on a map, updated within 5-10 seconds, with position accurate to within GPS limits.
    - App clearly indicates connection status to the tractor.

### 5.C.2: Manual Control Mode
- **Detailed Description:** Allows the user to directly control the tractor's movements and auxiliary functions (cutter, loader) for precise positioning, navigating complex areas unsuitable for full autonomy, or for maintenance/stowage.
- **Step-by-Step User Interaction Flow:**
    - User navigates to the "Manual Control" section of the app.
    - App prompts user to confirm they are in close proximity to the tractor and have clear line of sight (safety warning).
    - Upon confirmation, the manual control interface appears. This includes:
        - A virtual joystick (or separate buttons) for forward, reverse, left turn, and right turn.
        - Toggle buttons to engage/disengage the cutting mechanism.
        - Toggle buttons to engage/disengage the loading mechanism.
    - User operates the virtual joystick; tractor responds to movement commands in real-time.
    - User taps toggle buttons; cutter/loader mechanisms respond.
    - User exits manual control mode; tractor returns to idle or previous state.
- **UI/UX Considerations:**
    - Responsive virtual joystick with good tactile feedback (if possible via phone haptics).
    - Clear visual indication of which mechanism (cutter/loader) is active.
    - Speed in manual mode should be significantly limited for safety (e.g., very slow walking pace).
    - "Deadman switch" concept: controls only active while being pressed, or a persistent "Enable Manual Control" toggle that times out if no activity.
    - Prominent emergency stop button easily accessible on the manual control screen.
- **Acceptance Criteria:**
    - User can successfully control tractor's forward, reverse, left, and right movements using the app's manual controls. Tractor responds to commands within 1 second.
    - User can engage and disengage the cutting mechanism via app controls.
    - User can engage and disengage the loading mechanism via app controls.
    - Tractor operates at a reduced, safe speed (e.g., max 1 km/h) in manual mode.
    - Manual control is disabled if app-tractor connection is lost.

### 5.C.3: Notifications
- **Detailed Description:** The app proactively informs the user about important events, task milestones, warnings, and errors related to Sevak's operation, even when the app is not in the foreground.
- **Step-by-Step User Interaction Flow:**
    - Sevak tractor encounters a predefined event (e.g., task completion, low battery, obstacle).
    - Tractor sends an event signal to the connected mobile app.
    - The mobile app generates a system notification (toast, banner, and/or sound/vibration, depending on user settings and OS).
    - User sees/hears the notification. Tapping the notification opens the app to the relevant screen or provides more details.
    - Examples of notifications:
        - "Sevak has completed cutting at North Field."
        - "Sevak is at Cow Shed Door, awaiting unloading."
        - "Warning: Sevak battery low (18%). Returning to Home Base."
        - "Error: Sevak encountered an obstacle and has stopped at [Location]."
        - "Sevak connection lost." / "Sevak reconnected."
- **UI/UX Considerations:**
    - Clear and concise notification messages.
    - Use of distinct sounds or vibration patterns for different notification severities (e.g., info, warning, error).
    - User configurable notification preferences (e.g., enable/disable sounds for certain types).
    - Notifications should be timely.
- **Acceptance Criteria:**
    - App generates a notification within 15 seconds of task completion.
    - App generates a "Low Battery Warning" notification when battery level drops to 20%.
    - App generates an "Error" notification with basic details if the tractor reports an unrecoverable error or persistent obstacle.
    - Notifications are received even if the app is in the background (requires appropriate permissions).

### 5.C.4: Settings Configuration
- **Detailed Description:** Allows users to customize certain aspects of the app and tractor behavior to suit their preferences and specific operational needs.
- **Step-by-Step User Interaction Flow:**
    - User navigates to the "Settings" screen in the app.
    - User sees a list of configurable options, such as:
        - **Connectivity:** Initiate pairing with Sevak tractor (e.g., scan for Bluetooth devices, enter Wi-Fi credentials for tractor's hotspot).
        - **Cutting Parameters (if applicable):** Adjust cutting height (if mechanically supported and software-controlled. Decision Owner: Product Team, Due: Sprint 4), overlap percentage for cutting paths.
        - **Notification Preferences:** Enable/disable sound, vibration for different types of alerts.
        - **Language:** Select app display language (if multiple supported).
        - **Map Preferences:** Choose map type (satellite, schematic), default zoom level.
        - **Units:** Metric/Imperial (though metric is standard for this context).
    - User modifies settings as needed. Changes are saved locally in the app and synced to the tractor if they affect tractor behavior.
- **UI/UX Considerations:**
    - Settings organized logically into categories.
    - Clear labels and explanations for each setting.
    - Appropriate input controls (toggles, sliders, dropdowns).
    - Visual confirmation when settings are saved.
    - Easy way to reset to default settings.
- **Acceptance Criteria:**
    - User can successfully pair the app with the Sevak tractor via the settings menu.
    - User can change a configurable setting (e.g., notification sound preference), and the change persists across app sessions.
    - If a setting affects tractor behavior (e.g., cutting height), the new value is successfully transmitted to and acknowledged by the tractor.

### 5.C.5: Task History/Logs
- **Detailed Description:** Provides users with a record of past autonomous tasks performed by Sevak, including key details and outcomes, for tracking and basic troubleshooting.
- **Step-by-Step User Interaction Flow:**
    - User navigates to the "Task History" or "Logs" section in the app.
    - App displays a chronological list of past tasks. Each entry might show:
        - Task Name (if user-defined) or Task ID.
        - Date and Time of execution.
        - Status (e.g., "Completed," "Failed - Obstacle," "Cancelled by User").
        - Duration of task.
        - Area cut (e.g., "North Field - 0.5 acres").
    - User can tap on a task entry to view more details (if available), such as a map showing the actual path taken, error codes if any, or total fodder estimated.
    - Basic error logs from the tractor might also be accessible here for troubleshooting, presented in a user-friendly way or as raw data for technical support.
- **UI/UX Considerations:**
    - Clear, sortable list of tasks (e.g., by date).
    - Easy-to-understand summary information for each task.
    - Option to filter tasks (e.g., by date range, status).
    - Simple presentation of error logs, avoiding overly technical jargon for the primary view.
- **Acceptance Criteria:**
    - App displays a list of at least the last 10 completed/attempted tasks.
    - Each task entry shows at least date, time, area name (if applicable), and completion status.
    - User can view basic error codes or messages associated with a failed task.
    - Task history is stored locally on the app and persists across sessions.

### 5.C.6: Offline Capability
- **Detailed Description:** Enables core functionalities of task definition within the app and task execution by the tractor even when a direct, continuous connection between the app and tractor, or app to the internet, is unavailable.
- **Step-by-Step User Interaction Flow:**
    - **Offline Task Definition (App):**
        - User is in an area with no Wi-Fi/Bluetooth connectivity to the tractor or no internet.
        - User opens the Sevak app.
        - User can still access the map (if cached or using an offline map solution) to define new Cutting Areas, Drop-off Locations, and Home Bases.
        - These defined tasks are saved locally on the mobile device.
        - When connectivity to the tractor is re-established, the app prompts the user to sync these pending tasks to the tractor.
    - **Task Execution with Intermittent Connection (Tractor):**
        - A task has been successfully transferred from the app to the tractor's local storage.
        - The tractor begins autonomous operation.
        - If the Wi-Fi/Bluetooth connection to the app is lost mid-task:
            - The tractor continues to execute the current queued task segment (e.g., finish current cutting row, navigate to next waypoint) based on its locally stored instructions.
            - The tractor attempts to periodically re-establish connection with the app.
            - The app indicates "Connection Lost" but may still show last known status/location.
        - Upon task completion or if an unrecoverable error occurs, the tractor stops safely and awaits reconnection or manual intervention.
- **UI/UX Considerations:**
    - Clear indication in the app when it is operating in offline mode.
    - Visual cue for tasks defined offline that are pending sync.
    - App should handle connection loss/restoration gracefully, updating status accordingly.
    - Tractor behavior upon connection loss should prioritize safety (e.g., complete current small segment and pause, or stop immediately if unsafe to continue).
- **Acceptance Criteria:**
    - User can define and save at least 5 new tasks (cutting area, drop-off) in the app while the mobile device is in airplane mode.
    - Saved offline tasks are successfully synced to the tractor when connectivity is restored.
    - If app-tractor connection is lost while the tractor is performing a 10-minute cutting task, the tractor completes the task (or its current major segment) using its onboard stored data.
    - The app clearly indicates "Offline Mode" or "Disconnected" when no connection is available.

# 6. Non-Functional Requirements

- **6.1. Performance:**
    - Tractor Response Time: Commands from app (start, stop, manual controls) should elicit a response from the tractor within 1-2 seconds over a stable local connection.
    - App UI Responsiveness: App interface should be smooth, with screen transitions and map interactions completing within 500ms.
    - Tractor Operational Speed: Safe walking pace, approximately 3-5 km/h during autonomous operation. Slower for precise maneuvers or in manual mode.
- **6.2. Scalability (V1 Focus):**
    - System must reliably handle operations for a single tractor unit per app.
    - App should store a reasonable number of saved task definitions (e.g., up to 50-100) and history logs locally.
    - Tractor onboard storage must be sufficient for current task data, geofence info, and basic operational logging.
- **6.3. Usability:**
    - **Mobile App:**
        - Intuitive navigation, clear labels, and icons.
        - Minimal steps to define and start a task.
        - High contrast display for good visibility in outdoor sunlight.
        - Support for local languages (e.g., Hindi, English initially) if feasible.
        - Simple error messages and guidance.
    - **Tractor:**
        - Easy to start up and shut down.
        - Clear indicators for status (e.g., power on, emergency stop engaged).
        - Accessible charging port.
- **6.4. Reliability & Availability:**
    - Tractor: Designed for high MTBF under expected rural operating conditions (dust, vibrations, moderate temperature variations). Aim for >95% task completion success rate without hardware/software failure.
    - App: Stable operation, minimize crashes. Graceful handling of lost connection to tractor.
    - Offline Operation: Core task execution by tractor must be reliable even if app connection is lost.
- **6.5. Security:**
    - Communication: Secure local communication channel (e.g., WPA2 for Wi-Fi, secure Bluetooth pairing) between app and tractor to prevent unauthorized control.
    - Data Storage: Task data on the app and tractor should be protected from trivial unauthorized access. No highly sensitive personal data is stored beyond location data for farm operations.
    - No Unauthorized Remote Access: The system should not allow control from outside the local communication range or by unauthorized apps/devices.
- **6.6. Maintainability:**
    - Tractor: Modular design where possible for easier repair/replacement of components. Use of durable, commonly available parts where feasible. Basic diagnostic information accessible via app or direct connection.
    - App Software: Well-structured, commented code. Easy to update and patch.
- **6.7. Accessibility (Mobile App):**
    - Adherence to basic mobile accessibility guidelines (e.g., sufficient font sizes, tappable target sizes, ARIA labels for screen readers if platform supports well).
- **6.8. Robustness (Tractor):**
    - Designed to withstand dust, vibrations, and minor impacts typical of agricultural environments.
    - Weather resistance for light rain/splashes (Specific IP rating: Decision Owner: Enclosure Design Lead, Due: Sprint 3. Not designed for heavy rain operation).
- **6.9. Affordability:**
    - Component selection and design should prioritize keeping the overall cost of the tractor and its operation low.

# 7. Data Model (Conceptual)

- **UserDevice (App Local Storage):**
    - `deviceID` (PK)
    - `pairedTractorID` (FK to Tractor)
    - `appSettings` (JSON: language, notificationPrefs, etc.)
- **Tractor (Onboard Storage & Mirrored in App):**
    - `tractorID` (PK)
    - `firmwareVersion`
    - `status` (Enum: Idle, Navigating, Cutting, Transporting, Charging, Error, ManualMode, EStop)
    - `currentLocation` (GPS Coordinates: lat, lon)
    - `batteryLevel` (Percentage)
    - `currentTaskID` (FK to Task, if active)
    - `errorLog` (Array of ErrorLogEntry)
    - `operationalHours`
- **Task (Stored on App, Synced to Tractor for active task):**
    - `taskID` (PK - UUID generated by app)
    - `taskName` (User-defined string)
    - `creationTimestamp`
    - `status` (Enum: Pending, Active, Paused, Completed, Failed)
    - `cuttingArea` (Polygon: array of GPS Coordinates)
    - `dropOffLocation` (GPS Coordinate)
    - `homeBaseLocation` (GPS Coordinate - optional for task, used for ReturnHome)
    - `completionTimestamp` (nullable)
    - `areaCovered` (Calculated, nullable)
    - `fodderVolumeEstimate` (Calculated, nullable)
- **TaskExecutionLog (App-side, potentially summarized on Tractor):**
    - `logEntryID` (PK)
    - `taskID` (FK)
    - `timestamp`
    - `eventType` (Enum: Started, PathSegment, ObstacleDetected, StatusChange, Completed, Error)
    - `eventDetails` (JSON)
- **ErrorLogEntry (Tractor & App):**
    - `timestamp`
    - `errorCode`
    - `errorDescription`
    - `sensorReadingsAtError` (Optional, JSON)

**Data Relationships:**

- A UserDevice is paired with one Tractor.
- A Tractor can execute one Task at a time.
- A Task defines one `cuttingArea` (polygon), one `dropOffLocation`, and optionally one `homeBaseLocation`.
- TaskExecutionLog entries are associated with a specific Task.
- ErrorLogEntry entries are associated with a Tractor and potentially a Task if an error occurs during execution.

# 8. Integration Points

- **8.1. Sevak Tractor Internal Systems:**
    - Control Unit to Sensors: Interfaces for GPS, IMU, LiDAR, Ultrasonic sensors, Cameras. (Specific protocols: Decision Owner: Electrical Engineering Lead, Due: Sprint 2, based on sensor selection: Serial, I2C, SPI, USB, Ethernet).
    - Control Unit to Actuators: Interfaces for motor controllers (drive, steering, cutter, loader). (Control protocols: Decision Owner: Electrical Engineering Lead, Due: Sprint 2. Options: PWM, CAN bus, or other motor control protocols).
    - Control Unit to Power System: Interface with BMS for battery level and status.
- **8.2. Sevak Tractor to Mobile App:**
    - Communication Protocol: Secure Wi-Fi (e.g., TCP/IP or UDP based custom protocol, or MQTT over local Wi-Fi) or Bluetooth Low Energy (BLE) / Bluetooth Classic. (Protocol selection: Decision Owner: Software Team Lead, Due: Sprint 1 End).
    - Data Exchange:
        - App to Tractor: Task definitions (coordinates, action sequence), commands (start, stop, manual controls), settings updates.
        - Tractor to App: Real-time status (location, battery, current action), sensor data summaries (for obstacle alerts), error codes, task progress, log data.
- **8.3. Mobile App to Mapping Services (Optional, for map display):**
    - If using a third-party mapping SDK (e.g., Google Maps SDK, Mapbox SDK, OpenStreetMap SDK) for displaying satellite/street maps: API integration as per SDK requirements.
    - Alternatively, a very simple custom grid-based map could be used if external map services are too complex or costly for V1. (Mapping solution choice: Decision Owner: Mobile App Lead, Due: Sprint 2. V1 recommendation: See Section 10.6).
- **8.4. Sevak Tractor Components (Sourcing):**
    - Emphasis on locally sourceable or readily available components for motors, batteries, basic sensors, and mechanical parts to ensure affordability and maintainability.

# 9. Release Plan / Milestones (Conceptual for V1)

**Phase 1: Core Tractor Mobility & Manual Control (Target: M1-M3)**

- **Tractor:** Basic chassis, drivetrain, power system operational. Onboard control unit boots and can control motors. Physical E-Stop functional.
- **App:** Basic app structure. Pairing with tractor via Wi-Fi/Bluetooth. Manual control (virtual joystick) for tractor movement. Manual engagement of cutter/loader (if mechanisms are ready). Display basic status (battery, connectivity).
- **Goal:** Demonstrate reliable remote manual operation of the tractor platform.

**Phase 2: Basic Autonomous Navigation & Task Definition (Target: M4-M6)**

- **Tractor:** GPS & IMU integration. Ability to autonomously navigate to a single GPS waypoint and stop. Basic geofencing (stop if boundary crossed). Obstacle detection (stop on detection).
- **App:** Map interface for defining a single point (e.g., "Go To Point"). Send point to tractor. Start/stop "Go To Point" task. Display tractor location on map.
- **Goal:** Demonstrate basic point-to-point autonomous navigation and simple tasking.

**Phase 3: Autonomous Cutting & Full Task Cycle (Target: M7-M9)**

- **Tractor:** Integration of cutting and loading mechanisms. Autonomous operation within a defined polygonal area (path planning for coverage). Autonomous transport to a drop-off point. Return to Home Base functionality. Improved obstacle avoidance logic.
- **App:** Full task definition (polygon cutting area, drop-off pin, home base pin). Start/stop full autonomous task cycle. Real-time monitoring of full task. Notifications for task completion, errors. Task history (basic).
- **Goal:** Demonstrate end-to-end autonomous fodder cutting and transport cycle as per core user stories.

**Phase 4: Refinement, Robustness & Pilot Testing (Target: M10-M12)**

- **Tractor & App:** Extensive field testing. Bug fixing and performance optimization. Refinement of UI/UX based on early user feedback. Implementation of remaining V1 features (e.g., detailed settings, improved error handling/logging). Offline mode fully tested.
- **Goal:** Achieve a stable, reliable V1 system ready for pilot deployment with target users.

**Future Considerations (Beyond V1 - from Blueprint):**

- Automated trailer tipping mechanism.
- Weather service integration.
- Fodder analysis sensors.
- Multi-unit cooperation.
- Voice commands.
- Variable speed based on fodder density.
- Solar panel integration.
- Accurate trailer load sensing.
- Live camera feed in app.

# 10. Open Issues & Discussions (V1 Recommendations)

### 10.1 Sensor Suite Optimization
- **Discussion:** Effective and safe navigation for Sevak, especially in potentially dusty and unstructured outdoor farm environments, requires a robust sensor suite. The choice of sensors must balance performance (detection range, accuracy, reliability in adverse conditions), processing load on the onboard computer (e.g., Raspberry Pi, Jetson Nano), and overall cost to maintain affordability.
    - **LiDAR (Light Detection and Ranging):** Offers excellent range and 2D/3D mapping capabilities, good for obstacle detection and localization. However, cost can be a factor, and some lower-cost units might struggle in very dusty conditions or direct sunlight. 2D LiDAR is generally more cost-effective and sufficient for ground-based navigation.
    - **Cameras (Monocular/Stereo):** Cost-effective and provide rich environmental data. Can be used for obstacle detection (with AI/ML algorithms), line following (if applicable), and potentially visual odometry. Performance can be affected by lighting conditions (day/night), dust, and rain. Stereo cameras can provide depth information but increase processing load.
    - **Ultrasonic Sensors:** Very low cost and simple to integrate. Good for short-range obstacle detection (e.g., immediate proximity sensing, <3-5 meters). Less affected by dust than some optical sensors but have a wider, less precise detection cone and can be affected by soft surfaces or extreme angles.
    - **IMU (Inertial Measurement Unit):** Essential for tracking orientation and motion, used in sensor fusion for localization and odometry.
    - **GPS (with RTK for precision if affordable):** Provides global positioning. Standard GPS accuracy might be insufficient for precise row navigation or boundary adherence (1-3m). RTK GPS offers centimeter-level accuracy but significantly increases cost. A standard GPS combined with other sensors (sensor fusion) might be a V1 compromise.
- **Recommendations:**
    - **Minimum Viable Sensor Set (V1):**
        - **Primary Obstacle Detection & Navigation Aid:** 1-2 x 2D LiDAR (e.g., RPLIDAR A1/A2 or similar, focusing on a forward-facing arc). This provides primary ranging and object detection.
        - **Close Proximity Detection:** 4-6 x Ultrasonic Sensors (mounted around the tractor periphery for detecting nearby obstacles, especially in blind spots of LiDAR).
        - **Basic Visual Context/Backup:** 1 x Monocular Camera (forward-facing, for potential future AI-based object recognition or teleoperation aid, but primarily for data gathering in V1 unless simple image processing for large obstacles is feasible on the chosen compute).
        - **Localization & Odometry:** GPS (standard module) + Wheel Encoders + IMU. Sensor fusion (e.g., using ROS `robot_localization`) is critical to combine these inputs for a more reliable pose estimate.
    - **Justification for V1 Set:** This combination aims for a balance. LiDAR offers reliable medium-range detection. Ultrasonics cover close-range safety. GPS/IMU/Encoders provide foundational localization. A camera adds future potential without immediate heavy processing demands for V1. This set avoids the high cost of RTK GPS or multiple high-end LiDARs for V1, focusing on safety and core navigation.
    - **Recommended/Enhanced Set (Future Consideration):**
        - Upgrade to RTK GPS for higher precision navigation.
        - Consider a 3D LiDAR for better environmental understanding if costs decrease.
        - Add more cameras for 360-degree vision or stereo vision for improved depth perception.
        - Thermal camera for detecting animals/people in low visibility (higher cost).
- **Status:** Discussed & V1 Recommendations Provided

### 10.2 Path Planning Algorithm
- **Discussion:** Sevak requires two primary types of path planning:
    - **Coverage Path Planning (CPP):** For systematically cutting fodder within a defined polygonal area.
    - **Point-to-Point Navigation:** For traveling between arbitrary locations like Home Base, start of a cutting area, and Drop-off Location.
    - **Coverage Algorithms:**
        - **Boustrophedon (Back-and-Forth):** A common and relatively simple algorithm for covering a rectangular or moderately complex polygonal area. It involves moving in parallel swaths, like plowing a field. This is computationally efficient and suitable for the suggested onboard processors (Raspberry Pi, Jetson Nano). Variations can handle non-convex polygons or internal obstacles (though obstacle handling might simplify to stopping for V1).
        - **Cellular Decomposition:** Divides the area into simpler cells, plans paths within cells, and connects them. Can be more complex but handles obstacles well.
    - **Point-to-Point Navigation Algorithms:**
        - **A* (A-star):** A popular graph traversal and path search algorithm, which is efficient and finds the shortest path if an admissible heuristic is used. It requires a map representation (grid-based or waypoint graph). Suitable for onboard computation.
        - **Dijkstra's Algorithm:** Finds the shortest path in a graph but explores more nodes than A*. Still feasible for moderate-sized maps.
        - **Simple Line-of-Sight + Obstacle Avoidance:** For simpler environments, the tractor could navigate directly towards a waypoint, relying on obstacle avoidance to make local adjustments. This is less robust for complex environments.
- **Recommendations for V1:**
    - **Coverage:** Implement a **Boustrophedon decomposition** algorithm for cutting areas. The app can help by orienting the pattern optimally or allowing the user to set the primary direction of swaths.
    - **Point-to-Point:** Use **A* search algorithm** on a dynamically updated local grid map (derived from sensor data for obstacles) or a predefined waypoint graph for navigation between key points. If the environment is very open, a simpler "go-to-goal" with reactive obstacle avoidance might suffice initially, but A* provides more robust pathfinding.
    - **Computational Load:** Both Boustrophedon and A* (on reasonably sized grids) are generally manageable for platforms like Jetson Nano or even a higher-end Raspberry Pi, especially if the map resolution and planning horizon are optimized.
- **Status:** Discussed & V1 Recommendations Provided

### 10.3 Cutting/Loading Mechanism Design
- **Discussion:** The cutting and loading mechanisms are critical for Sevak's primary function. Design choices must prioritize robustness, efficiency, cost-effectiveness, and manageable power requirements for V1.
- **Conceptual Designs & Considerations for V1:**
    - **Cutting Mechanism:**
        - **Rotary Mower (Horizontal Blades):**
            - *Concept:* Similar to a lawnmower, with one or more blades rotating horizontally.
            - *Pros:* Relatively simple design, common parts, effective for various grass/fodder types.
            - *Cons:* Can be power-intensive, blades require regular sharpening/replacement, potential for throwing debris.
            - *V1 Considerations:* A single, robust electric motor driving a well-shrouded rotary blade system could be feasible. Focus on durable blades and a simple height adjustment mechanism (Height adjustment mechanism: Decision Owner: Mechanical Team, Due: Sprint 3).
        - **Flail Mower (Vertical Blades/Hammers):**
            - *Concept:* Multiple small blades (flails) attached to a rotating drum or shaft.
            - *Pros:* More robust against hitting small stones/debris (flails can pivot back), can handle rougher vegetation.
            - *Cons:* Can be more complex and expensive to manufacture, potentially higher power draw than a simple rotary.
            - *V1 Considerations:* Likely more complex/costly than a rotary for V1.
        - **Reciprocating Cutter Bar (Sickle Bar):**
            - *Concept:* Blades that move back and forth like a hedge trimmer.
            - *Pros:* Cleaner cut, less power-hungry than rotary for some applications.
            - *Cons:* More complex mechanically, prone to clogging in dense/wet fodder.
            - *V1 Considerations:* Potentially too complex for V1 robustness and cost goals.
        - *Recommendation for V1 Cutting:* A **simple, direct-drive electric rotary mower design** is likely the most cost-effective and robust starting point.
    - **Loading Mechanism:**
        - **Conveyor Belt:**
            - *Concept:* A short, inclined conveyor belt positioned behind/under the cutter to catch and elevate fodder into the trailer.
            - *Pros:* Continuous loading, relatively simple principle.
            - *Cons:* Belt material durability, potential for slippage with wet fodder, requires its own motor.
            - *V1 Considerations:* A short, cleated belt driven by a separate small electric motor is feasible. Design needs to manage fodder flow from cutter to belt effectively.
        - **Auger/Screw Conveyor:**
            - *Concept:* A rotating screw that moves fodder upwards into the trailer.
            - *Pros:* Can handle various fodder types, enclosed design can reduce spillage.
            - *Cons:* Can be power-intensive, might chop/damage fodder more, potential for clogging.
            - *V1 Considerations:* May be more complex and power-hungry than a simple conveyor for V1.
        - **Impeller/Thrower (Combined with Rotary Cutter):**
            - *Concept:* The rotary cutter itself is designed with fins or an enclosure that directs the cut fodder upwards and backwards into the trailer.
            - *Pros:* Mechanically simpler (fewer separate powered components).
            - *Cons:* Efficiency depends heavily on cutter design and fodder type, may not provide much lift.
            - *V1 Considerations:* If a rotary cutter is chosen, exploring a design that assists in throwing fodder towards a simple ramp/chute into the trailer could be a very low-cost initial approach, potentially augmented by a very short, simple conveyor if direct throw is insufficient.
        - *Recommendation for V1 Loading:* A **short, simple electric conveyor belt** integrated with the cutter discharge. If extreme cost-saving is needed, investigate if the cutter can direct material up a passive ramp, but a powered conveyor is more reliable.
- **Power Requirements:** Both mechanisms will be significant power consumers. Motors must be sized appropriately, and the battery system must account for their peak and continuous loads.
- **Status:** Discussed & V1 Recommendations Provided

### 10.4 Battery Sizing & Charging Strategy
- **Discussion:**
    - **Estimating Battery Capacity:**
        - *Method:* Sum the estimated average power consumption of all components (drive motors, steering, control unit, sensors, cutting motor, loading motor) during typical operation. Multiply by the target operational duration (e.g., 2-4 hours). Add a safety margin (e.g., 20-30%).
        - *Example Factors:*
            - Drive Motors: Power depends on terrain, speed, load. (e.g., 2 x 250W motors = 500W average).
            - Cutting Motor: (e.g., 500W - 1000W, depending on design and fodder).
            - Loading Motor: (e.g., 100W - 200W).
            - Control/Sensors: (e.g., 50W - 100W).
            - Total ~1.15kW - 1.8kW (very rough estimate). For 2 hours: 2.3 kWh - 3.6 kWh. For 4 hours: 4.6 kWh - 7.2 kWh.
        - *Target Area Coverage:* Alternatively, estimate energy per unit area cut and transported.
    - **Target Charging Time:**
        - Ideally, overnight charging (e.g., 6-8 hours) would be acceptable for most users, allowing Sevak to be ready daily. Faster charging (2-4 hours) is beneficial but increases charger cost and potentially battery stress.
    - **Charging Method (V1):**
        - **Manual Plug-in:**
            - *Pros:* Simplest, most cost-effective, reliable. Uses standard chargers.
            - *Cons:* Requires user intervention.
        - **Autonomous Docking & Charging:**
            - *Pros:* Convenient, enables more independent operation cycles.
            - *Cons:* Significantly increases complexity (precise navigation to dock, alignment, automated connection mechanism), cost, and potential points of failure.
- **Recommendations for V1:**
    - **Battery Capacity:** Aim for a capacity that supports **2-3 hours of continuous typical operation** for V1 to balance cost, weight, and utility. This would likely be in the **2.5 - 4.0 kWh range** using LiFePO4 (for safety and cycle life) or other suitable lithium-ion chemistry. (Detailed power profiling: Decision Owner: Electrical Engineering Lead, Due: Sprint 3 Prototyping Phase).
    - **Charging Time:** Target **6-8 hours for a full charge** using an appropriately sized off-board charger. (Charger specification: Decision Owner: Electrical Engineering Lead, Due: Sprint 3).
    - **Charging Method:** Implement **manual plug-in charging for V1**. This is the most practical, cost-effective, and reliable approach for the initial version. Autonomous docking can be a future enhancement.
- **Status:** Discussed & V1 Recommendations Provided

### 10.5 Local Communication Reliability
- **Discussion:**
    - **Challenges for Wi-Fi/Bluetooth in Rural Farms:**
        - **Range:** Standard Wi-Fi (2.4GHz) and Bluetooth have limited range (tens of meters, highly dependent on obstacles). Large fields can easily exceed this.
        - **Interference:** Other wireless devices, metal structures, dense vegetation can interfere.
        - **Obstructions:** Buildings, trees, terrain variations can block signals.
        - **Power Consumption:** Continuous high-power Wi-Fi on the tractor can drain the battery. Bluetooth LE is better for power but has lower bandwidth/range.
    - **Fallback Strategies (if connection is intermittent/lost mid-task):**
        - **Tractor Behavior:**
            - **Complete Current Segment:** Sevak should always aim to complete its current small, atomic task segment (e.g., finish cutting a single row, reach the next immediate waypoint on its path to the drop-off) based on its locally stored task data. This prevents stopping abruptly in an awkward or unsafe position.
            - **Pause Safely:** After completing the segment, if connection is still lost, Sevak should pause safely (e.g., stop motion, disengage cutter).
            - **Attempt Reconnection:** Periodically attempt to reconnect with the app (e.g., every 15-30 seconds for a few minutes).
            - **Timeout & Alert (if possible):** If reconnection fails after a set period, and if it has a way to alert (e.g., audible beep if designed, or simply wait), it should remain paused. The primary alert will be the app showing "disconnected."
        - **App Behavior:**
            - **Clear Feedback:** The app must clearly indicate "Connection Lost" or "Attempting to Reconnect."
            - **Last Known Status:** Display Sevak's last known location and status.
            - **User Guidance:** Provide simple instructions (e.g., "Move closer to Sevak to reconnect," "Check Sevak's physical status if connection cannot be restored").
    - **Importance of Local Task Storage:** Reinforce that the tractor *must* have the full definition of the currently active task (cutting area, drop-off, path waypoints) stored locally before starting. This is crucial for it to operate autonomously even if the app link drops.
- **Recommendations for V1:**
    - Use a robust Wi-Fi module on the tractor (e.g., with an external antenna if needed) for primary communication, as it generally offers better range and bandwidth than Bluetooth for streaming status or map data. Bluetooth LE could be a secondary option for very close-range control or initial pairing. (Wi-Fi module selection: Decision Owner: Hardware Team, Due: Sprint 2).
    - Implement the fallback strategies described above. The tractor should not be rendered useless by temporary connection drops.
    - The app should guide the user on expected communication range and advise them to stay within reasonable proximity if continuous monitoring is desired, though the goal is autonomous completion.
- **Status:** Discussed & V1 Recommendations Provided

### 10.6 Mapping Solution for App
- **Discussion & Options Comparison:**
    - **1. Third-Party Mapping SDKs:**
        - *Examples:* Google Maps SDK (Android/iOS), Mapbox SDK, OpenStreetMap-based SDKs (Leaflet for web views wrapped in app, MapLibre GL Native, Mapsforge for offline vector maps).
        - *Pros:* Rich map features (satellite imagery, street maps, points of interest), mature APIs, often good performance, built-in UI controls for zoom/pan. Mapbox and OSM-based solutions can offer more flexible offline map capabilities.
        - *Cons:*
            - **Cost:** Google Maps SDK can become expensive based on usage (API calls, map loads). Mapbox also has pricing tiers.
            - **Offline:** While some offer offline modes (e.g., Mapbox, Mapsforge), it often requires pre-downloading regions or specific tile packages, which adds complexity for the user or developer. True dynamic offline for vast rural areas can be challenging.
            - **Complexity:** Integrating and managing full-fledged mapping SDKs can add development overhead.
            - **Relevance of Features:** Many features (traffic, 3D buildings, extensive POIs) are irrelevant for Sevak's core use case.
    - **2. Simple Custom Grid-Based Map or Schematic View:**
        - *Concept:* A very basic visual representation. Could be:
            - A blank canvas where users draw polygons and place pins, with GPS coordinates being the underlying data, but no visual map background.
            - A simple grid overlay where the tractor's movement and defined areas are shown relative to a starting point or grid cells.
            - A schematic view showing the tractor icon, field boundaries, and drop-off point without geographical accuracy, just relational positions.
        - *Pros:*
            - **Cost:** No direct cost.
            - **Offline:** Inherently works offline as it doesn't rely on external map tiles.
            - **Simplicity:** Potentially much simpler to develop and maintain.
            - **Focus:** Keeps the interface focused strictly on the task elements.
        - *Cons:*
            - **User Orientation:** Users might find it harder to orient themselves and define areas accurately without a familiar map background (like satellite view of their farm).
            - **Less Intuitive:** Drawing a field boundary on a blank canvas based on memory or by walking the perimeter first might be less user-friendly than tracing over a satellite image.
- **Recommendations for V1:**
    - **Prioritize Offline and Simplicity:** Given the target users and environment, robust offline capability and ease of use are paramount. Cost is also a major driver.
    - **V1 Recommendation:** Start with an **OpenStreetMap-based solution that has strong offline capabilities, such as Mapsforge (Android native) or MapLibre GL Native with pre-downloaded region tiles/vector maps.** This offers a good balance:
        - Provides recognizable map context (basic roads, terrain if available in OSM data for the region).
        - Can be configured for full offline use by bundling map data for target regions or allowing users to download their specific farm area.
        - Lower cost than proprietary SDKs.
    - **Contingency/Simplest Fallback:** If integrating even OSM-based offline maps proves too complex or time-consuming for V1 timelines, a **custom schematic view where the user defines areas based on relative positioning and the tractor's GPS track** could be a fallback. This would require very clear UX design to remain intuitive. Satellite view could be a "nice-to-have" if online and an API key allows for limited free tier usage for initial setup, but not relied upon for core field operations.
- **Justification:** An OSM-based offline solution provides the best compromise for V1, offering visual context that aids usability while supporting offline needs and managing costs. A purely custom grid might be too abstract for some users.
- **Status:** Discussed & V1 Recommendations Provided

### 10.7 Cost of Bill of Materials (BOM)
- **Discussion:** Maintaining an affordable BOM is a core principle for Sevak, targeting small-scale farmers. This requires diligent tracking and cost-conscious design choices throughout development.
- **Strategy for Tracking and Managing BOM Costs:**
    - **Initial Estimation & Budgeting:** Create a preliminary BOM with target costs for major subsystems (chassis, motors, batteries, sensors, control unit, cutting/loading mechanisms) and an overall target for the assembled tractor. (Target BOM cost: Decision Owner: Project Manager & Engineering Lead, Due: Sprint 1 End).
    - **Component Selection Prioritizing Cost:**
        - **COTS (Commercial Off-The-Shelf):** Favor readily available COTS components over custom-fabricated parts where possible.
        - **Local Sourcing:** Investigate local suppliers in India for mechanical parts, fasteners, and even some electronic components to reduce import costs and lead times.
        - **Value Engineering:** For each component, evaluate if a lower-cost alternative exists that meets minimum viable performance and reliability requirements.
    - **Iterative BOM Updates:** Maintain a live BOM spreadsheet. As components are prototyped, tested, and selected, update the BOM with actual costs.
    - **Regular Cost Reviews:** Hold periodic (e.g., bi-weekly or monthly) cost reviews to track actuals against targets. Identify areas where costs are exceeding targets and brainstorm solutions.
    - **Design for Manufacturability & Assembly (DFMA):** Simple designs with fewer parts and easier assembly steps can significantly reduce labor costs, which contribute to the final product cost.
- **Target Cost Considerations (Illustrative - actuals to be determined by team):**
    - **Overall Tractor (Target End User Price Goal):** While specific numbers are hard to set without market research, the aim is to be significantly more affordable than traditional small tractors or hiring extensive manual labor over time. (e.g., aiming for a BOM that allows an end price in the range of a few high-end smartphones to a basic motorbike, if feasible. Market research for price point: Decision Owner: Product Manager, Due: Sprint 2).
    - **Key Components (Rough % of BOM or considerations):**
        - **Battery System:** Can be one of the most expensive parts. Balance capacity vs. cost. LiFePO4 is safer but can be pricier than some NMC.
        - **Motors (Drive, Cutter, Loader):** Brushless DC motors offer good efficiency but brushed DC motors are cheaper. Balance power needs with cost.
        - **Compute Unit (Raspberry Pi/Jetson Nano):** Relatively fixed cost, but choose appropriate model (e.g., Pi 4 vs. Pi 5, Jetson Nano vs. more advanced).
        - **Sensors:** LiDAR can range from ~$100 (e.g., RPLIDAR A1) to many thousands. V1 must use lower-cost LiDAR. Cameras and ultrasonics are relatively cheap. GPS modules vary; RTK is expensive.
        - **Chassis & Mechanical Parts:** Maximize use of standard steel sections, simple welding, and locally available mechanical components.
- **Emphasis on Cost Reduction Strategies:**
    - Prioritize core functionality for V1; defer "nice-to-have" features that add significant cost.
    - Explore partnerships with local manufacturers or workshops for fabrication.
    - Consider a "kit" form or partially assembled option if it significantly reduces cost for some users (though V1 aims for a ready-to-use product).
- **Status:** Discussed & V1 Recommendations Provided

### 10.8 Specific ROS Packages/Modules
- **Discussion:** Assuming ROS is used (ROS 1 Noetic for broader package availability and stability, or ROS 2 for more modern features and support, e.g., ROS 2 Foxy/Galactic/Humble - (ROS version decision: Decision Owner: Robotics Software Lead, Due: Sprint 1 End) based on expertise and component driver availability), several existing packages can be leveraged.
- **Suggested Packages (Illustrative, assuming ROS 1 Noetic or equivalent ROS 2 packages):**
    - **Navigation:**
        - **ROS Navigation Stack (`move_base` for ROS 1 / Nav2 for ROS 2):** Provides a comprehensive framework for point-to-point navigation, including global and local path planning, costmaps, and recovery behaviors. This is highly recommended.
            - *Relevance:* Handles the complexities of path planning, obstacle avoidance integration, and motion control.
        - **SLAM (Simultaneous Localization and Mapping):**
            - `gmapping` (ROS 1) or `slam_toolbox` (ROS 2): If building a map of the environment is desired for more robust localization beyond GPS/IMU. For V1, simpler GPS-based navigation with obstacle avoidance might be prioritized over full SLAM due to computational load and complexity unless the environment is highly structured.
            - *Relevance:* Can improve localization accuracy in GPS-denied or challenging areas if a map is pre-built or built online.
        - **Localization:**
            - `robot_localization` (ROS 1 & 2): Essential for fusing data from GPS, IMU, and wheel odometry to provide a robust and accurate estimate of the tractor's pose (position and orientation).
            - *Relevance:* Critical for reliable navigation and geofencing.
            - `amcl` (ROS 1 / ROS 2): Adaptive Monte Carlo Localization, used for localizing in a known map (often generated by SLAM).
            - *Relevance:* Useful if a pre-existing map is used.
    - **Perception:**
        - **Sensor Drivers:** Specific ROS drivers for the chosen LiDAR, cameras, IMU, GPS (e.g., `rplidar_ros`, `usb_cam`, `phidgets_imu` (example), `nmea_navsat_driver`).
            - *Relevance:* Provide standardized ROS interfaces (topics) for sensor data.
        - `image_pipeline` (ROS 1 / ROS 2): For camera calibration, image rectification, and basic image processing tasks.
            - *Relevance:* Prepares camera data for use in perception algorithms.
        - `perception_pcl` (ROS 1 / ROS 2) or `pcl_ros`: For working with Point Cloud Library (PCL) data from LiDAR or depth cameras. Includes filtering, segmentation, and feature extraction tools.
            - *Relevance:* Processing LiDAR data for obstacle detection and mapping.
    - **Communication:**
        - `rosbridge_suite` (ROS 1 & 2): Provides a JSON API to ROS functionality, enabling communication with web interfaces or mobile apps over WebSockets.
            - *Relevance:* A strong candidate for app-tractor communication if the app uses web technologies or needs easy access to ROS topics/services/actions.
        - Standard ROS Topics, Services, Actions: For internal communication between different ROS nodes on the tractor.
    - **Control Interfaces:**
        - `ros_control` (ROS 1) / `ros2_control` (ROS 2): A framework for robot hardware abstraction and control loop implementation.
            - *Relevance:* Can provide a structured way to interface with motor controllers and actuators.
        - Custom ROS nodes to translate velocity commands (from `move_base` or manual control) into low-level motor controller commands.
- **Choice between ROS 1 and ROS 2:**
    - **ROS 1 Noetic:** More mature, wider range of existing packages and community support. Easier learning curve for some.
    - **ROS 2 (e.g., Humble):** Better support for real-time systems, multi-robot systems, improved security, and more active development. Steeper learning curve for some, but the future direction.
    - *Recommendation:* If the team has strong ROS 1 experience and key sensor drivers are readily available, Noetic is a safe bet for V1. If starting fresh or looking for longer-term viability, ROS 2 Humble would be a good choice, ensuring driver availability for chosen hardware. (Final ROS version choice: Decision Owner: Robotics Software Lead, Due: Sprint 2).
- **Status:** Discussed & V1 Recommendations Provided

### 10.9 Language Support
- **Discussion:**
    - **Importance:** For target users like Ramesh Kumar and Priya Patel in rural India, local language support in the mobile app is crucial for usability, adoption, and reducing the learning curve. Relying solely on English will likely create a significant barrier.
    - **Prioritization Strategy:**
        - **V1 Initial Release:** English and Hindi. Hindi has wide reach in Northern and Central India. English serves as a base and for users comfortable with it.
        - **V1.x / V2:** Plan for adding other major regional languages based on target deployment areas and user feedback (e.g., Marathi, Gujarati, Tamil, Telugu, Kannada, Bengali. Additional languages: Decision Owner: Product Manager, Due: Post-V1 Pilot Feedback).
    - **Technical Considerations (i18n & l10n):**
        - **String Resource Files:** The mobile app (Android/iOS) should be developed using string resource files from the outset. All user-facing text should be stored in these files, not hardcoded.
        - **Layouts:** Design UI layouts to accommodate varying text lengths that occur with translation (e.g., German text is often longer than English). Use adaptive UI elements.
        - **Localization of Dates, Numbers, Units:** Ensure these are formatted according to local conventions if necessary, though for V1, standard formats might suffice.
        - **Translation Process:** Plan for professional or verified community translation of strings.
        - **Framework Support:** Modern mobile development frameworks (Android SDK, iOS SDK, Flutter, React Native) have built-in support for internationalization and localization.
- **Recommendations for V1:**
    - Implement the app with **English and Hindi language options from the start.**
    - Build the app with i18n/l10n best practices (string resources, adaptable layouts) to make adding further languages easier in subsequent versions.
- **Status:** Discussed & V1 Recommendations Provided

### 10.10 Maintenance & Repair Strategy
- **Discussion:** A practical maintenance and repair strategy is vital for the long-term success and adoption of Sevak in rural areas where access to specialized technicians may be limited. The strategy should empower users and local mechanics.
- **Proposed Two-Tiered Strategy:**
    - **1. User-Level Maintenance (Farmer-Performed):**
        - *Tasks:*
            - Daily/Weekly visual inspections: Check for loose parts, debris, tire condition.
            - Cleaning: Regularly clean sensors (LiDAR, camera lenses, ultrasonic sensors) from dust and mud. Clean cutting and loading mechanisms from fodder residue.
            - Charging: Correctly plug in and charge the battery.
            - Basic Troubleshooting: Following simple steps from a pictorial guide or app (e.g., "Check E-Stop button," "Ensure good app connection").
            - Tire Pressure: Checking and adjusting if applicable.
        - *Support:* Provide very simple, highly visual (pictorial/video) guides for these tasks in local languages.
    - **2. Local Technician Repair (Empowering Existing Mechanics):**
        - *Concept:* Enable existing local farm equipment mechanics or individuals with basic mechanical/electrical skills to perform more complex repairs.
        - *Enablers:*
            - **Modular Design:** Design Sevak with modular components (e.g., sensor units, motor assemblies, control box) that can be relatively easily swapped out.
            - **Repair Manuals/Guides:** Develop clear, illustrated repair guides (in local languages) for common faults and component replacements. These could be digital or printable.
            - **Diagnostic Information:** The app or a direct interface to the tractor could provide basic diagnostic codes or sensor readings to help pinpoint issues.
            - **Parts Availability:** Strive to use commonly available fasteners, connectors, and potentially some COTS components that local technicians might be familiar with or can source. For specialized parts, establish a clear supply chain. (Parts supply chain strategy: Decision Owner: Operations Lead, Due: Sprint 4).
            - **Training (Optional/Future):** Consider basic training workshops for interested local mechanics in pilot deployment areas.
- **Emphasis on Durable and Locally Sourceable Parts:**
    - Where functionality and safety are not compromised, select components known for durability in agricultural settings.
    - If standard, locally available motors, bearings, belts, or fasteners can be used, it will significantly ease repair.
- **Status:** Discussed & V1 Recommendations Provided

### 10.11 Trailer Fill Detection
- **Discussion:** The V1 baseline assumes cutting a defined area or relying on user judgment for when the trailer is full. However, even a basic fill estimation could enhance user experience by preventing overfilling or unnecessary trips. The key for V1 is low cost and simplicity if implemented.
- **Simple, Low-Cost Methods for V1 Consideration:**
    - **Timer-Based Estimation:**
        - *Concept:* After X minutes of active cutting/loading, the app estimates the trailer is Y% full. X and Y could be roughly configurable by the user based on their typical fodder density.
        - *Pros:* No additional hardware. Simple to implement in software.
        - *Cons:* Highly inaccurate, as fodder density varies greatly.
    - **Area-Based Estimation:**
        - *Concept:* Based on the area cut (calculated from GPS path and cutter width), estimate fill level. E.g., X sq. meters cut corresponds to Y% fill. This could also be user-configurable (e.g., "low/medium/high density fodder type").
        - *Pros:* No additional hardware. More accurate than timer-based if fodder yield per area is somewhat consistent for a given field.
        - *Cons:* Still an estimate; yield can vary within a field.
    - **Single Ultrasonic Sensor at Top-Rear of Trailer:**
        - *Concept:* An ultrasonic sensor mounted at the top rear of the trailer, pointing downwards. When fodder reaches a certain height (indicating "nearly full" or "full"), the sensor detects it.
        - *Pros:* Direct measurement, relatively low cost for a single sensor.
        - *Cons:* Fodder might not fill evenly, sensor could get dirty or blocked, requires wiring from tractor to trailer.
    - **Simple Tilt Switch or Load Sensor on Trailer Axle/Hitch (More Complex for V1):**
        - *Concept:* A tilt switch that activates if the trailer becomes overloaded and tilts excessively, or a very basic load sensor.
        - *Pros:* More direct measure of weight/overload.
        - *Cons:* Load cells can be expensive and require careful integration. Tilt switch is very rudimentary.
- **Recommendations for V1:**
    - **Primary Approach for V1:** Rely on **cutting a user-defined area**. This is the simplest and aligns with the "defined task" paradigm. The user learns how much area typically fills their trailer.
    - **Optional Basic Feature:** If deemed valuable after initial prototyping and user feedback, implement **Area-Based Estimation** as a software feature. The app could allow the user to input an approximate "trailer capacity in terms of area cut" (e.g., "My trailer is full after cutting 500 sq meters of this fodder type"). The app then provides a fill percentage estimate during the task. (Decision on area-based estimation: Decision Owner: Product Manager, Due: Sprint 3 User Feedback Review).
    - **Defer Hardware Sensors for Fill Detection:** Adding even a simple hardware sensor for fill detection to the trailer increases cost and complexity (wiring, power, potential damage point) for V1. Defer this to future versions if strong user need is identified.
- **Status:** Discussed & V1 Recommendations Provided

### 10.12 Legal & Regulatory Compliance
- **Discussion:**
    - **Current Landscape in India:** Specific, comprehensive national regulations for small autonomous agricultural vehicles in India are likely nascent or still evolving. Unlike autonomous cars on public roads, operation on private farmland typically falls under general machinery safety guidelines or may not be explicitly regulated at this small scale.
    - **General Safety Best Practices:** In the absence of specific regulations, Sevak's design and operation must adhere to general safety principles for agricultural machinery and autonomous systems. This includes robust emergency stops, obstacle detection, clear warnings, and operation at safe speeds.
    - **Operator Responsibility:** The end-user (farmer) will likely bear responsibility for safe operation on their property.
- **Recommendations:**
    - **Advise Users:** The project team and user materials should advise Sevak operators to be aware of and comply with any applicable local bylaws or agricultural machinery guidelines in their specific region or state.
    - **Disclaimer:** Include a clear disclaimer in all user training materials and app documentation stating that the operator is responsible for ensuring safe and compliant operation of Sevak on their property and for supervising its operation, especially near people, animals, or public pathways.
    - **Focus on Safety Standards:** Design Sevak to meet general machinery safety standards (e.g., regarding pinch points, E-stops, warnings) even if not explicitly mandated for this specific type of autonomous device. (Safety standards compliance check: Decision Owner: Safety Officer/Engineering Lead, Due: Ongoing through development).
    - **Monitor Evolving Regulations:** The project team should make a reasonable effort to stay informed about any emerging national or state-level guidelines for autonomous agricultural equipment in India.
- **Status:** Discussed & V1 Recommendations Provided

### 10.13 User Training Materials
- **Discussion:** Effective user training is critical for adoption and safe use, especially for a target audience with varying tech literacy. Materials must be simple, visual, and accessible.
- **Proposed Formats and Content:**
    - **Formats:**
        - **Pictorial Quick Start Guide (QSG):** A laminated, durable, folded guide with minimal text and many clear illustrations/photos showing key steps. Focus on setup, basic task, and E-stop.
        - **Short Video Tutorials:** 1-3 minute videos demonstrating key tasks (e.g., defining an area, starting a task, manual control, basic maintenance). Accessible via QR codes on the QSG/tractor or links within the app. Videos should have clear visuals and voice-over in local languages.
        - **In-App Guided Walkthroughs:** For first-time use, the app could have a guided tutorial for defining the first task.
        - **Simple Step-by-Step Instructions:** Within the app's help section or as part of the QSG.
    - **Key Topics to Cover:**
        - Unboxing & Initial Setup: What's in the box, charging Sevak for the first time.
        - App Installation & Pairing: Downloading the app, connecting to Sevak via Wi-Fi/Bluetooth.
        - Understanding the App Interface: Key buttons and status indicators.
        - Defining Work Zones: Drawing a cutting area, setting drop-off point, setting Home Base.
        - Starting, Pausing, Stopping a Task: How to initiate and manage autonomous operations.
        - Understanding Notifications: What different alerts mean.
        - Manual Control Mode: How and when to use it safely.
        - Emergency Stop: How to use the physical E-Stop button on Sevak and the E-Stop in the app. CRITICAL.
        - Basic Maintenance: Cleaning sensors, checking for debris, charging procedure.
        - Simple Troubleshooting: What to do if Sevak stops unexpectedly, connection issues, basic error messages.
        - Safety Precautions: Operating distances, keeping children/animals away, geofence importance.
    - **Language:** All materials must be available in English and Hindi initially, with a plan for other key regional languages (as per Section 10.9). Language should be extremely simple and direct. (Training material development: Decision Owner: Documentation Lead & Product Manager, Due: Phase 4 Start).
- **Status:** Discussed & V1 Recommendations Provided

This PRD will be a living document and will be updated as the project progresses and more information becomes available.