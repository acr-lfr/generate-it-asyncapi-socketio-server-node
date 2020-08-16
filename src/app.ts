import ioserver from 'socket.io';
import * as socketioJwt from 'socketio-jwt';
import config from '@/config';
import eventController from '@/generated/eventController';
import { SocketJWT } from '@/interfaces/SocketJWT';
import socketDirector from '@/utils/socketDirector';

export default async (): Promise<ioserver.Server> => {
  // Establish the socket to the director
  const directorSocket = socketDirector();

  // Create the SocketIO server (ie what this node is)
  const io = ioserver();

  // On connection, wait for the JWT check before continuing
  io.sockets.on('connection', socketioJwt.authorize({
    secret: config.jwtSecret,
    timeout: 15000 // 15 seconds to send the authentication message else fail
  }));

  // This socket is authenticated, we are good to handle more events from it.
  io.sockets.on('authenticated', (clientSocket: SocketJWT) => {
    console.log(`Client authenticated and connected: ${clientSocket.id}`);

    // respond to the wildcard trigger from the director
    directorSocket.on('*', (directorSocketValue: any) => {
      eventController(directorSocketValue.data, clientSocket);
    });
  });
  return io;
}
