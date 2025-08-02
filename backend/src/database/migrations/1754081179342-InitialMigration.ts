import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1754081179342 implements MigrationInterface {
  name = 'InitialMigration1754081179342';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."roles_name_enum" AS ENUM('ADMIN', 'DEVELOPER', 'ANALYST')
        `);
    await queryRunner.query(`
            CREATE TABLE "roles" (
                "id" SERIAL NOT NULL,
                "name" "public"."roles_name_enum" NOT NULL,
                CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"),
                CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "name" character varying(100) NOT NULL,
                "email" character varying(100) NOT NULL,
                "password" character varying(100) NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "role_id" integer,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            );
            COMMENT ON COLUMN "users"."name" IS 'Nombre del usuario';
            COMMENT ON COLUMN "users"."email" IS 'Email del usuario';
            COMMENT ON COLUMN "users"."password" IS 'Contraseña del usuario';
            COMMENT ON COLUMN "users"."created_at" IS 'Campo que indica cuando fue creado el registro';
            COMMENT ON COLUMN "users"."updated_at" IS 'Campo que indica cuando fue actualizado el registro';
            COMMENT ON COLUMN "users"."deleted_at" IS 'Campo que indica cuando fue eliminado el registro'
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."vulnerabilities_criticality_enum" AS ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."vulnerabilities_status_enum" AS ENUM(
                'PENDING_FIX',
                'IN_PROGRESS',
                'SOLVED',
                'FALSE_POSITIVE'
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "vulnerabilities" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "description" text NOT NULL,
                "criticality" "public"."vulnerabilities_criticality_enum" NOT NULL DEFAULT 'LOW',
                "cwe" character varying,
                "suggestedFix" text NOT NULL,
                "status" "public"."vulnerabilities_status_enum" NOT NULL DEFAULT 'PENDING_FIX',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "reporter_id" integer NOT NULL,
                "assignee_id" integer,
                CONSTRAINT "PK_ee96a1a8d70c431bc2d86485502" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "vulnerabilities"
            ADD CONSTRAINT "FK_f6e1b79f192798320b06f16dadc" FOREIGN KEY ("reporter_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "vulnerabilities"
            ADD CONSTRAINT "FK_d6345e49f9c8ddb6c5a624a417b" FOREIGN KEY ("assignee_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "vulnerabilities" DROP CONSTRAINT "FK_d6345e49f9c8ddb6c5a624a417b"
        `);
    await queryRunner.query(`
            ALTER TABLE "vulnerabilities" DROP CONSTRAINT "FK_f6e1b79f192798320b06f16dadc"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"
        `);
    await queryRunner.query(`
            DROP TABLE "vulnerabilities"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."vulnerabilities_status_enum"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."vulnerabilities_criticality_enum"
        `);
    await queryRunner.query(`
            DROP TABLE "users"
        `);
    await queryRunner.query(`
            DROP TABLE "roles"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."roles_name_enum"
        `);
  }
}
