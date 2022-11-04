import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";

import routes from "./routes/routes";
import connect from "./connect";
import {
  clientErrorHandler,
  errorHandler,
  logErrors,
} from "./errors/errorHandlers";

const app: Application = express();
const port = 3000;

// Setup database
const db = "mongodb://localhost:27017/test";
connect(db);

// Setup server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Consent API");
});

routes(app);

// Listen to server
app.listen(port, () => {
  console.log(`Application started successfully on port ${port}.`);
});
