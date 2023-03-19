import { Request,Response } from "express";
import type { Knex } from "knex";
import { ClaimsController } from "../controllers/claims_controller";
import { ClaimsService } from "../services/claims_service";
import { getMockRequest, getMockResponse } from "./utils";

jest.mock("../services/claims_service");

describe("testing on ClaimsController", () => {
  let controller: ClaimsController;
  let service: ClaimsService;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    service = new ClaimsService({} as Knex);
    service.createClaims = jest.fn(() =>
      Promise.resolve({
        customer_id: 123,
        car_id: 123,
        descriptions: "testing",
        accident_date: "2022-12-25",
      })
    );
    service.getMyClaims = jest.fn(() =>
      Promise.resolve([
        { descriptions: "testing", accident_date: "2022-12-25", model: "testmodel" },
      ])
    );
    req = getMockRequest();
    res = getMockResponse();
    controller = new ClaimsController(service);
  });

  it("failed to create claims", async () => {
    req.session.customer_id = 13562,
    await controller.createClaims(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({message: "invalid input"});
    expect(res.json).toBeCalledTimes(1);
  });

  it("success to create claims", async () => {{
    req.session.customer_id = 1,
    req.body.car_id = 1,
    req.body.descriptions = 1,
    req.body.accident_date= new Date
  }
    await controller.createClaims(req, res);

    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith({message: "Customer create claim success"});
    expect(res.json).toBeCalledTimes(1);
  });
  
  it("failed to get my claims", async () => {
    await controller.getMyClaims(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({message: "invalid customer id"});
    expect(res.json).toBeCalledTimes(1);
  });

  it("success to get my claims", async () => {
    req.session.customer_id = 1
    await controller.getMyClaims(req, res);

    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith( [{ descriptions: "testing", accident_date: "2022-12-25", model: "testmodel" }]);
  });

});
