import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  try {
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET!);
    if (typeof decoded === "object" && "id" in decoded) {
      req.userId = decoded.id;
      next();
    }
  } catch (error) {
    res.status(403).json({
      msg: "Invalid token",
    });
    console.log(error);
  }
};
