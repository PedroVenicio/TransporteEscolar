import React from 'react';
import styles from '../styles/FrotaeEquipe.module.css';
import { useNavigate } from 'react-router-dom';
import logo from "../ft/logo.png";
import adm1 from "../ft/adm1.png";
import adm2 from "../ft/adm2.png";

function FrotaeEquipe() {

    const navigate = useNavigate();

    function voltarAction() {
        navigate('/HomeGeral');
    };

    function scrollToSection(id) {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.cabecalhofteqp}>
                <img src={logo} className={styles.logo} />
                <div className={styles.direcionar}>
                    <span onClick={() => scrollToSection('Equipe')}>Equipe</span>
                    <span onClick={() => scrollToSection('Frota')}>Frota</span>
                </div>
                <button className={styles.botao} onClick={voltarAction}>
                    Voltar
                </button>
            </div>
            <div id="Equipe" className={styles.Equipe}>
                <div className={styles.propietario}>
                <div className={styles.tt}> Propietários</div>
                    <div className={styles.divadm}>
                        <img src={adm1} className={styles.adm} />
                        <img src={adm2} className={styles.adm} />
                    </div>
                </div>
                <div className={styles.funcionarios}>

                </div>
            </div>
            <div id="Frota" className={styles.Frota}>

            </div>
        </div>
    );
}

export default FrotaeEquipe;
