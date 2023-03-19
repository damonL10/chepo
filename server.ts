import dotenv from "dotenv";
dotenv.config();

import express from "express";
import expressSession from "express-session";
import path from "path";
import { logger } from "./utils/logger";
import {isLoggedAgent, isLoggedCustomer}from './middleware'

import Knex from "knex";
import knexConfig from "./knexfile";
import bodyParser from 'body-parser'

export const knex = Knex(knexConfig[process.env.NODE_ENV ?? "development"]);

const app = express();

app.use(bodyParser.json({limit:'50mb'}))
app.use(express.json());
declare module "express-session" {
  interface SessionData {
    customer_id : number,
    agent_id : number,

  }
}
app.use(
  expressSession({
    secret: Math.random().toString(32).slice(2),
    resave: true,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  logger.debug(`Path: ${req.path},,, Method: ${req.method}`);
  next();
});

import { routes } from "./routes";

app.use(routes);

//for image classifier model  ------------------------------------->
// app.post("/image_classifier", uploadMiddleware, async(req, res) => {
//   // console.log(req.form.files);
//   // read image & convert to base64
//   const content = await readFile((req.form.files["image"] as formidable.File).filepath, {encoding: "base64"});
//   console.log(content);
//   const resp = await fetch("http://localhost:8000/image-classifier", {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify({ image: content }),
//   });
//   const data = await resp.json();
//   console.log(data);
//   res.json(data);
// });
// ---------------------------------------------------------------->

app.use(express.static(path.join(__dirname, "public")));
app.use('/agent', isLoggedAgent, express.static(path.join(__dirname, "agent")));
app.use('/customer', isLoggedCustomer, express.static(path.join(__dirname, "customer")));

// 404 Not Found
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});


const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => logger.info(`Listening to PORT [${PORT}]`));