const ChatHistory = ({
  chats,
  activeThreadId,
  onSelectChat,
}) => {
  return (
    <div
      className="
        flex-1
        overflow-y-auto
        px-3
        py-6
      "
    >

      <div
        className="
          mb-3
          px-2
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.14em]
          text-zinc-600
        "
      >
        Chat History
      </div>


      {chats.length === 0 ? (

        <div
          className="
            px-2
            py-3
            text-xs
            text-zinc-600
          "
        >
          No conversations yet
        </div>

      ) : (

        <div className="space-y-1">

          {chats.map((chat) => {

            const isActive =
              activeThreadId ===
              chat.threadId;

            return (
              <button
                key={
                  chat.threadId
                }
                onClick={() =>
                  onSelectChat(
                    chat.threadId
                  )
                }
                className={`
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-2.5
                  text-left
                  text-sm
                  transition
                  ${
                    isActive
                      ? "bg-white/[0.07] text-white"
                      : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200"
                  }
                `}
              >

                <span
                  className={`
                    shrink-0
                    text-sm
                    ${
                      isActive
                        ? "text-zinc-300"
                        : "text-zinc-600"
                    }
                  `}
                >
                  ◌
                </span>


                <span
                  className="
                    min-w-0
                    flex-1
                    truncate
                  "
                >
                  {chat.title}
                </span>

              </button>
            );
          })}

        </div>
      )}

    </div>
  );
};


export default ChatHistory;