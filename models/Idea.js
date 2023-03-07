import mongoose, { Schema } from "mongoose";

const IdeaSchema = new mongoose.Schema({
  idea: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  upvotes: [{ type: Boolean }],
  downvotes: [{ type: Boolean }],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    rerquired: true,
    autopopulate: true,
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    required: true,
    autopopulate: true,
  },
});

//IdeaSchema.plugin(import 'mongoose-autopopulate')

export default mongoose.model("Idea", IdeaSchema);