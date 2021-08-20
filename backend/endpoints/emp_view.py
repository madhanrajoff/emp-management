from flask_classful import FlaskView


class EMPView(FlaskView):
    def index(self):
        return "Hello Employee!"
