import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { AppContext } from "../AppContext.jsx";
import GroupSearchBar from "../components/searching/GroupSearchBar.jsx";
import { onCreateGroup } from "../service/chat.js";

export default function FormNewGroup() {
  const { groupUsers, setGroupUsers, loginUser } = useContext(AppContext);
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupName) return;

    try {
      const data = await onCreateGroup(
        {
          name: groupName,
          description: groupDesc,
          members: groupUsers,
        },
        loginUser.id // pasamos el creador
      );

      console.log("Grupo creado:", data.chat);

      // Reset form
      setGroupName("");
      setGroupDesc("");
      setGroupUsers([]);
      navigate("/chats")
    } catch (err) {
      console.error("Error creando grupo:", err);
    }
  };

  const removeUser = (id) => {
    setGroupUsers(groupUsers.filter((user) => user.id !== id));
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-800 text-center">Create new group</h2>

        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Nombre del grupo"
          className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          value={groupDesc}
          onChange={(e) => setGroupDesc(e.target.value)}
          placeholder="Descripción (opcional)"
          className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          rows={3}
        />

        <div>
          <label className="block mb-1 text-gray-700 font-medium">Agregar miembros</label>
          <GroupSearchBar borderless={false} />
        </div>

        {groupUsers.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {groupUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-1 bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                <span>{user.name}</span>
                <button onClick={() => removeUser(user.id)} className="text-blue-600 hover:text-blue-800 font-bold">×</button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Crear grupo
        </button>
      </div>
    </div>
  );
}
