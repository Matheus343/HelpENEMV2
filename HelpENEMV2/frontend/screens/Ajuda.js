import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Ajuda = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o HelpENEM</Text>
      <Text style={styles.text}>
        Este projeto foi desenvolvido para ajudar alunos a se prepararem para o ENEM.
        Ele inclui funcionalidades de cadastro, acesso a questões, e organização de
        livros. É uma ferramenta prática e acessível para estudar de forma eficiente.
      </Text>
      <Text style={styles.subtitle}>Criadores:</Text>
      <Text style={styles.text}>Adriana Monteiro Martani</Text>
      <Text style={styles.text}>Matheus Galdino Xavier</Text>
      <Text style={styles.text}>Yasmin Laisa Maciel</Text>
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
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
});

export default Ajuda;
