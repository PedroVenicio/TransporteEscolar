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
      axios.post('http://192.168.3.37:3000/votacao',
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

      axios.put('http://192.168.3.37:3000/usuario',
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

      const response = await axios.get('http://192.168.3.37:3000/usuario');
      const usuario = response.data.usuarios.find(u => u.id == decodedToken.userId);

      const responseVotos = await axios.get('http://192.168.3.37:3000/votacao');
      const votos = responseVotos.data.votacoes
      const votoUsuario = votos.find(v => v.userId == decodedToken.userId) || '';
      console.log(votoUsuario)

      const horIda = Object.keys(periodoIda[0]).find(key => key === usuario.horarioida);
      const horVolta = Object.keys(periodoVolta[0]).find(key => key === usuario.horariovolta);

      const horaIda = periodoIda[0][horIda]
      const horaVolta = periodoVolta[0][horVolta]

      if (votoUsuario != '') {
        axios.put('http://192.168.3.37:3000/usuario',
          {
            id: decodedToken.userId, voto: 1
          }
        )
        setDiaVotacao('');
        setDisable(true);
      }
      else if (horaAtual > horaIda && horaAtual < horaVolta) {
        axios.put('http://192.168.3.37:3000/usuario',
          {
            id: decodedToken.userId, voto: 1
          }
        )
        setDiaVotacao('');
        setDisable(true);
      }
      else if (horaAtual > horaVolta) {
        axios.put('http://192.168.3.37:3000/usuario',
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
        axios.put('http://192.168.3.37:3000/usuario',
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
      const response = await axios.get('http://192.168.3.37:3000/usuario')
      const usuario = response.data.usuarios.find(u => u.id == userId);
      setDisable(usuario.voto);
    }
    catch (error) {
      console.log('erro get voto status: ', error);
    }
  } */

  return (
    <View style={styles.container}>
      <View style={styles.divheader}>
        <Text style={styles.txtheader}>Votação</Text>
      </View>
      <View style={styles.meio}>
        <View style={styles.divtexto}>
          {diaVotacao ? <Text style={styles.texto} >Votação para o dia: {diaVotacao.split("-").reverse().join("/")}</Text> : <Text style={styles.texto}>Votação indisponível</Text>}
          <Text style={styles.textoaviso}> !* Não nos responsabilizamos pela perca da sua votação*!</Text>
        </View>
        <View style={styles.divtodos}>
          {votos.map((votos, index) => (
            <View style={styles.todos} key={index}>
              <View  style={styles.todositem}>
                <CheckBox
                  title={` ${votos}`}
                  checked={selectedVotos === votos}
                  onPress={() => setSelectedVotos(votos)}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checkedColor="#b90000"
                  uncheckedColor="#ffffff"
                  disabled={disable}
                  containerStyle={{
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    padding: 0,
                  }}
                  textStyle={{
                    color: 'white',
                  }}
                />

              </View>
            </View>
          ))}
        </View>
        <View style={styles.divbotao}>
          <TouchableOpacity style={styles.botao} disabled={disable} onPress={verifyVoto}>
            <Text style={styles.textobotao}>Votar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Confirmar voto: </Text>
            <Text style={styles.modalText}>"{selectedVotos}"?</Text>
            <TouchableOpacity onPress={postVotacao} style={[styles.modalButton, styles.confirmButton]}>
              <Text style={styles.buttonText}>Sim, confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={[styles.modalButton, styles.cancelButton]}>
              <Text style={[styles.buttonText, styles.cancelButtonText]}>Não, cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
  },
  divheader: {
    width: '100%',
    height: '20%',
    backgroundColor: '#3B1D1D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtheader: {
    color: 'white',
    fontSize: 40,
    marginTop: 40,
  },
  meio: {
    width: '100%',
    height: '80%',
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  divtexto: {
    width: '100%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 20,
    color: '#3B1D1D',
  },
  textoaviso: {
    marginTop: 5,
    fontSize: 10,
    color: '#b90000',
  },
  divtodos: {
    width: '70%',
    height: '65%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B1D1D',
    borderRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  todos: {
    width: 250,
    height: 100,
    borderRadius: 1,
    paddingLeft: 15,
    paddingRight: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  todositem: {
    backgroundColor: 'transparente',
    width: '100%',
  },
  divbotao: {
    width: '100%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botao: {
    height: 40,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#7A1F1F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '42%',
  },
  textobotao: {
    color: 'white',
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B1D1D',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#3B1D1D',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#b90000',
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cancelButtonText: {
    color: '#b90000',
  },
});