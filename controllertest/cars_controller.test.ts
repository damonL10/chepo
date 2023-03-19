import type{ Request, Response } from "express";
import type{ Knex } from "knex";
import { CarsController } from "../controllers/cars_controller";
import { CarsService } from "../services/cars_service";
import { getMockRequest, getMockResponse } from "./utils";

jest.mock("../services/cars_service");

describe("testing on CarsController", () => {
  let controller: CarsController;
  let service: CarsService;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    service = new CarsService({} as Knex);
    service.getCars = jest.fn(() => Promise.resolve([{model:"test"}]))
    service.createCars = jest.fn(() => Promise.resolve({brand:"testla", model:"test", age:1, cc:1111, hand:3, customer_id:1}));
    req = getMockRequest();
    res = getMockResponse();
    controller = new CarsController(service);
  })

  it("failed to getCar", async() => {
    // req.session.customer_id = undefined
      await controller.getCars(req,res)
      expect(service.getCars).toBeCalledTimes(1)
      expect(res.json).toBeCalledTimes(1)
  });

  it("success to getCar", async() => {
    req.body = { customer_id:1}
    await controller.getCars(req, res);

    expect(res.json).toBeCalledTimes(1);
  
})
it("success to createCar", async() => {
  req.body = {brand:"testla", model:"test", age:1, cc:1111, hand:3, customer_id:1}
    await controller.createCars(req,res)
    expect(service.createCars).toBeCalled()
    expect(res.json).toBeCalledTimes(1)
});})
