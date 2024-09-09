import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function Motorista() {

    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');

    const [id, setId] = useState('');
    const [alterLogin, setAlterLogin] = useState('');
    const [alterSenha, setAlterSenha] = useState('');
    const [alterNome, setAlterNome] = useState('');
    const [alterEndereco, setAlterEndereco] = useState('');
    const [alterBairro, setAlterBairro] = useState('');
    const [alterCidade, setAlterCidade] = useState('');
    const [alterCpf, setAlterCpf] = useState('');
    const [alterTelefone, setAlterTelefone] = useState('');
    const [alterEmail, setAlterEmail] = useState('');

    const [get, setGet] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const [ultimoId, setUltimoId] = useState('');

    const [open, setOpen] = React.useState(false);
    function handleOpen(motorista) {
        setId(motorista.id)
        setAlterNome(motorista.nome);
        setAlterEndereco(motorista.endereco);
        setAlterBairro(motorista.bairro);
        setAlterCidade(motorista.cidade);
        setAlterCpf(motorista.cpf);
        setAlterTelefone(motorista.telefone);
        setAlterEmail(motorista.email);
        setAlterLogin(motorista.login);
        setAlterSenha(motorista.senha);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    function postMotorista() {
        if (nome !== '' && endereco !== '' && bairro !== '' && cidade !== '' && cpf !== '' && telefone !== '' && email !== '') {
            try {
                const login = nome + '.' + (ultimoId + 1)
                const senha = cpf.substring(6, 0)

                axios.post('http://localhost:3000/motorista',
                    {
                        nome: nome,
                        endereco: endereco,
                        bairro: bairro,
                        cidade: cidade,
                        login: login,
                        senha: senha,
                        cpf: cpf,
                        telefone: telefone,
                        email: email
                    }
                )
                alert('Motorista cadastrado')
                setNome('')
                setEndereco('')
                setBairro('')
                setCidade('')
                setCpf('')
                setTelefone('')
                setEmail('')
                getMotoristas()
            }
            catch (error) {
                console.log(error)
                alert('Erro ao cadastrar (dados inválidos)')
            }
        }
        else {
            alert('Insira dados nos campos em branco')
        }
    }

    async function getMotoristas() {
        try {
            const response = await axios.get('http://localhost:3000/motorista');
            const motoristas = response.data.motoristas;

            if (motoristas && motoristas.length > 0) {
                setGet(motoristas);
                console.log(motoristas);

                const ids = motoristas.map(motorista => motorista.id);
                const ultimoIds = ids.at(-1);
                setUltimoId(ultimoIds);
                console.log('ultimo id: ', ultimoIds);
            } else {
                setGet([]);
                setUltimoId('');
                console.log('Nenhum motorista encontrado');
            }
        } catch (error) {
            console.log('Erro ao obter motoristas:', error);
        }
    }

    function putMotoristas() {
        if (alterNome !== '' && alterEndereco !== '' && alterBairro !== '' && alterCidade !== '' && alterCpf !== '' && alterTelefone !== '' && alterEmail !== '' && alterLogin !== '' && alterSenha !== '') {
            try {
                axios.put('http://localhost:3000/motorista',
                    {
                        id: id,
                        nome: alterNome,
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
                alert('Motorista alterado')
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

    async function deleteMotorista(id) {
        await axios.delete('http://localhost:3000/motorista', {
            data:
            {
                id: id
            }
        })
        alert('Motorista deletado');
        getMotoristas();
    }

    useEffect(() => {
        getMotoristas()
    }, []);

    const filtrar = pesquisa.length > 0
        ? get.filter(filtro => filtro.nome.toLowerCase().includes(pesquisa.toLowerCase()))
        : [];

    return (
        <div>
            <div>
                <h1>Cadastro usuário</h1>
                <input type='text' value={nome} placeholder='nome' onChange={event => setNome(event.target.value)} />
                <input type='text' value={endereco} placeholder='endereco' onChange={event => setEndereco(event.target.value)} />
                <input type='text' value={bairro} placeholder='bairro' onChange={event => setBairro(event.target.value)} />
                <input type='text' value={cidade} placeholder='cidade' onChange={event => setCidade(event.target.value)} />
                <input type='text' value={cpf} placeholder='cpf' onChange={event => setCpf(event.target.value)} />
                <input type='text' value={telefone} placeholder='telefone' onChange={event => setTelefone(event.target.value)} />
                <input type='text' value={email} placeholder='email' onChange={event => setEmail(event.target.value)} />
                <button onClick={postMotorista}>
                    cadastrar
                </button>
            </div>
            <div>
                <h1>Pesquisar motorista</h1>
                <input type='text' name='pesquisa' value={pesquisa} placeholder='pesquisar' onChange={event => setPesquisa(event.target.value)} />
                <div>
                    {pesquisa.length > 0 ? (
                        filtrar.map((filtro) => (
                            <div key={filtro.id}>
                                {filtro.nome}
                                <button onClick={() => handleOpen(filtro)}>alterar</button>
                                <button onClick={() => deleteMotorista(filtro.id)}>deletar</button>
                            </div>
                        ))
                    ) : (
                        get.map((motorista) => (
                            <div key={motorista.id}>
                                {motorista.nome}
                                <button onClick={() => handleOpen(motorista)}>alterar</button>
                                <button onClick={() => deleteMotorista(motorista.id)}>deletar</button>
                            </div>
                        ))
                    )}
                    <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <Box>
                            <input type='text' value={alterNome} placeholder='nome' onChange={event => setAlterNome(event.target.value)} />
                            <input type='text' value={alterEndereco} placeholder='endereco' onChange={event => setAlterEndereco(event.target.value)} />
                            <input type='text' value={alterBairro} placeholder='bairro' onChange={event => setAlterBairro(event.target.value)} />
                            <input type='text' value={alterCidade} placeholder='cidade' onChange={event => setAlterCidade(event.target.value)} />
                            <input type='text' value={alterCpf} placeholder='cpf' onChange={event => setAlterCpf(event.target.value)} />
                            <input type='text' value={alterTelefone} placeholder='telefone' onChange={event => setAlterTelefone(event.target.value)} />
                            <input type='text' value={alterEmail} placeholder='email' onChange={event => setAlterEmail(event.target.value)} />
                            <input type='text' value={alterLogin} placeholder='login' onChange={event => setAlterLogin(event.target.value)} />
                            <input type='text' value={alterSenha} placeholder='senha' onChange={event => setAlterSenha(event.target.value)} />
                            <button onClick={putMotoristas}>alterar</button>
                        </Box>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Motorista