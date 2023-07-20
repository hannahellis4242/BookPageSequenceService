import express, { json } from "express";
import pages from "./routes/v1/pages";
import morgan from "morgan";
import pagesV2 from "./routes/v2/pages";

const app = express();
app.use(json());
app.use(morgan("combined"));

app.use("/", pages);
app.use("/v2", pagesV2);

const host: string = "0.0.0.0";
const port: number = 8080;
app.listen(port, host, () => console.log(`listening on ${host}:${port}`));
