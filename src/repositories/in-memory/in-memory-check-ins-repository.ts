import { CheckIn, Prisma } from '@prisma/client'
import { CheckInRepository } from '../check-in-repository.interface'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInRepository {
  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: data.id ?? randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      user_id: data.user_id,
      gym_id: data.gym_id,
    }

    this.items.push(checkIn)
    return checkIn
  }

  async findByUserInOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endtOfTheDay = dayjs(date).endOf('date')

    const checkInOnTheSameDate = this.items.find((checkIn) => {
      const checkinDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkinDate.isAfter(startOfTheDay) && checkinDate.isBefore(endtOfTheDay)
      return checkIn.user_id && isOnSameDate
    })
    if (!checkInOnTheSameDate) {
      return null
    }
    return checkInOnTheSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((user) => user.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userId: string) {
    const checkIns = this.items.filter(
      (checkIn) => checkIn.user_id === userId,
    ).length
    return checkIns
  }

  async findById(id: string) {
    const checkIn = this.items.find((item) => item.id === id)
    return checkIn ?? null
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)
    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }
    return checkIn
  }
}
