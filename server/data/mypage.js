import { Comment, Post, User } from "../model/schema.js";
import * as postRepository from "../data/post.js";
import bcrypt from "bcrypt";

export async function deleteByUserName(username) {
    const user = await User.findOne({ username: username });
    for (let i = 0; i < user.postlike.length; i++) {
        const post = await Post.findOne({ _id: user.postlike[i]._id });
        const filter = { _id: post._id };
        const update = { Like: post.Like - 1 };
        await Post.findOneAndUpdate(filter, update);
    }

    await Comment.deleteMany({ username: username });
    await Post.deleteMany({ username: username });
    await User.deleteOne({ username: username });
}

export async function authByPassword(username, pw) {
    const user = await User.findOne({ username: username });
    return await bcrypt.compare(pw, user.password);
}

export async function Change(hashed, username) {
    const user = await User.findOne({ username: username });
    const filter = { username: username };
    const update = { password: hashed };
    await User.findOneAndUpdate(filter, update);
}
