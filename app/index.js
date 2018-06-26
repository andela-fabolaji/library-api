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

router.get('/', (req, res) => {
  console.log(';;;;;;;');
  res.status(200).send({
    message: 'Welcome to the library'
  })
});

// authors
app.use('/authors', authorRouter(express.Router()));
// router.route('/authors')
//   .get((req, res, next) => {
//     db.any('SELECT * FROM authors')
//     .then((data) => {
//       res.status(200)
//       .json({ data });
//     })
//     .catch(err => {
//       return next(err);
//     });
// });

// books
router.route('/books')
  .get();

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
