from controllers.rota_idaController import rota_ida_controller

def rota_ida(app):
    app.route('/rota_ida', methods=['POST', 'GET', 'PUT', 'DELETE'])(rota_ida_controller)

