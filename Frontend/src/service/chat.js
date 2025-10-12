import { API_URL } from "../config";

export async function createChat(userId, receiverId) {
  try {
    const chat = await fetch(`${API_URL}/chats`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userId, receiverId }),
    });
    const data = chat.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function onCreateGroup(groupChat) {

  const token = localStorage.getItem("token")

  try {
    const chat = await fetch(`${API_URL}/chats/new-group`, {
      method: "POST",
      headers: { 
        "content-type": "application/json",
        Authorization : `Bearer ${token}`
       },
      body: JSON.stringify(groupChat),
    });
    const data = chat.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function createGroupChat(participantsId, groupName) {
  try {
    const chat = await fetch(`${API_URL}/chats`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ participantsId, groupName }),
    });
    const data = chat.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}


export async function findChat(userId, receiverId) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_URL}/chats/${userId}/with/${receiverId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      console.warn("No se encontró el chat existente");
      return null;
    }

    const data = await res.json();
    console.log("Data de findChat:", data);
    return data;
  } catch (err) {
    console.error("Error en findChat:", err);
    return null;
  }
}

export async function findGroupChat(userId, chatId) {
  const token = localStorage.getItem("token");

    try {
    const res = await fetch(`${API_URL}/chats/user/${userId}/chat/${chatId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      console.warn("No se encontró el chat existente");
      return null;
    }

    const data = await res.json();
    console.log("Data de findGroupChat:", data);
    return data;
  } catch (err) {
    console.error("Error en findGroupChat:", err);
    return null;
  }
}

export async function findChats(userId) {
  const token = localStorage.getItem("token");

  try {
    const chats = await fetch(`${API_URL}/chats/${userId}/all`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!chats) {
      return "No results";
    }
    const data = chats.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteChat(chatId) {
  const token = localStorage.getItem("token");
  console.log("Funcion delete ejecutada")

  try {
    const chat = await fetch(`${API_URL}/chats/${chatId}`, {
      method : "DELETE", 
      headers : { Authorization : `Bearer ${token}`}
    })
    const data = await chat.json();
    console.log(data)
    return data;
  } catch (err) {
    console.log(err)
  }
}
