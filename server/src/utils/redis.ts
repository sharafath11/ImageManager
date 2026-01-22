import Redis from "ioredis";
import { redisConfig } from "../config/redis";

const createRedis = () => {
  if (redisConfig) {
    const client = new Redis(redisConfig.url);

    client.on("connect", () => {
      console.log("Redis connected successfully");
    });

    client.on("error", (err) => {
      console.error("Redis connection error:", err);
    });

    return client;
  } else {
    console.log("REDIS_URL not set – Redis disabled");
    return null;
  }
};

export const redis = createRedis();
