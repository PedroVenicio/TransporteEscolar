import React, { useState } from 'react';
import { TextInput, StyleSheet, Image, TouchableOpacity, Text, View, Animated } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [buttonScale] = useState(new Animated.Value(1));

  const handleLogin = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(async() => {
      try{
        const response = await axios.post('http://10.119.0.19:3000/login', //casa: 192.168.0.223 | satc: 10.119.0.19
        {
          login: login,
          senha: password
        });
        
        const { access_token } = response.data;

        await AsyncStorage.setItem('token', access_token)
        navigation.navigate('Home')
      }
      catch(error){
        console.log('Erro ao logar: ', error)
        alert('Falha no login, tente novamente mais tarde.')
      }
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['', '#EAEAEA','#EAEAEA','#EAEAEA', '']}
        style={styles.background}
      />
      <BlurView intensity={60} style={styles.blurContainer}>
        <Image
          style={styles.imagem}
          source={require('../ft/MAVERIK.png')}
        />
        <Text style={styles.txt}>Transformando</Text>
        <Text style={styles.txt1}>sonhos em destinos!</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Feather name="user" size={24} color="#6D6D6D" />
            <TextInput
              style={styles.input}
              placeholder="Login"
              placeholderTextColor="#6D6D6D"
              value={login}
              onChangeText={setLogin}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={24} color="#6D6D6D" />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#6D6D6D"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  blurContainer: {
    width: '90%',
    padding: 20,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    height: 120,
    width: 120,
    marginBottom: 20,
    borderRadius: 60,
    borderColor: '#ffff',
    borderWidth: 2,
  },
  txt: {
    fontSize: 26,
    color: '#333',
    fontWeight: '700',
    marginBottom: 5,
    textAlign: 'center',
  },
  txt1: {
    fontSize: 20,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    width: '100%',
    height: 50,
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: '#333',
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 42,
    borderRadius: 10,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderWidth: 0, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
    paddingHorizontal: 30, // Aumenta o tamanho no eixo X
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
});
