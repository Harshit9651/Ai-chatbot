const API_BASE_URL =
  "http://127.0.0.1:8000/api/v1/chat";


// Get complete chat history
export const getChatHistory = async (threadId) => {
  const response = await fetch(
    `${API_BASE_URL}/${threadId}`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load chat history"
    );
  }

  return response.json();
};



export const streamChat = async ({
  message,
  threadId,
  onChunk,
}) => {
  const response = await fetch(
    `${API_BASE_URL}/`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        message,
        thread_id: threadId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to send message"
    );
  }

  if (!response.body) {
    throw new Error(
      "Streaming is not supported by this response"
    );
  }

  const reader =
    response.body.getReader();

  const decoder =
    new TextDecoder();

  try {
    while (true) {
      const { value, done } =
        await reader.read();

      if (done) break;

      const chunk =
        decoder.decode(value, {
          stream: true,
        });

      if (chunk) {
        onChunk(chunk);
      }
    }
  } finally {
    reader.releaseLock();
  }
};