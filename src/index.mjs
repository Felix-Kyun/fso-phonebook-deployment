import express from "express";
import personRouter from "./routes/person.route.mjs";
import infoRouter from "./routes/info.route.mjs";
import { logger } from "./middlewares/logger.middleware.mjs";
import { notFound } from "./middlewares/notFound.middleware.mjs";
import morgan from "morgan";
import { morganCustomFormat } from "./misc/morganCustomFormat.mjs";
import path from "path";

const __dirname = path.resolve(import.meta.dirname);
const port = process.env.PORT || 3000;
const app = express();
const frontend = path.join(__dirname, "./../frontend/dist/");

app.use(express.json());
app.use(morgan(morganCustomFormat));
app.use(express.static(frontend));
app.use(cors());
// app.use(logger);

app.use("/api/persons", personRouter);
app.use("/api/info", infoRouter);

app.use(notFound);

app.listen(port, () => console.log(`Server started on :${port}`));
