import { Server, Socket } from 'socket.io';

export default (socket: Socket | Server, routingKey: string, payload: any): void => {
  const message = {
    time: new Date(),
    routingKey,
    payload
  };
  socket.emit('message', message);
};