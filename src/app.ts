import { Server, Socket } from 'socket.io';

import eventController from '@/generated/eventController';
import socketDirector from '@/utils/socketDirector';
import config from '@/config';
import jwt from 'jsonwebtoken';

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

        // optionally add here socket message handlers, typically requests to join new rooms
        //...

        // we are now connected to the client, register the events with the events controller
        console.log(`Client authenticated and connected to username: ${username}`);

        // Lastly wildcard routing handler
        directorSocket.on('*', (directorSocketValue: any) => {
          eventController(directorSocketValue.data, io, username);
        });
      });
    });
  });

  return io;
}
