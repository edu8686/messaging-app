import { signUp } from "../service/sign-up";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== password2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await signUp(name, username, password, password2);
      setSuccess("Usuario creado con éxito");
      console.log("Respuesta del backend:", response);
      setName("");
      setUsername("");
      setPassword("");
      setPassword2("");
    } catch (err) {
      console.error(err);
      setError("Error al crear usuario. Intenta de nuevo.");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Crear cuenta</h2>
      {error && <p className="text-red-500 text-center mb-2">{error}</p>}
      {success && <p className="text-green-600 text-center mb-2">{success}</p>}
      <Link to="/login">Log in</Link>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-lg p-2"
          required
        />
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-lg p-2"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-lg p-2"
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          className="border rounded-lg p-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition-colors"
        >
          Registrarse
        </button>
      </form>
      <Link 
      to="/login"
      className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold py-2 px-4 rounded-lg text-center transition-colors block mt-2"
      >Log in</Link>
    </div>
  );
}
