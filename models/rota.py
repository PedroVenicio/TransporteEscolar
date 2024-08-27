from database.db import db

class Rota(db.Model):
    def to_dict(self):
        return{
            'id': self.id,
            'data': self.data,
            'hora': self.hora,
            'alunos': self.alunos
        }
    
    id = db.Column(db.Integer, primary_key = True, nullable=False, unique=True)
    data = db.Column(db.Date, nullable=False)
    hora = db.Column(db.Time, nullable=False)
    alunos = db.Column(db.Text, nullable=False)


    def __init__(self, data, hora, alunos):
        self.data = data
        self.hora = hora
        self.alunos = alunos