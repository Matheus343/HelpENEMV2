import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const Home = ({ navigation }) => {
  useEffect(() => {
    let sound;

    const loadSound = async () => {
      try {
        sound = new Audio.Sound(); 
        await sound.loadAsync(require('../../assets/lofi-study-calm-peaceful-chill-hop-112191.mp3'));
        await sound.setIsLoopingAsync(true); 
        await sound.playAsync(); 
      } catch (error) {
        console.error('Erro ao carregar o som:', error);
      }
    };

    loadSound();

    return () => {
      if (sound) {
        sound.stopAsync(); 
        sound.unloadAsync(); 
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo2Enem-removebg-preview.png')}
        style={styles.image}
      />

      <Text style={styles.title}>Bem-vindo!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LoginAdmin')}
      >
        <Text style={styles.buttonText}>Acessar como Admin</Text>
      </TouchableOpacity>

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
  image: {
    width: 400,
    height: 200,
    marginBottom: 20,
    marginLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#8f5bbd',
    padding: 10,
    borderRadius: 60,
    width: '60%',
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
    backgroundColor: '#8f5bbd',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});

export default Home;
