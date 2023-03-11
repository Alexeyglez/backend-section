import mongoose from "mongoose";
import mongoosePopulate from "mongoose-autopopulate";

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
    type: mongoose.Types.ObjectId,
    ref: "User",
    rerquired: true,
    autopopulate: true,
  },
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
      required: true,
      autopopulate: true,
    },
  ],
});

IdeaSchema.plugin(mongoosePopulate);
export default mongoose.model("Idea", IdeaSchema);
