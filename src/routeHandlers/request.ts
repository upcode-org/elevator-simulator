import { Request, Response } from 'express-serve-static-core';
import { elevatorAlligator } from '../elevator-alligator';
import { AssignElevatorResponse } from '../interfaces/interfaces';

export const request = (req: Request, res: Response): Response => {
    
    const floor = parseInt(req.param('floor'));
    const direction = req.param('direction');

    const response: AssignElevatorResponse = elevatorAlligator.assignElevatorToRequest(floor, direction);

    return res.json(response);
}