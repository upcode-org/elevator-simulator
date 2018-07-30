"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elevator_1 = require("./models/elevator");
const lodash_1 = require("lodash");
class ElevatorAlligator {
    constructor(numFloors, numElevators, ch) {
        this.numFloors = numFloors;
        this.numElevators = numElevators;
        this.state = new Map();
        this.ch = ch;
        for (let i = 1; i <= this.numElevators; i++) {
            const elevator = new elevator_1.Elevator(this.numFloors);
            this.state.set(i, elevator);
        }
    }
    listen() {
        this.ch.prefetch(1);
        this.ch.consume('elevator-requests', this.onMessage.bind(this));
    }
    onMessage(msg) {
        const msgContent = JSON.parse(msg.content.toString());
        this.assignElevatorToRequest(msgContent['requesteFloor'], msgContent['requestedDirection']);
    }
    assignElevatorToRequest(requestedFloor, requestedDirection) {
        let response;
        const distancesOfIdleElevators = {}; // distances from requested floor
        for (let [elevatorId, elevator] of this.state) {
            if (this.fullfillsPriority1(elevator, requestedFloor)) {
                response = { elevatorId };
                break;
            }
            if (this.fullfillsPriority2(elevator, requestedFloor, requestedDirection)) {
                response = { elevatorId };
                break;
            }
            if (elevator.direction === null) { // elevator is idle when direction is null
                let distanceFromRequestedFloor = Math.abs(elevator.currentFloor - requestedFloor);
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
    fullfillsPriority1(elevator, requestedFloor) {
        // Elevator is stopped at the requested floor
        return (elevator.currentFloor === requestedFloor && elevator.direction === null);
    }
    fullfillsPriority2(elevator, requestedFloor, requestedDirection) {
        // Elevator will pass by requested floor
        // Assuming an elevator needs at least 2 floors to make a complete break
        let directionsMatch = elevator.direction === requestedDirection;
        let willPassByOnWayUp = (requestedFloor - elevator.currentFloor) > 2 && requestedDirection === 'U';
        let willPassByOnWayDown = (elevator.currentFloor - requestedFloor) > 2 && requestedDirection === 'D';
        return ((willPassByOnWayDown || willPassByOnWayUp) && directionsMatch);
    }
}
const numFloors = parseInt(process.argv[2]);
const numElevators = parseInt(process.argv[3]);
exports.elevatorAlligator = new ElevatorAlligator(numFloors, numElevators, ch);
console.log(exports.elevatorAlligator.state);
//# sourceMappingURL=elevator-alligator.js.map