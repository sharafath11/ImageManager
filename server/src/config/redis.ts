import dotenv from "dotenv";
dotenv.config();

export const redisConfig = process.env.REDIS_URL
  ? { url: process.env.REDIS_URL }
  : null;
