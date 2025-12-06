import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProduto1765034507088 implements MigrationInterface {
  name = 'CreateProduto1765034507088';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "produto" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "color" varchar NOT NULL, "estoque" integer NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "produto"`);
  }
}
