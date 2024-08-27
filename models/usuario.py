from database.db import db

class Usuario(db.Model):
    def to_dict(self):
        return{
            'id': self.id,
            'nome': self.nome,
            'horaida': self.horaida,
            'horavolta': self.horavolta,
            'endereco': self.endereco,
            'bairro': self.bairro,
            'cidade': self.cidade,
            'login': self.login,
            'senha': self.senha,
            'cpf': self.cpf,
            'telefone': self.telefone,
            'email': self.email
        }
    
    id = db.Column(db.Integer, primary_key = True, nullable=False, unique=True)
    nome = db.Column(db.String(100), nullable=False)
    horaida = db.Column(db.Time, nullable=False)
    horavolta = db.Column(db.Time, nullable=False)
    endereco = db.Column(db.String(100), nullable=False)
    bairro = db.Column(db.String(100), nullable=False)
    cidade = db.Column(db.String(100), nullable=False)
    login = db.Column(db.String(100), nullable=False)
    senha = db.Column(db.String(100), nullable=False)
    cpf = db.Column(db.Integer, nullable=False)
    telefone = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(100), nullable=False)


    def __init__(self, nome, horaida, horavolta, endereco, bairro, cidade, login, senha, cpf, telefone, email):
        self.nome = nome
        self.horaida = horaida
        self.horavolta = horavolta
        self.endereco = endereco
        self.bairro = bairro
        self.cidade = cidade
        self.login = login
        self.senha = senha
        self.cpf = cpf
        self.telefone = telefone
        self.email = email