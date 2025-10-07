const prisma = require("../prisma");

async function createMessage(req, res) {
  console.log("Body recibido:", req.body);
  console.log("File recibido:", req.file);

  const { chatId, senderId, message, isImage } = req.body;
  const file = req.file; // multer coloca el archivo aquí
  const isImageBool = req.body.isImage === "true";
  console.log("Ingresó en createMessage");
  console.log("File: ", file);

  // file.path es la ruta en el servidor
  // file.originalname, file.mimetype, file.size, etc.

  // Podés guardar en la base de datos:
  const newMessage = await prisma.message.create({
    data: {
      chatId: Number(chatId),
      senderId: Number(senderId),
      type: isImageBool ? "IMAGE" : "TEXT",
      text: message,
      image: file
        ? {
            create: {
              name: file.filename,
              mimeType: file.mimetype,
              size: file.size,
              url: `/uploads/${file.filename}`,
            },
          }
        : undefined,
    },
    include: {
      image: true,
    },
  });

  console.log("newMessage: ", newMessage);

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
  console.log(chat)

  return res.status(200).json({ chat });
}

module.exports = {
  createMessage,
};
