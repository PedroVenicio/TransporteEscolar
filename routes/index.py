from routes.usuarioRoutes import usuario
from routes.motoristaRoutes import motorista
from routes.vanRoutes import van
from routes.rotaRoutes import rota_ida, rota_volta
from routes.rotasRoutes import rotas
from routes.votacaoRoutes import votacao
from routes.excessaoRoutes import excessao
from routes.loginRoutes import login

def default_routes(app):
    login(app)
    usuario(app)
    motorista(app)
    van(app)
    rota_volta(app)
    rota_ida(app)
    rotas(app)
    votacao(app)
    excessao(app)