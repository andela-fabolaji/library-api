const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const authorRouter = require('./authors/author.router');

const app = express();
const server = http.createServer(app);
const port = 3200;
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// index route
router.get('/', (req, res) => {
  res.status(200).send({
    message: 'Library api 1.0'
  })
});

// authors
app.use('/authors', authorRouter(express.Router()));

// Other routes not provisioned in the app
router.all('*', (req, res) => {
  res.status(404).send({
    message: 'Invalid route'
  })
});

app.use(router);

server.listen(port, (err) => {
  if (!err) return console.log(`App started on http://localhost:${port}`);
});

module.exports = app;
