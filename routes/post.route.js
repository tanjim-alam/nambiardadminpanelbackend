import { Router } from "express";
import { addPost, getPost, updatePost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/add", upload.fields([{ name: "featureImage", maxCount: 1 }, { name: "gallery", maxCount: 10 }]), addPost);
router.get("/get", getPost);
router.put("/update", upload.fields([{ name: "featureImage", maxCount: 1 }, { name: "gallery", maxCount: 10 }]), updatePost);

export default router;
