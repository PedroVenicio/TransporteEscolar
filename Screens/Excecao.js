import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, Image, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-modern-datepicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { CheckBox } from '@rneui/themed';


export default function Excecao({ navigation }) {

  const [opcaoIda, setOpcaoIda] = useState("matutino");
  const [opcaoVolta, setOpcaoVolta] = useState("matutino");
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState('');
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  const [openIda, setOpenIda] = useState(false);
  const [openVolta, setOpenVolta] = useState(false);

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
              <Text style={styles.textoheader}>Login: {usuario.login}</Text>
              <Text style={styles.textoheader}>CPF: {usuario.cpf}</Text>
            </View>
          </View>
        ) : (
          <Text>Carregando...</Text>
        )}
      </View>
      <View style={styles.meio}>
        <View style={styles.regrasBox}>
          <Text style={styles.tt}>REGRAS</Text>
          <Text style={styles.regrasTexto}>Não é permitido realizar refeições dentro dos veículos.</Text>
          <Text style={styles.regrasTexto}>Respeitar os horários tendo no máximo dois minutos de atraso.</Text>
          <Text style={styles.regrasTexto}>Não é permitido embarque e desembarque fora de contrato.</Text>
          <Text style={styles.regrasTexto}>Proíbido levar qualquer acompanhante no veículo.</Text>
          <Text style={styles.regrasTexto}>Proíbido o transporte de animais dentro dos veículos.</Text>
          <Text style={styles.regrasTexto}>Proíbido embarcar no veículo possuindo qualquer item ilicito ou ponteagudo.</Text>
          <Text style={styles.regrasTexto}>Uso obrigatório dos cintos de segurança.</Text>
          <Text style={styles.regrasTexto}>Proíbido transitar dentro dos veículos em movimento.</Text>
          <Text style={styles.regrasTexto1}>! Caso as demais regras forem descumpridas é passível a quebra do contrato e sua multa !</Text>
        </View>
        <View style={styles.divbotao}>
          <TouchableOpacity style={styles.excecaoBotao} onPress={handleOpen1}>
            <Text style={styles.excecaoTexto}>Solicitar exceção</Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={open1}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setOpen1(!open1)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalContenttxt}> Selecione a opção desejada</Text>
              {opcao.map((opcao, index) => (
                <View key={index} style={styles.checkBox}>
                  <CheckBox
                    title={`${opcao}`}
                    checked={selectedOpcao === opcao}
                    onPress={() => handleCheckbox(opcao)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor="red"
                  />
                </View>
              ))}

              {(opcao.indexOf(selectedOpcao) + 1 === 1 || opcao.indexOf(selectedOpcao) + 1 === 2) && (
                <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={() => setOpenIda(true)}>
                  <Text style={styles.buttonText}> Selecione o horario de ida: {opcaoIda}</Text>
                </TouchableOpacity>)}

              <Modal
                visible={openIda}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setOpenIda(false)}
              >
                <View style={styles.modalContainer3}>
                  <View style={styles.modalContent3}>
                    <Picker
                      selectedValue={opcaoIda}
                      onValueChange={(value) => setOpcaoIda(value)}
                      style={styles.Picker}
                      itemStyle={{ color: 'black', fontSize: 20 }}
                    >
                      <Picker.Item label="Matutino" value="matutino" />
                      <Picker.Item label="Vespertino" value="vespertino" />
                      <Picker.Item label="Noturno" value="noturno" />
                    </Picker>
                    <View style={styles.titulo1}>
                      <TouchableOpacity onPress={() => setOpenIda(!openIda)} style={[styles.modalButton2, styles.confirmButton1]}>
                        <Text style={styles.buttonText1}>Escolher</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

              </Modal>

              {(opcao.indexOf(selectedOpcao) + 1 === 1 || opcao.indexOf(selectedOpcao) + 1 === 3) && (
                <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={() => setOpenVolta(true)}>
                  <Text style={styles.buttonText}> Selecione o horario de volta: {opcaoVolta}</Text>
                </TouchableOpacity>)}

              <Modal
                visible={openVolta}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setOpenVolta(false)}
              >
                <View style={styles.modalContainer3}>
                  <View style={styles.modalContent3}>
                    <Picker
                      selectedValue={opcaoIda}
                      onValueChange={(value) => setOpcaoVolta(value)}
                      style={styles.Picker}
                      itemStyle={{ color: 'black', fontSize: 20 }}
                    >
                      <Picker.Item label="Matutino" value="matutino" />
                      <Picker.Item label="Vespertino" value="vespertino" />
                      <Picker.Item label="Noturno" value="noturno" />
                    </Picker>
                    <View style={styles.titulo1}>
                      <TouchableOpacity onPress={() => setOpenVolta(!openVolta)} style={[styles.modalButton2, styles.confirmButton1]}>
                        <Text style={styles.buttonText1}>Escolher</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

              </Modal>

              <TouchableOpacity onPress={handleOpen} style={styles.botaodata}>
                <Text style={styles.botaodatatxt}>Selecionar Data</Text>
              </TouchableOpacity>

              <Text>Data escolhida: {date.split("/").reverse().join("/")}</Text>

              <Modal
                visible={open}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setOpen(!open)}>
                <View style={styles.modalContainer1}>
                  <View style={styles.modalContent1}>
                    <DatePicker
                      mode="calendar"
                      selected={date}
                      minimumDate={startDate}
                      onDateChange={handleChange}
                    />
                    <TouchableOpacity onPress={handleOpen} style={[styles.modalButton, styles.confirmButton]}>
                      <Text style={styles.buttonText}>Escolher</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              <TextInput
                placeholder="Descreva o motivo da exceção:"
                value={descricao}
                onChangeText={setDescricao}
                style={styles.motivo}
                placeholderTextColor={'gray'}
                numberOfLines={2}
                returnKeyType="done"
              />

              <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={(() => setOpen1(false))}>
                <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancelar</Text>
              </TouchableOpacity>

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}>
                <View style={styles.modalContainer2}>
                  <View style={styles.modalContent2}>
                    <View style={styles.titulo1}>
                      <Text style={styles.ttmoda1l}>Confirmar envio?</Text>
                    </View>
                    <View style={styles.titulo1}>
                    <TouchableOpacity style={[styles.modalButton1, styles.cancelButton1]} onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={[styles.buttonText1, styles.cancelButtonText]}>Não, cancelar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={enviar} style={[styles.modalButton1, styles.confirmButton1]}>
                        <Text style={styles.buttonText}>Sim</Text>
                      </TouchableOpacity>
                    </View>
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
    flex: 1,
    backgroundColor: '#3B1D1D',
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
    justifyContent: 'space-between',
    marginTop: 35,
  },
  divft: {
    height: 60,
    width: 60,
    borderRadius: 30,
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
    flex: 1,
    marginLeft: 20,
  },
  textoheader: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  meio: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  regrasBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    height: '80%',
    width: '85%',
    justifyContent: 'center',
    paddingTop: 10,
  },
  tt: {
    fontSize: 16,
    lineHeight: 20,
    color: '#333333',
    marginBottom: 10,
    marginLeft: 140,
    marginRight: 10,
  },
  regrasTexto: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333333',
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 10,
  },
  regrasTexto1: {
    fontSize: 12,
    lineHeight: 20,
    color: '#b90000',
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 10,
  },
  divbotao: {
    height: '10%',
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  excecaoBotao: {
    backgroundColor: '#7A1F1F',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  excecaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    padding: 20,
    alignItems: 'left',
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
  },
  modalContenttxt: {
    color: 'black',
    fontSize: 20,
    marginLeft: 30,
  },
  checkBox: {
    alignItems: 'left',
    marginVertical: 10,
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    fontSize: 14,
  },
  motivo: {
    width: '100%',
    height: '5%',
    padding: 20,
    marginVertical:20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    fontSize: 14,
  },
  Picker: {
    color: 'black',
    marginTop: 60,
    width: '100%',
    height: '10%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#860204',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#ff5c5c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButton: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  modalButton1: {
    width: '40%',
    height: '80%',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
  botaodata: {
    backgroundColor: '#3B1D1D',
    width: '45%',
    height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 10,
  },
  botaodatatxt: {
    color: 'white',
  },
  modalContainer1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent1: {
    width: '90%',
    height: '50%',
    padding: 20,
    alignItems: 'left',
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
  },
  modalContainer2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent2: {
    width: '90%',
    height: '20%',
    padding: 20,
    alignItems: 'left',
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
  },
  modalContainer3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent3: {
    width: '90%',
    height: '40%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
  },
  titulo1: {
    width: '100%',
    height: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  ttmoda1l: {
    color: 'black',
    fontSize: 25,
  },
  modalButton2: {
    width: '40%',
    height: '30%',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  confirmButton1: {
    backgroundColor: '#3B1D1D',
  },
  cancelButton1: {
    borderWidth: 1,
    borderColor: '#b90000',
    backgroundColor: '#fff',
  },
  buttonText1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cancelButtonText1: {
    color: '#b90000',
  },
});