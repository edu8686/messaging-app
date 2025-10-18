import { useState, useEffect, useContext } from "react";
import { searchUsers } from "../../service/search.js";
import { createChat, findChat } from "../../service/chat.js";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext.jsx";

export default function Searchbar({ borderless = false }) {
  const navigate = useNavigate();
  const { loginUser, selectChat, getChats } = useContext(AppContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    searchUsers(query)
      .then((filtered) => {
        setResults(filtered.results);
      })
      .catch((err) => console.error(err));
  }, [query]);

  async function handleSelect(user, action) {
    if (action === "See profile") {
      navigate(`/profile/${user.id}`);
      return;
    }

    if (action === "Send message") {
      try {
        // 1️⃣ Buscar chat existente
        let chatExistente = await findChat(loginUser.id, user.id);
        console.log("Chat existente: ", chatExistente);

        // 2️⃣ Si no existe, crear chat
        if (!chatExistente?.chat) {
          chatExistente = await createChat(loginUser.id, user.id);
          console.log("Chat creado");
        }

        // 3️⃣ **Seleccionar el chat correcto y actualizar currentChat**
        const chatId = chatExistente?.chat?.id || chatExistente?.newChat?.id;
        if (chatId) {
          selectChat(chatId); // 🔹 aquí actualizamos currentChat
        } else {
          console.warn("No se pudo seleccionar el chat, chatId indefinido");
        }

        // 4️⃣ Actualizar lista de chats global
        await getChats(loginUser.id);

        // 5️⃣ Limpiar búsqueda y navegar a chats
        setQuery("");
        setResults([]);
        navigate(`/chats`);
      } catch (err) {
        console.error("Error en handleSelect:", err);
      }
    }
  }

  return (
    <div className="relative w-full overflow-visible">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        className={`w-full rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          borderless ? "border-none bg-transparent" : "border bg-gray-50"
        }`}
      />

      {results.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border rounded-lg mt-1 max-h-64 overflow-y-auto shadow-lg">
          {results.map((user) => (
            <li
              key={user.id}
              className="flex items-center gap-3 p-3 hover:bg-blue-50 transition-colors"
            >
              {/* Avatar */}
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                {user.name ? user.name[0].toUpperCase() : "?"}
              </div>

              {/* Datos */}
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">
                  {user.name || user.username}
                </span>
                <span className="text-sm text-gray-500">@{user.username}</span>
              </div>

              {/* Botones de acción */}
              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => handleSelect(user, "See profile")}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors shadow-sm"
                >
                  See profile
                </button>

                <button
                  onClick={() => handleSelect(user, "Send message")}
                  className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold hover:bg-green-600 transition-colors shadow-sm"
                >
                  Send message
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
