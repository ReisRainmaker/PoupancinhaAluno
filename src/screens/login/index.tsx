import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, ImageBackground, ColorValue, TouchableOpacity, Dimensions } from 'react-native';
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'

const windowWidth = Dimensions.get('window').width;
const getFontSize = (baseFontSize) => {
    const scaleFactor = windowWidth / 375; // 375 é a largura de referência
    const adjustedFontSize = Math.round(baseFontSize * scaleFactor);
    return adjustedFontSize;
};


const Login = ({ navigation }) => {
  const [resultado, setResultado] = useState('Digite seus dados');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validacao = () => {
    if (email === '' && password === '') {
      setResultado('Digite login e senha');
    } else {
      if (email === 'a' && password === '') {
        SecureStore.setItemAsync('token', '12345');
        AsyncStorage.setItem('user', 'Administrador');
        setResultado('Login com sucesso');
        navigation.navigate('Minha Poupancinha');
      } else {
        setResultado('Login ou senha inválidos');
      }
    }
  };

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      if (token !== null) {
        navigation.navigate('Minha Poupancinha');
      }
    });
  }, []);

  return (
    <ImageBackground
      source={require('../../images/cedulas.jpg')}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Minha Poupancinha</Text>
        <TextInput
          style={styles.input}
          placeholder="E-Mail"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />

        <Text style={styles.resultado}>{resultado}</Text>
        <TouchableOpacity style={styles.myButton} onPress={validacao}>
          <Text style={styles.buttonText}>Logar</Text>
        </TouchableOpacity>

        <Text style={styles.ouText}>ou</Text>

        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.buttonTextGoogle}>Entre usando Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.criarButton} onPress={() => navigation.navigate('Registrar')}>
          <Text style={styles.buttonTextCriar} >Não tem conta ainda?</Text>
          <Text style={styles.buttonTextCriar} >Crie sua conta</Text>
        </TouchableOpacity>

        
      </View>
    </ImageBackground>
  );
};
const baseColor: ColorValue[] = ['#ACBFC5', '#578EA2', '#B8D4DB'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: baseColor[0],
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 500,
    elevation: 5,
  },
  title: {
    fontSize: getFontSize(25),
    fontWeight: 'bold',
    color: baseColor[1],
    marginBottom: 20,
    textShadowColor: baseColor[2],
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    textAlign: 'center'
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: '#FFF',
  },
  resultado: {
    color: baseColor[1],
    textAlign: 'center',
  },
  ouText: {
    marginVertical: 10,
  },
  myButton: {
    backgroundColor: baseColor[1],
    padding: 5,
    borderRadius: 8,
    marginBottom: 10,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: getFontSize(15),
    textAlign: 'center',
  },
  googleButton: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 8,
    marginBottom: 10,
    width: '80%',

  },
  buttonTextGoogle: {
    color: 'black',
    fontSize: getFontSize(15),
    textAlign: 'center',
  },
  criarButton: {
    padding: 5,
    borderRadius: 8,
    marginBottom: 10,
    width: '80%',
  },
  buttonTextCriar: {
    color: 'white',
    fontSize: getFontSize(12),
    textAlign: 'center',
  },

});

export default Login;
