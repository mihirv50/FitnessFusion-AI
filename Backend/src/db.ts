import dotenv from "dotenv";
import mongoose, { Schema } from "mongoose";
dotenv.config();

mongoose.connect(process.env.MONGO_URL!);

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const fitnessProfileSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  age: Number,
  gender: String,
  height: String,
  weight: Number,
  goal: String,
  workoutFrequency: Number,
  dietPreference: String,
  equipmentAccess: Boolean,
  createdAt: { type: Date, default: Date.now },
});

const planSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  profileSnapshot: {
    age: Number,
    gender: String,
    height: String,
    weight: Number,
    goal: String,
    workoutFrequency: Number,
    dietPreference: String,
    equipmentAccess: Boolean,
  },
  generatedPlan: {
    workoutPlan: String,
    dietPlan: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export const planModel = mongoose.model("plan", planSchema);
export const fitnessProfileModel = mongoose.model(
  "fitness_profile",
  fitnessProfileSchema
);
export const userModel = mongoose.model("user", userSchema);
