import express from 'express';
import routes from './routes/Appointments.routes';

const server = express();

server.use(express.json());
server.use(routes);

server.listen(3333, () => {
  console.log('🚀 server started!');
});
