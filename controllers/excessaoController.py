from flask import request
from models.excessao import Excessao
from database.db import db

def excessao_controller():
        if request.method == 'POST':
            try:
                data = request.get_json()
                print(data)
                excessao = Excessao(data['descricao'], data['status'])
                db.session.add(excessao)
                db.session.commit()
                return 'excessao cadastrada com sucesso', 200
            except Exception as e:
                return 'A excessao não foi cadastrada Error: {}'.format(str(e)), 405
            
        elif request.method == 'GET':
            try:
                data = excessao.query.all()
                lista = {'excessoes': [excessao.to_dict() for excessao in data]}
                return lista
            except Exception as e:
                return 'Não foi possível buscar excessao. Error: {}'.format(str(e)), 405

        elif request.method == 'PUT':
            try:
                data = request.get_json()
                put_excessao_id = data['id']
                put_excessao = Excessao.query.get(put_excessao_id)
                if put_excessao is None:
                    return {'error': 'excessao não encontrada'}, 404
                put_excessao.descricao = data.get('descricao', put_excessao.descricao)
                put_excessao.status = data.get('status', put_excessao.status)
                db.session.commit()
                return 'excessao atualizada com sucesso', 200
            except Exception as e:
                return {'error': 'Erro ao atualizar excessao. Erro{}'.format(e)}, 400
        
        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                delete_excessao_id = data['id']
                delete_excessao = Excessao.query.get(delete_excessao_id)
                if delete_excessao is None:
                    return {'error': 'excessao não encontrada'}, 404
                db.session.delete(delete_excessao)
                db.session.commit()
                return 'excessao deletada com sucesso', 200
            except Exception as e:
                return {'error': 'Erro ao deletar excessao. Erro{}'.format(e)}, 400
                
            