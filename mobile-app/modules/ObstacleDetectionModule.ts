// mobile-app/modules/ObstacleDetectionModule.ts
import { GPSCoordinate } from './NavigationController';
import { LidarScanData } from '../services/LidarSensor'; // Import concrete type

export interface SensorReadings {
  lidarScan?: LidarScanData | null; // Use concrete LidarScanData
  ultrasonicDistances?: (number | null)[]; // Array of distances, can include null for failed sensors
  tractorGPS?: GPSCoordinate | null; // Optional: Tractor's current GPS for location estimation
  tractorHeading?: number | null; // Optional: Tractor's current heading (degrees from North) for location estimation
}

export interface ObstacleDetectionResult {
  type: 'dynamic' | 'static' | null;
  /** Estimated GPS location of the detected obstacle. Null if not determinable. */
  location: GPSCoordinate | null;
  /** Relative position of the obstacle (e.g., front, left, right). Null if not determinable. */
  relativePosition?: { distance: number; angle: number }; // distance in meters, angle in degrees from tractor's front
  rawDetections?: any[]; // Store raw points/distances that triggered detection for debugging
}

const ULTRASONIC_THRESHOLD_METERS = 1.5; // Objects closer than 1.5m are obstacles
const LIDAR_OBSTACLE_BOX_X_MIN = 0.1; // meters in front of sensor
const LIDAR_OBSTACLE_BOX_X_MAX = 3.0;  // meters in front of sensor
const LIDAR_OBSTACLE_BOX_Y_ABS_MAX = 0.75; // meters to the left/right of sensor center
const LIDAR_OBSTACLE_BOX_Z_MIN = -0.5; // meters below sensor (e.g. ground, ignore)
const LIDAR_OBSTACLE_BOX_Z_MAX = 2.0;  // meters above sensor

export class ObstacleDetectionModule {
  detectObstacle(sensorReadings: SensorReadings): ObstacleDetectionResult {
    const detectedObstacles: ObstacleDetectionResult[] = [];
    const rawDetections: any[] = [];

    // Process Ultrasonic Sensor Data
    if (sensorReadings.ultrasonicDistances) {
      sensorReadings.ultrasonicDistances.forEach((distance, index) => {
        if (distance !== null && distance < ULTRASONIC_THRESHOLD_METERS) {
          console.log(`Ultrasonic sensor ${index} detected obstacle at ${distance}m.`);
          // For now, we can't determine GPS location or precise relative position from just one ultrasonic.
          // We'll mark it as a generic static obstacle.
          // A more advanced system would map sensor index to a known angle.
          detectedObstacles.push({
            type: 'static', // Assume static for V1
            location: null, // Cannot determine GPS location from this data alone
            relativePosition: { distance: distance, angle: (index - ( (sensorReadings.ultrasonicDistances?.length || 1) -1) /2) * 30 }, // Placeholder angle
            rawDetections: [{ sensor: `ultrasonic_${index}`, distance }]
          });
          rawDetections.push({ sensor: `ultrasonic_${index}`, distance });
        }
      });
    }

    // Process Lidar Sensor Data
    if (sensorReadings.lidarScan && sensorReadings.lidarScan.points) {
      for (const point of sensorReadings.lidarScan.points) {
        // Assuming Lidar points are relative to the sensor:
        // X: forward, Y: left, Z: up
        if (
          point.x >= LIDAR_OBSTACLE_BOX_X_MIN && point.x <= LIDAR_OBSTACLE_BOX_X_MAX &&
          Math.abs(point.y) <= LIDAR_OBSTACLE_BOX_Y_ABS_MAX &&
          point.z >= LIDAR_OBSTACLE_BOX_Z_MIN && point.z <= LIDAR_OBSTACLE_BOX_Z_MAX
        ) {
          console.log(`Lidar detected point obstacle at (x:${point.x}, y:${point.y}, z:${point.z})`);
          // For V1, treat any point in the box as a static obstacle.
          // Location estimation would require tractor's GPS and heading.
          const distance = Math.sqrt(point.x * point.x + point.y * point.y);
          const angle = Math.atan2(point.y, point.x) * 180 / Math.PI; // Angle relative to Lidar's forward

          detectedObstacles.push({
            type: 'static', // Assume static for V1
            location: null, // Cannot determine GPS without tractor pose
            relativePosition: { distance, angle },
            rawDetections: [{ sensor: 'lidar', point }]
          });
          rawDetections.push({ sensor: 'lidar', point });
          // For simplicity, first detected Lidar point triggers. A real system would cluster points.
          break;
        }
      }
    }

    if (detectedObstacles.length > 0) {
      // For V1, return the first detected obstacle.
      // A more sophisticated system might merge or prioritize.
      const primaryObstacle = detectedObstacles[0];
      console.log(`Obstacle detected: Type: ${primaryObstacle.type}, RelativePos: ${JSON.stringify(primaryObstacle.relativePosition)}`);
      return {
        type: primaryObstacle.type,
        location: primaryObstacle.location, // Will be null for now
        relativePosition: primaryObstacle.relativePosition,
        rawDetections: rawDetections // Include all raw points that triggered
      };
    }

    // console.log('No obstacles detected.');
    return { type: null, location: null, rawDetections: [] };
  }
}