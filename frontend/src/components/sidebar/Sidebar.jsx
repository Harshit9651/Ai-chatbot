import NewChatButton from "./NewChatButton";
import ChatHistory from "./ChatHistory";


const Sidebar = ({
  chats,
  activeThreadId,
  onNewChat,
  onSelectChat,
}) => {
  return (
    <aside
      className="
        hidden
        w-[280px]
        shrink-0
        flex-col
        border-r
        border-white/[0.07]
        bg-[#0d0d0d]
        md:flex
      "
    >

      {/* Brand */}

      <div
        className="
          flex
          h-[72px]
          items-center
          gap-3
          border-b
          border-white/[0.07]
          px-5
        "
      >

        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            bg-[#103357]
            text-lg
            font-semibold
            shadow-lg
            shadow-[#103357]/20
          "
        >
          ✦
        </div>

        <div>
          <div className="text-sm font-semibold text-white">
            AI Assistant
          </div>

          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Online
          </div>
        </div>

      </div>


      {/* New Chat */}

      <div className="px-3 pt-4">

        <NewChatButton
          onClick={
            onNewChat
          }
        />

      </div>


      {/* History */}

      <ChatHistory
        chats={chats}
        activeThreadId={
          activeThreadId
        }
        onSelectChat={
          onSelectChat
        }
      />


      {/* Footer */}

      <div
        className="
          border-t
          border-white/[0.07]
          p-3
        "
      >

        <button
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-3
            py-2.5
            text-left
            text-sm
            text-zinc-500
            transition
            hover:bg-white/[0.04]
            hover:text-zinc-200
          "
        >
          <span className="text-base">
            ⚙
          </span>

          Settings
        </button>

      </div>

    </aside>
  );
};


export default Sidebar;