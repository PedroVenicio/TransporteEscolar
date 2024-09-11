import React from 'react';
import styles from '../styles/HomeGeral.module.css';
import { useNavigate } from 'react-router-dom';
import logo from "../ft/logo.png";
import onibus1 from "../ft/onibus1.jpg";
import facebook from "../ft/facebook.png";
import instagram from "../ft/instagram.png";
import threads from "../ft/threads.png";
import wpp from "../ft/wpp.png";

function HomeGeral() {
  const navigate = useNavigate();

  function backAction() {
    navigate('/login');
  }

  function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.cabecalho}>
        <img src={logo} className={styles.logo} />
        <div className={styles.direcionar}>
          <span onClick={() => scrollToSection('home')}>Home</span>
          <span onClick={() => scrollToSection('servicos')}>Serviços</span>
          <span onClick={() => scrollToSection('trabalhamos')}>Como trabalhamos</span>
          <span onClick={() => scrollToSection('localizacao')}>Localização</span>
        </div>
        <div className={styles.social}>
          <img 
            src={facebook} 
            className={styles.facebook} 
            onClick={() => window.location.href = "https://www.facebook.com/aravansturismo/?locale=pt_BR"} 
          />
          <img 
            src={instagram} 
            className={styles.instagram} 
            onClick={() => window.location.href = "https://www.instagram.com/explore/locations/965953128/ara-vans-viagens-e-turismo/"}
          />
          <img src={threads} 
            className={styles.threads} 
            onClick={() => window.location.href = "https://www.threads.net/@aravanstur"}
          />
          <img src={wpp} 
            className={styles.wpp} 
            onClick={() => window.location.href = "https://api.whatsapp.com/send?phone=5548999999180&text=WhatsApp%20AraVans"}
          />
        </div>
        <button className={styles.botao} onClick={backAction}>
          Login
        </button>
      </div>

      <div id="home" className={styles.corpo}>
        <img src={onibus1} className={styles.onibus1} alt="Onibus" />
        <div className={styles.onibus1Overlay}></div>
      </div>

      <div id="servicos" className={styles.Servicos}>
        <h2>Serviços</h2>
        
      </div>

      <div id="trabalhamos" className={styles.Comotrabalhamos}>
        <h2>Como trabalhamos</h2>
        
      </div>

      <div id="localizacao" className={styles.Localizacao}>
        <h2>Localização</h2>
        
      </div>
    </div>
  );
}

export default HomeGeral;
