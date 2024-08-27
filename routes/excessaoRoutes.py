from controllers.excessaoController import excessao_controller

def excessao(app):
    app.route('/excessao', methods=['POST', 'GET', 'PUT', 'DELETE'])(excessao_controller)

