from flask import request
from models.rotas import Rotas
from database.db import db

def rotas_controller():
        if request.method == 'POST':
            try:
                data = request.get_json()
                print(data)
                rotas = Rotas(data['rota_ida_id'], data['rota_volta_id'])
                db.session.add(rotas)
                db.session.commit()
                return 'rota cadastrada com sucesso', 200
            except Exception as e:
                return 'A rota não foi cadastrada Error: {}'.format(str(e)), 405
            
        elif request.method == 'GET':
            try:
                data = rotas.query.all()
                lista = {'rotas': [rotas.to_dict() for rotas in data]}
                return lista
            except Exception as e:
                return 'Não foi possível buscar rotas. Error: {}'.format(str(e)), 405

        elif request.method == 'PUT':
            try:
                data = request.get_json()
                put_rotas_id = data['id']
                put_rotas = rotas.query.get(put_rotas_id)
                if put_rotas is None:
                    return {'error': 'rotas não encontrada'}, 404
                put_rotas.rota_ida_id = data.get('rota_ida_id', put_rotas.rota_ida_id)
                put_rotas.rota_volta_id = data.get('rota_volta_id', put_rotas.rota_volta_id)
                db.session.commit()
                return 'rota atualizada com sucesso', 200
            except Exception as e:
                return {'error': 'Erro ao atualizar rota. Erro{}'.format(e)}, 400
        
        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                delete_rotas_id = data['id']
                delete_rotas = rotas.query.get(delete_rotas_id)
                if delete_rotas is None:
                    return {'error': 'rota não encontrada'}, 404
                db.session.delete(delete_rotas)
                db.session.commit()
                return 'rota deletada com sucesso', 200
            except Exception as e:
                return {'error': 'Erro ao deletar rota. Erro{}'.format(e)}, 400
                
            