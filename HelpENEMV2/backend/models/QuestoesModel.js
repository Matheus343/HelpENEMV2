const db = require('../config/database');

exports.create = (questao, callback) => {
  const query = `
    INSERT INTO questoes (pergunta, resposta, nivel)
    VALUES (?, ?, ?)
  `;
  db.run(query, [questao.pergunta, questao.resposta, questao.nivel], function (err) {
    callback(err, this.lastID);
  });
};

exports.findAll = (callback) => {
  const query = `SELECT * FROM questoes`;
  db.all(query, [], callback);
};

exports.findById = (id, callback) => {
  const query = `SELECT * FROM questoes WHERE id = ?`;
  db.get(query, [id], callback);
};

exports.update = (id, questao, callback) => {
  const query = `
    UPDATE questoes
    SET pergunta = ?, resposta = ?, nivel = ?
    WHERE id = ?
  `;
  db.run(query, [questao.pergunta, questao.resposta, questao.nivel, id], function (err) {
    callback(err, this.changes);
  });
};

exports.delete = (id, callback) => {
  const query = `DELETE FROM questoes WHERE id = ?`;
  db.run(query, [id], function (err) {
    callback(err, this.changes);
  });
};
