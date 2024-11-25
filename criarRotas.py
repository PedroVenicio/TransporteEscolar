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
                hora = int(tempo.strftime("%H""%M")) 

                dataUsuario = Usuario.query.all()
                allUsuarios = {'usuarios': [usuario.to_dict() for usuario in dataUsuario]}
                listUsuario = (allUsuarios['usuarios'])

                dataVotacao = Votacao.query.all()
                allVotacoes = {'votacoes': [votacao.to_dict() for votacao in dataVotacao]}
                listVotacao = (allVotacoes['votacoes'])

                idaMatutino = []
                idaVespertino = []
                idaNoturno = []

                voltaMatutino = []
                voltaVespertino = []
                voltaNoturno = []

                passageirosIda = ""
                passageirosVoltaMatutino = ""
                passageirosVoltaVespertino = ""
                passageirosVoltaNoturno = ""

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
                    if i['horarioida'] == "matutino":
                        idaMatutino.append(i['id'])
                    if i['horarioida'] == "vespertino":
                        idaVespertino.append(i['id'])
                    if i['horarioida'] == "noturno":
                        idaNoturno.append(i['id'])

                    if i['horariovolta'] == "matutino":
                        voltaMatutino.append(i['id'])
                    if i['horariovolta'] == "vespertino":
                        voltaVespertino.append(i['id'])
                    if i['horariovolta'] == "noturno":
                        voltaNoturno.append(i['id'])

                if hora == 1133: #55000 = 5:50:00
                    for i in listVotacao:
                        if i['data'] == dia:
                            print('esta igualllll')
                            if i['opcao'] == 1:
                                for ids in idaMatutino:
                                    if ids == i['userId']: #fazer uma def com esse bloco de codigo para otimizar
                                        string = str(i['userId'])
                                        passageirosIda += string + ", "

                                idaVoltaMatutino = (voltaMatutino + idaMatutino).count(i['userId'])

                                if idaVoltaMatutino > 1:
                                    string = str(i['userId'])
                                    passageirosVoltaMatutino += string + ", "
                                    delete_votacao = Votacao.query.get(i['id'])
                                    db.session.delete(delete_votacao)

                            elif i['opcao'] == 2:
                                for ids in idaMatutino:
                                    if ids == i['userId']:
                                        string = str(i['userId'])
                                        passageirosIda += string + ", "
                                        delete_votacao = Votacao.query.get(i['id'])
                                        db.session.delete(delete_votacao)
                            
                            elif i['opcao'] == 3:
                                for ids in voltaMatutino:
                                    if ids == i['userId']:
                                        string = str(i['userId'])
                                        passageirosVoltaMatutino += string + ", "
                                        delete_votacao = Votacao.query.get(i['id'])
                                        db.session.delete(delete_votacao)

                    rotaIda = {
                        "data": dia,
                        "hora": "matutino",
                        "alunos": passageirosIda
                    }

                    rotaVolta = {
                        "data": dia,
                        "hora": "matutino",
                        "alunos": passageirosVoltaMatutino
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
                
                if hora == 115000: #115000 = 11:50:00
                    for i in listVotacao:
                        if i['data'] == dia:
                            if i['opcao'] == 1:
                                for ids in idaVespertino:
                                    if ids == i['userId']: #fazer uma def com esse bloco de codigo para otimizar
                                        string = str(i['userId'])
                                        passageirosIda += string + ", "

                                idaVoltaVespertino = (voltaVespertino + idaVespertino).count(i['userId'])

                                if idaVoltaVespertino > 1:
                                    string = str(i['userId'])
                                    passageirosVoltaVespertino += string + ", "
                                    delete_votacao = Votacao.query.get(i['id'])
                                    db.session.delete(delete_votacao)

                            elif i['opcao'] == 2:
                                for ids in idaVespertino :
                                    if ids == i['userId']:
                                        string = str(i['userId'])
                                        passageirosIda += string + ", "
                                        delete_votacao = Votacao.query.get(i['id'])
                                        db.session.delete(delete_votacao)

                            elif i['opcao'] == 3:
                                for ids in voltaVespertino:
                                    if ids == i['userId']:
                                        string = str(i['userId'])
                                        passageirosVoltaMatutino += string + ", "
                                        delete_votacao = Votacao.query.get(i['id'])
                                        db.session.delete(delete_votacao)

                                idaMatVoltaVesp = (voltaVespertino + idaMatutino).count(i['userId'])

                                if idaMatVoltaVesp > 1:
                                    string = str(i['userId'])
                                    passageirosVoltaVespertino += string + ", "
                                    delete_votacao = Votacao.query.get(i['id'])
                                    db.session.delete(delete_votacao)

                    rotaIda = {
                        "data": dia,
                        "hora": "vespertino",
                        "alunos": passageirosIda
                    }

                    rotaVolta = {
                        "data": dia,
                        "hora": "vespertino",
                        "alunos": passageirosVoltaVespertino
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


                if hora == 173000: #173000 = 17:30:00
                    for i in listVotacao:
                        if i['data'] == dia:
                            if i['opcao'] == 1:
                                for ids in idaNoturno:
                                    if ids == i['userId']: #fazer uma def com esse bloco de codigo para otimizar
                                        string = str(i['userId'])
                                        passageirosIda += string + ", "

                                idaVoltaNoturno = (voltaNoturno + idaNoturno).count(i['userId'])

                                if idaVoltaNoturno > 1:
                                    string = str(i['userId'])
                                    passageirosVoltaNoturno += string + ", "
                                    delete_votacao = Votacao.query.get(i['id'])
                                    db.session.delete(delete_votacao)

                            elif i['opcao'] == 2:
                                for ids in idaNoturno:
                                    if ids == i['userId']:
                                        string = str(i['userId'])
                                        passageirosIda += string + ", "
                                        delete_votacao = Votacao.query.get(i['id'])
                                        db.session.delete(delete_votacao)
                            
                            elif i['opcao'] == 3:
                                for ids in voltaNoturno:
                                    if ids == i['userId']:
                                        string = str(i['userId'])
                                        passageirosVoltaNoturno += string + ", "
                                        delete_votacao = Votacao.query.get(i['id'])
                                        db.session.delete(delete_votacao)

                                idaMatVoltaNot = (voltaNoturno + idaMatutino).count(i['userId'])
                                idaVespVoltaNot = (voltaNoturno + idaVespertino).count(i['userId'])

                                if idaMatVoltaNot > 1:
                                    string = str(i['userId'])
                                    passageirosVoltaVespertino += string + ", "
                                    delete_votacao = Votacao.query.get(i['id'])
                                    db.session.delete(delete_votacao)
                                
                                if idaVespVoltaNot > 1:
                                    string = str(i['userId'])
                                    passageirosVoltaVespertino += string + ", "
                                    delete_votacao = Votacao.query.get(i['id'])
                                    db.session.delete(delete_votacao)
                                
                    rotaIda = {
                        "data": dia,
                        "hora": "noturno",
                        "alunos": passageirosIda
                    }

                    rotaVolta = {
                        "data": dia,
                        "hora": "noturno",
                        "alunos": passageirosVoltaNoturno
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
                
                