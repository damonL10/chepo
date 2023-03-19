import type { Knex } from "knex";
import { checkPassword } from "../utils/hash";
import { Agent } from "./model";

export class AgentsService {
  constructor(private knex: Knex) {}

  async checkLogin(username: string, plainPassword: string) {
    const agents = await this.knex<Agent>("agents")
      .select("id", "username", "password")
      .where("username", username)
      .first();

    if (agents && (await checkPassword(plainPassword, agents.password))) {
      return agents;
    }

    return undefined
    
  }
}