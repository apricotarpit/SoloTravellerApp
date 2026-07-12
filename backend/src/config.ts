import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
	PORT: z.string().default("8080"),
	DATABASE_URL: z.string(),
	JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
	JWT_EXPIRES_IN: z.string().default("7d"),
	NODE_ENV: z.enum(["development", "production"]).default("development"),
});

const env = envSchema.parse(process.env);

const config = {
	...env,
};

export default config;