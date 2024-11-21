const db = require('../config/database');

exports.create = (livro, callback) => {
  const query = `
    INSERT INTO livros (nomeLivro, autor, materia, link)
    VALUES (?, ?, ?, ?)
  `;
  db.run(query, [livro.nomeLivro, livro.autor, livro.materia, livro.link], function (err) {
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
    SET nomeLivro = ?, autor = ?, materia = ?, link = ?
    WHERE id = ?
  `;
  db.run(query, [livro.nomeLivro, livro.autor, livro.materia, livro.link, id], function (err) {
    callback(err, this.changes);
  });
};

exports.delete = (id, callback) => {
  const query = `DELETE FROM livros WHERE id = ?`;
  db.run(query, [id], function (err) {
    callback(err, this.changes);
  });
};
