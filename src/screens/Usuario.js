import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styles from '../styles/Usuario.module.css';
import logo from '../ft/logo.png';

function Usuario() {
    const [nome, setNome] = useState('');
    const [horarioida, setHorarioida] = useState('');
    const [horariovolta, setHorariovolta] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [foto, setFoto] = useState('');
    const [isAdm, setIsAdm] = useState(false);
    const [isMotorista, setIsMotorista] = useState(false);

    const [id, setId] = useState('');
    const [alterNome, setAlterNome] = useState('');
    const [alterHorarioida, setAlterHorarioida] = useState('');
    const [alterHorariovolta, setAlterHorariovolta] = useState('');
    const [alterEndereco, setAlterEndereco] = useState('');
    const [alterBairro, setAlterBairro] = useState('');
    const [alterCidade, setAlterCidade] = useState('');
    const [alterCpf, setAlterCpf] = useState('');
    const [alterTelefone, setAlterTelefone] = useState('');
    const [alterEmail, setAlterEmail] = useState('');
    const [alterIsAdm, setAlterIsAdm] = useState(false);

    const [get, setGet] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const [ultimoId, setUltimoId] = useState('');
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    const handleOpen = (usuario) => {
        setId(usuario.id);
        setAlterNome(usuario.nome);
        setAlterHorarioida(usuario.horarioida);
        setAlterHorariovolta(usuario.horariovolta);
        setAlterEndereco(usuario.endereco);
        setAlterBairro(usuario.bairro);
        setAlterCidade(usuario.cidade);
        setAlterCpf(usuario.cpf);
        setAlterTelefone(usuario.telefone);
        setAlterEmail(usuario.email);
        setAlterIsAdm(usuario.adm);
        setFoto(usuario.foto);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpen1(false);
    }

    function postUsuarios() {

        const ida = document.getElementById('horarioida');
        const volta = document.getElementById('horariovolta');

        if (nome && ida && volta && endereco && bairro && cidade && cpf && telefone && email) {
            try {

                const login = nome + '.' + (ultimoId + 1);
                const senha = cpf.substring(6, 0);

                axios.post('http://localhost:3000/usuario', {
                    nome,
                    horarioida: isAdm === true ? 0 : horarioida,
                    horariovolta: isAdm === true ? 0 : horariovolta,
                    endereco, bairro, cidade, login, senha, cpf, telefone, email, foto, adm: isAdm, voto: 0
                })

                alert('Usuário cadastrado');
                setNome('');
                setHorarioida('');
                setHorariovolta('');
                setEndereco('');
                setBairro('');
                setCidade('');
                setCpf('');
                setTelefone('');
                setEmail('');
                setFoto('');
                setIsAdm(false);
                getUsuarios();
                const fileInput = document.getElementById('arquivo');
                fileInput.value = '';

            } catch (error) {
                const fileInput = document.getElementById('arquivo');
                fileInput.value = '';
                setIsAdm(false);
                console.log(error);
                alert('Erro ao cadastrar (dados inválidos)');
            }
        } else {
            const fileInput = document.getElementById('arquivo');
            fileInput.value = '';
            setFoto('');
            setIsAdm(false);
            alert('Insira dados nos campos em branco');
        }
    };

    async function getUsuarios() {
        try {
            const response = await axios.get('http://localhost:3000/usuario');
            const usuarios = response.data.usuarios;
            setGet(usuarios || []);
            setUltimoId(usuarios?.at(-1)?.id || '');
        } catch {
            console.log('Erro ao obter usuários');
        }
    };

    const putUsuarios = () => {
        if (alterNome && alterHorarioida && alterHorariovolta && alterEndereco && alterBairro && alterCidade && alterCpf && alterTelefone && alterEmail) {
            try {
                axios.put('http://localhost:3000/usuario', {
                    id, nome: alterNome, horarioida: alterHorarioida, horariovolta: alterHorariovolta, endereco: alterEndereco,
                    bairro: alterBairro, cidade: alterCidade, cpf: alterCpf, telefone: alterTelefone, email: alterEmail, adm: alterIsAdm
                })
                alert('Usuário alterado');
                const fileInput = document.getElementById('arquivoEdit');
                fileInput.value = '';
                getUsuarios();
            } catch (error) {
                alert('Erro ao editar (dados inválidos)');
            };
        } else {
            const fileInput = document.getElementById('arquivoEdit');
            fileInput.value = '';
            alert('Não deixe campos vazios');
        }
    };

    async function deleteUsuario(id) {
        await axios.delete('http://localhost:3000/usuario', { data: { id } });
        alert('Usuário deletado');
        getUsuarios();
    };

    useEffect(() => { getUsuarios(); }, []);

    const filtrar = pesquisa.length > 0 ? get.filter(f => f.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        f.cidade.toLowerCase().includes(pesquisa.toLowerCase()) ||
        f.cpf.toString().toLowerCase().includes(pesquisa.toLowerCase())) : get;

    const handleFile = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => setFoto(reader.result);
    };

    const b64toimg = (base64) => {
        const blob = new Blob([Uint8Array.from(atob(base64.split(',')[1]), c => c.charCodeAt(0))], { type: 'image/png' });
        return <img src={URL.createObjectURL(blob)} alt="Usuario" />;
    };

    return (
        <div className={styles.container}>
            <div className={styles.cabecalhoft}>
                <img src={logo} className={styles.logo} alt="Logo" />
                <button className={styles.botao} onClick={() => window.history.back()}>Voltar</button>
            </div>
            <div className={styles.meio}>
                <div className={styles.botaocadastro}>
                    <button className={styles.cadbot} onClick={() => setOpen1(true)}>Cadastrar</button>
                </div>
                <Modal open={open1} onClose={handleClose}>
                    <Box className={styles.modalBox}>
                        <input className={styles.input} type='text' value={nome} placeholder='Nome' onChange={event => setNome(event.target.value)} />
                        <input className={styles.input} id='horarioida' type='text' value={isAdm === true ? 'null' : horarioida} placeholder='Horário Ida' disabled={isAdm} onChange={event => setHorarioida(event.target.value)} />
                        <input className={styles.input} id='horariovolta' type='text' value={isAdm === true ? 'null' : horariovolta} placeholder='Horário Volta' disabled={isAdm} onChange={event => setHorariovolta(event.target.value)} />
                        <input className={styles.input} type='text' value={endereco} placeholder='Endereço' onChange={event => setEndereco(event.target.value)} />
                        <input className={styles.input} type='text' value={bairro} placeholder='Bairro' onChange={event => setBairro(event.target.value)} />
                        <input className={styles.input} type='text' value={cidade} placeholder='Cidade' onChange={event => setCidade(event.target.value)} />
                        <input className={styles.input} type='text' value={cpf} placeholder='CPF' onChange={event => setCpf(event.target.value)} />
                        <input className={styles.input} type='text' value={telefone} placeholder='Telefone' onChange={event => setTelefone(event.target.value)} />
                        <input className={styles.input} type='text' value={email} placeholder='Email' onChange={event => setEmail(event.target.value)} />
                        Usuario administrador <input type='checkbox' checked={isAdm} onChange={() => setIsAdm(!isAdm)} />
                        <input id='arquivo' className={styles.input} type='file' onChange={handleFile} />
                        <button onClick={postUsuarios}>Cadastrar</button>
                    </Box>
                </Modal>
                <input className={styles.pesquisa} type='text' placeholder='Pesquisar' onChange={(e) => setPesquisa(e.target.value)} />
                <div className={styles.resultados}>
                    {filtrar.map((usuario) => (
                        <div key={usuario.id} className={styles.usuario}>
                            {usuario.foto && b64toimg(usuario.foto)}
                            <p>{usuario.nome}</p>
                            <p>{usuario.horarioida}</p>
                            <p>{usuario.horariovolta}</p>
                            <p>{usuario.endereco}</p>
                            <p>{usuario.login}</p>
                            <p>{usuario.cpf}</p>
                            <p>{usuario.telefone}</p>
                            <p>{usuario.email}</p>
                            <div>
                                <button onClick={() => handleOpen(usuario)}>Alterar</button>
                                <button onClick={() => deleteUsuario(usuario.id)}>Deletar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal open={open} onClose={handleClose}>
                <Box className={styles.modalBox}>
                    <input type="text" value={alterNome} onChange={event => setAlterNome(event.target.value)} placeholder="Nome" />
                    <input type="text" value={alterHorarioida} disabled={alterIsAdm} onChange={event => setAlterHorarioida(event.target.value)} placeholder="Horário Ida" />
                    <input type="text" value={alterHorariovolta} disabled={alterIsAdm} onChange={event => setAlterHorariovolta(event.target.value)} placeholder="Horário Volta" />
                    <input type="text" value={alterEndereco} onChange={event => setAlterEndereco(event.target.value)} placeholder="Endereço" />
                    <input type="text" value={alterBairro} onChange={event => setAlterBairro(event.target.value)} placeholder="Bairro" />
                    <input type="text" value={alterCidade} onChange={event => setAlterCidade(event.target.value)} placeholder="Cidade" />
                    <input type="text" value={alterCpf} onChange={event => setAlterCpf(event.target.value)} placeholder="CPF" />
                    <input type="text" value={alterTelefone} onChange={event => setAlterTelefone(event.target.value)} placeholder="Telefone" />
                    <input type="text" value={alterEmail} onChange={event => setAlterEmail(event.target.value)} placeholder="Email" />
                    Usuario administrador <input type='checkbox' checked={alterIsAdm} onChange={() => setAlterIsAdm(!alterIsAdm)} />
                    <input id='arquivoEdit' type="file" onChange={handleFile} />
                    <button onClick={putUsuarios}>Alterar</button>
                </Box>
            </Modal>
        </div>
    );
}

export default Usuario;