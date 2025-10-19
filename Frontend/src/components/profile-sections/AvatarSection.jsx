import { useState } from "react";

export default function AvatarSection({ avatarUrl, isEditable, onChange }) {
  const [preview, setPreview] = useState(avatarUrl);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onChange) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange(file);
    }
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <img
        src={preview || "/default-avatar.png"}
        alt="Avatar"
        className="w-32 h-32 rounded-full object-cover shadow-md"
      />
      {isEditable && (
        <label className="mt-3 cursor-pointer text-sm text-blue-600 hover:underline">
          Cambiar foto
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
