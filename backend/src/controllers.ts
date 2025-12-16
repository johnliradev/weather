import type { FastifyReply, FastifyRequest } from "fastify";
import { fetchForecast } from "./functions/get-forecast.js";

export async function getForecastController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { location, date1, date2, unit } = request.params as {
    location: string;
    date1: string;
    date2: string;
    unit: "metric" | "us" | "uk";
  };
  const data = await fetchForecast(location, date1, date2, unit);
  reply.status(200).send({ data });
}
