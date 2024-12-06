import asyncHandler from "express-async-handler";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email | !password) {
        return res.status(401).json({ success: false, message: "all fileds are required" })
    };

    const alreadyExist = await userModel.findOne({ email });
    if (alreadyExist) {
        return res.status(409).json({ success: false, message: "User already existed" })
    };

    const newUser = await new userModel({
        name,
        email,
        password
    });

    await newUser.save();

    if (!newUser) {
        return res.status(500).json({ success: false, message: "Something went wrong please try again" })
    };
    return res.status(200).json({ success: true, message: "User register successfully", newUser })

})

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email | !password) {
        return res.status(401).json({ success: false, message: "all fileds are required" })
    };

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ success: false, message: "Email not register" })
    };

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
        return res.status(405).json({ success: false, message: "Invalid Password" })
    };
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "4h" });
    if (!token) {
        return res.status(406).json({ success: false, message: "Something went wrong please try again" })
    };
    const data = {
        user,
        token
    }
    return res.status(200).json({ success: true, message: "User register successfully", data })

});


export const getProfile = asyncHandler(async (req, res) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(403).json({ success: false, message: "Access denied, token missing" })
    };

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
        return res.status(404).json({ success: false, message: "User Not found" })
    }
    // Respond with the user data
    return res.status(200).json({ success: true, message: "User fetched successfully", user })
})