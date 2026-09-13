from langgraph.graph import StateGraph,START,END
from langgraph.graph.message import add_messages
# from langgraph.checkpoint.memory import InMemorySaver
from langgraph.checkpoint.mongodb import MongoDBSaver
from langchain_core.messages import HumanMessage,AIMessage,SystemMessage
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
from pydantic import BaseModel
from typing import TypedDict,Annotated
from db.db import client, db
load_dotenv()
Model = ChatOpenAI()

class ChatState(TypedDict):
    messages: Annotated[list,add_messages]

graph = StateGraph(ChatState)

def Chat_Ai_Message(state:ChatState):
    message = state['messages']
    response = Model.invoke(message)
    return{"messages":[response]}

graph.add_node("Ai_message_generter",Chat_Ai_Message)

graph.add_edge(START,"Ai_message_generter")
graph.add_edge("Ai_message_generter",END)

# memory = InMemorySaver()
memory = MongoDBSaver(
    client=client,
    db_name=db.name
)


workflow = graph.compile(checkpointer=memory)

# def chat_with_ai(message:str,thread_id:str):
#     config={
#         "configurable": {
#             "thread_id": thread_id
#         }
#     }
#     result =   workflow.invoke({
#         "messages":[
#             HumanMessage(
#                 content=message
#             )
#         ]
#     },config)
#     return result["messages"][-1].content
def stream_chat(message: str, thread_id: str):


    config = {
        "configurable": {
            "thread_id": thread_id
        }
    }

    for chunk in workflow.stream(
        {
            "messages": [
                HumanMessage(
                    content=message
                )
            ]
        },
        config,
        stream_mode="messages"
    ):

        message_chunk, metadata = chunk

        if message_chunk.content:
            yield message_chunk.content
        

def get_chat_history(thread_id:str):
 print("hii i am in get chat history")
 config = {
        "configurable": {
            "thread_id": thread_id
        }
    }
 state_data = workflow.get_state(config)
 return state_data.values.get("messages", []) 
# ("messages", []) message hai to do nhi to empty dict
        
    