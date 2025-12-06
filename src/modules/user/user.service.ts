import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  async create(dto: CreateUserDto) {
    const hashed = await bcrypt.hash(dto.senha, 10);
    return this.repo.create({
      ...dto,
      senha: hashed,
    });
  }

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: string) {
    return this.repo.findById(id);
  }

  update(id: string, updateUserDto: Partial<UpdateUserDto>) {
    return this.repo.update(id, updateUserDto);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}
