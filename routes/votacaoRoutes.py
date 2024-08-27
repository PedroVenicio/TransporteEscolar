from controllers.votacaoController import votacao_controller

def votacao(app):
    app.route('/votacao', methods=['POST', 'GET', 'PUT', 'DELETE'])(votacao_controller)

