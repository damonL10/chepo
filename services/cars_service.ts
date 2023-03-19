import type { Knex } from "knex";
import { Cars } from "./model";

export class CarsService {
  constructor(private knex: Knex ) {} 
  getCars = async(customer_id:number) => {
    const result = await this.knex<Cars>("cars")
    .select('id as car_id', 'brand', 'model')
    .where("customer_id", customer_id)
    return result
}
  createCars = async(brand:string, model:string, age:number, cc:number, hand:number,customer_id:number) => {
    const result = await this.knex<Cars>("cars")
    .insert({'brand': brand, 'model': model, 'age':age, 'cc':cc, 'hand':hand, 'customer_id':customer_id})
    .returning(["brand", 'model', 'age', 'cc', 'hand'])
    return result[0]
  }
}