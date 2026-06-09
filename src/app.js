import express from "express";
import { Todo } from "./model/todo.model.js";
import { redis } from "./config/redis.js";
import { rateLimit } from "./middleware/rateLimit.middleware.js";

const app = express();
app.use(express.json());

app.post("/todos", rateLimit, async (req, res) => {
  const { task } = req.body;

  await redis.del("cache:todos");

  const todo = await Todo.create({ task });

  res.status(201).json({
    message: "DONE",
    todo,
  });
});

app.get("/todos", rateLimit, async (req, res) => {
  const cache = await redis.get(`cache:todos`);

  if (cache) {
    return res.status(200).json({
      message: "DONE",
      todos: JSON.parse(cache),
    });
  }

  const todos = await Todo.find();

  await redis.set("cache:todos", JSON.stringify(todos), "EX", 100);

  res.status(200).json({
    message: "DONE",
    todos,
  });
});

app.get("/todo/:id", rateLimit, async (req, res) => {
  const { id } = req.params;

  const cache = await redis.get(`cache:todos:${id}`);

  if (cache) {
    return res.status(200).json({
      message: "DONE",
      todo: JSON.parse(cache),
    });
  }

  const todo = await Todo.findById(id);

  await redis.set(`cache:todos:${id}`, JSON.stringify(todo), "EX", 100);

  res.status(200).json({
    message: "DONE",
    todo,
  });
});

export { app };
