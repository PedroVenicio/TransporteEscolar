import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import * as Network from 'expo-network';

  
export default function Localizacao({ navigation }) {

  const ipAlert = async () => {
    const ip = await Network.getIpAddressAsync()
    alert(ip);
  };
  
  ipAlert();
  return (
    <View style={styles.container}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  
});
