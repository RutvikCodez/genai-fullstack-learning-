import { Schema, model } from "mongoose";

const blackListTakenSchema = new Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required!"],
    },
  },
  { timestamps: true },
);

const blackListModel = model("blacklisttokens", blackListTakenSchema);

export default blackListModel;
