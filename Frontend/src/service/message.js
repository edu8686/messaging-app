import { API_URL } from "../config";

export async function sendMessage(chatId, senderId, message, isImage, file) {
  const token = localStorage.getItem("token");

  console.log("➡️ Enviando mensaje:", {
    chatId,
    senderId,
    message,
    isImage,
    file,
  });

  const formData = new FormData();
  formData.append("chatId", chatId);
  formData.append("senderId", String(senderId));
  formData.append("message", message);
  formData.append("isImage", isImage ? "true" : "false");
  formData.append("file", file);

  try {
    const response = await fetch(`${API_URL}/message/new_message`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error enviando mensaje:", err);
    throw err;
  }
}
