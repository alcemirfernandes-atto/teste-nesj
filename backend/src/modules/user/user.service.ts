import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  async create(dto: CreateUserDto) {
    const existing = await this.repo.findByEmail(dto.email);

    if (existing) {
      throw new ConflictException('E-mail já está em uso');
    }

    const hashed = await bcrypt.hash(dto.senha, 10);
    return this.repo.create({
      ...dto,
      senha: hashed,
    });
  }

  findAll() {
    return this.repo.findAll();
  }

  async findOne(id: string) {
    const user = await this.repo.findById(id);

    if (!user) {
      throw new NotFoundException('Usuario inexistente');
    }

    return user;
  }

  async update(id: string, updateUserDto: Partial<UpdateUserDto>) {
    await this.findOne(id);
    return this.repo.update(id, updateUserDto);
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
