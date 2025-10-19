import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Searchbar from "../components/searching/SearchBar.jsx";
import { findChat } from "../service/chat";
import { AppContext } from "../AppContext.jsx";

export default function Home() {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const { loginUser, setCurrentChat, createChat } = useContext(AppContext);

  async function handleSelectUser(user) {
    try {
      setSelectedUser(user);

      let chat = await findChat(loginUser.id, user.id);
      console.log(chat);

      if (chat?.chat) {
        setCurrentChat(chat);
        navigate(`/chats/${chat.chat.id}`);
      } else {
        chat = await createChat(loginUser.id, user.id);
        setCurrentChat(chat);
        navigate(`/chats/new?receiver=${user.id}`);
      }
    } catch (err) {
      console.error("Error en handleSelectUser:", err);
    }
  }

  function goToChats() {
    navigate("/chats");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-2xl">
       
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
            Bienvenido {loginUser?.name || ""}
          </h1>
          <p className="text-gray-600 text-lg">
            Encuentra usuarios y empieza nuevas conversaciones
          </p>
        </div>

       
        <div className="mb-8">
          <Searchbar onSelectUser={handleSelectUser} />
        </div>

        
        {selectedUser && (
          <div className="mb-8">
            <p className="text-gray-700 mb-2 text-center">Usuario seleccionado:</p>
            <div className="bg-white shadow-lg rounded-xl p-4 flex items-center gap-4 hover:shadow-xl transition-shadow cursor-pointer">
              <img
                src={selectedUser.avatarUrl || "/default-avatar.png"}
                alt={selectedUser.name}
                className="w-16 h-16 rounded-full border-2 border-blue-300"
              />
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">{selectedUser.name}</h3>
                <p className="text-gray-500 text-sm">@{selectedUser.username}</p>
              </div>
            </div>
          </div>
        )}

        
        <div className="flex justify-center">
          <button
            onClick={goToChats}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform"
          >
            Mis chats
          </button>
        </div>
      </div>
    </div>
  );
}
