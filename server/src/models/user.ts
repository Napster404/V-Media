import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  heading: { type: mongoose.SchemaTypes.String, required: true },
  description: { type: mongoose.SchemaTypes.String, required: true },
  timestamp: { type: mongoose.SchemaTypes.String, required: true },
});

const userSchema = new Schema({
  name: { type: mongoose.SchemaTypes.String, required: true },
  avatar: { type: mongoose.SchemaTypes.String, required: true },
  email: { type: mongoose.SchemaTypes.String, required: true, unique: true },
  eventsArray: [{ type: eventSchema }],
});

export default mongoose.model("User", userSchema);
