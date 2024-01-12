import { Comment, Post, User } from "../model/schema.js";

export async function findByID(id) {
  return Post.findOne({ _id: id });
}

export async function findAllPost() {
  return Post.find({}).sort({ createDate: 1 });
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

export async function updatePostLike(id, new_like, user, isliked) {
  const u = await User.findOne({ username: user });
  const post = await Post.findOne({ _id: id });
  if (isliked) {
    u.postlike.remove({ _id: id });
    // post.likeuser.remove({ username: user });
    const filter = { _id: id };
    const update = { Like: new_like };
    await Post.findOneAndUpdate(filter, update);
    await u.save();
    await post.save();
    return u.postlike;
  } else {
    u.postlike.push(post);
    // post.likeuser.push({ username: user });
    const filter = { _id: id };
    const update = { Like: new_like };
    await Post.findOneAndUpdate(filter, update);
    await u.save();
    await post.save();
    return u.postlike;
  }
}

export async function updatePostContent(new_title, new_content, id) {
  console.log(Date.now());
  const filter = { _id: id };
  const update = {
    title: new_title,
    content: new_content,
    createDate: Date.now(),
  };
  await Post.findOneAndUpdate(filter, update);
}

export async function deleteByID(id) {
  /* 수동으로 데이터베이스 간 참조무결성을 지켜줌 > mongoose엔 foreign key 등의 기능이 없음 */
  const user = await User.find({});
  for (let i = 0; i < user.length; i++) {
    for (let j = 0; j < user[i].postlike.length; j++) {
      if (JSON.stringify(user[i].postlike[j]._id) === JSON.stringify(id)) {
        user[i].postlike.remove({ _id: id });
        user[i].save();
      }
    }
  }

  await Comment.deleteMany({ postid: id });
  await Post.deleteOne({ _id: id });
}

export async function deleteComment(id, post_id) {
  await Comment.deleteOne({ _id: id });
  const post = await Post.findOne({ _id: post_id });
  post.comment.remove({ _id: id });
  await post.save();
}

export async function commentPost(comment, post_id) {
  const new_comment = await new Comment(comment)
    .save()
    .then((data) => data)
    .catch((e) => console.error(e));

  const post = await Post.findOne({ _id: post_id });
  await post.comment.push(new_comment);
  await post.save();
}
