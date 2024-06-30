import { FastifyInstance } from 'fastify'
import { register } from './controllers/register.controller'
import { auth } from './controllers/auth.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register) // create user
  app.post('/sessions', auth) // create session
}
