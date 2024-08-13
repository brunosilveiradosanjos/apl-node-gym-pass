import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  // await request(app.server).post('/users').send({
  //   name: 'John Doe',
  //   email: 'johndoe@exemple.com',
  //   password: '123456',
  // })

  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
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
