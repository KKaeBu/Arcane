import { Comment, Post, User } from "../model/schema.js";

export async function findByID(id) {
    return Post.findOne({ _id: id });
}

export async function findAllPost() {
    return Post.find();
}

export async function findPostByView() {
    return Post.find({}).sort({ view: 1 });
}

export async function findPostByLike() {
    return Post.find({}).sort({ Like: 1 });
}

export async function createPost(post) {
    return new Post(post) //
        .save()
        .then((data) => data)
        .catch((err) => console.log(err));
}

export async function updatePost(id, newview) {
    const filter = { _id: id };
    const update = { view: newview };
    await Post.findOneAndUpdate(filter, update);
}

export async function updatePostLike(id, new_like, user) {
    const u = await User.findOne({ username: user });
    const post = await Post.findOne({ _id: id });
    u.postlike.push(post);
    const filter = { _id: id };
    const update = { Like: new_like };
    await Post.findOneAndUpdate(filter, update);
    await u.save();
}

export async function deleteAll() {
    await Post.deleteMany({ postnum: 1 });
}

export async function deleteByID(id) {
    await Post.deleteOne({ _id: id });
}

export async function deleteComment(id, post_id) {
    await Comment.deleteOne({ _id: id });
    const post = await Post.findOne({ _id: post_id });
    post.comment.remove({ _id: id });
    await post.save();
}

export async function commentPost(comment, comment_id) {
    const new_comment = await new Comment(comment)
        .save()
        .then((data) => data)
        .catch((e) => console.error(e));

    const post = await Post.findOne({ _id: comment_id });
    await post.comment.push(new_comment);
    await post.save();
}
