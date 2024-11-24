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
  const periodoIda = [{"matutino": 530, "vespertino": 1130, "noturno": 17}]
  const periodoVolta = [{"matutino": 1140, "vespertino": 1900, "noturno": 2215}]
  const date = new Date()
  const horaAtual = `${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}`;

  const [disable, setDisable] = useState(false)
  const [refreshKey, setRefreshKey] = useState(null);
  const [userId, setUserId] = useState();
  

  async function postVotacao() {
    try {
      const token = await AsyncStorage.getItem('token');
      axios.post('http://192.168.0.223:3000/votacao',
        {
          opcao: selectedVotos,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
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
    async function fetchUser() {
      try {
        const token = await AsyncStorage.getItem('token');
        const decodedToken = jwtDecode(token)
        setUserId(decodedToken.userId);
      }
      catch (error) {
        console.log('erro: ', error)
      }
    }
    fetchUser();
  }, [])

  useFocusEffect(
    useCallback(() => {
      getVotoStatus();
    }, [refreshKey])
  )

  function refresh() {
    setRefreshKey(oldKey => oldKey + 1)
    setSelectedVotos(null);
  }

  function verifyVoto() {
    if (selectedVotos == null) {
      alert('Você não selecionou a opção');
    }
    else {
      setModalVisible(true);
    }
  }

  async function getVotoStatus() {
    try {
      const response = await axios.get('http://192.168.0.223:3000/usuario')
      const usuario = response.data.usuarios.find(u => u.id == userId);
      setDisable(usuario.voto)
    }
    catch (error) {
      console.log('erro: ', error)
    }
  }

  return (
    <View style={styles.container}>
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
      <TouchableOpacity onPress={() => refresh()}>
        <Text>Recarregar</Text>
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
