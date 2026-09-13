import {
  useState,
} from "react";


const ChatInput = ({
  onSend,
  disabled,
}) => {

  const [
    value,
    setValue,
  ] = useState("");


  const submit = () => {

    const trimmed =
      value.trim();

    if (
      !trimmed ||
      disabled
    ) {
      return;
    }

    onSend(trimmed);

    setValue("");

  };


  const handleKeyDown = (
    event
  ) => {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      submit();

    }

  };


  return (
    <div
      className="
        shrink-0
        px-4
        pb-4
        pt-2
        sm:px-8
        sm:pb-6
      "
    >

      <div
        className="
          mx-auto
          w-full
          max-w-3xl
        "
      >

        {/* Input box */}

        <div
          className="
            flex
            items-end
            gap-3
            rounded-2xl
            border
            border-white/[0.09]
            bg-[#111111]
            p-2
            shadow-2xl
            shadow-black/30
            transition
            focus-within:border-white/[0.16]
          "
        >

          <textarea
            value={value}
            onChange={(event) =>
              setValue(
                event.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            placeholder="Message AI..."
            disabled={disabled}
            rows={1}
            className="
              max-h-32
              min-h-[42px]
              flex-1
              resize-none
              bg-transparent
              px-3
              py-2.5
              text-sm
              leading-6
              text-white
              outline-none
              placeholder:text-zinc-600
              disabled:cursor-not-allowed
            "
          />


          <button
            onClick={submit}
            disabled={
              !value.trim() ||
              disabled
            }
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#103357]
              text-lg
              font-medium
              text-white
              shadow-lg
              shadow-[#103357]/20
              transition-all
              hover:brightness-110
              active:scale-95
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            ↑
          </button>

        </div>


        <p
          className="
            mt-2
            text-center
            text-[10px]
            text-zinc-700
          "
        >
          AI can make mistakes.
          Check important information.
        </p>

      </div>

    </div>
  );
};


export default ChatInput;