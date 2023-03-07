import mongoose, { Schema } from "mongoose";
import mongoosePopulate from "mongoose-autopopulate";

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

CommentSchema.plugin(mongoosePopulate);
export default mongoose.model("Comment", CommentSchema);
