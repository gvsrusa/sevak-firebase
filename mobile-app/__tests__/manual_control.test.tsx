import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import ManualControlScreen from '../components/ManualControlScreen';
import TractorCommunicationService from '../services/TractorCommunicationService';
import TractorStatusService, { TractorStatus, TractorLocation } from '../services/TractorStatusService'; // Added TractorLocation


// --- Mocks ---
jest.mock('../services/TractorCommunicationService', () => ({
  __esModule: true,
  default: {
    sendCommand: jest.fn(),
  },
}));

// This object will hold the callback and initial status, accessible within the mock factory
const tractorStatusServiceMockState = {
  statusUpdateCallback: null as ((status: Partial<TractorStatus>) => void) | null,
  initialStatus: {
    status: 'ManualMode',
    currentLocation: { lat: 0, lon: 0 },
    batteryLevel: 100,
    cutterStatus: 'DISENGAGED',
    loaderStatus: 'DISENGAGED',
  } as TractorStatus,
};

jest.mock('../services/TractorStatusService', () => {
  const originalModule = jest.requireActual('../services/TractorStatusService');
  // Import act directly inside the mock factory
  const { act: testingLibraryAct } = jest.requireActual('@testing-library/react');
  return {
    __esModule: true,
    ...originalModule,
    default: {
      getInitialStatus: jest.fn(() => tractorStatusServiceMockState.initialStatus),
      onStatusUpdate: jest.fn((callback: (status: Partial<TractorStatus>) => void) => {
        tractorStatusServiceMockState.statusUpdateCallback = callback;
        return { unsubscribe: jest.fn(() => { tractorStatusServiceMockState.statusUpdateCallback = null; }) };
      }),
      _emitStatusUpdate: (newStatus: Partial<TractorStatus>) => {
        if (tractorStatusServiceMockState.statusUpdateCallback) {
          testingLibraryAct(() => {
            if (tractorStatusServiceMockState.statusUpdateCallback) {
              tractorStatusServiceMockState.statusUpdateCallback(newStatus);
            }
          });
        }
      },
    },
  };
});


// Cast the imported services to their mocked type to access mock functions
const MockedTractorCommunicationService = TractorCommunicationService as jest.Mocked<typeof TractorCommunicationService>;
const MockedTractorStatusService = TractorStatusService as jest.Mocked<typeof TractorStatusService> & {
  _emitStatusUpdate: (newStatus: Partial<TractorStatus>) => void;
  getInitialStatus: jest.Mock<TractorStatus, []>;
};

// --- Constants based on Test Plan context ---
const MANUAL_MODE_SPEED = 3; // Example speed in km/h
const TURN_ANGLE_VALUE = 15; // Example angle in degrees
const MANUAL_MODE_SPEED_LIMIT = 3; // Example speed limit in km/h

describe('Mobile App Manual Control Mode', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset initial status for TractorStatusService for each test
    tractorStatusServiceMockState.initialStatus = {
      status: 'ManualMode',
      currentLocation: { lat: 0, lon: 0 },
      batteryLevel: 100,
      cutterStatus: 'DISENGAGED',
      loaderStatus: 'DISENGAGED',
    };
    // Also ensure the getInitialStatus mock uses the updated state
    MockedTractorStatusService.getInitialStatus.mockImplementation(() => tractorStatusServiceMockState.initialStatus);
  });

  // Test Case 4.1: Virtual Joystick - Forward Movement (AVR-MCM-1)
  test('TC-MCM-001: should send MOVE_FORWARD command on joystick forward', () => {
    render(<ManualControlScreen />);
    fireEvent.click(screen.getByTestId('joystick-forward'));
    expect(MockedTractorCommunicationService.sendCommand).toHaveBeenCalledWith('MOVE_FORWARD', { speed: MANUAL_MODE_SPEED });
  });

  // Test Case 4.2: Virtual Joystick - Backward Movement (AVR-MCM-1)
  test('TC-MCM-002: should send MOVE_BACKWARD command on joystick backward', () => {
    render(<ManualControlScreen />);
    fireEvent.click(screen.getByTestId('joystick-backward'));
    expect(MockedTractorCommunicationService.sendCommand).toHaveBeenCalledWith('MOVE_BACKWARD', { speed: MANUAL_MODE_SPEED });
  });

  // Test Case 4.3: Virtual Joystick - Left Turn (AVR-MCM-1)
  test('TC-MCM-003: should send TURN_LEFT command on joystick left', () => {
    render(<ManualControlScreen />);
    fireEvent.click(screen.getByTestId('joystick-left'));
    expect(MockedTractorCommunicationService.sendCommand).toHaveBeenCalledWith('TURN_LEFT', { angle: TURN_ANGLE_VALUE });
  });

  // Test Case 4.4: Virtual Joystick - Right Turn (AVR-MCM-1)
  test('TC-MCM-004: should send TURN_RIGHT command on joystick right', () => {
    render(<ManualControlScreen />);
    fireEvent.click(screen.getByTestId('joystick-right'));
    expect(MockedTractorCommunicationService.sendCommand).toHaveBeenCalledWith('TURN_RIGHT', { angle: TURN_ANGLE_VALUE });
  });

  // Test Case 4.5: Engage Cutter Button (AVR-MCM-2)
  test('TC-MCM-005: should send ENGAGE_CUTTER command and update UI on engage cutter button press', () => {
    tractorStatusServiceMockState.initialStatus = {
      status: 'ManualMode', cutterStatus: 'DISENGAGED', loaderStatus: 'DISENGAGED',
      batteryLevel: 100, currentLocation: { lat: 0, lon: 0 }
    };
    MockedTractorStatusService.getInitialStatus.mockImplementationOnce(() => tractorStatusServiceMockState.initialStatus);
    render(<ManualControlScreen />);
    fireEvent.click(screen.getByTestId('engage-cutter-button'));
    expect(MockedTractorCommunicationService.sendCommand).toHaveBeenCalledWith('ENGAGE_CUTTER');

    // Simulate status update from service
    MockedTractorStatusService._emitStatusUpdate({ cutterStatus: 'ENGAGED' });
    expect(screen.getByTestId('cutter-status-display')).toHaveTextContent('Cutter: ENGAGED');
  });

  // Test Case 4.6: Disengage Cutter Button (AVR-MCM-2)
  test('TC-MCM-006: should send DISENGAGE_CUTTER command and update UI on disengage cutter button press', () => {
    tractorStatusServiceMockState.initialStatus = {
      status: 'ManualMode', cutterStatus: 'ENGAGED', loaderStatus: 'DISENGAGED',
      batteryLevel: 100, currentLocation: { lat: 0, lon: 0 }
    };
    MockedTractorStatusService.getInitialStatus.mockImplementationOnce(() => tractorStatusServiceMockState.initialStatus);
    render(<ManualControlScreen />);
    fireEvent.click(screen.getByTestId('disengage-cutter-button'));
    expect(MockedTractorCommunicationService.sendCommand).toHaveBeenCalledWith('DISENGAGE_CUTTER');

    // Simulate status update from service
    MockedTractorStatusService._emitStatusUpdate({ cutterStatus: 'DISENGAGED' });
    expect(screen.getByTestId('cutter-status-display')).toHaveTextContent('Cutter: DISENGAGED');
  });

  // Test Case 4.7: Engage Loader Button (AVR-MCM-3)
  test('TC-MCM-007: should send ENGAGE_LOADER command on engage loader button press', () => {
    tractorStatusServiceMockState.initialStatus = {
      status: 'ManualMode', loaderStatus: 'DISENGAGED', cutterStatus: 'DISENGAGED',
      batteryLevel: 100, currentLocation: { lat: 0, lon: 0 }
    };
    MockedTractorStatusService.getInitialStatus.mockImplementationOnce(() => tractorStatusServiceMockState.initialStatus);
    render(<ManualControlScreen />);
    fireEvent.click(screen.getByTestId('engage-loader-button'));
    expect(MockedTractorCommunicationService.sendCommand).toHaveBeenCalledWith('ENGAGE_LOADER');

    // Simulate status update from service
    MockedTractorStatusService._emitStatusUpdate({ loaderStatus: 'ENGAGED' });
    expect(screen.getByTestId('loader-status-display')).toHaveTextContent('Loader: ENGAGED');
  });

  // Test Case 4.8: Disengage Loader Button (AVR-MCM-3)
  test('TC-MCM-008: should send DISENGAGE_LOADER command on disengage loader button press', () => {
    tractorStatusServiceMockState.initialStatus = {
      status: 'ManualMode', loaderStatus: 'ENGAGED', cutterStatus: 'DISENGAGED',
      batteryLevel: 100, currentLocation: { lat: 0, lon: 0 }
    };
    MockedTractorStatusService.getInitialStatus.mockImplementationOnce(() => tractorStatusServiceMockState.initialStatus);
    render(<ManualControlScreen />);
    fireEvent.click(screen.getByTestId('disengage-loader-button'));
    expect(MockedTractorCommunicationService.sendCommand).toHaveBeenCalledWith('DISENGAGE_LOADER');

    // Simulate status update from service
    MockedTractorStatusService._emitStatusUpdate({ loaderStatus: 'DISENGAGED' });
    expect(screen.getByTestId('loader-status-display')).toHaveTextContent('Loader: DISENGAGED');
  });

  // Test Case 4.9: Speed Limitation in Manual Mode (AVR-MCM-4)
  test('TC-MCM-009: should send MOVE_FORWARD command with speed limited to MANUAL_MODE_SPEED_LIMIT', () => {
    render(<ManualControlScreen />);
    // Simulate joystick to maximum forward. The component's internal logic should cap the speed.
    fireEvent.click(screen.getByTestId('joystick-forward')); 
    expect(MockedTractorCommunicationService.sendCommand).toHaveBeenCalledWith('MOVE_FORWARD', { speed: MANUAL_MODE_SPEED_LIMIT });
  });

  // Test Case 4.10: Stable Communication Link - Command Transmission (AVR-MCM-5)
  // This test verifies the component uses the communication service.
  // The stability/reliability of N commands is typically for service-level or E2E tests.
  test('TC-MCM-010: component should use TractorCommunicationService to send commands', () => {
    render(<ManualControlScreen />);
    fireEvent.click(screen.getByTestId('joystick-forward'));
    expect(MockedTractorCommunicationService.sendCommand).toHaveBeenCalledTimes(1);
  });

  // Test Case 4.11: Stable Communication Link - Status Reception (AVR-MCM-5)
  // This test verifies the component subscribes to and can react to status updates.
  test('TC-MCM-011: component should subscribe to TractorStatusService for status updates', () => {
    render(<ManualControlScreen />);
    expect(MockedTractorStatusService.onStatusUpdate).toHaveBeenCalled();
    // Further checks involve emitting a status and verifying UI update (covered in AVR-MCM-7 tests)
  });

  // Test Case 4.12: Secure Communication - Unauthorized Access Prevention (AVR-MCM-6)
  // This AVR is primarily for the TractorCommunicationService itself.
  // Testing this at the component level would require specific UI error handling
  // for security rejections, which is not detailed for the component.
  // Thus, a direct component test for this specific AVR is omitted here.

  // Test Case 4.13: App Status Reflection - Manual Mode Active (AVR-MCM-7)
  test('TC-MCM-013: should display tractor status as ManualMode when active', () => {
    tractorStatusServiceMockState.initialStatus = { status: 'Idle', batteryLevel: 80, currentLocation: {lat:1,lon:1}, cutterStatus: 'DISENGAGED', loaderStatus: 'DISENGAGED' };
    MockedTractorStatusService.getInitialStatus.mockImplementationOnce(() => tractorStatusServiceMockState.initialStatus);
    render(<ManualControlScreen />);
    expect(screen.getByTestId('tractor-status-display')).toHaveTextContent('Status: Idle');

    MockedTractorStatusService._emitStatusUpdate({
      status: 'ManualMode',
      currentLocation: { lat: 12.34, lon: 56.78 },
      batteryLevel: 75,
    });
    
    expect(screen.getByTestId('tractor-status-display')).toHaveTextContent('Status: ManualMode');
  });

  // Test Case 4.14: App Status Reflection - Real-time Location Update (AVR-MCM-7)
  test('TC-MCM-014: should display updated tractor location in real-time', () => {
    render(<ManualControlScreen />);
    const newLocation = { lat: 10.1, lon: 20.2 }; // Use different values for clarity
    MockedTractorStatusService._emitStatusUpdate({
      // status: 'ManualMode', // Not changing status here, just location
      currentLocation: newLocation,
      // batteryLevel: 70, // Not changing battery here
    });
    expect(screen.getByTestId('tractor-location-display')).toHaveTextContent(`Location: ${newLocation.lat.toFixed(2)},${newLocation.lon.toFixed(2)}`);
  });

  // Test Case 4.15: App Status Reflection - Battery Level Update (AVR-MCM-7)
  test('TC-MCM-015: should display updated battery level', () => {
    render(<ManualControlScreen />);
    const newBatteryLevel = 65; // Use different value
    MockedTractorStatusService._emitStatusUpdate({
      // status: 'ManualMode', // Not changing status
      // currentLocation: { lat: 1, lon: 1 }, // Not changing location
      batteryLevel: newBatteryLevel,
    });
    expect(screen.getByTestId('tractor-battery-display')).toHaveTextContent(`Battery: ${newBatteryLevel}%`);
  });
});

// Notes for future Coder/Debugger:
// 1. Component Implementation: The `ManualControlScreen` is a placeholder.
//    Actual tests for UI updates (status, location, battery, cutter/loader status display)
//    will depend on the real component's structure and how it displays data.
//    Ensure appropriate `data-testid` attributes or accessible roles are used in the actual component.
// 2. Joystick Interaction: `fireEvent.click` on joystick buttons is a simplification.
//    A real joystick component might require different event simulation or interaction patterns.
// 3. Service Paths: Mock paths (`../services/...`) assume services are in `mobile-app/services/`. Adjust if needed.
// 4. Async Operations: If the component updates asynchronously after service calls/events,
//    `waitFor` from RTL might be necessary for some assertions.
// 5. ViewModel Logic: If a `useManualControlViewModel` hook is the primary UUT, tests could use `renderHook`.
//    These component tests verify the integration of that logic into the UI.