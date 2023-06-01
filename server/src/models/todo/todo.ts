import { Schema, model } from "mongoose";
import { TodoTypes } from "./todoTypes";

const TodoSchema = new Schema<TodoTypes>(
  {
    title: {
        type: String,
        required: true
    },
    description: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
  },
  { timestamps: true }
);

export const TodoModel = model<TodoTypes>("Todo", TodoSchema);