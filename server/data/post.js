import { Post } from "../model/schema.js";

export async function findByPostNum(postnum) {
    return Post.findOne({ postnum });
}

export async function createPost(post) {
    return new Post(post) //
        .save()
        .then((data) => data)
        .catch((err) => console.log(err));
}

export async function updatePost(post, newview) {
    const filter = { postnum: post };
    const update = { view: newview };
    await Post.findOneAndUpdate(filter, update);
}
