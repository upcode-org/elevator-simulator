"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class Elevator extends events_1.EventEmitter {
    constructor(id) {
        super();
        this.id = id;
    }
    addNewStop() {
    }
    changeDirection() {
    }
}
exports.Elevator = Elevator;
//# sourceMappingURL=elevator.js.map