import type { Request, Response } from "express";
import { AgentsService } from "../services/agents_service";

export class AgentsController {
  constructor(private agentsService: AgentsService) {}

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.json({ message: "Agent login failed" });
      return
    }

    const agents = await this.agentsService.checkLogin(username, password);

    req.session.agent_id = agents?.id
    res.json({ message: "Welcome back! Agent!"});
    return
  };
}