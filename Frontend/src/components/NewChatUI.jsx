import Searchbar from "../components/searching/SearchBar.jsx";

export default function NewChatUI() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-10">
        <h2 className="text-xl font-bold text-gray-800 text-center">
          Start a conversation
        </h2>

        
        <Searchbar borderless={false} />
      </div>
    </div>
  );
}
