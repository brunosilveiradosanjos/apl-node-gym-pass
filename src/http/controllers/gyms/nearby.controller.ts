import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsBodySchema = z.object({
    userLatitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { userLatitude, userLongitude } = nearbyGymsBodySchema.parse(
    request.query,
  )

  const fetchNearbyUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await fetchNearbyUseCase.execute({
    userLatitude,
    userLongitude,
  })

  reply.send(200).send({
    gyms,
  })
}
