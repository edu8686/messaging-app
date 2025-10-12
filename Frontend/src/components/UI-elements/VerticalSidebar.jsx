import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../AppContext.jsx";

export default function VerticalSidebar() {
  const { loginUser, logout } = useContext(AppContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="w-30 bg-gray-800 text-gray-200 flex flex-col h-screen">
      {/* Sección superior */}
      <div className="flex flex-col items-center gap-6 mt-6">
        {/* Links de navegación */}
        <button
          onClick={() => navigate(`/profile/${loginUser.id}`)}
          className="flex flex-col items-center gap-1 p-2 hover:bg-gray-700 rounded-lg transition-colors w-full"
        >
          <span className="material-symbols-outlined text-xl">person</span>
          <span className="text-xs">Profile</span>
        </button>

        <button
          onClick={() => navigate("/chats")}
          className="flex flex-col items-center gap-1 p-2 hover:bg-gray-700 rounded-lg transition-colors w-full"
        >
          <span className="material-symbols-outlined text-xl">chat</span>
          <span className="text-xs">Chats</span>
        </button>

        <button className="flex flex-col items-center gap-1 p-2 hover:bg-gray-700 rounded-lg transition-colors w-full">
          <span className="material-symbols-outlined text-2xl">groups</span>
          <span className="text-xs">Groups</span>
        </button>

        <button className="flex flex-col items-center gap-1 p-2 hover:bg-gray-700 rounded-lg transition-colors w-full">
          <span className="material-symbols-outlined text-2xl">
            notifications
          </span>
          <span className="text-xs">Notifications</span>
        </button>
      </div>

      {/* Empuja el logout y el texto hacia abajo */}
      <div className="flex-grow"></div>

      {/* Sección inferior */}
      <div className="px-3 flex flex-col items-center mb-4">
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 w-full justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-0.5 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="text-xs">Logout</span>
        </button>

        {/* Texto al pie dentro del ancho del contenedor */}
        <div className="mt-3 text-gray-400 text-[11px] text-center w-full">
          &copy; 2025 — Desarrollado por{" "}
          <span className="font-semibold">Eduardo D. Negri</span>
        </div>
      </div>
    </div>
  );
}
