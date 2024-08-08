import { FastifyInstance } from 'fastify'
import { register } from './register.controller'
import { auth } from './auth.controller'
import { profile } from './profile.controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register) // create user
  app.post('/sessions', auth) // create session

  // Authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profile) // get logged user profile
}
