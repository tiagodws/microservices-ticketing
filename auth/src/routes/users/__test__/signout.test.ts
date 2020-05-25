import request from 'supertest';
import { app } from '../../../app';

const signoutUrl = '/api/users/signout';
const signupUrl = '/api/users/signup';

it('should clear the cookie after signing out', async () => {
  await request(app)
    .post(signupUrl)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const response = await request(app).post(signoutUrl).send().expect(200);

  expect(response.get('Set-Cookie')[0]).toContain('sess=;');
});
