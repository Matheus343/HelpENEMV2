import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Título da aplicação */}
      <Text style={styles.title}>Bem-vindo ao HelpENEM!</Text>

      {/* Botão para Login */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Botão para Cadastro */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Botão de Ajuda (ícone circular) */}
      <TouchableOpacity
        style={styles.helpButton}
        onPress={() => navigation.navigate('Ajuda')}
      >
        <MaterialIcons name="help-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  helpButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007BFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});

export default Home;
