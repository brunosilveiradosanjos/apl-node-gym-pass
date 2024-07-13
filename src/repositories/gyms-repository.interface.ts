import { Gym, Prisma } from '@prisma/client'

export interface FetchManyNearby {
  userLatitute: number
  userLongitute: number
}

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Array<Gym>>
  fetchManyNearby(params: FetchManyNearby): Promise<Array<Gym>>
}
