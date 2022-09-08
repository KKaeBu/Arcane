import { Post } from "../model/schema.js";

export async function findByPostNum(postnum) {
    return Post.findOne({ postnum });
}

export async function findAllPost() {
    return Post.find();
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

export async function deleteAll() {
    await Post.deleteMany({ postnum: 1 });
}
