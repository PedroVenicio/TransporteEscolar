from controllers.motoristaController import motorista_controller

def motorista(app):
    app.route('/motorista', methods=['POST', 'GET', 'PUT', 'DELETE'])(motorista_controller)

