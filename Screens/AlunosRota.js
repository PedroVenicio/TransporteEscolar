import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Touchable } from 'react-native';
import axios from 'axios';

export default function AlunosRota({ navigation, route }) {

    const { periodo } = route.params;
    const periodos = ["ida matutino", "volta matutino", "ida vespertino", "volta vespertino", "ida noturno", "volta noturno"];

    const [rotas, setRotas] = useState([]);
    const [rotaIda, setRotaIda] = useState([]);
    const [rotaVolta, setRotaVolta] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    const [rotaDisplay, setRotaDisplay] = useState([]);

    const [idMatutino, setIdMatutino] = useState(0);
    const [idVespertino, setIdVespertino] = useState(0);
    const [idNoturno, setIdNoturno] = useState(0);

    const date = new Date();

    const formattedDate = `${date.getFullYear().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate()}`;

    async function getRotas() {
        const response = await axios.get('http://192.168.0.223:3000/rotas')
        const responseIda = await axios.get('http://192.168.0.223:3000/rota_ida')
        const responseVolta = await axios.get('http://192.168.0.223:3000/rota_volta')
        const responseUsuarios = await axios.get('http://192.168.0.223:3000/usuario');

        const rota = response.data.rotas;
        const rotasIda = responseIda.data.rotas_ida;
        const rotasVolta = responseVolta.data.rotas_volta;
        const usuario = responseUsuarios.data.usuarios;

        setUsuarios(usuario || [])

        const normalizeDate = (dateString) => {
            const date = new Date(dateString);
            return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate() + 1).toString().padStart(2, '0')}`;
        };

        setRotas(rota || []);
        setRotaIda(rotasIda || []);
        setRotaVolta(rotasVolta || []);

        const rotaMatutino = rotasIda.find(r => normalizeDate(r.data) == formattedDate && r.hora == 550);
        setIdMatutino(rotaMatutino ? rotaMatutino.id : 0)

        const rotaVespertino = rotasIda.find(r => normalizeDate(r.data) == formattedDate && r.hora == 1150);
        setIdVespertino(rotaVespertino ? rotaVespertino.id : 0)

        const rotaNoturno = rotasIda.find(r => normalizeDate(r.data) == formattedDate && r.hora == 1150);
        setIdNoturno(rotaNoturno ? rotaNoturno.id : 0)
    }

    useEffect(() => {
        getRotas()
    }, [])

    useEffect(() => {
        if (periodos.indexOf(periodo) === 0) {
            setRotaDisplay(rotaIda.find(r => r.id === idMatutino));
        } else if (periodos.indexOf(periodo) === 1) {
            setRotaDisplay(rotaIda.find(r => r.id === idVespertino));
        } else if (periodos.indexOf(periodo) === 2) {
            setRotaDisplay(rotaIda.find(r => r.id === idMatutino));
        } else if (periodos.indexOf(periodo) === 3) {
            setRotaDisplay(rotaIda.find(r => r.id === idVespertino));
        } else if (periodos.indexOf(periodo) === 4) {
            setRotaDisplay(rotaIda.find(r => r.id === idNoturno));
        } else {
            setRotaDisplay(rotaIda.find(r => r.id === idNoturno));
        }
    }, [periodo, rotaIda, idMatutino, idVespertino, idNoturno]);

    return (
        <View style={styles.container}>
            <Text>Rota {periodo} do dia {formattedDate}</Text>

            {rotaDisplay && rotaDisplay.alunos ? (
                rotaDisplay.alunos.split(',').map(id => {
                    const aluno = usuarios.find(u => u.id.toString() === id.trim() && u.horarioIda === rotaDisplay.hora);
                    return aluno ? (
                        <View key={aluno.id}>
                            <Text>{aluno.id}</Text>
                            <Text>{aluno.nome}</Text>
                        </View>
                    ) : null;
                })
            ) : (
                <Text>Rota não encontrada</Text>
            )}
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
    }
});