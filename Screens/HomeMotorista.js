import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Touchable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { LogBox } from 'react-native';


export default function HomeMotorista({ navigation }) {
    const [motoristaId, setMotoristaId] = useState('');
    const [motorista, setMotorista] = useState([]);

    useEffect(() => {
        async function getMotoristas() {
            try {
                const response = await axios.get('http://192.168.0.223:3000/motorista');
                const motoristas = response.data.motoristas;
                setMotorista(motoristas);

                const token = await AsyncStorage.getItem('token');
                const decodedToken = jwtDecode(token);
                setMotoristaId(decodedToken.userId)
            }
            catch (error) {
                console.log(error)
            }
        }
        getMotoristas()
    }, [])

    const motoristas = motorista.find(user => user.id == motoristaId)

    return (
        <View style={styles.container}>
            {motoristas ? (
                <View>
                    <Image
                        style={styles.foto}
                        source={{
                            uri: motoristas.foto,
                        }}
                    />
                    <Text>Olá, {motoristas.nome}</Text>
                </View>
            ) : (
                <Text>Carregando...</Text>
            )}
            <TouchableOpacity onPress={() => navigation.navigate('AlunosRota', { "periodo": "ida matutino" })}>
                <Text>Ida Matutino</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AlunosRota', { "periodo": "volta matutino" })}>
                <Text>Volta Matutino</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AlunosRota', { "periodo": "ida vespertino" })}>
                <Text>Ida Vespertino</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AlunosRota', { "periodo": "volta vespertino" })}>
                <Text>Volta Vespertino</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AlunosRota', { "periodo": "ida noturno" })}>
                <Text>Ida Noturno</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AlunosRota', { "periodo": "volta noturno" })}>
                <Text>Volta Noturno</Text>
            </TouchableOpacity>
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
    foto: {
        height: 50,
        width: 50,
    }
});