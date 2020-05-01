import { Router } from 'express';
import { currentRouter } from './users/current';
import { signinRouter } from './users/signin';
import { signoutRouter } from './users/signout';
import { signupRouter } from './users/signup';

const router = Router();

router.use(currentRouter);
router.use(signinRouter);
router.use(signoutRouter);
router.use(signupRouter);

export { router as routes };
