import { API_URL } from "../config";

export async function createProfile(profileData) {
  const token = localStorage.getItem("token")
  const res = await fetch(`${API_URL}/profile/new/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al crear perfil");
  return data.profile;
}


export async function getProfile(user_id) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/profile/${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "No se encontró el perfil");
  return data.profile;
}

