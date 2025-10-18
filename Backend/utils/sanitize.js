// utils/sanitize.js
function sanitizeUser(user) {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
}

function sanitizeChat(chat) {
  if (!chat) return null;
  return {
    ...chat,
    users: chat.users ? chat.users.map(sanitizeUser) : [],
    messages: chat.messages || [],
  };
}



module.exports = { sanitizeUser, sanitizeChat };
