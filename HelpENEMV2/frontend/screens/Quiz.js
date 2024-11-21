import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const Quiz = () => {
  const [questoes, setQuestoes] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestoes();
  }, []);

  const fetchQuestoes = async () => {
    try {
      const response = await fetch('http://192.168.15.135:3000/questoes');
      const data = await response.json();
      setQuestoes(data);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar questões.');
    }
  };

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = questoes[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.resposta) {
      setScore(score + 1);
      Alert.alert('Resposta Correta!', 'Você acertou!');
    } else {
      Alert.alert('Resposta Errada!', 'Tente novamente na próxima questão.');
    }

    if (currentQuestionIndex < questoes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      Alert.alert('Quiz Finalizado', `Seu score: ${score + 1} de ${questoes.length}`);
      setCurrentQuestionIndex(0);
      setScore(0);
    }
  };

  if (questoes.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando questões...</Text>
      </View>
    );
  }

  const currentQuestion = questoes[currentQuestionIndex];
  const alternativas = [
    currentQuestion.resposta,
    'Alternativa 1',
    'Alternativa 2',
    'Alternativa 3',
  ].sort(() => Math.random() - 0.5); // Embaralhar alternativas

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz</Text>
      <Text style={styles.question}>{currentQuestion.pergunta}</Text>

      {alternativas.map((alt, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => handleAnswer(alt)}
        >
          <Text style={styles.buttonText}>{alt}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.score}>
        Questão {currentQuestionIndex + 1} de {questoes.length}
      </Text>
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
  question: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#8f5bbd',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default Quiz;
