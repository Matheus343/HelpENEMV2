import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './frontend/screens/Home';
import Login from './frontend/screens/Login.js';
import Cadastro from './frontend/screens/Cadastro.js';
import Ajuda from './frontend/screens/Ajuda.js';
import TelaInicio from './frontend/screens/TelaInicio.js';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
