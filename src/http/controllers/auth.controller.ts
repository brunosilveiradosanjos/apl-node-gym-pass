
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthUseCase } from '@/use-cases/factories/make-auth-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function auth(request: FastifyRequest, reply: FastifyReply) {
  const authBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authBodySchema.parse(request.body)

  try {
    const authUseCase = makeAuthUseCase()
    await authUseCase.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }

  return reply.status(200).send()
}
