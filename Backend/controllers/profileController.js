const prisma = require("../prisma");
const { getLatLngFromCity } = require("../utils/geocoding"); // función para obtener lat/lng

async function createProfile(req, res) {
  try {
    const { name, lastName, about, location, avatarUrl } = req.body;

    let latitude = null;
    let longitude = null;

    if (location) {
      const geoRes = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          location
        )}&key=${process.env.OPENCAGE_KEY}`
      );
      const geoData = await geoRes.json();
      if (geoData.results.length > 0) {
        latitude = geoData.results[0].geometry.lat;
        longitude = geoData.results[0].geometry.lng;
      }
    }

    const newProfile = await prisma.profile.create({
      data: {
        name,
        lastName,
        about,
        location,
        latitude,
        longitude,
        avatarUrl,
        user: {
          connect: { id: req.user.id }, // 👈 aquí conectamos con el usuario autenticado
        },
      },
    });

    res.status(201).json({
      message: "Profile successfully created",
      newProfile,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating profile", error: error.message });
  }
}


async function findProfile(req, res) {
  const { user_id } = req.params; // asumimos que la URL tiene /profile/:user_id

  console.log("Ingresó a findProfile");

  try {
    const profile = await prisma.profile.findFirst({
      where: {
        userId: Number(user_id), // <-- buscar por userId
      },
    });
    console.log(profile);

    res.status(200).json({ message: "Profile found", profile });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
}


async function createHobby(req, res) {
  try {
    const { profile_id } = req.params;
    const { hobby } = req.body; // hobby a agregar

    // Buscar el perfil existente
    const profile = await prisma.profile.findUnique({
      where: { id: Number(profile_id) },
    });

    if (!profile) {
      return res.status(404).json({ error: "Perfil no encontrado" });
    }

    // Agregar el nuevo hobby al array existente (Postgres) o JSON
    const updatedProfile = await prisma.profile.update({
      where: { id: Number(profile_id) },
      data: {
        hobbies: {
          push: hobby, // solo funciona si es Postgres y tipo String[]
        },
      },
    });

    return res.json(updatedProfile); // devolver perfil actualizado
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error agregando hobby" });
  }
}


async function deleteHobby(req, res) {
  try {
    const { profile_id } = req.params;
    const { hobby } = req.body; 

    console.log("Ingresó en deleteHobby")

    const profile = await prisma.profile.findUnique({
      where: { id: Number(profile_id) },
    });

    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    const hobbyToDelete = Array.isArray(hobby) ? hobby[0] : hobby;

    console.log("Hobby antes de ser borrado", hobbyToDelete)

    const updatedHobbies = profile.hobbies.filter((h) => h !== hobbyToDelete);

    console.log("Nueva lista: ", updatedHobbies)

    const updatedProfile = await prisma.profile.update({
      where: { id: Number(profile_id) },
      data: { hobbies: updatedHobbies },
    });

    res.json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error borrando hobby" });
  }
}

async function updateCity(req, res) {
  console.log("updateCity llamado", req.params, req.body);
  const { profile_id } = req.params;
  const { location } = req.body;

  if (!location) {
    return res.status(400).json({ error: "Se requiere la ciudad" });
  }

  try {
    
    // Obtener coordenadas desde la ciudad
    const { latitude, longitude } = await getLatLngFromCity(location);
    console.log("Coordenadas obtenidas:", latitude, longitude);

    const updatedProfile = await prisma.profile.update({
      where: { id: Number(profile_id) },
      data: { location, latitude, longitude },
    });

    console.log("Perfil actualizado:", updatedProfile);
    res.json(updatedProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar la ciudad" });
  }
}


module.exports = {
  findProfile,
  createProfile,
  deleteHobby,
  createHobby,
  updateCity
};
