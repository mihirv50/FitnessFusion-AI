"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.fitnessProfileModel = exports.planModel = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importStar(require("mongoose"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.MONGO_URL);
const userSchema = new mongoose_1.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});
const fitnessProfileSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "user", required: true },
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
const planSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "user", required: true },
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
exports.planModel = mongoose_1.default.model("plan", planSchema);
exports.fitnessProfileModel = mongoose_1.default.model("fitness_profile", fitnessProfileSchema);
exports.userModel = mongoose_1.default.model("user", userSchema);
