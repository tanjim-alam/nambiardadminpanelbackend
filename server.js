import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/post.route.js";
import dbConnection from "./config/dbConnection.js";
import authRoutes from "./routes/auth.route.js";
import morgan from "morgan";

dotenv.config();
// https://nambiard25adminpenal.vercel.app
const app = express();
const corsOptions = {
    origin: "*",
    credentials: true
}

const PORT = 8081;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions))
app.use(morgan("dev"));


app.get("/", (req, res) => {
    res.send("API is running")
});

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/auth", authRoutes);
dbConnection();

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
})