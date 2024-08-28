from database.db import db

class Excessao(db.Model):
    def to_dict(self):
        return{
            'id': self.id,
            'descricao': self.descricao,
            'opcao': self.opcao,
            'status': self.status,
        }
    
    id = db.Column(db.Integer, primary_key = True, nullable=False, unique=True)
    descricao = db.Column(db.String(100), nullable=False)
    opcao = db.Column(db.Integer, nullable=False)
    status = db.Column(db.Boolean, nullable=False)

    def __init__(self, descricao, opcao, status):
        self.descricao = descricao
        self.opcao = opcao
        self.status = status