import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';

import eventController from '@/generated/eventController';
import socketDirector from '@/utils/socketDirector';
import config from '@/config';

export default async (): Promise<Server> => {
  // Establish the socket to the director
  const directorSocket = socketDirector();

  // Create the SocketIO server (this is what the browsers will connect to)
  const io = new Server();

  // Authenticate the connections
  io.sockets.on('connection', (socket: Socket) => {
    socket.on('authenticate', (payload: { token: string }) => {
      jwt.verify(payload.token, config.jwtSecret, (err: any, data: any) => {
        if (err) {
          return socket.disconnect(true);
        }
        const username = data.data.username;
        socket.emit('authenticated');

        // Connect the user to their own room, there will be n devices connected by the same username
        socket.join(username);

        // Optionally respond to the user request to join specific rooms, eg:
        // socket.on('join-room', (payload: SocketJoinRoomPayload) => socketJoinRoom(io, socket, username, payload));

        // we are now connected to the client
        console.log(`Client authenticated and connected to username: ${username}`);
      });
    });
  });

  // Wildcard match here as the eventController is a generated switch statement
  directorSocket.on('*', async (directorSocketValue: any) => eventController(directorSocketValue.data, io));

  // finally.. return the socket server
  return io;
}
