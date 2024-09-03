import React, {useState} from 'react';
import axios from 'axios';

function Usuario() {

    const [nome, setNome] = useState('');
    const [horarioida, setHorarioida] = useState('');
    const [horariovolta, setHorariovolta] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');

    return (
        <div>
            <h1>Cadastro usuário</h1>
            <input type='text' value={nome} placeholder='nome' onChange={event => setNome(event.target.value)}/>
            <input type='text' value={horarioida} placeholder='horario ida' onChange={event => setHorarioida(event.target.value)}/>
            <input type='text' value={horariovolta} placeholder='horario volta' onChange={event => setHorariovolta(event.target.value)}/>
            <input type='text' value={endereco} placeholder='endereco' onChange={event => setEndereco(event.target.value)}/>
            <input type='text' value={bairro} placeholder='bairro' onChange={event => setBairro(event.target.value)}/>
            <input type='text' value={cidade} placeholder='cidade' onChange={event => setCidade(event.target.value)}/>
            <input type='text' value={login} placeholder='login' onChange={event => setLogin(event.target.value)}/>
        </div>
    );
}

export default Usuario;