import ioClient from 'socket.io-client';
import config from '@/config';
import socketWildcard from '@/utils/socketWildcard';

export default (): SocketIOClient.Socket => {
  const connectionString = `${config.sockets.director.ip}:${config.sockets.director.port}`;
  const socketDirector = ioClient.connect(connectionString, {
    transports: ['websocket'],
    reconnection: true
  });
  socketDirector.on('connect', () => {
    console.log('ms-socket-node connected to the director: ' + connectionString)
  })

  const wildcardPatch = socketWildcard(ioClient.Manager);
  wildcardPatch(socketDirector);
  return socketDirector;
}
