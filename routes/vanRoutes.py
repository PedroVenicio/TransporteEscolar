from controllers.vanController import van_controller

def van(app):
    app.route('/van', methods=['POST', 'GET', 'PUT', 'DELETE'])(van_controller)

