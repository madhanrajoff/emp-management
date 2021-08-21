from . import *
from flask_classful import FlaskView

from models import entities as ent


class EMPView(FlaskView):
    def index(self):
        return "Hello Employee!"

    def post(self):
        req = request.json
        email = req.get("email")
        password = req.get("password")
        manager = req.get("manager")
        username = req.get("username")
        tech_stack = int(req.get("techStack", 2))
        if not email or not password or not manager or not username:
            return {"fine": False, "msg": "Required Fields are missing..."}

        try:
            manager = ent.Manager.get(manager, ret_dict=False)
            ent.Employee(email=email, password=password, manager=manager, username=username,
                         tech_stack=tech_stack).save()
        except exc.IntegrityError:
            return {"fine": False, "msg": "Email already chosen!"}

        return {"fine": True}
