import React from 'react';
import styles from '../styles/HomeAdm.module.css';
import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();

    function backAction() {
        navigate('/HomeGeral');
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
            <div className={styles.txtdiv}>
            <txt>Escolha o que </txt>
            <txt>deseja gerenciar!</txt>
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
