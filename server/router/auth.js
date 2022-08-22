import express from "express";
// import { User } from "../model/schema.js";
import * as authController from "../controller/auth.js"

const router = express.Router();

// router.post("/signup", authController.signup);

// router.post("/signup", (req, res, next) => {
//     const user = new User(req.body);

//     user.save((err, userInfo) => {
//         if (err) {
//             console.error(err);
//             res.json({ message: "생성 실패" });
//             return;
//         }
//         res.json(userInfo);
//     });
// });

router.post("/signup", authController.signup);

// router.post("/login", authController.login);

export default router;
