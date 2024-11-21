const db = require('../config/database');

exports.findByRa = (ra, callback) => {
  const query = `SELECT * FROM administrador WHERE ra = ?`;
  db.get(query, [ra], callback);
};
