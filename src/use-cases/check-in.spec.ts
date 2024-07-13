import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Chech In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gymId-01',
      title: 'First Gym',
      latitude: -27.2092052,
      longitude: -49.6401091,
      phone: '11987654321',
      description: 'New Gym',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in ', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gymId-01',
      userId: 'userId',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to checkin in twice the same day', async () => {
    vi.setSystemTime(new Date(2024, 6, 4, 11, 0, 0))
    await sut.execute({
      gymId: 'gymId-01',
      userId: 'userId',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    await expect(
      sut.execute({
        gymId: 'gymId-01',
        userId: 'userId',
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to checkin in twice the different days', async () => {
    vi.setSystemTime(new Date(2024, 6, 4, 11, 0, 0))
    await sut.execute({
      gymId: 'gymId-01',
      userId: 'userId',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    vi.setSystemTime(new Date(2024, 6, 5, 11, 0, 0))
    await expect(
      sut.execute({
        gymId: 'gymId-01',
        userId: 'userId',
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      }),
    ).resolves.toBeTruthy()
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.create({
      id: 'gymId-02',
      title: 'Gym 02',
      description: 'This is the Gym number 2',
      phone: '11987654321',
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gymId-02',
        userId: 'userId',
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
