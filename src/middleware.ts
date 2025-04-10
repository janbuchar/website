import { defineMiddleware, sequence } from "astro:middleware";

export const middleware = defineMiddleware(async (_ctx, next) => {
  const response = await next();
  return response;
});

export const onRequest = sequence(middleware);
