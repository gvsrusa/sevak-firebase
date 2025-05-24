// mobile-app/modules/GeofenceMonitor.ts
import { GPSCoordinate, Polygon } from './NavigationController';

export class GeofenceMonitor {
  private operationalBoundary?: Polygon;
  private exclusionZones: Polygon[] = [];

  // Helper function: Check if a point is inside a polygon using the Ray Casting algorithm
  // This is the same helper used in PathPlanner.ts
  private isPointInsidePolygon(point: GPSCoordinate, polygon: Polygon): boolean {
    if (!polygon || !polygon.points || polygon.points.length < 3) {
      // Not a valid polygon to check against
      console.warn('isPointInsidePolygon called with invalid polygon:', polygon);
      return false;
    }
    let crossings = 0;
    const points = polygon.points;
    const n = points.length;

    for (let i = 0; i < n; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % n];

      if (((p1.lat <= point.lat && point.lat < p2.lat) || (p2.lat <= point.lat && point.lat < p1.lat)) &&
        (point.lon < (p2.lon - p1.lon) * (point.lat - p1.lat) / (p2.lat - p1.lat) + p1.lon)) {
        crossings++;
      }
    }
    return crossings % 2 === 1;
  }

  updateCurrentLocation(location: GPSCoordinate): { inOperationalZone: boolean; inExclusionZone: boolean } {
    console.log(`Updating current location for geofence check: (${location.lat}, ${location.lon})`);
    
    let inOperational = true; // Default to true if no boundary is set
    if (this.operationalBoundary && this.operationalBoundary.points && this.operationalBoundary.points.length >= 3) {
        inOperational = this.isPointInsidePolygon(location, this.operationalBoundary);
    } else if (this.operationalBoundary) {
        // Operational boundary is defined but invalid
        console.warn('Operational boundary is defined but invalid. Assuming location is outside.');
        inOperational = false;
    }


    let inExclusion = false;
    for (const zone of this.exclusionZones) {
      if (zone && zone.points && zone.points.length >=3) {
        if (this.isPointInsidePolygon(location, zone)) {
          inExclusion = true;
          break;
        }
      } else {
          console.warn('Encountered an invalid exclusion zone:', zone);
      }
    }
    
    console.log(`Geofence status: inOperationalZone=${inOperational}, inExclusionZone=${inExclusion}`);
    return { inOperationalZone: inOperational, inExclusionZone: inExclusion };
  }

  setOperationalBoundary(boundary: Polygon): void {
    if (!boundary || !boundary.points || boundary.points.length < 3) {
        console.warn('Attempted to set an invalid operational boundary:', boundary);
        this.operationalBoundary = undefined; // Clear if invalid
        return;
    }
    this.operationalBoundary = boundary;
    console.log(`Operational boundary set with ${boundary.points.length} points.`);
  }

  addExclusionZone(zone: Polygon): void {
    if (!zone || !zone.points || zone.points.length < 3) {
        console.warn('Attempted to add an invalid exclusion zone:', zone);
        return;
    }
    this.exclusionZones.push(zone);
    console.log(`Exclusion zone added with ${zone.points.length} points. Total exclusion zones: ${this.exclusionZones.length}`);
  }

  // Method to clear all exclusion zones if needed, not explicitly in initial request but good for management
  clearExclusionZones(): void {
    this.exclusionZones = [];
    console.log('All exclusion zones cleared.');
  }

  // Method to clear operational boundary if needed
  clearOperationalBoundary(): void {
    this.operationalBoundary = undefined;
    console.log('Operational boundary cleared.');
  }
}