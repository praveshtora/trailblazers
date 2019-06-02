import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import config from './config';
import router from './routes';

dotenv.config();
const app = express();
const port = config.server.PORT;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', router);

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server;