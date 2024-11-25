import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styles from '../styles/Usuario.module.css';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';


function Usuario() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [horarioida, setHorarioida] = useState("matutino");
    const [horariovolta, setHorariovolta] = useState("matutino");
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [foto, setFoto] = useState('');
    const [isAdm, setIsAdm] = useState(false);
    const [isMotorista, setIsMotorista] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState(false);

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
    const [openReactivate, setOpenReactivate] = useState(false);

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
        setOpenReactivate(false);
        setSelectedFiles(false);
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
    }

    function postUsuarios() {

        if (nome && endereco && bairro && cidade && cpf && telefone && email) {
            if (isMotorista == true) {
                try {
                    const login = nome + '.' + (ultimoIdMotorista + 1);
                    const senha = cpf.substring(6, 0);
                    axios.post('http://localhost:3000/motorista', {
                        nome, endereco, bairro, cidade, login, senha, cpf, telefone, email, foto, status: 1, adm: isAdm, status: 1, voto: 0
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
                        horarioida: isAdm == true ? "null" : horarioida,
                        horariovolta: isAdm == true ? "null" : horariovolta,
                        endereco, bairro, cidade, login, senha, cpf, telefone, email, foto, adm: isAdm, status: 1, voto: 0
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
            setGet(usuarios.filter(user => user.adm == false) || []);
            setGetAdm(usuarios.filter(user => user.adm == true))
            setUltimoId(usuarios?.at(-1)?.id || '');

            const responseMotoristas = await axios.get('http://localhost:3000/motorista');
            const motoristas = responseMotoristas.data.motoristas;
            setGetMotorista(motoristas || []);
            setUltimoIdMotorista(motoristas?.at(-1)?.id || '');

        } catch {
            console.log('Erro ao obter usuários');
        }
    };

    const putUsuarios = () => {
        if (alterNome && alterEndereco && alterBairro && alterCidade && alterCpf && alterTelefone && alterEmail) {
            if (isMotorista == false) {
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

    function deleteModal(id, motorista, deletar, reativar) {
        setId(id)
        setIsMotorista(motorista)
        setOpenDelete(deletar);
        setOpenReactivate(reativar);
    }

    function desativarUsuario(id, status) {
        isMotorista == false ? axios.put('http://localhost:3000/usuario', { id, status }) : axios.put('http://localhost:3000/motorista', { id, status });
        status == 0 ? alert('Usuário desativado') : alert("Usuário reativado");
        status == 0 ? setOpenDelete(false) : setOpenReactivate(false);
        setIsMotorista(false);
        getUsuarios();
    };

    useEffect(() => {
        function verify() {
            const token = localStorage.getItem('token');
            if (token == null) {
                alert("Method not allowed")
                navigate('/HomeGeral')
            }
        }
        verify()
        getUsuarios();
    }, []);

    const filtrar = pesquisa.length > 0 ? get.filter(filtro => filtro.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        filtro.cidade.toLowerCase().includes(pesquisa.toLowerCase()) ||
        filtro.cpf.toString().includes(pesquisa)) : get;

    const filtrarAdm = pesquisa.length > 0 ? getAdm.filter(filtro => filtro.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        filtro.cidade.toLowerCase().includes(pesquisa.toLowerCase()) ||
        filtro.cpf.toString().includes(pesquisa)) : getAdm;

    const filtrarMotorista = pesquisa.length > 0 ? getMotorista.filter(filtro => filtro.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        filtro.cidade.toLowerCase().includes(pesquisa.toLowerCase()) ||
        filtro.cpf.toString().includes(pesquisa)) : getMotorista;

    const usuariosAtivos = filtrar.filter((usuario) => usuario.status == 1);
    const usuariosDesativados = filtrar.filter((usuario) => usuario.status == 0);

    const motoristasAtivos = filtrarMotorista.filter((motorista) => motorista.status == 1);
    const motoristasDesativados = filtrarMotorista.filter((motorista) => motorista.status == 0);

    const admAtivos = filtrarAdm.filter((admin) => admin.status == 1);
    const admDesativados = filtrarAdm.filter((admin) => admin.status == 0);

    const handleFile = async (event) => {
        setSelectedFiles(true)
        const file = event.target.files[0];
        const reader = new FileReader();

        const options = {
            maxSizeKB: 5,
            maxWidthOrHeight: 100,
            useWebWorker: true
        }

        const compressedFile = await imageCompression(file, options);
        const compressedDataUrl = await imageCompression.getDataUrlFromFile(compressedFile);
        setFoto(compressedDataUrl);
    };

    const b64toimg = (base64) => {
        const blob = new Blob([Uint8Array.from(atob(base64.split(',')[1]), c => c.charCodeAt(0))], { type: 'image/png' });
        return <img src={URL.createObjectURL(blob)} alt="Usuario" />;
    };

    function typeUser(tipo) {
        if (tipo == 1) {
            setIsAdm(false);
            setIsMotorista(false);
        }
        else if (tipo == 2) {
            setIsAdm(true);
            setIsMotorista(false);
        }
        else if (tipo == 3) {
            setIsAdm(false);
            setIsMotorista(true);
        }
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
                            <h2>Cadastrar usuário!</h2>
                            <div className={styles.fieldsContainer}>
                                <input className={styles.input} type='text' value={nome} placeholder='Nome' onChange={event => setNome(event.target.value)} />
                                <input className={styles.input} type='text' value={endereco} placeholder='Endereço' onChange={event => setEndereco(event.target.value)} />
                                <input className={styles.input} type='text' value={bairro} placeholder='Bairro' onChange={event => setBairro(event.target.value)} />
                                <input className={styles.input} type='text' value={cidade} placeholder='Cidade' onChange={event => setCidade(event.target.value)} />
                                <input className={styles.input} type='text' value={cpf} placeholder='CPF' onChange={event => setCpf(event.target.value)} />
                                <input className={styles.input} type='text' value={telefone} placeholder='Telefone' onChange={event => setTelefone(event.target.value)} />
                                <input className={styles.input} type='text' value={email} placeholder='Email' onChange={event => setEmail(event.target.value)} />
                                <select className={styles.select} value={horarioida} onChange={event => setHorarioida(event.target.value)} disabled={isAdm || isMotorista}>
                                    <option value={"matutino"}>Ida matutino</option>,
                                    <option value={"vespertino"}>Ida vespertino</option>
                                    <option value={"noturno"}>Ida noturno</option>
                                </select>
                                <select className={styles.select} value={horariovolta} onChange={event => setHorariovolta(event.target.value)} disabled={isAdm || isMotorista}>
                                    <option value={"matutino"}> Volta matutino</option>
                                    <option value={"vespertino"}>Volta vespertino</option>
                                    <option value={"noturno"}>Volta noturno</option>
                                </select>
                                <select className={styles.select} onChange={event => typeUser(event.target.value)}>
                                    <option value={1}>Passageiro</option>
                                    <option value={2}>Administrador</option>
                                    <option value={3}>Motorista</option>
                                </select>
                                <label
                                    className={selectedFiles ? styles.selected : ""}
                                >
                                    {selectedFiles ? "Adicionada!" : "Adicionar foto"}
                                    <input
                                        id='arquivo'
                                        type="file"
                                        onChange={(e) => handleFile(e)}
                                        style={{ display: "none" }}
                                    />
                                </label>
                            </div>


                            <div className={styles.buttonsContainer}>
                                <button className={styles.cancel} onClick={handleClose}>Cancelar</button>
                                <button className={styles.confirm} onClick={postUsuarios}>Confirmar</button>
                            </div>
                        </Box>
                    </Modal>
                </div>
                <div className={styles.botaoresultado}>
                    <div className={styles.resultadoativo}>
                        <div className={styles.resultados}>
                            {usuariosAtivos.map((usuario) => (
                                <div key={usuario.id} className={styles.usuario}>
                                    <div className={styles.ftuser}>
                                        <div className={styles.ftuser2}>
                                            {usuario.foto && b64toimg(usuario.foto)}
                                        </div>
                                    </div>
                                    <div className={styles.infouser}>
                                        <txt>Nome: {usuario.nome}</txt>
                                        <txt>Endereço: {usuario.endereco}</txt>
                                        <txt>Login: {usuario.login}</txt>
                                        <txt>CPF: {usuario.cpf}</txt>
                                        <txt>Telefone: {usuario.telefone}</txt>
                                        <txt>E-mail: {usuario.email}</txt>
                                        <div>
                                            <txt>Ida: {usuario.horarioida}  |   Volta: {usuario.horariovolta}</txt>
                                        </div>
                                    </div>
                                    <div className={styles.botoes}>
                                        <button className={styles.botoescss1} onClick={() => handleOpen(usuario, false)}>Alterar</button>
                                        <button className={styles.botoescss2} onClick={() => deleteModal(usuario.id, false, 1, 0)}>Desativar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.resultados}>
                            {motoristasAtivos.map((motorista) => (
                                <div key={motorista.id} className={styles.usuario}>
                                    <div className={styles.ftuser}>
                                        <div className={styles.ftuser2}>
                                            {motorista.foto && b64toimg(motorista.foto)}
                                        </div>
                                    </div>
                                    <div className={styles.infouser}>
                                        <txt>Nome: {motorista.nome}</txt>
                                        <txt>Endereço: {motorista.endereco}</txt>
                                        <txt>Login: {motorista.login}</txt>
                                        <txt>CPF: {motorista.cpf}</txt>
                                        <txt>Telefone: {motorista.telefone}</txt>
                                        <txt>E-mail: {motorista.email}</txt>
                                    </div>
                                    <div className={styles.botoes}>
                                        <button className={styles.botoescss1} onClick={() => handleOpen(motorista, true)}>Alterar</button>
                                        <button className={styles.botoescss2} onClick={() => deleteModal(motorista.id, true, 1, 0)}>Desativar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.resultados}>
                            {admAtivos.map((usuario) => (
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
                                        <button className={styles.botoescss2} onClick={() => deleteModal(usuario.id, false, 1, 0)}>Desativar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.avisodesativados}>
                        <txt>Desativados:</txt>
                    </div>
                    <div className={styles.resultadodesativado}>
                        <div className={styles.resultados}>
                            {usuariosDesativados.map((usuario) => (
                                <div key={usuario.id} className={styles.usuario}>
                                    <div className={styles.ftuser}>
                                        <div className={styles.ftuser2}>
                                            {usuario.foto && b64toimg(usuario.foto)}
                                        </div>
                                    </div>
                                    <div className={styles.infouser}>
                                        <txt>Nome: {usuario.nome}</txt>
                                        <txt>Endereço: {usuario.endereco}</txt>
                                        <txt>Login: {usuario.login}</txt>
                                        <txt>CPF: {usuario.cpf}</txt>
                                        <txt>Telefone: {usuario.telefone}</txt>
                                        <txt>E-mail: {usuario.email}</txt>
                                        <div>
                                            <txt>Ida: {usuario.horarioida}  |   Volta: {usuario.horariovolta}</txt>
                                        </div>
                                    </div>
                                    <div className={styles.botoes}>
                                        <button className={styles.botoescss2} onClick={() => deleteModal(usuario.id, false, 0, 1)}>Reativar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.resultados}>
                            {motoristasDesativados.map((motorista) => (
                                <div key={motorista.id} className={styles.usuario}>
                                    <div className={styles.ftuser}>
                                        <div className={styles.ftuser2}>
                                            {motorista.foto && b64toimg(motorista.foto)}
                                        </div>
                                    </div>
                                    <div className={styles.infouser}>
                                        <txt>Nome: {motorista.nome}</txt>
                                        <txt>Endereço: {motorista.endereco}</txt>
                                        <txt>Login: {motorista.login}</txt>
                                        <txt>CPF: {motorista.cpf}</txt>
                                        <txt>Telefone: {motorista.telefone}</txt>
                                        <txt>E-mail: {motorista.email}</txt>
                                    </div>
                                    <div className={styles.botoes}>
                                        <button className={styles.botoescss2} onClick={() => deleteModal(motorista.id, true, 0, 1)}>Reativar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.resultados}>
                            {admDesativados.map((usuario) => (
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
                                        <button className={styles.botoescss2} onClick={() => deleteModal(usuario.id, false, 0, 1)}>Reativar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Modal open={openDelete} onClose={handleClose}>
                    <Box className={styles.modalBox}>
                        Deseja desativar o usuário?
                        <div className={styles.buttonsContainer}>
                            <button className={styles.cancel} onClick={handleClose}>Não</button>
                            <button className={styles.confirm} onClick={() => desativarUsuario(id, 0)}>Sim</button>
                        </div>
                    </Box>
                </Modal>
            </div>
            <Modal open={open} onClose={handleClose}>
                <Box className={styles.modalBox}>
                    <span className={styles.closeButton} onClick={handleClose}>&times;</span>
                    <h2>Alterar usuário!</h2>
                    <div className={styles.fieldsContainer}>
                        <input className={styles.input} type="text" value={alterNome} onChange={event => setAlterNome(event.target.value)} placeholder="Nome" />
                        <input className={styles.input} type="text" value={alterEndereco} onChange={event => setAlterEndereco(event.target.value)} placeholder="Endereço" />
                        <input className={styles.input} type="text" value={alterBairro} onChange={event => setAlterBairro(event.target.value)} placeholder="Bairro" />
                        <input className={styles.input} type="text" value={alterCidade} onChange={event => setAlterCidade(event.target.value)} placeholder="Cidade" />
                        <input className={styles.input} type="text" value={alterCpf} onChange={event => setAlterCpf(event.target.value)} placeholder="CPF" />
                        <input className={styles.input} type="text" value={alterTelefone} onChange={event => setAlterTelefone(event.target.value)} placeholder="Telefone" />
                        <input className={styles.input} type="text" value={alterEmail} onChange={event => setAlterEmail(event.target.value)} placeholder="Email" />
                        <select className={styles.select} value={alterHorarioida} onChange={event => setAlterHorarioida(event.target.value)} disabled={isAdm || isMotorista}>
                            <option value={"matutino"}>Ida matutino</option>
                            <option value={"vespertino"}>Ida vespertino</option>
                            <option value={"noturno"}>Ida noturno</option>
                        </select>
                        <select className={styles.select2} value={alterHorariovolta} onChange={event => setAlterHorariovolta(event.target.value)} disabled={isAdm || isMotorista}>
                            <option value={"matutino"}>Volta matutino</option>
                            <option value={"vespertino"}>Volta vespertino</option>
                            <option value={"noturno"}>Volta noturno</option>
                        </select>
                        <div className={styles.divproblema}>
                            <div className={styles.problema1}><input className={styles.check} type='checkbox' disabled={isMotorista} checked={alterIsAdm} onChange={() => setAlterIsAdm(!alterIsAdm)} /> Usuário adminstrador
                            </div>
                            <div className={styles.problema2}>
                                <label className={selectedFiles ? styles.selected : ""}>
                                    {selectedFiles ? "Adicionada!" : "Adicionar foto"}
                                    <input id='arquivoEdit' type="file" onChange={(e) => handleFile(e)} style={{ display: "none" }} />
                                </label>
                            </div>
                        </div>

                        <div className={styles.buttonsContainer}>
                            <button className={styles.cancel} onClick={handleClose}>Cancelar</button>
                            <button className={styles.confirm} onClick={putUsuarios}>Alterar</button>
                        </div>
                    </div>
                </Box>
            </Modal>
            <Modal open={openReactivate} onClose={handleClose}>
                <Box className={styles.modalBox}>
                    Deseja reativar o usuário?
                    <div className={styles.buttonsContainer}>
                        <button className={styles.cancel} onClick={handleClose}>Não</button>
                        <button className={styles.confirm} onClick={() => desativarUsuario(id, 1)}>Sim</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default Usuario;