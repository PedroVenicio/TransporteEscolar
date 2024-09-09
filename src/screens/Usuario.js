import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


function Usuario() {

    //inputs cadastro
    const [nome, setNome] = useState('');
    const [horarioida, setHorarioida] = useState('');
    const [horariovolta, setHorariovolta] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');

    //inputs editar
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

    //pesquisa
    const [get, setGet] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const [ultimoId, setUltimoId] = useState('');

    //modal
    const [open, setOpen] = React.useState(false);

    function handleOpen(usuario) {
        setId(usuario.id)
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
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    function postUsuarios() {
        if (nome !== '' && horarioida !== '' && horariovolta !== '' && endereco !== '' && bairro !== '' && cidade !== '' && cpf !== '' && telefone !== '' && email !== '') {
            try {
                const login = nome + '.' + (ultimoId + 1) //utilizar split para pegar apenas o primeiro nome (será nome completo)
                const senha = cpf.substring(6, 0)

                axios.post('http://localhost:3000/usuario',
                    {
                        nome: nome,
                        horarioida: horarioida,
                        horariovolta: horariovolta,
                        endereco: endereco,
                        bairro: bairro,
                        cidade: cidade,
                        login: login,
                        senha: senha,
                        cpf: cpf,
                        telefone: telefone,
                        email: email
                    },
                )
                alert('Usuario cadastrado')
                setNome('')
                setHorarioida('')
                setHorariovolta('')
                setEndereco('')
                setBairro('')
                setCidade('')
                setCpf('')
                setTelefone('')
                setEmail('')
                getUsuarios()
            }
            catch (error) {
                console.log(error);
                alert('Erro ao cadastrar (dados inválidos)')
            }
        }
        else {
            alert('Insira dados nos campos em branco')
        }
    }

    async function getUsuarios() {
        try {
            const response = await axios.get('http://localhost:3000/usuario');
            const usuarios = response.data.usuarios;
            
            if (usuarios && usuarios.length > 0) {
                setGet(usuarios);
                console.log(usuarios);

                const ids = usuarios.map(usuario => usuario.id);
                const ultimoIds = ids.at(-1);
                setUltimoId(ultimoIds);
                console.log('ultimo id: ', ultimoIds);
            } else {
                setGet([]);
                setUltimoId('');
                console.log('Nenhum usuario encontrado');
            }
        } catch (error) {
            console.log('Erro ao obter usuarios:', error);
        }
    }

    function putUsuarios() {
        if (alterNome !== '' && alterHorarioida !== '' && alterHorariovolta !== '' && alterEndereco !== '' && alterBairro !== '' && alterCidade !== '' && alterCpf !== '' && alterTelefone !== '' && alterEmail !== '' && alterLogin !== '' && alterSenha !== '') {
            try {
                axios.put('http://localhost:3000/usuario',
                    {
                        id: id,
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
                        email: alterEmail
                    }
                )
                alert('Usuario alterado')
            }
            catch (error) {
                console.log(error);
                alert('Erro ao editar (dados inválidos)')
            }
        }
        else {
            alert('Não deixe campos vazios')
        }
    }

    async function deleteUsuario(id) {
        await axios.delete('http://localhost:3000/usuario', {
            data:
            {
                id: id
            }
        })
        alert('Usuario deletado');
        getUsuarios()
    }

    useEffect(() => {
        getUsuarios();
    }, []);


    const filtrar = pesquisa.length > 0
        ? get.filter(filtro => filtro.nome.toLowerCase().includes(pesquisa.toLowerCase()))
        : [];

    return (
        <div>
            <div>
                <h1>Cadastro usuário</h1>
                <input type='text' value={nome} placeholder='nome' onChange={event => setNome(event.target.value)} />
                <input type='text' value={horarioida} placeholder='horario ida' onChange={event => setHorarioida(event.target.value)} />
                <input type='text' value={horariovolta} placeholder='horario volta' onChange={event => setHorariovolta(event.target.value)} />
                <input type='text' value={endereco} placeholder='endereco' onChange={event => setEndereco(event.target.value)} />
                <input type='text' value={bairro} placeholder='bairro' onChange={event => setBairro(event.target.value)} />
                <input type='text' value={cidade} placeholder='cidade' onChange={event => setCidade(event.target.value)} />
                <input type='text' value={cpf} placeholder='cpf' onChange={event => setCpf(event.target.value)} />
                <input type='text' value={telefone} placeholder='telefone' onChange={event => setTelefone(event.target.value)} />
                <input type='text' value={email} placeholder='email' onChange={event => setEmail(event.target.value)} />
                <button onClick={postUsuarios}>
                    cadastrar
                </button>
            </div>
            <div>
                <h1>Pesquisar usuario</h1>
                <input type='text' name='pesquisa' value={pesquisa} placeholder='pesquisar' onChange={event => setPesquisa(event.target.value)} />
                <div>
                    {pesquisa.length > 0 ? (
                        filtrar.map((filtro) => (
                            <div key={filtro.id}>
                                {filtro.nome}
                                <button onClick={() => handleOpen(filtro)}>alterar</button>
                                <button onClick={() => deleteUsuario(filtro.id)}>deletar</button>
                            </div>
                        ))
                    ) : (
                        get.map((usuario) => (
                            <div key={usuario.id}>
                                {usuario.nome}
                                <button onClick={() => handleOpen(usuario)}>alterar</button>
                                <button onClick={() => deleteUsuario(usuario.id)}>deletar</button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <Box>
                                        <input type='text' value={alterNome} placeholder='nome' onChange={event => setAlterNome(event.target.value)} />
                                        <input type='text' value={alterHorarioida} placeholder='horario ida' onChange={event => setAlterHorarioida(event.target.value)} />
                                        <input type='text' value={alterHorariovolta} placeholder='horario volta' onChange={event => setAlterHorariovolta(event.target.value)} />
                                        <input type='text' value={alterEndereco} placeholder='endereco' onChange={event => setAlterEndereco(event.target.value)} />
                                        <input type='text' value={alterBairro} placeholder='bairro' onChange={event => setAlterBairro(event.target.value)} />
                                        <input type='text' value={alterCidade} placeholder='cidade' onChange={event => setAlterCidade(event.target.value)} />
                                        <input type='text' value={alterCpf} placeholder='cpf' onChange={event => setAlterCpf(event.target.value)} />
                                        <input type='text' value={alterTelefone} placeholder='telefone' onChange={event => setAlterTelefone(event.target.value)} />
                                        <input type='text' value={alterEmail} placeholder='email' onChange={event => setAlterEmail(event.target.value)} />
                                        <input type='text' value={alterLogin} placeholder='email' onChange={event => setAlterLogin(event.target.value)} />
                                        <input type='text' value={alterSenha} placeholder='email' onChange={event => setAlterSenha(event.target.value)} />
                                        <button onClick={putUsuarios}>alterar</button>
                                    </Box>
                                </Modal>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Usuario;