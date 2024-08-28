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
    rota_ida_id = db.Column(ForeignKey('rota.id'), nullable=False)
    rota_volta_id = db.Column(ForeignKey('rota.id'), nullable=False)

    rota_ida = relationship('Rota', foreign_keys=[rota_ida_id], backref='rotas_ida')
    rota_volta = relationship('Rota', foreign_keys=[rota_volta_id], backref='rotas_volta')


    def __init__(self, rota_ida_id, rota_volta_id):
        self.rota_ida_id = rota_ida_id
        self.rota_volta_id = rota_volta_id