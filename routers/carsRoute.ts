import express from "express";
import {carsController} from "../routes"

export const carsRoutes = express.Router();
carsRoutes.get("/get",carsController.getCars);
carsRoutes.post("/create",carsController.createCars)