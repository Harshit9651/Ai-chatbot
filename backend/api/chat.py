from fastapi import APIRouter
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
from graph.chatbot import(
    stream_chat,get_chat_history
)


router = APIRouter()


class ChatRequest(BaseModel):

    message: str
    thread_id: str


@router.post("/")
def chat(request: ChatRequest):

    return StreamingResponse(
        stream_chat(
            request.message,
            request.thread_id
        ),
        media_type="text/plain"
    )
    
@router.get("/{thread_id}")
def get_chat(thread_id: str):

    messages = get_chat_history(thread_id)

    return {
        "thread_id": thread_id,
        "messages": [
            {
                "role": (
                    "user"
                    if message.type == "human"
                    else "assistant"
                ),
                "content": message.content
            }
            for message in messages
        ]
    }