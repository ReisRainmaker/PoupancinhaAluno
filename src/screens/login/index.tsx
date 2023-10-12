import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, ImageBackground } from 'react-native';
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from '@rneui/base';

const Login = ({ navigation }) => {
  const [resultado, setResultado] = useState('Digite seus dados');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validacao = () => {
    if (username === '' && password === '') {
      setResultado('Digite login e senha');
    } else {
      if (username === 'a' && password === '') {
        SecureStore.setItemAsync('token', '123456');
        AsyncStorage.setItem('user', 'Administrador');
        setResultado('Login com sucesso');
        navigation.navigate('Home');
      } else {
        setResultado('Login ou senha inválidos');
      }
    }
  };

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      if (token !== null) {
        navigation.navigate('Home');
      }
    });
  }, []);

  return (
    <ImageBackground
      source={require('../../images/backgroundReal.webp')} // Substitua pelo caminho da sua imagem
      style={styles.container}
    >
      <View>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
        <Button onPress={validacao}>Login</Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: 'white', // Para adicionar um fundo branco nos campos de entrada
  },
});

export default Login;
