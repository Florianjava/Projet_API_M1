import { Router } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

router.get('/news', (req, res) => {
    const country = req.query.country || 'fr'; // Get the country parameter from the URL, default to 'fr' if not provided
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
            res.status(500).json({ error: 'Failed to fetch news' }); // Send error response if fetch fails
        });
});

export default router;