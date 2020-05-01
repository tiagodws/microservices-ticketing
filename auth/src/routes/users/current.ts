import { Router } from 'express';

const router = Router();

router.get('/users/current', (req, res) => {
  res.send('Hi there!');
});

export { router as currentRouter };
