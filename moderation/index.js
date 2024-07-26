import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

app.use("/events", async (req, res) => {
  const { type, data } = req.body;

  console.log(type);

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    console.log(status);
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }
  res.send({});
});

app.listen(4003, () => {
  console.log("Moderation is listening  on " + 4003);
});
