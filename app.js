const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { errors } = require('celebrate');

const { NODE_ENV, PORT, DATABASE } = process.env;

const app = express();
const router = require('./routes/index');
const { cors } = require('./middlewares/cors');
const { handleError } = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');

mongoose.connect(
  NODE_ENV === 'production' ? DATABASE : 'mongodb://127.0.0.1:27017/artist'
);

app.use(helmet());
app.use(bodyParser.json());

app.use(requestLogger);
app.use(limiter);
app.use(cors);
app.use('/api', router);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT || 3001, () => {
  console.log(`App listening on port ${PORT || 3001},`);
});
