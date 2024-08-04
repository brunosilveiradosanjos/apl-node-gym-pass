import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthUseCase } from '../auth'

export function makeAuthUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new AuthUseCase(prismaUsersRepository)

  return useCase
}
