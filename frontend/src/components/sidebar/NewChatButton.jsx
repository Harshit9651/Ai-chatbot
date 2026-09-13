const NewChatButton = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="
        group
        flex
        w-full
        items-center
        justify-center
        gap-2.5
        rounded-xl
        border
        border-white/[0.08]
        bg-white/[0.04]
        px-4
        py-2.5
        text-sm
        font-medium
        text-zinc-200
        transition-all
        duration-200
        hover:border-white/[0.13]
        hover:bg-white/[0.07]
        active:scale-[0.98]
      "
    >

      <span
        className="
          text-lg
          leading-none
          text-zinc-400
          transition
          group-hover:text-white
        "
      >
        +
      </span>

      New Chat

    </button>
  );
};


export default NewChatButton;