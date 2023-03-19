import express from "express";
import { customersController } from "../routes";

export const customersRoutes = express.Router();
customersRoutes.post("/login", customersController.login);
customersRoutes.get("/get", customersController.get);