import { createClient } from "redis";
import { env } from "./env.js";

export const redis = await createClient({
  url: `redis://${env.REDIS_HOST || "localhost"}:${env.REDIS_PORT || 6379}`,
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();
