import io from 'socket.io-client';

export default function createSocketConnection(url: string) {
  return io(url);
}
