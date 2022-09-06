import * as postRepository from "../data/post.js";

export async function getView(req, res) {
    const post = await postRepository.findByPostNum(req.query.postnum);
    return res.status(201).json(post);
}

export async function postRead(req, res) {
    const { postnum, username, view } = req.body;
    const post = await postRepository.updatePost(postnum, view + 1);
    return res.status(201).json(post);
}

export async function Posting(req, res) {
    const { postnum, username, view } = req.body;
    const post = await postRepository.createPost({
        postnum,
        username,
        view,
    });
    res.status(201).json({ post });
}
