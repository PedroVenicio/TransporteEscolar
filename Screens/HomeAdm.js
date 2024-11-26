import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
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
        const response = await axios.get('http://192.168.3.37:3000/excessao');
        const excecao = response.data.excessoes;
        const pendentes = excecao.filter(ex => ex.status == 0);
        const resolved = excecao.filter(ex => ex.status != 0);

        setExcecoes(pendentes || []);
        setResolvidas(resolved || []);

        const responseUsuarios = await axios.get('http://192.168.3.37:3000/usuario');
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

        axios.put('http://192.168.3.37:3000/excessao', {
            id, status: status
        })
        alert("a exceção foi atualizada")
    }

    const adm = usuarios.find(user => user.id == admId)

    return (
        <View style={styles.container}>
            <View style={styles.divheader}>
                {adm ? (
                    <View style={styles.header}>
                        <View style={styles.divft}>
                            <Image style={styles.foto} source={{ uri: adm.foto, }} />
                        </View>
                        <View style={styles.divnome}>
                            <Text style={styles.textoheader}>Olá, {adm.nome}!</Text>
                        </View>
                    </View>
                ) : (
                    <Text>Carregando...</Text>
                )}
            </View>
            <View style={styles.meio}>
                <View style={styles.tipo}>
                    <Text style={styles.tipotxt}>Exceções pendentes</Text>
                </View>

                <View style={styles.excecoes}>
                    <ScrollView>
                        {excecoes == 0 ? <Text>Não há exceções solicitadas</Text> : excecoes.map((excecao) => {
                            const usuario = usuarios.find(user => user.id == excecao.userId);
                            return (
                                <View key={excecao.id} style={styles.card}>
                                    <Text style={styles.cardtxt}>Usuario: {usuario ? usuario.nome : "Usuário não encontrado"}</Text>
                                    <Text style={styles.cardtxt}>Horario ida: {excecao.opcaoIda == 0 ? "não selecionado" : opcoesIda[excecao.opcaoIda - 1]}</Text>
                                    <Text style={styles.cardtxt}>Horario volta: {excecao.opcaoVolta == 0 ? "não selecionado" : opcoesVolta[excecao.opcaoVolta - 4]}</Text>
                                    <Text style={styles.cardtxt}>Data: {excecao.data.slice(5).split('00:00:00 GMT')}</Text>
                                    <Text style={styles.cardtxt}>Motivo: {excecao.descricao}</Text>
                                    <View style={styles.viewbotao}>
                                        <TouchableOpacity style={styles.botaorecusar} onPress={() => definirExcecao(excecao.id, 2)}>
                                            <Text style={styles.botaorecusartxt}>Recusar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.botaoaceitar} onPress={() => definirExcecao(excecao.id, 1)}>
                                            <Text style={styles.botaoaceitartxt}>Aceitar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
                <View style={styles.tipo}>
                    <Text style={styles.tipotxt}>Exceções resolvidas</Text>
                </View>
                <View style={styles.excecoes}>
                    <ScrollView>
                        {resolvidas == 0 ? <Text style={styles.tipotxt2}>Não há exceções resolvidas</Text> : resolvidas.map((excecao) => {
                            const usuario = usuarios.find(user => user.id == excecao.userId);
                            return (
                                <View key={excecao.id} style={styles.card}>
                                    <Text style={styles.cardtxt}>Usuario: {usuario ? usuario.nome : "Usuário não encontrado"}</Text>
                                    <Text style={styles.cardtxt}>Horario ida: {excecao.opcaoIda == 0 ? "não selecionado" : opcoesIda[excecao.opcaoIda - 1]}</Text>
                                    <Text style={styles.cardtxt}>Horario volta: {excecao.opcaoVolta == 0 ? "não selecionado" : opcoesVolta[excecao.opcaoVolta - 4]}</Text>
                                    <Text style={styles.cardtxt}>Data: {excecao.data.slice(5).split('00:00:00 GMT')}</Text>
                                    <Text style={styles.cardtxt}>Motivo: {excecao.descricao}</Text>
                                    <Text style={styles.cardtxt}>Estado: {excecao.status == 1 ? "Aprovado" : "Rejeitado"}</Text>
                                    <View style={styles.viewbotao}>
                                        <TouchableOpacity style={styles.botaoalterar} onPress={() => definirExcecao(excecao.id, 0)}>
                                            <Text style={styles.botaorecusartxt}>Alterar decisão</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3B1D1D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    divheader: {
        width: '100%',
        height: '20%',
        backgroundColor: '#3B1D1D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 35,
    },
    divft: {
        height: '70%',
        width: '20%',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#860204',
    },
    foto: {
        height: '100%',
        width: '100%',
        borderRadius: 30,
    },
    divnome: {
        marginLeft: 20,
    },
    textoheader: {
        color: '#FFFFFF',
        fontSize: 30,
    },
    meio: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        height: '80%',
        width: '100%',
    },
    tipo: {
        height: '5%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tipotxt: {
        color: '#b90000',
        fontSize: 20,
        fontWeight: 'bold',
    },
    tipotxt2: {
        color: '#7A1F1F',
        fontSize: 16,
        marginTop: 20,
    },
    excecoes: {
        height: '40%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#7A1F1F',
        marginTop: 15,
        height: 200,
        width: 300,
        paddingHorizontal: 20,
        paddingVertical: 30,
        justifyContent: 'center',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    cardtxt: {
        color: 'white',
        marginLeft: 15,
    },
    viewbotao: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10,
    },
    botaorecusar: {
        width: '35%',
        height: '65%',
        backgroundColor: '#b90000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    botaoalterar: {
        width: '70%',
        height: '65%',
        backgroundColor: '#b90000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    botaorecusartxt: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    botaoaceitar: {
        width: '35%',
        height: '65%',
        backgroundColor: 'lime',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    botaoaceitartxt: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
});