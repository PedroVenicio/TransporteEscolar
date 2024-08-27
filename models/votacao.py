from database.db import db

class Votacao(db.Model):
    def to_dict(self):
        return{
            'id': self.id,
            'opcao': self.opcao,
        }
    
    id = db.Column(db.Integer, primary_key = True, nullable=False, unique=True)
    opcao = db.Column(db.Integer, nullable=False)

    def __init__(self, opcao):
        self.opcao = opcao