from . import *
from . import emp_orm as ent


# noinspection PyProtectedMember
class Manager(ent._Entity):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(120), nullable=False)
    employees = db.relationship('Employee', backref='manager', lazy=True)


# noinspection PyProtectedMember
class Employee(ent._Entity):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(120), nullable=False)
    tech_stack = db.Column(db.JSON, nullable=True)
    manager_id = db.Column(db.Integer, db.ForeignKey('manager.id'),
                           nullable=False)
