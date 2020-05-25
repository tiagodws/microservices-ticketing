import request from 'supertest';
import { app } from '../../../app';

const currentUrl = '/api/users/current';
const signupUrl = '/api/users/signup';
const signoutUrl = '/api/users/signout';

it('should return the current user', async () => {
  const email = 'test@test.com';
  const password = 'password';

  const signupResponse = await request(app)
    .post(signupUrl)
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = signupResponse.get('Set-Cookie');

  const response = await request(app)
    .get(currentUrl)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual(email);
});

it('should return null when no cookie is present', async () => {
  const response = await request(app).get(currentUrl).send().expect(200);

  expect(response.body.currentUser).toBeNull();
});
