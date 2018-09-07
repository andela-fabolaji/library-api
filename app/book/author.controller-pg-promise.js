const db = require('../db');

// using pg-promise
const getAuthors = (req, res, next) => {
  db.any('SELECT * FROM authors')
    .then((data) => {
      res.status(200)
      .json({ data });
    })
    .catch(err => next(err));
};

const createAuthor = (req, res, next) => {
  db.none('insert into authors(name, gender) values(${name}, ${gender})', req.body)
    .then(() => {
      res.status(200).json({ message: 'new author successfully added' });
    })
    .catch(err => next(err));
};

module.exports = { getAuthors, createAuthor };
