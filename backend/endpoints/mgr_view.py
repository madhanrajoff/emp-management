from . import *
from flask_classful import FlaskView, route
from models import entities as ent


class MGRView(FlaskView):
    def index(self):
        return "Hello Manager!"

    def post(self):
        req = request.args
        email = req.get("email")
        password = req.get("password")
        contact = req.get("contact")
        print(email, password, contact)
        if not any([email, password, contact]):
            print("valid")
            return "Required Fields are missing..."

        # mgr = ent.Manager(email=email, password=password, contact_at=contact).save()
        # return mgr.to_dict()
