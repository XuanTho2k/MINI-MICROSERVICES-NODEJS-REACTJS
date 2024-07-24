import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
// middleware
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comment: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];

    post.comment.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];

    const comment = post.comment.find((cmt) => cmt.id === id);
    comment.status = status;
    comment.content = content;
  }
};

// route
app.use(bodyParser.json());

app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  console.log(type);

  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log("Query service is running on " + 4002);
  try {
    const res = await axios.get("http://localhost:8080/events");

    for (let event of res.data) {
      console.log("Processing event: ", event.type);
      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error);
  }
});
