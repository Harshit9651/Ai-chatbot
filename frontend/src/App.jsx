import ChatLayout from "./components/layout/ChatLayout";
import { useChat } from "./hooks/useChat";

function App() {
  const {
    threadId,
    messages,
    chats,
    isLoading,
    createNewChat,
    loadChat,
    sendMessage,
  } = useChat();

  return (
    <ChatLayout
      chats={chats}
      activeThreadId={threadId}
      messages={messages}
      isLoading={isLoading}
      onNewChat={createNewChat}
      onSelectChat={loadChat}
      onSendMessage={sendMessage}
    />
  );
}

export default App;