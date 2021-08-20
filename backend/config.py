import pymysql
pymysql.install_as_MySQLdb()


class Config:
    @classmethod
    def initialize(cls):

        # Create Tables
        from models import Models
        Models.initialize()

        # Create Endpoints
        from endpoints import Endpoints
        Endpoints.initialize()
