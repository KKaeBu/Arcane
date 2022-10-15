import express from "express";
// import { User } from "../model/schema.js";
import * as authController from "../controller/auth.js";

const router = express.Router();

router.get("/", authController.me);

router.get("/login", authController.login);

router.get("/exist", authController.IsExistFromClient);

router.post("/signup", authController.signup);

router.post("/mark", authController.bookMarking);

export default router;
