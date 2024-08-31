from controllers.rotaController import rota_ida_controller, rota_volta_controller

def rota_ida(app):
    app.route('/rota_ida', methods=['POST', 'GET', 'PUT', 'DELETE'])(rota_ida_controller)

def rota_volta(app):
    app.route('/rota_volta', methods=['POST', 'GET', 'PUT', 'DELETE'])(rota_volta_controller)


