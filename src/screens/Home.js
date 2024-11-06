import React, { useState } from 'react';
import styles from '../styles/HomeAdm.module.css';
import { useNavigate } from 'react-router-dom';
import logo from "../ft/logo.png";
import Usuario from './Usuario'; 
import Van from './Van'; 

function Home() {
    const navigate = useNavigate();
    const [resultado, setResultado] = useState('');

    function voltarAction() {
        navigate('/HomeGeral');
    }

    function crudUser() {
        setResultado(<Usuario/>);
    };

    function crudVan() {
        setResultado(<Van/>);
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
                        <button className={styles.botaouserdg} onClick={crudUser}>
                            Usuários
                        </button>
                    </div>
                    <div className={styles.botaovan}>
                        <button className={styles.botaovandg} onClick={crudVan}>
                            Veículos
                        </button>
                    </div>
                </div>
                <div className={styles.resultado}>
                    {resultado}
                </div>
            </div>
        </div>
    );
}

export default Home;
