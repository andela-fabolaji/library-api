import http from 'http';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { authRouter, userRouter, postRouter } from './modules/routers';

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

// auth
app.use('/auth', authRouter(express.Router()));

// users
app.use('/users', userRouter(express.Router()));

// posts
app.use('/posts', postRouter(express.Router()));

// Other routes not provisioned in the app
router.all('*', (req, res) => {
  res.status(404).send({
    message: 'You may be lost. This route does not exist!'
  });
});

app.use(router);

app.use((err, req, res, next) => {
  res.status(500).send({
    message: 'Something went terribly wrong with the server and we are looking into it! Please wait a little and try again!',
    error: err
  });
});

server.listen(port, (err) => {
  if (!err) return console.log(`App started on http://localhost:${port}`);
});

export default app;
