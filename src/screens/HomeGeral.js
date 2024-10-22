import React from 'react';
import Slider from 'react-slick';
import styles from '../styles/HomeGeral.module.css';
import { useNavigate } from 'react-router-dom';
import logo from "../ft/logo.png";
import onibus1 from "../ft/onibus1.png";
import facebook from "../ft/facebook.png";
import instagram from "../ft/instagram.png";
import threads from "../ft/threads.png";
import wpp from "../ft/wpp.png";
import van from "../ft/van.png";
import onibus2 from "../ft/onibus2.png";
import seguranca from "../ft/seguranca.png";
import qualidade from "../ft/qualidade.png";
import foto1 from "../ft/foto1.jpg";
import foto2 from "../ft/foto2.jpg";
import foto3 from "../ft/foto3.jpg";
import foto4 from "../ft/foto4.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomeGeral() {
  const navigate = useNavigate();

  const backAction = () => {
    navigate('/login');
  };

  const FrotaeEquipeAction = () => {
    navigate('/FrotaeEquipe');
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={styles.container}>
      <header className={styles.cabecalho}>
        <img src={logo} className={styles.logo} alt="Logo" />
        <nav className={styles.direcionar}>
          <span onClick={() => scrollToSection('FrotaEquipe')}>Frota e equipe</span>
          <span onClick={() => scrollToSection('servicos')}>Serviços</span>
          <span onClick={() => scrollToSection('trabalhamos')}>Como trabalhamos</span>
          <span onClick={() => scrollToSection('localizacao')}>Localização</span>
        </nav>
        <div className={styles.social}>
          <div className={styles.txtfaleconosco}>Contate-nos</div>
          <div className={styles.socialicon}>
            <img
              src={facebook}
              className={styles.facebook}
              alt="Facebook"
              onClick={() => window.location.href = "https://www.facebook.com/aravansturismo/?locale=pt_BR"}
            />
            <img
              src={instagram}
              className={styles.instagram}
              alt="Instagram"
              onClick={() => window.location.href = "https://www.instagram.com/aravanstur/"}
            />
            <img
              src={threads}
              className={styles.threads}
              alt="Threads"
              onClick={() => window.location.href = "https://www.threads.net/@aravanstur"}
            />
            <img
              src={wpp}
              className={styles.wpp}
              alt="WhatsApp"
              onClick={() => window.location.href = "https://api.whatsapp.com/send?phone=5548999999180&text=WhatsApp%20AraVans"}
            />
          </div>
        </div>
        <button className={styles.botao} onClick={backAction}>Login</button>
      </header>

      <section id="FrotaEquipe" className={styles.corpo}>
        <div className={styles.imagemContainer}>
          <img src={onibus1} className={styles.imagem} alt="Onibus" />
          <div className={styles.overlay}>
            <div className={styles.overlayContent}>
              <span>Conheça nossa frota e equipe!</span>
              <button className={styles.botao} onClick={FrotaeEquipeAction}>Clique!</button>
            </div>
          </div>
        </div>
      </section>

      <section id="servicos" className={styles.Servicos}>
        <div className={styles.titulo}>
          <span>Serviços</span>
        </div>
        <div className={styles.centroServico}>
          {[...Array(4)].map((_, index) => (
            <div className={styles.cardServico} key={index}>
              <img src={van} className={styles.van} alt="Van" />
              <div className={styles.TitServico}>
                <span>{['Transporte universitário', 'Transporte escolar', 'Fretamento empresarial', 'Turismo'][index]}</span>
              </div>
              <div className={styles.descritivoServico}>
                <span>......</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="trabalhamos" className={styles.comotrabalhamos}>
        <div className={styles.titulo}>
          <span>Como trabalhamos?</span>
        </div>
        <div className={styles.centroComotrab}>
          <div className={styles.imgonibus2}>
            <img src={onibus2} className={styles.onibus2} alt="Onibus 2" />
          </div>
          <div className={styles.cmtrabespecif}>
            {[
              { src: seguranca, title: 'Segurança', description: '.....' },
              { src: qualidade, title: 'Qualidade', description: '.....' },
            ].map(({ src, title, description }, index) => (
              <div className={styles.valores} key={index}>
                <div className={styles.divimgicon}>
                  <img src={src} className={styles.imgicon} alt={title} />
                </div>
                <div className={styles.divtxt}>
                  <div className={styles.TTtxt}>
                    <span>{title}</span>
                  </div>
                  <div className={styles.txt}>
                    <span>{description}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="localizacao" className={styles.localizacao}>
        <div className={styles.titulo}>
          <span>Venha até nós!</span>
        </div>
        <div className={styles.meiolocalizacao}>
          <div className={styles.fotoslocal}>
            <Slider {...settings}>
              {[foto1, foto2, foto3, foto4].map((foto, index) => (
                <div key={index}>
                  <img src={foto} alt={`Foto ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                </div>
              ))}
            </Slider>
          </div>
          <div className={styles.linkloc}>
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBloQgYAwgxRmK4wPpBIlyI-u5dxL7DaJc&amp;q=RUA%20ANASTACIO%20JOAO%20DE%20SOUZA%2C%20633%20-%20URUSSANGUINHA%2C%20ARARANGUA%20-%20SC%2C%20Brasil&amp;zoom=16"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeGeral;
