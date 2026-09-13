import MessageList from "./MessageList";
import ChatInput from "./ChatInput";


const ChatWindow = ({
  messages,
  isLoading,
  onSendMessage,
}) => {
  return (
    <main
      className="
        flex
        min-w-0
        flex-1
        flex-col
        bg-[#080808]
      "
    >

      {/* Header */}

      <header
        className="
          flex
          h-[72px]
          shrink-0
          items-center
          justify-between
          border-b
          border-white/[0.07]
          bg-[#0a0a0a]
          px-5
          sm:px-7
        "
      >

        <div>

          <h1
            className="
              text-sm
              font-semibold
              text-white
            "
          >
            AI Assistant
          </h1>


          <div
            className="
              mt-1
              flex
              items-center
              gap-1.5
              text-[11px]
              text-zinc-600
            "
          >

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-emerald-500
              "
            />

            Online

          </div>

        </div>


        <button
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            text-lg
            text-zinc-500
            transition
            hover:bg-white/[0.05]
            hover:text-white
          "
        >
          ⋯
        </button>

      </header>


      {/* Messages */}

      <MessageList
        messages={messages}
        isLoading={
          isLoading
        }
      />


      {/* Input */}

      <ChatInput
        onSend={
          onSendMessage
        }
        disabled={
          isLoading
        }
      />

    </main>
  );
};


export default ChatWindow;