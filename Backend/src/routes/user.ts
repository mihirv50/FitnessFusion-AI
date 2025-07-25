import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { fitnessProfileModel, planModel, userModel } from "../db";
import { userMiddleware } from "../middlewares/userMiddleware";
import genAI from "../utils/gemini";

export const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const requiredbody = z.object({
    firstname: z.string().min(3).max(15),
    lastname: z.string().min(3),
    username: z.string().min(5).max(15),
    password: z.string().min(8).max(15),
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
    const hashedPassword = await bcrypt.hash(password, 5);
    await userModel.create({
      firstname,
      lastname,
      username,
      password: hashedPassword,
    });
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({
    msg: "Signed Up",
  });
});

userRouter.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await userModel.findOne({
      username,
    });
    if (!response) {
      res.status(403).json({
        msg: "User does not exist",
      });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, response.password);
    if (passwordMatch) {
      const token = jwt.sign(
        {
          id: response._id,
        },
        process.env.JWT_SECRET!
      );
      res.json({
        msg: "Signed In!",
        token: token,
      });
    } else {
      res.status(403).json({
        msg: "Incorrect Credentials!",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/profile", userMiddleware, async (req, res) => {
  const profileSchema = z.object({
    age: z.number().min(13),
    gender: z.enum(["male", "female", "other"]),
    height: z.string(),
    weight: z.number(),
    goal: z.enum(["weight_loss", "weight_gain", "endurance"]),
    workoutFrequency: z.number().min(1).max(7),
    dietPreference: z.enum(["veg", "nonveg", "vegan"]),
    equipmentAccess: z.boolean(),
  });

  const parsed = profileSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      msg: "Invalid data",
    });
  } else {
    res.status(403).json({
      error: parsed.error,
    });
  }
  try {
    const userId = req.userId;
    await fitnessProfileModel.create({
      userId,
      ...parsed.data,
    });
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/generate-plan", userMiddleware, async (req, res) => {
  const requiredbody = z.object({
    age: z.number(),
    gender: z.enum(["male", "female", "other"]),
    height: z.string(),
    weight: z.number(),
    goal: z.enum(["loose weight", "gain muscle", "maintain fitness"]),
    dietPreference: z.enum(["veg", "nonveg", "vegan"]),
    equipmentAccess: z.boolean(),
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
    const {
      age,
      gender,
      height,
      weight,
      goal,
      dietPreference,
      equipmentAccess,
    } = parsed.data;
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

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = await response.text();
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
    } catch (e) {
      console.error("Parsing Gemini response failed. Raw output returned.");
      workoutPlan = generatedText;
      dietPlan = "";
    }

    const generatedPlan = await planModel.create({
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
  } catch (error) {
    res.status(404).json({
      msg: "Error occured",
    });
    console.log(error);
  }
});

userRouter.get("/myplan", userMiddleware, async (req, res) => {
  const userId = req.userId;
  try {
    const plan = await planModel.findOne({
      userId,
    });
    if (!plan) {
      return res.status(404).json({ msg: "No plan found for this user." });
    }
    res.json({
      msg: "Here is the plan",
      plan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

userRouter.put("/regenerate-plan", userMiddleware, async (req, res) => {
  const userId = req.userId;
  try {
    const existingPlan = await planModel.findOne({ userId });
    if (!existingPlan) {
      return res.status(404).json({ msg: "No plan found to regenerate" });
    }

    const {
      age,
      gender,
      height,
      weight,
      goal,
      dietPreference,
      equipmentAccess,
    }: {
      age?: number | null;
      gender?: string | null;
      height?: string | null;
      weight?: number | null;
      goal?: string | null;
      dietPreference?: string | null;
      equipmentAccess?: boolean | null;
    } = existingPlan.profileSnapshot || {};

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

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = await response.text();

    let workoutPlan = "",
      dietPlan = "";

    try {
      const parsed = JSON.parse(generatedText);
      workoutPlan = parsed.workoutPlan;
      dietPlan = parsed.dietPlan;
    } catch (e) {
      workoutPlan = generatedText;
    }

    existingPlan.generatedPlan = { workoutPlan, dietPlan };
    await existingPlan.save();

    res.json({
      msg: "Plan regenerated successfully",
      updatedPlan: existingPlan,
    });
  } catch (error) {
    console.log("Error regenerating plan:", error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});