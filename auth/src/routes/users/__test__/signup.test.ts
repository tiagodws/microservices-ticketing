import request from 'supertest';
import { app } from '../../../app';

const signupUrl = '/api/users/signup';

it('should return a 201 on successful signup', async () => {
  await request(app)
    .post(signupUrl)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('should return a 400 with an invalid email', async () => {
  await request(app)
    .post(signupUrl)
    .send({
      email: 'test',
      password: 'password',
    })
    .expect(400);
});

it('should return a 400 with an invalid password', async () => {
  await request(app)
    .post(signupUrl)
    .send({
      email: 'test@test.com',
      password: 'pa',
    })
    .expect(400);
});

it('should return a 400 with missing email or password', async () => {
  await request(app).post(signupUrl).send({}).expect(400);

  await request(app)
    .post(signupUrl)
    .send({
      email: 'test@test.com',
    })
    .expect(400);

  await request(app)
    .post(signupUrl)
    .send({
      password: 'password',
    })
    .expect(400);
});

it('should not allow duplicated emails', async () => {
  await request(app)
    .post(signupUrl)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post(signupUrl)
    .send({
      email: 'test@test.com',
      password: 'anotherPassword',
    })
    .expect(400);
});

it('should set a cookie after successful signup', async () => {
  const response = await request(app)
    .post(signupUrl)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
