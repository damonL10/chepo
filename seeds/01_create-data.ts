import { Knex } from "knex";
import { hashPassword } from "../hash";
import type{ Customers, Agent } from "../services/model";


export async function seed(knex: Knex): Promise<void> {

    const customers = [
        { name: "Alex", username: "alex", password: "1234", experience: 2, agent_id: 1 },
        { name: "Chris", username: "chris", password: "1234", experience: 8, agent_id: 2 },
    ];
    
    for (const customer of customers) {
        const hashedPassword = await hashPassword(customer.password);
        customer.password = hashedPassword;
    };
    
    await knex<Customers>("customers").insert(customers);

    const agents = [
        { name: "Jimmy", username: "jimmy", password: "1234"},
        { name: "Shawn", username: "shawn", password: "1234"},
    ];
    
    for (const agent of agents) {
        const hashedPassword = await hashPassword(agent.password);
        agent.password = hashedPassword;
    };
    
    await knex<Agent>("agents").insert(agents);

};