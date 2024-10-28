from flask import request
from models.usuario import Usuario
from database.db import db
from flask_jwt_extended import create_access_token, jwt_required, JWTManager

def usuario_controller():
        if request.method == 'POST':
            try:
                data = request.get_json()
                print(data)
                usuario = Usuario(data['nome'], data['horarioida'], data['horariovolta'], data['endereco'], data['bairro'], data['cidade'], data['login'], data['senha'], data['cpf'], data['telefone'], data['email'], data['foto'], data['adm'], data['voto'])
                db.session.add(usuario)
                db.session.commit()
                return 'usuario cadastrado com sucesso', 200
            except Exception as e:
                return 'O usuario não foi cadastrado Error: {}'.format(str(e)), 405
            
        elif request.method == 'GET':
            try:
                data = Usuario.query.all()
                lista = {'usuarios': [usuario.to_dict() for usuario in data]}
                return lista
            except Exception as e:
                return 'Não foi possível buscar usuarios. Error: {}'.format(str(e)), 405

        elif request.method == 'PUT':
            try:
                data = request.get_json()
                put_usuario_id = data['id']
                put_usuario = Usuario.query.get(put_usuario_id)
                if put_usuario is None:
                    return {'error': 'usuario não encontrado'}, 404
                put_usuario.nome = data.get('nome', put_usuario.nome)
                put_usuario.horarioida = data.get('horarioida', put_usuario.horarioida)
                put_usuario.horariovolta = data.get('horariovolta', put_usuario.horariovolta)
                put_usuario.endereco = data.get('endereco', put_usuario.endereco)
                put_usuario.bairro = data.get('bairro', put_usuario.bairro)
                put_usuario.cidade = data.get('cidade', put_usuario.cidade)
                put_usuario.login = data.get('login', put_usuario.login)
                put_usuario.senha = data.get('senha', put_usuario.senha)
                put_usuario.cpf = data.get('cpf', put_usuario.cpf)
                put_usuario.telefone = data.get('telefone', put_usuario.telefone)
                put_usuario.email = data.get('email', put_usuario.email)
                put_usuario.voto = data.get('voto', put_usuario.voto)
                put_usuario.foto = data.get('foto', put_usuario.foto)
                put_usuario.adm = data.get('adm', put_usuario.adm)
                db.session.commit()
                return 'usuario atualizado com sucesso', 200
            except Exception as e:
                return {'error': 'Erro ao atualizar usuario. Erro{}'.format(e)}, 400
        
        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                delete_usuario_id = data['id']
                delete_usuario = Usuario.query.get(delete_usuario_id)
                if delete_usuario is None:
                    return {'error': 'usuario não encontrado'}, 404
                db.session.delete(delete_usuario)
                db.session.commit()
                return 'usuario deletado com sucesso', 200
            except Exception as e:
                return {'error': 'Erro ao deletar usuario. Erro{}'.format(e)}, 400
                
            