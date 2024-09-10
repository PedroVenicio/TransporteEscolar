import React from 'react';
import styles from '../styles/HomeGeral.module.css';
import { useNavigate } from 'react-router-dom';
import logo from "../ft/logo.png";
import onibus1 from "../ft/onibus1.jpg";

function HomeGeral() {
  const navigate = useNavigate();

  function backAction() {
    navigate('/login');
  }

  return (
    <div className={styles.container}>
      <div className={styles.cabecalho}>
        <img src={logo} className={styles.logo} alt="Logo" />
        <button className={styles.botao} onClick={backAction}>
          Login
        </button>
      </div>
      <div className={styles.corpo}>
        <img src={onibus1} className={styles.onibus1} alt="Onibus" />
        <div className={styles.onibus1Overlay}></div> 
      </div>
      <div className={styles.teste}></div>
    </div>
  );
}

export default HomeGeral;
