const { Pool } = require('pg');

const client = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'library',
  user: '',
  password: ''
});

client.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected');
  }
});

module.exports = client;