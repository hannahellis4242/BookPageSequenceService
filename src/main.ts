import express, { json } from "express";
import morgan from "morgan";
import sequence from "./routes/sequence";
import separated from "./routes/separated";

const app = express();
app.use(json());
app.use(morgan("combined"));

app.use("/sequence", sequence);
app.use("/separated", separated);

const host: string = "0.0.0.0";
const port: number = 8080;
app.listen(port, host, () => console.log(`listening on ${host}:${port}`));
