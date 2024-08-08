import { GymsRepository } from '@/repositories/gyms-repository.interface'
import { Gym } from '@prisma/client'

export interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

export interface FetchNearbyGymsUseCaseResponse {
  gyms: Array<Gym>
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.fetchManyNearby({
      userLatitude,
      userLongitude,
    })
    return { gyms }
  }
}
