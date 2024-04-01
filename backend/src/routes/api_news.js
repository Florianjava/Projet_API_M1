/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Retrieve the latest news for a country
 *     parameters:
 *       - name: country
 *         in: query
 *         description: ISO 3166-1 alpha-2 country code (e.g., 'fr' for France)
 *         required: false
 *         type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       author:
 *                         type: string
 *                         description: The author of the article.
 *                       title:
 *                         type: string
 *                         description: The title of the article.
 *                       url:
 *                         type: string
 *                         description: The URL of the article.
 *                       publishedAt:
 *                         type: string
 *                         description: The publication date and time of the article.
 *                       description:
 *                         type: string
 *                         description: A brief description of the article.
 *                       content:
 *                         type: string
 *                         description: The content or main body of the article.
 *                       sourceName:
 *                         type: string
 *                         description: The name of the news source.
 *       '400':
 *         description: Bad Request. The provided country code is invalid or missing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the reason for the bad request.
 *       '500':
 *         description: Internal Server Error. Failed to fetch news due to an unexpected error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the reason for the server error.

 */

import { Router } from 'express';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a new router instance
const router = Router();

// Define a route handler for GET requests to '/news'
router.get('/news', (req, res) => {
    // Extract the country parameter from the URL, defaulting to 'fr' if not provided
    const country = req.query.country || 'fr';
    // Retrieve the API key from environment variables
    const apiKey = process.env.APIKEYNEWS1;
    // Construct the API URL using the country and API key
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;

    // Fetch news data from the News API
    fetch(apiUrl)
        .then(response => {
            // Check if the response is OK
            if (!response.ok) {
                // Throw an error if the response is not OK
                throw new Error('Failed to fetch news');
            }
            // Return the JSON response
            return response.json();
        })
        .then(data => {
            // Check if articles are returned
            if (!data.articles || data.articles.length === 0) {
                // Throw an error if no articles are returned
                throw new Error('Invalid country code');
            }
            // Map the articles data to a more concise format
            const articlesData = data.articles.map(article => ({
                author: article.author,
                title: article.title,
                url: article.url,
                publishedAt: article.publishedAt,
                description: article.description,
                content: article.content,
                sourceName: article.source.name
            }));
            // Send a JSON response with the articles data
            res.json({
                articles: articlesData
            });
        })
        .catch(error => {
            // Log any errors that occur during the process
            console.error('Error:', error);
            // Check the error message and send an appropriate response
            if (error.message === 'Invalid country code') {
                res.status(400).json({ error: 'Invalid country code' }); // Send a 400 status with error message
            } else {
                res.status(500).json({ error: 'Failed to fetch news' }); // Send a 500 status with error message
            }
        });
});

// Export the router
export default router;
