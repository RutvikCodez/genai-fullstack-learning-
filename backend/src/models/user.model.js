import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "Username already taken!"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Account already exists with this email address!"],
    },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const userModel = model("users", userSchema);

export default userModel;