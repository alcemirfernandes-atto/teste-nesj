import { DataSource } from 'typeorm';
import { join } from 'path';

const root = process.cwd();

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: join(root, 'database.sqlite'),
  synchronize: true,
  logging: true,
  migrations: [
    join(root, 'dist/core/database/migrations/*.js'),
    join(root, 'src/core/database/migrations/*.ts'),
  ],
});
