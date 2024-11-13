from database.db import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Excessao(db.Model):
    def to_dict(self):
        return{
            'id': self.id,
            'descricao': self.descricao,
            'status': self.status,
            'opcaoIda': self.opcaoIda,
            'opcaoVolta': self.opcaoVolta,
            'userId': self.userId
        }
    
    id = db.Column(db.Integer, primary_key = True, nullable=False, unique=True)
    descricao = db.Column(db.String(100), nullable=False)
    status = db.Column(db.Boolean, nullable=False)
    opcaoIda = db.Column(db.Integer)
    opcaoVolta = db.Column(db.Integer)
    userId = db.Column(ForeignKey('usuario.id'))

    usuario = relationship('Usuario', backref='excessao')

    def __init__(self, descricao, status, opcaoIda, opcaoVolta, userId):
        self.descricao = descricao
        self.status = status
        self.opcaoIda = opcaoIda
        self.opcaoVolta = opcaoVolta
        self.userId = userId