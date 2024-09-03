import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    function loginAction() {
        navigate('/Home');
    };

    return (
        <div>
            <h1>Tela de Login</h1>
            <button onClick={loginAction}>
                Login
            </button>
        </div>
    );
}

export default Login;
