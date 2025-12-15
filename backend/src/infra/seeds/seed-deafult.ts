import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../../modules/user/entities/user.entity';

export async function seedDefaultUser(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);

  const exists = await userRepo.findOne({
    where: { email: 'admin@admin.com' },
  });

  if (exists) return;

  const user = userRepo.create({
    nome: 'Admin',
    idade: 20,
    email: 'admin@admin.com',
    senha: await bcrypt.hash('123', 10),
  });

  await userRepo.save(user);
}
