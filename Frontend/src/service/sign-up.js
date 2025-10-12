import { API_URL } from "../config";

export async function signUp(name, username, password, password2) {
  // Validar que username y password no estén vacios

  if (!name || !username || !password) {
    return "Name, username and password are mandatory";
  }

  // Validar que password y password2 coincidan

  if (password !== password2) {
    return "Passwords do not match";
  }

  // Hacer fetch para conectar con el backend, pasar datos y esperar respuesta

  try {
    const newUser = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        username,
        password,
      }),
    });
    console.log("New user: ", newUser);
    console.log("Body: ", newUser.body)
    const data = await newUser.json();
    return data;
  } catch (err) {
    return console.log(err);
  }

  // Convertir a json y guardar en variable

  // Devolver variable
}
