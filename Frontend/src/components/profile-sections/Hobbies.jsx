import { useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config";

export default function Hobbies({ hobbies = [], isEditable }) {
  const [newHobby, setNewHobby] = useState("");
  const [localHobbies, setLocalHobbies] = useState(hobbies);
  const { id } = useParams();

  async function saveHobbyDatabase(hobby) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/profile/${id}/hobby`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ hobby }), 
    });

    const data = await response.json(); 
    return data;
  }

async function deleteHobbyDatabase(hobby) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/profile/${id}/hobby`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ hobby }), 
  });

  const data = await response.json();
  return data;
}


  const addHobby = () => {
    if (newHobby) {
      setLocalHobbies([...localHobbies, newHobby]);
      setNewHobby("");
      saveHobbyDatabase(newHobby);
    }
  };

  const removeHobby = (index) => {
    const hobby = localHobbies.filter((_, i) => i === index);
    console.log(hobby)
    deleteHobbyDatabase(hobby)
    setLocalHobbies(localHobbies.filter((_, i) => i !== index));

  };

  function handleInput(e) {
    setNewHobby(e.target.value);
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-semibold mb-3">Hobbies & Interests</h3>
      <div className="flex flex-wrap gap-2 mb-2">
        {localHobbies.map((hobby, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
          >
            <span>{hobby}</span>
            {isEditable && (
              <button
                onClick={() => removeHobby(idx)}
                className="text-gray-500 hover:text-gray-700 font-bold"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
      {isEditable && (
        <div className="flex gap-2 mt-2">
          <input
            value={newHobby}
            onChange={handleInput}
            className="flex-1 p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm"
            placeholder="Agregar un hobby"
          />
          <button
            onClick={addHobby}
            className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
          >
            Agregar
          </button>
        </div>
      )}
    </div>
  );
}
