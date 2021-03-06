# noinspection PyUnresolvedReferences
from flask import request
# noinspection PyUnresolvedReferences
from sqlalchemy import exc

from app import app


class Endpoints:
    @classmethod
    def initialize(cls):
        from .emp_view import EMPView
        EMPView.register(app)

        from .mgr_view import MGRView
        MGRView.register(app)

        @app.before_request
        def before_request():
            from models import entities as ent

            default_m = "default@gmail.com"
            default_n = "default"
            default_mgr = ent.Manager.query.filter_by(email=default_m).first()
            if not default_mgr:
                create_mgr = ent.Manager(email=default_m, password=default_m, username=default_n)
                create_mgr.save()

        @app.route("/")
        def index():
            return "Hello!"
