import { useState } from "react";

export default function About({ userProfile, isEditable, onSave }) {
  const [aboutText, setAboutText] = useState(userProfile.about || "");
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    setEditing(false);
    if (onSave) onSave(aboutText); 
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">About</h3>
        {isEditable &&
          (!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="text-green-600 hover:underline text-sm"
            >
              Save
            </button>
          ))}
      </div>

      {!editing ? (
        <p className="text-gray-700">{aboutText || "No hay descripción."}</p>
      ) : (
        <textarea
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg resize-none"
          rows={4}
        />
      )}
    </div>
  );
}
