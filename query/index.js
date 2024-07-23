import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
// middleware
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// route
app.use(bodyParser.json());

app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comment: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    const post = posts[postId];
    console.log(posts);
    console.log(postId);
    console.log(posts[postId]);
    post.comment.push({ id, content });
    console.log(posts);
  }
  res.send({});
});

app.listen(4002, () => {
  console.log("Query service is running on " + 4002);
});
