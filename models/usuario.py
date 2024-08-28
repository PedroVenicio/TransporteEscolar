from database.db import db

class Usuario(db.Model):
    def to_dict(self):
        return{
            'id': self.id,
            'nome': self.nome,
            'horarioida': self.horarioida,
            'horariovolta': self.horariovolta,
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
    horarioida = db.Column(db.Integer, nullable=False)
    horariovolta = db.Column(db.Integer, nullable=False)
    endereco = db.Column(db.String(100), nullable=False)
    bairro = db.Column(db.String(100), nullable=False)
    cidade = db.Column(db.String(100), nullable=False)
    login = db.Column(db.String(100), nullable=False)
    senha = db.Column(db.String(100), nullable=False)
    cpf = db.Column(db.Integer, nullable=False)
    telefone = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(100), nullable=False)


    def __init__(self, nome, horarioida, horariovolta, endereco, bairro, cidade, login, senha, cpf, telefone, email):
        self.nome = nome
        self.horarioida = horarioida
        self.horariovolta = horariovolta
        self.endereco = endereco
        self.bairro = bairro
        self.cidade = cidade
        self.login = login
        self.senha = senha
        self.cpf = cpf
        self.telefone = telefone
        self.email = email