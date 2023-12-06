module.exports = class Data1701868163427 {
    name = 'Data1701868163427'

    async up(db) {
        await db.query(`CREATE TABLE "transfer" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "extrinsic_hash" text, "amount" numeric NOT NULL, "fee" numeric NOT NULL, "from_id" character varying, "to_id" character varying, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_d6624eacc30144ea97915fe846" ON "transfer" ("block_number") `)
        await db.query(`CREATE INDEX "IDX_70ff8b624c3118ac3a4862d22c" ON "transfer" ("timestamp") `)
        await db.query(`CREATE INDEX "IDX_070c555a86b0b41a534a55a659" ON "transfer" ("extrinsic_hash") `)
        await db.query(`CREATE INDEX "IDX_76bdfed1a7eb27c6d8ecbb7349" ON "transfer" ("from_id") `)
        await db.query(`CREATE INDEX "IDX_0751309c66e97eac9ef1149362" ON "transfer" ("to_id") `)
        await db.query(`CREATE INDEX "IDX_f4007436c1b546ede08a4fd7ab" ON "transfer" ("amount") `)
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "sale_initialized" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "timestamp" TIMESTAMP NOT NULL, "extrinsic_hash" text, "sale_start" integer NOT NULL, "leadin_length" integer NOT NULL, "start_price" bigint NOT NULL, "regular_price" bigint NOT NULL, "region_begin" integer NOT NULL, "region_end" integer NOT NULL, "ideal_cores_sold" integer NOT NULL, "cores_offered" integer NOT NULL, CONSTRAINT "PK_43dfcd8bb9f6f2eddcbed912658" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "sales_started" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "timestamp" TIMESTAMP NOT NULL, "extrinsic_hash" text, "price" bigint NOT NULL, "core_count" integer NOT NULL, CONSTRAINT "PK_50dc2df7b84b9337ed5f995c72c" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "history_initialized" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "timestamp" TIMESTAMP NOT NULL, "extrinsic_hash" text, "when" integer NOT NULL, "private_pool_size" integer NOT NULL, "system_pool_size" integer NOT NULL, CONSTRAINT "PK_c89d207f6b8f1ada36ccf197fd1" PRIMARY KEY ("id"))`)
        await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_76bdfed1a7eb27c6d8ecbb73496" FOREIGN KEY ("from_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_0751309c66e97eac9ef11493623" FOREIGN KEY ("to_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "transfer"`)
        await db.query(`DROP INDEX "public"."IDX_d6624eacc30144ea97915fe846"`)
        await db.query(`DROP INDEX "public"."IDX_70ff8b624c3118ac3a4862d22c"`)
        await db.query(`DROP INDEX "public"."IDX_070c555a86b0b41a534a55a659"`)
        await db.query(`DROP INDEX "public"."IDX_76bdfed1a7eb27c6d8ecbb7349"`)
        await db.query(`DROP INDEX "public"."IDX_0751309c66e97eac9ef1149362"`)
        await db.query(`DROP INDEX "public"."IDX_f4007436c1b546ede08a4fd7ab"`)
        await db.query(`DROP TABLE "account"`)
        await db.query(`DROP TABLE "sale_initialized"`)
        await db.query(`DROP TABLE "sales_started"`)
        await db.query(`DROP TABLE "history_initialized"`)
        await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_76bdfed1a7eb27c6d8ecbb73496"`)
        await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_0751309c66e97eac9ef11493623"`)
    }
}
