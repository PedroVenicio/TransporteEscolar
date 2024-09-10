from database.db import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Votacao(db.Model):
    def to_dict(self):
        return{
            'id': self.id,
            'opcao': self.opcao,
            'userId': self.userId,
        }
    
    id = db.Column(db.Integer, primary_key = True, nullable=False, unique=True)
    opcao = db.Column(db.Integer, nullable=False)
    userId = db.Column(ForeignKey('usuario.id'), nullable=False)

    usuario = relationship('Usuario', backref='votacao')

    def __init__(self, opcao, userId):
        self.opcao = opcao
        self.userId = userId