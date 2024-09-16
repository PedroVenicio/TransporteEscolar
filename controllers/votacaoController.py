from flask import request
from models.votacao import Votacao
from models.usuario import Usuario
from database.db import db
from flask_jwt_extended import jwt_required

votos = ['vou e volto', 'vou, mas não volto', 'não vou, mas volto', 'não vou e não volto']

@jwt_required()
def votacao_controller():
        if request.method == 'POST':
            try:
                votacao = request.get_json()
                print(votacao)
                idUser = votacao['userId']
                for i in votos:
                    if i == votacao['opcao']:
                        opcao = votos.index(i) + 1
                        data = {"opcao": opcao, "userId": idUser}
                voto = Votacao(data['opcao'], data['userId'])
                db.session.add(voto)

                put_statsVotacao_id = data['userId']
                put_statsVotacao = Usuario.query.get(put_statsVotacao_id)
                put_statsVotacao.voto = data.get('voto', 1)
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
                put_votacao.userId = data.get('userId', put_votacao.userId)
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
                
            