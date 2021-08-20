from app import app


class Endpoints:
    @classmethod
    def initialize(cls):
        from .emp_view import EMPView
        EMPView.register(app)

        from .mgr_view import MGRView
        MGRView.register(app)
