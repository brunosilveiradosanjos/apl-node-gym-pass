import { Gym, Prisma } from '@prisma/client'
import { FetchManyNearby, GymsRepository } from '../gyms-repository.interface'
import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/library'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data?.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      created_at: new Date(),
    }
    this.items.push(gym)
    return gym ?? null
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)
    return gym ?? null
  }

  async searchMany(query: string, page: number) {
    const gym = this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
    return gym ?? null
  }

  async fetchManyNearby(params: FetchManyNearby) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.userLatitude, longitude: params.userLatitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )
      return distance < 10
    })
  }
}
