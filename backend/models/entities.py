from . import *
from . import emp_orm as ent


# noinspection PyProtectedMember
class Manager(ent._Entity):
    id = db.Column(db.Integer, primary_key=True)
    employees = db.relationship('Employee', backref='manager', lazy=True)

    def __init__(self, **kwargs):
        super(Manager,  self).__init__(**kwargs)

    @classmethod
    def get(cls, email):
        mgr = Manager.query.filter_by(email=email).first()
        if not mgr:
            return "Manager not exist!"
        return mgr.to_dict()


# noinspection PyProtectedMember
class Employee(ent._Entity):
    id = db.Column(db.Integer, primary_key=True)
    tech_stack = db.Column(db.JSON, nullable=True)
    manager_id = db.Column(db.Integer, db.ForeignKey('manager.id'),
                           nullable=False)

    def __init__(self, **kwargs):
        super(Employee, self).__init__(**kwargs)
