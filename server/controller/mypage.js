import * as mypageRepository from "../data/mypage.js";

export async function Deleting(req, res) {
    await mypageRepository.deleteByUserName(req.body.username);
    return res.status(201).json(req.body);
}
