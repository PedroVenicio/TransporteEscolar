from flask import request
from models.votacao import Votacao
from database.db import db

def votacao_controller():
        if request.method == 'POST':
            try:
                data = request.get_json()
                print(data)
                votacao = Votacao(data['opcao'])
                db.session.add(votacao)
                db.session.commit()
                return 'votacao cadastrada com sucesso', 200
            except Exception as e:
                return 'A votacao não foi cadastrada Error: {}'.format(str(e)), 405
            
        elif request.method == 'GET':
            try:
                data = Votacao.query.all()
                lista = {'votacoes': [votacao.to_dict() for votacao in data]}
                return lista
            except Exception as e:
                return 'Não foi possível buscar votacao. Error: {}'.format(str(e)), 405

        elif request.method == 'PUT':
            try:
                data = request.get_json()
                put_votacao_id = data['id']
                put_votacao = Votacao.query.get(put_votacao_id)
                if put_votacao is None:
                    return {'error': 'votacao não encontrada'}, 404
                put_votacao.opcao = data.get('opcao', put_votacao.opcao)
                db.session.commit()
                return 'votacao atualizada com sucesso', 200
            except Exception as e:
                return {'error': 'Erro ao atualizar votacao. Erro{}'.format(e)}, 400
        
        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                delete_votacao_id = data['id']
                delete_votacao = Votacao.query.get(delete_votacao_id)
                if delete_votacao is None:
                    return {'error': 'votacao não encontrada'}, 404
                db.session.delete(delete_votacao)
                db.session.commit()
                return 'votacao deletada com sucesso', 200
            except Exception as e:
                return {'error': 'Erro ao deletar votacao. Erro{}'.format(e)}, 400
                
            