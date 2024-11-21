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
          <Stack.Screen 
            name="Home" 
            component={Home}
            options={{ headerShown: false}}
          />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false}} />
          <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false}} />
          <Stack.Screen name="Ajuda" component={Ajuda} options={{ headerShown: false}} />
          <Stack.Screen name="TelaInicio" component={TelaInicio} options={{ headerShown: false}} />
          <Stack.Screen name="LoginAdmin" component={LoginAdmin} options={{ headerShown: false}} />
          <Stack.Screen name="PainelAdmin" component={PainelAdmin} options={{ headerShown: false}} />
          <Stack.Screen name="Biblioteca" component={Biblioteca} />
          <Stack.Screen name="Quiz" component={Quiz} />          
        </Stack.Navigator>
      </NavigationContainer>
  );
}
