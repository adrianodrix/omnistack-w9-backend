const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');

const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(routes);

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

console.clear();
mongoose.connect(
  'mongodb+srv://omnistack:omnistack@cluster0-kyyd6.gcp.mongodb.net/w9?retryWrites=true&w=majority',
  err => {
    console.clear();

    if (err) {
      return console.log(chalk.red(`Database error: ${err}`));
    }

    app.listen(3333, err => {
      if (err) {
        return console.log(chalk.red(err));
      }

      return console.log(chalk.green(`Server Started...`));
    });
  }
);
