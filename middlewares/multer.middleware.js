import path from "path";
import multer from "multer";

// Set up multer configuration
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

// Define file filter function
const fileFilter = (req, file, cb) => {
    const allowedExtensions = [".jpg", ".jpeg", ".webp", ".png", ".mp4"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
        cb(new Error(`Unsupported file type: ${ext}`), false);
    } else {
        cb(null, true);
    }
};

// Set up multer instance with configuration
export const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB file size limit
    fileFilter: fileFilter,
});

// export default upload;
