from flask import request
from models.rota import Rota
from database.db import db

def rota_ida_controller():
        if request.method == 'POST':
            try:
                data = request.get_json()
                print(data)
                rota_ida = Rota(data['data'], data['hora'], data['alunos'])
                db.session.add(rota_ida)
                db.session.commit()
                return 'rota_ida cadastrada com sucesso', 200
            except Exception as e:
                return 'A rota_ida não foi cadastrada Error: {}'.format(str(e)), 405
            
        elif request.method == 'GET':
            try:
                data = Rota.query.all()
                lista = {'rotas_ida': [rota_ida.to_dict() for rota_ida in data]}
                return lista
            except Exception as e:
                return 'Não foi possível buscar rotas_ida. Error: {}'.format(str(e)), 405

        elif request.method == 'PUT':
            try:
                data = request.get_json()
                put_rota_ida_id = data['id']
                put_rota_ida = rota_ida.query.get(put_rota_ida_id)
                if put_rota_ida is None:
                    return {'error': 'rota_ida não encontrada'}, 404
                put_rota_ida.data = data.get('data', put_rota_ida.data)
                put_rota_ida.hora = data.get('hora', put_rota_ida.hora)
                put_rota_ida.alunos = data.get('alunos', put_rota_ida.alunos)
                db.session.commit()
                return 'rota_ida atualizada com sucesso', 200
            except Exception as e:
                return {'error': 'Erro ao atualizar rota_ida. Erro{}'.format(e)}, 400
        
        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                delete_rota_ida_id = data['id']
                delete_rota_ida = Rota.query.get(delete_rota_ida_id)
                if delete_rota_ida is None:
                    return {'error': 'rota_ida não encontrada'}, 404
                db.session.delete(delete_rota_ida)
                db.session.commit()
                return 'rota_ida deletada com sucesso', 200
            except Exception as e:
                return {'error': 'Erro ao deletar rota_ida. Erro{}'.format(e)}, 400
                
            