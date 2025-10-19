import { useState, useContext } from "react";
import { AppContext } from "../AppContext";
import { createProfile as createProfileService } from "../service/profile";

export default function CreateProfile() {
  const { loginUser } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: loginUser?.name || "",
    lastName: loginUser?.lastName || "",
    location: "",
    about: "",
    hobbies: [],
    hobbyInput: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddHobby = () => {
    const hobby = formData.hobbyInput.trim();
    if (hobby && !formData.hobbies.includes(hobby)) {
      setFormData({
        ...formData,
        hobbies: [...formData.hobbies, hobby],
        hobbyInput: "",
      });
    }
  };

  const handleRemoveHobby = (hobby) => {
    setFormData({
      ...formData,
      hobbies: formData.hobbies.filter((h) => h !== hobby),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createProfileService( {
        name: formData.name,
        lastName: formData.lastName,
        location: formData.location,
        about: formData.about,
        hobbies: formData.hobbies,
      });

      alert("Perfil creado exitosamente!");
      
    } catch (err) {
      console.error(err);
      alert("Error al crear perfil: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-3xl shadow-md space-y-6">
      <h1 className="text-3xl font-bold">Crear mi perfil</h1>
      <p className="text-gray-600">Todavía no creaste tu perfil, crea uno</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre"
            className="flex-1 border p-2 rounded-lg"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Apellido"
            className="flex-1 border p-2 rounded-lg"
          />
        </div>

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Ciudad"
          className="border p-2 rounded-lg"
        />

        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          placeholder="Acerca de mí..."
          className="border p-2 rounded-lg resize-none"
          rows={4}
        />

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Hobbies</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="hobbyInput"
              value={formData.hobbyInput}
              onChange={handleChange}
              placeholder="Agregar hobby"
              className="flex-1 border p-2 rounded-lg"
            />
            <button
              type="button"
              onClick={handleAddHobby}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Agregar
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.hobbies.map((hobby) => (
              <span
                key={hobby}
                className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {hobby}
                <button
                  type="button"
                  onClick={() => handleRemoveHobby(hobby)}
                  className="text-red-500 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={handleSubmit}
        >
          {isSubmitting ? "Creando perfil..." : "Crear perfil"}
        </button>
      </form>
    </div>
  );
}
