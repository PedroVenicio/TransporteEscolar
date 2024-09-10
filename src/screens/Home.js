import React from 'react';
import styles from '../styles/style.module.css';
import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();

    function backAction() {
        navigate('/login');
    };

    function userCadAction() {
        navigate('/usuario');
    };

    function motoristaCadAction() {
        navigate('/motorista');
    };

    function vanCadAction() {
        navigate('/van');
    };

    return (
        <div className={styles.container}>
            <h1>Tela inicial</h1>
            <button onClick={backAction}>
                Voltar
            </button>
            <button onClick={userCadAction}>
                Usuario
            </button>
            <button onClick={motoristaCadAction}>
                Motorista
            </button>
            <button onClick={vanCadAction}>
                Van
            </button>
        </div>
    );
}

export default Home;
