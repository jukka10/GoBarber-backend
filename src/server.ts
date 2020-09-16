import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import uploadConfig from './config/upload';
import routes from './routes/index';
import exceptionHandling from './middlewares/exceptionHandling/index';

import './database';

const server = express();

server.use(cors());
server.use(express.json());
server.use('/files', express.static(uploadConfig.directory));
server.use(routes);

server.use(exceptionHandling);

server.listen(3333, () => {
  console.log('🚀 server started!');
});
