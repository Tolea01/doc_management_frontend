'use client';
import { chatService } from '@services/chat/chat.service';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import socket from '../../lib/socket';
import { format, isToday, isYesterday } from 'date-fns';
import { ro } from 'date-fns/locale';

type Message = {
  id: number;
  user: string;
  text: string;
  createdAt: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const { user } = useAuth();
  const bottomRef = useRef<HTMLDivElement>(null);
    const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const recent = await chatService.getMessages();
        setMessages(recent.data.reverse());
      } catch (err) {
        console.error('Eroare la fetch:', err);
      }
    };

    loadMessages();

    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit('sendMessage', {
      user: `${user?.userName} ${user?.userSurname}`,
      text: input,
    });
    setInput('');
  };

  const getDateLabel = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) return 'Azi';
    if (isYesterday(date)) return 'Ieri';
    return format(date, 'dd MMMM yyyy', { locale: ro });
  };

  let lastDateLabel = '';

  return (
    <div className="flex flex-col h-[90vh] border rounded-lg shadow-md">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((msg) => {
          const isOwnMessage = msg.user === `${user?.userName} ${user?.userSurname}`;
          const currentDateLabel = getDateLabel(msg.createdAt);
          const showDateLabel = currentDateLabel !== lastDateLabel;
          lastDateLabel = currentDateLabel;

          return (
            <div key={msg.id}>
              {showDateLabel && (
                <div className="text-center text-xs text-gray-500 mb-2">
                  {currentDateLabel}
                </div>
              )}
              <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                    isOwnMessage ? 'bg-blue-200 text-right' : 'bg-gray-200 text-left'
                  }`}
                >
                  <div className="font-semibold">{msg.user}</div>
                  <div>{msg.text}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
      <div className="border-t p-3 bg-white flex gap-2 items-center">
        <input
          type="text"
          placeholder="Scrie un mesaj..."
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition duration-150"
        >
          Trimite
        </button>
      </div>
    </div>
  );
}







// 'use client';
// import { chatService } from '@services/chat/chat.service';
// import { useEffect, useRef, useState } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import socket from '../../lib/socket';
// import { format, isToday, isYesterday } from 'date-fns';
// import { ro } from 'date-fns/locale';

// type Message = {
//   id: number;
//   user: string;
//   text: string;
//   createdAt: string;
// };

// export default function Chat() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState('');
//   const [showNewMessageNotification, setShowNewMessageNotification] = useState(false);
//   const { user } = useAuth();
//   const bottomRef = useRef<HTMLDivElement>(null);
//   const chatBoxRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const loadMessages = async () => {
//       try {
//         const recent = await chatService.getMessages();
//         setMessages(recent.data.reverse());
//         scrollToBottom();
//       } catch (err) {
//         console.error('Eroare la fetch:', err);
//       }
//     };

//     loadMessages();

//     socket.on('message', (msg) => {
//       setMessages((prev) => [...prev, msg]);

//       const el = chatBoxRef.current;
//       if (el) {
//         const nearBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 100;
//         if (!nearBottom) {
//           setShowNewMessageNotification(true);
//         } else {
//           scrollToBottom();
//         }
//       }
//     });

//     return () => {
//       socket.off('message');
//     };
//   }, [user]);

//   const sendMessage = () => {
//     if (!input.trim()) return;
//     socket.emit('sendMessage', {
//       user: `${user?.userName} ${user?.userSurname}`,
//       text: input,
//     });
//     setInput('');
//   };

//   const scrollToBottom = () => {
//     const el = chatBoxRef.current;
//     if (el) {
//       el.scrollTop = el.scrollHeight;
//       setShowNewMessageNotification(false);
//     }
//   };

//   const getDateLabel = (dateString: string) => {
//     const date = new Date(dateString);
//     if (isToday(date)) return 'Azi';
//     if (isYesterday(date)) return 'Ieri';
//     return format(date, 'dd MMMM yyyy', { locale: ro });
//   };

//   let lastDateLabel = '';

//   return (
//     <div className="flex flex-col h-[90vh] border rounded-lg shadow-md relative">
//       <div
//         className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50"
//         ref={chatBoxRef}
//         onScroll={() => {
//           const el = chatBoxRef.current;
//           if (el && el.scrollHeight - el.scrollTop <= el.clientHeight + 100) {
//             setShowNewMessageNotification(false);
//           }
//         }}
//       >
//         {messages.map((msg) => {
//           const isOwnMessage = msg.user === `${user?.userName} ${user?.userSurname}`;
//           const currentDateLabel = getDateLabel(msg.createdAt);
//           const showDateLabel = currentDateLabel !== lastDateLabel;
//           lastDateLabel = currentDateLabel;

//           return (
//             <div key={msg.id}>
//               {showDateLabel && (
//                 <div className="text-center text-xs text-gray-500 mb-2">
//                   {currentDateLabel}
//                 </div>
//               )}
//               <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
//                 <div
//                   className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
//                     isOwnMessage ? 'bg-blue-200 text-right' : 'bg-gray-200 text-left'
//                   }`}
//                 >
//                   <div className="font-semibold">{msg.user}</div>
//                   <div>{msg.text}</div>
//                   <div className="text-xs text-gray-500 mt-1">
//                     {new Date(msg.createdAt).toLocaleTimeString()}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={bottomRef} />
//       </div>

//       {showNewMessageNotification && (
//         <div
//           className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer shadow"
//           onClick={scrollToBottom}
//         >
//           Mesaj nou - apasă pentru a vedea
//         </div>
//       )}

//       <div className="border-t p-3 bg-white flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Scrie un mesaj..."
//           className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') sendMessage();
//           }}
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition duration-150"
//         >
//           Trimite
//         </button>
//       </div>
//     </div>
//   );
// }

