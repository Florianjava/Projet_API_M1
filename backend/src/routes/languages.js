import { Router } from 'express';
import { getLanguages } from '../services/plantnetService.js';

const router = Router();

router.get('/', async (req, res) => {
  const languages = await getLanguages();

  res.json(languages);
});

export default router;
