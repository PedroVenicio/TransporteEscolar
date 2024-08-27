from database.db import db

class Motorista(db.Model):
    def to_dict(self):
        return{
            'id': self.id,
            'cpf': self.cpf,
            'nome': self.nome,
            'telefone': self.telefone,
            'email': self.email,
            'endereco': self.endereco,
            'bairro': self.bairro,
            'cidade': self.cidade,
            'login': self.login,
            'senha': self.senha
        }
    
    id = db.Column(db.Integer, primary_key = True, nullable=False, unique=True)
    nome = db.Column(db.String(100), nullable=False)
    cpf = db.Column(db.Integer, nullable=False)
    telefone = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(100), nullable=False)
    endereco = db.Column(db.String(100), nullable=False)
    bairro = db.Column(db.String(100), nullable=False)
    cidade = db.Column(db.String(100), nullable=False)
    login = db.Column(db.String(100), nullable=False)
    senha = db.Column(db.String(100), nullable=False)

    def __init__(self, nome, cpf, telefone, email, endereco, bairro, cidade, login, senha):
        self.nome = nome
        self.cpf = cpf
        self.telefone = telefone
        self.email = email
        self.endereco = endereco
        self.bairro = bairro
        self.cidade = cidade
        self.login = login
        self.senha = senha
        