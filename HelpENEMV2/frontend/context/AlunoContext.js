import React, { createContext, useState } from 'react';

export const AlunoContext = createContext();

export const AlunoProvider = ({ children }) => {
  const [nomeAluno, setNomeAluno] = useState('');

  return (
    <AlunoContext.Provider value={{ nomeAluno, setNomeAluno }}>
      {children}
    </AlunoContext.Provider>
  );
};
