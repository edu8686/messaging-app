import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AppProvider, AppContext } from "./AppContext.jsx";
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import Chat from "./components/chats/ChatWindow.jsx";
import MessagingLayout from "./pages/MessagingLayout.jsx";
import Profile from "./pages/Profile.jsx";
import MainWindow from "./pages/MainWindow.jsx";
import New from "./components/New.jsx";
import FormNewGroup from "./components/FormNewGroup.jsx";
import { ErrorBoundary } from "./ErrorBoundary.jsx";

console.log("App renderizada correctamente");


const Protected = ({ children }) => {
  const { loginUser } = useContext(AppContext);
  return loginUser ? children : <Navigate to="/login" replace />;
};

const Public = ({ children }) => {
  const { loginUser } = useContext(AppContext);
  return loginUser ? <Navigate to="/home" replace /> : children;
};


const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Public>
        <Login />
      </Public>
    ),
  },
  {
    path: "/signup",
    element: (
      <Public>
        <SignUp />
      </Public>
    ),
  },
  {
    path: "/",
    element: (
      <Protected>
        <App />
      </Protected>
    ),
    children: [
      {
        element: <MainWindow />, 
        children: [
          { path: "", element: <Navigate to="home" replace /> }, 
          { path: "home", element: <Home /> },
          { path: "chats", element: <MessagingLayout /> },
          { path: "profile/:id", element: <Profile /> },
          { path: "new", element: <New /> },
          { path: "new/new-group", element: <FormNewGroup /> },
        ],
      },
    ],
  },
]);

// --- Renderizado ---
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </AppProvider>
  </StrictMode>
);
