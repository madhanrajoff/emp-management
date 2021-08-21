from . import *
from flask_classful import FlaskView

from models import entities as ent


class MGRView(FlaskView):
    def index(self):
        req = request.args
        if req:
            email = req.get("email")
            return ent.Manager.get_by_email(email=email, ret_dict=True)
        return ent.Manager.get_all(ret_dict=True)

    def get(self, id):
        return ent.Manager.get_by_id(id, ret_dict=True)

    def post(self):
        req = request.json
        email = req.get("email")
        password = req.get("password")
        username = req.get("username")
        if not email or not password or not username:
            return {"fine": False, "msg": "Required Fields are missing..."}

        try:
            ent.Manager(email=email, password=password, username=username).save()
        except exc.IntegrityError:
            return {"fine": False, "msg": "Email already chosen!"}

        return {"fine": True}
