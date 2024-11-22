import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styles from '../styles/Van.module.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Van() {
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [capacidade, setCapacidade] = useState('');
    const [placa, setPlaca] = useState('');
    const [foto1, setFoto1] = useState('');
    const [foto2, setFoto2] = useState('');
    const [foto3, setFoto3] = useState('');
    const [foto4, setFoto4] = useState('');
    const [get, setGet] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const [selectedFiles, setSelectedFiles] = useState({});
    const [id, setId] = useState('');
    const [alterMarca, setAlterMarca] = useState('');
    const [alterModelo, setAlterModelo] = useState('');
    const [alterCapacidade, setAlterCapacidade] = useState('');
    const [alterPlaca, setAlterPlaca] = useState('');
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setOpen1(false);
        setOpenDelete(false);
    };

    function handleOpen(van) {
        setId(van.id);
        setAlterMarca(van.marca);
        setAlterModelo(van.modelo);
        setAlterCapacidade(van.capacidade);
        setAlterPlaca(van.placa);
        setFoto1(van.foto1);
        setFoto2(van.foto2);
        setFoto3(van.foto3);
        setFoto4(van.foto4);
        setOpen(true);
    }

    const handleFile = (e, num) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFiles((prev) => ({ ...prev, [num]: true }));

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64string = reader.result;
                if (num === 1) setFoto1(base64string);
                else if (num === 2) setFoto2(base64string);
                else if (num === 3) setFoto3(base64string);
                else if (num === 4) setFoto4(base64string);
            };
            reader.readAsDataURL(file);
        }
    };

    async function getVans() {
        try {
            const response = await axios.get('http://localhost:3000/van');
            setGet(response.data.vans || []);
        } catch (error) {
            console.log('Erro ao obter vans: ', error);
        }
    }

    function postVan() {
        if (marca && modelo && capacidade && placa) {
            axios.post('http://localhost:3000/van', { marca, modelo, capacidade, placa, foto1, foto2, foto3, foto4 })
                .then(() => {
                    alert('Van cadastrada');
                    setMarca(''); setModelo(''); setCapacidade(''); setPlaca('');
                    setFoto1(''); setFoto2(''); setFoto3(''); setFoto4('');
                    getVans();
                })
                .catch(error => {
                    console.log(error);
                    alert('Não foi possível cadastrar (dados inválidos)');
                });
        } else {
            alert('Insira dados nos campos em branco');
        }
    }

    function putVans() {
        if (alterMarca && alterModelo && alterCapacidade && alterPlaca) {
            axios.put('http://localhost:3000/van', { id, marca: alterMarca, modelo: alterModelo, capacidade: alterCapacidade, placa: alterPlaca, foto1, foto2, foto3, foto4 })
                .then(() => {
                    alert('Van alterada');
                    getVans();
                })
                .catch(error => {
                    console.log(error);
                    alert('Erro ao editar (dados inválidos)');
                });
        } else {
            alert('Não deixe campos vazios');
        }
    }

    function deleteModal(id) {
        setId(id);
        setOpenDelete(true);
    }

    async function deleteVan(id) {
        await axios.delete('http://localhost:3000/van', { data: { id } });
        alert('Van deletada');
        setOpenDelete(false);
        getVans();
    }

    useEffect(() => {
        getVans();
    }, []);

    const filtrar = pesquisa.length > 0 ? get.filter(filtro => filtro.placa.toLowerCase().includes(pesquisa.toLowerCase()) ||
        filtro.marca.toLowerCase().includes(pesquisa.toLowerCase()) ||
        filtro.modelo.toLowerCase().includes(pesquisa.toLowerCase())) : get;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

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

    return (
        <div className={styles.container}>
            <div className={styles.meio}>
                <div className={styles.divpesquisa}>
                    <input type='text' className={styles.pesquisa} value={pesquisa} placeholder='Pesquisar:' onChange={e => setPesquisa(e.target.value)} />
                    <button className={styles.cadbot} onClick={() => setOpen1(true)}>Cadastrar</button>
                    <Modal open={open1} onClose={handleClose}>
                        <Box className={styles.modalBox}>
                            <span className={styles.closeButton} onClick={handleClose}>&times;</span>
                            <h2>Cadastrar Veículo!</h2>
                            <div className={styles.fieldsContainer}>
                                <input type="text" value={marca} placeholder="Marca" onChange={e => setMarca(e.target.value)} />
                                <input type="text" value={modelo} placeholder="Modelo" onChange={e => setModelo(e.target.value)} />
                                <input type="text" value={placa} placeholder="Placa" onChange={e => setPlaca(e.target.value)} />
                                <input type="text" value={capacidade} placeholder="Capacidade" onChange={e => setCapacidade(e.target.value)} />
                            </div>
                            <div className={styles.fieldsContainer}>
                                {[1, 2, 3, 4].map((num) => (
                                    <label
                                        key={num}
                                        className={selectedFiles[num] ? styles.selected : ""}
                                    >
                                        {selectedFiles[num] ? "Adicionada!" : "Adicionar"}
                                        <input
                                            type="file"
                                            onChange={(e) => handleFile(e, num)}
                                            style={{ display: "none" }}
                                        />
                                    </label>
                                ))}
                            </div>
                            <div className={styles.buttonsContainer}>
                                <button className={styles.cancel} onClick={handleClose}>Cancelar</button>
                                <button className={styles.confirm} onClick={postVan}>Confirmar</button>
                            </div>
                        </Box>
                    </Modal>

                </div>
                <div className={styles.botaoresultado}>
                    <div className={styles.resultados}>
                        <div>
                            {filtrar.map((van) => (
                                <div key={van.id} className={styles.containerveiculos}>
                                    <div className={styles.infoVeiculos}>
                                        <txt>Marca: {van.marca}</txt>
                                        <txt>Modelo: {van.modelo}</txt>
                                        <txt>Placa: {van.placa}</txt>
                                        <txt>Capacidade: {van.capacidade}</txt>
                                    </div>
                                    <div className={styles.carrosel}>
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
                                    <div className={styles.botoes}>
                                        <button className={styles.botoescss1} onClick={() => handleOpen(van)}>Alterar</button>
                                        <button className={styles.botoescss2} onClick={() => deleteModal(van.id)}>Excluir</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={open} onClose={handleClose}>
                <Box className={styles.modalBox}>
                    <span className={styles.closeButton} onClick={handleClose}>&times;</span>
                    <h2>Alterar Veículo!</h2>
                    <div className={styles.fieldsContainer}>
                        <input type='text' value={alterMarca} placeholder='Marca' onChange={e => setAlterMarca(e.target.value)}/>
                        <input type='text' value={alterModelo} placeholder='Modelo' onChange={e => setAlterModelo(e.target.value)}/>
                        <input type='text' value={alterPlaca} placeholder='Placa' onChange={e => setAlterPlaca(e.target.value)}/>
                        <input type='text' value={alterCapacidade} placeholder='Capacidade' onChange={e => setAlterCapacidade(e.target.value)}/>
                    </div>
                    <div className={styles.fieldsContainer}>
                        {[1, 2, 3, 4].map((num) => (
                            <label
                                key={num}
                                className={selectedFiles[num] ? styles.selected : ""}>
                                {selectedFiles[num] ? "Adicionada!" : "Adicionar"}
                                <input
                                    type="file"
                                    onChange={(e) => handleFile(e, num)}
                                    style={{ display: "none" }}
                                />
                            </label>
                        ))}
                    </div>
                    <div className={styles.buttonsContainer}>
                        <button className={styles.cancel} onClick={handleClose}>Cancelar</button>
                        <button className={styles.confirm} onClick={putVans}>Alterar</button>
                    </div>
                </Box>
            </Modal>

            <Modal open={openDelete} onClose={handleClose}>
                <Box className={styles.modalBox}>
                    Deseja deletar a van?
                    <div className={styles.buttonsContainer}>
                    <button className={styles.cancel} onClick={handleClose}>Não</button>
                    <button className={styles.confirm} onClick={() => deleteVan(id)}>Sim</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default Van;