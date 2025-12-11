import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1765465926901 implements MigrationInterface {
  name = 'Migrations1765465926901';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "item_venda" ("id" varchar PRIMARY KEY NOT NULL, "idProduto" varchar NOT NULL, "idVenda" varchar NOT NULL, "qtd" integer NOT NULL, "desconto" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "venda" ("id" varchar PRIMARY KEY NOT NULL, "nVenda" integer NOT NULL, "nomeCliente" varchar NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "venda"`);
    await queryRunner.query(`DROP TABLE "item_venda"`);
  }
}
