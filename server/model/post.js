import Mongoose from "mongoose";
import { Schema } from "mongoose";

var postSchema = new Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
});

module.exports = Mongoose.model("post", postSchema);
