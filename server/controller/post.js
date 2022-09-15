import * as postRepository from "../data/post.js";

export async function getPost(req, res) {
    const post = await postRepository.findByID(req.headers._id);
    console.log(post);
    return res.status(201).json(post);
}

export async function getAllPost(req, res) {
    const post = await postRepository.findAllPost();
    return res.status(201).json(post);
}

export async function postRead(req, res) {
    const { _id, view } = req.body;
    const post = await postRepository.updatePost(_id, view + 1);
    return res.status(201).json(await postRepository.findByID(_id));
}

export async function Posting(req, res) {
    const { title, content, username, view } = req.body;
    const post = await postRepository.createPost({
        title,
        content,
        username,
        view,
    });
    res.status(201).json({ post });
}

export async function Deleting(req, res) {
    await postRepository.deleteAll();
    res.status(201);
}

export async function PostingComment(req, res) {
    const { username, content, _id } = req.body;
    await postRepository.commentPost({ username, content }, _id);
}
