import express, { Application } from "express";
import routes from "./src/router/index";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./src/database/connection";


/* CONFIGURATION */
const PORT = process.env.PORT || 8080;
const app: Application = express();

dotenv.config();
connectToDB();

/* CORS (Allow Anyone) */
app.use(cors({ origin: "*" }));

/* URL PARSER */
app.use(express.json());

/* DIRECTING ALL ROUTES TO ROUTES */
app.use("/", routes);

/* SERVER LISTENING PORT */
app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));
