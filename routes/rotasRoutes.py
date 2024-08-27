from controllers.rotasController import rotas_controller

def rotas(app):
    app.route('/rotas', methods=['POST', 'GET', 'PUT', 'DELETE'])(rotas_controller)

