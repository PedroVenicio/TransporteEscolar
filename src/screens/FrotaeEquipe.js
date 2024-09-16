import React from 'react';
import styles from '../styles/FrotaeEquipe.module.css';
import { useNavigate } from 'react-router-dom';

function FrotaeEquipe() {

    const navigate = useNavigate();

    function voltarAction() {
        navigate('/HomeGeral');
    };

    return (
        <div className={styles.container}>
            <h1>Frota e Equipe</h1>
            <button onClick={voltarAction}>
                Voltar
            </button>
        </div>
    );
}

export default FrotaeEquipe;
