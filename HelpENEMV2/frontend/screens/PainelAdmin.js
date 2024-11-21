import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PieChart } from 'react-native-chart-kit';

import CrudLivros from './CrudLivros';
import CrudQuestoes from './CrudQuestoes';

const Dashboard = () => {
  const [questoesData, setQuestoesData] = useState([]);
  const [livrosData, setLivrosData] = useState([]);

  useEffect(() => {
    fetchQuestoesData();
    fetchLivrosData();
  }, []);

  const fetchQuestoesData = async () => {
    try {
      const response = await fetch('http://192.168.15.135:3000/questoes');
      const questoes = await response.json();

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
      console.error('Erro ao buscar dados das questões:', error);
    }
  };

  const fetchLivrosData = async () => {
    try {
      const response = await fetch('http://192.168.15.135:3000/livros');
      const livros = await response.json();

      const materias = {};

      livros.forEach((livro) => {
        materias[livro.materia] = (materias[livro.materia] || 0) + 1;
      });

      const chartData = Object.entries(materias).map(([key, value]) => ({
        name: key,
        count: value,
        color: getRandomColor(), // Função para cores aleatórias
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      }));

      setLivrosData(chartData);
    } catch (error) {
      console.error('Erro ao buscar dados dos livros:', error);
    }
  };

  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
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
});

export default PainelAdmin;
