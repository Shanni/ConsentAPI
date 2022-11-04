import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes";
import connect from "./connect";
const app: Application = express();
const port = 3000;

// Setup server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req: Request, res: Response) =>
  res.send("Welcome to Consent API")
);

app.listen(port, () => {
  console.log(`Application started successfully on port ${port}.`);
});

// Setup database
const db = "mongodb://localhost:27017/test";

connect(db);
routes(app);
