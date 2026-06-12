import { database } from '@/lib/pg/db'
import { IUserRepository } from '../user.repository.interface'
import { IUser } from '@/entities/models/user.interface'
import { IPerson } from '@/entities/models/person.interface'

export class UserRepository implements IUserRepository {
  async findByUsername(username: string): Promise<IUser | undefined> {
    const result = await database.clientInstance?.query<IUser>(
      `SELECT * FROM users WHERE username = $1`,
      [username],
    )

    return result?.rows[0]
  }

  public async create({
    username,
    password,
  }: IUser): Promise<IUser | undefined> {
    const result = await database.clientInstance?.query<IUser>(
      `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
      [username, password],
    )

    return result?.rows[0]
  }

  public async findWithPerson(
    userId: number,
  ): Promise<(IUser & IPerson) | undefined> {
    const result = await database.clientInstance?.query(
      `SELECT * FROM users
       LEFT JOIN person ON users.id = person.user_id
       WHERE users.id = $1`,
      [userId],
    )

    return result?.rows[0]
  }
}
