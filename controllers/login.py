from flask import request, jsonify
from flask_jwt_extended import create_access_token
from models.usuario import Usuario
from models.motorista import Motorista

def Login():
    data = request.get_json()

    if not data or not data.get('login') or not data.get('senha'):
        return jsonify({"msg": "Login ou senha inválidos"}), 400
    
    usuario = Usuario.query.filter_by(login=data['login']).first()
    motorista = Motorista.query.filter_by(login=data['login']).first()

    if usuario and usuario.verify_senha(data['senha']):
        if usuario.status == True:
            additional_claims = {"userId": usuario.id, "adm": usuario.adm, "motorista": False}
            access_token = create_access_token(identity=usuario.id, additional_claims=additional_claims)
            return jsonify(access_token=access_token), 200
        else:
            return jsonify({"msg": "Usuário desativado"}), 401

    elif motorista and motorista.verify_senha(data['senha']):
        if motorista.status == True:
            additional_claims = {"userId": motorista.id, "motorista": True, "adm": False}
            access_token = create_access_token(identity=motorista.id, additional_claims=additional_claims)
            return jsonify(access_token=access_token), 200
        else:
            return jsonify({"msg": "Usuário desativado"}), 401
        
    return jsonify({"msg": "Credenciais inválidas"}), 401