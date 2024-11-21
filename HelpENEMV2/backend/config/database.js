const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, '../database.sqlite'), (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco SQLite:', err.message);
  } else {
    console.log('Conectado ao banco SQLite.');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS alunos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      senha TEXT NOT NULL,
      cep TEXT NOT NULL,
      dataNascimento TEXT NOT NULL,
      cpf TEXT UNIQUE NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS livros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nomeLivro TEXT NOT NULL,
      autor TEXT NOT NULL,
      materia TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS questoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pergunta TEXT NOT NULL,
      resposta TEXT NOT NULL,
      nivel TEXT NOT NULL
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS administrador (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      ra TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL
    )
  `);
  
  db.get(`SELECT * FROM administrador WHERE ra = ?`, ['082210042'], (err, row) => {
    if (!row) {
      db.run(`
        INSERT INTO administrador (nome, ra, senha)
        VALUES (?, ?, ?)
      `, ['Administrador', '082210042', 'Admin@123']);
    }
  });
});

module.exports = db;
