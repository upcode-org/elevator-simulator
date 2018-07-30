import * as express from 'express';
import * as bodyParser from 'body-parser';
import { request } from './routeHandlers/request';

const app = express();
const router = express.Router();

router.get('/request/:direction/:floor', request);

app.use(bodyParser.json());
app.use('/', router);
// add route-not-found;
// add error-handler;

export default app;