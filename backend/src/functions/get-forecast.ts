import { env } from "../env.js";
import { getOnRedis } from "./get-redis.js";
import { setOnRedis } from "./set-redis.js";

const formatDate = (d: Date) => d.toISOString().split("T")[0];

const addDays = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return formatDate(d);
};

export async function fetchForecast(
  location: string,
  unit: "metric" | "us" | "uk"
) {
  const today = addDays(0);
  const endDate = addDays(6);

  const url = new URL(`${location}/${today}/${endDate}`, env.API_URL);
  url.searchParams.set("key", env.API_KEY);
  url.searchParams.set("unitGroup", unit);

  const cacheKey = `forecast:${location}:${today}:${unit}`;
  const cached = await getOnRedis(cacheKey);
  if (cached) {
    return cached;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const response = await res.json();
  await setOnRedis(cacheKey, response);
  return response;
}
