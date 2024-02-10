import React, { useEffect, useState } from 'react';
import WebSocket from 'websocket';

const WebSocketClient = () => {
  const [weight, setWeight] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const wsUrl = 'ws://localhost:3001';

    const ws = new WebSocket.w3cwebsocket(wsUrl);

    ws.onopen = () => {
        const msg = 'Connected to WebSocket server';
        setMessage(msg);
        console.log(msg);
    };

    ws.onmessage = message => {
      const receivedWeight = parseFloat(message.data);
      console.log('Received weight:', receivedWeight);
      setWeight(receivedWeight);
    };

    ws.onclose = () => {
        const msg = 'Disconnected from WebSocket server';
        setMessage(msg);
        console.log(msg);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      {weight !== null ? (
        <p style={{ color: (weight > 1 ) ? 'green' : 'red', fontWeight: 'bold' }}>Weight: {weight.toFixed(2)}</p>
      ) : (
        <p style={{ fontWeight: 'bold' }}>Waiting for weight...</p>
      )}
      <p>{message}</p>
    </div>
  );
};

export default WebSocketClient;
