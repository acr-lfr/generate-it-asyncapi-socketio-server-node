import { Server, Socket } from 'socket.io';

export default (socket: Socket | Server) => {
  return (routingKey: string, payload: any) => {
    const message = {
      id: uuidv4(),
      time: new Date(),
      routingKey,
      payload
    };
    socket.emit('message', message);
  };
};