import { knex } from "./server";
import express from "express";

import { AgentsService } from "./services/agents_service";
import { AgentsController } from "./controllers/agents_controller";
import { CustomersService } from "./services/customers_service";
import { CustomersController } from "./controllers/customers_controller";
// import { PredictService } from "./services/predicts_service";
// import { PredictsController } from "./controllers/predicts_controller";
import { CarsService } from "./services/cars_service";
import { CarsController } from "./controllers/cars_controller";
import { ClaimsService } from "./services/claims_service";
import { ClaimsController } from "./controllers/claims_controller";

// import { ImageClassifierController } from "./controllers/imageclassifier_controller";

const agentsService = new AgentsService(knex);
export const agentsController = new AgentsController(agentsService);
const customersService = new CustomersService(knex);
export const customersController = new CustomersController(customersService);
// const predictsService = new PredictService(knex);
// export const predictsController = new PredictsController(predictsService);

const carService = new CarsService(knex);
export const carsController = new CarsController(carService);

const claimsService = new ClaimsService(knex);
export const claimsController = new ClaimsController(claimsService);

// const imageclassifierService = new ImageClassifierService(knex);
// export const imageclassifierController = new ImageClassifierController(imageclassifierService);

import { agentsRoutes } from "./routers/agentsRoute";
import { customersRoutes } from "./routers/customersRoute"
import { carsRoutes } from "./routers/carsRoute";
import { claimsRoutes } from "./routers/claimsRoute";

export const routes = express.Router();
routes.use("/agents", agentsRoutes);
routes.use("/customers", customersRoutes);
routes.use("/cars", carsRoutes);
routes.use("/claims", claimsRoutes);