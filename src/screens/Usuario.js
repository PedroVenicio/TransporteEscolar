import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styles from '../styles/Usuario.module.css'; // Importa o módulo CSS

function Usuario() {
    // Inputs cadastro
    const [nome, setNome] = useState('');
    const [horarioida, setHorarioida] = useState('');
    const [horariovolta, setHorariovolta] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [foto, setFoto] = useState(null); // Campo para foto (inicialmente nulo)

    // Inputs editar
    const [id, setId] = useState('');
    const [alterLogin, setAlterLogin] = useState('');
    const [alterSenha, setAlterSenha] = useState('');
    const [alterNome, setAlterNome] = useState('');
    const [alterHorarioida, setAlterHorarioida] = useState('');
    const [alterHorariovolta, setAlterHorariovolta] = useState('');
    const [alterEndereco, setAlterEndereco] = useState('');
    const [alterBairro, setAlterBairro] = useState('');
    const [alterCidade, setAlterCidade] = useState('');
    const [alterCpf, setAlterCpf] = useState('');
    const [alterTelefone, setAlterTelefone] = useState('');
    const [alterEmail, setAlterEmail] = useState('');
    const [alterFoto, setAlterFoto] = useState(null); // Campo para foto (inicialmente nulo)

    // Pesquisa
    const [get, setGet] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const [ultimoId, setUltimoId] = useState('');

    // Modal
    const [open, setOpen] = React.useState(false);

    function handleOpen(usuario) {
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
        setAlterLogin(usuario.login);
        setAlterSenha(usuario.senha);
        setAlterFoto(usuario.foto); // Carrega a foto no modal
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    function postUsuarios() {
        if (nome && horarioida && horariovolta && endereco && bairro && cidade && cpf && telefone && email) {
            try {
                const login = nome + '.' + (ultimoId + 1);
                const senha = cpf.substring(6, 0);
                const formData = new FormData(); // Cria um FormData

                // Adiciona os campos ao FormData
                formData.append('nome', nome);
                formData.append('horarioida', horarioida);
                formData.append('horariovolta', horariovolta);
                formData.append('endereco', endereco);
                formData.append('bairro', bairro);
                formData.append('cidade', cidade);
                formData.append('login', login);
                formData.append('senha', senha);
                formData.append('cpf', cpf);
                formData.append('telefone', telefone);
                formData.append('email', email);
                formData.append('foto', foto); // Adiciona o arquivo da foto

                axios.post('http://localhost:3000/usuario', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                alert('Usuário cadastrado');
                resetFields();
                getUsuarios();
            } catch (error) {
                console.log(error);
                alert('Erro ao cadastrar (dados inválidos)');
            }
        } else {
            alert('Insira dados nos campos em branco');
        }
    }

    function resetFields() {
        setNome('');
        setHorarioida('');
        setHorariovolta('');
        setEndereco('');
        setBairro('');
        setCidade('');
        setCpf('');
        setTelefone('');
        setEmail('');
        setFoto(null); // Reseta o campo foto
    }

    async function getUsuarios() {
        try {
            const response = await axios.get('http://localhost:3000/usuario');
            const usuarios = response.data.usuarios;

            if (usuarios && usuarios.length > 0) {
                setGet(usuarios);
                const ids = usuarios.map(usuario => usuario.id);
                setUltimoId(ids.at(-1));
            } else {
                setGet([]);
                setUltimoId('');
                console.log('Nenhum usuário encontrado');
            }
        } catch (error) {
            console.log('Erro ao obter usuários:', error);
        }
    }

    function putUsuarios() {
        if (alterNome && alterHorarioida && alterHorariovolta && alterEndereco && alterBairro && alterCidade && alterCpf && alterTelefone && alterEmail && alterLogin && alterSenha) {
            try {
                axios.put('http://localhost:3000/usuario', {
                    id,
                    nome: alterNome,
                    horarioida: alterHorarioida,
                    horariovolta: alterHorariovolta,
                    endereco: alterEndereco,
                    bairro: alterBairro,
                    cidade: alterCidade,
                    login: alterLogin,
                    senha: alterSenha,
                    cpf: alterCpf,
                    telefone: alterTelefone,
                    email: alterEmail,
                    foto: alterFoto // Atualiza a foto
                });

                alert('Usuário alterado');
            } catch (error) {
                console.log(error);
                alert('Erro ao editar (dados inválidos)');
            }
        } else {
            alert('Não deixe campos vazios');
        }
    }

    async function deleteUsuario(id) {
        await axios.delete('http://localhost:3000/usuario', { data: { id } });
        alert('Usuário deletado');
        getUsuarios();
    }

    useEffect(() => {
        getUsuarios();
    }, []);

    const filtrar = pesquisa.length > 0
        ? get.filter(filtro => filtro.nome.toLowerCase().includes(pesquisa.toLowerCase()))
        : [];

    return (
        <div className={styles.container}>
            <h1>Cadastro de Usuário</h1>
            <input className={styles.input} type='text' value={nome} placeholder='Nome' onChange={event => setNome(event.target.value)} />
            <input className={styles.input} type='text' value={horarioida} placeholder='Horário Ida' onChange={event => setHorarioida(event.target.value)} />
            <input className={styles.input} type='text' value={horariovolta} placeholder='Horário Volta' onChange={event => setHorariovolta(event.target.value)} />
            <input className={styles.input} type='text' value={endereco} placeholder='Endereço' onChange={event => setEndereco(event.target.value)} />
            <input className={styles.input} type='text' value={bairro} placeholder='Bairro' onChange={event => setBairro(event.target.value)} />
            <input className={styles.input} type='text' value={cidade} placeholder='Cidade' onChange={event => setCidade(event.target.value)} />
            <input className={styles.input} type='text' value={cpf} placeholder='CPF' onChange={event => setCpf(event.target.value)} />
            <input className={styles.input} type='text' value={telefone} placeholder='Telefone' onChange={event => setTelefone(event.target.value)} />
            <input className={styles.input} type='text' value={email} placeholder='Email' onChange={event => setEmail(event.target.value)} />
            <input 
                className={styles.input} 
                type='file' 
                accept="image/*" 
                onChange={event => {
                    const file = event.target.files[0];
                    if (file) {
                        setFoto(file); // Armazena o arquivo
                    }
                }} 
            /> {/* Campo para escolher arquivo da máquina */}
            <button onClick={postUsuarios}>Cadastrar</button>

            <div>
                <h1>Pesquisar Usuário</h1>
                <input className={styles.input} type='text' placeholder='Pesquisar' onChange={event => setPesquisa(event.target.value)} />
            </div>

            {filtrar.length > 0 ? filtrar.map((usuario) => (
                <div key={usuario.id} className={styles.usuario}>
                    <p>{usuario.nome}</p>
                    <div>
                        <button onClick={() => handleOpen(usuario)}>Alterar</button>
                        <button onClick={() => deleteUsuario(usuario.id)}>Deletar</button>
                    </div>
                </div>
            )) : get.map((usuario) => (
                <div key={usuario.id} className={styles.usuario}>
                    <p>{usuario.nome}</p>
                    <div>
                        <button onClick={() => handleOpen(usuario)}>Alterar</button>
                        <button onClick={() => deleteUsuario(usuario.id)}>Deletar</button>
                    </div>
                </div>
            ))}

            <Modal open={open} onClose={handleClose}>
                <Box sx={{ padding: 2 }}>
                    <h1>Alterar Usuário</h1>
                    <input type="text" value={alterNome} onChange={event => setAlterNome(event.target.value)} placeholder="Nome" />
                    <input type="text" value={alterHorarioida} onChange={event => setAlterHorarioida(event.target.value)} placeholder="Horário Ida" />
                    <input type="text" value={alterHorariovolta} onChange={event => setAlterHorariovolta(event.target.value)} placeholder="Horário Volta" />
                    <input type="text" value={alterEndereco} onChange={event => setAlterEndereco(event.target.value)} placeholder="Endereço" />
                    <input type="text" value={alterBairro} onChange={event => setAlterBairro(event.target.value)} placeholder="Bairro" />
                    <input type="text" value={alterCidade} onChange={event => setAlterCidade(event.target.value)} placeholder="Cidade" />
                    <input type="text" value={alterCpf} onChange={event => setAlterCpf(event.target.value)} placeholder="CPF" />
                    <input type="text" value={alterTelefone} onChange={event => setAlterTelefone(event.target.value)} placeholder="Telefone" />
                    <input type="text" value={alterEmail} onChange={event => setAlterEmail(event.target.value)} placeholder="Email" />
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={event => {
                            const file = event.target.files[0];
                            if (file) {
                                setAlterFoto(file); // Armazena o arquivo alterado
                            }
                        }} 
                    /> {/* Campo para escolher arquivo da máquina */}
                    <button onClick={putUsuarios}>Alterar</button>
                </Box>
            </Modal>
        </div>
    );
}

export default Usuario;
