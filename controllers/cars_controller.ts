import type { Request, Response } from "express";
import { CarsService } from "../services/cars_service";

export class CarsController {
  constructor(private carsService : CarsService){}

  getCars = async(req: Request, res: Response) => {
    const customer_id = req.session.customer_id!
    const cars = await this.carsService.getCars(customer_id);
    if (cars){
    res.json(cars)
    return
  } else {
    res.json({message:"failed to get cars details"})
  }
}
  createCars = async(req: Request, res: Response) => {
    const brand = req.body.brand
    const model = req.body.model
    const age = req.body.age
    const cc = req.body.cc
    const hand = req.body.hand
    const customer_id = req.session.customer_id!
    await this.carsService.createCars(brand,model,age,cc,hand, customer_id)
    res.status(201).json({message:"created car details success!!"});
    return
  };
}