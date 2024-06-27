import { UsersRepository } from '@/repositories/users-repository.interface'
import { hash } from 'bcryptjs'

interface registerService {
  name: string
  email: string
  password: string
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ name, email, password }: registerService) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new Error('E-mail already exists.')
    }
    const password_hash = await hash(password, 6)

    await this.usersRepository.create({ name, email, password_hash })
  }
}
