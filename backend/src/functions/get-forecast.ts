import { env } from "../env.js";

export async function fetchForecast(
  location: string,
  date1: string,
  date2: string,
  unit: "metric" | "us" | "uk"
) {
  const url = new URL(`${location}/${date1}/${date2}`, env.API_URL);
  url.searchParams.set("key", env.API_KEY);
  url.searchParams.set("unitGroup", unit);

  const response = await fetch(url);
  return response.json();
}
