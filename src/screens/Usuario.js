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
    const [getAdm, setGetAdm] = useState([]);
    const [getMotorista, setGetMotorista] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const [ultimoId, setUltimoId] = useState('');
    const [ultimoIdMotorista, setUltimoIdMotorista] = useState('');
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleOpen = (usuario, motorista) => {
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
        setIsMotorista(motorista);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpen1(false);
        setOpenDelete(false);
    }

    function postUsuarios() {

        const ida = document.getElementById('horarioida');
        const volta = document.getElementById('horariovolta');

        if (nome && ida && volta && endereco && bairro && cidade && cpf && telefone && email) {
            if (isMotorista === true) {
                try {
                    const login = nome + '.' + (ultimoIdMotorista + 1);
                    const senha = cpf.substring(6, 0);
                    axios.post('http://localhost:3000/motorista', {
                        nome, endereco, bairro, cidade, login, senha, cpf, telefone, email, foto, adm: isAdm, voto: 0
                    })

                } catch (error) {
                    const fileInput = document.getElementById('arquivo');
                    fileInput.value = '';
                    setIsAdm(false);
                    console.log(error);
                    alert('Erro ao cadastrar (dados inválidos)');
                }
            }
            else {
                try {

                    const login = nome + '.' + (ultimoId + 1);
                    const senha = cpf.substring(6, 0);

                    axios.post('http://localhost:3000/usuario', {
                        nome,
                        horarioida: isAdm === true ? 0 : horarioida,
                        horariovolta: isAdm === true ? 0 : horariovolta,
                        endereco, bairro, cidade, login, senha, cpf, telefone, email, foto, adm: isAdm, voto: 0
                    })

                } catch (error) {
                    const fileInput = document.getElementById('arquivo');
                    fileInput.value = '';
                    setIsAdm(false);
                    console.log(error);
                    alert('Erro ao cadastrar (dados inválidos)');
                }
            }
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
            setIsMotorista(false);
            handleClose();
            getUsuarios();
            const fileInput = document.getElementById('arquivo');
            fileInput.value = '';
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
            setGet(usuarios.filter(user => user.adm === false) || []);
            setGetAdm(usuarios.filter(user => user.adm === true))
            setUltimoId(usuarios?.at(-1)?.id || '');

            const responseMotoristas = await axios.get('http://localhost:3000/motorista');
            const motoristas = responseMotoristas.data.motoristas;
            setGetMotorista(motoristas || []);
            console.log(getMotorista)
            setUltimoIdMotorista(motoristas?.at(-1)?.id || '');

        } catch {
            console.log('Erro ao obter usuários');
        }
    };

    const putUsuarios = () => {

        const ida = document.getElementById('alterhorarioida');
        const volta = document.getElementById('alterhorariovolta');

        if (alterNome && ida && volta && alterEndereco && alterBairro && alterCidade && alterCpf && alterTelefone && alterEmail) {
            if (isMotorista === false) {
                try {
                    axios.put('http://localhost:3000/usuario', {
                        id, nome: alterNome, horarioida: alterHorarioida, horariovolta: alterHorariovolta, endereco: alterEndereco,
                        bairro: alterBairro, cidade: alterCidade, cpf: alterCpf, telefone: alterTelefone, email: alterEmail, adm: alterIsAdm, foto
                    })
                    alert('Usuário alterado');
                    const fileInput = document.getElementById('arquivoEdit');
                    fileInput.value = '';
                    getUsuarios();
                } catch (error) {
                    alert('Erro ao editar (dados inválidos)');
                };
            }
            else {
                try {
                    axios.put('http://localhost:3000/motorista', {
                        id, nome: alterNome, endereco: alterEndereco, bairro: alterBairro, cidade: alterCidade, cpf: alterCpf, telefone: alterTelefone, email: alterEmail, foto
                    })
                    alert('Usuário alterado');
                    const fileInput = document.getElementById('arquivoEdit');
                    fileInput.value = '';
                    getUsuarios();
                } catch (error) {
                    alert('Erro ao editar (dados inválidos)');
                };
            }
        } else {
            const fileInput = document.getElementById('arquivoEdit');
            fileInput.value = '';
            alert('Não deixe campos vazios');
        }
        setIsMotorista(false);
        handleClose();
    };

    function deleteModal(id, motorista) {
        setId(id)
        setIsMotorista(motorista)
        setOpenDelete(true);
    }

    async function deleteUsuario(id) {
        isMotorista === false ? await axios.delete('http://localhost:3000/usuario', { data: { id } }) : await axios.delete('http://localhost:3000/motorista', { data: { id } });
        alert('Usuário deletado');
        setOpenDelete(false);
        setIsMotorista(false);
        getUsuarios();

    };

    useEffect(() => { getUsuarios(); }, []);

    const filtrar = pesquisa.length > 0 ? get.filter(filtro => filtro.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        filtro.cidade.toLowerCase().includes(pesquisa.toLowerCase()) ||
        filtro.cpf.toString().includes(pesquisa)) : get;

    const filtrarAdm = pesquisa.length > 0 ? getAdm.filter(filtro => filtro.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        filtro.cidade.toLowerCase().includes(pesquisa.toLowerCase()) ||
        filtro.cpf.toString().includes(pesquisa)) : getAdm;

    const filtrarMotorista = pesquisa.length > 0 ? getMotorista.filter(filtro => filtro.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        filtro.cidade.toLowerCase().includes(pesquisa.toLowerCase()) ||
        filtro.cpf.toString().includes(pesquisa)) : getMotorista;


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
            <div className={styles.meio}>
                <div className={styles.divpesquisa}>
                    <input type='text' className={styles.pesquisa} value={pesquisa} placeholder='Pesquisar:' onChange={e => setPesquisa(e.target.value)} />
                    <button className={styles.cadbot} onClick={() => setOpen1(true)}>Cadastrar</button>
                    <Modal open={open1} onClose={handleClose}>
                        <Box className={styles.modalBox}>
                            <span className={styles.closeButton} onClick={handleClose}>&times;</span>
                            <h2>Cadastrar usuário!</h2>
                            <div className={styles.fieldsContainer}>
                                <input className={styles.input} type='text' value={nome} placeholder='Nome' onChange={event => setNome(event.target.value)} />
                                <input className={styles.input} id='horarioida' type='text' value={isAdm || isMotorista === true ? 'null' : horarioida} placeholder='Horário Ida' disabled={isAdm || isMotorista} onChange={event => setHorarioida(event.target.value)} />
                                <input className={styles.input} id='horariovolta' type='text' value={isAdm || isMotorista === true ? 'null' : horariovolta} placeholder='Horário Volta' disabled={isAdm || isMotorista} onChange={event => setHorariovolta(event.target.value)} />
                                <input className={styles.input} type='text' value={endereco} placeholder='Endereço' onChange={event => setEndereco(event.target.value)} />
                                <input className={styles.input} type='text' value={bairro} placeholder='Bairro' onChange={event => setBairro(event.target.value)} />
                                <input className={styles.input} type='text' value={cidade} placeholder='Cidade' onChange={event => setCidade(event.target.value)} />
                                <input className={styles.input} type='text' value={cpf} placeholder='CPF' onChange={event => setCpf(event.target.value)} />
                                <input className={styles.input} type='text' value={telefone} placeholder='Telefone' onChange={event => setTelefone(event.target.value)} />
                                <input className={styles.input} type='text' value={email} placeholder='Email' onChange={event => setEmail(event.target.value)} />
                            </div>
                            Usuario administrador <input type='checkbox' disabled={isMotorista} checked={isAdm} onChange={() => setIsAdm(!isAdm)} />
                            Motorista <input type='checkbox' disabled={isAdm} checked={isMotorista} onChange={() => setIsMotorista(!isMotorista)} />
                            <input id='arquivo' className={styles.input} type='file' onChange={handleFile} />
                            <div className={styles.buttonsContainer}>
                                <button className={styles.cancel} onClick={handleClose}>Cancelar</button>
                                <button className={styles.confirm} onClick={postUsuarios}>Confirmar</button>
                            </div>
                        </Box>
                    </Modal>
                </div>
                <div className={styles.botaoresultado}>
                    <div className={styles.resultados}>
                        {filtrar.map((usuario) => (
                            <div key={usuario.id} className={styles.usuario}>
                                <div className={styles.ftuser}>
                                    <div className={styles.ftuser2}>
                                        {usuario.foto && b64toimg(usuario.foto)}
                                    </div>
                                </div>
                                <div className={styles.infouser}>
                                    <txt>{usuario.nome}</txt>
                                    <txt>{usuario.horarioida}</txt>
                                    <txt>{usuario.horariovolta}</txt>
                                    <txt>{usuario.endereco}</txt>
                                    <txt>{usuario.login}</txt>
                                    <txt>{usuario.cpf}</txt>
                                    <txt>{usuario.telefone}</txt>
                                    <txt>{usuario.email}</txt>
                                </div>
                                <div className={styles.botoes}>
                                    <button className={styles.botoescss1} onClick={() => handleOpen(usuario, false)}>Alterar</button>
                                    <button className={styles.botoescss2} onClick={() => deleteModal(usuario.id, false)}>Desativar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.resultados}>
                        {filtrarMotorista.map((motorista) => (
                            <div key={motorista.id} className={styles.usuario}>
                                <div className={styles.ftuser}>
                                     <div className={styles.ftuser2}>
                                        {motorista.foto && b64toimg(motorista.foto)}
                                    </div> 
                                </div>
                                <div className={styles.infouser}>
                                    <txt>{motorista.nome}</txt>
                                    <txt>{motorista.endereco}</txt>
                                    <txt>{motorista.login}</txt>
                                    <txt>{motorista.cpf}</txt>
                                    <txt>{motorista.telefone}</txt>
                                    <txt>{motorista.email}</txt> 
                                </div>
                                <div className={styles.botoes}>
                                    <button className={styles.botoescss1} onClick={() => handleOpen(motorista, false)}>Alterar</button>
                                    <button className={styles.botoescss2} onClick={() => deleteModal(motorista.id, false)}>Desativar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.resultados}>
                        {filtrarAdm.map((usuario) => (
                            <div key={usuario.id} className={styles.usuario}>
                                <div className={styles.ftuser}>
                                    <div className={styles.ftuser2}>
                                        {usuario.foto && b64toimg(usuario.foto)}
                                    </div>
                                </div>
                                <div className={styles.infouser}>
                                    <txt>{usuario.nome}</txt>
                                    <txt>{usuario.endereco}</txt>
                                    <txt>{usuario.login}</txt>
                                    <txt>{usuario.cpf}</txt>
                                    <txt>{usuario.telefone}</txt>
                                    <txt>{usuario.email}</txt>
                                </div>
                                <div className={styles.botoes}>
                                    <button className={styles.botoescss1} onClick={() => handleOpen(usuario, false)}>Alterar</button>
                                    <button className={styles.botoescss2} onClick={() => deleteModal(usuario.id, false)}>Desativar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Modal open={open} onClose={handleClose}>
                <Box className={styles.modalBox}>
                    <input type="text" value={alterNome} onChange={event => setAlterNome(event.target.value)} placeholder="Nome" />
                    <input type="text" value={alterHorarioida} id='alterhorarioida' disabled={alterIsAdm || isMotorista} onChange={event => setAlterHorarioida(event.target.value)} placeholder="Horário Ida" />
                    <input type="text" value={alterHorariovolta} id='alterhorariovolta' disabled={alterIsAdm || isMotorista} onChange={event => setAlterHorariovolta(event.target.value)} placeholder="Horário Volta" />
                    <input type="text" value={alterEndereco} onChange={event => setAlterEndereco(event.target.value)} placeholder="Endereço" />
                    <input type="text" value={alterBairro} onChange={event => setAlterBairro(event.target.value)} placeholder="Bairro" />
                    <input type="text" value={alterCidade} onChange={event => setAlterCidade(event.target.value)} placeholder="Cidade" />
                    <input type="text" value={alterCpf} onChange={event => setAlterCpf(event.target.value)} placeholder="CPF" />
                    <input type="text" value={alterTelefone} onChange={event => setAlterTelefone(event.target.value)} placeholder="Telefone" />
                    <input type="text" value={alterEmail} onChange={event => setAlterEmail(event.target.value)} placeholder="Email" />
                    Usuario administrador <input type='checkbox' disabled={isMotorista} checked={alterIsAdm} onChange={() => setAlterIsAdm(!alterIsAdm)} />
                    <input id='arquivoEdit' type="file" onChange={handleFile} />
                    <button onClick={putUsuarios}>Alterar</button>
                </Box>
            </Modal>

            <Modal open={openDelete} onClose={handleClose}>
                <Box className={styles.modalBox}>
                    Deseja desativar o usuário?
                    <div className={styles.buttonsContainer}>
                        <button className={styles.cancel} onClick={handleClose}>Não</button>
                        <button className={styles.confirm} onClick={() => deleteUsuario(id)}>Sim</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default Usuario;