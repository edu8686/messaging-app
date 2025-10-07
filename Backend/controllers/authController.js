const prisma = require("../prisma");
const { createJWT } = require("../auth/authentication");

async function login(req, res) {
  try {
    const userId = req.user.id; // ID que Passport puso en req.user

    // Traer usuario completo de la base de datos
    const userFull = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        name: true, // <-- ahora incluimos el name
      },
    });

    if (!userFull) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Crear JWT
    const token = createJWT(userFull.id);

    // Devolver respuesta
    res.status(200).json({
      message: "Successful login",
      token,
      user: userFull,
    });
  } catch (err) {
    console.error("Error login:", err);
    res.status(500).json({ error: "Error en el login" });
  }
}

module.exports = {
  login,
};
