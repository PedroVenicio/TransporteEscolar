import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function HomeAdm({ navigation }) {

    const [excecoes, setExcecoes] = useState([]);
    const [resolvidas, setResolvidas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    const opcoesIda = ["5:50", "11:50", "17:30"];
    const opcoesVolta = ["11:40", "19:00", "22:15"];

    useEffect(() => {
        async function getExcecao() {
            const response = await axios.get('http://192.168.0.223:3000/excessao');
            const excecao = response.data.excessoes;
            const pendentes = excecao.filter(ex => ex.status == 0);
            const resolved = excecao.filter(ex => ex.status !== 0);

            setExcecoes(pendentes || []);
            setResolvidas(resolved || []);

            const responseUsuarios = await axios.get('http://192.168.0.223:3000/usuario');
            const usuario = responseUsuarios.data.usuarios;
            setUsuarios(usuario || [])
        }
        getExcecao()
    }, [])

    function aceitarExcecao(id) {
        axios.put('http://192.168.0.223:3000/excessao', {
            id, status: 1
        })
    }

    return (
        <View style={styles.container}>
            <View>
                <Text>Exceções pendentes</Text>
                {excecoes == 0 ? <Text>Não há exceções solicitadas</Text> : excecoes.map((excecao) => {
                    const usuario = usuarios.find(user => user.id == excecao.userId);
                    return (
                        <View key={excecao.id}>
                            <Text>Motivo: {excecao.descricao}</Text>
                            <Text>Horario ida: {excecao.opcaoIda == 0 ? "não selecionado" : opcoesIda[excecao.opcaoIda - 1]}</Text>
                            <Text>Horario volta: {excecao.opcaoVolta == 0 ? "não selecionado" : opcoesVolta[excecao.opcaoVolta - 4]}</Text>
                            <Text>Data: {excecao.data.slice(5).split('00:00:00 GMT')}</Text>
                            <Text>Usuario: {usuario ? usuario.nome : "Usuário não encontrado"}</Text>
                            <TouchableOpacity onPress={() => aceitarExcecao(excecao.id)}>
                                <Text>Aceitar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
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
                        <View key={excecao.id}>
                            <Text>Motivo: {excecao.descricao}</Text>
                            <Text>Horario ida: {excecao.opcaoIda == 0 ? "não selecionado" : opcoesIda[excecao.opcaoIda - 1]}</Text>
                            <Text>Horario volta: {excecao.opcaoVolta == 0 ? "não selecionado" : opcoesVolta[excecao.opcaoVolta - 4]}</Text>
                            <Text>Data: {excecao.data.slice(5).split('00:00:00 GMT')}</Text>
                            <Text>Usuario: {usuario ? usuario.nome : "Usuário não encontrado"}</Text>
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
});