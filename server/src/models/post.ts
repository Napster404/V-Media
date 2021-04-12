import mongoose from "mongoose";
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User" },
  likeType: { type: mongoose.SchemaTypes.Number, required: true },
});

const commentSchema = new Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User" },
  content: { type: mongoose.SchemaTypes.String, required: true },
  timestamp: { type: mongoose.SchemaTypes.String, required: true },
});

const postSchema = new Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User" },
  text: { type: mongoose.SchemaTypes.String, required: true },
  imgUrl: { type: mongoose.SchemaTypes.String, required: false },
  timestamp: { type: mongoose.SchemaTypes.String, required: true },
  likesArray: [{ type: likeSchema }],
  commentsArray: [{ type: commentSchema }],
});

export default mongoose.model("Post", postSchema);
