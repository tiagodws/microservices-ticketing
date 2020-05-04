import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../../errors/bad-request-error';
import { validateRequest } from '../../middlewares/validate-request';
import { User } from '../../models/user';
import { Password } from '../../services/password';

const router = Router();

router.post(
  '/users/signin',
  [
    body('email').isEmail().withMessage('Invalid e-mail'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must provide a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const loginError = new BadRequestError([
      { message: 'Invalid email or password' },
    ]);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) throw loginError;

    const { password: hashedPassword } = user;
    const valid = await Password.compare(hashedPassword, password);

    if (!valid) throw loginError;

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = { jwt: userJwt };

    res.status(200).send(user);
  }
);

export { router as signinRouter };
