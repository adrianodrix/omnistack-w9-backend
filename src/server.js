require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const chalk = require('chalk');
const path = require('path');

const appConfig = require('./config/app');
const dbConfig = require('./config/database');

const routes = require('./routes');

const app = express();

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

  return app.listen(appConfig.port, error => {
    if (error) {
      return console.log(chalk.red(error));
    }

    return console.log(chalk.green(`Server Started...`));
  });
});
