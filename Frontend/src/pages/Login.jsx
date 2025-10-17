import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext.jsx";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { loginService, setToken, setLoginUser, getChats } = useContext(AppContext);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginService(username, password);

      await new Promise((resolve) => {
        setLoginUser(response.user);
        setToken(response.token);
        localStorage.setItem("token", response.token);
        getChats(response.user.id)
        queueMicrotask(resolve);
      });

      navigate("/home"); 
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>
      {error && <p className="text-red-500 text-center mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Entrar"}
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="mb-2">¿No tienes cuenta?</p>
        <Link
          to="/signup"
          className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold py-2 px-4 rounded block transition-colors"
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
}
