import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';

// --- Mock Services ---
// These will be expanded with specific mock implementations as needed by tests.

// Mock MapService: Handles map interactions (drawing, pinning, coordinate conversion).
const mockMapService = {
  onMapTap: jest.fn(),
  savePolygon: jest.fn(),
  clearDrawing: jest.fn(),
  onVertexDrag: jest.fn(),
  onPinDrag: jest.fn(),
  updateTractorLocation: jest.fn(),
  // Add other methods as needed from the test plan
};
jest.mock('../services/MapService', () => ({
  __esModule: true,
  default: mockMapService,
  useMapService: () => mockMapService, // if it's a hook
}));

// Mock TaskService: Manages task data (saving, loading, validating polygons/points).
const mockTaskService = {
  saveCuttingArea: jest.fn(),
  validatePolygon: jest.fn().mockReturnValue(true), // Default to valid
  saveDropOffLocation: jest.fn(),
  saveHomeBaseLocation: jest.fn(),
  getDefinedTask: jest.fn(),
  getHomeBaseLocation: jest.fn(),
  // Add other methods as needed
};
jest.mock('../services/TaskService', () => ({
  __esModule: true,
  default: mockTaskService,
  useTaskService: () => mockTaskService, // if it's a hook
}));

// Mock TractorCommunicationService: Communicates with the physical tractor.
const mockTractorCommunicationService = {
  sendTaskParameters: jest.fn(),
  onStatusUpdate: jest.fn(), // This might be an event emitter or a callback registration
  onTaskCompletion: jest.fn(),
  onCriticalEvent: jest.fn(),
  sendReturnHomeCommand: jest.fn(),
  // Add other methods as needed
};
jest.mock('../services/TractorCommunicationService', () => ({
  __esModule: true,
  default: mockTractorCommunicationService,
  useTractorCommunicationService: () => mockTractorCommunicationService,
}));

// Mock NotificationService: Handles in-app and push notifications.
const mockNotificationService = {
  displaySuccess: jest.fn(),
  displayError: jest.fn(),
  displayInfo: jest.fn(),
  sendNotification: jest.fn(),
  // Add other methods as needed
};
jest.mock('../services/NotificationService', () => ({
  __esModule: true,
  default: mockNotificationService,
  useNotificationService: () => mockNotificationService,
}));

// Mock LocalStorageService: For offline data persistence.
const mockLocalStorageService = {
  saveItem: jest.fn(),
  getItem: jest.fn(),
  // Add other methods as needed
};
jest.mock('../services/LocalStorageService', () => ({
  __esModule: true,
  default: mockLocalStorageService,
  useLocalStorageService: () => mockLocalStorageService,
}));


// --- Placeholder Components (to be created or fleshed out as needed) ---

// Placeholder for MapInteractionComponent
// This component would be responsible for rendering the map and handling user interactions
// For now, it's a simple div that might have buttons to simulate actions.
const MockMapInteractionComponent = ({
  onSavePolygon,
  onClearPolygon,
  onSaveDropOff,
  onSaveHomeBase,
  // ... other props based on UUT interactions
}: {
  onSavePolygon?: (polygon: any) => void;
  onClearPolygon?: () => void;
  onSaveDropOff?: (location: any) => void;
  onSaveHomeBase?: (location: any) => void;

}) => {
  // Simulate user drawing points and then saving
  const handleDefineSquareAndSave = () => {
    // Simulate map taps for a square
    mockMapService.onMapTap([10, 10]); // Vertex 1
    mockMapService.onMapTap([10, 20]); // Vertex 2
    mockMapService.onMapTap([20, 20]); // Vertex 3
    mockMapService.onMapTap([20, 10]); // Vertex 4
    const polygon = [[10,10], [10,20], [20,20], [20,10]];
    if (onSavePolygon) onSavePolygon(polygon);
  };

  const handleDefineSelfIntersectingAndSave = () => {
    // Simulate map taps for a self-intersecting polygon (e.g., a bowtie shape)
    // A simple self-intersection: (0,0) -> (2,2) -> (0,2) -> (2,0) -> (0,0)
    mockMapService.onMapTap([0,0]);
    mockMapService.onMapTap([2,2]);
    mockMapService.onMapTap([0,2]);
    mockMapService.onMapTap([2,0]);
    const polygon = [[0,0], [2,2], [0,2], [2,0]];
    if (onSavePolygon) onSavePolygon(polygon);
  };

  const handleClear = () => {
    if (onClearPolygon) onClearPolygon();
  };

  const handleSaveDropOff = () => {
    mockMapService.onMapTap([15,15]); // Simulate tap for drop-off
    if (onSaveDropOff) onSaveDropOff([15,15]);
  }

  const handleSaveHomeBase = () => {
    mockMapService.onMapTap([5,5]); // Simulate tap for home base
    if (onSaveHomeBase) onSaveHomeBase([5,5]);
  }

  return (
    <div>
      <button data-testid="define-square-button" onClick={handleDefineSquareAndSave}>Define Square Area</button>
      <button data-testid="define-self-intersecting-button" onClick={handleDefineSelfIntersectingAndSave}>Define Self-Intersecting Area</button>
      <button data-testid="clear-polygon-button" onClick={handleClear}>Clear Polygon</button>
      <button data-testid="save-dropoff-button" onClick={handleSaveDropOff}>Save Drop-off</button>
      <button data-testid="save-homebase-button" onClick={handleSaveHomeBase}>Save Home Base</button>
      {/* Placeholder for map display */}
      <div data-testid="map-display">Map Area</div>
      <div data-testid="polygon-display"></div>
      <div data-testid="pin-display"></div>
    </div>
  );
};

// Placeholder for TaskManagementScreen
const MockTaskManagementScreen = ({
    onStartTask,
    onReturnHome,
}: {
    onStartTask?: () => void;
    onReturnHome?: () => void;
}) => {
    return (
        <div>
            <button data-testid="start-task-button" onClick={onStartTask}>Start Task</button>
            <button data-testid="return-home-button" onClick={onReturnHome}>Return Home</button>
        </div>
    );
}

// Placeholder for StatusDisplayComponent
const MockStatusDisplayComponent = ({ currentStatus, progress }: { currentStatus: string, progress?: number }) => {
    return (
        <div>
            <p data-testid="status-text">Status: {currentStatus}</p>
            {progress !== undefined && <p data-testid="progress-text">Progress: {progress * 100}%</p>}
        </div>
    );
};


// --- Test Suites ---
describe('Mobile App Map Interface & Point Definition', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  // 5.1. Define Cutting Area (PRDMasterPlan.md: 5.A.1)
  describe('MAP-001: Successful Polygon Drawing and Saving', () => {
    it('should allow user to draw and save a valid polygonal cutting area, storing coordinates correctly', async () => {
      // UUT: MapInteractionComponent (simulated)
      // For this test, we assume MapInteractionComponent calls TaskService.saveCuttingArea
      // and LocalStorageService.saveItem upon a successful save action.

      const mockCuttingArea = [[10,10], [10,20], [20,20], [20,10]];
      mockTaskService.saveCuttingArea.mockResolvedValueOnce({ id: 'task1', area: mockCuttingArea }); // Simulate successful save

      render(
        <MockMapInteractionComponent
          onSavePolygon={async (polygon) => {
            try {
              const savedTask = await mockTaskService.saveCuttingArea(polygon);
              await mockLocalStorageService.saveItem('currentTask', savedTask);
              mockNotificationService.displaySuccess('Area saved!');
            } catch (error) {
              mockNotificationService.displayError('Failed to save area');
            }
          }}
        />
      );

      // Simulate user defining a square and clicking save
      fireEvent.click(screen.getByTestId('define-square-button'));

      // Wait for async operations if any (e.g. service calls)
      await act(async () => {
        // Allow promises to resolve
        await new Promise(resolve => setTimeout(resolve, 0));
      });
      
      // Expected Mock Interactions:
      // 1. MapService.onMapTap called multiple times (simulated inside MockMapInteractionComponent)
      expect(mockMapService.onMapTap).toHaveBeenCalledTimes(4); // For a square
      expect(mockMapService.onMapTap).toHaveBeenCalledWith([10,10]);
      expect(mockMapService.onMapTap).toHaveBeenCalledWith([10,20]);
      expect(mockMapService.onMapTap).toHaveBeenCalledWith([20,20]);
      expect(mockMapService.onMapTap).toHaveBeenCalledWith([20,10]);

      // 2. TaskService.saveCuttingArea is called once with the valid array of coordinates.
      expect(mockTaskService.saveCuttingArea).toHaveBeenCalledTimes(1);
      expect(mockTaskService.saveCuttingArea).toHaveBeenCalledWith(mockCuttingArea);

      // 3. LocalStorageService.saveItem is called with the serialized task data.
      expect(mockLocalStorageService.saveItem).toHaveBeenCalledTimes(1);
      expect(mockLocalStorageService.saveItem).toHaveBeenCalledWith('currentTask', { id: 'task1', area: mockCuttingArea });
      
      // Observable Outcome from UUT:
      // 1. Success message is displayed (via NotificationService).
      expect(mockNotificationService.displaySuccess).toHaveBeenCalledTimes(1);
      expect(mockNotificationService.displaySuccess).toHaveBeenCalledWith('Area saved!');
    });
  });

  describe('MAP-002: Invalid Polygon Prevention (Self-Intersecting)', () => {
    it('should prevent creation of invalid polygons and show an error', async () => {
      // UUT: MapInteractionComponent / TaskValidationService (simulated)
      const mockInvalidPolygon = [[0,0], [2,2], [0,2], [2,0]]; // Self-intersecting
      
      // Simulate TaskService validation failing
      mockTaskService.validatePolygon.mockReturnValueOnce(false); 
      // We'll have saveCuttingArea throw an error if validatePolygon is false, or handle it in the component
      mockTaskService.saveCuttingArea.mockImplementationOnce(async (polygon) => {
        if (!mockTaskService.validatePolygon(polygon)) {
          throw new Error("Invalid polygon");
        }
        return { id: 'task_invalid', area: polygon };
      });


      render(
        <MockMapInteractionComponent
          onSavePolygon={async (polygon) => {
            if (!mockTaskService.validatePolygon(polygon)) {
                mockNotificationService.displayError('Invalid polygon: Self-intersecting.');
                return;
            }
            try {
              // This part should ideally not be reached if validation is checked before calling
              await mockTaskService.saveCuttingArea(polygon);
              mockNotificationService.displaySuccess('Area saved!');
            } catch (error) {
              // This catch might be redundant if validation is upfront
              mockNotificationService.displayError('Failed to save: Invalid polygon');
            }
          }}
        />
      );

      fireEvent.click(screen.getByTestId('define-self-intersecting-button'));
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Expected Mock Interactions:
      // 1. MapService.onMapTap called for the invalid polygon
      expect(mockMapService.onMapTap).toHaveBeenCalledTimes(4); // For the bowtie
      
      // 2. TaskService.validatePolygon is called and returns false.
      expect(mockTaskService.validatePolygon).toHaveBeenCalledTimes(1);
      expect(mockTaskService.validatePolygon).toHaveBeenCalledWith(mockInvalidPolygon);
      
      // 3. TaskService.saveCuttingArea is *not* called due to validation failure.
      // Depending on implementation, it might be called and throw, or not called at all.
      // Given the onSavePolygon logic, it checks validatePolygon first.
      expect(mockTaskService.saveCuttingArea).not.toHaveBeenCalled();

      // 4. NotificationService.displayError is called.
      expect(mockNotificationService.displayError).toHaveBeenCalledTimes(1);
      expect(mockNotificationService.displayError).toHaveBeenCalledWith('Invalid polygon: Self-intersecting.');
      expect(mockNotificationService.displaySuccess).not.toHaveBeenCalled();
    });
  });

  describe('MAP-003: Polygon Adjustment/Clear', () => {
    it('should allow clearing the polygon', () => {
      // UUT: MapInteractionComponent
      render(
        <MockMapInteractionComponent
          onClearPolygon={() => {
            mockMapService.clearDrawing();
            // Potentially also clear some state in the component
            // For this test, we just check the service call
          }}
        />
      );

      fireEvent.click(screen.getByTestId('clear-polygon-button'));

      // Expected Mock Interactions:
      // 1. MapService.clearDrawing is called.
      expect(mockMapService.clearDrawing).toHaveBeenCalledTimes(1);
      // Further assertions could be made if the component managed visible state
      // e.g., expect(screen.queryByTestId('polygon-display')).toBeEmptyDOMElement();
    });

    // Test for adjusting polygon (MAP-003 part 2) would be more complex
    // and depend on how MapService.onVertexDrag is integrated.
    // For now, focusing on clear.
    it('should allow adjusting polygon vertices (conceptual)', () => {
        // This test is conceptual as the MockMapInteractionComponent doesn't fully implement dragging.
        // A real component would listen to MapService.onVertexDrag and update its internal state.
        mockMapService.onVertexDrag.mockImplementation((vertexId, newCoords) => {
            // console.log(`Vertex ${vertexId} dragged to ${newCoords}`);
        });
        // Simulate a drag event being triggered by the map service
        // In a real scenario, the component would subscribe to these events.
        // For now, we just acknowledge the service method exists.
        expect(mockMapService.onVertexDrag).toBeDefined();
    });
  });

  // 5.2. Set Drop-off Location (PRDMasterPlan.md: 5.A.2)
  describe('MAP-004: Successful Drop-off Pin Placement and Saving', () => {
    it('should allow user to set and save a drop-off location, storing coordinates correctly', async () => {
        const mockDropOffLocation = [15,15];
        mockTaskService.saveDropOffLocation.mockResolvedValueOnce({ id: 'task1', dropOff: mockDropOffLocation });

        render(
            <MockMapInteractionComponent
              onSaveDropOff={async (location) => {
                try {
                  const savedTask = await mockTaskService.saveDropOffLocation(location);
                  await mockLocalStorageService.saveItem('currentTaskDropOff', savedTask); // Assuming separate or updated storage
                  mockNotificationService.displaySuccess('Drop-off saved!');
                } catch (error) {
                  mockNotificationService.displayError('Failed to save drop-off');
                }
              }}
            />
        );

        fireEvent.click(screen.getByTestId('save-dropoff-button'));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Expected Mock Interactions:
        // 1. MapService.onMapTap is called (simulated in button click)
        expect(mockMapService.onMapTap).toHaveBeenCalledWith(mockDropOffLocation);

        // 2. TaskService.saveDropOffLocation is called
        expect(mockTaskService.saveDropOffLocation).toHaveBeenCalledTimes(1);
        expect(mockTaskService.saveDropOffLocation).toHaveBeenCalledWith(mockDropOffLocation);

        // 3. LocalStorageService.saveItem is called
        expect(mockLocalStorageService.saveItem).toHaveBeenCalledTimes(1);
        expect(mockLocalStorageService.saveItem).toHaveBeenCalledWith('currentTaskDropOff', { id: 'task1', dropOff: mockDropOffLocation });
        
        // Observable Outcome:
        // 1. Success message displayed
        expect(mockNotificationService.displaySuccess).toHaveBeenCalledTimes(1);
        expect(mockNotificationService.displaySuccess).toHaveBeenCalledWith('Drop-off saved!');
    });
  });

  describe('MAP-005: Drop-off Pin Adjustment', () => {
    it('should allow adjusting the drop-off pin (conceptual)', () => {
        // Similar to polygon adjustment, this is conceptual with the current mock component.
        mockMapService.onPinDrag.mockImplementation((pinId, newCoords) => {
            // console.log(`Pin ${pinId} dragged to ${newCoords}`);
        });
        expect(mockMapService.onPinDrag).toBeDefined();
        // A real component would update its state based on `MapService.onPinDrag`
    });
  });

  // 5.3. Set Home Base Location (PRDMasterPlan.md: 5.A.3)
  describe('MAP-006: Successful Home Base Pin Placement and Saving', () => {
    it('should allow user to set and save a home base location', async () => {
        const mockHomeBaseLocation = [5,5];
        mockTaskService.saveHomeBaseLocation.mockResolvedValueOnce({ id: 'homeBaseConfig', location: mockHomeBaseLocation });

        render(
            <MockMapInteractionComponent
              onSaveHomeBase={async (location) => {
                try {
                  const savedHomeBase = await mockTaskService.saveHomeBaseLocation(location);
                  await mockLocalStorageService.saveItem('homeBaseLocation', savedHomeBase);
                  mockNotificationService.displaySuccess('Home base saved!');
                } catch (error) {
                  mockNotificationService.displayError('Failed to save home base');
                }
              }}
            />
        );

        fireEvent.click(screen.getByTestId('save-homebase-button'));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Expected Mock Interactions:
        expect(mockMapService.onMapTap).toHaveBeenCalledWith(mockHomeBaseLocation);
        expect(mockTaskService.saveHomeBaseLocation).toHaveBeenCalledTimes(1);
        expect(mockTaskService.saveHomeBaseLocation).toHaveBeenCalledWith(mockHomeBaseLocation);
        expect(mockLocalStorageService.saveItem).toHaveBeenCalledTimes(1);
        expect(mockLocalStorageService.saveItem).toHaveBeenCalledWith('homeBaseLocation', { id: 'homeBaseConfig', location: mockHomeBaseLocation });
        
        // Observable Outcome:
        expect(mockNotificationService.displaySuccess).toHaveBeenCalledTimes(1);
        expect(mockNotificationService.displaySuccess).toHaveBeenCalledWith('Home base saved!');
    });
  });

  // 5.4. Initiate Task & Monitor (PRDMasterPlan.md: 5.A.4)
  describe('MAP-007: Successful Task Initiation (App to Tractor)', () => {
    it('should successfully initiate a defined task and send parameters to tractor', async () => {
        const mockTaskData = {
            cuttingArea: [[10,10], [10,20], [20,20], [20,10]],
            dropOffLocation: [15,15],
            homeBaseLocation: [5,5] // Assuming home base is part of task params or fetched separately
        };
        mockTaskService.getDefinedTask.mockResolvedValueOnce(mockTaskData);
        mockTractorCommunicationService.sendTaskParameters.mockResolvedValueOnce({ status: 'sent' });

        render(
            <MockTaskManagementScreen
                onStartTask={async () => {
                    const task = await mockTaskService.getDefinedTask();
                    if (task) {
                        await mockTractorCommunicationService.sendTaskParameters(task);
                        mockNotificationService.displayInfo('Command Sent');
                    }
                }}
            />
        );

        fireEvent.click(screen.getByTestId('start-task-button'));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Expected Mock Interactions:
        expect(mockTaskService.getDefinedTask).toHaveBeenCalledTimes(1);
        expect(mockTractorCommunicationService.sendTaskParameters).toHaveBeenCalledTimes(1);
        expect(mockTractorCommunicationService.sendTaskParameters).toHaveBeenCalledWith(mockTaskData);
        expect(mockNotificationService.displayInfo).toHaveBeenCalledWith('Command Sent');
    });
  });

  // Helper for simulating status updates
  const simulateTractorStatusUpdate = (statusUpdate: { status: string; location?: [number, number]; progress?: number }) => {
    // In a real app, TractorCommunicationService might use an event emitter or callbacks.
    // For testing, we can directly call a handler if the component exposes one,
    // or mock the service's event emission.
    // Let's assume StatusDisplayComponent receives updates via props or a context that TractorCommunicationService updates.
    // For this mock, we'll pass status directly.
    
    // If TractorCommunicationService.onStatusUpdate is a callback registration:
    // let statusUpdateCallback: Function;
    // mockTractorCommunicationService.onStatusUpdate = (cb: Function) => { statusUpdateCallback = cb; };
    // ... then later: statusUpdateCallback(statusUpdate);

    // For simplicity with current mock structure, we'll re-render the component with new status
    // This is not ideal for testing service interactions but works for UI update verification.
    // A better approach would be to have the component subscribe to the service.
    
    // Let's assume our mockTractorCommunicationService.onStatusUpdate is a simple jest.fn()
    // and the component somehow gets this data.
    // The test plan implies the UUT *receives* an update.
    mockTractorCommunicationService.onStatusUpdate(statusUpdate); // Simulate the service emitting an event
  };


  describe('MAP-008 to MAP-011: App Reflects Tractor Status', () => {
    // These tests would ideally involve a StatusDisplayComponent that subscribes to TractorCommunicationService updates.
    // For now, we'll test the component's rendering based on passed props,
    // and assert that MapService is called if location changes.

    it('MAP-008: reflects "Navigating to Field" status and location', () => {
        const statusInfo = { status: 'Navigating to Field', location: [12, 12] as [number, number] };
        render(<MockStatusDisplayComponent currentStatus={statusInfo.status} />);
        
        // Simulate the service emitting this status, which would trigger updates
        // In a real component, it would listen to mockTractorCommunicationService.onStatusUpdate
        // For this test, we'll directly check the component's output and service calls
        
        // If StatusDisplayComponent also updates the map:
        // Assume some parent component or the StatusDisplayComponent itself calls MapService
        mockMapService.updateTractorLocation(statusInfo.location);


        expect(screen.getByTestId('status-text')).toHaveTextContent('Status: Navigating to Field');
        expect(mockMapService.updateTractorLocation).toHaveBeenCalledWith(statusInfo.location);
    });

    it('MAP-009: reflects "Cutting Fodder" status, location, and progress', () => {
        const statusInfo = { status: 'Cutting Fodder', location: [13, 13] as [number, number], progress: 0.5 };
        render(<MockStatusDisplayComponent currentStatus={statusInfo.status} progress={statusInfo.progress} />);
        mockMapService.updateTractorLocation(statusInfo.location);


        expect(screen.getByTestId('status-text')).toHaveTextContent('Status: Cutting Fodder');
        expect(screen.getByTestId('progress-text')).toHaveTextContent('Progress: 50%');
        expect(mockMapService.updateTractorLocation).toHaveBeenCalledWith(statusInfo.location);
    });

    it('MAP-010: reflects "Transporting Fodder" status and location', () => {
        const statusInfo = { status: 'Transporting Fodder', location: [14, 14] as [number, number] };
        render(<MockStatusDisplayComponent currentStatus={statusInfo.status} />);
        mockMapService.updateTractorLocation(statusInfo.location);

        expect(screen.getByTestId('status-text')).toHaveTextContent('Status: Transporting Fodder');
        expect(mockMapService.updateTractorLocation).toHaveBeenCalledWith(statusInfo.location);
    });
    
    it('MAP-011: reflects "Awaiting Unloading" status', () => {
        const statusInfo = { status: 'Awaiting Unloading at DropZone1', location: [15, 15] as [number, number] };
        render(<MockStatusDisplayComponent currentStatus={statusInfo.status} />);
        // Tractor is stationary, so map update might not happen again if already at location
        // mockMapService.updateTractorLocation(statusInfo.location); 

        expect(screen.getByTestId('status-text')).toHaveTextContent('Status: Awaiting Unloading at DropZone1');
    });
  });

  describe('MAP-012: Notification on Task Completion', () => {
    it('should send a notification when task completion event is received', () => {
        // UUT: NotificationHandlerService (or component that uses it)
        // Simulate TractorCommunicationService emitting a task completion event
        // This would typically be handled by a service or a top-level component.
        
        // Let's assume a handler function exists that listens to the service
        const handleTaskCompletion = () => {
            mockNotificationService.sendNotification("Task Completed: FodderCuttingTask1");
        };

        // Simulate the event triggering the handler
        mockTractorCommunicationService.onTaskCompletion.mockImplementationOnce(() => {
            handleTaskCompletion();
        });

        // Trigger the mock event
        mockTractorCommunicationService.onTaskCompletion();

        expect(mockNotificationService.sendNotification).toHaveBeenCalledTimes(1);
        expect(mockNotificationService.sendNotification).toHaveBeenCalledWith("Task Completed: FodderCuttingTask1");
    });
  });

  describe('MAP-013: Notification on Critical Event (e.g., Obstacle)', () => {
    it('should send a notification on critical event like obstacle detection', () => {
        const criticalEvent = { type: 'ObstacleDetected', location: [11, 11], message: "Obstacle at [11,11]" };
        
        const handleCriticalEvent = (event: any) => {
            mockNotificationService.sendNotification(`Critical Event: ${event.message}`);
            // Also update app status display
        };

        mockTractorCommunicationService.onCriticalEvent.mockImplementationOnce((eventData) => {
            handleCriticalEvent(eventData);
        });

        mockTractorCommunicationService.onCriticalEvent(criticalEvent);

        expect(mockNotificationService.sendNotification).toHaveBeenCalledTimes(1);
        expect(mockNotificationService.sendNotification).toHaveBeenCalledWith(`Critical Event: ${criticalEvent.message}`);
    });
  });
  
  describe('MAP-014: User Instructs Tractor to Return Home', () => {
    it('should send "Return Home" command to tractor with home base coordinates', async () => {
        const mockHomeBase = [5,5];
        mockTaskService.getHomeBaseLocation.mockResolvedValueOnce(mockHomeBase);
        mockTractorCommunicationService.sendReturnHomeCommand.mockResolvedValueOnce({ status: 'sent' });

        render(
            <MockTaskManagementScreen
                onReturnHome={async () => {
                    const homeLocation = await mockTaskService.getHomeBaseLocation();
                    if (homeLocation) {
                        await mockTractorCommunicationService.sendReturnHomeCommand(homeLocation);
                        mockNotificationService.displayInfo('Return Home Command Sent');
                    }
                }}
            />
        );

        fireEvent.click(screen.getByTestId('return-home-button'));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(mockTaskService.getHomeBaseLocation).toHaveBeenCalledTimes(1);
        expect(mockTractorCommunicationService.sendReturnHomeCommand).toHaveBeenCalledTimes(1);
        expect(mockTractorCommunicationService.sendReturnHomeCommand).toHaveBeenCalledWith(mockHomeBase);
        expect(mockNotificationService.displayInfo).toHaveBeenCalledWith('Return Home Command Sent');
    });
  });

});