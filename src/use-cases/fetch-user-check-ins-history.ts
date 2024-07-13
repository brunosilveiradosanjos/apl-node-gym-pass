import { CheckInRepository } from '@/repositories/check-in-repository.interface'
import { CheckIn } from '@prisma/client'

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}
interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: Array<CheckIn> | null
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkinRepository: CheckInRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkinRepository.findManyByUserId(userId, page)
    return { checkIns }
  }
}
