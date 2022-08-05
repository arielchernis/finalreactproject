import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

console.log("server is starting..");

import mongoose from "mongoose";
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("connected to mongo");
});

import bodyparser from "body-parser";
app.use(bodyparser.urlencoded({ extended: true, limit: "1mb" }));
app.use(bodyparser.json());

import post_routes from "./routes/post_routes";
app.use("/post", post_routes);

import auth_routes from "./routes/auth_routes";
app.use("/auth", auth_routes);

import file_routes from "./routes/file_routes";
app.use("/file", file_routes);

app.use("/uploads",express.static('uploads'))

app.get("/test", (_req, res) => {
  console.log('test');
  res.send('fuck');
})

import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

if (process.env.NODE_ENV == "development") {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "SCE 20222 simple REST backend API",
        version: "1.0.0",
        description: "A simple REST backend API with JWT authentication using refresh token",
      },
      servers: [{ url: "http://localhost:" + process.env.PORT }],
    },
    apis: ["./src/routes/*.ts"],
  };
  const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

}


import http from 'http';
const server = http.createServer(app);
export = server;