import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../../errors/bad-request-error';
import { validateRequest } from '../../middlewares/validate-request';
import { User } from '../../models/user';

const router = Router();

router.post(
  '/users/signup',
  [
    body('email').isEmail().withMessage('Invalid e-mail'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError([
        { field: 'email', message: 'E-mail already in use' },
      ]);
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = { jwt: userJwt };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
