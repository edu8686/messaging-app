import { useState } from "react";

export default function About({ userProfile, isEditable }) {
  const [aboutText, setAboutText] = useState(userProfile.about || "");

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-semibold mb-2">About</h3>
      {isEditable ? (
        <textarea
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg resize-none"
          rows={4}
        />
      ) : (
        <p className="text-gray-700">{aboutText || "No hay descripción."}</p>
      )}
    </div>
  );
}
