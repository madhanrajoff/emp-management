from flask_classful import FlaskView


class MGRView(FlaskView):
    def index(self):
        return "Hello Manager!"
