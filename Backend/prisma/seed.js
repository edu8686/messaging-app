const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Contraseña predeterminada
  const passwordHash = await bcrypt.hash("123456", 10);

  // Crear usuarios con perfiles
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "Eduardo",
        username: "eduardo123",
        password: passwordHash,
        profile: {
          create: {
            name: "Eduardo",
            lastName: "Negri",
            about: "Me gusta programar",
            location: "Buenos Aires, Argentina",
            latitude: -34.6,
            longitude: -58.4,
            hobbies: ["Programar", "Viajar", "Leer"],
            avatarUrl: "https://i.pravatar.cc/150?img=1",
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        name: "Carla",
        username: "carla456",
        password: passwordHash,
        profile: {
          create: {
            name: "Carla",
            lastName: "Gomez",
            about: "Estudiante universitaria",
            location: "Córdoba, Argentina",
            hobbies: ["Estudiar", "Escuchar música", "Correr"],
            avatarUrl: "https://i.pravatar.cc/150?img=2",
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        name: "Martin",
        username: "martin789",
        password: passwordHash,
        profile: {
          create: {
            name: "Martin",
            lastName: "Perez",
            about: "Fanático del fútbol",
            location: "Rosario, Argentina",
            hobbies: ["Fútbol", "Videojuegos", "Leer"],
            avatarUrl: "https://i.pravatar.cc/150?img=3",
          },
        },
      },
    }),
  ]);

  console.log("Usuarios creados:", users.map(u => u.username));

  // Crear un chat grupal con estos usuarios
  const chat = await prisma.chat.create({
    data: {
      name: "Grupo de prueba",
      description: "Chat de prueba entre usuarios ficticios",
      isGroup: true,
      users: {
        connect: users.map(u => ({ id: u.id })),
      },
    },
  });

  console.log("Chat creado:", chat.name);

  // Crear algunos mensajes de prueba
  const messagesData = [
    { senderId: users[0].id, text: "Hola a todos!" },
    { senderId: users[1].id, text: "Hola Eduardo!" },
    { senderId: users[2].id, text: "Buenas, chicos!" },
    { senderId: users[0].id, text: "Cómo están?" },
    { senderId: users[1].id, text: "Todo bien, gracias!" },
  ];

  for (const msg of messagesData) {
    await prisma.message.create({
      data: {
        chatId: chat.id,
        senderId: msg.senderId,
        text: msg.text,
        type: "TEXT",
      },
    });
  }

  console.log("Mensajes de prueba creados.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
