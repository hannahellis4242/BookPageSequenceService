import { Router } from "express";
import AJV from "ajv";
import { createClient } from "redis";
import pageSequence from "../../solver/pageSequence";
import { STATUS_CODES } from "http";
import { StatusCodes } from "http-status-codes";
import { v4 } from "uuid";

const pagesV2 = Router();

const schema = JSON.parse(
  '{"type":"array","minItems":1,"items":{"type":"number"}}'
);
const ajv = new AJV();
const validate = ajv.compile(schema);

const client = createClient({
  url: "redis://redis:6379",
});

pagesV2.post("/", async (req, res) => {
  const signatures = req.body;
  if (!validate(signatures)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send("expected an list of sheets per signature in your book");
    return;
  }
  console.log(signatures);
  try {
    await client.connect();
    const values = signatures as number[];
    console.log(values);
    const sequence = pageSequence(values);
    console.log(sequence);
    const key = v4();
    await client.set(key, JSON.stringify(sequence), { EX: 120 });
    res.send(key);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(JSON.stringify(e));
  } finally {
    client.disconnect();
  }
});

pagesV2.get("/", async (req, res) => {
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
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  } finally {
    client.disconnect();
  }
});
export default pagesV2;
