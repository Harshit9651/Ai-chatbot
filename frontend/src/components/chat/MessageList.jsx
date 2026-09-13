import MessageBubble from "./MessageBubble";


const MessageList = ({
  messages,
  isLoading,
}) => {
  const isEmpty =
    messages.length === 0;


  return (
    <div
      className="
        flex-1
        overflow-y-auto
        px-4
        py-8
        sm:px-8
      "
    >

      <div
        className="
          mx-auto
          flex
          min-h-full
          w-full
          max-w-3xl
          flex-col
        "
      >

        {/* Empty State */}

        {isEmpty && (

          <div
            className="
              flex
              flex-1
              flex-col
              items-center
              justify-center
              text-center
            "
          >

            <div
              className="
                mb-5
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-white/[0.08]
                bg-[#103357]
                text-2xl
                shadow-xl
                shadow-[#103357]/20
              "
            >
              ✦
            </div>


            <h2
              className="
                text-xl
                font-semibold
                tracking-tight
                text-white
                sm:text-2xl
              "
            >
              How can I help?
            </h2>


            <p
              className="
                mt-2
                max-w-sm
                text-sm
                leading-6
                text-zinc-600
              "
            >
              Ask me anything and
              let's build something
              useful.
            </p>

          </div>

        )}


        {/* Messages */}

        {!isEmpty && (

          <div
            className="
              flex
              flex-col
              gap-6
            "
          >

            {messages.map(
              (message, index) => (

                <MessageBubble
                  key={index}
                  message={
                    message
                  }
                />

              )
            )}


            {/* Loading */}

            {isLoading &&
              messages[
                messages.length - 1
              ]?.content === "" && (

                <div
                  className="
                    flex
                    items-center
                    gap-1.5
                    px-2
                  "
                >

                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-600 [animation-delay:-0.3s]" />

                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-600 [animation-delay:-0.15s]" />

                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-600" />

                </div>

              )}

          </div>

        )}

      </div>

    </div>
  );
};


export default MessageList;