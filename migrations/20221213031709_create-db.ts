import { Knex } from "knex";

const agentsTableName = "agents";
const customersTableName = "customers";
const carsTableName = "cars";
const claimsTableName = "claims";
const imagesTableName = "images";
const part_resultsTableName = "part_results";
const damage_resultsTableName = "damage_results";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(agentsTableName, (table) => {
    table.increments();
    table.string("name").notNullable();
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
    table.timestamps(false, true);
  });

  await knex.schema.createTable(customersTableName, (table) => {
    table.increments();
    table.string("name").notNullable();
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
    table.integer("experience").notNullable();
    table.integer("agent_id").notNullable().unsigned();
    table.foreign("agent_id").references(`${agentsTableName}.id`);
    table.timestamps(false, true);
  });

  await knex.schema.createTable(carsTableName, (table) => {
    table.increments();
    table.string("brand").notNullable();
    table.string("model").notNullable();
    table.integer("age").notNullable();
    table.integer("cc").notNullable();
    table.integer("hand").notNullable();
    table.integer("customer_id").notNullable().unsigned();
    table.foreign("customer_id").references(`${customersTableName}.id`)
    table.timestamps(false, true);
  });

  await knex.schema.createTable(claimsTableName, (table) => {
    table.increments();
    table.text("descriptions").notNullable();
    table.date("accident_date").notNullable();
    table.integer("customer_id").notNullable().unsigned();
    table.foreign("customer_id").references(`${customersTableName}.id`)
    table.integer("car_id").notNullable().unsigned();
    table.foreign("car_id").references(`${carsTableName}.id`)
    table.timestamps(false, true);
  });

  await knex.schema.createTable(imagesTableName, (table) => {
    table.increments();
    table.string("image").notNullable();
    table.integer("claim_id").unsigned();
    table.foreign("claim_id").references(`${claimsTableName}.id`)
    table.timestamps(false, true);
  });

  await knex.schema.createTable(part_resultsTableName, (table) => {
    table.increments();
    table.string("part");
    table.integer("claim_id").unsigned();
    table.foreign("claim_id").references(`${claimsTableName}.id`)
    table.timestamps(false, true);
  });
  
  await knex.schema.createTable(damage_resultsTableName, (table) => {
    table.increments();
    table.string("damage");
    table.integer("claim_id").unsigned();
    table.foreign("claim_id").references(`${claimsTableName}.id`)
    table.timestamps(false, true);
  });

}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(damage_resultsTableName);
  await knex.schema.dropTableIfExists(part_resultsTableName);
  await knex.schema.dropTableIfExists(imagesTableName);
  await knex.schema.dropTableIfExists(claimsTableName);
  await knex.schema.dropTableIfExists(carsTableName);
  await knex.schema.dropTableIfExists(customersTableName);
  await knex.schema.dropTableIfExists(agentsTableName);
}

