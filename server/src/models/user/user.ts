import { Schema, model } from "mongoose";
import { UserTypes } from "./userTypes";

const UserSchema = new Schema<UserTypes>(
  {
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
  },
  { timestamps: true }
);

export const UserModel = model<UserTypes>("User", UserSchema);