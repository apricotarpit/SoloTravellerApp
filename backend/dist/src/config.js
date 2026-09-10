"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    PORT: zod_1.z.string().default("8080"),
    DATABASE_URL: zod_1.z.string(),
    JWT_SECRET: zod_1.z.string().min(1, "JWT_SECRET is required"),
    JWT_EXPIRES_IN: zod_1.z.string().default("7d"),
    NODE_ENV: zod_1.z.enum(["development", "production"]).default("development"),
});
const env = envSchema.parse(process.env);
const config = {
    ...env,
};
exports.default = config;
//# sourceMappingURL=config.js.map