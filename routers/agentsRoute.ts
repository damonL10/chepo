import express from "express";
import { agentsController } from "../routes";

export const agentsRoutes = express.Router();
agentsRoutes.post("/login", agentsController.login);