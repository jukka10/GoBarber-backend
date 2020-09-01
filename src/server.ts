import 'reflect-metadata';
import express from 'express';

import './database';
import uploadConfig from './config/upload';
import routes from './routes/index';

const server = express();

server.use(express.json());
server.use('/files', express.static(uploadConfig.directory));
server.use(routes);

server.listen(3333, () => {
  console.log('🚀 server started!');
});
