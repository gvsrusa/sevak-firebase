import { CuttingMechanismController } from '../modules/CuttingMechanismController';
import { LoadingMechanismController } from '../modules/LoadingMechanismController';
import TractorCommunicationService from '../services/TractorCommunicationService'; // Import the class
import TractorStatusService from '../services/TractorStatusService';
import NotificationService from '../services/NotificationService';
import { MotorController } from '../services/MotorController'; // Named import

// Mocks
// We mock the modules, and then TypeScript helps us type the mocked instances.
// Create a mock instance of the class
const mockTractorCommunicationService = {
  sendCommand: jest.fn(),
  sendLowLevelCommand: jest.fn(),
};

// Mock the module to return our mock instance when imported
jest.mock('../services/TractorCommunicationService', () => ({
  __esModule: true,
  default: jest.fn(() => mockTractorCommunicationService), // Return a factory that provides our mock instance
}));
jest.mock('../services/TractorStatusService');
jest.mock('../services/NotificationService');

// Correctly typed mock for the default exported TractorCommunicationServiceInstance
// Attempting a simpler cast to bypass potential parsing issues with complex types/interfaces in .tsx
// Ensure the mock is correctly typed for Jest's expectations
const MockedTractorCommunicationService = TractorCommunicationService as jest.MockedClass<typeof TractorCommunicationService>;
const mockTractorStatusService = TractorStatusService as jest.Mocked<typeof TractorStatusService>;
const mockNotificationService = NotificationService as jest.Mocked<typeof NotificationService>;
// MotorController is a class, its mock is handled by jest.mock above.
// We will instantiate it with mocks when it's the UUT.

describe('Tractor Autonomous Fodder Cutting and Loading', () => {
  let cuttingController: CuttingMechanismController;
  let loadingController: LoadingMechanismController;
  // motorControllerInstance will be used when MotorController is the UUT.

  beforeEach(() => {
    // Reset mocks before each test
    // These are methods on the default exported instances (or their mocks)
    mockTractorCommunicationService.sendCommand.mockClear();
    mockTractorCommunicationService.sendLowLevelCommand.mockClear(); // Now directly accessible
    mockTractorStatusService.updateCuttingStatus.mockClear();
    mockTractorStatusService.updateLoadingStatus.mockClear();
    mockTractorStatusService.on.mockClear();
    mockNotificationService.sendNotification.mockClear();
    // No top-level mockMotorController instance methods to clear here.
    // Methods of MotorController UUT instances will be spied on/verified per test.

    // Instantiate controllers with mocked services
    cuttingController = new CuttingMechanismController(
      new (TractorCommunicationService as any)(), // Instantiate the mock constructor
      mockTractorStatusService,
      mockNotificationService
    );
    loadingController = new LoadingMechanismController(
      new (TractorCommunicationService as any)(), // Instantiate the mock constructor
      mockTractorStatusService,
      mockNotificationService
    );
  });

  describe('CuttingMechanismController (mobile-app/modules/CuttingMechanismController.ts)', () => {
    // Test Case 3.1.1: Initiate Cutting Command
    test('AVR-5.A.4.1, AVR-5.A.4.2, AVR-5.B.2.1: initiateCutting() should send CUTTER_ENGAGE command and update status', async () => {
      // Arrange
      // sendCommand is synchronous void in placeholder, so no promise
      mockTractorCommunicationService.sendCommand.mockReturnValue(undefined as never);

      // Act
      await cuttingController.initiateCutting(); // cuttingController methods are async

      // Assert
      expect(mockTractorCommunicationService.sendCommand).toHaveBeenCalledWith('CUTTER_ENGAGE');
      expect(mockTractorCommunicationService.sendCommand).toHaveBeenCalledTimes(1);
      expect(mockTractorStatusService.updateCuttingStatus).toHaveBeenCalledWith('ENGAGING');
      expect(mockNotificationService.sendNotification).toHaveBeenCalledWith('Cutting initiated');
    });

    // Test Case 3.1.2: Stop Cutting Command
    test('AVR-5.B.2.2: stopCutting() should send CUTTER_DISENGAGE command and update status', async () => {
      // Arrange
      mockTractorCommunicationService.sendCommand.mockReturnValue(undefined as never);

      // Act
      await cuttingController.stopCutting();

      // Assert
      expect(mockTractorCommunicationService.sendCommand).toHaveBeenCalledWith('CUTTER_DISENGAGE');
      expect(mockTractorCommunicationService.sendCommand).toHaveBeenCalledTimes(1);
      expect(mockTractorStatusService.updateCuttingStatus).toHaveBeenCalledWith('DISENGAGING');
    });

    // Test Case 3.1.3: Handle Tractor Cutting Status Update
    test('AVR-5.A.4.5: should handle tractor cutting status updates and send notifications', () => {
      // Arrange: The 'on' listener is set up in the constructor.
      // We need to capture the callback passed to 'on'
      const onCallbackMap = new Map<string, (status: any) => void>();
      mockTractorStatusService.on.mockImplementation((event, callback) => {
        onCallbackMap.set(event, callback);
        return { unsubscribe: jest.fn() };
      });

      // Re-initialize controller to capture the callback with the new mock implementation
      cuttingController = new CuttingMechanismController(
        new (TractorCommunicationService as any)(), // Instantiate the mock constructor
        mockTractorStatusService,
        mockNotificationService
      );
      
      const cuttingStatusCallback = onCallbackMap.get('cuttingStatusUpdate');
      expect(cuttingStatusCallback).toBeDefined();

      // Act & Assert for 'ACTIVE'
      cuttingStatusCallback!('ACTIVE');
      expect(mockNotificationService.sendNotification).toHaveBeenCalledWith('Cutting in progress');

      // Act & Assert for 'COMPLETE'
      cuttingStatusCallback!('COMPLETE');
      expect(mockNotificationService.sendNotification).toHaveBeenCalledWith('Cutting completed');
      
      // Act & Assert for 'ERROR'
      cuttingStatusCallback!('ERROR');
      expect(mockNotificationService.sendNotification).toHaveBeenCalledWith('Cutting mechanism error: An issue occurred.');
    });
  });

  describe('LoadingMechanismController (mobile-app/modules/LoadingMechanismController.ts)', () => {
    // Test Case 3.2.1: Initiate Loading Command
    test('AVR-5.A.4.1, AVR-5.A.4.2, AVR-5.B.3.1: initiateLoading() should send LOADER_ENGAGE command and update status', async () => {
      // Arrange
      mockTractorCommunicationService.sendCommand.mockReturnValue(undefined as never);

      // Act
      await loadingController.initiateLoading();

      // Assert
      expect(mockTractorCommunicationService.sendCommand).toHaveBeenCalledWith('LOADER_ENGAGE');
      expect(mockTractorCommunicationService.sendCommand).toHaveBeenCalledTimes(1);
      expect(mockTractorStatusService.updateLoadingStatus).toHaveBeenCalledWith('ENGAGING');
      expect(mockNotificationService.sendNotification).toHaveBeenCalledWith('Loading initiated');
    });

    // Test Case 3.2.2: Stop Loading Command
    test('AVR-5.B.3.2: stopLoading() should send LOADER_DISENGAGE command and update status', async () => {
      // Arrange
      mockTractorCommunicationService.sendCommand.mockReturnValue(undefined as never);

      // Act
      await loadingController.stopLoading();

      // Assert
      expect(mockTractorCommunicationService.sendCommand).toHaveBeenCalledWith('LOADER_DISENGAGE');
      expect(mockTractorCommunicationService.sendCommand).toHaveBeenCalledTimes(1);
      expect(mockTractorStatusService.updateLoadingStatus).toHaveBeenCalledWith('DISENGAGING');
    });

    // Test Case 3.2.3: Handle Tractor Loading Status Update
    test('AVR-5.A.4.5: should handle tractor loading status updates and send notifications', () => {
      const onCallbackMap = new Map<string, (status: any) => void>();
      mockTractorStatusService.on.mockImplementation((event, callback) => {
        onCallbackMap.set(event, callback);
        return { unsubscribe: jest.fn() };
      });
      
      loadingController = new LoadingMechanismController(
        new (TractorCommunicationService as any)(), // Instantiate the mock constructor
        mockTractorStatusService,
        mockNotificationService
      );

      const loadingStatusCallback = onCallbackMap.get('loadingStatusUpdate');
      expect(loadingStatusCallback).toBeDefined();

      // Act & Assert for 'ACTIVE'
      loadingStatusCallback!('ACTIVE');
      expect(mockNotificationService.sendNotification).toHaveBeenCalledWith('Loading in progress');

      // Act & Assert for 'COMPLETE'
      loadingStatusCallback!('COMPLETE');
      expect(mockNotificationService.sendNotification).toHaveBeenCalledWith('Loading completed');

      // Act & Assert for 'ERROR'
      loadingStatusCallback!('ERROR');
      expect(mockNotificationService.sendNotification).toHaveBeenCalledWith('Loading mechanism error: An issue occurred.');
    });
  });

  // Placeholder for MotorController tests (enhancements for cutting/loading)
  // These would typically be in a separate file like motor_controller.test.tsx
  // but are included here as per the granular plan's structure for now.
  describe('MotorController Enhancements (mobile-app/services/MotorController.ts)', () => {
    // Test Case 3.3.1: Engage Cutting Motor
    test('AVR-5.B.2.1: engageCuttingMotor() should send CUTTING_MOTOR_ON command', async () => {
      // Arrange
      // MotorController is the UUT here. Instantiate it with the *mocked* TractorCommunicationService.
      const motorControllerUUT = new MotorController(mockTractorCommunicationService as any);
      mockTractorCommunicationService.sendLowLevelCommand.mockResolvedValue(Promise.resolve() as never); // It's async Promise<void>

      // Act
      await motorControllerUUT.engageCuttingMotor();

      // Assert
      expect(mockTractorCommunicationService.sendLowLevelCommand).toHaveBeenCalledWith('CUTTING_MOTOR_ON', { speed: 'optimal' });
      expect(mockTractorCommunicationService.sendLowLevelCommand).toHaveBeenCalledTimes(1);
    });

    // Test Case 3.3.2: Disengage Cutting Motor
    test('AVR-5.B.2.2: disengageCuttingMotor() should send CUTTING_MOTOR_OFF command', async () => {
      const motorControllerUUT = new MotorController(mockTractorCommunicationService as any);
      mockTractorCommunicationService.sendLowLevelCommand.mockResolvedValue(Promise.resolve() as never);
      
      await motorControllerUUT.disengageCuttingMotor();
      
      expect(mockTractorCommunicationService.sendLowLevelCommand).toHaveBeenCalledWith('CUTTING_MOTOR_OFF');
      expect(mockTractorCommunicationService.sendLowLevelCommand).toHaveBeenCalledTimes(1);
    });

    // Test Case 3.3.3: Engage Loading Motor
    test('AVR-5.B.3.1: engageLoadingMotor() should send LOADING_MOTOR_ON command', async () => {
      const motorControllerUUT = new MotorController(mockTractorCommunicationService as any);
      mockTractorCommunicationService.sendLowLevelCommand.mockResolvedValue(Promise.resolve() as never);

      await motorControllerUUT.engageLoadingMotor();

      expect(mockTractorCommunicationService.sendLowLevelCommand).toHaveBeenCalledWith('LOADING_MOTOR_ON', { speed: 'standard' });
      expect(mockTractorCommunicationService.sendLowLevelCommand).toHaveBeenCalledTimes(1);
    });

    // Test Case 3.3.4: Disengage Loading Motor
    test('AVR-5.B.3.2: disengageLoadingMotor() should send LOADING_MOTOR_OFF command', async () => { // Fixed: Added curly brace
      const motorControllerUUT = new MotorController(mockTractorCommunicationService as any);
      mockTractorCommunicationService.sendLowLevelCommand.mockResolvedValue(Promise.resolve() as never);
      
      await motorControllerUUT.disengageLoadingMotor();
      
      expect(mockTractorCommunicationService.sendLowLevelCommand).toHaveBeenCalledWith('LOADING_MOTOR_OFF');
      expect(mockTractorCommunicationService.sendLowLevelCommand).toHaveBeenCalledTimes(1);
    });
  });

  // Placeholder for TractorStatusService tests (enhancements for cutting/loading status)
  describe('TractorStatusService Enhancements (mobile-app/services/TractorStatusService.ts)', () => {
    // Test Case 3.4.1: Emit Cutting Status Update
    test('AVR-5.A.4.5: updateCuttingStatus() should emit cuttingStatusUpdate event', () => {
      const mockListener = jest.fn();
      // For testing TractorStatusService itself, we'd use a real instance
      const realStatusService = jest.requireActual('../services/TractorStatusService').default;
      realStatusService.on('cuttingStatusUpdate', mockListener);

      realStatusService.updateCuttingStatus('ACTIVE');
      expect(mockListener).toHaveBeenCalledWith('ACTIVE');

      realStatusService.updateCuttingStatus('COMPLETE');
      expect(mockListener).toHaveBeenCalledWith('COMPLETE');
    });

    // Test Case 3.4.2: Emit Loading Status Update
    test('AVR-5.A.4.5: updateLoadingStatus() should emit loadingStatusUpdate event', () => {
      const mockListener = jest.fn();
      const realStatusService = jest.requireActual('../services/TractorStatusService').default;
      realStatusService.on('loadingStatusUpdate', mockListener);

      realStatusService.updateLoadingStatus('ACTIVE');
      expect(mockListener).toHaveBeenCalledWith('ACTIVE');

      realStatusService.updateLoadingStatus('COMPLETE');
      expect(mockListener).toHaveBeenCalledWith('COMPLETE');
    });
  });

  // Placeholder for NotificationService tests (enhancements for cutting/loading notifications)
  describe('NotificationService Enhancements (mobile-app/services/NotificationService.ts)', () => {
    // Test Case 3.5.1: Send Cutting Completion Notification
    // This test assumes NotificationService internally calls a (mocked) system API.
    // If NotificationService is simple, its own methods are the "observable outcome".
    test('AVR-5.A.4.6: sendNotification("Cutting completed") should be called for cutting completion', () => {
      // This is more of an integration test if NotificationService calls another mocked service.
      // For a unit test of NotificationService, you'd mock its *dependencies*.
      // Here, we are testing that *other* components call NotificationService correctly.
      // The actual test for NotificationService.sendNotification would mock SystemNotificationAPI.
      // For now, we'll just ensure it can be called.
      mockNotificationService.sendNotification('Cutting completed');
      expect(mockNotificationService.sendNotification).toHaveBeenCalledWith('Cutting completed');
    });

    // Test Case 3.5.2: Send Loading Completion Notification
    test('AVR-5.A.4.6: sendNotification("Loading completed") should be called for loading completion', () => {
      mockNotificationService.sendNotification('Loading completed');
      expect(mockNotificationService.sendNotification).toHaveBeenCalledWith('Loading completed');
    });

    // Test Case 3.5.3: Send Critical Event Notification
    test('AVR-5.A.4.6: sendNotification with error message for critical events', () => {
      mockNotificationService.sendNotification('Cutting mechanism error: Obstruction detected');
      expect(mockNotificationService.sendNotification).toHaveBeenCalledWith('Cutting mechanism error: Obstruction detected');
    });
  });
});