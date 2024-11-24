import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export default function HomeAdm({ navigation }) {

    const [excecoes, setExcecoes] = useState([]);
    const [resolvidas, setResolvidas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [admId, setAdmId] = useState('');

    const opcoesIda = ["5:50", "11:50", "17:30"];
    const opcoesVolta = ["11:40", "19:00", "22:15"];

    useEffect(() => {
        getExcecao()
    }, [])

    async function getExcecao() {
        const response = await axios.get('http://192.168.0.223:3000/excessao');
        const excecao = response.data.excessoes;
        const pendentes = excecao.filter(ex => ex.status == 0);
        const resolved = excecao.filter(ex => ex.status != 0);

        setExcecoes(pendentes || []);
        setResolvidas(resolved || []);

        const responseUsuarios = await axios.get('http://192.168.0.223:3000/usuario');
        const usuario = responseUsuarios.data.usuarios;
        setUsuarios(usuario || [])

        const token = await AsyncStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        setAdmId(decodedToken.userId)
    }

    function definirExcecao(id, status) {
        if (status === 1 || status === 2) {
            setExcecoes((prevExcecoes) => prevExcecoes.filter(ex => ex.id !== id));
            setResolvidas((prevResolvidas) => [
                ...prevResolvidas,
                { ...excecoes.find(ex => ex.id === id), status }
            ]);
        } else if (status === 0) {
            setResolvidas((prevResolvidas) => prevResolvidas.filter(ex => ex.id !== id));
            setExcecoes((prevExcecoes) => [
                ...prevExcecoes,
                { ...resolvidas.find(ex => ex.id === id), status }
            ]);
        }

        axios.put('http://192.168.0.223:3000/excessao', {
            id, status: status
        })
        alert("a exceção foi atualizada")
    }

    const adm = usuarios.find(user => user.id == admId)

    return (
        <View style={styles.container}>
            <View>
                {adm ? (
                    <View>
                        <Image
                            style={styles.foto}
                            source={{
                                uri: adm.foto,
                            }}
                        />
                        <Text>Olá, {adm.nome}</Text>
                    </View>
                ) : (
                    <Text>Carregando...</Text>
                )}
                <Text>Exceções pendentes</Text>
                {excecoes == 0 ? <Text>Não há exceções solicitadas</Text> : excecoes.map((excecao) => {
                    const usuario = usuarios.find(user => user.id == excecao.userId);
                    return (
                        <View key={excecao.id} style={styles.separar}>
                            <Text>Motivo: {excecao.descricao}</Text>
                            <Text>Horario ida: {excecao.opcaoIda == 0 ? "não selecionado" : opcoesIda[excecao.opcaoIda - 1]}</Text>
                            <Text>Horario volta: {excecao.opcaoVolta == 0 ? "não selecionado" : opcoesVolta[excecao.opcaoVolta - 4]}</Text>
                            <Text>Data: {excecao.data.slice(5).split('00:00:00 GMT')}</Text>
                            <Text>Usuario: {usuario ? usuario.nome : "Usuário não encontrado"}</Text>
                            <TouchableOpacity onPress={() => definirExcecao(excecao.id, 1)}>
                                <Text>Aceitar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => definirExcecao(excecao.id, 2)}>
                                <Text>Recusar</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>

            <View>
                <Text>Exceções resolvidas</Text>
                {resolvidas == 0 ? <Text>Não há exceções resolvidas</Text> : resolvidas.map((excecao) => {
                    const usuario = usuarios.find(user => user.id == excecao.userId);
                    return (
                        <View key={excecao.id} style={styles.separar}>
                            <Text>Motivo: {excecao.descricao}</Text>
                            <Text>Horario ida: {excecao.opcaoIda == 0 ? "não selecionado" : opcoesIda[excecao.opcaoIda - 1]}</Text>
                            <Text>Horario volta: {excecao.opcaoVolta == 0 ? "não selecionado" : opcoesVolta[excecao.opcaoVolta - 4]}</Text>
                            <Text>Data: {excecao.data.slice(5).split('00:00:00 GMT')}</Text>
                            <Text>Usuario: {usuario ? usuario.nome : "Usuário não encontrado"}</Text>
                            <Text>Estado: {excecao.status == 1 ? "Aprovado" : "Rejeitado"}</Text>
                            <TouchableOpacity onPress={() => definirExcecao(excecao.id, 0)}>
                                <Text>Alterar decisão</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    separar: {
        marginBottom: 20
    },
    foto: {
        height: 50,
        width: 50,
    }
});