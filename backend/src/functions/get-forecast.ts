import { env } from "../env.js";

export async function fetchForecast(
  location: string,
  startDate: string,
  endDate: string
) {
  const url = new URL(location, env.API_URL);
  url.searchParams.set("key", env.API_KEY);
  url.searchParams.set("unitGroup", "metric");
  const response = await fetch(url);
  return response.json();
}
