import { Person } from '@/entities/person.entity'
import { PersonRepository } from '@/repositories/pg/person.repository'

export class CreatePersonUseCase {
  constructor(private personRepository: PersonRepository) {}

  handle(person: Person) {
    return this.personRepository.create(person)
  }
}