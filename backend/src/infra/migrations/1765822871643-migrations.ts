import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1765822871643 implements MigrationInterface {
    name = 'Migrations1765822871643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "venda" ("id" varchar PRIMARY KEY NOT NULL, "nVenda" integer NOT NULL, "nomeCliente" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "item_venda" ("id" varchar PRIMARY KEY NOT NULL, "idProduto" varchar NOT NULL, "idVenda" varchar NOT NULL, "qtd" integer NOT NULL, "desconto" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "idade" integer NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "produto" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "color" varchar NOT NULL, "codBa" varchar NOT NULL, "preco" integer NOT NULL, "estoque" integer NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "produto"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "item_venda"`);
        await queryRunner.query(`DROP TABLE "venda"`);
    }

}
