from database.db import db

class Van(db.Model):
    def to_dict(self):
        return{
            'id': self.id,
            'marca': self.marca,
            'modelo': self.modelo,
            'capacidade': self.capacidade,
            'placa': self.placa,
            'foto1': self.foto1,
            'foto2': self.foto2,
            'foto3': self.foto3,
            'foto4': self.foto4
        }
    
    id = db.Column(db.Integer, primary_key = True, nullable=False, unique=True)
    marca = db.Column(db.String(100), nullable=False)
    modelo = db.Column(db.String(100), nullable=False)
    capacidade = db.Column(db.Integer, nullable=False)
    placa = db.Column(db.String(100), nullable=False)
    foto1 = db.Column(db.String(1000), nullable=False)
    foto2 = db.Column(db.String(1000), nullable=False)
    foto3 = db.Column(db.String(1000), nullable=False)
    foto4 = db.Column(db.String(1000), nullable=False)

    def __init__(self, marca, modelo, capacidade, placa, foto1, foto2, foto3, foto4):
        self.marca = marca
        self.modelo = modelo
        self.capacidade = capacidade
        self.placa = placa
        self.foto1 = foto1
        self.foto2 = foto2
        self.foto3 = foto3
        self.foto4 = foto4