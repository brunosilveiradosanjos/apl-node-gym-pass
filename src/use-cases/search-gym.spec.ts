import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymUseCase } from './search-gym'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })
  it('should be able to search a gym ', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      latitude: -27.2092052,
      longitude: -49.6401091,
      phone: '',
      description: '',
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      latitude: -27.2092052,
      longitude: -49.6401091,
      phone: '',
      description: '',
    })

    const { gyms } = await sut.execute({ query: 'JavaScript', page: 1 })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let index = 1; index <= 22; index++) {
      await gymsRepository.create({
        title: `Javascript Gym ${index}`,
        latitude: -27.2092052,
        longitude: -49.6401091,
        phone: '',
        description: '',
      })
    }

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym 21' }),
      expect.objectContaining({ title: 'Javascript Gym 22' }),
    ])
  })
})
