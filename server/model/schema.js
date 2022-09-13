import Mongoose from "mongoose";
import moment from "moment/moment.js";

const userSchema = new Mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, require: true },
    email: { type: String, require: true },
});

const postSchema = new Mongoose.Schema({
    title: { type: String, trim: true, required: true }, // 제목
    username: { type: String, required: true }, // 작성자
    content: { type: String, required: true }, // 글 내용
    Like: { type: Number, default: 0 }, // 추천 수
    date: { type: Date, default: Date.now }, // 글 작성 일시
    view: { type: Number, required: true }, // 조회수
});

export const User = Mongoose.model("User", userSchema);
export const Post = Mongoose.model("Post", postSchema);
