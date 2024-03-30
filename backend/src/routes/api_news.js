import { Router } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

router.get('/news', (req, res) => {

    const country = req.query.country || 'fr'; // Get the country parameter from the URL, default to 'us' if not provided
    const apiKey = "b245dde0773447c6b9eceaa08c9ee79b";
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch news', apiUrl);
            }
            return response.json();
        })
        .then(data => {
            res.json(data); // Send the data as JSON response
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to fetch news', apiUrl}); // Send error response if fetch fails
        });
});

export default router;
