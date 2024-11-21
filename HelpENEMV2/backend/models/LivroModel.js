const db = require('../config/database');

exports.create = (livro, callback) => {
  const query = `
    INSERT INTO livros (nomeLivro, autor, materia)
    VALUES (?, ?, ?)
  `;
  db.run(query, [livro.nomeLivro, livro.autor, livro.materia], function (err) {
    callback(err, this.lastID);
  });
};

exports.findAll = (callback) => {
  const query = `SELECT * FROM livros`;
  db.all(query, [], callback);
};

exports.findById = (id, callback) => {
  const query = `SELECT * FROM livros WHERE id = ?`;
  db.get(query, [id], callback);
};

exports.update = (id, livro, callback) => {
  const query = `
    UPDATE livros
    SET nomeLivro = ?, autor = ?, materia = ?
    WHERE id = ?
  `;
  db.run(query, [livro.nomeLivro, livro.autor, livro.materia, id], function (err) {
    callback(err, this.changes);
  });
};

exports.delete = (id, callback) => {
  const query = `DELETE FROM livros WHERE id = ?`;
  db.run(query, [id], function (err) {
    callback(err, this.changes);
  });
};
