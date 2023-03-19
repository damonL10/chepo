import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("damage_results").del();
    await knex("part_results").del();
    await knex("images").del();
    await knex("claims").del();
    await knex("cars").del();
    await knex("customers").del();
    await knex("agents").del();
};