const db = require('../config/database');

exports.create = (aluno, callback) => {
    const query = `
      INSERT INTO alunos (nome, senha, cep, dataNascimento, cpf)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.run(query, [aluno.nome, aluno.senha, aluno.cep, aluno.dataNascimento, aluno.cpf], function (err) {
      callback(err, this.lastID);
    });
  };
  

exports.findByCpf = (cpf, callback) => {
  const query = `SELECT * FROM alunos WHERE cpf = ?`;
  db.get(query, [cpf], callback);
};

exports.findAll = (callback) => {
  const query = `SELECT * FROM alunos`;
  db.all(query, [], callback);
};

exports.update = (id, aluno, callback) => {
  const query = `
    UPDATE alunos
    SET nome = ?, senha = ?, cep = ?, dataNascimento = ?, foto = ?
    WHERE id = ?
  `;
  db.run(query, [aluno.nome, aluno.senha, aluno.cep, aluno.dataNascimento, aluno.foto, id], function (err) {
    callback(err, this.changes);
  });
};

exports.delete = (id, callback) => {
  const query = `DELETE FROM alunos WHERE id = ?`;
  db.run(query, [id], function (err) {
    callback(err, this.changes);
  });
};
