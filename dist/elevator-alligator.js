"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elevator_state_1 = require("./models/elevator-state");
const lodash_1 = require("lodash");
class ElevatorAlligator {
    //elevators: Array<Elevator>;
    constructor(numFloors, numElevators) {
        this.numFloors = numFloors;
        this.numElevators = numElevators;
        this.state = new Map();
        for (let i = 1; i <= this.numElevators; i++) {
            const elevatorState = new elevator_state_1.ElevatorState(this.numFloors);
            this.state.set(i, elevatorState);
        }
    }
    assignElevatorToRequest(requestedFloor, requestedDirection) {
        let response;
        const distancesOfIdleElevators = {}; // distances from requested floor
        for (let [elevatorId, elevatorState] of this.state) {
            if (this.fullfillsPriority1(elevatorState, requestedFloor)) {
                response = { elevatorId };
                break;
            }
            if (this.fullfillsPriority2(elevatorState, requestedFloor, requestedDirection)) {
                response = { elevatorId };
                break;
            }
            if (elevatorState.direction === null) { // elevator is idle
                let distanceFromRequestedFloor = Math.abs(elevatorState.currentFloor - requestedFloor);
                distancesOfIdleElevators[elevatorId] = distanceFromRequestedFloor;
            }
        }
        if (!response && (Object.keys(distancesOfIdleElevators).length) > 0) {
            var elevatorId = lodash_1.minBy(Object.keys(distancesOfIdleElevators), d => distancesOfIdleElevators[d]);
            response = { elevatorId: parseInt(elevatorId) };
        }
        if (!response)
            response = {
                message: 'could not assign elevator' //TO DO: use a queue and reject this msg, then retry until assigned
            };
        return response;
    }
    fullfillsPriority1(elevatorState, requestedFloor) {
        // Elevator is stopped at the requested floor
        return (elevatorState.currentFloor === requestedFloor && elevatorState.direction === null);
    }
    fullfillsPriority2(elevatorState, requestedFloor, requestedDirection) {
        // Elevator will pass by requested floor
        // Assuming an elevator needs at least 2 floors to make a complete break
        let directionsMatch = elevatorState.direction === requestedDirection;
        let willPassByOnWayUp = (requestedFloor - elevatorState.currentFloor) > 2 && requestedDirection === 'U';
        let willPassByOnWayDown = (elevatorState.currentFloor - requestedFloor) > 2 && requestedDirection === 'D';
        return ((willPassByOnWayDown || willPassByOnWayUp) && directionsMatch);
    }
}
const numFloors = parseInt(process.argv[2]);
const numElevators = parseInt(process.argv[3]);
exports.elevatorAlligator = new ElevatorAlligator(numFloors, numElevators);
console.log(exports.elevatorAlligator.state);
//# sourceMappingURL=elevator-alligator.js.map