import express from "express";
import bodyParser from "body-parser";
import * as db from "./src/Routing/Users";
import { router } from "./src/Routing/Router";
import { initialise } from "./src/passportConfig";
import passport from "passport";
import session from "express-session";

initialise(passport);

const app = express();
const port = 8000;

app.use(
  session({
    // Key we want to keep secret which will encrypt all of our information
    secret: "secret",
    // Should we resave our session variables if nothing has changes which we dont
    resave: false,
    // Save empty value if there is no vaue which we do not want to do
    saveUninitialized: false,
  })
);

// Funtion inside passport which initializes passport
app.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
app.use(passport.session());

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
