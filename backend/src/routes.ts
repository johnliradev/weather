import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import z from "zod";
import { getForecastController } from "./controllers.js";

export async function Router(app: FastifyInstance) {
  app.get("/health", (request: FastifyRequest, reply: FastifyReply) =>
    reply.status(200).send({ message: "ok" })
  );
  app.get(
    "/forecast/:location",
    {
      schema: {
        params: z.object({
          location: z.string().min(1, "Location is required"),
        }),
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getForecastController(request, reply);
    }
  );
}
