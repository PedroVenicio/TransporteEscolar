from controllers.login import Login

def login(app):
    app.route('/login', methods=['POST', 'GET'])(Login)