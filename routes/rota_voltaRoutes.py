from controllers.rota_voltaController import rota_volta_controller

def rota_volta(app):
    app.route('/rota_volta', methods=['POST', 'GET', 'PUT', 'DELETE'])(rota_volta_controller)

