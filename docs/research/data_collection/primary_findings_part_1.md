# Primary Findings: Autonomous Agricultural Vehicles (Part 1)

This document captures initial findings from research into autonomous agricultural vehicles, focusing on navigation, path planning, sensor suites, and operational challenges, relevant to Project Sevak.

## 1. Overview of Autonomous Navigation Systems

Autonomous agricultural vehicles (AAVs) like mini-tractors rely on advanced navigation systems combining sensor fusion, adaptive algorithms, and operational zone management to handle dynamic farm environments.

---

## 2. Navigation and Path Planning Algorithms

### A. Vision-Based Systems
*   **Semantic Segmentation + Line Detection**: The Agronav system [2] utilizes a three-stage neural network pipeline (D-Net, R-Net, M-Net) to extract crop rows and generate centerlines. This approach enables precise row guidance even without GPS.
*   **Hybrid Approaches**: Many systems integrate Real-Time Kinematic Global Navigation Satellite Systems (RTK-GNSS) with vision sensors for enhanced redundancy. For instance, a center-articulated rover demonstrated a mean absolute error (MAE) of 0.04–0.09 meters in cotton fields by using RTK-GNSS waypoints alongside a modified pure-pursuit controller [4].

### B. AI-Driven Path Optimization
*   **Reinforcement Learning**: This technique allows vehicles to adapt to irregular terrain by simulating crop row patterns and interactions with potential obstacles [1].
*   **Dynamic Replanning**: Systems can adjust paths in real-time using LiDAR or vision data to avoid unexpected obstacles such as rocks or navigate uneven terrain [3].

### C. Traditional Methods
*   **Pure-Pursuit Algorithm**: Modified versions of the pure-pursuit algorithm are employed to handle the kinematics of articulated vehicles, which is particularly crucial for accurate turning at the end of crop rows. An MAE of 0.24 meters has been observed in open-field turns using this method [4].

---

## 3. Sensor Suites and Redundancy

The following table outlines common sensor types, their typical specifications, and redundancy strategies:

| Sensor Type       | Specifications                          | Redundancy Strategies                     |
|-------------------|-----------------------------------------|-------------------------------------------|
| **GNSS (RTK)**    | 2–5 cm accuracy, 10–20 Hz update rate [4] | Paired with vision/LiDAR for GPS-denied zones [1] |
| **Stereo Cameras**| RGB-D, 30 fps, 5–20 m range [2]         | Cross-validated with LiDAR point clouds [3]   |
| **LiDAR**         | 360° scanning, 0.1° resolution [1]      | Used with IMUs for SLAM in dense crops [5]    |
| **IMUs**          | 6–9 axis, 100 Hz sampling [5]           | Kalman filters to correct GNSS drift [4]      |

---

## 4. Key Operational Challenges

### A. GPS-Variable Environments
*   **Signal Occlusion**: Environments like vineyards or orchards can disrupt RTK-GNSS signals. In such cases, vision-centric navigation, like Agronav’s semantic line detection, becomes essential [2].
*   **Sensor Fusion for Robustness**: Systems often combine RTK-GNSS with wheel odometry to maintain high accuracy (e.g., <0.1 m) during temporary signal loss [4].

### B. Predefined Zone Management
*   **Cutting Areas**: LiDAR can be used to map the boundaries of cutting areas, while AI algorithms optimize coverage paths (e.g., employing spiral patterns for circular fields) [1].
*   **Home Bases**: Ultra-Wideband (UWB) beacons or QR codes can provide absolute positioning for precise docking at home bases, achieving accuracies of 2–5 cm [3].
*   **Drop-Off Points**: RFID tags placed on bins can trigger automated unloading routines when the vehicle reaches designated drop-off points [5].

### C. Environmental Factors
*   **Terrain Dynamics**: Conditions like muddy fields can reduce the reliability of wheel encoders. This necessitates slip compensation using data from LiDAR and IMUs [4].
*   **Crop Interaction**: To prevent damage to plants from overly aggressive turns, speed-adaptive controllers are used to limit lateral errors to less than 0.15 meters [2].

---

## 5. Case Studies

*   **Cotton Harvesting Rover**: A notable case study involved a rover that achieved a 0.06 m MAE using RTK-GNSS and a pure-pursuit algorithm, validating the reliability of this approach in row crops [4].
*   **Agronav Framework**: The Agronav framework has demonstrated effective vision-only navigation, proving suitable for GPS-restricted environments such as greenhouses [2].

---

## Sources Cited (from Perplexity AI Response)

*   [1] Source related to Reinforcement Learning, LiDAR for boundary mapping, and pairing GNSS with vision/LiDAR.
*   [2] Source detailing the Agronav system (semantic segmentation, line detection), vision-only navigation, and speed-adaptive controllers.
*   [3] Source discussing dynamic replanning, cross-validation of stereo cameras with LiDAR, and UWB beacons for home base docking.
*   [4] Source on hybrid RTK-GNSS/vision approaches, modified pure-pursuit, Kalman filters for GNSS drift, sensor fusion with wheel odometry, slip compensation, and the cotton harvesting rover case study.
*   [5] Source mentioning LiDAR with IMUs for SLAM, RFID tags for drop-off points.

(Note: Full bibliographic details for these sources will be compiled in the `references.md` file later in the research process.)