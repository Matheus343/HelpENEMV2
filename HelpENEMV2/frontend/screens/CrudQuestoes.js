import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CrudQuestoes = () => {
  const [questoes, setQuestoes] = useState([]);
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');
  const [nivel, setNivel] = useState('facil'); 
  const [editandoId, setEditandoId] = useState(null);

  const fetchQuestoes = async () => {
    try {
      const response = await fetch('http://192.168.15.135:3000/questoes');
      const data = await response.json();
      setQuestoes(data);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar questões.');
    }
  };

  const handleSalvar = async () => {
    if (!pergunta || !resposta || !nivel) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const metodo = editandoId ? 'PUT' : 'POST';
    const url = editandoId
      ? `http://192.168.15.135:3000/questoes/${editandoId}`
      : 'http://192.168.15.135:3000/questoes';

    try {
      const response = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta, resposta, nivel }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Questão salva com sucesso!');
        fetchQuestoes();
        setPergunta('');
        setResposta('');
        setNivel('facil'); 
        setEditandoId(null);
      } else {
        Alert.alert('Erro', 'Erro ao salvar a questão.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar ao servidor.');
    }
  };

  const handleExcluir = async (id) => {
    try {
      const response = await fetch(`http://192.168.15.135:3000/questoes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Questão excluída com sucesso!');
        fetchQuestoes();
      } else {
        Alert.alert('Erro', 'Erro ao excluir a questão.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar ao servidor.');
    }
  };

  useEffect(() => {
    fetchQuestoes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicione as questões</Text>

      <TextInput
        style={styles.input}
        placeholder="Pergunta"
        value={pergunta}
        onChangeText={setPergunta}
      />
      <TextInput
        style={styles.input}
        placeholder="Resposta"
        value={resposta}
        onChangeText={setResposta}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={nivel}
          onValueChange={(itemValue) => setNivel(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Fácil" value="facil" />
          <Picker.Item label="Médio" value="medio" />
          <Picker.Item label="Difícil" value="dificil" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>{editandoId ? 'Atualizar' : 'Salvar'}</Text>
      </TouchableOpacity>

      <FlatList
        data={questoes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.questaoItem}>
            <Text>{item.pergunta}</Text>
            <Text>{item.resposta}</Text>
            <Text>{item.nivel}</Text>
            <TouchableOpacity onPress={() => {
              setPergunta(item.pergunta);
              setResposta(item.resposta);
              setNivel(item.nivel);
              setEditandoId(item.id);
            }}>
              <Text style={styles.edit}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleExcluir(item.id)}>
              <Text style={styles.delete}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 60,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#8f5bbd',
    padding: 7,
    borderRadius: 60,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  questaoItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  edit: {
    color: 'blue',
    marginTop: 5,
  },
  delete: {
    color: 'red',
    marginTop: 5,
  },
});

export default CrudQuestoes;
