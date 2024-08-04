import { Gym, Prisma } from '@prisma/client'
import { FetchManyNearby, GymsRepository } from '../gyms-repository.interface'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = prisma.gym.create({ data })
    return gym
  }

  async findById(id: string) {
    const gym = prisma.gym.findUnique({ where: { id } })
    return gym
  }

  async searchMany(query: string, page: number) {
    const gyms = prisma.gym.findMany({
      where: { title: { contains: query } },
      take: 20,
      skip: (page - 1) * 20,
    })
    return gyms
  }

  async fetchManyNearby({ userLatitute, userLongitute }: FetchManyNearby) {
    const gyms = prisma.$queryRaw<Array<Gym>>`
    SELECT * 
      FROM WHERE ( 6371 * acos( cos( radians(${userLatitute}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${userLongitute}) ) + sin( radians(${userLatitute}) ) * sin( radians( latitude ) ) ) ) <= 10
    `
    return gyms
  }
}
