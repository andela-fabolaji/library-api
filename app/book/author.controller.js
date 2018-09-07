const client = require('../db/pgClient');

// using pure pg pool
const getAuthors = (req, res, next) => {
  client.query('SELECT * FROM authors', (err, data) => {
    if (err) return next(err);
    res.status(200).json({ data: data.rows });
  });
};

const createAuthor = (req, res, next) => {
  const query = 'INSERT INTO authors(name, gender) VALUES($1, $2) RETURNING *';
  const values = [req.body.name, parseInt(req.body.gender, 10)];

  client.query(query, values, (err, data) => {
    if (err) return next(err);
    res.status(201)
      .json({ data: data.rows[0] });
  });
};

module.exports = { getAuthors, createAuthor };