from flask import Flask
from database.db import db
from routes.index import default_routes
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, JWTManager
from datetime import datetime
import threading
from models.rota import Rota_ida, Rota_volta
from models.votacao import Votacao
from models.usuario import Usuario
import time



class App():
    def __init__(self):
        self.app = Flask(__name__)
        CORS(self.app)
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:''@localhost/transporteescolar'
        self.app.config['JWT_SECRET_KEY'] = 'tossir'
        db.init_app(self.app)
        default_routes(self.app)

        jwt = JWTManager(self.app)

        self.check_thread = threading.Thread(target=self.criarRotas, daemon=True)
        self.check_thread.start()

    def criarRotas(self):
        with self.app.app_context():
            while True:
                tempo = datetime.now()
                dia = tempo.strftime("%Y-%m-%d")
                hora = int(tempo.strftime("%H""%M""%S")) 

                dataUsuario = Usuario.query.all()
                allUsuarios = {'usuarios': [usuario.to_dict() for usuario in dataUsuario]}
                listUsuario = (allUsuarios['usuarios'])

                dataVotacao = Votacao.query.all()
                allVotacoes = {'votacoes': [votacao.to_dict() for votacao in dataVotacao]}
                listVotacao = (allVotacoes['votacoes'])

                cincoAM = []
                meioDia = []
                passageiros = ""

                for i in listUsuario:
                    if i['horarioida'] == 5:
                        cincoAM.append(i['id'])
                    if i['horarioida'] == 12:
                        meioDia.append(i['id'])

                if hora == 171700: #17:15 = 1715 
                    for i in listVotacao:
                        if i['opcao'] == 1 or i['opcao'] == 2:
                            for ids in cincoAM:
                                if ids == i['userId']:
                                    string = str(i['userId'])
                                    passageiros += string+ ", "
                    rota = {
                        "data": dia,
                        "hora": 5,
                        "alunos": passageiros
                    }
                    try:
                        add = Rota_ida(rota['data'], rota['hora'], rota['alunos'])
                        db.session.add(add)
                        db.session.commit()
                    except Exception as e:
                        print(e)
                        return 'Rota nao cadastrada: {}'.format(str(e)), 405
                    time.sleep(2)

    def run(self):
        return self.app.run(port=3000, host='0.0.0.0', debug=True)
    
    

app = App()
app.run()