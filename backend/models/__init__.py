# noinspection PyUnresolvedReferences
from app import db
from .entities import Manager, Employee


class Models:
    @classmethod
    def initialize(cls):
        db.create_all()
