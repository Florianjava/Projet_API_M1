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
dotenv.config();

const router = Router();

router.get('/news', (req, res) => {
    const country = req.query.country || 'fr'; // Obtenir le paramètre de pays de l'URL, défaut à 'fr' s'il n'est pas fourni
    const apiKey = process.env.APIKEYNEWS;
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch news');
            }
            return response.json();
        })
        .then(data => {
            // Vérifier si des articles sont renvoyés
            if (!data.articles || data.articles.length === 0) {
                throw new Error('Invalid country code');
            }
            
            const articlesData = data.articles.map(article => ({
                author: article.author,
                title: article.title,
                url: article.url,
                publishedAt: article.publishedAt,
                description: article.description,
                content: article.content,
                sourceName: article.source.name
            }));
        
            res.json({
                articles: articlesData
            });
        })
        .catch(error => {
            console.error('Error:', error);
            if (error.message === 'Invalid country code') {
                res.status(400).json({ error: 'Invalid country code' }); // Catch the code error
            } else {
                res.status(500).json({ error: 'Failed to fetch news' }); 
            }
        });
});

export default router;
