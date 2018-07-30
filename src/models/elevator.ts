export class Elevator {
    
    numTrips: number;
    currentFloor: number;
    direction: string;
    // TO DO: floor queue

    constructor(numFloors: number) {
        this.numTrips = getRandomInt(0, 100);
        this.currentFloor = getRandomInt(1, numFloors); 
        this.direction = getRandomDirection(getRandomInt(1,3));
    }

    // TO DO: Elevator Methods, these change the state of the elevator
    // as it completes trips and picks people up, etc...
}

// Set random state of elevators, simulation is concerned with the assignment for now

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDirection(number: number) {
    switch (number) {
        case 1:
            return 'U';
        case 2:
            return 'D';
        case 3:
            return null;
    }
}
