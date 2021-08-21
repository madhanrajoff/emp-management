from . import *
from flask_classful import FlaskView

from models import entities as ent


class EMPView(FlaskView):
    def index(self):
        req = request.args
        if req:
            email = req.get("email")
            password = req.get("password")
            return ent.Employee.get(email, password, ret_dict=True)
        return ent.Manager.get_all(ret_dict=True)

    def get(self, id):
        return ent.Employee.get_by_id(id, ret_dict=True)

    def post(self):
        req = request.json
        email = req.get("email")
        password = req.get("password")
        manager = req.get("manager")
        username = req.get("username")
        tech_stack = int(req.get("tech_stack", 2))
        if not email or not password or not manager or not username:
            return {"fine": False, "msg": "Required Fields are missing..."}

        try:
            manager = ent.Manager.get(manager, ret_dict=False)
            ent.Employee(email=email, password=password, manager=manager, username=username,
                         tech_stack=tech_stack).save()
        except exc.IntegrityError:
            return {"fine": False, "msg": "Email already chosen!"}

        return {"fine": True}

    def put(self):
        req = request.json
        id = req.get("id")
        email = req.get("email")
        username = req.get("username")
        tech_stack = int(req.get("tech_stack", 2))
        if not email or not username or not id:
            return {"fine": False, "msg": "Required Fields are missing..."}

        try:
            emp = ent.Employee.get_by_id(id)
            emp.update(email=email, username=username, tech_stack=tech_stack)
        except exc.IntegrityError:
            return {"fine": False, "msg": "Email already chosen!"}

        return {"fine": True}

    def delete(self, id):
        if not id:
            return {"fine": False, "msg": "Required Fields are missing..."}

        emp = ent.Employee.get_by_id(id)
        emp.delete()

        return {"fine": True}

