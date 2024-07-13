import { GymsRepository } from '@/repositories/gyms-repository.interface'
import { Gym } from '@prisma/client'

export interface FetchNearbyGymsUseCaseRequest {
  userLatitute: number
  userLongitute: number
}

export interface FetchNearbyGymsUseCaseResponse {
  gyms: Array<Gym>
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitute,
    userLongitute,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.fetchManyNearby({
      userLatitute,
      userLongitute,
    })
    return { gyms }
  }
}
