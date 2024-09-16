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

  function backAction() {
    navigate('/login');
  };

  function FrotaeEquipeAction() {
    navigate('/FrotaeEquipe');
  };

  function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

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
      <div className={styles.cabecalho}>
        <img src={logo} className={styles.logo} />
        <div className={styles.direcionar}>
          <span onClick={() => scrollToSection('FrotaEquipe')}>Frota e equipe</span>
          <span onClick={() => scrollToSection('servicos')}>Serviços</span>
          <span onClick={() => scrollToSection('trabalhamos')}>Como trabalhamos</span>
          <span onClick={() => scrollToSection('localizacao')}>Localização</span>
        </div>
        <nav className={styles.social}>
          <div className={styles.txtfaleconosco}>
            Contate-nos
          </div>
          <div className={styles.socialicon}>
            <img
              src={facebook}
              className={styles.facebook}
              onClick={() => window.location.href = "https://www.facebook.com/aravansturismo/?locale=pt_BR"}
            />
            <img
              src={instagram}
              className={styles.instagram}
              onClick={() => window.location.href = "https://www.instagram.com/aravanstur/"}
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
        </nav>
        <button className={styles.botao} onClick={backAction}>
          Login
        </button>
      </div>

      <div id="FrotaEquipe" className={styles.corpo}>
        <div className={styles.imagemContainer}>
          <img src={onibus1} className={styles.imagem} alt="Onibus" />
          <div className={styles.overlay}>
            <div className={styles.overlayContent}>
              <txt>Conheça nossa frota e equipe!</txt>
              <button onClick={FrotaeEquipeAction}>Clique!</button>
            </div>
          </div>
        </div>
      </div>

      <div id="servicos" className={styles.Servicos}>
        <div className={styles.titulo}>
          <txt>Serviços</txt>
        </div>
        <div className={styles.centroServico}>
          <div className={styles.cardServico}>
            <img src={van} className={styles.van} />
            <div className={styles.TitServico}>
              <txt>Transporte universitário</txt>
            </div>
            <div className={styles.descritivoServico}>
              <txt>......</txt>
            </div>
          </div>

          <div className={styles.cardServico}>
            <img src={van} className={styles.van} />
            <div className={styles.TitServico}>
              <txt>Transporte escolar
              </txt>
            </div>
            <div className={styles.descritivoServico}>
              <txt>......</txt>
            </div>
          </div>

          <div className={styles.cardServico}>
            <img src={van} className={styles.van} />
            <div className={styles.TitServico}>
              <txt>Fretamento empresarial</txt>
            </div>
            <div className={styles.descritivoServico}>
              <txt>......</txt>
            </div>
          </div>

          <div className={styles.cardServico}>
            <img src={van} className={styles.van} />
            <div className={styles.TitServico}>
              <txt>Agência de viagem</txt>
            </div>
            <div className={styles.descritivoServico}>
              <txt>......</txt>
            </div>
          </div>

          <div className={styles.cardServico}>
            <img src={van} className={styles.van} />
            <div className={styles.TitServico}>
              <txt>Turismo</txt>
            </div>
            <div className={styles.descritivoServico}>
              <txt>......</txt>
            </div>
          </div>
        </div>
      </div>

      <div id="trabalhamos" className={styles.comotrabalhamos}>
        <div className={styles.titulo}>
          <txt>Como trabalhamos?</txt>
        </div>
        <div className={styles.centroComotrab}>
          <div className={styles.imgonibus2}>
            <img src={onibus2} className={styles.onibus2} />
          </div>
          <div className={styles.cmtrabespecif}>
            <div className={styles.valores}>
              <div className={styles.divimgicon}>
                <img src={seguranca} className={styles.imgicon} />
              </div>
              <div className={styles.divtxt}>
                <div className={styles.TTtxt}>
                  <txt>Segurança</txt>
                </div>
                <div className={styles.txt}>
                  <txt>.....</txt>
                </div>
              </div>
            </div>
            <div className={styles.valores}>
              <div className={styles.divimgicon}>
                <img src={qualidade} className={styles.imgicon} />
              </div>
              <div className={styles.divtxt}>
                <div className={styles.TTtxt}>
                  <txt>Qualidade</txt>
                </div>
                <div className={styles.txt}>
                  <txt>.....</txt>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="localizacao" className={styles.localizacao}>
        <div className={styles.titulo}>
          <txt>Venha até nós!</txt>
        </div>
        <div className={styles.meiolocalizacao}>
          <div className={styles.fotoslocal}>
            <Slider {...settings}>
              <div>
                <img src={foto1} alt="Foto 1" style={{ width: '100%', height: 'auto' }} />
              </div>
              <div>
                <img src={foto2} alt="Foto 2" style={{ width: '100%', height: 'auto' }} />
              </div>
              <div>
                <img src={foto3} alt="Foto 3" style={{ width: '100%', height: 'auto' }} />
              </div>
              <div>
                <img src={foto4} alt="Foto 4" style={{ width: '100%', height: 'auto' }} />
              </div>
            </Slider>
          </div>
          <div className={styles.linkloc}>
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBloQgYAwgxRmK4wPpBIlyI-u5dxL7DaJc&amp;q=RUA%20ANASTACIO%20JOAO%20DE%20SOUZA%2C%20633%20-%20URUSSANGUINHA%2C%20ARARANGUA%20-%20SC%2C%20Brasil&amp;zoom=16allowfullscreen"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeGeral;
