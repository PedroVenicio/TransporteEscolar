import React, { useState, useEffect } from 'react';
import styles from '../styles/Frota.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../ft/logo.png";
import logo3 from "../ft/logo3.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Frota() {
    const navigate = useNavigate();
    const [myCar, setMyCar] = useState("");
    const [get, setGet] = useState([]);

    async function getVans() {
        try {
            const response = await axios.get('http://localhost:3000/van');
            setGet(response.data.vans || []);
            const vans = response.data.vans
            const primeira = vans[0]
            setMyCar(primeira.placa)
        } catch (error) {
            console.log('Erro ao obter vans: ', error);
        }
    }

    useEffect(() => {
        getVans();
    }, []);

    const filtrar = get.filter(filtro => filtro.placa.toLowerCase()===(myCar.toLowerCase()));

    function b64toimg(base64) {
        const base64data = base64.split(',')[1];
        const binaryString = window.atob(base64data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
        const blob = new Blob([bytes], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        return <img src={url} alt="van" />;
    }

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
                <img src={logo3} className={styles.logo} alt="Logo" />
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
                                {get.map((van) => (
                                    <option value={van.placa}>{van.marca} {van.modelo}</option>
                                ))}

                            </select>
                        </div>
                    </div>
                    <div className={styles.carroseldiv}>
                        {filtrar.map((van) => (
                            <div className={styles.containerveiculos}>
                            <div key={van.id} className={styles.carrosel}>
                                <Slider {...settings}>
                                    <div>
                                        {b64toimg(van.foto1)}
                                    </div>
                                    <div>
                                        {b64toimg(van.foto2)}
                                    </div>
                                    <div>
                                        {b64toimg(van.foto3)}
                                    </div>
                                    <div>
                                        {b64toimg(van.foto4)}
                                    </div>
                                </Slider>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Frota;
