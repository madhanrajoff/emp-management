from . import *
from . import emp_orm as ent


class Obj:
    @classmethod
    def construct(cls, fine, data=None, msg=None):
        ob = {"fine": fine}
        if data:
            ob["data"] = data
        if msg:
            ob["msg"] = msg
        return ob


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
            return Obj.construct(False, msg="Manager not exist!")

        if ret_dict:
            return Obj.construct(True, data=mgr.to_dict())
        return mgr

    @classmethod
    def get_by_email(cls, email, ret_dict=False):
        mgr = Manager.query.filter_by(email=email).first()
        if not mgr:
            return Obj.construct(False, msg="Manager not exist!")

        if ret_dict:
            return Obj.construct(True, data=mgr.to_dict())
        return mgr

    @classmethod
    def get_by_id(cls, id, ret_dict=False):
        mgr = Manager.query.filter_by(id=id).first()

        if not mgr:
            return Obj.construct(False, msg="Employee not exist!")

        if ret_dict:
            return Obj.construct(True, data=[i.to_dict() for i in mgr.employees])
        return mgr

    @classmethod
    def get_all(cls, ret_dict=False):
        mgr = Manager.query.all()
        if ret_dict:
            return Obj.construct(True, data=[data.to_dict() for data in mgr])
        return mgr


# noinspection PyProtectedMember
class Employee(ent._Entity):
    id = db.Column(db.Integer, primary_key=True)
    tech_stack = db.Column(db.Integer, nullable=True)
    manager_id = db.Column(db.Integer, db.ForeignKey('manager.id'),
                           nullable=False)

    def __init__(self, **kwargs):
        super(Employee, self).__init__(**kwargs)

    @classmethod
    def get(cls, email, password, ret_dict=False):
        emp = Employee.query.filter_by(email=email).first()

        if not emp:
            return Obj.construct(False, msg="Employee not exist!")

        if not ent.bcrypt.check_password_hash(emp.password, password):
            return Obj.construct(False, msg="Password mismatch!")

        if ret_dict:
            return Obj.construct(True, data=emp.to_dict())
        return emp

    @classmethod
    def get_by_id(cls, id, ret_dict=False):
        emp = Employee.query.filter_by(id=id).first()

        if not emp:
            return Obj.construct(False, msg="Employee not exist!")

        if ret_dict:
            return Obj.construct(True, data=emp.to_dict())
        return emp

    @classmethod
    def get_all(cls, ret_dict=False):
        emp = Employee.query.all()
        if ret_dict:
            return Obj.construct(True, data=[data.to_dict() for data in emp])
        return emp
