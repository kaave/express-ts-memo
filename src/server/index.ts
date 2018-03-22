import express from 'express';
import hbs from 'express-hbs';

import { WelcomeController } from '~/controllers';
import ReactRouterController from '~/controllers/react-router.tsx';

const app: express.Application = express();

const port: number = (process.env.PORT && parseInt(process.env.PORT, 10)) || 4000;

// set template engine
app.engine(
  'hbs',
  hbs.express4({
    // partialsDir: __dirname + '/views/partials'
  }),
);
app.set('view engine', 'hbs');
app.set('views', './src/views/');

app.use('/welcome', WelcomeController);

app.use(ReactRouterController);

app.listen(port, () => console.log(`Listening at http://localhost:${port}/`));
