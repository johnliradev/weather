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
  const startTime = Date.now();
  const today = addDays(0);
  const endDate = addDays(7);

  const url = new URL(`${location}/${today}/${endDate}`, env.API_URL);
  url.searchParams.set("key", env.API_KEY);
  url.searchParams.set("unitGroup", unit);

  const cacheKey = `forecast:${location}:${today}:${unit}`;
  const cached = await getOnRedis(cacheKey);

  if (cached) {
    const responseTime = Date.now() - startTime;
    return {
      data: cached,
      fromCache: true,
      responseTime,
      statusCode: 200,
    };
  }

  const res = await fetch(url);
  const responseTime = Date.now() - startTime;
  const statusCode = res.status;

  if (!res.ok) {
    let errorData = null;
    try {
      errorData = await res.json();
    } catch {
      errorData = { message: `API error: ${statusCode}` };
    }
    return {
      data: null,
      fromCache: false,
      responseTime,
      statusCode,
      error: errorData,
    };
  }

  const response = await res.json();
  await setOnRedis(cacheKey, response);

  return {
    data: response,
    fromCache: false,
    responseTime,
    statusCode,
  };
}
