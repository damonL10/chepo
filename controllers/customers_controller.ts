import type { Request, Response } from "express";
import { CustomersService } from "../services/customers_service";

export class CustomersController {
  constructor(private CustomersService: CustomersService) {}

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.json({ message: "Customers login failed" });
    }

    const customers = await this.CustomersService.checkLogin(username, password);

    req.session["customer_id"] = customers?.id
    res.json({ message: "Welcome back! Customers!" });
  };
  
  get = async (req:Request, res:Response) => {
    const agent_id = req.session.agent_id!
    const customers = await this.CustomersService.getCustomer(agent_id)
    res.json(customers)
    return
  }
}