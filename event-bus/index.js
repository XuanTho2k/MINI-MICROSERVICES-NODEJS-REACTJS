import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;
  console.log(event.type);

  // post service
  axios
    .post("http://localhost:4000/events", event)
    .catch((err) => console.log(err.message));
  // comment service
  axios
    .post("http://localhost:4001/events", event)
    .catch((err) => console.log(err.message));
  // query service
  axios
    .post("http://localhost:4002/events", event)
    .catch((err) => console.log(err.message));
  // moderation service
  axios
    .post("http://localhost:4003/events", event)
    .catch((err) => console.log(err.message));

  res.send({ status: "ok" });
});

app.listen(8080, () => {
  console.log("Event bus is running on" + 8080);
});
