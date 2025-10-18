const prisma = require("../prisma");

async function createMessage(req, res) {
  try {
    console.log("Body recibido:", req.body);
    console.log("File recibido:", req.file);

    const { chatId, senderId, message, isImage } = req.body;
    const file = req.file;
    const isImageBool = isImage === "true";

    // Validaciones básicas
    if (!chatId || isNaN(Number(chatId))) {
      return res.status(400).json({ error: "chatId inválido" });
    }
    if (!senderId || isNaN(Number(senderId))) {
      return res.status(400).json({ error: "senderId inválido" });
    }

    // Construir datos del mensaje
    const messageData = {
      chatId: Number(chatId),
      senderId: Number(senderId),
      type: isImageBool ? "IMAGE" : "TEXT",
      text: message || undefined,
    };

    // Si hay archivo, agregar relación con imagen
    if (file) {
      messageData.image = {
        create: {
          name: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          url: `/uploads/${file.filename}`,
        },
      };
    }

    // Crear mensaje en la base de datos
    const newMessage = await prisma.message.create({
      data: messageData,
      include: { image: true },
    });

    console.log("newMessage:", newMessage);

    // Traer el chat actualizado con usuarios y mensajes
    const chat = await prisma.chat.findUnique({
      where: { id: Number(chatId) },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            image: true,
          },
        },
      },
    });

    return res.status(200).json({ chat });
  } catch (err) {
    console.error("Error en createMessage:", err);
    return res.status(500).json({ error: "Error al crear el mensaje" });
  }
}

module.exports = {
  createMessage,
};
