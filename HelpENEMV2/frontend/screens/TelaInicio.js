import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TelaInicio = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Tela Inicial!</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Prepare-se:</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Biblioteca')}
        >
          <Text style={styles.buttonText}>Acesso à Biblioteca</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Teste seus conhecimentos:</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Quiz')}
        >
          <Text style={styles.buttonText}>Acesso às Questões</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 30,
  },
  section: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#8f5bbd',
    padding: 13,
    borderRadius: 60,
    alignItems: 'center',
    width: '60%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TelaInicio;
