import React from 'react';
import './style/style.css';
import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();

    function backAction() {
        navigate('/login');
    };

    function userCadAction() {
        navigate('/usuario');
    };

    return (
        <div>
            <h1>Tela inicial</h1>
            <button onClick={backAction}>
                Voltar
            </button>
            <button onClick={userCadAction}>
                Usuario
            </button>
        </div>
    );
}

export default Home;
