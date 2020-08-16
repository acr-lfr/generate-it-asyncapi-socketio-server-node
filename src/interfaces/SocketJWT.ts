import { Socket } from 'socket.io';

export interface SocketJWT extends Socket {
  decoded_token: any
}
