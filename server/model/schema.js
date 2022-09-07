import Mongoose from "mongoose";

const userSchema = new Mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, require: true },
    email: { type: String, require: true },
});

const postSchema = new Mongoose.Schema({
    title: { type: String, trim: true, required: true },
    postnum: { type: Number, required: true }, // 글 일련번호(id) 같은거 순서대로 부여
    username: { type: String, required: true }, // 작성자
    date: { type: Date, default: Date.now }, // 글 작성 일시
    view: { type: Number, required: true }, // 조회수
});

export const User = Mongoose.model("User", userSchema);
export const Post = Mongoose.model("Post", postSchema);
