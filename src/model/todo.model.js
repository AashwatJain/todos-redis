import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  task: String,
});

export const Todo = mongoose.model("Todo", todoSchema);
