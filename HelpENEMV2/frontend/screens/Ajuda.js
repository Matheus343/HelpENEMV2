import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Biblioteca para ícones

const Ajuda = () => {
  const colaboradores = [
    { nome: 'Adriana Monteiro Martani', github: 'https://github.com/adrianamartani' },
    { nome: 'Matheus Galdino Xavier', github: 'https://github.com/Matheus343' },
    { nome: 'Yasmin Laisa Maciel', github: 'https://github.com/yasmin21Eng' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o HelpENEM</Text>
      <Text style={styles.text}>
        Este projeto foi desenvolvido para ajudar alunos a se prepararem para o ENEM.
        Ele inclui funcionalidades de cadastro, acesso a questões, e organização de
        livros. É uma ferramenta prática e acessível para estudar de forma eficiente.
      </Text>
      <Text style={styles.subtitle}>Criadores:</Text>
      {colaboradores.map((colaborador, index) => (
        <View key={index} style={styles.collaboratorContainer}>
          <Text style={styles.text}>{colaborador.nome}</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(colaborador.github)}
            style={styles.icon}
          >
            <FontAwesome name="github" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      ))}
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
  collaboratorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginLeft: 10,
  },
});

export default Ajuda;
