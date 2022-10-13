import { User } from "../model/schema.js";

// 사용자 아이디로 찾기
export async function findByUsername(username) {
    return User.findOne({ username });
}

export async function findById(id) {
    return User.findById(id);
}

export async function createUser(user) {
    return new User(user)//
        .save()
        .then((data) => data.id)
        .catch((err) => console.log(err));
}