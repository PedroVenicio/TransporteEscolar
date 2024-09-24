import React from 'react';
import styles from '../styles/HomeAdm.module.css';
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
            <div className={styles.txt}>
            <h1>Escolha o que </h1>
            <h1>deseja gerenciar!</h1>
            </div>
            <button onClick={userCadAction} className={styles.button}>
                Usuário
            </button>
            <button onClick={motoristaCadAction} className={styles.button}>
                Motorista
            </button>
            <button onClick={vanCadAction} className={styles.button}>
                Automóveis
            </button>
            <button onClick={backAction} className={styles.button}>
                Voltar
            </button>
        </div>
    );
}

export default Home;
