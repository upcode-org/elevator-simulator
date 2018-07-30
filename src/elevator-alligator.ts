import * as interfaces from './interfaces/interfaces';
import { Elevator } from './models/elevator';
import {minBy} from 'lodash';
import { Channel } from './rabbit/rabbit-setup';

class ElevatorAlligator implements interfaces.IElevatorAlligator {

    numFloors: number;
    numElevators: number;
    state: Map<number, Elevator>;
    ch: Channel;

    constructor(numFloors: number, numElevators: number, ch: Channel) {
        
        this.numFloors = numFloors;
        this.numElevators = numElevators;
        this.state = new Map();
        this.ch = ch;

        for (let i = 1; i <= this.numElevators; i++) {
            const elevator = new Elevator(this.numFloors);
            this.state.set(i, elevator);
        }
    }

    listen(): void {
        this.ch.prefetch(1);
        this.ch.consume('elevator-requests', this.onMessage.bind(this));
    }

    private onMessage(msg) {
     const msgContent = JSON.parse(msg.content.toString());
     this.assignElevatorToRequest(msgContent['requesteFloor'], msgContent['requestedDirection'])   
    }

    private assignElevatorToRequest(requestedFloor: number, requestedDirection: string): interfaces.AssignElevatorResponse { 
        let response;

        const distancesOfIdleElevators = {}; // distances from requested floor

        for( let [elevatorId, elevator] of this.state ) {
            
            if(this.fullfillsPriority1(elevator, requestedFloor)) {
                response = { elevatorId };
                break;
            }

            if(this.fullfillsPriority2(elevator, requestedFloor, requestedDirection)) {
                response = { elevatorId };
                break;
            }

            if(elevator.direction === null) { // elevator is idle when direction is null
                let distanceFromRequestedFloor = Math.abs(elevator.currentFloor - requestedFloor);
                distancesOfIdleElevators[elevatorId] = distanceFromRequestedFloor;
            }
        }

        if(!response && (Object.keys(distancesOfIdleElevators).length) > 0 ) {
            var elevatorId = minBy(Object.keys(distancesOfIdleElevators), d => distancesOfIdleElevators[d] );
            response = { elevatorId: parseInt(elevatorId) }
        }

        if(!response) response = {
            message: 'could not assign elevator' //TO DO: use a queue and reject this msg, then retry until assigned
        }

        return response;
    }

    private fullfillsPriority1(elevator: Elevator, requestedFloor: number): boolean {
        // Elevator is stopped at the requested floor
        return (elevator.currentFloor === requestedFloor && elevator.direction === null); 
    }
    
    private fullfillsPriority2(elevator: Elevator, requestedFloor: number, requestedDirection: string): boolean {
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

export const elevatorAlligator = new ElevatorAlligator(numFloors, numElevators, ch);
console.log(elevatorAlligator.state);