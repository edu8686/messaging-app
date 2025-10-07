import VerticalSidebar from "../components/UI-elements/VerticalSidebar";
import { Outlet } from "react-router-dom";

function MainWindow() {
  return (
    <div className="flex h-screen min-h-0">
      <VerticalSidebar />
      <div className="flex-1 overflow-auto pb-3 pl-4 pr-4 pt-4">
        <Outlet />
      </div>
    </div>
  );
}

export default MainWindow;

