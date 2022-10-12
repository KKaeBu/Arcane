import { Comment, Post, User } from "../model/schema.js";
import * as postRepository from "../data/post.js";

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
