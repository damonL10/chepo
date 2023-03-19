import type{ Request, Response } from "express";
// import type{ Knex } from "knex";
import { AgentsController } from "../controllers/agents_controller";
import { AgentsService } from "../services/agents_service";
import { getMockRequest, getMockResponse } from "./utils";

jest.mock("../services/agents_service");

describe("testing on AgentsController", () => {
  let controller: AgentsController;
  let service: AgentsService;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    service = new AgentsService({} as any);
    service.checkLogin = jest.fn(() => Promise.resolve({id:7, username: "7head", password: "7777h"}));
    req = getMockRequest();
    res = getMockResponse();
    controller = new AgentsController(service);
  })

  it("failed to login", async() => {
    req.body = { password:'123456'}
      await controller.login(req,res)
      expect(service.checkLogin).not.toBeCalled()
    expect(res.json).toBeCalledTimes(1)
  });

  it("success to login", async() => {
    req.body = { username: "testname", password:'testpassword'}
    await controller.login(req, res);

    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({message: "Welcome back! Agent!"});
  
})})
