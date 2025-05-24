class TractorCommunicationService {
  public sendCommand(command: string, payload?: any): void {
    // In a real application, this method would use a communication protocol
    // (e.g., WebSockets, Bluetooth API) to send the command to the tractor.
    // For now, we'll log it, as the tests will mock this service.
    console.log(
      `[TractorCommunicationService] Sending command: ${command}`,
      payload !== undefined ? `with payload: ${JSON.stringify(payload)}` : ''
    );
  }

  // Example of a more specific command method if needed, though generic sendCommand is used by tests
  // public moveForward(speed: number): void {
  //   this.sendCommand('MOVE_FORWARD', { speed });
  // }
}

// Ensure this is a default export as per the mock in manual_control.test.tsx
const tractorCommunicationService = new TractorCommunicationService();
export default tractorCommunicationService;