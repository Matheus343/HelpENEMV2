import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './frontend/screens/Home';
import Login from './frontend/screens/Login.js';
import Cadastro from './frontend/screens/Cadastro.js';
import Ajuda from './frontend/screens/Ajuda.js';
import TelaInicio from './frontend/screens/TelaInicio.js';
import LoginAdmin from './frontend/screens/LoginAdmin.js';
import PainelAdmin from './frontend/screens/PainelAdmin.js';
import Biblioteca from './frontend/screens/Biblioteca.js';
import Quiz from './frontend/screens/Quiz.js'; 


const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Ajuda" component={Ajuda} />
          <Stack.Screen name="TelaInicio" component={TelaInicio} />
          <Stack.Screen name="LoginAdmin" component={LoginAdmin} />
          <Stack.Screen name="PainelAdmin" component={PainelAdmin} />
          <Stack.Screen name="Biblioteca" component={Biblioteca} />
          <Stack.Screen name="Quiz" component={Quiz} />          
        </Stack.Navigator>
      </NavigationContainer>
  );
}
