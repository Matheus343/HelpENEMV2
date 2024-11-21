const jwt = require('jsonwebtoken');
const secret = 'chave-secreta'; // Altere para uma chave forte e mantenha-a segura

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']; // O token será enviado no cabeçalho da requisição

  if (!token) {
    return res.status(403).json({ error: 'Token não fornecido!' });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido!' });
    req.user = user; // Adiciona os dados do usuário ao objeto `req`
    next(); // Chama o próximo middleware ou rota
  });
};

module.exports = authenticateToken;
