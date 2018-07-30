"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elevator_alligator_1 = require("../elevator-alligator");
exports.request = (req, res) => {
    const floor = parseInt(req.param('floor'));
    const direction = req.param('direction');
    const assignedElevatorId = elevator_alligator_1.elevatorAlligator.assignElevatorToRequest(floor, direction);
    return res.json({
        assignedElevatorId
    });
};
//# sourceMappingURL=request-up.js.map