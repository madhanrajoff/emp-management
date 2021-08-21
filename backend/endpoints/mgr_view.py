from . import *
from flask_classful import FlaskView
from models import entities as ent


class MGRView(FlaskView):
    def index(self):
        req = request.args
        email = req.get("email")
        if not email:
            return "Hello Manager!"

        return ent.Manager.get(email)

    def post(self):
        req = request.args
        email = req.get("email")
        password = req.get("password")
        contact = req.get("contact")
        if not email or not password or not contact:
            return "Required Fields are missing..."

        try:
            mgr = ent.Manager(email=email, password=password, contact_at=contact).save()
        except exc.IntegrityError:
            return "Email already chosen!"

        return mgr.to_dict()
