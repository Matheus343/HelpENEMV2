import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CrudLivros from './CrudLivros';
import CrudQuestoes from './CrudQuestoes';

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel do Administrador</Text>
      <Text style={styles.text}>
        Bem-vindo, Administrador! Use o menu lateral para gerenciar o sistema.
      </Text>
    </View>
  );
};

const Drawer = createDrawerNavigator();

const PainelAdmin = () => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Gerenciar Livros" component={CrudLivros} />
      <Drawer.Screen name="Gerenciar Questões" component={CrudQuestoes} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});

export default PainelAdmin;
