"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elevator_alligator_1 = require("../elevator-alligator");
const rabbit_setup_1 = require("../rabbit/rabbit-setup");
exports.request = (req, res) => {
    const floor = parseInt(req.param('floor'));
    const direction = req.param('direction');
    const response = elevator_alligator_1.elevatorAlligator.assignElevatorToRequest(floor, direction);
    return res.json(response);
};
exports.requestWithQueue = (req, res) => {
    const floor = parseInt(req.param('floor'));
    const direction = req.param('direction');
    const msg = { floor, direction };
    const msgBuffer = new Buffer(JSON.stringify(msg));
    try {
        rabbit_setup_1.ch.sendToQueue('elevator-requests', msgBuffer);
    }
    catch (err) {
        res.status(500).json('Could not request elevator at this time');
    }
    return res.status(200).json('OK');
};
//# sourceMappingURL=request.js.map