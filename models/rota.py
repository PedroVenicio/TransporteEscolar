from database.db import db

class Rota(db.Model):

    __abstract__ = True

    def to_dict(self):
        return{
            'id': self.id,
            'data': self.data,
            'hora': self.hora,
            'alunos': self.alunos
        }
    
    id = db.Column(db.Integer, primary_key = True, nullable=False, unique=True)
    data = db.Column(db.Date, nullable=False)
    hora = db.Column(db.Integer, nullable=False)
    alunos = db.Column(db.Text, nullable=False)


    def __init__(self, data, hora, alunos):
        self.data = data
        self.hora = hora
        self.alunos = alunos


class Rota_ida(Rota):
    __tablename__ = 'rota_ida'

class Rota_volta(Rota):
    __tablename__ = 'rota_volta'