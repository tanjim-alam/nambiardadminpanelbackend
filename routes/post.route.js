import { Router } from "express";
import { addPost, getPost, updatePost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/add", upload.single("featureImage"), addPost);
router.get("/get", getPost);
router.put("/update", upload.single("featureImage"), updatePost);

export default router;