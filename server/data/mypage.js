import { Comment, Post, User } from "../model/schema.js";

export async function deleteByUserName(username) {
    const user = await User.findOne({ username: username });
    console.log(user);
}
