const postgresPromise = require('pg-promise');
const P = require('bluebird');

const dbObj = {
  initOptions: {
    promiseLib: P
  },
  connection: {
    host: 'localhost',
    port: 5432,
    database: 'library',
    user: '',
    password: ''
  }
};
const pgp = postgresPromise(dbObj.initOptions);
const db = pgp(dbObj.connection);

module.exports = db;