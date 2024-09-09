import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import { CheckBox } from '@rneui/themed';


export default function Votacao({ navigation }) {


  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVotos, setSelectedVotos] = useState(null);
  const votos = ['vou e volto', 'vou, mas não volto', 'não vou, mas volto', 'não vou e não volto'];

  function postData() {

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
          <TouchableOpacity>
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
