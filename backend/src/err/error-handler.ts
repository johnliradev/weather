import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod";
import { app } from "../index.js";

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  // If the error is a Zod schema validation
  if (hasZodFastifySchemaValidationErrors(error)) {
    reply.status(400).send({
      statusCode: 400,
      error: "VALIDATION_ERROR",
      message: "Validation failed",
      issues: error.validation.map((issue) => issue.message),
    });
    return;
  }

  // Generic errors or unknown errors
  app.log.error(error, "Unhandled error:");
  reply.status(500).send({
    statusCode: 500,
    error: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred",
  });
}
