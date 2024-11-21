import React, { createContext, useState } from 'react';

export const AlunosContext = createContext();

export const AlunosProvider = ({ children }) => {
  const [alunos, setAlunos] = useState([]);

  const adicionarAluno = (aluno) => {
    setAlunos((prevAlunos) => [...prevAlunos, aluno]);
  };

  return (
    <AlunosContext.Provider value={{ alunos, adicionarAluno }}>
      {children}
    </AlunosContext.Provider>
  );
};
