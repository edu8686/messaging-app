import { useNavigate } from "react-router-dom";

export default function New() {
    const navigate = useNavigate();


  return (
    <div className="flex gap-8 justify-center items-center h-full">
      
      <button className="flex flex-col items-center justify-center w-48 h-48 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition-colors"
            onClick={() => {
        navigate("/new/new-chat");
      }}
      >
        <span className="material-symbols-outlined text-6xl">chat</span>
        <span className="mt-4 text-xl font-bold">New Chat</span>
      </button>

      
      <button 
      onClick={() => {
        navigate("/new/new-group");
      }}
      className="flex flex-col items-center justify-center w-48 h-48 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg transition-colors">
        <span className="material-symbols-outlined text-6xl">group_add</span>
        <span className="mt-4 text-xl font-bold">New Group</span>
      </button>
    </div>
  );
}
