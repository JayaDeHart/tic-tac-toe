import React, { useState, useEffect } from 'react';
import createSocketConnection from '../util/createConnection';
import { Socket as IOSocket } from 'socket.io-client';

interface ContextInterface {
  socket: IOSocket | null;
  games: any[];
}

interface Props {
  children: JSX.Element;
}
export const SocketContext = React.createContext<ContextInterface | null>(null);

function Socket(props: Props) {
  const [socket, setSocket] = useState(null);

  const state = {
    socket,
    games: [],
  };

  return (
    <SocketContext.Provider value={state}>
      {props.children}
    </SocketContext.Provider>
  );
}

export default Socket;
