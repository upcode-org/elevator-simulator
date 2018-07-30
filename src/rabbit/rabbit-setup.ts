// TO DO

export interface Channel {
    sendToQueue(queueName, buffer, config?): void
    prefetch(number: number): void
    consume(string: string, handler: Function): void
}

export const ch: Channel = {
    sendToQueue: () => 'not implemented',
    prefetch: () => 'not implemented',
    consume: () => 'not implemented'
}

