from database.db import db

class Motorista(db.Model):
    def to_dict(self):
        return{
            'id': self.id,
            'nome': self.nome,
            'endereco': self.endereco,
            'bairro': self.bairro,
            'cidade': self.cidade,
            'login': self.login,
            'senha': self.senha,
            'cpf': self.cpf,
            'telefone': self.telefone,
            'email': self.email,
            'foto': self.foto,
            'status': self.status
        }
    
    id = db.Column(db.Integer, primary_key = True, nullable=False, unique=True)
    nome = db.Column(db.String(100), nullable=False)
    endereco = db.Column(db.String(100), nullable=False)
    bairro = db.Column(db.String(100), nullable=False)
    cidade = db.Column(db.String(100), nullable=False)
    login = db.Column(db.String(100), nullable=False)
    senha = db.Column(db.String(100), nullable=False)
    cpf = db.Column(db.Integer, nullable=False)
    telefone = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(100), nullable=False)
    foto = db.Column(db.String(1000), nullable=False)
    status = db.Column(db.Boolean)

    def __init__(self, nome, endereco, bairro, cidade, login, senha, cpf, telefone, email, foto, status):
        self.nome = nome
        self.endereco = endereco
        self.bairro = bairro
        self.cidade = cidade
        self.login = login
        self.senha = senha
        self.cpf = cpf
        self.telefone = telefone
        self.email = email
        self.foto = foto
        self.status = status

    def verify_senha(self, senha):
        return self.senha == senha
        