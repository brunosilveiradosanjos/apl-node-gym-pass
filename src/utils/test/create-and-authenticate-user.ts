import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@exemple.com',
    password: '123456',
  })

  const session = await request(app.server).post('/sessions').send({
    email: 'johndoe@exemple.com',
    password: '123456',
  })

  const { token } = session.body

  return {
    token,
  }
}
