import React, { useEffect, useState } from 'react';
import WebSocket from 'websocket';

const WebSocketClient = () => {
  const [weight, setWeight] = useState(null);

  useEffect(() => {
    const wsUrl = 'ws://localhost:3001';

    const ws = new WebSocket.w3cwebsocket(wsUrl);

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = message => {
      const receivedWeight = parseFloat(message.data);
      console.log('Received weight:', receivedWeight);
      setWeight(receivedWeight);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      {weight !== null ? (
        <p>Weight: {weight.toFixed(2)}</p>
      ) : (
        <p>Waiting for weight...</p>
      )}
    </div>
  );
};

export default WebSocketClient;
