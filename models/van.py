from database.db import db

class Van(db.Model):
    def to_dict(self):
        return{
            'id': self.id,
            'marca': self.marca,
            'modelo': self.modelo,
            'capacidade': self.capacidade,
            'placa': self.placa,
        }
    
    id = db.Column(db.Integer, primary_key = True, nullable=False, unique=True)
    marca = db.Column(db.String(100), nullable=False)
    modelo = db.Column(db.String(100), nullable=False)
    capacidade = db.Column(db.Integer, nullable=False)
    placa = db.Column(db.String(100), nullable=False)

    def __init__(self, marca, modelo, capacidade, placa):
        self.marca = marca
        self.modelo = modelo
        self.capacidade = capacidade
        self.placa = placa