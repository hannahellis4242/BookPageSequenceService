import { Router } from "express";
import AJV from "ajv";
import pageSequence from "../../solver/pageSequence";

const pages = Router();

const schema = JSON.parse(
  '{"type":"array","minItems":1,"items":{"type":"number"}}'
);
const ajv = new AJV();
const validate = ajv.compile(schema);

pages.get("/", async (req, res) => {
  const { signatures } = req.query;
  if (!signatures) {
    res.status(400).json([]);
    return;
  }
  const value = JSON.parse(signatures.toString());
  if (!validate(value)) {
    res.status(400).json([]);
    return;
  }
  const sequence = pageSequence(value as number[]);
  res.json(sequence);
});

export default pages;
