import { useContext } from "react";
import { AppContext } from "../../AppContext";

export default function GroupChat({ chat, messages, messagesEndRef }) {
  const { obtainHour, loginUser } = useContext(AppContext);

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-0">
      
      <div className="bg-green-600 text-white p-3 shadow-md">
        <p className="text-lg font-semibold text-center">{chat.name}</p>
        <p className="text-xs text-center opacity-90 truncate">
          {chat.users.map((user) => user.name).join(", ")}
        </p>
      </div>

      
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        {messages.length > 0 ? (
          messages.map((msg, index) => {
            const isOwnMessage = msg.sender.id === loginUser.id;

            
            const msgDate = new Date(msg.createdAt).toLocaleDateString();

           
            const prevMsgDate =
              index > 0
                ? new Date(messages[index - 1].createdAt).toLocaleDateString()
                : null;

            
            const showDateDivider = msgDate !== prevMsgDate;

            return (
              <div key={msg.id} className="mb-2">
                
                {showDateDivider && (
                  <div className="flex justify-center my-2">
                    <span className="text-gray-400 text-xs bg-gray-200 px-2 py-1 rounded-full shadow-sm">
                      {msgDate}
                    </span>
                  </div>
                )}

                
                <div
                  className={`flex ${
                    isOwnMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-xs break-words flex flex-col shadow-sm ${
                      isOwnMessage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div
                      className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block shadow-sm mb-1 ${
                        isOwnMessage
                          ? "bg-blue-700 text-white"
                          : "bg-green-300 text-green-900"
                      }`}
                    >
                      {msg.sender.name}
                    </div>

                    {msg.type === "TEXT" && (
                      <p className="text-sm">
                        {msg.text}
                        <span className="text-[10px] ml-1 text-gray-200">
                          {obtainHour(msg)}
                        </span>
                      </p>
                    )}

                    {msg.type === "IMAGE" && msg.imageUrl && (
                      <img
                        src={msg.imageUrl}
                        alt="Mensaje"
                        className="max-w-xs rounded-lg mt-1"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="text-center text-gray-400">Inicie la conversación</h1>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
