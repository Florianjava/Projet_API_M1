import express from 'express';
import logger from 'pino-http';
import newsRoute from './routes/api_news.js';
import infoRoute from './routes/api_info.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger({ level: process.env.NODE_ENV === 'test' ? 'error' : 'info' }));


app.get('/', async (req, res) => {
    res.send('hellow');
});

app.use('/api', newsRoute);
app.use('/api', infoRoute);
  
export default app;
