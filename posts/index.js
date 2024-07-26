import express from "express";
import { randomBytes } from "crypto";
import axios from "axios";

const app = express();
import bodyParser from "body-parser";
import cors from "cors";
const posts = {};

app.use(bodyParser.json());
app.use(cors());

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");

  const { title } = req.body;
  console.log(req.body);
  posts[id] = {
    id,
    title,
  };

  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);
  res.send({});
});
app.listen(4000, () => {
  console.log("v55");
  console.log("Post service is running on " + 4000);
});
