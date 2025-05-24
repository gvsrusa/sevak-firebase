import React, { useEffect, useState } from 'react';
import TractorCommunicationService from '../services/TractorCommunicationService';
import TractorStatusService, { TractorStatus, TractorLocation } from '../services/TractorStatusService';

// Constants from the test plan
const MANUAL_MODE_SPEED = 3; // Example speed in km/h
const TURN_ANGLE_VALUE = 15; // Example angle in degrees
// const MANUAL_MODE_SPEED_LIMIT = 3; // This will be enforced by using MANUAL_MODE_SPEED

const ManualControlScreen: React.FC = () => {
  const [tractorStatus, setTractorStatus] = useState<TractorStatus['status']>('Idle');
  const [tractorLocation, setTractorLocation] = useState<TractorLocation>({ lat: 0, lon: 0 });
  const [batteryLevel, setBatteryLevel] = useState<number>(100);
  const [cutterStatus, setCutterStatus] = useState<TractorStatus['cutterStatus']>('DISENGAGED');
  const [loaderStatus, setLoaderStatus] = useState<TractorStatus['loaderStatus']>('DISENGAGED');

  useEffect(() => {
    const initialStatus = TractorStatusService.getInitialStatus();
    if (initialStatus) {
      setTractorStatus(initialStatus.status);
      setTractorLocation(initialStatus.currentLocation);
      setBatteryLevel(initialStatus.batteryLevel);
      setCutterStatus(initialStatus.cutterStatus);
      setLoaderStatus(initialStatus.loaderStatus);
    }

    const subscription = TractorStatusService.onStatusUpdate((newStatus: Partial<TractorStatus>) => {
      if (newStatus.status !== undefined) setTractorStatus(newStatus.status);
      if (newStatus.currentLocation !== undefined) setTractorLocation(newStatus.currentLocation);
      if (newStatus.batteryLevel !== undefined) setBatteryLevel(newStatus.batteryLevel);
      if (newStatus.cutterStatus !== undefined) setCutterStatus(newStatus.cutterStatus);
      if (newStatus.loaderStatus !== undefined) setLoaderStatus(newStatus.loaderStatus);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleEngageCutter = () => {
    TractorCommunicationService.sendCommand('ENGAGE_CUTTER');
    // Optimistically update UI, or wait for status update
    // setCutterStatus('ENGAGED'); 
  };

  const handleDisengageCutter = () => {
    TractorCommunicationService.sendCommand('DISENGAGE_CUTTER');
    // setCutterStatus('DISENGAGED');
  };

  const handleEngageLoader = () => {
    TractorCommunicationService.sendCommand('ENGAGE_LOADER');
    // setLoaderStatus('ENGAGED');
  };

  const handleDisengageLoader = () => {
    TractorCommunicationService.sendCommand('DISENGAGE_LOADER');
    // setLoaderStatus('DISENGAGED');
  };


  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Manual Control Mode</h2>
      
      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h4>Status</h4>
        <div data-testid="tractor-status-display">Status: {tractorStatus}</div>
        <div data-testid="tractor-location-display">Location: {tractorLocation.lat.toFixed(2)},{tractorLocation.lon.toFixed(2)}</div>
        <div data-testid="tractor-battery-display">Battery: {batteryLevel}%</div>
        <div data-testid="cutter-status-display">Cutter: {cutterStatus}</div>
        <div data-testid="loader-status-display">Loader: {loaderStatus}</div>
      </div>

      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h4>Movement Controls (Virtual Joystick)</h4>
        <button 
          data-testid="joystick-forward" 
          onClick={() => TractorCommunicationService.sendCommand('MOVE_FORWARD', { speed: MANUAL_MODE_SPEED })}
          style={{ margin: '5px', padding: '10px' }}
        >
          Forward
        </button>
        <button 
          data-testid="joystick-backward" 
          onClick={() => TractorCommunicationService.sendCommand('MOVE_BACKWARD', { speed: MANUAL_MODE_SPEED })}
          style={{ margin: '5px', padding: '10px' }}
        >
          Backward
        </button>
        <button 
          data-testid="joystick-left" 
          onClick={() => TractorCommunicationService.sendCommand('TURN_LEFT', { angle: TURN_ANGLE_VALUE })}
          style={{ margin: '5px', padding: '10px' }}
        >
          Left
        </button>
        <button 
          data-testid="joystick-right" 
          onClick={() => TractorCommunicationService.sendCommand('TURN_RIGHT', { angle: TURN_ANGLE_VALUE })}
          style={{ margin: '5px', padding: '10px' }}
        >
          Right
        </button>
      </div>

      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h4>Cutter Controls</h4>
        <button 
          data-testid="engage-cutter-button" 
          onClick={handleEngageCutter}
          disabled={cutterStatus === 'ENGAGED'}
          style={{ margin: '5px', padding: '10px' }}
        >
          Engage Cutter
        </button>
        <button 
          data-testid="disengage-cutter-button" 
          onClick={handleDisengageCutter}
          disabled={cutterStatus === 'DISENGAGED'}
          style={{ margin: '5px', padding: '10px' }}
        >
          Disengage Cutter
        </button>
      </div>

      <div style={{ border: '1px solid #ccc', padding: '10px' }}>
        <h4>Loader Controls</h4>
        <button 
          data-testid="engage-loader-button" 
          onClick={handleEngageLoader}
          disabled={loaderStatus === 'ENGAGED'}
          style={{ margin: '5px', padding: '10px' }}
        >
          Engage Loader
        </button>
        <button 
          data-testid="disengage-loader-button" 
          onClick={handleDisengageLoader}
          disabled={loaderStatus === 'DISENGAGED'}
          style={{ margin: '5px', padding: '10px' }}
        >
          Disengage Loader
        </button>
      </div>
    </div>
  );
};

export default ManualControlScreen;