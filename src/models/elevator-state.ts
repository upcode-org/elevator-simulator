// Initial state of an elevator

export class ElevatorState {
    
    numTrips: number;
    currentFloor: number;
    direction: string;

    constructor(numFloors: number) {
        this.numTrips = getRandomInt(0, 100);
        this.currentFloor = getRandomInt(1, numFloors); 
        this.direction = getRandomDirection(getRandomInt(1,3));
    }
}

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
