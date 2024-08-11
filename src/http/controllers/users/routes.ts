import { FastifyInstance } from 'fastify'
import { register } from './register.controller'
import { auth } from './auth.controller'
import { profile } from './profile.controller'
import { refresh } from './refresh.controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register) // create user
  app.post('/sessions', auth) // create session

  app.patch('/token/refresh', refresh) // Should be called when user lost auth 401

  // Authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profile) // get logged user profile
}
