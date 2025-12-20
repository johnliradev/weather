import type { FastifyReply, FastifyRequest } from "fastify";
import { fetchForecast } from "./functions/get-forecast.js";

export async function getForecastController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { location, unit } = request.params as {
    location: string;
    unit: "metric" | "us" | "uk";
  };
  const data = await fetchForecast(location, unit);
  reply.status(200).send({ data });
}
