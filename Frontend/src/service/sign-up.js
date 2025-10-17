import { API_URL } from "../config";

export async function signUp(name, username, password, password2) {

  if (!name || !username || !password) {
    return "Name, username and password are mandatory";
  }


  if (password !== password2) {
    return "Passwords do not match";
  }


  try {
    const newUser = await fetch(`${API_URL}/user/signup`, {
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
}
