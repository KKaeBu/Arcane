import express from "express";
import * as mypageController from "../controller/mypage.js";

const router = express.Router();

router.delete("/delete", mypageController.Deleting);

export default router;
