import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    // It gets token headers and validates with our JWT_SECRET
    // It return error with wrong TOKEN or with no TOKEN
    await request.jwtVerify()
  } catch (error) {
    reply.status(401).send({ message: 'Unauthorized.' })
  }
}
