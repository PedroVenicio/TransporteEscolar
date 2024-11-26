import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, Text, View, Animated } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export default function Login({ navigation }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [buttonScale] = useState(new Animated.Value(1));

  useEffect(() => {
    setLogin('');
    setPassword('');
  }, [])

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
    ]).start(async () => {
      try {
        const response = await axios.post('http://192.168.3.37:3000/login', {
          login: login,
          senha: password,
        });

        const { access_token } = response.data;

        await AsyncStorage.setItem('token', access_token);

        const decodedToken = jwtDecode(access_token);
        if (decodedToken.adm === true && decodedToken.motorista === false) {
          navigation.navigate('HomeAdm');
        }
        if (decodedToken.adm === false && decodedToken.motorista === false) {
          navigation.navigate('Home');
        }
        if (decodedToken.motorista === true && decodedToken.adm === false) {
          navigation.navigate('HomeMotorista');
        }
      } catch (error) {
        console.log('Erro ao logar: ', error);
        alert('Falha no login, tente novamente mais tarde.');
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.triangle} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Bem-vindo,</Text>
        <Text style={styles.subtitle}>Faça login para</Text>
        <Text style={styles.subtitle}>usar o app</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Login"
          placeholderTextColor="#6D6D6D"
          value={login}
          onChangeText={setLogin}
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#6D6D6D"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B1D1D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    borderRightWidth: 500,
    borderTopWidth: 250,
    borderRightColor: 'transparent',
    borderTopColor: '#7A1F1F',
  },
  titleContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 36,
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 15,
  },
  subtitle: {
    fontSize: 24,
    color: '#FFF',
    marginTop: 5,
    marginBottom: -7,
  },
  form: {
    width: '90%',
    padding: 20,
    backgroundColor: '#transparent',
    borderRadius: 10,
    alignItems: 'center',
    marginTop:120,
  },
  label: {
    alignSelf: 'flex-start',
    color: '#FFF',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 15,
    color: '#333',
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    marginTop: 40,
    height: 50,
    paddingLeft: 75,
    paddingRight: 75,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: '#B90000',
    fontSize: 22,
  },
});
