import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../AppContext";
import { useFetchProfile } from "../hooks/useFetchProfile";
import GlobeAnimation from "../components/profile-sections/Location";
import About from "../components/profile-sections/About";
import Hobbies from "../components/profile-sections/Hobbies";
import CreateProfile from "./CreateProfile"; 
import { getProfile } from "../service/profile";
import { API_URL } from "../config";

export default function Profile() {
  const { id } = useParams();
  const { loginUser, token } = useContext(AppContext);
  const { isPending, error, userProfile, isLoggedInUser, setUserProfile } = useFetchProfile(id);

  console.log("Id componenete Profile: ", id)

  const [isEditing, setIsEditing] = useState(false);
  const [newCity, setNewCity] = useState("");

  
  useEffect(() => {
    if (userProfile) setNewCity(userProfile.location || "");
  }, [userProfile]);

  const handleSaveCity = async () => {
    try {
      const res = await fetch(`${API_URL}/profile/${userProfile.id}/location`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ location: newCity }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo actualizar la ciudad");

      setUserProfile((prev) => ({
        ...prev,
        location: data.location,
        latitude: data.latitude,
        longitude: data.longitude,
      }));

      setIsEditing(false);
    } catch (err) {
      console.error("Error al actualizar ciudad:", err);
      alert("Error al actualizar la ciudad");
    }
  };

  if (isPending) return <p className="text-center mt-4">Cargando perfil...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">Error: {error}</p>;


  // Si no hay perfil
  if (!userProfile) {

    if (isLoggedInUser) {
      return <CreateProfile />;
    } else {
      return (
        <div className="text-center mt-6 text-gray-500">
          <p>El usuario aún no completó su perfil.</p>
        </div>
      );
    }
  }

  return (
    <div className="max-w-5xl mx-auto mt-6 bg-white rounded-3xl shadow-md p-6 space-y-6">
      
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        
        <div className="flex-1 flex flex-col items-start gap-4">
          <div className="flex items-center gap-4">
            <img
              src={userProfile.avatarUrl || "/default-avatar.png"}
              alt={`${userProfile.name} ${userProfile.lastName || ""}`}
              className="w-28 h-28 rounded-full border-2 border-black-400 shadow-lg"
            />
            <div>
              <h2 className="text-2xl font-bold">
                {userProfile.name} {userProfile.lastName || ""}
              </h2>
              <p className="text-gray-600">{userProfile.location || "Ubicación desconocida"}</p>

              
              {isLoggedInUser && (
                <div className="mt-2">
                  {isEditing ? (
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        className="border px-2 py-1 rounded"
                      />
                      <button
                        onClick={handleSaveCity}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-3 py-1 border rounded"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-3 py-1 border rounded mt-1"
                    >
                      Editar ciudad
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

       
        <GlobeAnimation
          lat={userProfile.latitude}
          lng={userProfile.longitude}
          cityName={userProfile.location}
        />
      </div>

      
      <About userProfile={userProfile} isEditable={isLoggedInUser} />
      <Hobbies hobbies={userProfile.hobbies} isEditable={isLoggedInUser} />
    </div>
  );
}
