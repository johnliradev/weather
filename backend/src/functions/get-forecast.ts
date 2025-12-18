import { env } from "../env.js";
import { getOnRedis } from "./get-redis.js";
import { setOnRedis } from "./set-redis.js";

export async function fetchForecast(
  location: string,
  date1: string,
  date2: string,
  unit: "metric" | "us" | "uk"
) {
  const url = new URL(`${location}/${date1}/${date2}`, env.API_URL);

  url.searchParams.set("key", env.API_KEY);
  url.searchParams.set("unitGroup", unit);
  const cacheKey = `forecast:${location}:${date1}:${date2}:${unit}`;
  const isRedis = await getOnRedis(cacheKey);
  if (isRedis) {
    return isRedis;
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  const response = await res.json();
  await setOnRedis(cacheKey, response);
  return response;
}
