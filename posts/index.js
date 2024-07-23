import express from "express";
import { randomBytes } from "crypto";

const app = express();
import bodyParser from "body-parser";
import cors from "cors";
const posts = {};

app.use(bodyParser.json());
app.use(cors());
app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");

  const { title } = req.body;
  console.log(req.body);
  posts[id] = {
    id,
    title,
  };
  res.status(201).send(posts[id]);
});

app.listen(4001, () => {
  console.log("ok");
});
