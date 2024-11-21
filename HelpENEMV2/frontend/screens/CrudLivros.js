import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CrudLivros = () => {
  const [livros, setLivros] = useState([]);
  const [nomeLivro, setNomeLivro] = useState('');
  const [autor, setAutor] = useState('');
  const [materia, setMateria] = useState('Fisica'); 
  const [editandoId, setEditandoId] = useState(null);

  const fetchLivros = async () => {
    try {
      const response = await fetch('http://192.168.15.135:3000/livros');
      const data = await response.json();
      setLivros(data);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar livros.');
    }
  };

  const handleSalvar = async () => {
    if (!nomeLivro || !autor || !materia) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const metodo = editandoId ? 'PUT' : 'POST';
    const url = editandoId
      ? `http://192.168.15.135:3000/livros/${editandoId}`
      : 'http://192.168.15.135:3000/livros';

    try {
      const response = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nomeLivro, autor, materia }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Livro salvo com sucesso!');
        fetchLivros();
        setNomeLivro('');
        setAutor('');
        setMateria('Fisica'); 
        setEditandoId(null);
      } else {
        Alert.alert('Erro', 'Erro ao salvar o livro.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar ao servidor.');
    }
  };

  const handleExcluir = async (id) => {
    try {
      const response = await fetch(`http://192.168.15.135:3000/livros/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Livro excluído com sucesso!');
        fetchLivros();
      } else {
        Alert.alert('Erro', 'Erro ao excluir o livro.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar ao servidor.');
    }
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicione os livros</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Livro"
        value={nomeLivro}
        onChangeText={setNomeLivro}
      />
      <TextInput
        style={styles.input}
        placeholder="Autor"
        value={autor}
        onChangeText={setAutor}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={materia}
          onValueChange={(itemValue) => setMateria(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Física" value="Fisica" />
          <Picker.Item label="Química" value="Quimica" />
          <Picker.Item label="Português" value="Portugues" />
          <Picker.Item label="Matemática" value="Matematica" />
          <Picker.Item label="Literatura" value="Literatura" />
          <Picker.Item label="História" value="Historia" />
          <Picker.Item label="Geografia" value="Geografia" />
          <Picker.Item label="Inglês" value="Ingles" />
          <Picker.Item label="Espanhol" value="Espanhol" />
          <Picker.Item label="Redação" value="Redacao" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>{editandoId ? 'Atualizar' : 'Salvar'}</Text>
      </TouchableOpacity>

      <FlatList
        data={livros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.livroItem}>
            <Text>{item.nomeLivro}</Text>
            <Text>{item.autor}</Text>
            <Text>{item.materia}</Text>
            <TouchableOpacity onPress={() => {
              setNomeLivro(item.nomeLivro);
              setAutor(item.autor);
              setMateria(item.materia);
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
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  livroItem: {
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

export default CrudLivros;
