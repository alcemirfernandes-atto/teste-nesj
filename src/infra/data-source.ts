import { DataSource } from 'typeorm';
import { join } from 'path';

const root = process.cwd();

const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: join(root, 'database.sqlite'),
  synchronize: false,
  logging: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/infra/migrations/*.js'],
});

export default AppDataSource;
