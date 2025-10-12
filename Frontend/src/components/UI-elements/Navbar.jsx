import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext.jsx";

export default function Navbar() {
  const { loginUser, setLoginUser, logout } = useContext(AppContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">

      <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-bold text-gray-800">
        Messaging App
      </h1>

      <div className="w-[120px]" />
    </nav>
  );
}
