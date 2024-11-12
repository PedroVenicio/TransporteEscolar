import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TextInput, Text, Image, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { jwtDecode } from 'jwt-decode';


export default function Localizacao({ navigation }) {

  const [opcaoIda, setOpcaoIda] = useState(0);
  const [opcaoVolta, setOpcaoVolta] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState('')

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

  function enviar(){
    console.log('oi');
  }

  return (
    <View style={styles.container}>
      <RNPickerSelect
        placeholder={{
          label: 'Selecione o horário de ida',
          value: null
        }}
        onValueChange={(value) => setOpcaoIda(value)}
        items={[
          { label: '5:50', value: '1' },
          { label: '11:50', value: '2' },
          { label: '17:30', value: '3' },
        ]}
      />

      <RNPickerSelect
        placeholder={{
          label: 'Selecione o horário de volta',
          value: null
        }}
        onValueChange={(value) => setOpcaoVolta(value)}
        items={[
          { label: '11:40', value: '4' },
          { label: '19:00', value: '5' },
          { label: '22:15', value: '6' },
        ]}
      />
      <TextInput
        placeholder="Descreva o motivo da excessão"
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
          <Text>Confirmar voto:</Text>
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
