// mobile-app/modules/PathPlanner.ts
import { GPSCoordinate, Polygon } from './NavigationController';

export class PathPlanner {
  // Helper function: Check if a point is inside a polygon using the Ray Casting algorithm
  private isPointInsidePolygon(point: GPSCoordinate, polygon: Polygon): boolean {
    let crossings = 0;
    const points = polygon.points;
    const n = points.length;

    for (let i = 0; i < n; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % n];

      // Check if the point is on a horizontal segment (edge case, handle as needed or ignore for simplicity)
      // if (point.lat === p1.lat && point.lat === p2.lat && point.lon >= Math.min(p1.lon, p2.lon) && point.lon <= Math.max(p1.lon, p2.lon)) {
      //   return true; // Point is on a horizontal segment
      // }

      // Check if the point is on a vertical segment (edge case)
      // if (point.lon === p1.lon && point.lon === p2.lon && point.lat >= Math.min(p1.lat, p2.lat) && point.lat <= Math.max(p1.lat, p2.lat)) {
      //    return true; // Point is on a vertical segment
      // }


      if (((p1.lat <= point.lat && point.lat < p2.lat) || (p2.lat <= point.lat && point.lat < p1.lat)) &&
        (point.lon < (p2.lon - p1.lon) * (point.lat - p1.lat) / (p2.lat - p1.lat) + p1.lon)) {
        crossings++;
      }
    }
    return crossings % 2 === 1;
  }

  // Helper function: Check orientation of three ordered points (p, q, r)
  // Returns 0 if colinear, 1 if clockwise, 2 if counterclockwise
  private getOrientation(p: GPSCoordinate, q: GPSCoordinate, r: GPSCoordinate): number {
    const val = (q.lon - p.lon) * (r.lat - q.lat) - (q.lat - p.lat) * (r.lon - q.lon);
    if (val === 0) return 0; // Collinear
    return (val > 0) ? 1 : 2; // Clockwise or Counterclockwise
  }

  // Helper function: Given three colinear points p, q, r, check if point q lies on segment 'pr'
  private onSegment(p: GPSCoordinate, q: GPSCoordinate, r: GPSCoordinate): boolean {
    return (q.lat <= Math.max(p.lat, r.lat) && q.lat >= Math.min(p.lat, r.lat) &&
            q.lon <= Math.max(p.lon, r.lon) && q.lon >= Math.min(p.lon, r.lon));
  }

  // Helper function: Check if line segment 'p1q1' and 'p2q2' intersect
  private doLineSegmentsIntersect(p1: GPSCoordinate, q1: GPSCoordinate, p2: GPSCoordinate, q2: GPSCoordinate): boolean {
    const o1 = this.getOrientation(p1, q1, p2);
    const o2 = this.getOrientation(p1, q1, q2);
    const o3 = this.getOrientation(p2, q2, p1);
    const o4 = this.getOrientation(p2, q2, q1);

    // General case
    if (o1 !== 0 && o2 !== 0 && o3 !== 0 && o4 !== 0) {
        if (o1 !== o2 && o3 !== o4) return true;
    }

    // Special Cases for collinear points
    if (o1 === 0 && this.onSegment(p1, p2, q1)) return true;
    if (o2 === 0 && this.onSegment(p1, q2, q1)) return true;
    if (o3 === 0 && this.onSegment(p2, p1, q2)) return true;
    if (o4 === 0 && this.onSegment(p2, q1, q2)) return true;

    return false;
  }

  // Helper function: Check if a line segment intersects with any edge of a polygon
  private isSegmentIntersectingPolygon(p1: GPSCoordinate, p2: GPSCoordinate, polygon: Polygon): boolean {
    const polyPoints = polygon.points;
    for (let i = 0; i < polyPoints.length; i++) {
      const polyP1 = polyPoints[i];
      const polyP2 = polyPoints[(i + 1) % polyPoints.length];
      if (this.doLineSegmentsIntersect(p1, p2, polyP1, polyP2)) {
        return true;
      }
    }
    return false;
  }


  generatePath(start: GPSCoordinate, end: GPSCoordinate, obstacles: Polygon[], geofence: Polygon): GPSCoordinate[] {
    console.log(`Generating path from (${start.lat}, ${start.lon}) to (${end.lat}, ${end.lon}), considering ${obstacles.length} obstacles and a geofence.`);

    // 1. Validate geofence (must have at least 3 points to be a polygon)
    if (!geofence || !geofence.points || geofence.points.length < 3) {
        console.error('Invalid geofence provided for path generation.');
        return []; // Cannot generate path without a valid geofence
    }
    
    // 2. Check if start and end points are within the geofence
    if (!this.isPointInsidePolygon(start, geofence)) {
      console.warn(`Start point (${start.lat}, ${start.lon}) is outside the geofence.`);
      return []; // Start point outside geofence
    }
    if (!this.isPointInsidePolygon(end, geofence)) {
      console.warn(`End point (${end.lat}, ${end.lon}) is outside the geofence.`);
      return []; // End point outside geofence
    }

    // 3. Check for direct path collision with any obstacles
    for (const obstacle of obstacles) {
      if (obstacle && obstacle.points && obstacle.points.length >=3) {
        if (this.isSegmentIntersectingPolygon(start, end, obstacle)) {
          console.warn(`Direct path intersects with an obstacle.`);
          // TODO: Implement more advanced pathfinding (e.g., A*) if direct path is blocked.
          // For V1, if direct path is blocked by an obstacle, return empty path.
          return [];
        }
      }
    }
    
    // 4. Check if the direct path segment itself goes outside the geofence.
    // This is a simplified check. A robust check would ensure all points on the segment are inside.
    // For now, we rely on endpoints being inside and no intersection with geofence *boundary* as an obstacle.
    // If the geofence is convex, endpoints inside and no intersection with its boundary implies the segment is inside.
    // For a concave geofence, this is not sufficient.
    // A simple additional check: is the midpoint of the segment inside the geofence?
    const midPoint: GPSCoordinate = {
        lat: (start.lat + end.lat) / 2,
        lon: (start.lon + end.lon) / 2,
    };
    if (!this.isPointInsidePolygon(midPoint, geofence)) {
        console.warn('Direct path midpoint is outside the geofence.');
        return [];
    }
    // Also, ensure the path segment doesn't "cross out" of the geofence.
    // We can treat the geofence boundary as a special kind of "reverse" obstacle:
    // the path should NOT cross it outwards.
    // This is complex. For now, the isPointInsidePolygon for start, end, and midpoint is a basic V1 check.

    // If all checks pass, the direct path is considered valid for V1.
    console.log('Direct path is valid.');
    return [start, end];
  }

  replanPath(currentLocation: GPSCoordinate, originalPath: GPSCoordinate[], newObstacle: Polygon): GPSCoordinate[] {
    console.log(`Replanning path from (${currentLocation.lat}, ${currentLocation.lon}) due to new obstacle. Original path had ${originalPath.length} points.`);
    if (!originalPath || originalPath.length === 0) {
      console.warn('Cannot replan: Original path is empty.');
      return [];
    }
    const endDestination = originalPath[originalPath.length - 1];

    // Limitation: replanPath does not have access to the original geofence or other pre-existing obstacles.
    // It will attempt to generate a path considering only the newObstacle.
    // This is a significant simplification and likely insufficient for robust replanning.
    // A "dummy" geofence that's very large could be used, or this method should ideally get the full context.
    // For now, let's assume no geofence check in replan for simplicity, or a very large one.
    // And only the new obstacle.
    
    console.warn('Replanning path with significant limitations: missing original geofence and full obstacle list.');
    
    // Create a placeholder geofence that is extremely large to effectively ignore it for this limited replan
    const dummyGeofence: Polygon = {
        points: [
            { lat: -90, lon: -180 },
            { lat: 90, lon: -180 },
            { lat: 90, lon: 180 },
            { lat: -90, lon: 180 },
        ]
    };
    
    // Attempt to generate a new path considering only the new obstacle and the dummy geofence.
    // This call to generatePath will use its own console logs.
    const replannedPath = this.generatePath(currentLocation, endDestination, newObstacle ? [newObstacle] : [], dummyGeofence);

    if (replannedPath.length > 0) {
        console.log(`Replanning successful. New path has ${replannedPath.length} points.`);
        return replannedPath;
    } else {
        console.warn('Replanning failed to find a new path. Returning empty path.');
        // Fallback to a very simple path if replanning fails, or just empty.
        // The original placeholder was [currentLocation, endDestination]
        // Let's return empty to signal failure clearly.
        return [];
    }
  }
}