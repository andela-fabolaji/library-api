import pgPromise from 'pg-promise';
import P from 'bluebird';

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

const db = pgPromise(dbObj.initOptions)(dbObj.connection);

export default db;
