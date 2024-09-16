from flask import Flask
from database.db import db
from routes.index import default_routes
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, JWTManager


class App():
    def __init__(self):
        self.app = Flask(__name__)
        CORS(self.app)
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:''@localhost/transporteescolar'
        self.app.config['JWT_SECRET_KEY'] = 'tossir'
        db.init_app(self.app)
        default_routes(self.app)

        jwt = JWTManager(self.app)

    def run(self):
        return self.app.run(port=3000, host='0.0.0.0', debug=True)
    

app = App()
app.run()