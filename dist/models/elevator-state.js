"use strict";
// Initial state of an elevator
Object.defineProperty(exports, "__esModule", { value: true });
class Elevator {
    constructor(numFloors) {
        this.numTrips = getRandomInt(0, 100);
        this.currentFloor = getRandomInt(1, numFloors);
        this.direction = getRandomDirection(getRandomInt(1, 3));
    }
}
exports.Elevator = Elevator;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomDirection(number) {
    switch (number) {
        case 1:
            return 'U';
        case 2:
            return 'D';
        case 3:
            return null;
    }
}
//# sourceMappingURL=elevator-state.js.map