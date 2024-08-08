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

  async fetchManyNearby({ userLatitude, userLatitude }: FetchManyNearby) {
    const gyms = prisma.$queryRaw<Array<Gym>>`
    SELECT * 
      FROM WHERE ( 6371 * acos( cos( radians(${userLatitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${userLatitude}) ) + sin( radians(${userLatitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `
    return gyms
  }
}
