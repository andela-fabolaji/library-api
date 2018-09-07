import db from '../config';

const User = {
  async getUsers(req, res, next) {
    db.any('SELECT * FROM authors')
    .then((data) => {
      res.status(200)
      .json({ data });
    })
    .catch(err => next(err));
  }
};

export default User;