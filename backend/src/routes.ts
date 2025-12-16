import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import z from "zod";
import { getForecastController } from "./controllers.js";

export async function Router(app: FastifyInstance) {
  app.get("/health", (request: FastifyRequest, reply: FastifyReply) =>
    reply.status(200).send({ message: "ok" })
  );
  app.get(
    "/forecast/:location/:date1/:date2/:unit",
    {
      schema: {
        params: z.object({
          location: z
            .string()
            .min(1, "Location is required")
            .describe("Ex: São Paulo"),
          date1: z
            .string()
            .min(1, "Start date is required")
            .describe("Ex: 2025-12-16"),
          date2: z
            .string()
            .min(1, "End date is required")
            .describe("Ex: 2025-12-20"),
          unit: z.enum(["metric", "us", "uk"]).describe("Ex: metric"),
        }),
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getForecastController(request, reply);
    }
  );
}
