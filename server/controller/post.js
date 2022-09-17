import * as postRepository from "../data/post.js";

export async function getPost(req, res) {
    const post = await postRepository.findByID(req.headers._id);
    return res.status(201).json(post);
}

export async function getAllPost(req, res) {
    const post = await postRepository.findAllPost();
    return res.status(201).json(post);
}

export async function getPostSortedByView(req, res) {
    const post = await postRepository.findPostByView();
    return res.status(201).json(post);
}

export async function postRead(req, res) {
    const { _id, view } = req.body;
    const post = await postRepository.updatePost(_id, view + 1);
    return res.status(201).json(await postRepository.findByID(_id));
}

export async function postLike(req, res) {
    const { _id, like, user } = req.body;
    await postRepository.updatePostLike(_id, like + 1, user);
    return res.status(201).json(like + 1);
}

export async function Posting(req, res) {
    const { title, content, username, view } = req.body;
    const post = await postRepository.createPost({
        title,
        content,
        username,
        view,
    });
    return res.status(201).json({ post });
}

export async function Deleting(req, res) {
    await postRepository.deleteByID(req.body._id);
    //await postRepository.deleteAll(); 이건다 삭제해버림
    return res.status(201).json(req.body);
}

export async function PostingComment(req, res) {
    const { username, content, _id } = req.body;
    await postRepository.commentPost({ username, content }, _id);
    return res.status(201).json(req.body);
}

export async function DeletingComment(req, res) {
    await postRepository.deleteComment(req.body._id, req.body.post_id);
    return res.status(201).json(req.body);
}
