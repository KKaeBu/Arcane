import Mongoose from "mongoose";

const userSchema = new Mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, require: true },
    email: { type: String, require: true },
});

const postSchema = new Mongoose.Schema({
    postnum: { type: Number, required: true }, // 글 일련번호(id) 같은거
    username: { type: String, required: true }, // 작성자
    view: { type: Number, required: true }, // 조회수
});

export const User = Mongoose.model("User", userSchema);
export const Post = Mongoose.model("Post", postSchema);
