"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === "object" && "id" in decoded) {
            req.userId = decoded.id;
            next();
        }
    }
    catch (error) {
        res.status(403).json({
            msg: "Invalid token",
        });
        console.log(error);
    }
};
exports.userMiddleware = userMiddleware;
