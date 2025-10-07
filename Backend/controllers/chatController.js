const prisma = require("../prisma");
const { sanitizeUser, sanitizeChat } = require("../utils/sanitize");

async function createChat(req, res) {
  const { userId, receiverId } = req.body;

  try {
    const newChat = await prisma.chat.create({
      data: { user1Id: userId, user2Id: receiverId },
    });
    return res.status(200).json({ newChat });
  } catch (err) {
    return console.log(err);
  }
}

async function createGroupChat(req, res) {
  const { name, description, members } = req.body;
  console.log(members);

  try {
    const newGroupChat = await prisma.chat.create({
      data: {
        name,
        description,
        isGroup: true,
        users: {
          connect: members.map((m) => ({ id: m.id })),
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });

    // 🔒 Sanitizar antes de enviar
    const safeChat = sanitizeChat(newGroupChat);
    return res.status(200).json({ chat: safeChat });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error creating group chat" });
  }
}


async function findChat(req, res) {
  const { userId, receiverId } = req.params;

  try {
    const chat = await prisma.chat.findFirst({
      where: {
        AND: [
          { users: { some: { id: Number(userId) } } },
          { users: { some: { id: Number(receiverId) } } },
        ],
      },
      include: {
        users: true,
        messages: {
          include: { sender: true, image: true },
        },
      },
    });

    const safeChat = sanitizeChat(chat);
    return res.status(200).json({ chat: safeChat });
  } catch (err) {
    console.log(err);
  }
}


async function findGroupChat(req, res) {
  const { userId, chatId } = req.params;
  console.log("userId:", userId, "chatId:", chatId);

  try {
    const chat = await prisma.chat.findFirst({
      where: {
        AND: [
          { id: Number(chatId) }, // Filtra por ID directamente
          {
            users: {
              some: { id: Number(userId) }, // Asegura que el usuario está en ese chat
            },
          },
        ],
      },
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
    return console.log(err);
  }
}

async function findChats(req, res) {
  const { userId } = req.params;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        users: { some: { id: Number(userId) } },
      },
      include: {
        users: true,
        messages: true,
      },
    });

    const safeChats = chats.map(sanitizeChat);
    return res.status(200).json({ chats: safeChats });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}


async function deleteChat(req, res) {
  const { chatId } = req.params;

  try {
    const delChat = await prisma.chat.delete({
      where: {
        id: Number(chatId),
      },
    });
    return res.status(200).json({ message: "Chat deleted", delChat });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  findChat,
  createChat,
  findChats,
  deleteChat,
  findGroupChat,
  createGroupChat,
};
