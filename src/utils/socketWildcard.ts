interface SocketWildcard extends SocketIOClient.Socket {
  onevent?: (packet: any) => any
}
// taken directly from this middelware: https://github.com/hden/socketio-wildcard/blob/master/index.js
export default function (eventManager: SocketIOClient.ManagerStatic): any {
  const emit = eventManager.prototype.emit;

  function onevent (packet: any): any {
    const args = packet.data || [];
    if (packet.id != null) {
      args.push(this.ack(packet.id));
    }
    emit.call(this, '*', packet);
    emit.apply(this, args);
  }

  return function (socket: SocketWildcard, next?: () => any) {
    if (socket.onevent !== onevent) {
      socket.onevent = onevent;
    }
    return next ? next() : null;
  };
}