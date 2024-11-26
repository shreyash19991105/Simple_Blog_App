import express from "express";
import {
  authCheck,
  loginUser,
  registerUser,
} from "../controller/auth.controller.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "../controller/post.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/api/register", registerUser);
router.post("/api/login", loginUser);
router.get("/api/posts", getAllPosts);
router.get("/api/authCheck", authMiddleware, authCheck);
router.post("/api/posts", authMiddleware, createPost);
router.put("/api/posts/:id", authMiddleware, updatePost);
router.delete("/api/posts/:id", authMiddleware, deletePost);

export default router;
