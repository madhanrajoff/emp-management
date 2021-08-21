from . import *
from . import emp_orm as ent


# noinspection PyProtectedMember
class Manager(ent._Entity):
    id = db.Column(db.Integer, primary_key=True)
    employees = db.relationship('Employee', backref='manager', lazy=True)

    def __init__(self, **kwargs):
        super(Manager,  self).__init__(**kwargs)

    @classmethod
    def get(cls, username, ret_dict=False):
        mgr = Manager.query.filter_by(username=username).first()
        if not mgr:
            return "Manager not exist!"

        if ret_dict:
            return mgr.to_dict()
        return mgr

    @classmethod
    def get_all(cls):
        return Manager.query.all()


# noinspection PyProtectedMember
class Employee(ent._Entity):
    id = db.Column(db.Integer, primary_key=True)
    tech_stack = db.Column(db.Integer, nullable=True)
    manager_id = db.Column(db.Integer, db.ForeignKey('manager.id'),
                           nullable=False)

    def __init__(self, **kwargs):
        super(Employee, self).__init__(**kwargs)
