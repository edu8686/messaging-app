import { createContext, useState, useEffect } from "react";
import {
  createChat as createChatService,
  findChat as findChatService,
  findGroupChat as findGroupChatService,
  findChats,
} from "./service/chat";
import { login as loginService } from "./service/login";

const AppContext = createContext();

export function AppProvider({ children }) {
  
  const [loginUser, setLoginUser] = useState(() => {
    const savedUser = localStorage.getItem("loginUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState(null);
  const [groupUsers, setGroupUsers] = useState([]);


  useEffect(() => {
    if (loginUser) {
      localStorage.setItem("loginUser", JSON.stringify(loginUser));
    } else {
      localStorage.removeItem("loginUser");
    }
  }, [loginUser]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);


  useEffect(() => {
    if (loginUser?.id) {
      getChats(loginUser.id);
    }
  }, [loginUser]);

  async function createChat(user1Id, user2Id) {
    const chat = await createChatService(user1Id, user2Id);
    setCurrentChat(chat);
    return chat;
  }

  function addUserToGroup(user) {
    setGroupUsers([...groupUsers, user]);
  }

  async function selectChat(user1Id, user2Id) {
    const chat = await findChatService(user1Id, user2Id);
    setCurrentChat(chat || { chat: { id: null, messages: [] } });
    return chat;
  }

  async function selectGroupChat(userId, chatId) {
    const chat = await findGroupChatService(userId, chatId);
    setCurrentChat(chat || { chat: { id: null, messages: [] } });
    return chat;
  }

  async function getChats(userId) {
    const chatsData = await findChats(userId);
    setChats(chatsData);
  }

  function logout() {
    setLoginUser(null);
    setCurrentChat(null);
    setToken(null);
    localStorage.removeItem("loginUser");
    localStorage.removeItem("token");
  }

  function obtainHour(mensaje) {
    return mensaje.createdAt.slice(11, 16);
  }

  function obtainDate(mensaje) {
    return mensaje.createdAt.slice(0, 10);
  }

  return (
    <AppContext.Provider
      value={{
        loginUser,
        loginService,
        token,
        setToken,
        setLoginUser,
        currentChat,
        setCurrentChat,
        chats,
        getChats,
        createChat,
        selectChat,
        selectGroupChat,
        logout,
        groupUsers,
        setGroupUsers,
        addUserToGroup,
        obtainDate,
        obtainHour,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext };
