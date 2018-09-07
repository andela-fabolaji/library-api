import http from 'http';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import User from './user';

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
    message: 'Republisher'
  });
});

// authors
app.use('/users', User.router(express.Router()));

// Other routes not provisioned in the app
router.all('*', (req, res) => {
  res.status(404).send({
    message: 'Invalid route'
  });
});

app.use(router);

server.listen(port, (err) => {
  if (!err) return console.log(`App started on http://localhost:${port}`);
});

export default app;
