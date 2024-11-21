import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image } from 'react-native';

const Biblioteca = () => {
  const [livros, setLivros] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [livrosFiltrados, setLivrosFiltrados] = useState([]);

  useEffect(() => {
    fetchLivros();
  }, []);

  useEffect(() => {
    aplicarFiltro();
  }, [filtro, livros]);

  const fetchLivros = async () => {
    try {
      const response = await fetch('http://192.168.15.135:3000/livros');
      const data = await response.json();
      setLivros(data);
      setLivrosFiltrados(data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  const aplicarFiltro = () => {
    if (!filtro.trim()) {
      setLivrosFiltrados(livros);
    } else {
      const filtroLowerCase = filtro.toLowerCase();
      const resultados = livros.filter(
        (livro) =>
          livro.nomeLivro.toLowerCase().includes(filtroLowerCase) ||
          livro.autor.toLowerCase().includes(filtroLowerCase) ||
          livro.materia.toLowerCase().includes(filtroLowerCase)
      );
      setLivrosFiltrados(resultados);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biblioteca</Text>
      <TextInput
        style={styles.input}
        placeholder="Filtrar por Nome, Autor ou Matéria"
        value={filtro}
        onChangeText={setFiltro}
      />
      <FlatList
        data={livrosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {item.imagem && (
              <Image
                source={{ uri: item.imagem }}
                style={styles.itemImage}
              />
            )}
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemText}>Nome: {item.nomeLivro}</Text>
              <Text style={styles.itemText}>Autor: {item.autor}</Text>
              <Text style={styles.itemText}>Matéria: {item.materia}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum livro encontrado.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 8,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
});

export default Biblioteca;
