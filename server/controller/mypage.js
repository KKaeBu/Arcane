import * as mypageRepository from "../data/mypage.js";

export async function Deleting(req, res) {
    console.log(req.body);
    await mypageRepository.deleteByUserName(req.body.username);
    return res.status(201).json(req.body);
}
