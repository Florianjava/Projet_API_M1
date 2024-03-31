import express from 'express';
import logger from 'pino-http';
import newsRoute from './routes/api_news.js';
import infoRoute from './routes/api_info.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger({ level: process.env.NODE_ENV === 'test' ? 'error' : 'info' }));


// Swagger options object
const swaggerOptions = {
    definition: {
      openapi: '3.1.0',
      info: {
        title: 'API for news and informations by countries',
        version: '2.0',
        description: "With this API, you can select a country to retrieve the latest news and obtain some information about the selected country."
      },
      servers: [
        {
          url: 'http://localhost:3000'
        }
      ],
    },
    apis: ['./src/routes/api_news.js', './src/routes/api_info.js'],
};

// Generate Swagger documentation
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', async (req, res) => {
    res.send('hellow');
});

app.use('/api', newsRoute);
app.use('/api', infoRoute);
  
export default app;
