import { useState, useEffect, useContext } from "react";
import { searchUsers } from "../../service/search.js";
import { AppContext } from "../../AppContext.jsx";

export default function Searchbar({ borderless = false }) {
  const { addUserToGroup, groupUsers, loginUser } = useContext(AppContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);



  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    searchUsers(query)
      .then((filtered) => {
      const safeResults = filtered.results.filter(
        (user) => user.id !== loginUser.id
      );

      setResults(safeResults);
      })
      .catch((err) => console.error(err));
  }, [query, loginUser]);

  async function handleSelect(user) {
    addUserToGroup(user);
    console.log(groupUsers)
    setQuery("");
    setResults([]);
  }

  return (
    <div className="relative w-full overflow-visible">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar contacto..."
        className={`w-full rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          borderless ? "border-none bg-transparent" : "border bg-gray-50"
        }`}
      />

      {results.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border rounded-lg mt-1 max-h-64 overflow-y-auto shadow-lg">
          {results.map((user) => (
            <li
              key={user.id}
              onClick={() => handleSelect(user)}
              className="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer transition-colors"
            >
              {/* Avatar */}
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                {user.name ? user.name[0].toUpperCase() : "?"}
              </div>

              {/* Datos */}
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">
                  {user.name || user.username}
                </span>
                <span className="text-sm text-gray-500">@{user.username}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

