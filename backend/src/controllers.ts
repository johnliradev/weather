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
  const result = await fetchForecast(location, unit);

  const response: {
    data: any;
    fromCache: boolean;
    responseTime: number;
    statusCode: number;
    error?: any;
  } = {
    data: result.data,
    fromCache: result.fromCache,
    responseTime: result.responseTime,
    statusCode: result.statusCode,
  };

  if (result.error) {
    response.error = result.error;
  }

  reply.status(result.statusCode).send(response);
}
