const prisma = require("../prisma");
const { sanitizeUser, sanitizeChat } = require("../utils/sanitize");

async function createChat(req, res) {
  const { userId, receiverId } = req.body;

  try {
    // 1️⃣ Buscar si ya existe un chat entre los dos usuarios (no grupo)
    const existingChat = await prisma.chat.findFirst({
      where: {
        isGroup: false,
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

    // Si el chat ya existe, lo devolvemos sin crear uno nuevo
    if (existingChat) {
      const safeChat = sanitizeChat(existingChat);
      return res.status(200).json({ chat: safeChat, existing: true });
    }

    // 2️⃣ Crear un nuevo chat entre los dos usuarios
    const newChat = await prisma.chat.create({
      data: {
        users: {
          connect: [
            { id: Number(userId) },
            { id: Number(receiverId) },
          ],
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });

    // 3️⃣ Sanitizar antes de enviar
    const safeChat = sanitizeChat(newChat);
    return res.status(201).json({ chat: safeChat, created: true });
  } catch (err) {
    console.error("❌ Error creating chat:", err);
    return res.status(500).json({ error: "Error creating chat" });
  }
}

async function createGroupChat(req, res) {
  const { name, description, members, creatorId } = req.body; // agregamos creatorId
  try {
    // Asegurarnos de que el creador esté incluido
    const allMembers = [
      { id: Number(creatorId) },
      ...members.map((m) => ({ id: m.id })),
    ];

    const newGroupChat = await prisma.chat.create({
      data: {
        name,
        description,
        isGroup: true,
        users: {
          connect: allMembers,
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });

    const safeChat = sanitizeChat(newGroupChat);
    return res.status(200).json({ chat: safeChat });
  } catch (err) {
    console.error("❌ Error creating group chat:", err);
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
    console.error("❌ Error finding chat:", err);
    return res.status(500).json({ error: "Error finding chat" });
  }
}

async function findGroupChat(req, res) {
  const { userId, chatId } = req.params;
  console.log("🔍 userId:", userId, "chatId:", chatId);

  try {
    const chat = await prisma.chat.findFirst({
      where: {
        AND: [
          { id: Number(chatId) },
          { users: { some: { id: Number(userId) } } },
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
    console.error("❌ Error finding group chat:", err);
    return res.status(500).json({ error: "Error finding group chat" });
  }
}

async function findChats(req, res) {
  const { userId } = req.params;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        users: { some: { id: Number(userId) } }
      },
      include: {
        users: true,
        messages: true,
      },
    });
    console.log(`Chats encontrados para userId=${userId}:`, chats.map(c => ({ id: c.id, name: c.name, isGroup: c.isGroup, users: c.users.map(u=>u.id) })));
    console.log("ChatsbyPrisma:", chats);


    const safeChats = chats.map(sanitizeChat);
    console.log(safeChats)
    return res.status(200).json({ chats: safeChats });
  } catch (err) {
    console.error("❌ Error finding chats:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteChat(req, res) {
  const { chatId } = req.params;

  try {
    const delChat = await prisma.chat.delete({
      where: { id: Number(chatId) },
    });

    return res.status(200).json({ message: "Chat deleted", delChat });
  } catch (err) {
    console.error("❌ Error deleting chat:", err);
    return res.status(500).json({ error: "Error deleting chat" });
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
