import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const verifyToken = async (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).send("Access Denied.");

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send("Invalid Token.");

        req.user = decoded;
        next();
    })
};

export const authorizedRoles = (...roles) => async (req, res, next) => {
    try {
        const user = User.findById(req.user.id);
        if (!user || !roles.includes(user.role)) {
            return res.status(403).send("Access Denied.");
        }
        next();
    } catch (error) {
        return res.status(503).send("Server error", error);
    }
}