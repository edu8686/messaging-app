import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../AppContext.jsx";

export default function ProtectedRoute({ children }) {
  const { loginUser, token, sessionExpiration } = useContext(AppContext);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!sessionExpiration) return;

    const now = Date.now();
    if (now > sessionExpiration) {
      setExpired(true); 
    } else {
      const timer = setTimeout(() => {
        setExpired(true);
      }, sessionExpiration - now);

      return () => clearTimeout(timer);
    }
  }, [sessionExpiration]);

  if (!loginUser || !token || expired) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}
