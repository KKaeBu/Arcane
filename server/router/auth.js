import express from "express";
// import { User } from "../model/schema.js";
import * as authController from "../controller/auth.js"

const router = express.Router();

router.post("/signup", authController.signup);
router.get("/login", authController.login);

export default router;
