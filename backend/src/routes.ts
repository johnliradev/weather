import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import z from "zod";
import { getForecastController } from "./controllers.js";

export async function Router(app: FastifyInstance) {
  app.get("/health", (request: FastifyRequest, reply: FastifyReply) =>
    reply.status(200).send({ message: "ok" })
  );
  app.get(
    "/forecast/:location/:unit",
    {
      schema: {
        params: z.object({
          location: z
            .string()
            .min(1, "Location is required")
            .describe("Ex: São Paulo"),
          unit: z.enum(["metric", "us", "uk"]).describe("Ex: metric"),
        }),
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getForecastController(request, reply);
    }
  );
}
