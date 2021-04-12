import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User" },
  username: { type: mongoose.SchemaTypes.String, required: true },
  content: { type: mongoose.SchemaTypes.String, required: true },
  timestamp: { type: mongoose.SchemaTypes.String, required: true },
  replyId: { type: mongoose.SchemaTypes.ObjectId },
});

const roomSchema = new Schema({
  title: { type: mongoose.SchemaTypes.String, required: false },
  usersArray: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  messagesArray: [{ type: messageSchema }],
});

export default mongoose.model("Room", roomSchema);
