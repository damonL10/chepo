import type { Knex } from "knex";
import { checkPassword } from "../utils/hash";
import { Customers } from "./model";

export class CustomersService {
  constructor(private knex: Knex) {}

  async checkLogin(username: string, plainPassword: string) {
    const customers = await this.knex<Customers>("customers")
      .select("id", "username", "password")
      .where("username", username)
      .first();

    if (customers && (await checkPassword(plainPassword, customers.password))) {
      return customers;
    }

      return undefined
  }
    async getCustomer(agent_id:Number) {
      const result = await this.knex<Customers>("customers")
      .select("*")
      .where("agent_id", agent_id)
      return result
    }
}