import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, Image, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-modern-datepicker';
import {getToday, getFormatedDate} from 'react-native-modern-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';


export default function Localizacao({ navigation }) {

  const [opcaoIda, setOpcaoIda] = useState(0);
  const [opcaoVolta, setOpcaoVolta] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState('');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(getToday());
  const [descricao, setDescricao] = useState('');

  const today = new Date();
  const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD');

  useEffect(() => {
    async function fetchUser() {
      try {
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
        axios.post('http://192.168.0.223:3000/excessao',
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

  function handleChange(propDate) {
    setDate(propDate)
  }


  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={handleOpen}>
        <Text>Escolha a data da exceção</Text>
      </TouchableOpacity>
      <Text>Data escolhida: {date}</Text>

      <Modal
        visible={open}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setOpen(!open);
        }}
      >
        <DatePicker
          mode='calendar'
          selected={date}
          minimumDate={startDate}
          onDateChange={handleChange}
        />
        <TouchableOpacity onPress={handleOpen}>
          <Text>Escolher</Text>
        </TouchableOpacity>

      </Modal>


      <RNPickerSelect
        placeholder={{
          label: 'Selecione o horário de ida',
          value: 'nulo'
        }}
        onValueChange={(value) => setOpcaoIda(value)}
        items={[
          { label: '5:50', value: '1' },
          { label: '11:50', value: '2' },
          { label: '17:30', value: '3' },
        ]}
        value={opcaoIda}
      />

      <RNPickerSelect
        placeholder={{
          label: 'Selecione o horário de volta',
          value: 'nulo'
        }}
        onValueChange={(value) => setOpcaoVolta(value)}
        items={[
          { label: '11:40', value: '4' },
          { label: '19:00', value: '5' },
          { label: '22:15', value: '6' },
        ]}
        value={opcaoVolta}
      />
      <TextInput
        placeholder="Descreva o motivo da excessão"
        value={descricao}
        onChangeText={setDescricao}
      />

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Enviar</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View>
          <Text>Confirmar envio?</Text>
          <TouchableOpacity onPress={enviar}>
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

});
