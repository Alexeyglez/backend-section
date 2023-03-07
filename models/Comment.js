import mongoose, { Schema } from "mongoose";

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    autopopulate: true,
  },
});

//CommentSchema.plugin(import 'mongoose-autopopulate')
export default mongoose.model("Comment", CommentSchema);
