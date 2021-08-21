from os import environ
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


def generate_db_uri() -> str:
    db_type = environ.get("DB_TYPE", "mysql")
    db_host = environ.get("DB_HOST", "localhost")
    db_user = environ.get("DB_USER", "root")
    db_pass = environ.get("DB_PASS", "")
    db_name = environ.get("DB_NAME", "emp_management")
    return f"{db_type}://{db_user}:{db_pass}@{db_host}/{db_name}"


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = generate_db_uri()
db = SQLAlchemy(app)
CORS(app)
