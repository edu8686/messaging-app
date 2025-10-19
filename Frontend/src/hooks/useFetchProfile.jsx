import { useState, useEffect, useContext } from "react";
import { AppContext } from "../AppContext";
import { API_URL } from "../config";
import { getProfile } from "../service/profile";

export const useFetchProfile = (profile_id) => {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const { loginUser } = useContext(AppContext);

  const fetchProfile = async () => {
    setIsPending(true);
    setIsLoggedInUser(false);
    setError(null);

 try {
  console.log("Ingresó al try de useFetch")
    const data = await getProfile(profile_id);
    console.log("Data: ", data);
    console.log("Profile_id: ", profile_id);
    console.log("Profile_id: ",  typeof profile_id);
    console.log("loginUser: ", loginUser.id)
    console.log("loginUser: ", typeof loginUser.id)

    setUserProfile(data);
    if (Number(profile_id) === loginUser.id) {
      setIsLoggedInUser(true);
    }
  } catch (err) {
    console.error("Error al obtener perfil:", err);
    setError(err.message || "Error al conectar con el servidor");
  } finally {
    setIsPending(false);
  }

  };

  useEffect(() => {
    fetchProfile(profile_id);
  }, [profile_id]);

  return { isPending, error, userProfile, isLoggedInUser, setUserProfile };
};

