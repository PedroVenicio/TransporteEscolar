import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import axios from 'axios';

export default function AlunosRota({ navigation, route }) {
    const { periodo } = route.params;
    const periodos = ["ida matutino", "volta matutino", "ida vespertino", "volta vespertino", "ida noturno", "volta noturno"];

    const [rotaIda, setRotaIda] = useState([]);
    const [rotaVolta, setRotaVolta] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [rotaDisplay, setRotaDisplay] = useState([]);

    const [idMatutino, setIdMatutino] = useState('');
    const [idVespertino, setIdVespertino] = useState('');
    const [idNoturno, setIdNoturno] = useState('');
    const [idVoltaMatutino, setIdVoltaMatutino] = useState('');
    const [idVoltaVespertino, setIdVoltaVespertino] = useState('');
    const [idVoltaNoturno, setIdVoltaNoturno] = useState('');

    const date = new Date();
    const formattedDate = `${date.getFullYear().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate()}`;

    const normalizeDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate() + 1).toString().padStart(2, '0')}`;
    };

    async function getRotas() {
        try {
            const responseIda = await axios.get('http://192.168.3.37:3000/rota_ida');
            const responseVolta = await axios.get('http://192.168.3.37:3000/rota_volta');
            const responseUsuarios = await axios.get('http://192.168.3.37:3000/usuario');

            const rotasIda = responseIda.data.rotas_ida || [];
            const rotasVolta = responseVolta.data.rotas_volta || [];
            const usuarios = responseUsuarios.data.usuarios || [];

            setUsuarios(usuarios);
            setRotaIda(rotasIda);
            setRotaVolta(rotasVolta);

            const rotaMatutino = rotasIda.find(r => normalizeDate(r.data) === formattedDate && r.hora === "matutino");
            const rotaVoltaMatutino = rotasVolta.find(r => normalizeDate(r.data) === formattedDate && r.hora === "matutino");
            setIdMatutino(rotaMatutino ? rotaMatutino.id : 0);
            setIdVoltaMatutino(rotaVoltaMatutino ? rotaVoltaMatutino.id : 0);

            const rotaVespertino = rotasIda.find(r => normalizeDate(r.data) === formattedDate && r.hora === "vespertino");
            const rotaVoltaVespertino = rotasVolta.find(r => normalizeDate(r.data) === formattedDate && r.hora === "vespertino");
            setIdVespertino(rotaVespertino ? rotaVespertino.id : 0);
            setIdVoltaVespertino(rotaVoltaVespertino ? rotaVoltaVespertino.id : 0);

            const rotaNoturno = rotasIda.find(r => normalizeDate(r.data) === formattedDate && r.hora === "noturno");
            const rotaVoltaNoturno = rotasVolta.find(r => normalizeDate(r.data) === formattedDate && r.hora === "noturno");
            setIdNoturno(rotaNoturno ? rotaNoturno.id : 0);
            setIdVoltaNoturno(rotaVoltaNoturno ? rotaVoltaNoturno.id : 0);

        } catch (error) {
            console.error("Erro ao carregar as rotas:" (error));
        }
    }

    useEffect(() => {
        getRotas();
    }, []);

    useEffect(() => {
        try {
            if (rotaIda.length > 0 && rotaVolta.length > 0) {
                let rota;
                switch (periodo) {
                    case "ida matutino":
                        rota = rotaIda.find(r => r.id === idMatutino);
                        break;
                    case "volta matutino":
                        rota = rotaVolta.find(r => r.id === idVoltaMatutino);
                        break;
                    case "ida vespertino":
                        rota = rotaIda.find(r => r.id === idVespertino);
                        break;
                    case "volta vespertino":
                        rota = rotaVolta.find(r => r.id === idVoltaVespertino);
                        break;
                    case "ida noturno":
                        rota = rotaIda.find(r => r.id === idNoturno);
                        break;
                    case "volta noturno":
                        rota = rotaVolta.find(r => r.id === idVoltaNoturno);
                        break;
                    default:
                        rota = null;
                }
                setRotaDisplay(rota);
            }
        } catch (error) {
            console.error("Erro ao atualizar a rota display:", error.message);
        }
    }, [periodo, rotaIda, rotaVolta, idMatutino, idVespertino, idNoturno, idVoltaMatutino, idVoltaVespertino, idVoltaNoturno]);

    return (
        <View style={styles.container}>
            {rotaIda.length === 0 || rotaVolta.length === 0 ? (
                <Text>Carregando dados...</Text>
            ) : (
                <>
                    <Text>Rota {periodo} do dia {formattedDate.split("-").reverse().join("/")}</Text>
                    {rotaDisplay && rotaDisplay.alunos ? (
                        rotaDisplay.alunos.split(',').map(id => {
                            const aluno = usuarios.find(u => u.id.toString() === id.trim());
                            return aluno ? (
                                <View key={aluno.id}>
                                    <Text>{aluno.id}</Text>
                                    <Text>{aluno.nome}</Text>
                                </View>
                            ) : null;
                        })
                    ) : (
                        <Text>Rota não encontrada ou inexistente</Text>
                    )}
                </>
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
