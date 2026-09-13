from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

if not MONGODB_URI:
    raise RuntimeError("MONGODB_URI is not configured")

if not DATABASE_NAME:
    raise RuntimeError("DATABASE_NAME is not configured")

client = MongoClient(
    MONGODB_URI,
    serverSelectionTimeoutMS=5000,
)

db = client[DATABASE_NAME]