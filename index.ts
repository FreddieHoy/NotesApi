import express from "express";
import bodyParser from "body-parser";
import { router } from "./src/Routing/Router";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

import dotEnv from "dotenv";

dotEnv.config();

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());
app.use(
  jwt({
    secret: "secret123",
    getToken: (req) => req.cookies.token,
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.use(router);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
