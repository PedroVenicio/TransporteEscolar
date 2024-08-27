from routes.usuarioRoutes import usuario
from routes.motoristaRoutes import motorista
from routes.vanRoutes import van
from routes.rota_voltaRoutes import rota_volta
from routes.rota_idaRoutes import rota_ida
from routes.rotasRoutes import rotas
from routes.votacaoRoutes import votacao
from routes.excessaoRoutes import excessao

def default_routes(app):
    usuario(app)
    motorista(app)
    van(app)
    rota_volta(app)
    rota_ida(app)
    rotas(app)
    votacao(app)
    excessao(app)