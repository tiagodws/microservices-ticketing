import request from 'supertest';
import { app } from '../../../app';

const signinUrl = '/api/users/signin';
const signupUrl = '/api/users/signup';

it('should return a 400 with an invalid email', async () => {
  const email = 'test';
  const password = 'password';

  await request(app)
    .post(signinUrl)
    .send({
      email,
      password,
    })
    .expect(400);
});

it('should fail when the supplied email does not belong to an user', async () => {
  const email = 'test@test.com';
  const password = 'password';

  await request(app)
    .post(signinUrl)
    .send({
      email,
      password,
    })
    .expect(400);
});

it('should fail when the supplied password is incorrect', async () => {
  const email = 'test@test.com';
  const password = 'password';

  await request(app)
    .post(signupUrl)
    .send({
      email,
      password,
    })
    .expect(201);

  await request(app)
    .post(signinUrl)
    .send({
      email,
      password: 'anotherPassword',
    })
    .expect(400);
});

it('should respond with a cookie when successful', async () => {
  const email = 'test@test.com';
  const password = 'password';

  await request(app)
    .post(signupUrl)
    .send({
      email,
      password,
    })
    .expect(201);

  const response = await request(app)
    .post(signinUrl)
    .send({
      email,
      password,
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('should return a 200 on successful signin', async () => {
  const email = 'test@test.com';
  const password = 'password';

  await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);
});
