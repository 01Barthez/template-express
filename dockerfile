# Stage 1
FROM oven/bun AS build

WORKDIR /app
COPY . .
RUN bun install
RUN bun run build

# Stage 2
FROM node:18-alpine
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package.json bun.lockb ./
RUN bun install --production

CMD ["node", "dist/server.js"]
