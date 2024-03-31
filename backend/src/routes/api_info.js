import { Router } from 'express';

const router = Router();

router.get('/info', (req, res) => {
    const codes = req.query.codes || 'fr'; // Get the country parameter from the URL, default to 'fr' if not provided
    const apiUrl = `https://restcountries.com/v3.1/alpha?codes=${codes}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch country information', apiUrl);
            }
            return response.json();
        })
        .then(data => {
            const population = data[0].population; 
            const flag = data[0].flags.svg; 
            const currencies = data[0].currencies; 
            const capital = data[0].capital; 
            const languages = data[0].languages; 
            const area = data[0].area; 
            res.json({ population,
            flag,
            currencies,
            capital,
            languages,
            area
         }); 
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to fetch country information', apiUrl}); // Send error response if fetch fails
        });
});

export default router;
