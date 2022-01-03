import express from "express";
import bodyParser from "body-parser";
import * as db from "./src/Routing/Users";
import { router } from "./src/Routing/Router";

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.use(router);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
