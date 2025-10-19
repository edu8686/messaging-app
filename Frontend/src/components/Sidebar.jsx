import { AppContext } from "../AppContext.jsx";
import { useContext, useState, useEffect } from "react";
import { deleteChat } from "../service/chat.js";
import { useNavigate } from 'react-router-dom'

function SideBar() {
  const { loginUser, chats, selectChat, selectGroupChat, getChats } =
    useContext(AppContext);
  const [selection, setSelection] = useState("all");
  const [chatsSelection, setChatsSelection] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (chats && chats.chats) {
      handleButtonClick(selection); // inicializa según selección actual
    }
  }, [chats]);

  if (!chats || !chats.chats) return null;

  function handleButtonClick(newSelection) {
    setSelection(newSelection);

    const chatsTab = chats.chats;
    console.log(chatsTab)
    console.log(typeof chatsTab)
    if (newSelection === "all") {
      setChatsSelection(chatsTab);
    } else if (newSelection === "group") {
      setChatsSelection(chatsTab.filter((chat) => chat.isGroup));
    } else if (newSelection === "ind") {
      setChatsSelection(chatsTab.filter((chat) => !chat.isGroup));
    } else if(newSelection ==="new") {
      navigate("/new")
    }
  }

  return (
    <div className="w-64 h-full border border-gray-300 rounded-l-xl bg-gray-100 p-4 flex flex-col gap-4 shadow-md">
      
      <div className="flex justify-between">
        <button
          onClick={() => handleButtonClick("all")}
          className={`flex flex-col items-center justify-center w-16 p-2 rounded-lg hover:bg-blue-200 transition-colors ${
            selection === "all" ? "bg-blue-300" : ""
          }`}
        >
          <span className="material-symbols-outlined text-2xl">
            all_inclusive
          </span>
          <span className="text-xs mt-1">All</span>
        </button>

        <button
          onClick={() => handleButtonClick("ind")}
          className={`flex flex-col items-center justify-center w-16 p-2 rounded-lg hover:bg-blue-200 transition-colors ${
            selection === "ind" ? "bg-blue-300" : ""
          }`}
        >
          <span className="material-symbols-outlined text-2xl">chat</span>
          <span className="text-xs mt-1">Chat</span>
        </button>

        <button
          onClick={() => handleButtonClick("group")}
          className={`flex flex-col items-center justify-center w-16 p-2 rounded-lg hover:bg-blue-200 transition-colors ${
            selection === "group" ? "bg-blue-300" : ""
          }`}
        >
          <span className="material-symbols-outlined text-2xl">groups</span>
          <span className="text-xs mt-1">Groups</span>
        </button>
        <button
          onClick={() => handleButtonClick("new")}
           className={`flex flex-col items-center justify-center w-16 p-2 rounded-lg hover:bg-blue-200 transition-colors ${
            selection === "new_group" ? "bg-blue-300" : ""
          }`} 
        >
          <span className="material-symbols-outlined text-2xl">group_add</span>
          <span className="text-xs mt-1">Nuevo</span>
        </button>
      </div>

      
      <div className="flex flex-col gap-2">
        {chatsSelection.length > 0 ? (
          chatsSelection.map((chat) =>
            chat.isGroup ? (
              <div key={chat.id} className="relative group">
                <button
                  onClick={() => selectGroupChat(loginUser.id, chat.id)}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">
                    {chat.name[0]}
                  </div>
                  <p className="font-medium">{chat.name}</p>
                </button>

                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    await deleteChat(chat.id);
                    await getChats(loginUser.id);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-red-500 text-white text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                >
                  ✕
                </button>
              </div>
            ) : (
              (() => {
                const otherUser =
                  chat.users[0].id === loginUser.id
                    ? chat.users[1]
                    : chat.users[0];
                return (
                  <div key={chat.id} className="relative group">
                    <button
                      onClick={() => selectChat(loginUser.id, otherUser.id)}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">
                        {otherUser.name[0]}
                      </div>
                      <p className="font-medium">{otherUser.name}</p>
                      { otherUser.isOnline === true ? <div className="text-sm border border-green-400 bg-amber-50 rounded-xl p-0.5">online</div> : (console.log("Not online")) }
                    </button>

                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        await deleteChat(chat.id);
                        await getChats(loginUser.id);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-red-500 text-white text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                    >
                      ✕
                    </button>
                  </div>
                );
              })()
            )
          )
        ) : (
          <p className="text-gray-500 text-center">No hay chats disponibles</p>
        )}
      </div>
    </div>
  );
}

export default SideBar;
