import { API_URL } from "../config";


export async function login(username, password) {
  if (!username || !password) {
    return { success: false, error: "Ingresar username y password" }
  }

  try {
    const res = await fetch(`${API_URL}/login`, {
      method : "POST", 
      headers : { "Content-Type": "application/json" },
      body : JSON.stringify({ username, password })
    });

    const data = await res.json();
    console.log(data)

    if (res.ok && data.token) {
      
      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  } catch (err) {
    console.log(err);
    return { success: false, error: "Error en conexión con el servidor" }
  }
}

