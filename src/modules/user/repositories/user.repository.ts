import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRepository } from '../../../@shared/repositories/repository.interface';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository implements IRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async update(id: string, data: Partial<UpdateUserDto>): Promise<void> {
    await this.repo.update(id, data);
  }
  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async create(data: CreateUserDto): Promise<void> {
    const user = this.repo.create(data);
    await this.repo.save(user);
  }

  async findAll(): Promise<User[]> {
    try {
      return this.repo.find();
    } catch (e) {
      throw new Error(`erro ${e}`);
    }
  }

  async findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.repo
      .createQueryBuilder('user')
      .addSelect('user.senha')
      .where('user.email = :email', { email })
      .getOne();
  }
}
