import express from 'express';
import { handlers } from './handlers';
import { createMiddleware } from '@mswjs/http-middleware';
import cors from 'cors';

const PORT = process.env.PORT || 5555;

const app = express();
app.use(cors());
app.use(express.json());
app.use(createMiddleware(...handlers));

if (process.env.NODE_ENV != 'test') {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}.`);
  });
}