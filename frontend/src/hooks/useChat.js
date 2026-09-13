import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getChatHistory,
  streamChat,
} from "../api/chatApi";

import {
  getActiveThreadId,
  setActiveThreadId,
  getStoredChats,
  addStoredChat,
} from "../utils/chatStorage";


const createThreadId = () => {
  return crypto.randomUUID();
};


export const useChat = () => {

  const [threadId, setThreadId] =
    useState(null);

  const [messages, setMessages] =
    useState([]);

  const [chats, setChats] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(false);



  useEffect(() => {

    const storedChats =
      getStoredChats();

    setChats(storedChats);


    const savedThreadId =
      getActiveThreadId();


    if (savedThreadId) {

      setThreadId(
        savedThreadId
      );

      loadChat(
        savedThreadId
      );

    } else {

      createNewChat();

    }

  }, []);


  const createNewChat =
    useCallback(() => {

      const newThreadId =
        createThreadId();

      setThreadId(
        newThreadId
      );

      setMessages([]);

      setActiveThreadId(
        newThreadId
      );

    }, []);




  const loadChat =
    useCallback(async (
      selectedThreadId
    ) => {

      try {

        setIsLoading(true);

        const data =
          await getChatHistory(
            selectedThreadId
          );

        setMessages(
          data.messages || []
        );

        setThreadId(
          selectedThreadId
        );

        setActiveThreadId(
          selectedThreadId
        );

      } catch (error) {

        console.error(
          "Failed to load chat:",
          error
        );

      } finally {

        setIsLoading(false);

      }

    }, []);



  const sendMessage =
    useCallback(async (
      content
    ) => {

      if (
        !content.trim() ||
        !threadId ||
        isLoading
      ) {
        return;
      }


      const userContent =
        content.trim();



      setMessages((previous) => [
        ...previous,

        {
          role: "user",
          content: userContent,
        },

        {
          role: "assistant",
          content: "",
        },
      ]);


      setIsLoading(true);


      try {

        await streamChat({

          message: userContent,

          threadId,

          onChunk: (chunk) => {

            setMessages(
              (previous) => {

                const updated = [
                  ...previous,
                ];

                const lastIndex =
                  updated.length - 1;

                updated[lastIndex] = {
                  ...updated[lastIndex],

                  content:
                    updated[lastIndex]
                      .content + chunk,
                };

                return updated;

              }
            );

          },

        });


       
        const updatedChats =
          addStoredChat({

            threadId,

            title:
              userContent.length > 35
                ? userContent.slice(
                    0,
                    35
                  ) + "..."
                : userContent,

          });

        setChats(
          updatedChats
        );


      } catch (error) {

        console.error(
          "Chat error:",
          error
        );


        setMessages(
          (previous) => {

            const updated = [
              ...previous,
            ];

            const lastIndex =
              updated.length - 1;

            updated[lastIndex] = {
              ...updated[lastIndex],

              content:
                "Sorry, something went wrong. Please try again.",
            };

            return updated;

          }
        );

      } finally {

        setIsLoading(false);

      }

    }, [
      threadId,
      isLoading,
    ]);


  return {
    threadId,
    messages,
    chats,
    isLoading,

    createNewChat,
    loadChat,
    sendMessage,
  };
};