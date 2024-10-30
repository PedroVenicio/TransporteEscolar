import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styles from '../styles/Van.module.css';
import logo from '../ft/logo.png';
import { useNavigate } from 'react-router-dom';

function Van() {
    const navigate = useNavigate();

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

    const [id, setId] = useState('');
    const [alterMarca, setAlterMarca] = useState('');
    const [alterModelo, setAlterModelo] = useState('');
    const [alterCapacidade, setAlterCapacidade] = useState('');
    const [alterPlaca, setAlterPlaca] = useState('');
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    function voltarAction() {
        navigate('/HomeGeral');
    }

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

    function postVan() {
        if (marca && modelo && capacidade && placa) {
            axios.post('http://localhost:3000/van', { marca, modelo, capacidade, placa, foto1, foto2, foto3, foto4 })
                .then(() => {
                    alert('Van cadastrada');
                    setMarca(''); setModelo(''); setCapacidade(''); setPlaca(''); setFoto1(''); setFoto2(''); setFoto3(''); setFoto4('');
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

    async function getVans() {
        try {
            const response = await axios.get('http://localhost:3000/van');
            setGet(response.data.vans || []);
        } catch (error) {
            console.log('Erro ao obter vans: ', error);
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

    async function deleteVan(id) {
        await axios.delete('http://localhost:3000/van', { data: { id } });
        alert('Van deletada');
        getVans();
    }

    useEffect(() => {
        getVans();
    }, []);

    const filtrar = pesquisa.length > 0 ? get.filter(filtro => filtro.placa.toLowerCase().includes(pesquisa.toLowerCase())) : get;

    function handleFile(event, foto) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64string = reader.result;
            if (foto === 1) setFoto1(base64string);
            else if (foto === 2) setFoto2(base64string);
            else if (foto === 3) setFoto3(base64string);
            else if (foto === 4) setFoto4(base64string);
        };
        reader.readAsDataURL(file);
    }

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
            <div className={styles.cabecalhoft}>
                <img src={logo} className={styles.logo} alt="Logo" />
                <button className={styles.botao} onClick={voltarAction}>Voltar</button>
            </div>
            <div className={styles.meio}>
                <div className={styles.botaocadastro}>
                    <button className={styles.cadbot} onClick={() => setOpen(true)}>Cadastrar</button>
                    <Modal open={open} onClose={handleClose}>
                        <Box className={styles.modalBox}>
                            <input type='text' value={marca} placeholder='Marca' onChange={e => setMarca(e.target.value)} />
                            <input type='text' value={modelo} placeholder='Modelo' onChange={e => setModelo(e.target.value)} />
                            <input type='text' value={capacidade} placeholder='Capacidade' onChange={e => setCapacidade(e.target.value)} />
                            <input type='text' value={placa} placeholder='Placa' onChange={e => setPlaca(e.target.value)} />
                            <input type='file' onChange={(e) => handleFile(e, 1)} />
                            <input type='file' onChange={(e) => handleFile(e, 2)} />
                            <input type='file' onChange={(e) => handleFile(e, 3)} />
                            <input type='file' onChange={(e) => handleFile(e, 4)} />
                            <button onClick={postVan}>Cadastrar</button>
                        </Box>
                    </Modal>
                </div>
                <div className={styles.botaopesquisa}>
                    <input type='text' className={styles.pesquisa} value={pesquisa} placeholder='Pesquisar:' onChange={e => setPesquisa(e.target.value)} />
                    </div>
                    <div className={styles.botaoresultado}>
                        <div className={styles.resultados}>
                            {filtrar.map((van) => (
                                <div key={van.id}>
                                    {van.placa}
                                    {b64toimg(van.foto1)}
                                    {b64toimg(van.foto2)}
                                    {b64toimg(van.foto3)}
                                    {b64toimg(van.foto4)}
                                    <button onClick={() => handleOpen(van)}>Alterar</button>
                                    <button onClick={() => deleteVan(van.id)}>Deletar</button>
                                </div>
                            ))}
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Van;