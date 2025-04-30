'use client';
import { useEffect, useState } from 'react';
import socket from '../lib/socket';

export default function Chat() {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', { user: 'User1', text: input });
    setInput('');
  };

  return (
    <div>
      <h2>Chat Global</h2>
      <div style={{ border: '1px solid #ccc', height: 200, overflowY: 'scroll' }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input className='w-full border' value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Trimite</button>
    </div>
  );
}
