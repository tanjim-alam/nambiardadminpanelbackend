import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/post.route.js";
import dbConnection from "./config/dbConnection.js";
import authRoutes from "./routes/auth.route.js";
import morgan from "morgan";

dotenv.config();

const app = express();
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
}
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

const PORT = 8080;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
})