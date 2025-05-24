export interface TractorLocation {
  lat: number;
  lon: number;
}

export interface TractorStatus {
  status: 'Idle' | 'Navigating' | 'Cutting' | 'Transporting' | 'Charging' | 'Error' | 'ManualMode' | 'EStop';
  currentLocation: TractorLocation;
  batteryLevel: number;
  cutterStatus: 'ENGAGED' | 'DISENGAGED';
  loaderStatus: 'ENGAGED' | 'DISENGAGED';
  // Add other relevant status fields as needed
}

type StatusUpdateCallback = (status: Partial<TractorStatus>) => void;

class TractorStatusService {
  private statusUpdateSubscribers: StatusUpdateCallback[] = [];
  private currentStatus: TractorStatus = { // Default initial status
    status: 'Idle',
    currentLocation: { lat: 0, lon: 0 },
    batteryLevel: 100,
    cutterStatus: 'DISENGAGED',
    loaderStatus: 'DISENGAGED',
  };

  constructor() {
    // In a real application, this service would establish a connection
    // to the tractor (e.g., via WebSockets, Bluetooth) and listen for status updates.
    // For now, we'll simulate some updates for demonstration if needed,
    // but tests will primarily use the _emitStatusUpdate helper.
  }

  public getInitialStatus(): TractorStatus {
    console.log('[TractorStatusService] Providing initial status:', this.currentStatus);
    return { ...this.currentStatus }; // Return a copy
  }

  public getBatteryLevel(): number {
    console.log('[TractorStatusService] Providing battery level:', this.currentStatus.batteryLevel);
    return this.currentStatus.batteryLevel;
  }

  public onStatusUpdate(callback: StatusUpdateCallback): { unsubscribe: () => void } {
    this.statusUpdateSubscribers.push(callback);
    console.log('[TractorStatusService] New subscriber added. Total subscribers:', this.statusUpdateSubscribers.length);
    return {
      unsubscribe: () => {
        this.statusUpdateSubscribers = this.statusUpdateSubscribers.filter(cb => cb !== callback);
        console.log('[TractorStatusService] Subscriber removed. Total subscribers:', this.statusUpdateSubscribers.length);
      },
    };
  }

  // Helper method for tests and potential internal simulation
  public _emitStatusUpdate(newStatus: Partial<TractorStatus>): void {
    // Update internal currentStatus
    this.currentStatus = { ...this.currentStatus, ...newStatus };
    console.log('[TractorStatusService] Emitting status update:', newStatus);
    console.log('[TractorStatusService] New full status:', this.currentStatus);
    this.statusUpdateSubscribers.forEach(callback => {
      try {
        callback(newStatus); // Send only the partial update
      } catch (error) {
        console.error('[TractorStatusService] Error in status update callback:', error);
      }
    });
  }
}

// Ensure this is a default export as per the mock in manual_control.test.tsx
const tractorStatusService = new TractorStatusService();
export default tractorStatusService;