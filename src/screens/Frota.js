import React, { useState } from 'react';
import styles from '../styles/Frota.module.css';
import { useNavigate } from 'react-router-dom';
import logo from "../ft/logo.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ford from "../ft/ford.jpg";
import mercedes from "../ft/mercedes.jpg";
import volvo from "../ft/volvo.jpg";
import Fiat from "../ft/Fiat.jpg";

function Frota() {
    const navigate = useNavigate();
    const [myCar, setMyCar] = useState("Ford");

    function voltarAction() {
        navigate('/HomeGeral');
    }

    function handleChange(event) {
        setMyCar(event.target.value);
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
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
                <div className={styles.Frota}>
                    <div className={styles.escolha}>
                        <div className={styles.titulo}>
                            <p>Escolha o veículo desejado</p>
                        </div>
                        <div className={styles.selectdiv}>
                            <select value={myCar} onChange={handleChange}>
                                <option value="Ford">Ford</option>
                                <option value="Volvo">Volvo</option>
                                <option value="Mercedes">Mercedes</option>
                                <option value="Fiat">Fiat</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.carroseldiv}>
                        <div className={styles.carrosel}>
                            {myCar === "Ford" && (
                                <Slider {...settings}>
                                    <div>
                                        <img src={ford} alt="Ford Car 1" className={styles.image} />
                                    </div>
                                    <div>
                                        <img src={ford} alt="Ford Car 2" className={styles.image} />
                                    </div>
                                    <div>
                                        <img src={ford} alt="Ford Car 3" className={styles.image} />
                                    </div>
                                </Slider>
                            )}

                            {myCar === "Mercedes" && (
                                <Slider {...settings}>
                                    <div>
                                        <img src={mercedes} alt="Mercedes Car 1" className={styles.image} />
                                    </div>
                                    <div>
                                        <img src={mercedes} alt="Mercedes Car 2" className={styles.image} />
                                    </div>
                                    <div>
                                        <img src={mercedes} alt="Mercedes Car 3" className={styles.image} />
                                    </div>
                                </Slider>
                            )}

                            {myCar === "Volvo" && (
                                <Slider {...settings}>
                                    <div>
                                        <img src={volvo} alt="volvo Car 1" className={styles.image} />
                                    </div>
                                    <div>
                                        <img src={volvo} alt="volvo Car 2" className={styles.image} />
                                    </div>
                                    <div>
                                        <img src={volvo} alt="volvo Car 3" className={styles.image} />
                                    </div>
                                </Slider>
                            )}
                            {myCar === "Fiat" && (
                                <Slider {...settings}>
                                    <div>
                                        <img src={Fiat} alt="Fiat Car 1" className={styles.image} />
                                    </div>
                                    <div>
                                        <img src={Fiat} alt="Fiat Car 2" className={styles.image} />
                                    </div>
                                    <div>
                                        <img src={Fiat} alt="Fiat Car 3" className={styles.image} />
                                    </div>
                                </Slider>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Frota;
