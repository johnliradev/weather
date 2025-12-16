import type { FastifyReply, FastifyRequest } from "fastify";
import { fetchForecast } from "./functions/get-forecast.js";

export async function getForecastController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { location, startDate, endDate } = request.params as {
    location: string;
    startDate: string;
    endDate: string;
  };
  if (!location) throw new Error("Location is required");
  const data = await fetchForecast(location, startDate, endDate);
  reply.status(200).send({ data });
}
