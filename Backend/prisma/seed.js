const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {

  await prisma.user.deleteMany({});


  const users = [
    { name: "Francisco", username: "fran96", password: "123456" },
    { name: "Juan", username: "juan66", password: "123456" },
    { name: "Lucía", username: "lucia2021", password: "123456" },
    { name: "María", username: "maria23", password: "123456" },
    { name: "Carlos", username: "carlos99", password: "123456" },
    { name: "Sofía", username: "sofia88", password: "123456" },
    { name: "Mateo", username: "mateo77", password: "123456" },
    { name: "Valentina", username: "valen45", password: "123456" },
    { name: "Diego", username: "diego12", password: "123456" },
    { name: "Camila", username: "camila34", password: "123456" },
  ];

  const profiles = [
    { lastName: "González", about: "Amante del fútbol y la música.", location: "Buenos Aires", latitude: -34.61, longitude: -58.38, hobbies: ["fútbol","música","viajar"], avatarUrl: "" },
    { lastName: "Pérez", about: "Fan de la lectura y la tecnología.", location: "Córdoba", latitude: -31.42, longitude: -64.18, hobbies: ["lectura","tecnología","videojuegos"], avatarUrl: "" },
    { lastName: "Rodríguez", about: "Apasionada por el arte y la fotografía.", location: "Rosario", latitude: -32.95, longitude: -60.65, hobbies: ["arte","fotografía","cine"], avatarUrl: "" },
    { lastName: "López", about: "Amante de los viajes y la gastronomía.", location: "Mendoza", latitude: -32.89, longitude: -68.84, hobbies: ["viajar","cocina","senderismo"], avatarUrl: "" },
    { lastName: "García", about: "Programador y gamer.", location: "La Plata", latitude: -34.92, longitude: -57.95, hobbies: ["programación","gaming","música"], avatarUrl: "" },
    { lastName: "Martínez", about: "Disfruto del cine y la literatura.", location: "Salta", latitude: -24.78, longitude: -65.41, hobbies: ["cine","literatura","viajar"], avatarUrl: "" },
    { lastName: "Fernández", about: "Apasionado por los deportes y la música.", location: "Santa Fe", latitude: -31.63, longitude: -60.70, hobbies: ["deportes","música","ciclismo"], avatarUrl: "" },
    { lastName: "Gómez", about: "Fan de la fotografía y la naturaleza.", location: "Tucumán", latitude: -26.81, longitude: -65.22, hobbies: ["fotografía","naturaleza","senderismo"], avatarUrl: "" },
    { lastName: "Díaz", about: "Programador y lector de ciencia ficción.", location: "Neuquén", latitude: -38.95, longitude: -68.06, hobbies: ["programación","lectura","cine"], avatarUrl: "" },
    { lastName: "Silva", about: "Amante de los videojuegos y el anime.", location: "Paraná", latitude: -31.73, longitude: -60.52, hobbies: ["videojuegos","anime","música"], avatarUrl: "" },
  ];

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const profile = profiles[i];
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        username: user.username,
        password: hashedPassword,
        profile: {
          create: {
            name: user.name,
            lastName: profile.lastName,
            about: profile.about,
            location: profile.location,
            latitude: profile.latitude,
            longitude: profile.longitude,
            hobbies: profile.hobbies,
            avatarUrl: profile.avatarUrl,
          },
        },
      },
    });

    console.log("Usuario creado:", newUser.username);
  }

  console.log("10 usuarios con perfiles creados correctamente!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
