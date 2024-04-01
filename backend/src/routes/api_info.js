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

// Create a new router instance
const router = Router();

// Define a route handler for GET requests to '/info'
router.get('/info', (req, res) => {
    // Extract the country code from the query parameters, defaulting to 'fr' if not provided
    const codes = req.query.codes || 'fr';
    // Construct the API URL using the country code
    const apiUrl = `https://restcountries.com/v3.1/alpha?codes=${codes}`;

    // Fetch data from the RestCountries API
    fetch(apiUrl)
        .then(response => {
            // Check if the response is ok
            if (!response.ok) {
                // Throw an error if the response is not OK
                throw new Error('Failed to fetch country information', apiUrl);
            }
            // Return the JSON response
            return response.json();
        })
        .then(data => {
            // Extract relevant information from the response data
            const population = data[0].population; 
            const flag = data[0].flags.svg; 
            const currencies = data[0].currencies; 
            const capital = data[0].capital; 
            const languages = data[0].languages; 
            const area = data[0].area; 
            // Send a JSON response containing the extracted information
            res.json({ population, flag, currencies, capital, languages, area }); 
        })
        .catch(error => {
            // Log any errors that occur during the process
            console.error('Error:', error);
            // Send a 500 status response with an error message if there's an error
            res.status(500).json({ error: 'Failed to fetch country information', apiUrl});
        });
});

// Export the router
export default router;