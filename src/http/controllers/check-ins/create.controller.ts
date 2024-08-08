import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })
  const createCheckInBodySchema = z.object({
    userLatitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { userLatitude, userLongitude } = createCheckInBodySchema.parse(
    request.body,
  )
  const { gymId } = createCheckInParamsSchema.parse(request.params)

  const createCheckInUseCase = makeCheckInUseCase()

  await createCheckInUseCase.execute({
    userId: request.user.sub,
    gymId,
    userLatitude,
    userLongitude,
  })

  reply.status(201).send()
}
