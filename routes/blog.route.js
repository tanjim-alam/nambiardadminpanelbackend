import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addBlog, getAllBlog, getBlog } from "../controllers/blog.controller.js";

const router = Router();

router.post("/add", upload.single("featureImage"), addBlog);
router.get("/get-all", getAllBlog);
router.get("/get/:slug", getBlog);

export default router;