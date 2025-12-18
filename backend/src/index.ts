import fastifySwagger from "@fastify/swagger";
import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import scalarApiReference from "@scalar/fastify-api-reference";
import type { FastifyInstance } from "fastify";
import { env } from "./env.js";
import { errorHandler } from "./err/error-handler.js";
import { Router } from "./routes.js";

export const app = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.setErrorHandler(errorHandler);

const registerPlugins = async (app: FastifyInstance) => {
  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Weather Wrapper API",
        description: "API for Weather Wrapper",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });
  await app.register(Router, { prefix: "/api" });
  await app.register(scalarApiReference, { routePrefix: "/api/docs" });
};

try {
  await registerPlugins(app);
  await app.listen({ port: env.PORT, host: "0.0.0.0" });
  app.log.info(`Server is running on port ${env.PORT}`);
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
