import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Login = ({ navigation }) => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  // Função para autenticação
  const handleLogin = async () => {
    // Limpar espaços em branco
    const trimmedCpf = cpf.trim();
    const trimmedSenha = senha.trim();

    // Validação dos campos
    if (!trimmedCpf || !trimmedSenha) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios!');
      return;
    }

    try {
      const response = await fetch('http://192.168.15.135:3000/aluno/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf: trimmedCpf, senha: trimmedSenha }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.navigate('TelaInicio'); // Redireciona para a tela inicial
      } else {
        Alert.alert('Erro', data.error || 'CPF ou senha inválidos.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar ao servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="CPF"
        keyboardType="numeric"
        value={cpf}
        onChangeText={setCpf}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007BFF',
    fontSize: 16,
  },
});

export default Login;
