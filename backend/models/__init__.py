# noinspection PyUnresolvedReferences
import re
# noinspection PyUnresolvedReferences
from sqlalchemy.orm import validates
# noinspection PyUnresolvedReferences
from flask_bcrypt import Bcrypt

from app import db
from .entities import Manager, Employee


class Models:
    @classmethod
    def initialize(cls):
        db.create_all()
