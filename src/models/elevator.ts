import { EventEmitter } from "events";

export class Elevator extends EventEmitter {
    
    id: number; 

    constructor(id:number) {
        super();
        this.id = id;
    }

    setNewState() {
        //this.emit('updateState', newState )
    }

}