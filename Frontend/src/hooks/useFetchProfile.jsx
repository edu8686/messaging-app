import { useState, useEffect, useContext } from "react";
import { AppContext } from "../AppContext";
import { API_URL } from "../config";

export const useFetchProfile = (profile_id) => {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const { loginUser } = useContext(AppContext);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    setIsPending(true);
    setIsLoggedInUser(false);
    setError(null);

    const response = await fetch(`${API_URL}/profile/${profile_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError(json.error);
    }

    if (response) {
      setIsPending(false);
      setUserProfile(json.profile);

      if (json.profile?.userId === loginUser.id) {
        setIsLoggedInUser(true);
      }
    }
  };

  useEffect(() => {
    fetchProfile(profile_id);
  }, [profile_id]);

  return { isPending, error, userProfile, isLoggedInUser, setUserProfile };
};
