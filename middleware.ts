import type { Request, Response, NextFunction } from "express";

declare module "express-session" {
  interface SessionData {
    customer_id : number,
    agent_id : number,

  }
}

export const isLoggedAgent = (req:Request,res:Response,next:NextFunction) => {
  console.log(req.session.agent_id)
  if (!req.session.agent_id) {
    res.status(401).json({message:"agent not found"})
    return
  } else if (req.session.agent_id) {
    next()
  }
  }
export const isLoggedCustomer = (req:Request,res:Response,next:NextFunction) => {
  if (!req.session.customer_id) {
    res.status(401).json({message:"customer not found"})
    return
  } else if (req.session.customer_id) {
    next()
  }
  }
