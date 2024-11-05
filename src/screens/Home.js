import React from 'react';
import styles from '../styles/HomeAdm.module.css';
import { useNavigate } from 'react-router-dom';
import logo from "../ft/logo.png";
import Van from './Van';

function Home() {

    const navigate = useNavigate();

    function voltarAction() {
        navigate('/HomeGeral');
    }

    function userCadAction() {
        navigate('/usuario');
    };

    function vanCadAction() {
        navigate('/van');
    };  

    return (
        <div className={styles.container}>
            <div className={styles.cabecalhoft}>
                <img src={logo} className={styles.logo} alt="Logo" />
                <button className={styles.botao} onClick={voltarAction}>
                    Voltar
                </button>
            </div>
            <div className={styles.meio}>
                <div className={styles.central}>
                    <div className={styles.botaouser}>
                        <button className={styles.botaouserdg} onClick={userCadAction}>
                            Usuários
                        </button>
                    </div>
                    <div className={styles.botaovan}>
                        <button className={styles.botaovandg} onClick={vanCadAction}>
                            Veículos
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Home;
