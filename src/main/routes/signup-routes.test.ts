import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Julio',
        email: 'juliomarvim@yahoo.com.br',
        password: '123456',
        passwordConfirmation: '123456'
      })
      .expect(200)
  })
})
