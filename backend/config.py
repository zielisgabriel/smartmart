from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_USER = os.getenv("DATABASE_USER")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
DATABASE_DB = os.getenv("DATABASE_DB")
DATABASE_HOST = os.getenv("DATABASE_HOST", "localhost")
DATABASE_PORT = os.getenv("DATABASE_PORT", "5432")

class Config:
    SQLALCHEMY_DATABASE_URI = f'postgresql+psycopg://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_DB}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
