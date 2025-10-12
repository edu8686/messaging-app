import { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "../../AppContext.jsx";
import { sendMessage } from "../../service/message.js";
import Searchbar from "../searching/SearchBar.jsx";
import GroupChat from "../chats/GroupChat.jsx";
import IndividualChat from "../chats/IndividualChat.jsx";

export default function ChatWindow() {
  const { loginUser, currentChat } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const chatData = currentChat?.chat || { id: null, messages: [] };
    setMessages(chatData.messages);
  }, [currentChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(isImage, file) {
    if ((!newMessage.trim() || !currentChat?.chat) && isImage === false) return;

    const chat = await sendMessage(
      currentChat.chat.id,
      loginUser.id,
      newMessage,
      isImage,
      file
    );

    setMessages(chat.chat.messages);
    setNewMessage("");
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") handleSend(false, null);
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Barra de búsqueda */}
      <div className="p-2 border rounded-md border-gray-300/40">
        <Searchbar borderless />
      </div>

      {/* Área de mensajes con scroll */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        {currentChat?.chat?.isGroup ? (
          <GroupChat
            chat={currentChat.chat}
            messages={messages}
            messagesEndRef={messagesEndRef}
          />
        ) : (
          <IndividualChat messages={messages} messagesEndRef={messagesEndRef} />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input fijo abajo */}
      <div className="p-2 border rounded-sm border-gray-300 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Escribí un mensaje..."
          className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {/* Icono de imagen */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleSend(true, file);
          }}
        />

        <button
          onClick={() => handleSend(false, null)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
