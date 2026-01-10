from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_USER = os.getenv("DATABASE_USER")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
DATABASE_DB = os.getenv("DATABASE_DB")

class Config:
    SQLALCHEMY_DATABASE_URI = f'postgresql+psycopg://{DATABASE_USER}:{DATABASE_PASSWORD}@localhost:5433/{DATABASE_DB}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
