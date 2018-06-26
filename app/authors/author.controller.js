const db = require('../db');

const getAuthors = (req, res, next) => {
  db.any('SELECT * FROM authors')
      .then((data) => {
      res.status(200)
      .json({ data });
  })
  .catch(err => {
      return next(err);
  });
};

const create = (req, res, next) => {
  db.none(
    'insert into authors(name, gender)' +
    'values(${name}, ${gender})',
    req.body
  )
    .then(() => {
      res.status(200)
      .json({ message: 'new author successfully added' });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAll: getAuthors,
  create
};
