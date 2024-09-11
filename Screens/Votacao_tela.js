import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import { CheckBox } from '@rneui/themed';
import axios from 'axios';
import * as Network from 'expo-network';



export default function Votacao({ navigation }) {


  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVotos, setSelectedVotos] = useState(null);
  const votos = ['vou e volto', 'vou, mas não volto', 'não vou, mas volto', 'não vou e não volto'];

  const [ip, setIp] = useState(null); 
  const [disable, setDisable] = useState(false)

  const ipCatch = async () => {
    const ip = await Network.getIpAddressAsync()
    setIp(ip)
  }

  useEffect(() => {
    ipCatch()
    horario()
  }, [])

  function postVotacao() {
    try {
      axios.post('http://10.119.0.19:3000/votacao',
        {
          opcao: selectedVotos,
          userId: 10,
        }
      )
      alert('Voto cadastrado.')
      setModalVisible(false);
      setSelectedVotos(null)
      setDisable(true)
    }
    catch (error) {
      console.log(error);
      alert('Erro ao votar. Tente novamente mais tarde')
    }
  }

  async function horario() {
    const data = new Date()
    alert(data)
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
      <TouchableOpacity onPress={() => setModalVisible(true)}>
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
