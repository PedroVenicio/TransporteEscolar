import React, { useState } from 'react';
import styles from '../styles/HomeAdm.module.css';
import { useNavigate } from 'react-router-dom';
import logo from "../ft/logo.png";
import logo3 from "../ft/logo3.png";
import Usuario from './Usuario';
import Van from './Van';
import Texto from './Texto';

function Home() {
    const navigate = useNavigate();
    const [resultado, setResultado] = useState(Texto);

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
            <div className={styles.meio}>
                <div className={styles.central}>
                <img src={logo3} className={styles.logo} alt="Logo" />
                <div className={styles.txtcadastro}>
                    Cadastros!
                </div>
                    <div className={styles.botao}>
                        <button className={styles.botaodg} onClick={crudUser}>
                            Usuários
                        </button>
                    </div>
                    <div className={styles.botao}>
                        <button className={styles.botaodg} onClick={crudVan}>
                            Veículos
                        </button>
                    </div>
                    <div className={styles.botao}>
                        <button className={styles.botaodg} onClick={voltarAction}>
                            Voltar
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
