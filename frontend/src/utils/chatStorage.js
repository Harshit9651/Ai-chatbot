const ACTIVE_THREAD_KEY =
  "active_thread_id";

const CHAT_HISTORY_KEY =
  "chat_history";



export const getActiveThreadId = () => {
  return localStorage.getItem(
    ACTIVE_THREAD_KEY
  );
};


export const setActiveThreadId = (
  threadId
) => {
  localStorage.setItem(
    ACTIVE_THREAD_KEY,
    threadId
  );
};


export const getStoredChats = () => {
  try {
    return (
      JSON.parse(
        localStorage.getItem(
          CHAT_HISTORY_KEY
        )
      ) || []
    );
  } catch {
    return [];
  }
};


export const saveStoredChats = (
  chats
) => {
  localStorage.setItem(
    CHAT_HISTORY_KEY,
    JSON.stringify(chats)
  );
};


// -----------------------------
// ADD CHAT
// -----------------------------

export const addStoredChat = ({
  threadId,
  title,
}) => {
  const chats =
    getStoredChats();

  const exists =
    chats.some(
      (chat) =>
        chat.threadId === threadId
    );

  if (exists) {
    return chats;
  }

  const updatedChats = [
    {
      threadId,
      title,
    },
    ...chats,
  ];

  saveStoredChats(
    updatedChats
  );

  return updatedChats;
};