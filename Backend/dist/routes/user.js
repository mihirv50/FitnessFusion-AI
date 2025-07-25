"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const db_1 = require("../db");
const userMiddleware_1 = require("../middlewares/userMiddleware");
const gemini_1 = __importDefault(require("../utils/gemini"));
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredbody = zod_1.z.object({
        firstname: zod_1.z.string().min(3).max(15),
        lastname: zod_1.z.string().min(3),
        username: zod_1.z.string().min(5).max(15),
        password: zod_1.z.string().min(8).max(15),
    });
    const parsedData = requiredbody.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            msg: "Incorrect format",
            error: parsedData.error,
        });
        return;
    }
    const { firstname, lastname, username, password } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        yield db_1.userModel.create({
            firstname,
            lastname,
            username,
            password: hashedPassword,
        });
    }
    catch (error) {
        console.log(error);
    }
    res.status(200).json({
        msg: "Signed Up",
    });
}));
exports.userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const response = yield db_1.userModel.findOne({
            username,
        });
        if (!response) {
            res.status(403).json({
                msg: "User does not exist",
            });
            return;
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, response.password);
        if (passwordMatch) {
            const token = jsonwebtoken_1.default.sign({
                id: response._id,
            }, process.env.JWT_SECRET);
            res.json({
                msg: "Signed In!",
                token: token,
            });
        }
        else {
            res.status(403).json({
                msg: "Incorrect Credentials!",
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}));
exports.userRouter.post("/profile", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profileSchema = zod_1.z.object({
        age: zod_1.z.number().min(13),
        gender: zod_1.z.enum(["male", "female", "other"]),
        height: zod_1.z.string(),
        weight: zod_1.z.number(),
        goal: zod_1.z.enum(["weight_loss", "weight_gain", "endurance"]),
        workoutFrequency: zod_1.z.number().min(1).max(7),
        dietPreference: zod_1.z.enum(["veg", "nonveg", "vegan"]),
        equipmentAccess: zod_1.z.boolean(),
    });
    const parsed = profileSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({
            msg: "Invalid data",
        });
    }
    else {
        res.status(403).json({
            error: parsed.error,
        });
    }
    try {
        const userId = req.userId;
        yield db_1.fitnessProfileModel.create(Object.assign({ userId }, parsed.data));
    }
    catch (error) {
        console.log(error);
    }
}));
exports.userRouter.post("/generate-plan", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredbody = zod_1.z.object({
        age: zod_1.z.number(),
        gender: zod_1.z.enum(["male", "female", "other"]),
        height: zod_1.z.string(),
        weight: zod_1.z.number(),
        goal: zod_1.z.enum(["loose weight", "gain muscle", "maintain fitness"]),
        dietPreference: zod_1.z.enum(["veg", "nonveg", "vegan"]),
        equipmentAccess: zod_1.z.boolean(),
    });
    const parsed = requiredbody.safeParse(req.body);
    if (!parsed.success) {
        res.status(403).json({
            msg: "Invalid Data",
            error: parsed.error,
        });
        return;
    }
    try {
        const { age, gender, height, weight, goal, dietPreference, equipmentAccess, } = parsed.data;
        const userId = req.userId;
        const prompt = `
    Generate beginner fitness and meal plan for:
      -Age: ${age},
      -Gender: ${gender},
      -Height: ${height},
      -Weight: ${weight},
      -Goal: ${goal},
      -Diet Preference: ${dietPreference},
      -Equipment Access: ${equipmentAccess ? "Yes" : "No"}

      Respond with raw JSON only, without markdown or code blocks. Use this format:

      {
       "workoutPlan": "Day-wise workout plan...",
       "dietPlan": "Suggested meals for each day..."
      }
      `;
        const model = gemini_1.default.getGenerativeModel({
            model: "gemini-2.5-flash",
        });
        const result = yield model.generateContent(prompt);
        const response = yield result.response;
        const generatedText = yield response.text();
        let workoutPlan = "";
        let dietPlan = "";
        try {
            const cleanedText = generatedText
                .replace(/```json/i, "")
                .replace(/```/g, "")
                .trim();
            const parsed = JSON.parse(cleanedText);
            workoutPlan = parsed.workoutPlan;
            dietPlan = parsed.dietPlan;
        }
        catch (e) {
            console.error("Parsing Gemini response failed. Raw output returned.");
            workoutPlan = generatedText;
            dietPlan = "";
        }
        const generatedPlan = yield db_1.planModel.create({
            userId,
            profileSnapshot: {
                age,
                gender,
                height,
                weight,
                goal,
                dietPreference,
                equipmentAccess,
            },
            generatedPlan: {
                workoutPlan,
                dietPlan,
            },
        });
        res.status(201).json({
            msg: "Plan Create successfully",
            generatedPlan,
        });
    }
    catch (error) {
        res.status(404).json({
            msg: "Error occured",
        });
        console.log(error);
    }
}));
exports.userRouter.get("/myplan", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const plan = yield db_1.planModel.findOne({
            userId,
        });
        if (!plan) {
            return res.status(404).json({ msg: "No plan found for this user." });
        }
        res.json({
            msg: "Here is the plan",
            plan,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}));
exports.userRouter.put("/regenerate-plan", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const existingPlan = yield db_1.planModel.findOne({ userId });
        if (!existingPlan) {
            return res.status(404).json({ msg: "No plan found to regenerate" });
        }
        const { age, gender, height, weight, goal, dietPreference, equipmentAccess, } = existingPlan.profileSnapshot || {};
        const prompt = `
    Regenerate beginner fitness and meal plan for:
      - Age: ${age}
      - Gender: ${gender}
      - Height: ${height}
      - Weight: ${weight}
      - Goal: ${goal}
      - Diet Preference: ${dietPreference}
      - Equipment Access: ${equipmentAccess ? "Yes" : "No"}

    Format: {
      "workoutPlan": "Day-wise workout plan...",
      "dietPlan": "Suggested meals for each day..."
    }
    `;
        const model = gemini_1.default.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = yield model.generateContent(prompt);
        const response = yield result.response;
        const generatedText = yield response.text();
        let workoutPlan = "", dietPlan = "";
        try {
            const parsed = JSON.parse(generatedText);
            workoutPlan = parsed.workoutPlan;
            dietPlan = parsed.dietPlan;
        }
        catch (e) {
            workoutPlan = generatedText;
        }
        existingPlan.generatedPlan = { workoutPlan, dietPlan };
        yield existingPlan.save();
        res.json({
            msg: "Plan regenerated successfully",
            updatedPlan: existingPlan,
        });
    }
    catch (error) {
        console.log("Error regenerating plan:", error);
        res.status(500).json({ msg: "Something went wrong" });
    }
}));
