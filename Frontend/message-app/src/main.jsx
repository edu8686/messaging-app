import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "./AppContext.jsx";
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import Chat from "./components/chats/ChatWindow.jsx";
import MessagingLayout from "./pages/MessagingLayout.jsx";
import Profile from "./pages/Profile.jsx";
import MainWindow from "./pages/MainWindow.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import New from "./components/New.jsx"
import FormNewGroup from "./components/FormNewGroup.jsx";
import { ErrorBoundary } from "./ErrorBoundary.jsx";

console.log("App renderizada correctamente");


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <ProtectedRoute><App /></ProtectedRoute>, // App con Navbar + Footer
    children: [
      {
        element: <MainWindow />, // Sidebar fijo + outlet para contenido
        children: [
          { path: "home", element: <Home /> },
          { path: "chats", element: <MessagingLayout /> },
          { path: "profile/:id", element: <Profile /> },
          { path : "new", element: <New />},
          { path: "/new/new-group", element: <FormNewGroup />}
        ],
      },
    ],
  },
]);



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </AppProvider>
  </StrictMode>
);
