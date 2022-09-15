import express from "express";
// import { User } from "../model/schema.js";
import * as postController from "../controller/post.js";

const router = express.Router();

router.post("/", postController.Posting);

router.post("/comment", postController.PostingComment);

router.get("/", postController.getPost);

router.get("/all", postController.getAllPost);

router.put("/read", postController.postRead);

router.delete("/delete", postController.Deleting);

export default router;
