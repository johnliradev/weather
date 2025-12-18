import { app } from "../index.js";
import { redis } from "../redis.js";

export async function setOnRedis(key: string, data: any, ttlSeconds = 3600) {
  app.log.info("Setting Data on Redis");
  try {
    await redis.multi().json.set(key, "$", data).expire(key, ttlSeconds).exec();
    app.log.info("Data saved on Redis");
  } catch (error) {
    app.log.error(`Erro on saving Data on Redis, Error: ${error}`);
    return;
  }
}
