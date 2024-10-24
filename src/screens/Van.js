import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function Van() {
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [capacidade, setCapacidade] = useState('');
    const [placa, setPlaca] = useState('');
    const [foto1, setFoto1] = useState('');
    const [foto2, setFoto2] = useState('');
    const [foto3, setFoto3] = useState('');
    const [foto4, setFoto4] = useState('');

    const [get, setGet] = useState([])
    const [pesquisa, setPesquisa] = useState('');

    const [id, setId] = useState('');
    const [alterMarca, setAlterMarca] = useState('');
    const [alterModelo, setAlterModelo] = useState('');
    const [alterCapacidade, setAlterCapacidade] = useState('');
    const [alterPlaca, setAlterPlaca] = useState('');

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    function handleOpen(van) {
        setId(van.id);
        setAlterMarca(van.marca);
        setAlterModelo(van.modelo);
        setAlterCapacidade(van.capacidade);
        setAlterPlaca(van.placa);
        setOpen(true);
    }

    function postVan() {
        if (marca !== '' && modelo !== '' && capacidade !== '' && placa !== '') {
            try{
                axios.post('http://localhost:3000/van',
                    {
                        marca: marca,
                        modelo: modelo,
                        capacidade: capacidade,
                        placa: placa,
                        foto1: foto1,
                        foto2: foto2,
                        foto3: foto3,
                        foto4: foto4
                    }
                )
                alert('Van cadastrada');
                setMarca('');
                setModelo('');
                setCapacidade('');
                setPlaca('');
                setFoto1('');
                setFoto2('');
                setFoto3('');
                setFoto4('');
                getVans();
            }
            catch (error) {
                console.log(error)
                alert('Não foi possível cadastrar (dados inválidos)')
            }
        }
        else {
            alert('Insira dados nos campos em branco')
        }
    }

    async function getVans() {
        try{
            const response = await axios.get('http://localhost:3000/van');
            const vans = response.data.vans;
            
            if (vans && vans.length > 0) {
                setGet(vans);
                console.log(vans);
            }
            else{
                setGet([]);
                console.log('Nenhuma van encontrada')
            }
        }
        catch (error) {
            console.log('Erro ao obter vans: ', error)
        }
    }

    function putVans() {
        if (alterMarca !== '' && alterModelo !== '' && alterCapacidade !== '' && alterPlaca !== '') {
            try{
                axios.put('http://localhost:3000/van',
                    {
                        id: id,
                        marca: marca,
                        modelo: modelo,
                        placa: placa,
                        foto1: foto1,
                        foto2: foto2,
                        foto3: foto3,
                        foto4: foto4
                    }
                )
                alert('Van alterada')
            }
            catch(error){
                console.log(error);
                alert('Erro ao editar (dados inválidos)')
            }
        }
        else{
            alert('Não deixe campos vazios')
        }
    }

    async function deleteVan(id) {
        await axios.delete('http://localhost:3000/van',{
            data:
            {
                id: id,
            }
        })
        alert('Van deletada')
        getVans();
    }

    useEffect(() => {
        getVans()
    }, []);

    const filtrar = pesquisa.length > 0
        ? get.filter(filtro => filtro.placa.toLowerCase().includes(pesquisa.toLowerCase()))
        : [];

    function handleFile(event, foto) {
        const file = event.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const base64string = reader.result
            if (foto === 1){
                setFoto1(base64string);
            }
            else if (foto === 2){
                setFoto2(base64string);
            }
            else if (foto === 3){
                setFoto3(base64string);
            }
            else if (foto === 4){
                setFoto4(base64string);
            }
        };
    }

    function b64toimg(base64){
        const base64data = base64.split(',')[1];
        const binaryString = window.atob(base64data);
        
        const len = binaryString.length;
        const bytes = new Uint8Array(len);

        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([bytes], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        return <img src={url} alt="van" />;
    }

    return (
        <div>
            <div>
                <h1>cadastro van</h1>
                <input type='text' value={marca} placeholder='marca' onChange={event => setMarca(event.target.value)} />
                <input type='text' value={modelo} placeholder='modelo' onChange={event => setModelo(event.target.value)} />
                <input type='text' value={capacidade} placeholder='capacidade' onChange={event => setCapacidade(event.target.value)} />
                <input type='text' value={placa} placeholder='placa' onChange={event => setPlaca(event.target.value)} />
                <input id='foto1' type='file' onChange={(event) => handleFile(event, 1)} />
                <input id='foto2' type='file' onChange={(event) => handleFile(event, 2)} />
                <input id='foto3' type='file' onChange={(event) => handleFile(event, 3)} />
                <input id='foto4' type='file' onChange={(event) => handleFile(event, 4)} />
                <button onClick={postVan}>
                    cadastrar
                </button>
            </div>
            <div>
                <h1>pesquisar van</h1>
                <input type='text' value={pesquisa} placeholder='pesquisa' onChange={event => setPesquisa(event.target.value)} />
                <div>
                    {pesquisa.length > 0 ? (
                        filtrar.map((filtro) => (
                            <div key={filtro.id}>
                                {filtro.placa}
                                {b64toimg(filtro.foto1)}
                                {b64toimg(filtro.foto2)}
                                {b64toimg(filtro.foto3)}
                                {b64toimg(filtro.foto4)}
                                <button onClick={() => handleOpen(filtro)}>alterar</button>
                                <button onClick={() => deleteVan(filtro.id)}>deletar</button>
                            </div>
                        ))
                    ) : (
                        get.map((van) => (
                            <div key={van.id}>
                                {van.placa}
                                {b64toimg(van.foto1)}
                                {b64toimg(van.foto2)}
                                {b64toimg(van.foto3)}
                                {b64toimg(van.foto4)}
                                <button onClick={() => handleOpen(van)}>alterar</button>
                                <button onClick={() => deleteVan(van.id)}>deletar</button>
                            </div>
                        ))
                    )}
                    <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <Box>
                            <input type='text' value={alterMarca} placeholder='Marca' onChange={event => setAlterMarca(event.target.value)} />
                            <input type='text' value={alterModelo} placeholder='Modelo' onChange={event => setAlterModelo(event.target.value)} />
                            <input type='text' value={alterCapacidade} placeholder='Capacidade' onChange={event => setAlterCapacidade(event.target.value)} />
                            <input type='text' value={alterPlaca} placeholder='Placa' onChange={event => setAlterPlaca(event.target.value)} />
                            <input id='foto1' type='file' onChange={(event) => handleFile(event, 1)} />
                            <input id='foto2' type='file' onChange={(event) => handleFile(event, 2)} />
                            <input id='foto3' type='file' onChange={(event) => handleFile(event, 3)} />
                            <input id='foto4' type='file' onChange={(event) => handleFile(event, 4)} />
                            <button onClick={putVans}>alterar</button>
                        </Box>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Van;