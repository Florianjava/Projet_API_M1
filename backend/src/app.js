import express from 'express';
import logger from 'pino-http';
import newsRoute from './routes/api_news.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger({ level: process.env.NODE_ENV === 'test' ? 'error' : 'info' }));


app.get('/', async (req, res) => {
    res.send('hellow');
});

// pourquoi /news marche pas
app.use('/', newsRoute);
  
export default app;
