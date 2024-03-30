import express from 'express';
import logger from 'pino-http';
import languagesRoute from './routes/languages.js';
import projectsRoute from './routes/projects.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger({ level: process.env.NODE_ENV === 'test' ? 'error' : 'info' }));

app.use('/api/v1/languages', languagesRoute);
app.use('/api/v1/projects', projectsRoute);

export default app;
