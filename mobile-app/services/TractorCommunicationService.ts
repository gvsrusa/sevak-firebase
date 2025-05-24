export default class TractorCommunicationService {
  public sendCommand(command: string, payload?: any): void {
    // In a real application, this method would use a communication protocol
    // (e.g., WebSockets, Bluetooth API) to send the command to the tractor.
    // For now, we'll log it, as the tests will mock this service.
    console.log(
      `[TractorCommunicationService] Sending command: ${command}`,
      payload !== undefined ? `with payload: ${JSON.stringify(payload)}` : ''
    );
  }

  public async sendLowLevelCommand(command: string, payload?: any): Promise<void> {
    // Similar to sendCommand, but perhaps for more direct hardware interaction
    // For now, logs it. Tests will mock this.
    console.log(
      `[TractorCommunicationService] Sending low-level command: ${command}`,
      payload !== undefined ? `with payload: ${JSON.stringify(payload)}` : ''
    );
    // Simulate async operation
    return Promise.resolve();
  }

  // Example of a more specific command method if needed, though generic sendCommand is used by tests
  // public moveForward(speed: number): void {
  //   this.sendCommand('MOVE_FORWARD', { speed });
  // }
}