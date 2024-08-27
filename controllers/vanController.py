from flask import request
from models.van import Van
from database.db import db

def van_controller():
        if request.method == 'POST':
            try:
                data = request.get_json()
                print(data)
                van = Van(data['marca'], data['modelo'], data['capacidade'])
                db.session.add(van)
                db.session.commit()
                return 'van cadastrada com sucesso', 200
            except Exception as e:
                return 'A van não foi cadastrada Error: {}'.format(str(e)), 405
            
        elif request.method == 'GET':
            try:
                data = Van.query.all()
                lista = {'vans': [van.to_dict() for van in data]}
                return lista
            except Exception as e:
                return 'Não foi possível buscar vans. Error: {}'.format(str(e)), 405

        elif request.method == 'PUT':
            try:
                data = request.get_json()
                put_van_id = data['id']
                put_van = Van.query.get(put_van_id)
                if put_van is None:
                    return {'error': 'van não encontrada'}, 404
                put_van.marca = data.get('marca', put_van.marca)
                put_van.modelo = data.get('modelo', put_van.modelo)
                put_van.capacidade = data.get('capacidade', put_van.capacidade)
                db.session.commit()
                return 'van atualizada com sucesso', 200
            except Exception as e:
                return {'error': 'Erro ao atualizar van. Erro{}'.format(e)}, 400
        
        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                delete_van_id = data['id']
                delete_van = Van.query.get(delete_van_id)
                if delete_van is None:
                    return {'error': 'van não encontrada'}, 404
                db.session.delete(delete_van)
                db.session.commit()
                return 'van deletada com sucesso', 200
            except Exception as e:
                return {'error': 'Erro ao deletar van. Erro{}'.format(e)}, 400
                
            