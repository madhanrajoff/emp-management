from . import *
from flask_classful import FlaskView

from models import entities as ent


class MGRView(FlaskView):
    def index(self):
        req = request.json
        if req:
            email = req.get("email")
            return ent.Manager.get(email, ret_dict=True)
        return {"data": [data.to_dict() for data in ent.Manager.get_all()]}

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
