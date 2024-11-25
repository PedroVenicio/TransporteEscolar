import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import { CheckBox } from '@rneui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export default function Votacao({ navigation }) {


  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVotos, setSelectedVotos] = useState(null);
  const votos = ['vou e volto', 'vou, mas não volto', 'não vou, mas volto', 'não vou e não volto'];
  const periodoIda = [{ "matutino": 530, "vespertino": 1130, "noturno": 17 }]
  const periodoVolta = [{ "matutino": 1140, "vespertino": 1900, "noturno": 2215 }]

  const [diaVotacao, setDiaVotacao] = useState('');

  const date = new Date()

  const dia = `${date.getFullYear().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate()}`;

  const horaAtual = `${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}`;
  console.log(horaAtual)
  console.log(dia)

  const [disable, setDisable] = useState(false)
  const [userId, setUserId] = useState();


  async function postVotacao() {
    try {
      const token = await AsyncStorage.getItem('token');
      axios.post('http://192.168.0.223:3000/votacao',
        {
          opcao: selectedVotos,
          userId: userId,
          data: diaVotacao
        }
      )
      alert('Voto cadastrado.')
      setModalVisible(false);
      setSelectedVotos(null);
      setDisable(true);

      axios.put('http://192.168.0.223:3000/usuario',
        {
          id: token.userId, voto: 1
        })
    }
    catch (error) {
      console.log(error);
      alert('Erro ao votar. Tente novamente mais tarde')
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])

  async function fetchUser() {
    try {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token)
      setUserId(decodedToken.userId);

      const response = await axios.get('http://192.168.0.223:3000/usuario');
      const usuario = response.data.usuarios.find(u => u.id == decodedToken.userId);

      const responseVotos = await axios.get('http://192.168.0.223:3000/votacao');
      const votos = responseVotos.data.votacoes
      const votoUsuario = votos.find(v => v.userId == decodedToken.userId) || '';
      console.log(votoUsuario)

      const horIda = Object.keys(periodoIda[0]).find(key => key === usuario.horarioida);
      const horVolta = Object.keys(periodoVolta[0]).find(key => key === usuario.horariovolta);

      const horaIda = periodoIda[0][horIda]
      const horaVolta = periodoVolta[0][horVolta]

      if (votoUsuario != '') {
        axios.put('http://192.168.0.223:3000/usuario',
          {
            id: decodedToken.userId, voto: 1
          }
        )
        setDiaVotacao('');
        setDisable(true);
      }
      else if (horaAtual > horaIda && horaAtual < horaVolta) {
        axios.put('http://192.168.0.223:3000/usuario',
          {
            id: decodedToken.userId, voto: 1
          }
        )
        setDiaVotacao('');
        setDisable(true);
      }
      else if (horaAtual > horaVolta) {
        axios.put('http://192.168.0.223:3000/usuario',
          {
            id: decodedToken.userId, voto: 0
          }
        )

        const date = new Date()
        const diaVotacao = `${date.getFullYear().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate() + 1}`;

        setDisable(false);
        setDiaVotacao(diaVotacao)
      }
      else if (horaAtual < horaIda) {
        axios.put('http://192.168.0.223:3000/usuario',
          {
            id: decodedToken.userId, voto: 0
          }
        )
        const date = new Date()
        const diaVotacao = `${date.getFullYear().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate()}`;
        setDisable(false);
        setDiaVotacao(diaVotacao)
      }
    }
    catch (error) {
      console.log('erro: ', error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      /*  getVotoStatus(); */
      fetchUser()
    }, []))

  function verifyVoto() {
    if (selectedVotos == null) {
      alert('Você não selecionou a opção');
    }
    else {
      setModalVisible(true);
    }
  }

  /* async function getVotoStatus() {
    try {
      const response = await axios.get('http://192.168.0.223:3000/usuario')
      const usuario = response.data.usuarios.find(u => u.id == userId);
      setDisable(usuario.voto);
    }
    catch (error) {
      console.log('erro get voto status: ', error);
    }
  } */

  return (
    <View style={styles.container}>
      {diaVotacao ? <Text>Votação para o dia: {diaVotacao.split("-").reverse().join("/")}</Text> : <Text>Votação indisponível</Text>}
      {votos.map((votos, index) => (
        <View key={index} style={styles.todos}>
          <CheckBox style={styles.checkBox}
            title={` ${votos}`}
            checked={selectedVotos === votos}
            onPress={() => setSelectedVotos(votos)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checkedColor="red"
            disabled={disable}
          />
        </View>
      ))}
      <TouchableOpacity disabled={disable} onPress={verifyVoto}>
        <Text>Votar</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View>
          <Text>Confirmar voto: "{selectedVotos}"?</Text>
          <TouchableOpacity onPress={postVotacao}>
            <Text>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Text>Não</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  todos: {
    backgroundColor: 'transparent',
    width: 210,
    height: 65,
  },
});
