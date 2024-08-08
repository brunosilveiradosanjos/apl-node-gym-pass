import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Auth e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    })

    const session = await request(app.server).post('/sessions').send({
      email: 'johndoe@exemple.com',
      password: '123456',
    })

    expect(session.statusCode).toEqual(200)
    expect(session.body).toEqual({
      token: expect.any(String),
    })
  })
})
