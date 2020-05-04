import { Router } from 'express';

const router = Router();

router.post('/users/signout', (req, res) => {
  req.session = null;
  res.send({});
});

export { router as signoutRouter };
