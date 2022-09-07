import express from "express";
// import { User } from "../model/schema.js";
import * as postController from "../controller/post.js";

const router = express.Router();

router.post("/", postController.Posting);

router.get("/", postController.getView);

router.get("/all", postController.getAllPost);

router.put("/read", postController.postRead);
export default router;
