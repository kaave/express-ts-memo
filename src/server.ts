import express from 'express';

import { WelcomeController } from './controllers';
import { connect } from 'tls';

const app: express.Application = express();

const port: number = (process.env.PORT && parseInt(process.env.PORT, 10)) || 4000;

app.use('/welcome', WelcomeController);

app.listen(port, () => console.log(`Listening at http://localhost:${port}/`));
