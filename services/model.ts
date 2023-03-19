export interface Agent {
  id: number;
  name: string;
  username: string;
  password: string;
}

export interface Customers {
  id:number;
  name:string;
  username:string;
  password:string;
  agent_id:number;
  experience:number;
}

export interface Cars {
  id:number;
  brand:string;
  model:string;
  age:number;
  cc:number;
  hand:number;
  customer_id:number;
}

export interface Claims{
  id:number;
  descriptions:string;
  accident_date: string;
  customer_id:number;
  car_id:number
}

export interface Car_Part{
  id:number;
  part:string;
  claim_id:number;
}

export interface Damage_Level{
  id:number;
  damage:string;
  claim_id:number;
}