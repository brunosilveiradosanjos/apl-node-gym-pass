import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  // It gets token headers and validates with our JWT_SECRET
  // It return error with wrong TOKEN or with no TOKEN
  await request.jwtVerify()
  return reply.status(200).send()
}
