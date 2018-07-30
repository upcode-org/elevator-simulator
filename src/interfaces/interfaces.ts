export interface AssignElevatorResponse {
    elevatorId: number;
}

export interface IElevatorAlligator {
    assignElevatorToRequest(requestedFloor: number, requestedDirection: string): AssignElevatorResponse
}
