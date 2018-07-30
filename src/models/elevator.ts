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

    /* TO DO: implement the elevator Methods, these change the state of the elevator
    as it completes trips and picks people up, etc...
    Elevator state does not change in this implementation.
    They are being initialized with random state just to test the assignment logic.
    When assignment logic is tested, proceed to complete this class */
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
