import { Router } from "express";
import AJV from "ajv";
import { createClient } from "redis";
import { StatusCodes } from "http-status-codes";
import { v4 } from "uuid";

import schema from "./schema.json";
import separatedPageSequence from "../solver/separatedPageSequence";

const separated = Router();

const ajv = new AJV();
const validate = ajv.compile(schema);

const client = createClient({
  url: "redis://redis:6379",
});

separated.post("/", async (req, res) => {
  const signatures = req.body;
  if (!validate(req.body)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send("expected an list of sheets per signature in your book");
    return;
  }
  try {
    await client.connect();
    const sequence = separatedPageSequence(signatures as number[]);
    const key = v4();
    await client.set(key, JSON.stringify(sequence), { EX: 120 });
    res.send(key);
  } catch (e) {
    console.error(e);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(JSON.stringify(e));
  } finally {
    client.disconnect();
  }
});

separated.get("/", async (req, res) => {
  const { key } = req.query;
  if (!key) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send("expect a query parameter called key");
    return;
  }
  try {
    await client.connect();
    const solution = await client.get(key.toString());
    if (!solution) {
      res.sendStatus(StatusCodes.NOT_FOUND);
      return;
    }
    res.json(JSON.parse(solution));
  } catch (e) {
    console.error(e);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  } finally {
    client.disconnect();
  }
});
export default separated;
