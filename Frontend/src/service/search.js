import { API_URL } from "../config";

export async function searchUsers(query) {

  const token = localStorage.getItem("token");

    console.log(query)
  try {
    const res = await fetch(`${API_URL}/user/${query}`, {
        method : "GET",
        headers : {
          "content-type" : "application/json",
           Authorization: `Bearer ${token}`
        },
    });
    if (!res) {
      return "No results";
    }
    const data = await res.json();
    return data
  } catch (err) {
    console.log(err);
  }
}
