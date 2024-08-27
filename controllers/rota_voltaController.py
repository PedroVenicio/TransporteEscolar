from flask import request
from models.rota import Rota
from database.db import db

def rota_volta_controller():
        if request.method == 'POST':
            try:
                data = request.get_json()
                print(data)
                rota_volta = Rota(data['data'], data['hora'], data['alunos'])
                db.session.add(rota_volta)
                db.session.commit()
                return 'rota_volta cadastrada com sucesso', 200
            except Exception as e:
                return 'A rota_volta não foi cadastrada Error: {}'.format(str(e)), 405
            
        elif request.method == 'GET':
            try:
                data = Rota.query.all()
                lista = {'rotas_volta': [rota_volta.to_dict() for rota_volta in data]}
                return lista
            except Exception as e:
                return 'Não foi possível buscar rotas_volta. Error: {}'.format(str(e)), 405

        elif request.method == 'PUT':
            try:
                data = request.get_json()
                put_rota_volta_id = data['id']
                put_rota_volta = rota_volta.query.get(put_rota_volta_id)
                if put_rota_volta is None:
                    return {'error': 'rota_volta não encontrada'}, 404
                put_rota_volta.data = data.get('data', put_rota_volta.data)
                put_rota_volta.hora = data.get('hora', put_rota_volta.hora)
                put_rota_volta.alunos = data.get('alunos', put_rota_volta.alunos)
                db.session.commit()
                return 'rota_volta atualizada com sucesso', 200
            except Exception as e:
                return {'error': 'Erro ao atualizar rota_volta. Erro{}'.format(e)}, 400
        
        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                delete_rota_volta_id = data['id']
                delete_rota_volta = Rota.query.get(delete_rota_volta_id)
                if delete_rota_volta is None:
                    return {'error': 'rota_volta não encontrada'}, 404
                db.session.delete(delete_rota_volta)
                db.session.commit()
                return 'rota_volta deletada com sucesso', 200
            except Exception as e:
                return {'error': 'Erro ao deletar rota_volta. Erro{}'.format(e)}, 400
                
            