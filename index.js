const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors').require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(require('./routes'))

const { MONGOOSE_URL, PORT } = process.env;

const connectWithMongooseAndServer = async () => {
  try {
    await mongoose.connect(MONGOOSE_URL, () => console.log('Подключено к БД!'));
    app.listen(PORT, () => console.log('Подключено к серверу, порт: ' + PORT));
  } catch (error) {
    console.log('Ошибка при подключении: ' + error.toString());
  }
};

connectWithMongooseAndServer();
