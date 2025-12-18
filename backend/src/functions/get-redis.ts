import { redis } from "../redis.js";
import { app } from "../index.js";

export async function getOnRedis(key: string) {
  try {
    app.log.info("Getting Data from Redis");
    const data = await redis.json.get(key);
    return data ?? null;
  } catch (error) {
    app.log.error(`Error getting data from Redis: ${error}`);
    return null;
  }
}
