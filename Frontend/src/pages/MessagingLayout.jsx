import SideBar from "../components/Sidebar";
import ChatWindow from "../components/chats/ChatWindow";


export default function MessagingLayout() {
  return (
    <div className="flex h-full">
      <div className="w-60 h-full border-r border-gray-300 bg-gray-50 overflow-y-auto">
        <SideBar />
      </div>

      <div className="flex-1 h-full flex flex-col">
        <ChatWindow />
      </div>
    </div>
  );
}



