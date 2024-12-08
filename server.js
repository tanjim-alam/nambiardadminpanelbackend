import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/post.route.js";
import dbConnection from "./config/dbConnection.js";
import authRoutes from "./routes/auth.route.js";
import blogRoutes from "./routes/blog.route.js"
import morgan from "morgan";
import sendEmail from "./utils/sendEmail.js";

dotenv.config();
// https://nambiard25adminpenal.vercel.app
const app = express();
const corsOptions = {
    origin: ["https://nambiard25adminpenal.vercel.app", "https://lodhahosaroad.in/"],
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
app.use("/api/v1/blog", blogRoutes);
dbConnection();


app.post("/api/v1/smtp", async (req, res) => {
    const { name, email, number, projectName, to } = req.body;
    if (!email || !name || !number) {
        return res.status(401).send({
            success: false,
            message: "All fields are required"
        })

    }

    const text = `Name:- ${name} \n Email:- ${email} \n Phone Number:- ${number}`;
    const subject = projectName || "Undefined Project";
    sendEmail(subject, text, to);
    res.status(200).send({
        success: true,
        message: "Email sent successfully"
    })
});

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
})