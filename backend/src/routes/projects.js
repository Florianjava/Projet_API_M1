import { Router } from 'express';
import { getProjects } from '../services/plantnetService.js';

const router = Router();

router.get('/', async (req, res) => {
  const lang = req.query.lang;
  const projects = await getProjects(lang);

  res.json(projects);
});

router.get('/:id', async (req, res) => {
  const lang = req.query.lang;
  const projects = await getProjects(lang);
  const project = projects.find(({ id }) => id === req.params.id);

  res.json(project);
});

export default router;
