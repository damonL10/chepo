import express from "express";
import { uploadMiddleware } from "../formidable";
import { claimsController } from "../routes"

export const claimsRoutes = express.Router();
claimsRoutes.get("/",claimsController.getMyClaims);
claimsRoutes.post("/claimnow",claimsController.createClaims);
claimsRoutes.get("/their",claimsController.getTheirClaims);
claimsRoutes.get("/date",claimsController.date);
claimsRoutes.post("/image_classifier", uploadMiddleware, claimsController.createPartandDamage);
claimsRoutes.get("/processcomplete", claimsController.getAgentName);