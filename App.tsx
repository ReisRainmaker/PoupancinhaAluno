import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './src/screens/login'
import Home from './src/screens/home'
import Register from './src/screens/register';
import Shop from './src/screens/shop';
import Balance from './src/screens/balance';
import Games from './src/screens/games';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name='Login' component={Login} />     
        <Stack.Screen name='Minha Poupancinha' component={Home} />
        <Stack.Screen name='Registrar' component={Register} />
        <Stack.Screen name='Loja' component={Shop} />
        <Stack.Screen name='Extrato' component={Balance} />
        <Stack.Screen name='Jogos' component={Games} />

      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App; 



