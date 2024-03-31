/**
 * @swagger
 * /api/info:
 *   get:
 *     summary: Get information about a country
 *     parameters:
 *       - in: query
 *         name: codes
 *         description: ISO 3166-1 alpha-2 or alpha-3 country code
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 population:
 *                   type: integer
 *                   description: Population of the country
 *                 flag:
 *                   type: string
 *                   format: uri
 *                   description: URL to the flag of the country
 *                 currencies:
 *                   type: object
 *                   description: Information about currencies used in the country
 *                 capital:
 *                   type: string
 *                   description: Capital city of the country
 *                 languages:
 *                   type: object
 *                   description: Information about languages spoken in the country
 *                 area:
 *                   type: number
 *                   description: Total area of the country in square kilometers
 *       '500':
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message when failed to fetch country information
 */


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
