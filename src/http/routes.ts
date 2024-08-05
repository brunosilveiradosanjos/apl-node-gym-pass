import { FastifyInstance } from 'fastify'
import { register } from './controllers/register.controller'
import { auth } from './controllers/auth.controller'
import { profile } from './controllers/profile.controller'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register) // create user
  app.post('/sessions', auth) // create session

  // Authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profile) // get logged user profile
}
