import { Request, Response } from 'express-serve-static-core';
import { elevatorAlligator } from '../elevator-alligator';
import { AssignElevatorResponse } from '../interfaces/interfaces';
import { ch } from '../rabbit/rabbit-setup';

export const request = (req: Request, res: Response): Response => {
    
    const floor = parseInt(req.param('floor'));
    const direction = req.param('direction');

    const response: AssignElevatorResponse = elevatorAlligator.assignElevatorToRequest(floor, direction);

    return res.json(response);
}

export const requestWithQueue = (req: Request, res: Response): Response => {
    
    const floor = parseInt(req.param('floor'));
    const direction = req.param('direction');
    const msg = { floor, direction };
    const msgBuffer = new Buffer(JSON.stringify(msg));

    try {
        ch.sendToQueue('elevator-requests', msgBuffer);
    } catch(err) {
        res.status(500).json('Could not request elevator at this time');
    }

    return res.status(200).json('OK');
}