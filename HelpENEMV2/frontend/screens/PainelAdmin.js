import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CrudLivros from './CrudLivros';
import CrudQuestoes from './CrudQuestoes';

const fetchDadosProtegidos = async (endpoint) => {
  try {
    const token = await AsyncStorage.getItem('token'); // Recupera o token armazenado
    const response = await fetch(`http://192.168.15.135:3000/${endpoint}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Erro ao acessar dados protegidos.');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const Dashboard = ({ navigation }) => {
  const [questoesData, setQuestoesData] = useState([]);
  const [livrosData, setLivrosData] = useState([]);

  useEffect(() => {
    fetchQuestoesData();
    fetchLivrosData();
  }, []);

  const fetchQuestoesData = async () => {
    try {
      const questoes = await fetchDadosProtegidos('questoes');

      const niveis = { facil: 0, medio: 0, dificil: 0 };

      questoes.forEach((questao) => {
        niveis[questao.nivel] += 1;
      });

      setQuestoesData([
        { name: 'Fácil', count: niveis.facil, color: '#4CAF50', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Médio', count: niveis.medio, color: '#FFC107', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Difícil', count: niveis.dificil, color: '#F44336', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar dados das questões.');
    }
  };

  const fetchLivrosData = async () => {
    try {
      const livros = await fetchDadosProtegidos('livros');

      const materias = {};

      livros.forEach((livro) => {
        materias[livro.materia] = (materias[livro.materia] || 0) + 1;
      });

      const coresFixas = {
        Fisica: '#4CAF50',
        Quimica: '#FF5722',
        Portugues: '#3F51B5',
        Matematica: '#9C27B0',
        Literatura: '#009688',
        Historia: '#FFC107',
        Geografia: '#8BC34A',
        Ingles: '#00BCD4',
        Espanhol: '#E91E63',
        Redacao: '#795548',
      };

      const chartData = Object.entries(materias).map(([key, value]) => ({
        name: key,
        count: value,
        color: coresFixas[key] || '#000000',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      }));

      setLivrosData(chartData);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar dados dos livros.');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token'); // Remove o token armazenado
    navigation.navigate('LoginAdmin'); // Redireciona para a tela de login
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Painel do Administrador</Text>

      <Text style={styles.subtitle}>Quantidade de Questões por Nível</Text>
      <PieChart
        data={questoesData}
        width={Dimensions.get('window').width - 30}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="count"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <Text style={styles.subtitle}>Quantidade de Livros por Matéria</Text>
      <PieChart
        data={livrosData}
        width={Dimensions.get('window').width - 30}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="count"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
         />      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
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
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  alunosContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  alunoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  alunoText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#8f5bbd',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#8f5bbd',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PainelAdmin;
