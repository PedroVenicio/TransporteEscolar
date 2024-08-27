from flask import request
from models.motorista import Motorista
from database.db import db

def motorista_controller():
        if request.method == 'POST':
            try:
                data = request.get_json()
                print(data)
                motorista = Motorista(data['nome'], data['endereco'], data['bairro'], data['cidade'], data['login'], data['senha'], data['cpf'], data['telefone'], data['email'])
                db.session.add(motorista)
                db.session.commit()
                return 'motorista cadastrado com sucesso', 200
            except Exception as e:
                return 'O motorista não foi cadastrado Error: {}'.format(str(e)), 405
            
        elif request.method == 'GET':
            try:
                data = motorista.query.all()
                lista = {'motoristas': [motorista.to_dict() for motorista in data]}
                return lista
            except Exception as e:
                return 'Não foi possível buscar motoristas. Error: {}'.format(str(e)), 405

        elif request.method == 'PUT':
            try:
                data = request.get_json()
                put_motorista_id = data['id']
                put_motorista = Motorista.query.get(put_motorista_id)
                if put_motorista is None:
                    return {'error': 'motorista não encontrado'}, 404
                put_motorista.nome = data.get('nome', put_motorista.nome)
                put_motorista.horaida = data.get('horaida', put_motorista.horaida)
                put_motorista.horavolta = data.get('horavolta', put_motorista.horavolta)
                put_motorista.endereco = data.get('endereco', put_motorista.endereco)
                put_motorista.bairro = data.get('bairro', put_motorista.bairro)
                put_motorista.cidade = data.get('cidade', put_motorista.cidade)
                put_motorista.login = data.get('login', put_motorista.login)
                put_motorista.senha = data.get('senha', put_motorista.senha)
                put_motorista.cpf = data.get('cpf', put_motorista.cpf)
                put_motorista.telefone = data.get('telefone', put_motorista.telefone)
                put_motorista.email = data.get('email', put_motorista.email)
                db.session.commit()
                return 'motorista atualizado com sucesso', 200
            except Exception as e:
                return {'error': 'Erro ao atualizar motorista. Erro{}'.format(e)}, 400
        
        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                delete_motorista_id = data['id']
                delete_motorista = Motorista.query.get(delete_motorista_id)
                if delete_motorista is None:
                    return {'error': 'motorista não encontrado'}, 404
                db.session.delete(delete_motorista)
                db.session.commit()
                return 'motorista deletado com sucesso', 200
            except Exception as e:
                return {'error': 'Erro ao deletar motorista. Erro{}'.format(e)}, 400
                
            