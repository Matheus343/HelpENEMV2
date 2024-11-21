import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, ScrollView, TextInput, TouchableOpacity } from 'react-native';
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
      console.error('Erro ao buscar dados dos livros:', error);
    }
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

const ListaAlunos = () => {
  const [alunos, setAlunos] = useState([]);
  const [filtroCpf, setFiltroCpf] = useState('');

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    try {
      const response = await fetch('http://192.168.15.135:3000/alunos');
      const data = await response.json();
      setAlunos(data);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
    }
  };

  const buscarAlunoPorCpf = async () => {
    if (!filtroCpf.trim()) {
      fetchAlunos();
      return;
    }
    try {
      const response = await fetch(`http://192.168.15.135:3000/alunos/${filtroCpf}`);
      const aluno = await response.json();
      setAlunos(aluno ? [aluno] : []); 
    } catch (error) {
      console.error('Erro ao buscar aluno por CPF:', error);
    }
  };

  return (
    <View style={styles.alunosContainer}>
      <Text style={styles.title}>Lista de Alunos</Text>

      <TextInput
        style={styles.input}
        placeholder="Filtrar por CPF"
        value={filtroCpf}
        onChangeText={setFiltroCpf}
      />
      <TouchableOpacity style={styles.button} onPress={buscarAlunoPorCpf}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.alunoItem}>
            <Text style={styles.alunoText}>Nome: {item.nome}</Text>
            <Text style={styles.alunoText}>CPF: {item.cpf}</Text>
            <Text style={styles.alunoText}>RA: {item.ra}</Text>
          </View>
        )}
      />
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
      <Drawer.Screen name="Lista de Alunos" component={ListaAlunos} />
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
});

export default PainelAdmin;
