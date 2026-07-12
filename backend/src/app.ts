import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

import router from "./router";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use(compression());

app.use(router);

export default app;