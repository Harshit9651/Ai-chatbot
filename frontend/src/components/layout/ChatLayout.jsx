import Sidebar from "../sidebar/Sidebar";
import ChatWindow from "../chat/ChatWindow";


const ChatLayout = ({
  chats,
  activeThreadId,
  messages,
  isLoading,
  onNewChat,
  onSelectChat,
  onSendMessage,
}) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#080808] text-white">

      <Sidebar
        chats={chats}
        activeThreadId={
          activeThreadId
        }
        onNewChat={
          onNewChat
        }
        onSelectChat={
          onSelectChat
        }
      />

      <ChatWindow
        messages={messages}
        isLoading={
          isLoading
        }
        onSendMessage={
          onSendMessage
        }
      />

    </div>
  );
};


export default ChatLayout;