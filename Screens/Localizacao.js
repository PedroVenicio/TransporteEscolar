import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, Image, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-modern-datepicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { CheckBox } from '@rneui/themed';


export default function Localizacao({ navigation }) {

  const [opcaoIda, setOpcaoIda] = useState(0);
  const [opcaoVolta, setOpcaoVolta] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState('');
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  const [selectedOpcao, setSelectedOpcao] = useState('ida e volta');
  const opcao = ['ida e volta', 'ida', 'volta'];

  const today = new Date();
  const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD');
  const [date, setDate] = useState(startDate);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get('http://192.168.3.37:3000/usuario')
        const usuario = response.data.usuarios;
        setUsuarios(usuario);

        const token = await AsyncStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId);
      }
      catch (error) {
        console.log('erro: ', error)
      }
    }
    fetchUser();
  }, [])

  async function enviar() {
    if (descricao && (opcaoIda !== 'nulo' || opcaoVolta !== 'nulo')) {
      try {
        const token = await AsyncStorage.getItem('token');
        axios.post('http://192.168.3.37:3000/excessao',
          {
            descricao: descricao,
            status: 0,
            opcaoIda: opcaoIda == 'nulo' ? 0 : opcaoIda,
            opcaoVolta: opcaoVolta == 'nulo' ? 0 : opcaoVolta,
            userId: userId,
            data: date
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        )
        setOpcaoIda('nulo');
        setOpcaoVolta('nulo');
        setDescricao(null);
        setModalVisible(false);
        setDate(getToday());
        alert('Exceção requisitada')
      }
      catch (error) {
        console.log(error)
        alert('Erro ao registrar exceção')
      }
    }
    else {
      alert("Preencha a descrição e ao menos um horário")
    }
  }

  function handleOpen() {
    setOpen(!open)
  }

  function handleOpen1() {
    setOpen1(!open1)
  }

  function handleChange(propDate) {
    setDate(propDate)
  }

  function handleCheckbox(opcao) {
    setSelectedOpcao(opcao);
    setOpcaoIda(0);
    setOpcaoVolta(0);
  }

  const usuario = usuarios.find(user => user.id == userId)


  return (
    <View style={styles.container}>
      <View style={styles.divheader}>
        {usuario ? (
          <View style={styles.header}>
            <View style={styles.divft}>
              <Image style={styles.foto} source={{ uri: usuario.foto, }} />
            </View>
            <View style={styles.divnome}>
              <Text style={styles.textoheader}>Olá, {usuario.nome}</Text>
              <Text style={styles.textoheader}>Olá, {usuario.login}</Text>
              <Text style={styles.textoheader}>Olá, {usuario.cpf}</Text>
            </View>
          </View>
        ) : (
          <Text>Carregando...</Text>
        )}
      </View>
      <View style={styles.meio}>
        <TouchableOpacity style={styles.excecaobotao} onPress={handleOpen1}>
          <Text>Solicitar exceção</Text>
        </TouchableOpacity>

        <Modal
          visible={open1}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setOpen1(!open1)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {opcao.map((opcao, index) => (
                <View key={index}>
                  <CheckBox
                    title={` ${opcao}`}
                    checked={selectedOpcao === opcao}
                    onPress={() => handleCheckbox(opcao)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor="red"
                  />
                </View>
              ))}

              {(opcao.indexOf(selectedOpcao) + 1 === 1 || opcao.indexOf(selectedOpcao) + 1 === 2) && (
                <RNPickerSelect
                  placeholder={{
                    label: 'Selecione o horário de ida',
                    value: 'nulo',
                  }}
                  onValueChange={(value) => setOpcaoIda(value)}
                  items={[
                    { label: '5:50', value: '1' },
                    { label: '11:50', value: '2' },
                    { label: '17:30', value: '3' },
                  ]}
                  value={opcaoIda}
                />
              )}

              {(opcao.indexOf(selectedOpcao) + 1 === 1 || opcao.indexOf(selectedOpcao) + 1 === 3) && (
                <RNPickerSelect
                  placeholder={{
                    label: 'Selecione o horário de volta',
                    value: 'nulo',
                  }}
                  onValueChange={(value) => setOpcaoVolta(value)}
                  items={[
                    { label: '11:40', value: '4' },
                    { label: '19:00', value: '5' },
                    { label: '22:15', value: '6' },
                  ]}
                  value={opcaoVolta}
                />
              )}

              <TextInput
                placeholder="Descreva o motivo da exceção"
                value={descricao}
                onChangeText={setDescricao}
                style={{ marginVertical: 10 }}
              />

              <TouchableOpacity onPress={handleOpen}>
                <Text>Selecionar Data</Text>
              </TouchableOpacity>

              <Modal
                visible={open}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setOpen(!open)}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <DatePicker
                      mode="calendar"
                      selected={date}
                      minimumDate={startDate}
                      onDateChange={handleChange}
                    />
                    <TouchableOpacity onPress={handleOpen}>
                      <Text>Escolher</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text>Enviar</Text>
              </TouchableOpacity>

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text>Confirmar envio?</Text>
                    <TouchableOpacity onPress={enviar}>
                      <Text>Sim</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                      <Text>Não</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </Modal>
      </View>
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
    justifyContent: 'flex-end',
  },
  header: {
    width: '100%',
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  divft: {
    height: '70%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 100,
  },
  divnome: {
    height: '100%',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  textoheader: {
    color: 'white',
  },
  foto: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
  },
  meio: {
    height: '80%',
    width: '100%',
    backgroundColor: 'blue',
  },
  excecaobotao: {
    backgroundColor: 'grey',
    width: '50%',
    height: '20%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
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
});
