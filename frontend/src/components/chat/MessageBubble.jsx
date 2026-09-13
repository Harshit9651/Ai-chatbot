const MessageBubble = ({
  message,
}) => {
  const isUser =
    message.role === "user";


  return (
    <div
      className={`
        flex
        w-full
        ${
          isUser
            ? "justify-end"
            : "justify-start"
        }
      `}
    >

      <div
        className={`
          max-w-[85%]
          whitespace-pre-wrap
          break-words
          text-sm
          leading-7
          sm:max-w-[75%]
          ${
            isUser
              ? `
                rounded-2xl
                rounded-br-md
                bg-[#103357]
                px-4
                py-3
                text-white
                shadow-lg
                shadow-black/10
              `
              : `
                px-2
                py-1
                text-zinc-300
              `
          }
        `}
      >
        {message.content}
      </div>

    </div>
  );
};


export default MessageBubble;