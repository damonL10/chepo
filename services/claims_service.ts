import { Knex } from "knex";
import type{ Claims } from "./model";
import { Car_Part, Damage_Level } from "./model";

export class ClaimsService {
    constructor(private knex: Knex) {}

    createClaims = async (customer_id: number, car_id: number, descriptions: string, accident_date: string) => {
        const newClaimQueryResult = await this.knex<Claims>("claims")
          .insert({ customer_id, car_id, descriptions, accident_date })
          .returning(["customer_id", "car_id", "descriptions", "accident_date"]);
        
        return newClaimQueryResult[0];
    };
    
    getMyClaims = async (customer_id: number) => {
        return await this.knex<Claims>("claims")
        .select('claims.id as claim_id', 'claims.descriptions as descriptions', 'claims.accident_date as accident_date', 'cars.brand as brand', 'cars.model as model', 'cars.cc as cc', 'cars.age as age', 'cars.hand as hand')
        .innerJoin('cars', 'claims.car_id', 'cars.id')
        .orderBy('claims.id', 'desc')
        .where('claims.customer_id', customer_id);
    };

    getClaimsDate = async (agent_id: number) => {
        return await this.knex<Claims>("agents")
        .select('claims.accident_date', 'claims.customer_id', 'claims.id')
        .innerJoin("customers", "agents.id", "customers.agent_id")
        .innerJoin("claims", "customers.id", "claims.customer_id")
        .where("agent_id", agent_id);
    };
    getTheirClaims = async (agent_id:number) => {
        // return await this.knex("agents")
        // .select("claims.id", 'claims.descriptions', 'claims.accident_date', 'cars.brand', 'cars.model', 'cars.age', 'cars.cc', 'cars.hand', 'part_results.part', 'damage_results.damage')
        // .innerJoin("customers", "agents.id", "customers.agent_id")
        // .innerJoin("cars", "customers.id", "cars.customer_id")
        // .innerJoin("claims", "customers.id", "claims.customer_id")
        // .innerJoin("part_results", "claims.id", "part_results.claim_id")
        // .innerJoin("damage_results", "claims.id", "damage_results.claim_id")
        // .where("agents.id", agent_id)
        const result = await this.knex.raw("SELECT COALESCE (json_agg(json_build_object('id', claims.id, 'brand', cars.brand, 'model', cars.model,'age', cars.age, 'cc', cars.cc, 'hand', cars.hand, 'descriptions', claims.descriptions, 'accident_date', claims.accident_date, 'part', part_results.part, 'damage', damage_results.damage)) FILTER (WHERE claims.id IS NOT NULL), '[]') AS claims FROM agents INNER JOIN customers ON agents.id = customers.agent_id INNER JOIN cars ON customers.id = cars.customer_id INNER JOIN claims ON cars.id = claims.car_id FULL OUTER JOIN part_results ON claims.id = part_results.claim_id FULL OUTER JOIN damage_results ON claims.id = damage_results.claim_id WHERE agents.id = ? GROUP BY agents.id",[agent_id])
        return result.rows
    }

    createCarPart = async (part:string, claim_id:number) => {
        const result = await this.knex<Car_Part>("part_results")
        .insert({part:part, claim_id: claim_id})
        .returning(["id", "part", "claim_id"])
        return result[0]
    }
    createDamageLevel = async (damage:string, claim_id:number) => {
        const result = await this.knex<Damage_Level>("damage_results")
        .insert({damage:damage, claim_id: claim_id})
        .returning(["id", "damage", "claim_id"])
        return result[0]
    }

    getAgentName = async (customer_id: number) => {
        return await this.knex<Claims>("customers")
        .select('agents.name')
        .innerJoin('agents', 'customers.agent_id', 'agents.id')
        .where('customers.id', customer_id);
    };

};