import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as errorHandler from 'errorhandler';
import { ControllerRouter } from './router';

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 8080;

// Init server
const server = express();

// Init middlewares
server.use(cors());
server.use(bodyParser.json());
if (env == 'development') {
  server.use(morgan('dev'));
  server.use(errorHandler());
}

// Init route
new ControllerRouter(server);

// Start server
server.listen(port, () => {
  console.log('===============================================================');
  console.log(`Environment: ${env}`);
  console.log('===============================================================');
  console.log(`Delivery Service starts listening on port ${port}`);
  console.log('===============================================================');
});

export { server }