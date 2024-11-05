from database.db import db
from models.rota import Rota_ida, Rota_volta
from models.votacao import Votacao
from models.usuario import Usuario
import time
from datetime import datetime

def criarRotas(app):
        with app.app_context():
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
                cincoPM = []

                onzeAM = []
                setePM = []
                dezPM = []
                passageirosIda = ""
                passageirosVolta = ""

                """ matutino
                ida: 5:50
                volta: 11:40

                verpertino
                ida: 11:50
                volta: 19:00

                noturno
                ida: 17:30
                volta: 22:15 """

                for i in listUsuario:
                    if i['horarioida'] == 5:
                        cincoAM.append(i['id'])
                    if i['horarioida'] == 12:
                        meioDia.append(i['id'])
                    if i['horarioida'] == 17:
                        cincoPM.append(i['id'])

                if hora == 225500: #17:15 = 1715 
                    for i in listVotacao:
                        if i['opcao'] == 1:
                            for ids in cincoAM:
                                if ids == i['userId']: #fazer uma def com esse bloco de codigo para otimizar
                                    string = str(i['userId'])
                                    passageirosIda += string + ", "
                            for ids in onzeAM:
                                if ids == i['userId']:
                                    string = str(i['userId'])
                                    passageirosVolta += string + ", "
                        
                        elif i['opcao'] == 2:
                            for ids in cincoAM:
                                if ids == i['userId']:
                                    string = str(i['userId'])
                                    passageirosIda += string + ", "
                        
                        elif i['opcao'] == 3:
                            for ids in cincoAM:
                                if ids == i['userId']:
                                    string = str(i['userId'])
                                    passageirosVolta += string + ", "
                    rotaIda = {
                        "data": dia,
                        "hora": 5,
                        "alunos": passageirosIda
                    }

                    rotaVolta = {
                        "data": dia,
                        "hora": 12,
                        "alunos": passageirosVolta
                    }
                    try:
                        addIda = Rota_ida(rotaIda['data'], rotaIda['hora'], rotaIda['alunos'])
                        addVolta = Rota_volta(rotaVolta['data'], rotaVolta['hora'], rotaVolta['alunos'])
                        db.session.add(addIda)
                        db.session.add(addVolta)
                        db.session.commit()
                    except Exception as e:
                        print(e)
                        return 'Rota nao cadastrada: {}'.format(str(e)), 405
                    time.sleep(5)
                