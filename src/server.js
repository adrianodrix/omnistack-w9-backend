require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const chalk = require('chalk');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const appConfig = require('./config/app');
const dbConfig = require('./config/database');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(routes);

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

console.clear();
mongoose.connect(dbConfig.connectionString, err => {
  console.clear();

  if (err) {
    return console.log(chalk.red(`Database error: ${err}`));
  }

  return server.listen(appConfig.port, error => {
    if (error) {
      return console.log(chalk.red(error));
    }

    return console.log(chalk.green(`Server Started...`));
  });
});
