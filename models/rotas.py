from database.db import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Rotas(db.Model):
    def to_dict(self):
        return{
            'id': self.id,
            'rota_ida_id': self.rota_ida_id,
            'rota_volta_id': self.rota_volta_id,
        }
    
    id = db.Column(db.Integer, primary_key = True, nullable=False, unique=True)
    rota_ida_id = db.Column(ForeignKey('rota_ida.id'), nullable=False)
    rota_volta_id = db.Column(ForeignKey('rota_volta.id'), nullable=False)

    rota_ida = relationship('Rota_ida', backref='rotas')
    rota_volta = relationship('Rota_volta', backref='rotas')


    def __init__(self, rota_ida_id, rota_volta_id):
        self.rota_ida_id = rota_ida_id
        self.rota_volta_id = rota_volta_id